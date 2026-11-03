<script setup lang="ts">
const { tr, locale } = useCopy();
const switchLocalePath = useSwitchLocalePath();
const preference = useCookie<'en' | 'ro' | null>('wed_locale', {
  maxAge: 60 * 60 * 24 * 180,
  sameSite: 'lax',
  secure: import.meta.client ? location.protocol === 'https:' : true,
  default: () => null,
});
const target = computed(() => (locale.value === 'ro' ? 'en' : 'ro'));
const destination = computed(() => switchLocalePath(target.value));
function remember(event: MouseEvent) {
  if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
  preference.value = target.value;
}
</script>
<template>
  <NuxtLink
    class="language-switch icon-button"
    :to="destination"
    :hreflang="target"
    :aria-label="
      target.toUpperCase() + ': ' + tr(target === 'ro' ? 'Switch to Romanian' : 'Switch to English')
    "
    @click="remember"
  >
    {{ target.toUpperCase() }}
  </NuxtLink>
</template>
