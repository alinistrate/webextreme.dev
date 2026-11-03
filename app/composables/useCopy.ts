import { copyKey } from '~/utils/copy-key';
/** English remains readable source copy; Romanian messages are lazy-loaded by Nuxt i18n. */
export function useCopy() {
  const { locale, t, te } = useI18n();
  function tr(value: unknown): string {
    const source = value == null ? '' : String(value);
    if (locale.value === 'en') return source;
    const key = copyKey(source);
    return te(key) ? t(key) : source;
  }
  return { tr, locale };
}
