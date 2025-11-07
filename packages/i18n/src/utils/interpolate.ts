import type { TranslationParams } from '../types';

/**
 * Interpolates parameters into a translation string
 *
 * @example
 * interpolate('Hello, {{name}}!', { name: 'World' })
 * // => 'Hello, World!'
 */
export function interpolate(template: string, params: TranslationParams): string {
  return template.replace(/\{\{(\w+)\}\}/g, (_, key) => {
    const value = params[key];
    return value !== undefined ? String(value) : `{{${key}}}`;
  });
}
