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
- Search Console domain property verified, linked to GA4, and sitemap.xml submitted successfully with 9 discovered pages. Discovery is not evidence of indexing or ranking.

## Verification and limits

- ESLint, strict TypeScript, formatting, prerender build and 10 contact-handler tests pass.
- 30 Playwright checks pass across Chromium and WebKit, including axe WCAG 2.2 AA rules, responsive widths, menu keyboard/focus, reduced motion, contact simulation, consent and analytics URL filtering.
- Latest production Lighthouse lab scores: Home performance 99 mobile / 100 desktop; Contact 100 mobile / 100 desktop. Accessibility, Best Practices and SEO are 100 for these four measurements. Reports are generated into ignored reports/.
- Lab scores fluctuate and are not a PageSpeed field-data guarantee or ADA legal certification. Firefox could not launch in this Windows environment; physical Safari/iOS and assistive-technology review remain outside the verified test coverage.
- One transitive node-forge advisory remains in the Nuxt build/development toolchain; no such code was found in the deployed assets or Worker. Check upstream patches during maintenance rather than suppressing audit results.
