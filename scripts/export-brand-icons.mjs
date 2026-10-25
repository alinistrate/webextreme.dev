import fs from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { icons } from '../app/content/icons.ts';
const root = fileURLToPath(new URL('../', import.meta.url));
await fs.mkdir(root + 'design/icons', { recursive: true });
const nodes = [];
const stroke =
  ' fill="none" stroke="#FFD426" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"';
for (const [index, [name, paths]] of Object.entries(icons).entries()) {
  const drawing = paths.map((d) => '<path d="' + d + '"/>').join('');
  const svg =
    '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"' +
    stroke +
    '>' +
    drawing +
    '</svg>\n';
  await fs.writeFile(root + 'design/icons/' + name + '.svg', svg);
  const x = 40 + (index % 6) * 144;
  const y = 140 + Math.floor(index / 6) * 144;
  nodes.push(
    '<rect x="' +
      x +
      '" y="' +
      y +
      '" width="128" height="120" rx="8" fill="#24282A"/><g id="WED_Icon_' +
      name.replaceAll('-', '_') +
      '" transform="translate(' +
      (x + 40) +
      ' ' +
      (y + 18) +
      ') scale(2)"' +
      stroke +
      '>' +
      drawing +
      '</g><text x="' +
      (x + 64) +
      '" y="' +
      (y + 92) +
      '" fill="#F3F3EF" text-anchor="middle" font-family="Noto Sans" font-size="10">' +
      name +
      '</text>',
  );
}
const rows = Math.ceil(Object.keys(icons).length / 6);
const height = 188 + rows * 144;
const board =
  '<svg xmlns="http://www.w3.org/2000/svg" width="944" height="' +
  height +
  '" viewBox="0 0 944 ' +
  height +
  '"><rect width="944" height="' +
  height +
  '" fill="#191B1D"/><text x="40" y="55" fill="#FFD426" font-family="Noto Sans" font-size="26" font-weight="600">WEB EXTREME / ORIGINAL ICONS</text><text x="40" y="85" fill="#B9BDB8" font-family="Noto Sans" font-size="13">' +
  Object.keys(icons).length +
  ' drawings / 24 px grid / 1.75 px stroke / shared with AppIcon.vue</text>' +
  nodes.join('') +
  '<text x="40" y="' +
  (height - 24) +
  '" fill="#B9BDB8" font-family="Noto Sans" font-size="12">Custom artwork for Web Extreme Dev / Geometry source: app/content/icons.ts</text></svg>\n';
await fs.writeFile(root + 'design/icons/library.svg', board);
