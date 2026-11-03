<script setup lang="ts">
import type { Service } from '~/content/services';
const { tr } = useCopy();
defineProps<{ service: Service; index: number }>();
</script>
<template>
  <section
    :id="service.id"
    class="service-detail-block section"
    :class="{ 'soft-section': index % 2 === 1 }"
  >
    <div class="container detail-grid">
      <div class="detail-copy">
        <p class="eyebrow reveal icon-label">
          <AppIcon :name="service.id" framed />0{{ tr(index + 1) }} / {{ tr(service.title) }}
        </p>
        <h2 class="reveal">{{ tr(service.headline) }}</h2>
        <p class="detail-lead reveal">{{ tr(service.intro) }}</p>
        <p class="reveal">{{ tr(service.body) }}</p>
        <div class="tags reveal">
          <span v-for="tag in service.tags" :key="tag">{{ tr(tag) }}</span>
        </div>
        <NuxtLinkLocale
          class="text-link reveal"
          :to="{ path: '/contact/', query: { service: service.title } }"
          >{{ tr('Discuss this service') }} <AppIcon name="arrow"
        /></NuxtLinkLocale>
      </div>
      <div class="scope-panel reveal">
        <p class="eyebrow">{{ tr('Typical scope') }}</p>
        <h3>{{ tr('What we can shape together.') }}</h3>
        <ul role="list">
          <li v-for="item in service.scope" :key="item">{{ tr(item) }}</li>
        </ul>
        <p class="scope-note">
          {{ tr('The final scope is agreed around your goals, requirements and priorities.') }}
        </p>
      </div>
    </div>
  </section>
</template>
