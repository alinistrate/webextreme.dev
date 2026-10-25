<script setup lang="ts">
const story = useTemplateRef<HTMLElement>('story');
let observer: IntersectionObserver | undefined;
onMounted(() => {
  const root = story.value;
  if (!root) return;
  const native =
    CSS.supports('animation-timeline: view()') &&
    CSS.supports('animation-range: entry') &&
    CSS.supports('timeline-scope: --build-1');
  if (native || !('IntersectionObserver' in window)) return;
  root.classList.add('is-fallback');
  const layers = root.querySelectorAll('.build-layer');
  const steps = Array.from(root.querySelectorAll('.process-cards > li'));
  observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const current = steps.indexOf(entry.target);
        layers.forEach((layer, index) => layer.classList.toggle('is-built', index <= current));
      }
    },
    { rootMargin: '0px 0px -35% 0px', threshold: 0.35 },
  );
  steps.forEach((step) => observer?.observe(step));
});
onBeforeUnmount(() => observer?.disconnect());
</script>
<template>
  <div ref="story" class="process-build">
    <div class="build-scene" aria-hidden="true">
      <div class="build-canvas">
        <div class="build-grid"></div>
        <div class="build-layer build-shell">
          <div class="build-browser-bar"><i></i><i></i><i></i><span>webextreme.dev</span></div>
        </div>
        <div class="build-layer build-wireframe">
          <span></span><span></span><span></span><span></span>
        </div>
        <div class="build-layer build-interface">
          <BrandLogo />
          <strong>Your next idea.<br /><em>Built with precision.</em></strong>
          <div class="build-mini-cta">Let us build <AppIcon name="arrow" /></div>
          <div class="build-mini-cards">
            <AppIcon name="design" /><AppIcon name="ecommerce" /><AppIcon name="software" />
          </div>
        </div>
        <div class="build-layer build-code">
          <AppIcon name="software" /><span>BUILD<br /><b>CONNECTED</b></span>
        </div>
        <div class="build-layer build-checks">
          <AppIcon name="test" /><AppIcon name="security" /><AppIcon name="performance" />
        </div>
        <div class="build-layer build-launch">
          <AppIcon name="launch" /><span>READY TO LAUNCH</span>
        </div>
      </div>
      <p class="build-caption">FROM FIRST SKETCH TO WHAT COMES NEXT.</p>
      <div class="build-progress"></div>
    </div>
    <slot />
  </div>
</template>
