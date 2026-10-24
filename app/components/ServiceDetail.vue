<script setup lang="ts">
import type { Service } from '~/content/services';
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
          <BrandIcon :name="service.id" framed />0{{ index + 1 }} / {{ service.title }}
        </p>
        <h2 class="reveal">{{ service.headline }}</h2>
        <p class="detail-lead reveal">{{ service.intro }}</p>
        <p class="reveal">{{ service.body }}</p>
        <div class="tags reveal">
          <span v-for="tag in service.tags" :key="tag">{{ tag }}</span>
        </div>
        <NuxtLink
          class="text-link reveal"
          :to="{ path: '/contact/', query: { service: service.title } }"
          >Discuss this service <span aria-hidden="true">↗</span></NuxtLink
        >
      </div>
      <div class="scope-panel reveal">
        <p class="eyebrow">Typical scope</p>
        <h3>What we can shape together.</h3>
        <ul role="list">
          <li v-for="item in service.scope" :key="item">{{ item }}</li>
        </ul>
        <p class="scope-note">
          The final scope is agreed around your goals, requirements and priorities.
        </p>
      </div>
    </div>
  </section>
</template>
