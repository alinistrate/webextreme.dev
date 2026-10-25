<script setup lang="ts">
import { steps } from '~/content/approach';
import { processIcons } from '~/content/icons';
usePageSeo(
  'Our approach',
  'From discovery and scope to design, development, testing and launch. See how we plan and deliver web projects.',
  '/approach/',
);
usePageMotion();
</script>

<template>
  <main id="main" ref="page" tabindex="-1">
    <section class="page-hero dark">
      <div class="container">
        <nav class="breadcrumb" aria-label="Breadcrumb">
          <NuxtLink to="/">Home</NuxtLink><span aria-hidden="true">/</span
          ><span aria-current="page">Approach</span>
        </nav>
        <div class="page-hero-grid">
          <div>
            <p class="eyebrow yellow reveal">Approach</p>
            <h1 tabindex="-1" class="page-title reveal">
              <span class="page-title-line">A clear path.</span>
              <span class="page-title-line">From idea to launch.</span>
            </h1>
            <p class="page-lead reveal">
              Six focused stages, with clear decisions and useful feedback throughout.
            </p>
          </div>
          <PageHeroArt variant="approach" />
        </div>
      </div>
    </section>
    <section class="section">
      <div class="container">
        <div class="page-section-heading reveal">
          <p class="eyebrow">The process</p>
          <h2 tabindex="-1">Know what happens next.</h2>
          <p>
            Each stage makes the next decision easier. The level of detail adapts to the scope of
            the project.
          </p>
        </div>
        <ol class="phase-list" role="list">
          <li v-for="(step, index) in steps" :id="'phase-' + (index + 1)" :key="step.title">
            <div class="phase-title reveal">
              <span class="phase-number icon-label"
                ><AppIcon :name="processIcons[index]!" framed />0{{ index + 1 }}</span
              >
              <h3>{{ step.title }}</h3>
              <p>{{ step.lead }}</p>
            </div>
            <div class="phase-content reveal">
              <p>{{ step.copy }}</p>
              <h4>What comes out of this stage</h4>
              <ul>
                <li v-for="item in step.output" :key="item">{{ item }}</li>
              </ul>
              <div class="your-input">
                <h4>Your input</h4>
                <p>{{ step.input }}</p>
              </div>
            </div>
          </li>
        </ol>
      </div>
    </section>
    <section class="section soft-section">
      <div class="container">
        <div class="page-section-heading reveal">
          <p class="eyebrow">Throughout the project</p>
          <h2 tabindex="-1">Clear work.<br />Shared decisions.</h2>
        </div>
        <div class="content-grid three">
          <article class="content-card reveal">
            <h3>Agreed scope</h3>
            <p>A shared understanding of what is included, what is still open and what changes.</p>
          </article>
          <article class="content-card reveal">
            <h3>Reviewable progress</h3>
            <p>Regular opportunities to assess the direction and answer the important questions.</p>
          </article>
          <article class="content-card reveal">
            <h3>A considered release</h3>
            <p>Testing and handoff are part of the work, with ownership and next steps agreed.</p>
          </article>
        </div>
      </div>
    </section>
    <section class="page-cta section">
      <div class="container reveal">
        <p class="eyebrow">Your next step</p>
        <h2 tabindex="-1">Let us build<br />what comes next.</h2>
        <p>Bring the idea, the challenge or the thing you want to improve.</p>
        <NuxtLink class="button black-button" to="/contact/"
          >Start a conversation <AppIcon name="arrow"
        /></NuxtLink>
      </div>
    </section>
  </main>
</template>
