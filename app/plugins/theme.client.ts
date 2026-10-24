export default defineNuxtPlugin(() => {
  const { choice } = useTheme();
  function readChoice() {
    try {
      const saved = localStorage.getItem('wed_theme');
      choice.value = saved === 'light' || saved === 'dark' ? saved : 'system';
    } catch {
      choice.value = 'system';
    }
  }
  readChoice();
  onNuxtReady(() => {
    window.addEventListener('storage', (event) => {
      if (event.key === 'wed_theme' || event.key === null) readChoice();
    });
  });
});
