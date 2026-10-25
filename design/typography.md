# Web Extreme typography

| Role                               | Family                       | Weights            | CSS token      |
| ---------------------------------- | ---------------------------- | ------------------ | -------------- |
| Headings and WEB EXTREME wordmark  | Bricolage Grotesque Variable | 500, 700           | --font-display |
| Body, navigation and form controls | Commissioner Variable        | 400, 500, 600, 700 | --font-sans    |
| Interface labels and DEV lettering | Commissioner Variable        | 400, 500           | --font-label   |

Two self-hosted Latin WOFF2 variable files replace three previous font families. Only the display file is preloaded. Fonts use swap and readable Arial fallbacks; x-height normalization is inherited from the root. Font files are provided by Fontsource, and both OFL licenses are included at /fonts-license.txt.

The X symbol is vector geometry independent of typography. BrandLogo.vue keeps editable SVG text for the wordmark, so the header, footer and decorative scene share the same source. Check the SVG viewBox when changing lettering. Favicons use only the X and do not change with font selection.

## Figma

[Brand Guidebook](https://www.figma.com/design/ORNJZpRhzf7UNAgIboZ14q/Web-Extreme-Dev-%C2%B7-Brand-Guidebook?node-id=18-327)

The existing 18 WED text styles were updated in place, preserving component links. The font/display, font/body and font/label variables map to the three CSS roles above. The former mono styles now use Commissioner; their existing style IDs are retained. Typography specimens, usage guidance and download links were reconciled with the two-family system. The logo/wordmark and logo/dev styles update the existing logo components.

## Sources

- [Bricolage Grotesque by Mathieu Triay](https://ateliertriay.github.io/bricolage/)
- [Commissioner source and license](https://github.com/kosbarts/Commissioner)

The choice is a visual direction, not a claim of exclusive use by Web Extreme or a measured ranking of font popularity.
