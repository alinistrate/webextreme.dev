/** Fixed-duration reveals match the approved prototype without continuous scroll handlers. */
export function usePageMotion() {
  const scope = useTemplateRef<HTMLElement>('page');
  const { enabled } = useMotion();
  let observer: IntersectionObserver | undefined;
  let frame = 0;
  function startIntro() {
    if (!enabled.value || !scope.value) return;
    scope.value.classList.remove('playing');
    frame = requestAnimationFrame(() => {
      scope.value?.classList.add('playing');
    });
  }
  onMounted(() => {
    const page = scope.value;
    if (!page || !('IntersectionObserver' in window)) return;
    observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries)
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer?.unobserve(entry.target);
          }
      },
      { rootMargin: '0px 0px -24px 0px', threshold: 0 },
    );
    page
      .querySelectorAll<HTMLElement>('.reveal, .prose > *, .page-section-heading')
      .forEach((element, index) => {
        element.classList.add('reveal');
        // Never hide content already visible on first paint, including the LCP heading.
        if (element.getBoundingClientRect().top < window.innerHeight) return;
        element.style.setProperty('--reveal-delay', (index % 3) * 60 + 'ms');
        element.classList.add('is-observed');
        observer?.observe(element);
      });
    // Assemble the decorative Home artwork when it first enters view, including on phones.
    const artwork = page.querySelector('.precision-art');
    if (artwork) observer.observe(artwork);
    startIntro();
  });
  watch(enabled, (value) => {
    if (value) startIntro();
  });
  onBeforeUnmount(() => {
    observer?.disconnect();
    cancelAnimationFrame(frame);
  });
}
