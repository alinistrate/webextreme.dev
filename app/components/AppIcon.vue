<script setup lang="ts">
import { icons, type IconName } from '~/content/icons';
defineProps<{ name: IconName; framed?: boolean }>();
</script>
<template>
  <span
    class="app-icon"
    :class="{ 'is-framed': framed, 'is-arrow': name === 'arrow' }"
    aria-hidden="true"
  >
    <svg
      viewBox="0 0 24 24"
      :data-icon="name"
      fill="none"
      stroke="currentColor"
      stroke-width="1.75"
      stroke-linecap="round"
      stroke-linejoin="round"
      focusable="false"
      aria-hidden="true"
    >
      <path v-for="(path, index) in icons[name]" :key="index" :d="path" />
    </svg>
  </span>
</template>
