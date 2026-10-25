<script setup lang="ts">
import { icons, type IconName } from '~/content/icons';
const props = defineProps<{ name: IconName; framed?: boolean }>();
const definition = computed(() => icons[props.name]);
const viewBox = computed(() => '0 0 ' + definition.value.icon[0] + ' ' + definition.value.icon[1]);
const paths = computed(() => {
  const data = definition.value.icon[4];
  return typeof data === 'string' ? [data] : data;
});
</script>
<template>
  <span
    class="app-icon"
    :class="{ 'is-framed': framed, 'is-arrow': name === 'arrow' }"
    aria-hidden="true"
  >
    <svg
      :viewBox="viewBox"
      :data-icon="definition.iconName"
      fill="currentColor"
      focusable="false"
      aria-hidden="true"
    >
      <path v-for="(path, index) in paths" :key="index" :d="path" />
    </svg>
  </span>
</template>
