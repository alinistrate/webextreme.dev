import test from 'node:test';
import assert from 'node:assert/strict';
import { handleContact, type ContactEnvironment } from '../shared/contact.ts';
const form = {
  name: 'Test Visitor',
  email: 'visitor@example.com',
  service: 'Web Development',
  details: 'A new website with a clear service catalogue.',
  website: '',
  turnstileToken: 'test-token',
};
const env: ContactEnvironment = {
  MAILJET_API_KEY: 'test-key',
  MAILJET_API_SECRET: 'test-secret',
  CONTACT_FROM: 'contact@webextreme.dev',
  CONTACT_TO: 'contact@webextreme.dev',
  TURNSTILE_SECRET_KEY: 'test-production-secret',
};
const request = (body: unknown = form, origin = 'https://webextreme.dev') =>
  new Request('https://webextreme.dev/api/contact', {
    method: 'POST',
    headers: { Origin: origin, 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
const success = async (url: string | URL | Request) =>
  String(url).includes('siteverify')
    ? Response.json({ success: true, hostname: 'webextreme.dev', action: 'contact' })
    : Response.json({ Messages: [{ Status: 'success' }] });
test('rejects cross-origin submissions before delivery', async () => {
  assert.equal((await handleContact(request(form, 'https://other.example'), env)).status, 403);
});
test('rejects invalid and oversized enquiries', async () => {
  for (const body of [
    { ...form, email: 'invalid' },
    { ...form, name: 'A' },
    { ...form, details: 'short' },
    { ...form, service: 'Unknown' },
    { ...form, details: 'x'.repeat(25000) },
  ])
    assert.ok((await handleContact(request(body), env)).status >= 400);
});
test('does not silently succeed without provider configuration', async () => {
  assert.equal(
    (await handleContact(request(), { TURNSTILE_SECRET_KEY: 'secret' }, success)).status,
    503,
  );
});
test('honeypot never calls providers', async () => {
  let calls = 0;
  const response = await handleContact(request({ ...form, website: 'spam' }), env, async () => {
    calls++;
    return Response.json({});
  });
  assert.equal(response.status, 200);
  assert.equal(calls, 0);
});
test('sends one plain-text message to contact with visitor ReplyTo after verification', async () => {
  let sent: Record<string, unknown> | undefined;
  const response = await handleContact(request(), env, async (url, init) => {
    if (String(url).includes('siteverify')) return success(url);
    sent = JSON.parse(String(init?.body));
    return success(url);
  });
  assert.equal(response.status, 200);
  const messages = sent?.Messages as {
    From: { Email: string };
    To: { Email: string }[];
    ReplyTo: { Email: string };
    TextPart: string;
  }[];
  assert.equal(messages.length, 1);
  assert.equal(messages[0]?.From.Email, 'contact@webextreme.dev');
  assert.equal(messages[0]?.To[0]?.Email, 'contact@webextreme.dev');
  assert.equal(messages[0]?.ReplyTo.Email, form.email);
  assert.ok(messages[0]?.TextPart.includes(form.details));
});
test('Mailjet rejection and network failures remain errors', async () => {
  assert.equal(
    (
      await handleContact(request(), env, async (url) =>
        String(url).includes('siteverify')
          ? success(url)
          : Response.json({ Messages: [{ Status: 'error' }] }),
      )
    ).status,
    502,
  );
  assert.equal(
    (
      await handleContact(request(), env, async (url) => {
        if (String(url).includes('siteverify')) return success(url);
        throw new Error('offline');
      })
    ).status,
    502,
  );
});
test('rejects missing, invalid, expired and wrong-host Turnstile responses', async () => {
  assert.equal(
    (await handleContact(request({ ...form, turnstileToken: '' }), env, success)).status,
    400,
  );
  for (const verification of [
    { success: false },
    { success: true, hostname: 'other.example', action: 'contact' },
    { success: true, hostname: 'webextreme.dev', action: 'other' },
  ])
    assert.equal(
      (await handleContact(request(), env, async () => Response.json(verification))).status,
      400,
    );
});
test('production refuses dummy Turnstile secrets and local simulation cannot bypass verification', async () => {
  assert.equal(
    (
      await handleContact(
        request(),
        {
          ...env,
          TURNSTILE_SECRET_KEY: '1x0000000000000000000000000000000AA',
          CONTACT_TEST_MODE: 'true',
        },
        success,
      )
    ).status,
    503,
  );
  assert.equal((await handleContact(request(), { CONTACT_TEST_MODE: 'true' })).status, 503);
});
test('local simulation is verified, clearly marked and never sends', async () => {
  let calls = 0;
  const response = await handleContact(
    new Request('http://127.0.0.1:3100/api/contact', {
      method: 'POST',
      headers: { Origin: 'http://127.0.0.1:3100', 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    }),
    { CONTACT_TEST_MODE: 'true', TURNSTILE_SECRET_KEY: 'local-test' },
    async () => {
      calls++;
      return Response.json({ success: true });
    },
  );
  assert.equal(((await response.json()) as { test: boolean }).test, true);
  assert.equal(calls, 1);
});
test('native POST uses the same validation without details in the URL', async () => {
  const response = await handleContact(
    new Request('https://webextreme.dev/api/contact', {
      method: 'POST',
      headers: {
        Origin: 'https://webextreme.dev',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams(form),
    }),
    { TURNSTILE_SECRET_KEY: 'test-secret' },
    success,
  );
  assert.equal(response.status, 503);
});
