<script setup lang="ts">
const track = useTemplateRef<HTMLElement>('track');
const { enabled } = useMotion();
let frame = 0;
let fallback = false;
function update() {
  frame = 0;
  const rail = track.value;
  const orb = rail?.querySelector<HTMLElement>('.journey-orb');
  if (!rail || !orb) return;
  if (!enabled.value) {
    orb.style.translate = '';
    return;
  }
  const bounds = rail.getBoundingClientRect();
  if (bounds.bottom < 0 || bounds.top > innerHeight) return;
  // The four Bézier segments have linear Y and quadratic X: 4t(1-t) per quarter.
  const progress = Math.max(
    0,
    Math.min(1, (innerHeight / 2 + orb.offsetHeight / 2 - bounds.top) / bounds.height),
  );
  const quarter = Math.min(3, Math.floor(progress * 4));
  const t = progress * 4 - quarter;
  const wave = (quarter % 2 === 0 ? 1 : -1) * 4 * t * (1 - t);
  const amplitude = innerWidth <= 700 ? 0.3 : innerWidth <= 1100 ? 0.015 : 0.03;
  orb.style.translate = wave * bounds.width * amplitude + 'px 0';
}
function schedule() {
  if (fallback && !frame) frame = requestAnimationFrame(update);
}
onMounted(() => {
  fallback =
    !CSS.supports('animation-timeline: view()') ||
    !CSS.supports('animation-range: cover calc(50svh + 64px) cover calc(100% - 50svh - 64px)');
  if (!fallback) return;
  track.value?.classList.add('is-fallback');
  window.addEventListener('scroll', schedule, { passive: true });
  window.addEventListener('resize', schedule, { passive: true });
  schedule();
});
watch(enabled, schedule);
onBeforeUnmount(() => {
  cancelAnimationFrame(frame);
  window.removeEventListener('scroll', schedule);
  window.removeEventListener('resize', schedule);
});
</script>
<template>
  <div class="services-journey">
    <div ref="track" class="journey-track" aria-hidden="true">
      <svg viewBox="0 0 100 100" preserveAspectRatio="none">
        <path
          class="journey-path-desktop"
          d="M50 0C54 8.3333 54 16.6667 50 25C46 33.3333 46 41.6667 50 50C54 58.3333 54 66.6667 50 75C46 83.3333 46 91.6667 50 100"
        />
        <path
          class="journey-path-tablet"
          d="M50 0C52 8.3333 52 16.6667 50 25C48 33.3333 48 41.6667 50 50C52 58.3333 52 66.6667 50 75C48 83.3333 48 91.6667 50 100"
        />
        <path
          class="journey-path-mobile"
          d="M50 0C90 8.3333 90 16.6667 50 25C10 33.3333 10 41.6667 50 50C90 58.3333 90 66.6667 50 75C10 83.3333 10 91.6667 50 100"
        />
      </svg>
      <div class="journey-orb"><span></span></div>
    </div>
    <slot />
  </div>
</template>
