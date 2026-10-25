<script setup lang="ts">
import { about } from '~/content/about';
import type { IconName } from '~/content/icons';
const technicalIcons: IconName[] = ['software', 'performance', 'security'];
const principleIcons: IconName[] = ['clarity', 'conversation', 'delivery'];
usePageSeo(
  'About',
  'Web Extreme Dev brings hands-on web development and technical project delivery experience across websites, ecommerce and applications.',
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
            <h1 tabindex="-1" class="page-title reveal">
              <span class="page-title-line">Technical depth.</span>
              <span class="page-title-line">Clear delivery.</span>
            </h1>
            <p class="page-lead reveal">
              A software and web company. Built on practical development and project delivery
              experience.
            </p>
          </div>
          <PageHeroArt variant="about" />
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
          <p class="eyebrow icon-label"><BrandIcon name="delivery" framed />The foundation</p>
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
          <article
            v-for="(item, index) in about.technology"
            :key="item[0]"
            class="content-card reveal"
          >
            <BrandIcon :name="technicalIcons[index]!" framed />
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
            v-for="(item, index) in about.principles"
            :key="item[0]"
            class="content-card dark-card reveal"
          >
            <BrandIcon :name="principleIcons[index]!" framed />
            <h3>{{ item[0] }}</h3>
            <p>{{ item[1] }}</p>
          </article>
        </div>
        <div class="location-line reveal">
          <span class="location-dot" aria-hidden="true"></span>
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
