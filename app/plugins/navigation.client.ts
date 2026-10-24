export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.hook('page:finish', () => {
    requestAnimationFrame(() => {
      // A route change moves keyboard and assistive-technology users into the new content.
      if (!window.location.hash)
        document.querySelector<HTMLElement>('#main')?.focus({ preventScroll: true });
    });
  });
});
