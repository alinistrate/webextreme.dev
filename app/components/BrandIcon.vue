<script setup lang="ts">
import { icons, type IconName } from '~/content/icons';
defineProps<{ name: IconName; framed?: boolean }>();
</script>
<template>
  <span class="brand-icon" :class="{ 'is-framed': framed }" aria-hidden="true">
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="1.5"
      stroke-linecap="square"
      stroke-linejoin="miter"
    >
      <path v-for="(path, index) in icons[name]" :key="index" :d="path" />
    </svg>
  </span>
</template>
