/**
 * Supported locales
 * Default locales: en, es, fr, de, zh, ja
 * Users can add custom locales using addTranslations()
 */
export type Locale = 'en' | 'es' | 'fr' | 'de' | 'zh' | 'ja' | string;

/**
 * Translation value can be a string or a pluralization object
 */
export type TranslationValue =
  | string
  | {
      zero?: string;
      one?: string;
      two?: string;
      few?: string;
      many?: string;
      other: string;
    };

/**
 * Nested translation object
 */
export type Translations = {
  [key: string]: TranslationValue | Translations;
};

/**
 * Translation parameters for interpolation
 */
export type TranslationParams = Record<string, string | number>;

/**
 * Pluralization count
 */
export interface PluralOptions {
  count: number;
}

/**
 * Translation function options
 */
export type TranslationOptions = TranslationParams & Partial<PluralOptions>;

/**
 * Locale data structure
 */
export interface LocaleData {
  locale: Locale;
  translations: Translations;
}
