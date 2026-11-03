import { romanianContactMessages } from './contact-messages.ts';
import { handleContact, type ContactEnvironment } from './contact.ts';

/** Native form submissions receive an accessible HTML result; AJAX receives JSON. */
export async function contactResponse(request: Request, env: ContactEnvironment) {
  const response = await handleContact(request, env);
  const romanian = new URL(request.url).searchParams.get('lang') === 'ro';
  if (romanian && response.headers.get('Content-Type')?.includes('application/json')) {
    const result = (await response.clone().json()) as { message?: string };
    if (result.message) result.message = romanianContactMessages[result.message] ?? result.message;
    if (!request.headers.get('Accept')?.includes('text/html'))
      return Response.json(result, { status: response.status, headers: response.headers });
  }
  if (
    !request.headers.get('Accept')?.includes('text/html') ||
    !response.headers.get('Content-Type')?.includes('application/json')
  )
    return response;
  const result = (await response.json()) as { message?: string };
  if (romanian && result.message)
    result.message = romanianContactMessages[result.message] ?? result.message;
  const escape = (value: string) =>
    value.replace(
      /[&<>"']/g,
      (character) =>
        ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[character] ??
        character,
    );
  return new Response(
    '<!doctype html><html lang="' +
      (romanian ? 'ro' : 'en') +
      '"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex"><title>' +
      (romanian ? 'Solicitare' : 'Enquiry') +
      ' | Web Extreme Dev</title><main><h1>' +
      (romanian ? 'Solicitare' : 'Enquiry') +
      '</h1><p>' +
      escape(result.message ?? 'Please return to the contact page.') +
      '</p><p><a href="' +
      (romanian ? '/ro/contact/' : '/contact/') +
      '">' +
      (romanian ? 'Înapoi la contact' : 'Return to contact') +
      '</a></p><p><a href="mailto:contact@webextreme.dev">contact@webextreme.dev</a></p></main></html>',
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
