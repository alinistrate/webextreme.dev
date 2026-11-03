<script setup lang="ts">
const { tr } = useCopy();
</script>
<template>
  <section class="approach section" id="approach">
    <div class="container">
      <div class="process-heading reveal">
        <div>
          <p class="eyebrow">{{ tr('03 / Process') }}</p>
          <h2 tabindex="-1">{{ tr('A clear path from') }}<br />{{ tr('idea to launch.') }}</h2>
        </div>
        <p>
          {{ tr('Six focused steps. Clear decisions throughout.') }}<br />{{
            tr('A process that adapts to the work.')
          }}
        </p>
      </div>
      <ProcessBuild>
        <ol class="process-cards" role="list">
          <li class="reveal">
            <span class="step-icon" aria-hidden="true"><AppIcon name="discover" /></span>
            <span class="step-number">01</span>
            <h3>{{ tr('Discover') }}</h3>
            <p>{{ tr('Align on goals, users and the problem to solve.') }}</p>
          </li>
          <li class="reveal">
            <span class="step-icon" aria-hidden="true"><AppIcon name="scope" /></span>
            <span class="step-number">02</span>
            <h3>{{ tr('Scope') }}</h3>
            <p>{{ tr('Define priorities, deliverables and practical milestones.') }}</p>
          </li>
          <li class="reveal">
            <span class="step-icon" aria-hidden="true"><AppIcon name="design" /></span>
            <span class="step-number">03</span>
            <h3>{{ tr('Design') }}</h3>
            <p>{{ tr('Shape journeys, wireframes and the visual direction.') }}</p>
          </li>
          <li class="reveal">
            <span class="step-icon" aria-hidden="true"><AppIcon name="software" /></span>
            <span class="step-number">04</span>
            <h3>{{ tr('Develop') }}</h3>
            <p>{{ tr('Build working features and review progress together.') }}</p>
          </li>
          <li class="reveal">
            <span class="step-icon" aria-hidden="true"><AppIcon name="test" /></span>
            <span class="step-number">05</span>
            <h3>{{ tr('Test & refine') }}</h3>
            <p>{{ tr('Check usability, accessibility and performance.') }}</p>
          </li>
          <li class="reveal">
            <span class="step-icon" aria-hidden="true"><AppIcon name="launch" /></span>
            <span class="step-number">06</span>
            <h3>{{ tr('Launch & support') }}</h3>
            <p>{{ tr('Prepare the handoff and agree the next steps after launch.') }}</p>
          </li>
        </ol>
      </ProcessBuild>
      <NuxtLinkLocale class="text-link reveal process-more" to="/approach/"
        >{{ tr('Explore our approach') }} <AppIcon name="arrow"
      /></NuxtLinkLocale>
    </div>
  </section>
</template>
