import type { Translations } from '../types';

/**
 * Gets a nested value from an object using dot notation
 *
 * @example
 * const obj = { user: { profile: { name: 'John' } } }
 * getNested(obj, 'user.profile.name') // => 'John'
 * getNested(obj, 'user.age') // => undefined
 * getNested(obj, '') // => obj (returns whole object for empty path)
 */
export function getNested(obj: Translations, path: string): string | Translations | undefined {
  // Handle empty path - return the whole object
  if (path === '') {
    return obj;
  }

  const keys = path.split('.');
  let current: string | Translations | undefined = obj;

  for (const key of keys) {
    if (typeof current === 'object' && current !== null && key in current) {
      current = current[key] as string | Translations;
    } else {
      return undefined;
    }
  }

  return current;
}
