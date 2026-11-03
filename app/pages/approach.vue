<script setup lang="ts">
import { steps } from '~/content/approach';
import { processIcons } from '~/content/icons';
const { tr } = useCopy();
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
        <nav class="breadcrumb" :aria-label="tr('Breadcrumb')">
          <NuxtLinkLocale to="/">{{ tr('Home') }}</NuxtLinkLocale
          ><span aria-hidden="true">/</span><span aria-current="page">{{ tr('Approach') }}</span>
        </nav>
        <div class="page-hero-grid">
          <div>
            <p class="eyebrow yellow reveal">{{ tr('Approach') }}</p>
            <h1 tabindex="-1" class="page-title reveal">
              <span class="page-title-line">{{ tr('A clear path.') }}</span>
              <span class="page-title-line">{{ tr('From idea to launch.') }}</span>
            </h1>
            <p class="page-lead reveal">
              {{ tr('Six focused stages, with clear decisions and useful feedback throughout.') }}
            </p>
          </div>
          <PageHeroArt variant="approach" />
        </div>
      </div>
    </section>
    <section class="section">
      <div class="container">
        <div class="page-section-heading reveal">
          <p class="eyebrow">{{ tr('The process') }}</p>
          <h2 tabindex="-1">{{ tr('Know what happens next.') }}</h2>
          <p>
            {{
              tr(
                'Each stage makes the next decision easier. The level of detail adapts to the scope of the project.',
              )
            }}
          </p>
        </div>
        <ol class="phase-list" role="list">
          <li v-for="(step, index) in steps" :id="'phase-' + (index + 1)" :key="step.title">
            <div class="phase-title reveal">
              <p class="eyebrow icon-label">
                <AppIcon :name="processIcons[index]!" framed />0{{ tr(index + 1) }} /
                {{ tr(step.title) }}
              </p>
              <h3>{{ tr(step.lead) }}</h3>
            </div>
            <div class="phase-content reveal">
              <p>{{ tr(step.copy) }}</p>
              <h4>{{ tr('What comes out of this stage') }}</h4>
              <ul>
                <li v-for="item in step.output" :key="item">{{ tr(item) }}</li>
              </ul>
              <div class="your-input">
                <h4>{{ tr('Your input') }}</h4>
                <p>{{ tr(step.input) }}</p>
              </div>
            </div>
          </li>
        </ol>
      </div>
    </section>
    <section class="section soft-section">
      <div class="container">
        <div class="page-section-heading reveal">
          <p class="eyebrow">{{ tr('Throughout the project') }}</p>
          <h2 tabindex="-1">{{ tr('Clear work.') }}<br />{{ tr('Shared decisions.') }}</h2>
        </div>
        <div class="content-grid three">
          <article class="content-card reveal">
            <h3>{{ tr('Agreed scope') }}</h3>
            <p>
              {{
                tr(
                  'A shared understanding of what is included, what is still open and what changes.',
                )
              }}
            </p>
          </article>
          <article class="content-card reveal">
            <h3>{{ tr('Reviewable progress') }}</h3>
            <p>
              {{
                tr(
                  'Regular opportunities to assess the direction and answer the important questions.',
                )
              }}
            </p>
          </article>
          <article class="content-card reveal">
            <h3>{{ tr('A considered release') }}</h3>
            <p>
              {{
                tr(
                  'Testing and handoff are part of the work, with ownership and next steps agreed.',
                )
              }}
            </p>
          </article>
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
