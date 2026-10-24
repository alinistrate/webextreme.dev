<script setup lang="ts">
import { loadTurnstile, type TurnstileApi } from '~/utils/turnstile';
const token = defineModel<string>({ default: '' });
const widget = useTemplateRef<HTMLElement>('widget');
const error = ref('');
const config = useRuntimeConfig();
let api: TurnstileApi | undefined;
let widgetId: string | undefined;
let observer: IntersectionObserver | undefined;
let disposed = false;
let loading = false;
async function start() {
  if (loading || !widget.value) return;
  if (widgetId && api) {
    if (!error.value) return;
    api.remove(widgetId);
    widgetId = undefined;
    token.value = '';
  }
  if (!config.public.turnstileSiteKey) {
    error.value = 'The security check is not configured yet. Please email contact@webextreme.dev.';
    return;
  }
  loading = true;
  error.value = '';
  try {
    api = await loadTurnstile();
    if (disposed || !widget.value) return;
    widgetId = api.render(widget.value, {
      sitekey: config.public.turnstileSiteKey,
      action: 'contact',
      theme: 'light',
      size: 'compact',
      'response-field': false,
      callback: (value: string) => {
        token.value = value;
        error.value = '';
      },
      'expired-callback': () => {
        token.value = '';
      },
      'error-callback': () => {
        token.value = '';
        error.value = 'The security check could not load. Please retry or contact us by email.';
        return true;
      },
    });
  } catch {
    error.value = 'The security check could not load. Please retry or contact us by email.';
  } finally {
    loading = false;
  }
}
function reset() {
  token.value = '';
  if (api && widgetId) api.reset(widgetId);
}
onMounted(() => {
  if ('IntersectionObserver' in window && widget.value) {
    observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          observer?.disconnect();
          void start();
        }
      },
      { rootMargin: '200px' },
    );
    observer.observe(widget.value);
  } else void start();
});
onBeforeUnmount(() => {
  disposed = true;
  observer?.disconnect();
  if (api && widgetId) api.remove(widgetId);
});
defineExpose({ reset, start });
</script>
<template>
  <div class="turnstile-check">
    <p class="form-note">Spam protection by Cloudflare Turnstile.</p>
    <div ref="widget" class="turnstile-widget"></div>
    <input type="hidden" name="cf-turnstile-response" :value="token" />
    <p v-if="error" role="status" class="form-note">
      {{ error }}
      <button type="button" class="text-link" @click="start">Retry security check</button>
    </p>
  </div>
</template>
