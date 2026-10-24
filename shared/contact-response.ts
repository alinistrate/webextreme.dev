import { handleContact, type ContactEnvironment } from './contact';

/** Native form submissions receive an accessible HTML result; AJAX receives JSON. */
export async function contactResponse(request: Request, env: ContactEnvironment) {
  const response = await handleContact(request, env);
  if (
    !request.headers.get('Accept')?.includes('text/html') ||
    !response.headers.get('Content-Type')?.includes('application/json')
  )
    return response;
  const result = (await response.json()) as { message?: string };
  const escape = (value: string) =>
    value.replace(
      /[&<>"']/g,
      (character) =>
        ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[character] ??
        character,
    );
  return new Response(
    '<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex"><title>Enquiry | Web Extreme Dev</title><main><h1>Enquiry</h1><p>' +
      escape(result.message ?? 'Please return to the contact page.') +
      '</p><p><a href="/contact/">Return to contact</a></p><p><a href="mailto:contact@webextreme.dev">contact@webextreme.dev</a></p></main></html>',
    {
      status: response.status,
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        'Cache-Control': 'no-store',
        'Content-Security-Policy': "default-src 'none'; frame-ancestors 'none'",
      },
    },
  );
}
