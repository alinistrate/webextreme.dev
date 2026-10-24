# Web Extreme icons

Source: app/content/icons.ts. Render with BrandIcon.vue. Each individual SVG has a 24px viewBox and 1.5px square-ended strokes. Website components inherit their context color, so yellow is never used for low-contrast text on white.

Run pnpm icons:export after changing the paths. The generator only updates SVG assets.

The existing Figma Brand Guidebook contains 18 native main components under WED / Icon / Website and an editable [Icon Library specimen](https://www.figma.com/design/ORNJZpRhzf7UNAgIboZ14q/Web-Extreme-Dev-Brand-Guidebook?node-id=47-4). The components were created through the editor because the Starter MCP quota was exhausted. Their paths are editable; automated variable bindings were unavailable. Construction components sit separately below the specimen.
