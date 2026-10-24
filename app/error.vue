<script setup lang="ts">
import type { NuxtError } from '#app';
defineProps<{ error: NuxtError }>();
useHead({ meta: [{ name: 'robots', content: 'noindex' }] });
</script>

<template>
  <main id="main" class="section dark error-page">
    <div class="container">
      <p class="eyebrow yellow">{{ error.statusCode }}</p>
      <h1>{{ error.statusCode === 404 ? 'Page not found.' : 'Something went wrong.' }}</h1>
      <p>The page may have moved. You can return to the homepage or contact us.</p>
      <button class="button" @click="clearError({ redirect: '/' })">
        Back to home <span aria-hidden="true">↗</span>
      </button>
    </div>
  </main>
</template>
