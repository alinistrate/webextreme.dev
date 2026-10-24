/** Motion is enabled after hydration; static HTML remains the no-JavaScript fallback. */
export function useMotion() {
  const enabled = useState('motion-enabled', () => false);
  return { enabled };
}
