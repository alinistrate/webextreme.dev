<script setup lang="ts">
import { about } from '~/content/about';
import type { IconName } from '~/content/icons';
const { tr } = useCopy();
const technicalIcons: IconName[] = [
  'software',
  'landing-pages',
  'automation',
  'web-development',
  'launch',
];
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
        <nav class="breadcrumb" :aria-label="tr('Breadcrumb')">
          <NuxtLinkLocale to="/">{{ tr('Home') }}</NuxtLinkLocale
          ><span aria-hidden="true">/</span><span aria-current="page">{{ tr('About') }}</span>
        </nav>
        <div class="page-hero-grid">
          <div>
            <p class="eyebrow yellow reveal">{{ tr('About') }}</p>
            <h1 tabindex="-1" class="page-title reveal">
              <span class="page-title-line">{{ tr('Technical depth.') }}</span>
              <span class="page-title-line">{{ tr('Clear delivery.') }}</span>
            </h1>
            <p class="page-lead reveal">
              {{
                tr(
                  'A web development company. Built on practical development and project delivery experience.',
                )
              }}
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
          <p>
            {{
              tr(
                'Years of web development and technical project delivery experience behind the work.',
              )
            }}
          </p>
          <span class="eyebrow yellow">{{ tr('WEB DEVELOPMENT & DELIVERY') }}</span>
        </div>
        <div class="story-copy reveal">
          <p class="eyebrow icon-label">
            <AppIcon name="delivery" framed />{{ tr('The foundation') }}
          </p>
          <h2 tabindex="-1">{{ tr('Experience that connects') }}<br />{{ tr('the details.') }}</h2>
          <p>{{ tr(about.intro) }}</p>
          <p>{{ tr(about.experience) }}</p>
          <p>{{ tr(about.delivery) }}</p>
        </div>
      </div>
    </section>
    <section class="section soft-section">
      <div class="container">
        <div class="page-section-heading reveal">
          <p class="eyebrow">{{ tr('Technical experience') }}</p>
          <h2>{{ tr('A practical foundation') }}<br />{{ tr('for web projects.') }}</h2>
        </div>
        <div class="content-grid three">
          <article
            v-for="(item, index) in about.technology"
            :key="item[0]"
            class="content-card reveal"
          >
            <AppIcon :name="technicalIcons[index]!" framed />
            <h3>{{ tr(item[0]) }}</h3>
            <p>{{ tr(item[1]) }}</p>
          </article>
        </div>
      </div>
    </section>
    <section class="section dark">
      <div class="container">
        <div class="page-section-heading reveal">
          <p class="eyebrow yellow">{{ tr('Working principles') }}</p>
          <h2>{{ tr('Clear thinking.') }}<br />{{ tr('Careful execution.') }}</h2>
        </div>
        <div class="content-grid three">
          <article
            v-for="(item, index) in about.principles"
            :key="item[0]"
            class="content-card dark-card reveal"
          >
            <AppIcon :name="principleIcons[index]!" framed />
            <h3>{{ tr(item[0]) }}</h3>
            <p>{{ tr(item[1]) }}</p>
          </article>
        </div>
        <div class="location-line reveal">
          <span class="location-dot" aria-hidden="true"></span>
          <NuxtLinkLocale class="text-link light-link" to="/contact/"
            >{{ tr('Start a conversation') }} <AppIcon name="arrow"
          /></NuxtLinkLocale>
        </div>
      </div>
    </section>
    <section class="page-cta section">
      <div class="container reveal">
        <p class="eyebrow">{{ tr('Your next step') }}</p>
        <h2 tabindex="-1">{{ tr('Let us build') }}<br />{{ tr('what comes next.') }}</h2>
        <p>{{ tr('Bring the idea, the challenge or the thing you want to improve.') }}</p>
        <NuxtLinkLocale class="button black-button" to="/contact/"
          >{{ tr('Start a conversation') }} <AppIcon name="arrow"
        /></NuxtLinkLocale>
      </div>
    </section>
  </main>
</template>
