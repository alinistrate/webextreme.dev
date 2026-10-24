# Web Extreme Dev

Vue 3, Nuxt 4, strict TypeScript and Tailwind CSS 4. English marketing pages are prerendered to HTML and served by Cloudflare Pages. A single Pages Function verifies Turnstile and sends contact enquiries through Mailjet.

## Run locally

Use Node 22.12+ and pnpm (the package manager version is pinned in package.json).

1. Run `pnpm install`.
2. Copy `.env.example` to `.env`. For local tests use Cloudflare's documented dummy site key `1x00000000000000000000AA` as `NUXT_PUBLIC_TURNSTILE_SITE_KEY`.
3. Run `pnpm build`, copy `.dev.vars.example` to `.dev.vars`, then run `pnpm preview`.
4. Open http://127.0.0.1:3100. The example is a **local simulation** and explicitly says no email was sent. It still verifies the dummy Turnstile token.

`pnpm dev` runs Nuxt's UI development server. Use `pnpm preview` for the contact function in Cloudflare's runtime. Rebuild after source changes when previewing a production build.

## Code map

- `app/pages/`: route templates and metadata, including legal pages.
- `app/components/`: header, native dialog menu, footer, contact form, Turnstile, consent banner and FAQ. Home sections live in `home/`.
- `app/content/`: typed services, process, company and site data.
- `app/composables/`: metadata, consent, OS motion preference and page-scoped reveal lifecycle.
- `app/plugins/analytics.client.ts`: denied consent defaults, consent-gated GTM loading and route events.
- `app/assets/css/`: fonts, tokens and scoped layout/motion/responsive modules, imported by `main.css`.
- `shared/contact.ts`: validated handler with injectable provider transport for testing.
- `functions/api/contact.ts`: Cloudflare Pages adapter for JSON and native POST.
- `public/`: sitemap, robots, redirects, headers, social image and real 404 fallback.
- `tests/`: provider failures, abuse checks, browser accessibility and consent regressions.

Keep copy in route templates or typed content files. Keep reusable interactions in components. Native browser behavior handles dialogs and form validation; no store, UI library or animation library is needed.

## Verification

- `pnpm check`: ESLint, TypeScript and handler tests.
- `pnpm format:check`: formatting.
- `pnpm build`: prerender every route and fail on rendering errors.
- `pnpm exec playwright install chromium firefox webkit`, then `pnpm test:e2e` against the local simulation.
- `node scripts/audit.mjs / /contact/`: Lighthouse lab reports in ignored `reports/`. Set `AUDIT_BASE_URL` to audit production.
- `node scripts/cookie-scan.mjs`: independent fresh-browser scans before choice, rejection, acceptance and withdrawal. Set `AUDIT_BASE_URL` for production. Reports record cookie metadata without values.

## Cloudflare Pages

Connect repository `alinistrate/webextreme.dev`, branch `main`. Build command: `pnpm build`. Output: `.output/public`. Root: repository root. Set `NODE_VERSION=22` and the pinned pnpm version where required by the build platform. Keep `functions/` at repository root; `_routes.json` invokes it only for `/api/*`.

Public build variables:

- `NUXT_PUBLIC_TURNSTILE_SITE_KEY`: the production widget site key.
- `NUXT_PUBLIC_GTM_ID`: GTM-MHDS4PW4.

Encrypted runtime secrets:

- `MAILJET_API_KEY`, `MAILJET_API_SECRET`, `TURNSTILE_SECRET_KEY`.

Runtime environment:

- `CONTACT_FROM=contact@webextreme.dev`.
- `CONTACT_TO=contact@webextreme.dev`.
- `CONTACT_ALLOWED_ORIGIN=https://webextreme.dev`.

Never enable `CONTACT_TEST_MODE` in production. The handler rejects dummy secrets and test mode on public hosts. Preview origins must be configured explicitly if they need a real form; do not relax production origin checks. Never commit `.env`, `.dev.vars` or credentials. Prerendered public settings require a new build after changes.

## Contact delivery

The request passes method, same-origin, payload-size, field, honeypot and server-side Turnstile checks before delivery. One plain-text message goes to contact@webextreme.dev, with the visitor's email as ReplyTo. Cloudflare Email Routing forwards contact to webextremedev@gmail.com. No form database, auto-retry or visitor confirmation email is used. Mailjet acceptance is checked; inbox receipt needs an end-to-end delivery check. A provider timeout remains an uncertain delivery result and is not presented as success.

Keep one SPF record authorizing Cloudflare Email Routing and Mailjet; preserve both DKIM selectors. Apply an edge rate limit to POST /api/contact as an additional abuse control. Inspect deployment configuration and provider logs without logging enquiry contents.

## Consent and measurement

Analytics is optional. No GTM or GA request is made before acceptance. The essential `wed_consent` cookie remembers the choice for 180 days. Cookie settings can reject or withdraw analytics, clearing first-party GA cookies and reloading the page. Advertising storage, user data and personalization remain denied.

GTM should send an initial GA4 page_view and virtual_page_view route changes exactly once. Configure generate_lead from the matching custom event, emitted only after Mailjet accepts a real submission and analytics consent is granted. No names, email addresses, messages or service selections belong in analytics. Disable automatic form tracking in the GA4 stream to avoid duplicate or misleading form conversions. Verify published container requests and cookie inventory after changes.

## Accessibility and browser support

Target WCAG 2.2 AA and modern browser releases from the previous 24 months. Feature-detected decorative scroll effects fall back to static content. Fixed-duration reveals use IntersectionObserver and clean up after route changes. Content remains visible without JavaScript. Native dialogs provide focus containment. Motion follows OS reduced-motion preferences, with no public Motion On/Off control or stored override.

Automated axe and Lighthouse checks complement keyboard, focus, zoom, contrast and assistive-technology review. Playwright WebKit is not physical Safari/iOS testing. Automated scores do not establish ADA legal certification. Record actual browser test and audit limits in the launch report.

## SEO, AEO and GEO

Every route has prerendered readable HTML, one main heading, a unique description, canonical URL, social metadata, and linked structured Organization, WebSite, WebPage and breadcrumb data. The sitemap lists canonical URLs and is referenced in robots.txt. FAQ answers and service copy are visible and factual. Redirect secondary hostnames to webextreme.dev to avoid duplicates.

Verify the domain property in Google Search Console, submit https://webextreme.dev/sitemap.xml after launch, then monitor crawling and indexing. Search and AI answer placement are not guaranteed. No speculative AI files, hidden keyword text, fabricated reviews, clients or company metrics are included.
