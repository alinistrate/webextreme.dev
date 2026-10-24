<script setup lang="ts">
import { site } from '~/content/site';
import { company } from '~/content/company';
import displayFont from '@fontsource-variable/space-grotesk/files/space-grotesk-latin-wght-normal.woff2?url';
const { enabled } = useMotion();
const { hasChoice } = useConsent();
useHead(() => ({ htmlAttrs: { 'data-consent-known': hasChoice.value ? 'true' : 'false' } }));
const { choice } = useTheme();
useHead(() => ({
  meta: [
    { name: 'color-scheme', content: choice.value === 'system' ? 'light dark' : choice.value },
  ],
}));
// Keep the head manager as the single owner: manual DOM attributes were reset on navigation.
useHead(() => ({ htmlAttrs: { 'data-motion': enabled.value ? 'on' : 'off' } }));
useHead({
  link: [
    { rel: 'preload', href: displayFont, as: 'font', type: 'font/woff2', crossorigin: 'anonymous' },
  ],
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Organization',
        '@id': site.url + '/#organization',
        name: site.name,
        legalName: company.legalName,
        taxID: company.cui,
        url: site.url,
        email: site.email,
        logo: site.url + '/favicon.svg',
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'Ale. Petuniei, Nr. 8, Bl. 22, Ap. 21',
          addressLocality: 'Sibiu',
          postalCode: '550114',
          addressCountry: 'RO',
        },
      }),
    },
  ],
});
</script>

<template>
  <NuxtRouteAnnouncer /><a class="skip" href="#main">Skip to main content</a
  ><SiteHeader /><NuxtPage /><noscript
    ><p class="container form-note">
      JavaScript is disabled. To send an enquiry, email
      <a href="mailto:contact@webextreme.dev">contact@webextreme.dev</a>. Navigation links are
      available in the footer.
    </p></noscript
  ><SiteFooter /><CookieConsent />
</template>
