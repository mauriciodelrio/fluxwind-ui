import { computed } from '@preact/signals-core';
import { currentTranslations } from './store';
import type { TranslationOptions } from './types';
import { getNested } from './utils/get-nested';
import { interpolate } from './utils/interpolate';
import { pluralize } from './utils/pluralize';

/**
 * Translation function (reactive with computed signals)
 *
 * Returns a computed signal that automatically updates when:
 * - The locale changes
 * - Translations are added/updated
 *
 * @param key - Translation key (supports dot notation: 'user.profile.name')
 * @param options - Parameters for interpolation and/or pluralization
 *
 * @example
 * // Simple translation
 * const submitText = t('button.submit');
 * console.log(submitText.value) // 'Submit' (reactive!)
 *
 * // With interpolation
 * const greeting = t('welcome.message', { name: 'John' });
 * console.log(greeting.value) // 'Welcome, John!'
 *
 * // With pluralization
 * const itemsText = t('items.count', { count: 5 });
 * console.log(itemsText.value) // '5 items'
 *
 * // In React components
 * function MyComponent() {
 *   const loadingText = t('common.loading');
 *   return <button>{loadingText.value}</button>
 * }
 */
export function t(key: string, options?: TranslationOptions) {
  return computed(() => {
    const trans = currentTranslations.value;
    const value = getNested(trans, key);

    // Key not found - return the key itself as fallback
    if (value === undefined) {
      console.warn(`[@fluxwind/i18n] Translation key not found: '${key}'`);
      return key;
    }

    // Value is a nested object (not a translation string)
    if (typeof value === 'object' && !('other' in value)) {
      console.warn(`[@fluxwind/i18n] Translation key '${key}' points to an object, not a string`);
      return key;
    }

    // Handle pluralization
    if (typeof value === 'object' && 'other' in value && typeof value['other'] === 'string') {
      const count = options?.count ?? 0;
      const pluralObj = value as {
        zero?: string;
        one?: string;
        two?: string;
        few?: string;
        many?: string;
        other: string;
      };
      const pluralText = pluralize(pluralObj, count);

      // Interpolate count and other params
      return interpolate(pluralText, { count, ...options });
    }

    // Handle simple string with optional interpolation
    if (typeof value === 'string') {
      return options ? interpolate(value, options) : value;
    }

    return key;
  });
}
