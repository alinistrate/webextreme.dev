/** One-shot reveals wait for route transitions and scroll restoration, with no scroll listener. */
export function usePageMotion() {
  const scope = useTemplateRef<HTMLElement>('page');
  const { enabled } = useMotion();
  const nuxtApp = useNuxtApp();
  let observer: IntersectionObserver | undefined;
  let frame = 0;
  let introFrame = 0;
  let prepared = false;

  function startIntro() {
    if (!enabled.value || !prepared || !scope.value) return;
    cancelAnimationFrame(introFrame);
    scope.value.classList.remove('playing');
    introFrame = requestAnimationFrame(() => scope.value?.classList.add('playing'));
  }

  function prepare() {
    const page = scope.value;
    if (!page || prepared) return;
    prepared = true;
    if ('IntersectionObserver' in window) {
      observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (!entry.isIntersecting) continue;
            entry.target.classList.add('is-visible');
            observer?.unobserve(entry.target);
          }
        },
        { rootMargin: '0px 0px -24px 0px', threshold: 0 },
      );
      // Read positions only after the new page has reached its destination scroll position.
      const candidates = Array.from(
        page.querySelectorAll<HTMLElement>('.reveal, .prose > *, .page-section-heading'),
      ).map((element) => ({ element, top: element.getBoundingClientRect().top }));
      candidates.forEach(({ element, top }, index) => {
        element.classList.add('reveal');
        // Hero copy is always painted for LCP; its dedicated line animation keeps full contrast.
        if (element.closest('.page-hero')) return;
        if (top < window.innerHeight) return;
        element.style.setProperty('--reveal-delay', (index % 3) * 70 + 'ms');
        element.classList.add('is-observed');
        observer?.observe(element);
      });
      // Artwork can begin below the fold on phones, independently of the title intro.
      page.querySelectorAll('.precision-art, .page-art').forEach((art) => observer?.observe(art));
    }
    startIntro();
  }

  function afterScrollRestoration() {
    cancelAnimationFrame(frame);
    let previousY = -1;
    let stableFrames = 0;
    const settle = () => {
      if (!scope.value) return;
      stableFrames =
        !scope.value.classList.contains('route-enter-active') && window.scrollY === previousY
          ? stableFrames + 1
          : 0;
      previousY = window.scrollY;
      if (stableFrames >= 3) prepare();
      else frame = requestAnimationFrame(settle);
    };
    frame = requestAnimationFrame(settle);
  }

  const removeTransitionHook = nuxtApp.hook('page:transition:finish', afterScrollRestoration);
  onMounted(() => {
    // Client navigation mounts while the outgoing page's scroll position is still active.
    if (!scope.value?.classList.contains('route-enter-active')) afterScrollRestoration();
  });
  watch(enabled, (value) => {
    if (value) startIntro();
  });
  onBeforeUnmount(() => {
    removeTransitionHook();
    observer?.disconnect();
    cancelAnimationFrame(frame);
    cancelAnimationFrame(introFrame);
  });
}
