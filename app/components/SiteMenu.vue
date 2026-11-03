<script setup lang="ts">
import { navigation } from '~/content/site';
const { tr } = useCopy();
const emit = defineEmits<{ closed: [] }>();
const dialog = useTemplateRef<HTMLDialogElement>('dialog');
const closing = ref(false);
const route = useRoute();
const localePath = useLocalePath();
const { enabled } = useMotion();
let destination: string | undefined;
let run = 0;
function show() {
  ++run;
  closing.value = false;
  destination = undefined;
  dialog.value?.showModal();
  document.body.classList.add('modal-open');
}
function follow(event: MouseEvent, to: string) {
  if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
  event.preventDefault();
  void close(to);
}
async function close(to?: string) {
  if (!dialog.value?.open) return;
  if (to) destination = to;
  if (closing.value || !enabled.value) {
    dialog.value.close();
    return;
  }
  closing.value = true;
  const current = ++run;
  await nextTick();
  await Promise.allSettled(
    dialog.value.getAnimations({ subtree: true }).map((animation) => animation.finished),
  );
  if (current === run) dialog.value?.close();
}
function onClosed() {
  ++run;
  closing.value = false;
  document.body.classList.remove('modal-open');
  emit('closed');
  if (destination) {
    const to = destination;
    destination = undefined;
    void navigateTo(localePath(to));
  }
}
watch(enabled, (value) => {
  if (!value && closing.value) dialog.value?.close();
});
onBeforeUnmount(() => {
  ++run;
  document.body.classList.remove('modal-open');
});
defineExpose({ show });
</script>

<template>
  <dialog
    id="site-menu"
    ref="dialog"
    class="mobile-menu dark"
    :class="{ 'is-closing': closing }"
    :aria-label="tr('Site menu')"
    @cancel.prevent="close()"
    @close="onClosed"
  >
    <div class="mobile-menu-inner">
      <div class="menu-top">
        <NuxtLinkLocale
          class="brand"
          to="/"
          :aria-label="tr('Web Extreme Dev home')"
          @click.prevent="close('/')"
          ><BrandLogo /></NuxtLinkLocale
        ><button
          class="icon-button menu-close"
          type="button"
          :aria-label="tr('Close menu')"
          autofocus
          @click="close()"
        >
          <AppIcon name="close" />
        </button>
      </div>
      <p class="eyebrow yellow">{{ tr('Explore webextreme.dev') }}</p>
      <nav :aria-label="tr('Main navigation')">
        <NuxtLinkLocale
          v-for="(item, index) in navigation"
          :key="item.to"
          :to="item.to"
          :aria-current="
            route.path.replace(/\/$/, '') === localePath(item.to).replace(/\/$/, '')
              ? 'page'
              : undefined
          "
          @click="follow($event, item.to)"
          ><span class="eyebrow">0{{ tr(index + 1) }}</span
          >{{ tr(item.label) }}<AppIcon name="arrow"
        /></NuxtLinkLocale>
      </nav>
      <NuxtLinkLocale
        class="button menu-project"
        to="/contact/"
        @click="follow($event, '/contact/')"
        >{{ tr('Start a project') }} <AppIcon name="arrow" /></NuxtLinkLocale
      ><a class="menu-email" href="mailto:contact@webextreme.dev">contact@webextreme.dev</a>
    </div>
  </dialog>
</template>
