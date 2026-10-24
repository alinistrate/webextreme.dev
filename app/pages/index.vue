<script setup lang="ts">
import HomeHero from '~/components/home/HomeHero.vue';
import HomeServices from '~/components/home/HomeServices.vue';
import HomeAbout from '~/components/home/HomeAbout.vue';
import HomeApproach from '~/components/home/HomeApproach.vue';
import HomeFaq from '~/components/home/HomeFaq.vue';
import HomeContact from '~/components/home/HomeContact.vue';
usePageSeo(
  'Software built with precision',
  'Design, websites, ecommerce and custom web applications. Web Extreme Dev is based in Sibiu, Romania, working from idea to launch.',
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
    <HomeServices />
    <HomeAbout />
    <HomeApproach />
    <HomeFaq />
    <HomeContact />
  </main>
</template>
