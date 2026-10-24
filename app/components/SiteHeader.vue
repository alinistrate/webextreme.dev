<script setup lang="ts">
const compact = ref(false);
const route = useRoute();
const { enabled } = useMotion();
function goToForm(event: MouseEvent) {
  if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
  const form = document.getElementById('enquiry-form');
  if (!form) return;
  event.preventDefault();
  form.scrollIntoView({ behavior: enabled.value ? 'smooth' : 'instant', block: 'start' });
  form.focus({ preventScroll: true });
  history.replaceState(null, '', route.path + '#enquiry-form');
}
const open = ref(false);
const trigger = useTemplateRef<HTMLButtonElement>('trigger');
const menu = useTemplateRef('menu');
let observer: IntersectionObserver | undefined;
let sentinel: HTMLElement | undefined;
function openMenu() {
  menu.value?.show();
  open.value = true;
}
function onClose() {
  open.value = false;
  trigger.value?.focus({ preventScroll: true });
}
onMounted(() => {
  sentinel = document.createElement('span');
  sentinel.className = 'header-sentinel';
  sentinel.setAttribute('aria-hidden', 'true');
  document.body.prepend(sentinel);
  observer = new IntersectionObserver(([entry]) => {
    if (entry) compact.value = !entry.isIntersecting && entry.boundingClientRect.top < 0;
  });
  observer.observe(sentinel);
});
onBeforeUnmount(() => {
  observer?.disconnect();
  sentinel?.remove();
});
</script>

<template>
  <header ref="header" class="site-header dark" :class="{ 'is-symbol': compact }">
    <div class="container header-inner">
      <NuxtLink class="brand" to="/" aria-label="Web Extreme Dev home"><BrandLogo /></NuxtLink
      ><NuxtLink
        class="button header-cta"
        :to="route.path === '/' ? '/#enquiry-form' : '/contact/#enquiry-form'"
        @click="goToForm"
        >Let us talk <span aria-hidden="true">↗</span></NuxtLink
      ><button
        ref="trigger"
        class="menu-button icon-button"
        type="button"
        aria-label="Menu"
        :aria-expanded="open"
        aria-controls="site-menu"
        @click="openMenu"
      >
        <span>Menu</span
        ><svg aria-hidden="true" viewBox="0 0 24 24"><path d="M3 8h18M3 16h18" /></svg>
      </button>
    </div>
  </header>
  <SiteMenu ref="menu" @closed="onClose" />
</template>
