/** Stable, descriptive catalog keys for English source copy. Whitespace is normalized. */
export function copyKey(source: string) {
  const text = source.replace(/\s+/g, ' ').trim();
  let hash = 2166136261;
  for (const char of text) hash = Math.imul(hash ^ char.charCodeAt(0), 16777619);
  const label = text
    .toLowerCase()
    .replace(/[^a-z0-9 ]/g, '')
    .split(' ')
    .filter(Boolean)
    .slice(0, 7)
    .join('_');
  return label + '_' + (hash >>> 0).toString(36);
}
