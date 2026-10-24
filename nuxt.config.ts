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
    pageTransition: { name: 'route', mode: 'out-in' },
    head: {
      htmlAttrs: { lang: 'en', 'data-motion': 'off' },
      titleTemplate: '%s | Web Extreme Dev',
      meta: [
        { name: 'theme-color', content: '#191b1d' },
        { name: 'color-scheme', content: 'light dark' },
      ],
      script: [
        {
          key: 'consent-display-init',
          tagPosition: 'head',
          // Only suppress a previously answered banner; this never enables or loads analytics.
          innerHTML: `try{var c=document.cookie.split('; ').find(function(v){return v.startsWith('wed_consent=')});if(c&&JSON.parse(decodeURIComponent(c.slice(12))).version===1)document.documentElement.dataset.consentKnown='true'}catch{}`,
        },
        {
          key: 'theme-init',
          tagPosition: 'head',
          innerHTML: `try{var t=localStorage.getItem('wed_theme');if(t==='light'||t==='dark')document.querySelector('meta[name="color-scheme"]').content=t}catch{}`,
        },
      ],
      link: [
        { rel: 'icon', href: '/favicon.ico', sizes: '16x16 32x32 48x48' },
        { rel: 'icon', type: 'image/png', sizes: '96x96', href: '/favicon-96x96.png' },
        { rel: 'icon', type: 'image/svg+xml', sizes: 'any', href: '/favicon.svg' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
        { rel: 'manifest', href: '/site.webmanifest' },
      ],
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
  experimental: {
    payloadExtraction: true,
    defaults: { nuxtLink: { prefetchOn: { visibility: false, interaction: true } } },
  },
});
