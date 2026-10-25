<script setup lang="ts">
const { analytics, needsChoice, settingsOpen, save } = useConsent();
const dialog = useTemplateRef<HTMLDialogElement>('dialog');
const draftAnalytics = ref(false);
watch(settingsOpen, async (open) => {
  if (open) {
    draftAnalytics.value = analytics.value;
    await nextTick();
    dialog.value?.showModal();
  } else dialog.value?.close();
});
function accept(allow: boolean) {
  save(allow);
}
</script>
<template>
  <aside v-if="needsChoice" class="cookie-banner" aria-label="Cookie choices">
    <div>
      <h2>Your privacy, your choice.</h2>
      <p>
        Optional Google Analytics starts only after you accept. We use essential security tools to
        protect the site. You can change your choice anytime.
      </p>
      <NuxtLink to="/cookies/">Read our Cookie Policy</NuxtLink>
    </div>
    <div class="cookie-actions">
      <button class="cookie-button" type="button" @click="accept(false)">Reject optional</button
      ><button class="cookie-button" type="button" @click="settingsOpen = true">
        Manage cookies</button
      ><button class="cookie-button" type="button" @click="accept(true)">Accept analytics</button>
    </div>
  </aside>
  <dialog
    ref="dialog"
    class="cookie-dialog"
    aria-labelledby="cookie-title"
    @close="settingsOpen = false"
    @cancel="settingsOpen = false"
  >
    <button
      class="icon-button"
      type="button"
      aria-label="Close cookie settings"
      autofocus
      @click="settingsOpen = false"
    >
      <AppIcon name="close" />
    </button>
    <h2 id="cookie-title">Cookie settings</h2>
    <p>
      Essential security features are always available. Analytics is optional and off until you
      choose it.
    </p>
    <label class="cookie-option"
      ><input type="checkbox" checked disabled />Essential security and your cookie choice
      <span>Always active</span></label
    >
    <label class="cookie-option"
      ><input v-model="draftAnalytics" type="checkbox" />Google Analytics
      <span>Optional website statistics</span></label
    >
    <p>
      <NuxtLink to="/cookies/" @click="settingsOpen = false">Cookie Policy</NuxtLink> ·
      <NuxtLink to="/privacy/" @click="settingsOpen = false">Privacy Policy</NuxtLink>
    </p>
    <div class="cookie-actions">
      <button class="cookie-button" type="button" @click="accept(false)">Reject optional</button
      ><button class="cookie-button" type="button" @click="accept(draftAnalytics)">
        Save preferences
      </button>
    </div>
  </dialog>
</template>
