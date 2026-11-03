<script setup lang="ts">
import type { NuxtError } from '#app';
const { tr } = useCopy();
defineProps<{ error: NuxtError }>();
useHead({ meta: [{ name: 'robots', content: 'noindex' }] });
</script>

<template>
  <main id="main" class="section dark error-page">
    <div class="container">
      <p class="eyebrow yellow">{{ tr(error.statusCode) }}</p>
      <h1>{{ tr(error.statusCode === 404 ? 'Page not found.' : 'Something went wrong.') }}</h1>
      <p>{{ tr('The page may have moved. You can return to the homepage or contact us.') }}</p>
      <button class="button" @click="clearError({ redirect: '/' })">
        {{ tr('Back to home') }} <AppIcon name="arrow" />
      </button>
    </div>
  </main>
</template>
