import fs from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
const root = fileURLToPath(new URL('../', import.meta.url));
const { icons } = await import('../app/content/icons.ts');
await fs.mkdir(root + 'design/icons', { recursive: true });
const nodes = [];
for (const [index, [name, definition]] of Object.entries(icons).entries()) {
  const [width, height, , , pathData] = definition.icon;
  const paths = typeof pathData === 'string' ? [pathData] : pathData;
  const pathsSvg = paths.map((d) => '<path d="' + d + '"/>').join('');
  const viewBox = '0 0 ' + width + ' ' + height;
  const svg =
    '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="' +
    viewBox +
    '" fill="#FFD426"><!-- Font Awesome Free 7.3.1 by Fonticons, Inc. — https://fontawesome.com — Icons: CC BY 4.0 — https://creativecommons.org/licenses/by/4.0/ -->' +
    pathsSvg +
    '</svg>';
  await fs.writeFile(root + 'design/icons/' + name + '.svg', svg);
  const x = 40 + (index % 6) * 144,
    y = 140 + Math.floor(index / 6) * 144;
  nodes.push(
    '<g transform="translate(' +
      x +
      ' ' +
      y +
      ')"><rect width="128" height="120" rx="8" fill="#24282A"/><svg x="40" y="18" width="48" height="48" viewBox="' +
      viewBox +
      '" fill="#FFD426">' +
      pathsSvg +
      '</svg><text x="64" y="92" fill="#F3F3EF" text-anchor="middle" font-family="Commissioner,Arial" font-size="10">' +
      name +
      '</text></g>',
  );
}
const rows = Math.ceil(Object.keys(icons).length / 6);
const height = 188 + rows * 144;
const board =
  '<svg xmlns="http://www.w3.org/2000/svg" width="944" height="' +
  height +
  '" viewBox="0 0 944 ' +
  height +
  '"><!-- Font Awesome Free 7.3.1 by Fonticons, Inc. — https://fontawesome.com — Icons: CC BY 4.0 — https://creativecommons.org/licenses/by/4.0/ --><rect width="944" height="' +
  height +
  '" fill="#191B1D"/><text x="40" y="55" fill="#FFD426" font-family="Commissioner,Arial" font-size="26" font-weight="700">WEB EXTREME / FONT AWESOME</text><text x="40" y="85" fill="#B9BDB8" font-family="Commissioner,Arial" font-size="13">' +
  Object.keys(icons).length +
  ' icons · Font Awesome Free Classic Solid · shared with AppIcon.vue</text>' +
  nodes.join('') +
  '<text x="40" y="' +
  (height - 24) +
  '" fill="#B9BDB8" font-family="Commissioner,Arial" font-size="12">Font Awesome Free by Fonticons, Inc. / CC BY 4.0 / fontawesome.com</text></svg>';
await fs.writeFile(root + 'design/icons/library.svg', board);
