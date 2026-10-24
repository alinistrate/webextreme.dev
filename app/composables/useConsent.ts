export interface ConsentChoice {
  version: 1;
  analytics: boolean;
}
export function useConsent() {
  const choice = useCookie<ConsentChoice | null>('wed_consent', {
    maxAge: 60 * 60 * 24 * 180,
    sameSite: 'lax',
    secure: import.meta.client ? location.protocol === 'https:' : true,
    default: () => null,
  });
  const ready = useState('consent-ready', () => false);
  const settingsOpen = useState('consent-settings', () => false);
  const analytics = computed(
    () => ready.value && choice.value?.version === 1 && choice.value.analytics === true,
  );
  const needsChoice = computed(() => ready.value && choice.value?.version !== 1);
  function save(allowAnalytics: boolean) {
    choice.value = { version: 1, analytics: allowAnalytics };
    settingsOpen.value = false;
  }
  return { ready, analytics, needsChoice, settingsOpen, save };
}
