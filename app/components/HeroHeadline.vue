<script setup lang="ts">
const words = ['precision.', 'dedication.', 'commitment.', 'purpose.', 'care.'] as const;
const { enabled } = useMotion();
const heading = useTemplateRef<HTMLElement>('heading');
const displayed = ref<string>(words[0]);
const paused = ref(false);
const ready = ref(false);
const running = ref(false);
let wordIndex = 0;
let phase: 'hold' | 'erase' | 'type' = 'hold';
let inView = false;
let timer: ReturnType<typeof setTimeout> | undefined;
let observer: IntersectionObserver | undefined;

function stop() {
  clearTimeout(timer);
  running.value = false;
}
function schedule(delay: number) {
  stop();
  if (!ready.value || paused.value || !enabled.value || !inView || document.hidden) return;
  running.value = true;
  timer = setTimeout(step, delay);
}
function step() {
  const word = words[wordIndex]!;
  if (phase === 'hold') {
    phase = 'erase';
    schedule(45);
  } else if (phase === 'erase') {
    if (displayed.value.length) {
      displayed.value = displayed.value.slice(0, -1);
      schedule(45);
    } else {
      wordIndex = (wordIndex + 1) % words.length;
      phase = 'type';
      schedule(180);
    }
  } else if (displayed.value.length < word.length) {
    displayed.value = word.slice(0, displayed.value.length + 1);
    schedule(85);
  } else {
    phase = 'hold';
    schedule(1900);
  }
}
function toggle() {
  paused.value = !paused.value;
  // A paused heading always presents a complete, readable phrase.
  displayed.value = words[wordIndex]!;
  phase = 'hold';
  schedule(1900);
}
function onVisibilityChange() {
  if (document.hidden) stop();
  else schedule(1900);
}
onMounted(() => {
  ready.value = true;
  document.addEventListener('visibilitychange', onVisibilityChange);
  if ('IntersectionObserver' in window && heading.value) {
    observer = new IntersectionObserver(([entry]) => {
      inView = !!entry?.isIntersecting;
      if (inView) schedule(1900);
      else stop();
    });
    observer.observe(heading.value);
  } else {
    inView = true;
    schedule(1900);
  }
});
watch(enabled, () => schedule(1900));
onBeforeUnmount(() => {
  stop();
  observer?.disconnect();
  document.removeEventListener('visibilitychange', onVisibilityChange);
});
</script>
<template>
  <div ref="heading" class="hero-heading" :class="{ 'is-running': running }">
    <h1 tabindex="-1">
      <span class="sr-only">Your next idea. Built with precision.</span>
      <span class="headline-line" aria-hidden="true"
        ><span class="type-line">Your next idea.</span></span
      >
      <span class="headline-line" aria-hidden="true"
        ><span class="slide-line line-two">Built with</span></span
      >
      <span class="headline-line headline-word-line" aria-hidden="true">
        <span class="word-stage">
          <span class="word-reserve">commitment.</span>
          <span class="word-copy">{{ displayed }}<span class="word-caret"></span></span>
        </span>
      </span>
    </h1>
    <button
      v-if="ready"
      class="headline-pause"
      type="button"
      :aria-label="paused ? 'Resume rotating headline' : 'Pause rotating headline'"
      :title="paused ? 'Resume animation' : 'Pause animation'"
      @click="toggle"
    >
      <AppIcon :name="paused ? 'play' : 'pause'" />
    </button>
  </div>
</template>
