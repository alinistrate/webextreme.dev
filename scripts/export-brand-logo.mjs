import fs from 'node:fs/promises';
import { devGlyphs, symbolPaths, wordmarkGlyphs } from '../app/content/brand.ts';

const glyphPaths = (glyphs) =>
  glyphs.map((g) => '<path d="' + g.path + '" transform="translate(' + g.x + ' 0)"/>').join('');
const svg = (width, height, contents) =>
  '<svg xmlns="http://www.w3.org/2000/svg" width="' +
  width +
  '" height="' +
  height +
  '" viewBox="0 0 ' +
  width +
  ' ' +
  height +
  '">' +
  contents +
  '</svg>\n';
await fs.mkdir('public/brand', { recursive: true });
await fs.mkdir('design/brand', { recursive: true });
for (const [name, color] of [
  ['dark', '#FFFFFF'],
  ['light', '#191B1D'],
]) {
  const wordmark =
    '<g fill="' + color + '" fill-rule="evenodd">' + glyphPaths(wordmarkGlyphs) + '</g>';
  const dev =
    '<g fill="' +
    (name === 'light' ? '#6A5400' : '#FFD426') +
    '" fill-rule="evenodd">' +
    glyphPaths(devGlyphs) +
    '</g>';
  const icon =
    '<g fill="#FFD426" transform="translate(0 8) scale(.64)">' +
    symbolPaths.map((d) => '<path d="' + d + '"/>').join('') +
    '</g>';
  await fs.writeFile(
    'public/brand/webextreme-logo-' + name + '.svg',
    svg(
      340,
      80,
      icon +
        '<g transform="translate(82 16) scale(.9)">' +
        wordmark +
        '</g><g transform="translate(82 56) scale(.36)">' +
        dev +
        '</g>',
    ),
  );
  await fs.writeFile('design/brand/wordmark-' + name + '.svg', svg(280, 32, wordmark));
}
await fs.writeFile(
  'design/brand/dev.svg',
  svg(102, 32, '<g fill="#FFD426" fill-rule="evenodd">' + glyphPaths(devGlyphs) + '</g>'),
);

// Figma word groups replace the existing text group while preserving master IDs.
for (const [tone, ink, accent] of [
  ['Brand', '#FFFFFF', '#FFD426'],
  ['Ink', '#191B1D', '#191B1D'],
  ['White', '#FFFFFF', '#FFFFFF'],
]) {
  const words =
    '<g fill="' +
    ink +
    '" fill-rule="evenodd" transform="translate(0 10) scale(1.125)">' +
    glyphPaths(wordmarkGlyphs) +
    '</g>';
  for (const layout of ['Horizontal', 'Stacked']) {
    const dev =
      '<g fill="' +
      accent +
      '" fill-rule="evenodd" transform="translate(' +
      (layout === 'Stacked' ? 134.55 : 0) +
      ' 60) scale(.45)">' +
      glyphPaths(devGlyphs) +
      '</g>';
    await fs.writeFile(
      'design/brand/figma-' + layout.toLowerCase() + '-' + tone.toLowerCase() + '.svg',
      svg(315, 80, words + dev),
    );
  }
}
