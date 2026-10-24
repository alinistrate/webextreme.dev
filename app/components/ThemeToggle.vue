<script setup lang="ts">
const { toggle } = useTheme();
</script>
<template>
  <button class="icon-button theme-toggle" type="button" @click="toggle">
    <span class="theme-action-dark"
      ><span class="sr-only">Switch to dark theme</span
      ><svg aria-hidden="true" viewBox="0 0 24 24">
        <path d="M20 14a8 8 0 0 1-10-10 8.5 8.5 0 1 0 10 10Z" /></svg
    ></span>
    <span class="theme-action-light"
      ><span class="sr-only">Switch to light theme</span
      ><svg aria-hidden="true" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="4" />
        <path
          d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.5 1.5m11 11L19 19M5 19l1.5-1.5m11-11L19 5"
        /></svg
    ></span>
  </button>
</template>
