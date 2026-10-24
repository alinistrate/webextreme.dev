export default defineNuxtPlugin(() => {
  const { enabled } = useMotion();
  // The approved visual direction keeps short, non-looping motion active for all visitors.
  onNuxtReady(() => {
    enabled.value = true;
    document.documentElement.dataset.motion = 'on';
  });
});
