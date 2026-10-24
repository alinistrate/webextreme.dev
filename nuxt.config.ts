import tailwindcss from '@tailwindcss/vite';

export default defineNuxtConfig({
  compatibilityDate: '2026-10-24',
  devtools: { enabled: false },
  ssr: true,
  runtimeConfig: {
    public: { turnstileSiteKey: '0x4AAAAAAFkHlmtDxs04fHX7', gtmId: 'GTM-MHDS4PW4' },
  },
  css: ['~/assets/css/main.css'],
  features: { inlineStyles: true },
  modules: [],
  vite: {
    plugins: [tailwindcss()],
    build: { target: ['es2022', 'chrome130', 'firefox132', 'safari18'] },
  },
  typescript: { strict: true },
  app: {
    head: {
      htmlAttrs: { lang: 'en', 'data-motion': 'off' },
      titleTemplate: '%s | Web Extreme Dev',
      meta: [{ name: 'theme-color', content: '#191b1d' }],
      link: [{ rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }],
    },
  },
  nitro: {
    prerender: {
      crawlLinks: true,
      ignore: ['/404.html', '/200.html'],
      failOnError: true,
      routes: [
        '/',
        '/services/',
        '/approach/',
        '/about/',
        '/contact/',
        '/privacy/',
        '/accessibility/',
        '/terms/',
        '/cookies/',
      ],
    },
  },
  experimental: { payloadExtraction: true },
});
