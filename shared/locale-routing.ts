/** Redirect only the entry homepage. Explicit deep links remain stable and indexable. */
export function localeRedirect(request: Request, country?: string): Response | null {
  const url = new URL(request.url);
  if (url.pathname !== '/' || !['GET', 'HEAD'].includes(request.method)) return null;
  const accept = request.headers.get('Accept') || '';
  if (accept && !accept.includes('text/html') && !accept.includes('*/*')) return null;
  const preference = request.headers
    .get('Cookie')
    ?.match(/(?:^|;\s*)wed_locale=(en|ro)(?:;|$)/)?.[1];
  if (preference === 'en' || (preference !== 'ro' && country !== 'RO')) return null;
  url.pathname = '/ro/';
  return new Response(null, {
    status: 302,
    headers: {
      Location: url.href,
      'Cache-Control': 'private, no-store',
      Vary: 'Cookie',
    },
  });
}
