/**
 * Gets the plural form for a given count based on English rules
 *
 * @param count - The count to determine plural form
 * @returns 'zero', 'one', or 'other'
 */
export function getPluralForm(count: number): 'zero' | 'one' | 'other' {
  if (count === 0) return 'zero';
  if (count === 1) return 'one';
  return 'other';
}

/**
 * Selects the appropriate plural translation
 *
 * @example
 * const translations = {
 *   zero: 'No items',
 *   one: '1 item',
 *   other: '{{count}} items'
 * }
 * pluralize(translations, 0) // => 'No items'
 * pluralize(translations, 1) // => '1 item'
 * pluralize(translations, 5) // => '{{count}} items'
 */
export function pluralize(
  pluralObj: {
    zero?: string;
    one?: string;
    two?: string;
    few?: string;
    many?: string;
    other: string;
  },
  count: number
): string {
  const form = getPluralForm(count);

  // Try exact match first
  if (form in pluralObj && pluralObj[form]) {
    return pluralObj[form] as string;
  }

  // Fallback to 'other'
  return pluralObj.other;
}
