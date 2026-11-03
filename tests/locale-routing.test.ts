import test from 'node:test';
import assert from 'node:assert/strict';
import { localeRedirect } from '../shared/locale-routing.ts';
import { contactResponse } from '../shared/contact-response.ts';
import { handleContact } from '../shared/contact.ts';
import { services } from '../app/content/services.ts';
const request = (path = '/', cookie = '', method = 'GET', accept = 'text/html') =>
  new Request('https://webextreme.dev' + path, {
    method,
    headers: { Cookie: cookie, Accept: accept },
  });
test('Romania receives a temporary private redirect preserving the homepage query', () => {
  const response = localeRedirect(request('/?source=test'), 'RO')!;
  assert.equal(response.status, 302);
  assert.equal(response.headers.get('Location'), 'https://webextreme.dev/ro/?source=test');
  assert.equal(response.headers.get('Cache-Control'), 'private, no-store');
});
test('manual English wins in Romania and remembered Romanian wins abroad', () => {
  assert.equal(
    localeRedirect(request('/', 'wed_consent=x; wed_locale=en; wed_theme=dark'), 'RO'),
    null,
  );
  assert.equal(
    localeRedirect(request('/', 'wed_locale=ro'), 'DE')!.headers.get('Location'),
    'https://webextreme.dev/ro/',
  );
});
test('missing or other countries keep English; malformed preferences do not override country', () => {
  for (const country of [undefined, 'DE', 'US'])
    assert.equal(localeRedirect(request(), country), null);
  assert.equal(localeRedirect(request('/', 'wed_locale=not-ro'), 'US'), null);
  assert.equal(localeRedirect(request('/', 'wed_locale=not-ro'), 'RO')!.status, 302);
});
test('explicit localized and English deep links, API, assets and sitemap never redirect', () => {
  for (const path of [
    '/ro/',
    '/ro/services/',
    '/services/',
    '/api/contact',
    '/favicon.ico',
    '/sitemap.xml',
    '/_i18n/messages.json',
  ])
    assert.equal(localeRedirect(request(path), 'RO'), null);
});
test('HEAD is supported but submissions and non-HTML fetches do not redirect', () => {
  assert.equal(localeRedirect(request('/', '', 'HEAD'), 'RO')!.status, 302);
  assert.equal(localeRedirect(request('/', '', 'POST'), 'RO'), null);
  assert.equal(localeRedirect(request('/', '', 'GET', 'application/json'), 'RO'), null);
});
test('Romanian validation is localized for both JSON and native HTML', async () => {
  for (const accept of ['application/json', 'text/html']) {
    const response = await contactResponse(
      new Request('https://webextreme.dev/api/contact?lang=ro', {
        method: 'POST',
        headers: {
          Origin: 'https://webextreme.dev',
          'Content-Type': 'application/json',
          Accept: accept,
        },
        body: '{}',
      }),
      {},
    );
    assert.equal(response.status, 400);
    const text = await response.text();
    assert.match(text, /Introdu un nume valid/);
    if (accept === 'text/html') {
      assert.match(text, /lang="ro"/);
      assert.match(text, /href="\/ro\/contact\/"/);
    }
  }
});
test('every displayed service, including hosting and consulting, can pass server validation', async () => {
  for (const service of services) {
    let calls = 0;
    const response = await handleContact(
      new Request('https://webextreme.dev/api/contact', {
        method: 'POST',
        headers: { Origin: 'https://webextreme.dev', 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: 'Test Visitor',
          email: 'test@example.com',
          service: service.title,
          details: 'A website and a hosting setup tailored to our project.',
          turnstileToken: 'test-token',
          website: '',
        }),
      }),
      {
        TURNSTILE_SECRET_KEY: 'test-secret',
        MAILJET_API_KEY: 'test-key',
        MAILJET_API_SECRET: 'test-secret',
        CONTACT_FROM: 'contact@webextreme.dev',
        CONTACT_TO: 'contact@webextreme.dev',
      },
      async (url) => {
        calls++;
        return String(url).includes('siteverify')
          ? Response.json({ success: true, hostname: 'webextreme.dev', action: 'contact' })
          : Response.json({ Messages: [{ Status: 'success' }] });
      },
    );
    assert.equal(response.status, 200, service.title);
    assert.equal(calls, 2, service.title);
  }
});
