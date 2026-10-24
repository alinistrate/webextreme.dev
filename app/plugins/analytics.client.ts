declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
  }
}
export default defineNuxtPlugin((nuxtApp) => {
  const consent = useConsent();
  const config = useRuntimeConfig();
  const router = useRouter();
  let loaded = false;
  window.dataLayer = window.dataLayer || [];
  // Google Tag Manager reads the standard gtag arguments queue.
  window.gtag = function () {
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer.push(arguments);
  };
  const privacyDefaults = {
    analytics_storage: 'denied',
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
    functionality_storage: 'denied',
    personalization_storage: 'denied',
    security_storage: 'granted',
  };
  window.gtag('consent', 'default', privacyDefaults);
  window.gtag('set', 'ads_data_redaction', true);
  function load() {
    if (loaded || !/^GTM-[A-Z0-9]+$/.test(config.public.gtmId)) return;
    loaded = true;
    window.dataLayer.push({
      'gtm.start': Date.now(),
      event: 'gtm.js',
      page_location: location.origin + router.currentRoute.value.path,
    });
    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://www.googletagmanager.com/gtm.js?id=' + config.public.gtmId;
    script.id = 'google-tag-manager';
    document.head.append(script);
  }
  function clearAnalyticsCookies() {
    const names = document.cookie
      .split(';')
      .map((item) => item.split('=')[0]?.trim())
      .filter((name): name is string => Boolean(name && /^(_ga|_gid|_gat)/.test(name)));
    const domains = [undefined, location.hostname, '.' + location.hostname];
    for (const name of names)
      for (const domain of domains)
        document.cookie =
          name +
          '=; Max-Age=0; Path=/; SameSite=Lax' +
          (domain ? '; Domain=' + domain : '') +
          (location.protocol === 'https:' ? '; Secure' : '');
  }
  watch(consent.analytics, (allow, previous) => {
    window.gtag('consent', 'update', {
      ...privacyDefaults,
      analytics_storage: allow ? 'granted' : 'denied',
    });
    if (allow) load();
    else if (previous) {
      clearAnalyticsCookies();
      location.reload();
    }
  });
  nuxtApp.hook('app:mounted', () => {
    consent.ready.value = true;
  });
  nuxtApp.hook('page:finish', () => {
    if (loaded && consent.analytics.value)
      window.dataLayer.push({
        event: 'virtual_page_view',
        page_location: location.origin + router.currentRoute.value.path,
        page_title: document.title,
      });
  });
});
