/**
 * Themes index for Fluxwind UI
 * Exports all available themes
 */

import { lightTheme } from './light';
import { darkTheme } from './dark';

export { lightTheme, darkTheme };
export type { LightTheme } from './light';
export type { DarkTheme } from './dark';

/**
 * Theme registry
 * Maps theme names to theme objects
 */
export const themes = {
  light: lightTheme,
  dark: darkTheme,
} as const;

export type ThemeName = keyof typeof themes;
export type Theme = (typeof themes)[ThemeName];
