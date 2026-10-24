<script setup lang="ts">
import { services } from '~/content/services';
usePageSeo(
  'Services',
  'Design, web development, ecommerce, automation and custom software. Explore the services available from Web Extreme Dev.',
  '/services/',
);
usePageMotion();
</script>

<template>
  <main id="main" ref="page" tabindex="-1">
    <section class="page-hero dark">
      <div class="container">
        <nav class="breadcrumb" aria-label="Breadcrumb">
          <NuxtLink to="/">Home</NuxtLink><span aria-hidden="true">/</span
          ><span aria-current="page">Services</span>
        </nav>
        <div class="page-hero-grid">
          <div>
            <p class="eyebrow yellow reveal">Services</p>
            <h1 tabindex="-1" class="page-title reveal">
              Good ideas.<br />The right capabilities.
            </h1>
            <p class="page-lead reveal">
              Design, development and connected software, shaped around the work your project needs.
            </p>
          </div>
          <div class="page-art reveal" aria-hidden="true">
            <div class="page-grid-art"></div>
            <svg viewBox="0 0 100 100">
              <path d="M0 0H28L50 28L72 0H100L60 46H40Z" />
              <path d="M40 54H60L100 100H72L50 72L28 100H0Z" /></svg
            ><span>DESIGN / BUILD / CONNECT</span>
          </div>
        </div>
      </div>
    </section>
    <section class="capability-index">
      <div class="container">
        <p class="eyebrow">Explore capabilities</p>
        <nav aria-label="Service categories">
          <a v-for="(service, index) in services" :key="service.id" :href="'#' + service.id"
            ><span>0{{ index + 1 }}</span
            >{{ service.title }}</a
          >
        </nav>
      </div>
    </section>
    <ServiceDetail
      v-for="(service, index) in services"
      :key="service.id"
      :service="service"
      :index="index"
    />
    <section class="section dark">
      <div class="container decision-grid">
        <h2 class="reveal" tabindex="-1">Not sure where<br />to start?</h2>
        <div class="reveal">
          <p>
            Start with the problem you want to solve. We can help clarify the scope and the
            capabilities it needs.
          </p>
          <NuxtLink class="text-link light-link" to="/approach/"
            >See how we work <span aria-hidden="true">↗</span></NuxtLink
          >
        </div>
      </div>
    </section>
    <section class="page-cta section">
      <div class="container reveal">
        <p class="eyebrow">Your next step</p>
        <h2 tabindex="-1">Let us build<br />what comes next.</h2>
        <p>Bring the idea, the challenge or the thing you want to improve.</p>
        <NuxtLink class="button black-button" to="/contact/"
          >Start a conversation <span aria-hidden="true">↗</span></NuxtLink
        >
      </div>
    </section>
  </main>
</template>
