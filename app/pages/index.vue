<script setup lang="ts">
import HomeHero from '~/components/home/HomeHero.vue';
import HomeFaq from '~/components/home/HomeFaq.vue';
import HomeContact from '~/components/home/HomeContact.vue';
usePageSeo(
  'Software built with precision',
  'Design, websites, ecommerce and custom web applications. Web Extreme Dev works with you from the first idea to launch.',
  '/',
);
usePageMotion();
</script>

<template>
  <main id="main" ref="page" tabindex="-1">
    <HomeHero />
    <div class="capabilities">
      <div class="container">
        <span>Websites</span><span aria-hidden="true">/</span><span>Web applications</span
        ><span aria-hidden="true">/</span><span>Custom software</span>
      </div>
    </div>
    <LazyHomeServices :hydrate-on-visible="{ rootMargin: '200px' }" />
    <LazyHomeAbout :hydrate-on-visible="{ rootMargin: '200px' }" />
    <LazyHomeApproach :hydrate-on-visible="{ rootMargin: '200px' }" />
    <HomeFaq />
    <HomeContact />
  </main>
</template>
