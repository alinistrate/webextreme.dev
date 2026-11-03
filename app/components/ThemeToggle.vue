<script setup lang="ts">
const { tr } = useCopy();
const { toggle } = useTheme();
</script>
<template>
  <button class="icon-button theme-toggle" type="button" @click="toggle">
    <span class="theme-action-dark"
      ><span class="sr-only">{{ tr('Switch to dark theme') }}</span
      ><AppIcon name="moon"
    /></span>
    <span class="theme-action-light"
      ><span class="sr-only">{{ tr('Switch to light theme') }}</span
      ><AppIcon name="sun"
    /></span>
  </button>
</template>
