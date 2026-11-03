<script setup lang="ts">
const { tr } = useCopy();
</script>
<template>
  <section class="hero dark" id="home">
    <div class="container hero-grid">
      <div class="hero-copy">
        <p class="eyebrow yellow">
          <span class="desktop-eyebrow">{{ tr('Web development, software & design') }}</span
          ><span class="mobile-eyebrow">{{ tr('Design & development') }}</span>
        </p>
        <HeroHeadline />
        <p class="hero-description">
          {{ tr('Websites, ecommerce and web applications.') }}<br class="desktop-break" />
          {{ tr('A connected approach from your idea to launch.') }}
        </p>
        <div class="hero-actions">
          <NuxtLinkLocale class="button" to="/contact/"
            >{{ tr('Start a project') }} <AppIcon name="arrow" /></NuxtLinkLocale
          ><NuxtLinkLocale class="text-link light-link" to="/services/">{{
            tr('Explore services')
          }}</NuxtLinkLocale>
        </div>
        <div class="hero-meta">
          <p>{{ tr('Clear thinking. Precise execution.') }}</p>
        </div>
      </div>
      <div class="hero-visual">
        <div class="precision-art" aria-hidden="true">
          <div class="contour contour-1"></div>
          <div class="contour contour-2"></div>
          <div class="contour contour-3"></div>
          <div class="contour contour-4"></div>
          <svg viewBox="0 0 100 100" class="hero-x">
            <path class="x-upper" d="M0 0H28L50 28L72 0H100L60 46H40Z" />
            <path class="x-lower" d="M40 54H60L100 100H72L50 72L28 100H0Z" />
          </svg>
          <i class="corner corner-tl"></i><i class="corner corner-tr"></i
          ><i class="corner corner-bl"></i><i class="corner corner-br"></i>
        </div>
        <p class="eyebrow art-caption">{{ tr('X / Precision') }}</p>
      </div>
    </div>
  </section>
</template>
