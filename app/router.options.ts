import type { RouterConfig } from '@nuxt/schema';

// Nuxt waits for route content before scrolling to hash targets and restores browser history.
export default { scrollBehaviorType: 'smooth' } satisfies RouterConfig;
