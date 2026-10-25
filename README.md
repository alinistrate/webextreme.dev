# Web Extreme Dev

Vue 3, Nuxt 4, strict TypeScript and Tailwind CSS 4. English marketing pages are prerendered to HTML and served by Cloudflare Workers. A single Worker verifies Turnstile and sends contact enquiries through Mailjet.

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
- `app/composables/`: metadata, consent, motion state and page-scoped reveal lifecycle.
- `app/plugins/analytics.client.ts`: denied consent defaults, consent-gated GTM loading and route events.
- `app/assets/css/`: fonts, tokens and scoped layout/motion/responsive modules, imported by `main.css`.
- `shared/contact.ts`: validated handler with injectable provider transport for testing.
- `worker/index.ts`: API routing and Static Assets binding.
- `shared/contact-response.ts`: JSON/native HTML response adapter.
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

## Cloudflare Workers

Deploy through GitHub Actions from `alinistrate/webextreme.dev`, branch `main`. The Worker uses Static Assets and the Modules API. GitHub Actions deploys it without the Cloudflare GitHub App. The workflow checks formatting, lint, types and contact tests, prerenders the website, then runs the pinned local Wrangler to deploy prerendered assets and the contact endpoint in one version. Pull requests run checks and build without receiving the deployment token. The workflow has only `contents: read` GitHub permissions and does not store checkout credentials.

Create repository Actions secrets `CLOUDFLARE_ACCOUNT_ID` and `CLOUDFLARE_API_TOKEN`. Use an account API token with Individual Workers Editor restricted to the webextreme-dev Worker. The launch token expires after 90 days. The custom domain is connected in Cloudflare; the CI token does not receive permission to edit DNS or zone routes. Rotate it before its configured expiration. Runtime Mailjet and Turnstile secrets belong only in Cloudflare Worker Secrets, never in the GitHub repository or Actions build environment.

`wrangler.jsonc` declares the Worker entry point, asset routing and non-secret contact settings. Production secrets are managed in the dashboard. No database, legacy Pages project or Workers Sites KV bucket is required.

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

Target WCAG 2.2 AA and modern browser releases from the previous 24 months. Feature-detected decorative scroll effects fall back to static content. Fixed-duration reveals use IntersectionObserver and clean up after route changes. Content remains visible without JavaScript. Native dialogs provide focus containment. Entrance and scroll motion stays active for all visitors, including reduced-motion preferences, as explicitly requested for the visual direction. The looping headline has its own accessible pause control. There is no global motion toggle or stored motion override. Native anchor scrolling is smooth with fixed-header offsets.

Automated axe and Lighthouse checks complement keyboard, focus, zoom, contrast and assistive-technology review. Playwright WebKit is not physical Safari/iOS testing. Automated scores do not establish ADA legal certification. Record actual browser test and audit limits in the launch report.

## SEO, AEO and GEO

Every route has prerendered readable HTML, one main heading, a unique description, canonical URL, social metadata, and linked structured Organization, WebSite, WebPage and breadcrumb data. The sitemap lists canonical URLs and is referenced in robots.txt. FAQ answers and service copy are visible and factual. Redirect secondary hostnames to webextreme.dev to avoid duplicates.

Verify the domain property in Google Search Console, submit https://webextreme.dev/sitemap.xml after launch, then monitor crawling and indexing. Search and AI answer placement are not guaranteed. No speculative AI files, hidden keyword text, fabricated reviews, clients or company metrics are included.

## Brand icons

The SVG favicon is the source of truth. Run `node scripts/generate-icons.mjs` after changing it to regenerate the multi-size ICO (16, 32, 48 and 96px), 16/32/48/96px PNGs, Apple touch icon and Android home-screen icons. This uses the existing Playwright development dependency and adds no client JavaScript. The minimal web manifest supplies icon metadata without adding a service worker or offline caching.

The consent-gated GA4 configuration is documented in `docs/gtm-container.json`. This export contains public container settings, not credentials. After changing Google Tag Manager, publish the reviewed version and rerun the cookie scan against the public hostname.

## Live service configuration

The launch configuration, dashboard-managed edge rules and validation results are recorded in [docs/operations.md](docs/operations.md). Keep this record aligned with dashboard changes.

## Brand illustrations and icons

PageHeroArt contains four decorative SVG compositions. AppIcon renders the selected Font Awesome Free Classic Solid definitions in app/content/icons.ts as native SVG. Named imports include only selected icons; no external kit, icon font or DOM replacement runtime is loaded. Run pnpm icons:export to regenerate the design SVGs. Attribution and the upstream license are published at /fontawesome-license.txt. Icons beside text are decorative, while labels remain real HTML. ServicesJourney keeps a gold sphere aligned to a curved rail during service browsing. Native CSS timelines drive the curve and highlight rotation; unsupported browsers use a passive scroll handler batched by requestAnimationFrame. No idle animation loop runs. Route transitions use Vue's supported CSS transition lifecycle. Motion state is owned by reactive useHead, so it survives metadata changes on every navigation.

The header color-scheme toggle follows the system by default and stores only explicit opposite choices in wed_theme local storage. A minimal early head script prevents a theme flash; reactive head state owns subsequent updates. Both state icons remain in markup and CSS exposes only the current action. Yellow contact sections retain a fixed light scheme for predictable form contrast.

Home keeps its hero, navigation, FAQ and contact form immediately interactive. Services, About and Approach sections use Nuxt visible hydration with a 200px margin. Their full HTML remains prerendered for search engines and no-JavaScript access. Motion observes this existing HTML independently of hydration.

The consent banner is prerendered for fresh visits. A small early script only hides an already answered banner; it cannot load Analytics. Reactive cookie state owns subsequent visibility, while the existing readiness-and-consent checks continue to gate Google requests.

HeroHeadline keeps the first two headline lines static and types/erases five final words. The full semantic heading is rendered on the server; a hidden longest-word measure prevents layout shifts. The pause control stops the cycle. Timers stop offscreen, in background tabs and on unmount.

ProcessBuild reuses the existing Home process cards as named CSS view-timeline drivers for six decorative browser layers. timeline-scope is local to the scene; unsupported browsers use a page-scoped IntersectionObserver. Keep the scene non-interactive and the process copy in semantic HTML.

Google Search favicon: the prerendered head declares stable ICO and 16/32/48/96px PNG URLs, following the explicit raster pack used by hermanncavalier.ro. Keep the PNG as the final rel=icon candidate; SVG remains the design source, not a Search favicon declaration. Both raster files must remain publicly crawlable by Googlebot-Image. Google controls recrawl timing and whether the favicon appears. Reference: https://developers.google.com/search/docs/appearance/favicon-in-search
