import { signal, computed } from '@preact/signals-core';
import type { Locale, Translations, LocaleData } from './types';
import { en, es, fr, de, zh, ja } from './locales';

/**
 * Current active locale (reactive signal)
 */
export const locale = signal<Locale>('en');

/**
 * All registered translations (reactive signal)
 * Initialized with default locales (en, es, fr, de, zh, ja)
 */
export const translations = signal<Record<Locale, Translations>>({
  en,
  es,
  fr,
  de,
  zh,
  ja,
});

/**
 * Current translations for active locale (computed signal)
 */
export const currentTranslations = computed(() => {
  return translations.value[locale.value] || {};
});

/**
 * Sets the active locale
 *
 * @param newLocale - The locale to activate
 *
 * @example
 * setLocale('es') // Changes to Spanish
 */
export function setLocale(newLocale: Locale): void {
  if (!translations.value[newLocale]) {
    console.warn(
      `[@fluxwind/i18n] Locale '${newLocale}' not found. Available: ${Object.keys(translations.value).join(', ')}`
    );
    return;
  }
  locale.value = newLocale;
}

/**
 * Adds or extends translations for a locale
 *
 * This function merges new translations with existing ones, allowing you to:
 * - Add custom translations alongside Fluxwind's defaults
 * - Override specific default translations
 * - Add entirely new locales
 *
 * @param localeData - The locale and its translations
 *
 * @example
 * // Extend existing locale with custom translations
 * addTranslations({
 *   locale: 'en',
 *   translations: {
 *     myApp: {
 *       welcome: 'Welcome to my app!',
 *       goodbye: 'See you later!'
 *     }
 *   }
 * })
 *
 * @example
 * // Override default translations
 * addTranslations({
 *   locale: 'en',
 *   translations: {
 *     common: {
 *       loading: 'Please wait...' // Overrides default "Loading..."
 *     }
 *   }
 * })
 *
 * @example
 * // Add a new locale
 * addTranslations({
 *   locale: 'pt',
 *   translations: {
 *     common: { loading: 'Carregando...' },
 *     button: { submit: 'Enviar' }
 *   }
 * })
 */
export function addTranslations(localeData: LocaleData): void {
  const { locale: loc, translations: trans } = localeData;

  translations.value = {
    ...translations.value,
    [loc]: {
      ...translations.value[loc],
      ...trans,
    },
  };
}

/**
 * Gets all available locales
 *
 * @returns Array of registered locale codes
 */
export function getAvailableLocales(): Locale[] {
  return Object.keys(translations.value);
}
