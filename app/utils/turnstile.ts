export interface TurnstileApi {
  render(container: HTMLElement, options: Record<string, unknown>): string;
  reset(id: string): void;
  remove(id: string): void;
}
declare global {
  interface Window {
    turnstile?: TurnstileApi;
  }
}
let scriptPromise: Promise<TurnstileApi> | undefined;
/** One official script shared by route-mounted widgets. Never proxy or cache api.js. */
export function loadTurnstile(): Promise<TurnstileApi> {
  if (window.turnstile) return Promise.resolve(window.turnstile);
  if (scriptPromise) return scriptPromise;
  scriptPromise = new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
    script.async = true;
    script.onload = () => {
      if (window.turnstile) resolve(window.turnstile);
      else {
        scriptPromise = undefined;
        reject(new Error('Turnstile unavailable'));
      }
    };
    script.onerror = () => {
      script.remove();
      scriptPromise = undefined;
      reject(new Error('Turnstile unavailable'));
    };
    document.head.append(script);
  });
  return scriptPromise;
}
