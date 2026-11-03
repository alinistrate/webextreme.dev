<script setup lang="ts">
import { services } from '~/content/services';
const { tr } = useCopy();
usePageSeo(
  'Services',
  'Web development, ecommerce, design, web applications, automation, technical consulting and custom web hosting. Explore the services available from Web Extreme Dev.',
  '/services/',
);
usePageMotion();
</script>

<template>
  <main id="main" ref="page" tabindex="-1">
    <section class="page-hero dark">
      <div class="container">
        <nav class="breadcrumb" :aria-label="tr('Breadcrumb')">
          <NuxtLinkLocale to="/">{{ tr('Home') }}</NuxtLinkLocale
          ><span aria-hidden="true">/</span><span aria-current="page">{{ tr('Services') }}</span>
        </nav>
        <div class="page-hero-grid">
          <div>
            <p class="eyebrow yellow reveal">{{ tr('Services') }}</p>
            <h1 tabindex="-1" class="page-title reveal">
              <span class="page-title-line">{{ tr('Good ideas.') }}</span>
              <span class="page-title-line">{{ tr('The right capabilities.') }}</span>
            </h1>
            <p class="page-lead reveal">
              {{
                tr(
                  'Websites, ecommerce and connected web applications, shaped around the work your project needs.',
                )
              }}
            </p>
          </div>
          <PageHeroArt variant="services" />
        </div>
      </div>
    </section>
    <section class="capability-index">
      <div class="container">
        <p class="eyebrow">{{ tr('Explore capabilities') }}</p>
        <nav :aria-label="tr('Service categories')">
          <NuxtLink v-for="(service, index) in services" :key="service.id" :to="'#' + service.id"
            ><span>0{{ tr(index + 1) }}</span
            >{{ tr(service.title) }}</NuxtLink
          >
        </nav>
      </div>
    </section>
    <ServicesJourney>
      <ServiceDetail
        v-for="(service, index) in services"
        :key="service.id"
        :service="service"
        :index="index"
      />
    </ServicesJourney>
    <section class="section dark">
      <div class="container decision-grid">
        <h2 class="reveal" tabindex="-1">{{ tr('Not sure where') }}<br />{{ tr('to start?') }}</h2>
        <div class="reveal">
          <p>
            {{
              tr(
                'Start with the problem you want to solve. We can help clarify the scope and the capabilities it needs.',
              )
            }}
          </p>
          <NuxtLinkLocale class="text-link light-link" to="/approach/"
            >{{ tr('See how we work') }} <AppIcon name="arrow"
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
