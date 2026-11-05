<script setup lang="ts">
import { site } from '~/content/site';
const { tr } = useCopy();
withDefaults(defineProps<{ showEmail?: boolean }>(), { showEmail: true });
</script>

<template>
  <div class="contact-links">
    <a v-if="showEmail" class="email-link" :href="'mailto:' + site.email">
      <AppIcon name="email" />{{ site.email }}
    </a>
    <a class="phone-link plain-button" :href="'tel:' + site.phone">
      <span class="sr-only">{{ tr('Phone') }}: </span>{{ site.phoneDisplay }}
    </a>
  </div>
</template>

<style scoped>
.contact-links {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.contact-links > a {
  margin-block: 0;
  padding-block: 8px;
  min-block-size: 48px;
  inline-size: fit-content;
}
.phone-link {
  display: inline-flex;
  align-items: center;
  font-size: 1rem;
  white-space: nowrap;
}
</style>
