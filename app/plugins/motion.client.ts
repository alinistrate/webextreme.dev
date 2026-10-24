export default defineNuxtPlugin(() => {
  const { enabled, reduced } = useMotion();
  const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
  function sync() {
    reduced.value = preference.matches;
    enabled.value = !preference.matches;
  }
  onNuxtReady(sync);
  preference.addEventListener('change', sync);
  watch(enabled, (value) => {
    document.documentElement.dataset.motion = value ? 'on' : 'off';
  });
});
