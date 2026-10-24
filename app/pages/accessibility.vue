<script setup lang="ts">
usePageSeo(
  'Accessibility',
  'Accessibility features and how to report a problem on the Web Extreme Dev website.',
  '/accessibility/',
);
usePageMotion();
</script>

<template>
  <main id="main" ref="page" tabindex="-1">
    <section class="page-hero dark">
      <div class="container">
        <nav class="breadcrumb" aria-label="Breadcrumb">
          <NuxtLink to="/">Home</NuxtLink><span aria-hidden="true">/</span
          ><span>Accessibility</span>
        </nav>
        <p class="eyebrow yellow">Web Extreme Dev</p>
        <h1 class="page-title">Accessibility</h1>
      </div>
    </section>
    <section class="section">
      <div class="container prose">
        <h2>Our accessibility target</h2>
        <p>
          We build towards WCAG 2.2 Level AA. This is a technical target, not a claim of legal
          certification.
        </p>
        <h2>Using the website</h2>
        <p>
          You can navigate using a keyboard, skip directly to the main content and enlarge text.
          Decorative animations use short transitions and stop after entering view. Content remains
          available when JavaScript is disabled.
        </p>
        <h2>Report a problem</h2>
        <p>
          If something prevents you from using the website, email
          <a href="mailto:contact@webextreme.dev">contact@webextreme.dev</a>. Please include the
          page, what you were trying to do, and your browser or assistive technology if you can.
        </p>
      </div>
    </section>
  </main>
</template>
