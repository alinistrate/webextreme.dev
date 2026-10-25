import { chromium } from '@playwright/test';
import { readFile, writeFile } from 'node:fs/promises';

// Rasterize the same vector mark used by the browser. No design dependency or network request.
const source = await readFile(new URL('../public/favicon.svg', import.meta.url), 'utf8');
const browser = await chromium.launch({ headless: true });
const frames = [];
try {
  for (const size of [16, 32, 48, 96, 180, 192, 512]) {
    const page = await browser.newPage({
      viewport: { width: size, height: size },
      deviceScaleFactor: 1,
    });
    await page.setContent(
      '<style>html,body{margin:0;width:100%;height:100%}svg{display:block;width:100%;height:100%}</style>' +
        source,
    );
    const png = await page.screenshot({ omitBackground: true });
    if (size <= 96) frames.push({ size, png });
    if (size >= 96) {
      const name =
        size === 96
          ? 'favicon-96x96.png'
          : size === 180
            ? 'apple-touch-icon.png'
            : 'icon-' + size + '.png';
      await writeFile(new URL('../public/' + name, import.meta.url), png);
    }
    await page.close();
  }
  // ICO permits PNG frames. Include native small sizes to avoid fuzzy downscaling.
  const header = Buffer.alloc(6 + 16 * frames.length);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(frames.length, 4);
  let offset = header.length;
  frames.forEach(({ size, png }, index) => {
    const entry = 6 + 16 * index;
    header[entry] = size;
    header[entry + 1] = size;
    header.writeUInt16LE(1, entry + 4);
    header.writeUInt16LE(32, entry + 6);
    header.writeUInt32LE(png.length, entry + 8);
    header.writeUInt32LE(offset, entry + 12);
    offset += png.length;
  });
  await writeFile(
    new URL('../public/favicon.ico', import.meta.url),
    Buffer.concat([header, ...frames.map((frame) => frame.png)]),
  );
} finally {
  await browser.close();
}
