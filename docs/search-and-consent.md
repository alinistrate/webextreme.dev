# Search discovery and consent checks

The favicon is shared by desktop and mobile search. Keep the existing root favicon.ico and square PNG files, including the 96 px image, at stable URLs. The homepage declares them in server-rendered HTML. Do not version the URL to attempt to force a search-engine refresh.

Google Search Console uses the domain property webextreme.dev under the Web Extreme Google account. Submit https://webextreme.dev/sitemap.xml and inspect the canonical homepage when requesting a recrawl. A valid favicon makes the site eligible; Google controls its display and refresh timing. Analytics does not configure search-result favicons.

Bing Webmaster Tools verifies the same canonical site using the public msvalidate.01 metatag in nuxt.config.ts. Keep the tag after verification. Submit the same sitemap in Bing; no Google Search Console OAuth permissions are needed for this manual method.

GTM-MHDS4PW4 loads GA4 G-S462Q33299 only after analytics consent. Cookie Policy is /cookies/ and preferences can be reopened through the footer. Rejecting analytics must persist after reload; withdrawing consent must delete accessible GA cookies and reload without loading Google tags.

Run AUDIT_BASE_URL=https://webextreme.dev node scripts/audit-discovery.mjs to check public favicon assets, discovery endpoints and a real consent lifecycle. The script creates one real consented analytics page view; it does not send a form or a lead. Reports contain cookie names and measurement status, never cookie values or client IDs, and are written to ignored reports/.
