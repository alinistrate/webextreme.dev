/** Web Extreme geometric icons. 24px grid; 1.5px strokes; decorative beside visible labels. */
export const icons = {
  design: ['M4 4h16v16H4Z', 'M4 9h16M9 9v11', 'm13 16 2-5 3 3-5 2Z'],
  'web-development': ['M3 5h18v14H3Z', 'M3 9h18', 'm9 12-3 2 3 2m6-4 3 2-3 2'],
  automation: ['M8 4H4v4m12-4h4v4M4 16v4h4m12-4v4h-4', 'm13 7-5 6h4l-1 4 5-6h-4Z'],
  brand: ['m12 3 9 9-9 9-9-9Z', 'M8 12h8m-4-4v8'],
  'landing-pages': ['M4 3h16v18H4Z', 'M4 8h16M8 12h8M8 16h5'],
  ecommerce: ['m3 4 2 0 3 11h10l3-8H6', 'M9 20h.01M18 20h.01'],
  software: ['m8 7-5 5 5 5m8-10 5 5-5 5M14 4l-4 16'],
  discover: ['M10 3a7 7 0 1 0 0 14 7 7 0 0 0 0-14Z', 'm15 15 6 6M7 10h6m-3-3v6'],
  scope: ['M4 5h16v15H4Z', 'M4 10h16M9 10v10M8 3v4m8-4v4'],
  test: ['m5 12 4 4 10-10', 'M20 12v8H4V4h10'],
  launch: ['m5 19 2-6 10-10 4 0v4L11 17Z', 'm13 7 4 4M4 21l4-1'],
  email: ['M3 5h18v14H3Z', 'm3 6 9 7 9-7'],
  conversation: ['M3 4h18v13H9l-6 4Z', 'M7 8h10M7 12h7'],
  clarity: ['M12 3v4m0 10v4M3 12h4m10 0h4', 'm8 8 4-4 4 4 4 4-4 4-4 4-4-4-4-4Z'],
  delivery: ['m4 8 8-5 8 5v9l-8 5-8-5Z', 'm4 8 8 5 8-5M12 13v9'],
  security: ['m12 3 8 3v6c0 5-8 9-8 9s-8-4-8-9V6Z', 'm8 12 3 3 5-6'],
  performance: ['M4 18a9 9 0 1 1 16 0', 'm12 13 5-5M8 18h8'],
  arrow: ['M5 19 19 5M5 5h14v14'],
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
