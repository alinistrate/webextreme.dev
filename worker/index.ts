import { contactResponse } from '../shared/contact-response';
import type { ContactEnvironment } from '../shared/contact';

interface Environment extends ContactEnvironment {
  ASSETS: { fetch(request: Request): Promise<Response> };
}

export default {
  async fetch(request: Request, env: Environment): Promise<Response> {
    const path = new URL(request.url).pathname;
    if (path === '/api/contact') return contactResponse(request, env);
    if (path.startsWith('/api/'))
      return new Response('Not found', {
        status: 404,
        headers: { 'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff' },
      });
    return env.ASSETS.fetch(request);
  },
};
