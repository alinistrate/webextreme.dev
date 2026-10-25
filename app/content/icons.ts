/** Original Web Extreme icon geometry. 24-unit grid, 1.75-unit strokes.
 * Clipped corners and diamond details echo the X identity. Standard control
 * silhouettes remain familiar. Exports and the Figma gallery share this source.
 */
export const icons = {
  design: ['M3 8V3h5', 'M4 20l1-5L16 4l4 4L9 19Z', 'M14 6l4 4M5 15l4 4'],
  'web-development': [
    'M3 4h15l3 3v13H3Z',
    'M3 9h18M6 6.5h.01',
    'M8 12l-3 3 3 3M16 12l3 3-3 3M13 11l-2 8',
  ],
  automation: [
    'M12 2l4 4-4 4-4-4Z',
    'M5 15l3 3-3 3-3-3ZM19 15l3 3-3 3-3-3Z',
    'M12 10v2M5 15v-3h14v3',
  ],
  brand: ['M3 3h14l4 4v14H3Z', 'M7 7l5 4 5-4M7 17l5-4 5 4'],
  'landing-pages': ['M3 4h15l3 3v13H3Z', 'M3 9h18M6 6.5h.01M6 12h7M6 16h4', 'M15 12h3v5h-3Z'],
  ecommerce: ['M4 8h16l1 13H3Z', 'M8 9V6a4 4 0 0 1 8 0v3', 'M8 14h8M13 11l3 3-3 3'],
  software: ['M8 5l-6 7 6 7M16 5l6 7-6 7M14 3l-4 18'],
  discover: ['M16.5 16.5 22 22', 'M8 3h4l5 5v4l-5 5H8l-5-5V8Z', 'M7 10h6M10 7v6'],
  scope: ['M4 3h13l3 3v15H4Z', 'M7 8l1.5 1.5L11 6.5M13 8h4M7 15l1.5 1.5 2.5-3M13 15h4'],
  test: ['M8 2h8l6 10-6 10H8L2 12Z', 'M7 12l3 3 7-7'],
  launch: ['M9 6l8-4 5 5-4 8-5 3-7-7Z', 'M6 11l-4 1v5l4 1M13 18l1 4h5l1-6M11 8l5 5M3 21l4-4'],
  email: ['M3 5h15l3 3v11H3Z', 'M3 7l9 7 9-7M3 19l6-7M21 19l-6-7'],
  conversation: ['M3 3h13l3 3v9H8l-5 4Z', 'M19 8h2v13l-5-3h-4'],
  clarity: ['M12 2l10 10-10 10L2 12Z', 'M12 7l5 5-5 5-5-5Z', 'M12 11v2'],
  delivery: ['M3 8l9-5 9 5-9 5Z', 'M3 8v10l9 4 9-4V8M12 13v9M8 5l9 5v4'],
  security: ['M4 4l8-2 8 2v8l-3 6-5 4-5-4-3-6Z', 'M8 12l3 3 5-6'],
  performance: ['M3 18v-6a9 9 0 0 1 18 0v6Z', 'M12 12l5-5M7 16h10M6 11h1M11.5 5v1M18 11h-1'],
  arrow: ['M4 12h15M13 5l7 7-7 7'],
  menu: ['M4 6h16M4 12h11M4 18h16'],
  close: ['M5 5l14 14M19 5 5 19'],
  sun: [
    'M12 7l5 5-5 5-5-5Z',
    'M12 2v2M12 20v2M2 12h2M20 12h2M5 5l1.5 1.5M17.5 17.5 19 19M5 19l1.5-1.5M17.5 6.5 19 5',
  ],
  moon: ['M19.5 15.7A8.5 8.5 0 0 1 8.3 4.5a7 7 0 0 0 11.2 11.2Z'],
  plus: ['M12 4v16M4 12h16'],
  minus: ['M4 12h16'],
  pause: ['M8 5v14M16 5v14'],
  play: ['M7 4l13 8-13 8Z'],
  grid: ['M3 3h7v7H3ZM14 3h7v7h-7ZM3 14h7v7H3ZM14 14h7v7h-7Z'],
  layers: ['M12 2l10 6-10 6L2 8Z', 'M3 13l9 5 9-5M3 17l9 5 9-5'],
  consulting: ['M3 3h13l3 3v9H8l-5 4Z', 'M8 7h6M8 11h3M18 17l3 3M18 20l3-3'],
} as const;

export type IconName = keyof typeof icons;
export const processIcons: IconName[] = [
  'discover',
  'scope',
  'design',
  'software',
  'test',
  'launch',
];
