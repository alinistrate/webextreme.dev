/** The explicit choice is optional; CSS follows the system until visitors choose otherwise. */
export function useTheme() {
  const choice = useState<'system' | 'light' | 'dark'>('color-theme', () => 'system');
  function toggle() {
    const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const dark = choice.value === 'dark' || (choice.value === 'system' && systemDark);
    const target = dark ? 'light' : 'dark';
    choice.value = (target === 'dark') === systemDark ? 'system' : target;
    try {
      if (choice.value === 'system') localStorage.removeItem('wed_theme');
      else localStorage.setItem('wed_theme', choice.value);
    } catch {
      /* A blocked store must not prevent switching the current page. */
    }
  }
  return { choice, toggle };
}
