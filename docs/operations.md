# Production operations

Verified launch: 24 October 2026. Canonical origin: https://webextreme.dev.

## Hosting and delivery

- Cloudflare Worker: webextreme-dev, using Static Assets. The production custom domain is webextreme.dev. workers.dev and preview URLs are disabled.
- GitHub repository: alinistrate/webextreme.dev, main. Every push to main runs checks, prerenders and deploys automatically through GitHub Actions. Pull requests verify without deploying.
- Wrangler declares asset routing and public contact settings. Runtime Mailjet and Turnstile credentials are encrypted Worker Secrets. The repository contains no production credentials.
- The repository Actions deployment token has Individual Workers Editor scoped only to webextreme-dev and expires after 90 days. Rotate the repository secret before expiration. DNS and zone rules remain dashboard-managed because this token cannot edit them.

## Dashboard-managed edge configuration

- Proxied CNAME: www points to webextreme.dev.
- Single Redirect, Canonical www to webextreme.dev: HTTP and HTTPS www requests redirect permanently to https://webextreme.dev, retaining path and query string.
- Single Redirect, Canonical HTTP to HTTPS: http://webextreme.dev/* redirects permanently to the matching HTTPS URL, retaining the query string.
- Contact API abuse protection: URI path exactly /api/contact, counted per IP, threshold 5 requests per 10 seconds, Block for 10 seconds. This uses the Free plan rate-limiting rule and covers all methods on that path. The application independently enforces POST, origin, input validation, honeypot and Turnstile verification.

## Email and measurement

- Mailjet verified sender domain and SPF/DKIM. One SPF record authorizes both Mailjet and Cloudflare Email Routing. DMARC is in monitoring mode, p=none.
- Mailjet sends contact enquiries to contact@webextreme.dev. Cloudflare Email Routing forwards that exact address to verified webextremedev@gmail.com; catch-all is disabled. A real production enquiry was accepted, shown as Forwarded in Cloudflare and confirmed received by the owner.
- GTM-MHDS4PW4 publishes consent-gated GA4 G-S462Q33299. Initial and route page views are tracked once. generate_lead is a GA4 key event and is emitted only after a real successful enquiry with analytics consent. Form contents, email addresses, URL queries and fragments are excluded from analytics context.
- Fresh-browser cookie scan: no cookies or Google requests before choice; rejection stores only wed_consent; acceptance adds _ga and _ga_S462Q33299; withdrawal removes Analytics cookies and stops Google requests. HTTPS cookies use Secure and SameSite=Lax.
- Search Console domain property verified, linked to GA4, and sitemap.xml submitted successfully with 9 discovered pages. All 9 canonical URLs also received confirmed Request indexing responses and were added to the priority crawl queue. This is not evidence of completed indexing or ranking.

## Verification and limits

- ESLint, strict TypeScript, formatting, prerender build and 10 contact-handler tests pass.
- 50 Playwright checks pass across Chromium and WebKit, including axe WCAG 2.2 AA rules, responsive widths, menu keyboard/focus, motion, contact simulation, consent and analytics URL filtering.
- Production Lighthouse measurements are recorded in the current implementation status report. Reports are generated into ignored reports/. Read the route, device and measurement date before comparing results.
- Lab scores fluctuate and are not a PageSpeed field-data guarantee or ADA legal certification. Firefox could not launch in this Windows environment; physical Safari/iOS and assistive-technology review remain outside the verified test coverage.
- One transitive node-forge advisory remains in the Nuxt build/development toolchain; no such code was found in the deployed assets or Worker. Check upstream patches during maintenance rather than suppressing audit results.

## Motion and navigation update

Anchors use native smooth scrolling with fixed-header offsets, including client route navigation. Browser Back restores anchor positions. Shared reveals now cover every page, including policy content. Hero frames and corners assemble once on entry. Link underlines, CTA arrows, brand marks and menu rows have short hover/focus animations. Motion remains active regardless of OS reduced-motion preference at the owner's explicit request; this choice supersedes the launch behavior. Static content and links remain usable without JavaScript. The Accessibility page reflects the current behavior. Responsive checks include 320, 390, 768 and 1440px, with additional open-menu axe checks and visual review at mobile/tablet sizes.

## Route motion, themes and icon library

Reactive useHead owns data-motion so route metadata updates cannot disable animations. Every page mounts its own intro and reveal observer. Vue route transitions add a short shutter reveal without translating the page geometry, preserving hash offsets. Brand, Menu and Close interactions work after repeated client navigation. Text reveals retain full contrast while moving.

Light and dark themes follow the system until an explicit opposite choice is made. The header sun/moon button stores that preference as wed_theme in local storage. Returning to the system appearance removes the stored override. An early head script prevents a theme flash, while CSS color-scheme also styles native controls. Cookie Policy documents the preference.

Services, Approach, About and Contact use distinct decorative vector hero compositions. Services has a sticky gold sphere and a native scroll-linked highlight rotation in supporting browsers; the stable sticky sphere remains available elsewhere. No pointer capture or idle animation loop is added. The curved rail stays outside the mobile text column; native scroll timelines drive the sphere, with a passive requestAnimationFrame-batched fallback where needed.

Font Awesome Free Classic Solid replaces the original 18 custom icons. The typed inventory also covers menu, close, theme and disclosure controls. AppIcon renders native SVG definitions with fixed dimensions and decorative semantics. Named package imports exclude unused icons, and no external font or CDN is needed. SVG exports and their upstream attribution are regenerated by scripts/export-brand-icons.mjs under design/icons. The Figma guidebook still contains the earlier custom components; regenerated SVGs are ready for a future Figma update.

## Compact layout and route entry verification (2026-10-25)

Section padding uses one fluid 48–72px token. Adjacent Home sections on the same surface share a single interval. Process cards keep the icon, title and number in separate grid columns, with the description spanning the card. Inner hero illustrations are capped at 260px and use 176px on phones.

Route reveals wait until the enter transition and scroll restoration have finished before measuring the new content. Hero title lines enter with a short stagger, while each illustration assembles on its first viewport intersection. Keep separate animation frames for scroll preparation and the intro so navigation hooks cannot cancel the title animation. Keyboard focus reveals content immediately; pointer focus does not move an animating link under the cursor.

Service category anchors use NuxtLink and the router's native smooth scroll behavior. Avoid root-level CSS smooth scrolling: it also animates scroll restoration from the previous page's footer, delaying the next hero and invalidating reveal measurements.

Validation: strict TypeScript, ESLint, Prettier, ten contact endpoint tests and 50 Chromium/WebKit browser checks pass. New regressions cover navigation from each page's footer, hero entry, below-fold reveals, non-overlapping process labels and compact section spacing at 320, 390, 768 and 1440px. Light/dark automated axe checks and overflow checks pass across all nine routes.

## Font Awesome, rotating headline and build on scroll (2026-10-25)

AppIcon uses Font Awesome Free Classic Solid 7.3.1 through named SVG imports. Header controls, CTA arrows, FAQ and cookie controls share the same inventory as service and process icons. The public license and generated design exports retain Fonticons attribution. No icon font, CDN kit or DOM replacement observer is loaded.

HeroHeadline types and erases only the final word: precision, dedication, commitment, purpose and care. The complete semantic heading and initial phrase are prerendered. The widest word reserves layout space; the accessible pause button stops the cycle. Timers are cleared when offscreen, in background tabs and on component unmount.

ProcessBuild assembles one browser canvas from six layers driven by the six existing process cards. Native named view timelines and a local timeline-scope keep animation on the compositor; IntersectionObserver supplies the stage fallback when animation-range or timeline-scope is unavailable. Without JavaScript or motion enhancement, the complete decorative canvas remains visible. The compact mobile scene leaves the active card readable below it. No scroll listener, smooth-scroll library or 3D runtime is added.

The Services journey rail follows four gentle Bézier segments. The sphere stays sticky at mid-viewport while its horizontal position follows the same curve through a native CSS view timeline, using local container units and separate desktop/tablet/mobile amplitudes. Unsupported browsers use one passive scroll listener with requestAnimationFrame batching; it is removed on unmount and does not run an idle animation loop.
