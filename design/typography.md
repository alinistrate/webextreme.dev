# Web Extreme typography and lettering

| Role                               | Family or artwork        | Weight          | CSS token                  |
| ---------------------------------- | ------------------------ | --------------- | -------------------------- |
| Headings and primary controls      | Noto Sans Variable       | 600             | --font-display             |
| Body text and secondary labels     | Noto Sans Variable       | 400             | --font-sans / --font-label |
| WEB EXTREME and DEV logo lettering | Original SVG letterforms | Vector geometry | Theme-aware fills          |

Noto Sans is served locally as one Latin variable WOFF2 file, with swap, Arial fallbacks and x-height normalization. Its OFL license is available at /fonts-license.txt. Hero headings remain capped at 72 px on desktop and 40 px on mobile through rem-based styles.

The logo is independent of installed fonts and web-font loading. app/content/brand.ts defines a 32-unit cap grid, five-unit stems and optical letter spacing. The X inside EXTREME repeats the approved split X geometry. Lettering was drawn as paths; the website font is not used to render it. Run pnpm logo:export after editing the source.

## Figma

[Brand Guidebook](https://www.figma.com/design/ORNJZpRhzf7UNAgIboZ14q/Web-Extreme-Dev-%C2%B7-Brand-Guidebook?node-id=18-327)

Existing WED text styles use Noto Sans Regular and SemiBold, preserving their IDs and bindings. The font/display, font/body and font/label variables refer to Noto Sans. Logo styles remain reference typesetting; published logo masters use the custom vectors from the same geometry as the site. The six horizontal and stacked master variants retain their original component IDs.
