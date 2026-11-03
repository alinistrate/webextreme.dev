<script setup lang="ts">
const { tr } = useCopy();
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
  <aside v-if="needsChoice" class="cookie-banner" :aria-label="tr('Cookie choices')">
    <div>
      <h2>{{ tr('Your privacy, your choice.') }}</h2>
      <p>
        {{
          tr(
            'Optional Google Analytics starts only after you accept. We use essential security tools to protect the site. You can change your choice anytime.',
          )
        }}
      </p>
      <NuxtLinkLocale to="/cookies/">{{ tr('Read our Cookie Policy') }}</NuxtLinkLocale>
    </div>
    <div class="cookie-actions">
      <button class="cookie-button" type="button" @click="accept(false)">
        {{ tr('Reject optional') }}</button
      ><button class="cookie-button" type="button" @click="settingsOpen = true">
        {{ tr('Manage cookies') }}</button
      ><button class="cookie-button" type="button" @click="accept(true)">
        {{ tr('Accept analytics') }}
      </button>
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
      :aria-label="tr('Close cookie settings')"
      autofocus
      @click="settingsOpen = false"
    >
      <AppIcon name="close" />
    </button>
    <h2 id="cookie-title">{{ tr('Cookie settings') }}</h2>
    <p>
      {{
        tr(
          'Essential security features are always available. Analytics is optional and off until you choose it.',
        )
      }}
    </p>
    <label class="cookie-option"
      ><input type="checkbox" checked disabled />{{
        tr('Essential security and your cookie choice')
      }}
      <span>{{ tr('Always active') }}</span></label
    >
    <label class="cookie-option"
      ><input v-model="draftAnalytics" type="checkbox" />{{ tr('Google Analytics') }}
      <span>{{ tr('Optional website statistics') }}</span></label
    >
    <p>
      <NuxtLinkLocale to="/cookies/" @click="settingsOpen = false">{{
        tr('Cookie Policy')
      }}</NuxtLinkLocale>
      ·
      <NuxtLinkLocale to="/privacy/" @click="settingsOpen = false">{{
        tr('Privacy Policy')
      }}</NuxtLinkLocale>
    </p>
    <div class="cookie-actions">
      <button class="cookie-button" type="button" @click="accept(false)">
        {{ tr('Reject optional') }}</button
      ><button class="cookie-button" type="button" @click="accept(draftAnalytics)">
        {{ tr('Save preferences') }}
      </button>
    </div>
  </dialog>
</template>
