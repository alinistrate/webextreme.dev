import fs from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
const root = fileURLToPath(new URL('../', import.meta.url));
const { icons } = await import('../app/content/icons.ts');
await fs.mkdir(root + 'design/icons', { recursive: true });
const nodes = [];
for (const [index, [name, paths]] of Object.entries(icons).entries()) {
  const pathsSvg = paths.map((d) => '<path d="' + d + '"/>').join('');
  const svg =
    '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FFD426" stroke-width="1.5" stroke-linecap="square" stroke-linejoin="miter">' +
    pathsSvg +
    '</svg>';
  await fs.writeFile(root + 'design/icons/' + name + '.svg', svg);
  const x = 40 + (index % 6) * 144,
    y = 140 + Math.floor(index / 6) * 144;
  nodes.push(
    '<g id="WED-Icon-' +
      name +
      '" transform="translate(' +
      x +
      ' ' +
      y +
      ')"><rect width="128" height="120" rx="8" fill="#24282A"/><svg x="40" y="18" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#FFD426" stroke-width="1.5" stroke-linecap="square" stroke-linejoin="miter">' +
      pathsSvg +
      '</svg><text x="64" y="92" fill="#F3F3EF" text-anchor="middle" font-family="Inter,Arial" font-size="10">' +
      name +
      '</text></g>',
  );
}
const board =
  '<svg xmlns="http://www.w3.org/2000/svg" width="944" height="620" viewBox="0 0 944 620"><rect width="944" height="620" fill="#191B1D"/><text x="40" y="55" fill="#FFD426" font-family="Inter,Arial" font-size="26" font-weight="700">WEB EXTREME / ICON LIBRARY</text><text x="40" y="85" fill="#B9BDB8" font-family="Inter,Arial" font-size="13">18 geometric icons · 24 px grid · 1.5 px stroke · shared with BrandIcon.vue</text>' +
  nodes.join('') +
  '<text x="40" y="595" fill="#B9BDB8" font-family="Inter,Arial" font-size="12">Use beside visible text. Yellow on graphite. Dark ink on light surfaces.</text></svg>';
await fs.writeFile(root + 'design/icons/library.svg', board);
