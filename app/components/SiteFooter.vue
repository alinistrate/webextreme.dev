<script setup lang="ts">
const { settingsOpen } = useConsent();
</script>
<template>
  <footer class="site-footer dark">
    <div class="container">
      <div class="footer-top">
        <NuxtLink class="brand footer-brand" to="/" aria-label="Web Extreme Dev home"
          ><BrandLogo
        /></NuxtLink>
        <nav aria-label="Footer">
          <NuxtLink to="/services/">Services</NuxtLink><NuxtLink to="/approach/">Approach</NuxtLink
          ><NuxtLink to="/about/">About</NuxtLink><NuxtLink to="/contact/">Contact</NuxtLink>
        </nav>
      </div>
      <p class="footer-description">Design, software &amp; web development.</p>
      <div class="footer-bottom">
        <p>© 2026 Web Extreme Dev</p>
        <NuxtLink class="plain-button" to="/privacy/">Privacy</NuxtLink
        ><NuxtLink class="plain-button" to="/terms/">Terms &amp; Conditions</NuxtLink
        ><NuxtLink class="plain-button" to="/cookies/">Cookie Policy</NuxtLink
        ><NuxtLink class="plain-button" to="/accessibility/">Accessibility</NuxtLink
        ><button class="plain-button" type="button" @click="settingsOpen = true">
          Cookie settings
        </button>
      </div>
    </div>
  </footer>
</template>
