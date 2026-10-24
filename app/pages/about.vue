<script setup lang="ts">
import { about } from '~/content/about';
usePageSeo(
  'About',
  'Web Extreme Dev is based in Sibiu, Romania. Hands-on web development and technical project delivery experience across websites, ecommerce and applications.',
  '/about/',
);
usePageMotion();
</script>

<template>
  <main id="main" ref="page" tabindex="-1">
    <section class="page-hero dark">
      <div class="container">
        <nav class="breadcrumb" aria-label="Breadcrumb">
          <NuxtLink to="/">Home</NuxtLink><span aria-hidden="true">/</span
          ><span aria-current="page">About</span>
        </nav>
        <div class="page-hero-grid">
          <div>
            <p class="eyebrow yellow reveal">About</p>
            <h1 tabindex="-1" class="page-title reveal">Technical depth.<br />Clear delivery.</h1>
            <p class="page-lead reveal">
              A software and web company based in Sibiu, Romania. Built on practical development and
              project delivery experience.
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
    <section class="section">
      <div class="container about-story">
        <div class="experience-panel dark reveal">
          <span class="experience-number">15+</span>
          <p>Years of web development and technical project delivery experience behind the work.</p>
          <span class="eyebrow yellow">WEB DEVELOPMENT & DELIVERY</span>
        </div>
        <div class="story-copy reveal">
          <p class="eyebrow">The foundation</p>
          <h2 tabindex="-1">Experience that connects<br />the details.</h2>
          <p>{{ about.intro }}</p>
          <p>{{ about.experience }}</p>
          <p>{{ about.delivery }}</p>
        </div>
      </div>
    </section>
    <section class="section soft-section">
      <div class="container">
        <div class="page-section-heading reveal">
          <p class="eyebrow">Technical experience</p>
          <h2>A practical foundation<br />for web projects.</h2>
        </div>
        <div class="content-grid three">
          <article v-for="item in about.technology" :key="item[0]" class="content-card reveal">
            <h3>{{ item[0] }}</h3>
            <p>{{ item[1] }}</p>
          </article>
        </div>
      </div>
    </section>
    <section class="section dark">
      <div class="container">
        <div class="page-section-heading reveal">
          <p class="eyebrow yellow">Working principles</p>
          <h2>Clear thinking.<br />Careful execution.</h2>
        </div>
        <div class="content-grid three">
          <article
            v-for="item in about.principles"
            :key="item[0]"
            class="content-card dark-card reveal"
          >
            <h3>{{ item[0] }}</h3>
            <p>{{ item[1] }}</p>
          </article>
        </div>
        <div class="location-line reveal">
          <span class="location-dot" aria-hidden="true"></span>
          <p>Based in Sibiu, Romania.</p>
          <NuxtLink class="text-link light-link" to="/contact/"
            >Start a conversation <span aria-hidden="true">↗</span></NuxtLink
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
