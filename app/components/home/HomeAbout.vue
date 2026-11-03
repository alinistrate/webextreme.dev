<script setup lang="ts">
const { tr } = useCopy();
</script>
<template>
  <section class="about section dark" id="about">
    <div class="container about-grid">
      <div>
        <p class="eyebrow yellow">{{ tr('02 / Built together') }}</p>
        <h2 tabindex="-1" class="reveal">
          {{ tr('A clear direction.') }}<br />{{ tr('A connected process.') }}
        </h2>
        <p class="eyebrow about-note">{{ tr('Design. Development. One clear direction.') }}</p>
      </div>
      <div>
        <p class="about-description reveal">
          {{
            tr(
              'Design and development move together. Clear priorities, useful feedback and shared decisions keep your project focused from first idea to launch.',
            )
          }}
        </p>
        <ul class="principles" role="list">
          <li>
            <h3>{{ tr('Clear scope') }}</h3>
            <p>{{ tr('Agree on the goals and what will be delivered.') }}</p>
          </li>
          <li>
            <h3>{{ tr('Useful feedback') }}</h3>
            <p>{{ tr('Review progress and make decisions together.') }}</p>
          </li>
          <li>
            <h3>{{ tr('Careful delivery') }}</h3>
            <p>{{ tr('Test the details before handing over the build.') }}</p>
          </li>
        </ul>
        <NuxtLinkLocale class="text-link light-link reveal" to="/about/"
          >{{ tr('More about the company') }} <AppIcon name="arrow"
        /></NuxtLinkLocale>
      </div>
    </div>
  </section>
</template>
