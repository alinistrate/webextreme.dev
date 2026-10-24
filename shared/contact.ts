export interface ContactEnvironment {
  MAILJET_API_KEY?: string;
  MAILJET_API_SECRET?: string;
  CONTACT_FROM?: string;
  CONTACT_TO?: string;
  CONTACT_ALLOWED_ORIGIN?: string;
  CONTACT_TEST_MODE?: string;
  TURNSTILE_SECRET_KEY?: string;
}
type Transport = typeof fetch;
const MAX_BYTES = 24_000;
const emailPattern = /^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/;
const serviceNames = new Set([
  'Design & UI/UX',
  'Web Development',
  'AI & Workflow Automation',
  'Brand & Creative Direction',
  'Landing Pages',
  'Ecommerce Development',
  'Web Apps & Custom Software',
]);
function json(status: number, message: string, extra: Record<string, unknown> = {}) {
  return Response.json(
    { message, ...extra },
    { status, headers: { 'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff' } },
  );
}
async function readLimited(request: Request): Promise<string> {
  const reader = request.body?.getReader();
  if (!reader) return '';
  const decoder = new TextDecoder();
  let total = 0;
  let text = '';
  try {
    for (;;) {
      const { done, value } = await reader.read();
      if (done) break;
      total += value.byteLength;
      if (total > MAX_BYTES) {
        await reader.cancel();
        throw new Error('too-large');
      }
      text += decoder.decode(value, { stream: true });
    }
    return text + decoder.decode();
  } finally {
    reader.releaseLock();
  }
}
/** Cloudflare and tests share this handler. It never logs personal details or credentials. */
export async function handleContact(
  request: Request,
  env: ContactEnvironment,
  transport: Transport = fetch,
): Promise<Response> {
  if (request.method !== 'POST')
    return new Response(null, { status: 405, headers: { Allow: 'POST' } });
  const url = new URL(request.url);
  const allowedOrigin = env.CONTACT_ALLOWED_ORIGIN ?? url.origin;
  if (request.headers.get('Origin') !== allowedOrigin)
    return json(403, 'This request could not be verified. Please reload the page and try again.');
  const contentType = request.headers.get('Content-Type') ?? '';
  const isNativeForm = contentType.startsWith('application/x-www-form-urlencoded');
  if (!contentType.startsWith('application/json') && !isNativeForm)
    return json(415, 'Please submit the enquiry through the contact form.');
  if (Number(request.headers.get('Content-Length') ?? 0) > MAX_BYTES)
    return json(413, 'Your enquiry is too long. Please shorten it and try again.');
  let body: Record<string, unknown>;
  try {
    const parsed: unknown = isNativeForm
      ? Object.fromEntries(new URLSearchParams(await readLimited(request)))
      : JSON.parse(await readLimited(request));
    if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) throw new Error('invalid');
    body = parsed as Record<string, unknown>;
  } catch (error) {
    return json(
      error instanceof Error && error.message === 'too-large' ? 413 : 400,
      'Please check the form details and try again.',
    );
  }
  // Honeypot bots are discarded without invoking the mail provider.
  if (typeof body.website === 'string' && body.website.trim())
    return json(200, 'Thank you. Your enquiry has been received.');
  const value = (key: string) =>
    typeof body[key] === 'string' ? (body[key] as string).trim() : '';
  const name = value('name');
  const email = value('email');
  const service = value('service');
  const details = value('details');
  if (
    name.length < 2 ||
    name.length > 120 ||
    /[\r\n]/.test(name) ||
    email.length > 254 ||
    !emailPattern.test(email) ||
    details.length < 20 ||
    details.length > 5000 ||
    (service && !serviceNames.has(service))
  )
    return json(
      400,
      'Please enter a valid name, email address and project description of 20–5000 characters.',
    );
  const local = ['127.0.0.1', 'localhost', '[::1]'].includes(url.hostname);
  const token = value('turnstileToken') || value('cf-turnstile-response');
  if (!token || token.length > 2048)
    return json(400, 'Please complete the security check and try again.');
  if (!env.TURNSTILE_SECRET_KEY || (!local && /^[123]x0{20,}/.test(env.TURNSTILE_SECRET_KEY)))
    return json(
      503,
      'The security check is not configured yet. Please email contact@webextreme.dev.',
    );
  try {
    const check = await transport('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      signal: AbortSignal.timeout(10_000),
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ secret: env.TURNSTILE_SECRET_KEY, response: token }),
    });
    const verification = (await check.json()) as {
      success?: boolean;
      hostname?: string;
      action?: string;
    };
    if (
      !check.ok ||
      !verification.success ||
      (!local && (verification.hostname !== url.hostname || verification.action !== 'contact'))
    )
      return json(400, 'The security check expired or could not be verified. Please try again.');
  } catch {
    return json(
      503,
      'The security check is temporarily unavailable. Please try again or email contact@webextreme.dev.',
    );
  }
  if (local && env.CONTACT_TEST_MODE === 'true')
    return json(200, 'Local test completed. No email was sent.', { test: true });
  const from = env.CONTACT_FROM;
  const to = env.CONTACT_TO;
  if (
    !env.MAILJET_API_KEY ||
    !env.MAILJET_API_SECRET ||
    !from ||
    !to ||
    !emailPattern.test(from) ||
    !emailPattern.test(to)
  )
    return json(
      503,
      'The contact form is not configured yet. Please email contact@webextreme.dev.',
    );
  try {
    const result = await transport('https://api.mailjet.com/v3.1/send', {
      method: 'POST',
      signal: AbortSignal.timeout(10_000),
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Basic ' + btoa(env.MAILJET_API_KEY + ':' + env.MAILJET_API_SECRET),
      },
      body: JSON.stringify({
        Messages: [
          {
            From: { Email: from, Name: 'Web Extreme Dev' },
            To: [{ Email: to }],
            ReplyTo: { Email: email, Name: name },
            Subject: 'Website enquiry' + (service ? ': ' + service : ''),
            TextPart: [
              'Name: ' + name,
              'Email: ' + email,
              'Service: ' + (service || 'Not selected'),
              '',
              details,
            ].join('\n'),
          },
        ],
      }),
    });
    const payload = (await result.json()) as { Messages?: { Status?: string }[] };
    if (!result.ok || payload.Messages?.length !== 1 || payload.Messages[0]?.Status !== 'success')
      return json(
        502,
        'We could not confirm that your enquiry was sent. Please email contact@webextreme.dev instead.',
      );
    return json(200, 'Thank you. Your enquiry has been sent. We will reply by email.');
  } catch {
    return json(
      502,
      'We could not confirm that your enquiry was sent. Please email contact@webextreme.dev instead.',
    );
  }
}
