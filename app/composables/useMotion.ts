/** The operating system preference controls production motion; there is no stored override. */
export function useMotion() {
  const enabled = useState('motion-enabled', () => false);
  const reduced = useState('motion-reduced', () => false);
  return { enabled, reduced };
}
