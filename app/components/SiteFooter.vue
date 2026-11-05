<script setup lang="ts">
const { tr } = useCopy();
const { settingsOpen } = useConsent();
</script>
<template>
  <footer class="site-footer dark">
    <div class="container">
      <div class="footer-top">
        <NuxtLinkLocale class="brand footer-brand" to="/" :aria-label="tr('Web Extreme Dev home')"
          ><BrandLogo
        /></NuxtLinkLocale>
        <nav :aria-label="tr('Footer')">
          <NuxtLinkLocale to="/services/">{{ tr('Services') }}</NuxtLinkLocale
          ><NuxtLinkLocale to="/approach/">{{ tr('Approach') }}</NuxtLinkLocale
          ><NuxtLinkLocale to="/about/">{{ tr('About') }}</NuxtLinkLocale
          ><NuxtLinkLocale to="/contact/">{{ tr('Contact') }}</NuxtLinkLocale>
        </nav>
      </div>
      <div class="footer-summary">
        <p class="footer-description">{{ tr('Web development, software & design.') }}</p>
        <ContactLinks :show-email="false" />
      </div>
      <div class="footer-bottom">
        <p>{{ tr('© 2026 Web Extreme Dev') }}</p>
        <NuxtLinkLocale class="plain-button" to="/privacy/">{{ tr('Privacy') }}</NuxtLinkLocale
        ><NuxtLinkLocale class="plain-button" to="/terms/">{{
          tr('Terms & Conditions')
        }}</NuxtLinkLocale
        ><NuxtLinkLocale class="plain-button" to="/cookies/">{{
          tr('Cookie Policy')
        }}</NuxtLinkLocale
        ><NuxtLinkLocale class="plain-button" to="/accessibility/">{{
          tr('Accessibility')
        }}</NuxtLinkLocale
        ><button class="plain-button" type="button" @click="settingsOpen = true">
          {{ tr('Cookie settings') }}
        </button>
      </div>
    </div>
  </footer>
</template>
