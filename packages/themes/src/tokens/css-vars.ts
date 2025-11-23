/**
 * CSS Variable Mappings
 *
 * Maps design tokens to their CSS variable names.
 * Used by component configs for theme-compliant styling.
 *
 * @module @fluxwind/themes/tokens
 */

import { spacingTokens } from './spacing';
import { animationDuration, animationEasing } from './animation';
import { borderRadius, borderWidth } from './borders';
import { shadowTokens } from './shadows';

/**
 * Spacing CSS variables
 * Maps spacing scale to CSS variable names
 */
export const spacingVars = Object.fromEntries(
  Object.entries(spacingTokens).map(([key, _value]) => [key, `var(--fluxwind-space-${key})`])
) as Record<keyof typeof spacingTokens, string>;

/**
 * Animation duration CSS variables
 */
export const durationVars = Object.fromEntries(
  Object.entries(animationDuration).map(([key, _value]) => [key, `var(--fluxwind-duration-${key})`])
) as Record<keyof typeof animationDuration, string>;

/**
 * Animation easing CSS variables
 */
export const easingVars = Object.fromEntries(
  Object.entries(animationEasing).map(([key, _value]) => [key, `var(--fluxwind-easing-${key})`])
) as Record<keyof typeof animationEasing, string>;

/**
 * Border radius CSS variables
 */
export const radiusVars = Object.fromEntries(
  Object.entries(borderRadius).map(([key, _value]) => [key, `var(--fluxwind-radius-${key})`])
) as Record<keyof typeof borderRadius, string>;

/**
 * Border width CSS variables
 */
export const borderWidthVars = Object.fromEntries(
  Object.entries(borderWidth).map(([key, _value]) => [key, `var(--fluxwind-border-${key})`])
) as Record<keyof typeof borderWidth, string>;

/**
 * Shadow CSS variables
 */
export const shadowVars = Object.fromEntries(
  Object.entries(shadowTokens).map(([key, _value]) => [key, `var(--fluxwind-shadow-${key})`])
) as Record<keyof typeof shadowTokens, string>;

/**
 * Color CSS variables (semantic)
 * These need to be dynamically generated based on theme
 */
export const colorVars = {
  // Primary
  primary: {
    50: 'var(--fluxwind-color-primary-50)',
    100: 'var(--fluxwind-color-primary-100)',
    200: 'var(--fluxwind-color-primary-200)',
    300: 'var(--fluxwind-color-primary-300)',
    400: 'var(--fluxwind-color-primary-400)',
    500: 'var(--fluxwind-color-primary-500)',
    600: 'var(--fluxwind-color-primary-600)',
    700: 'var(--fluxwind-color-primary-700)',
    800: 'var(--fluxwind-color-primary-800)',
    900: 'var(--fluxwind-color-primary-900)',
    950: 'var(--fluxwind-color-primary-950)',
  },
  // Secondary
  secondary: {
    50: 'var(--fluxwind-color-secondary-50)',
    100: 'var(--fluxwind-color-secondary-100)',
    200: 'var(--fluxwind-color-secondary-200)',
    300: 'var(--fluxwind-color-secondary-300)',
    400: 'var(--fluxwind-color-secondary-400)',
    500: 'var(--fluxwind-color-secondary-500)',
    600: 'var(--fluxwind-color-secondary-600)',
    700: 'var(--fluxwind-color-secondary-700)',
    800: 'var(--fluxwind-color-secondary-800)',
    900: 'var(--fluxwind-color-secondary-900)',
    950: 'var(--fluxwind-color-secondary-950)',
  },
  // Success
  success: {
    50: 'var(--fluxwind-color-success-50)',
    100: 'var(--fluxwind-color-success-100)',
    200: 'var(--fluxwind-color-success-200)',
    300: 'var(--fluxwind-color-success-300)',
    400: 'var(--fluxwind-color-success-400)',
    500: 'var(--fluxwind-color-success-500)',
    600: 'var(--fluxwind-color-success-600)',
    700: 'var(--fluxwind-color-success-700)',
    800: 'var(--fluxwind-color-success-800)',
    900: 'var(--fluxwind-color-success-900)',
    950: 'var(--fluxwind-color-success-950)',
  },
  // Error
  error: {
    50: 'var(--fluxwind-color-error-50)',
    100: 'var(--fluxwind-color-error-100)',
    200: 'var(--fluxwind-color-error-200)',
    300: 'var(--fluxwind-color-error-300)',
    400: 'var(--fluxwind-color-error-400)',
    500: 'var(--fluxwind-color-error-500)',
    600: 'var(--fluxwind-color-error-600)',
    700: 'var(--fluxwind-color-error-700)',
    800: 'var(--fluxwind-color-error-800)',
    900: 'var(--fluxwind-color-error-900)',
    950: 'var(--fluxwind-color-error-950)',
  },
  // Warning
  warning: {
    50: 'var(--fluxwind-color-warning-50)',
    100: 'var(--fluxwind-color-warning-100)',
    200: 'var(--fluxwind-color-warning-200)',
    300: 'var(--fluxwind-color-warning-300)',
    400: 'var(--fluxwind-color-warning-400)',
    500: 'var(--fluxwind-color-warning-500)',
    600: 'var(--fluxwind-color-warning-600)',
    700: 'var(--fluxwind-color-warning-700)',
    800: 'var(--fluxwind-color-warning-800)',
    900: 'var(--fluxwind-color-warning-900)',
    950: 'var(--fluxwind-color-warning-950)',
  },
  // Info
  info: {
    50: 'var(--fluxwind-color-info-50)',
    100: 'var(--fluxwind-color-info-100)',
    200: 'var(--fluxwind-color-info-200)',
    300: 'var(--fluxwind-color-info-300)',
    400: 'var(--fluxwind-color-info-400)',
    500: 'var(--fluxwind-color-info-500)',
    600: 'var(--fluxwind-color-info-600)',
    700: 'var(--fluxwind-color-info-700)',
    800: 'var(--fluxwind-color-info-800)',
    900: 'var(--fluxwind-color-info-900)',
    950: 'var(--fluxwind-color-info-950)',
  },
  // Neutrals
  gray: {
    50: 'var(--fluxwind-color-gray-50)',
    100: 'var(--fluxwind-color-gray-100)',
    200: 'var(--fluxwind-color-gray-200)',
    300: 'var(--fluxwind-color-gray-300)',
    400: 'var(--fluxwind-color-gray-400)',
    500: 'var(--fluxwind-color-gray-500)',
    600: 'var(--fluxwind-color-gray-600)',
    700: 'var(--fluxwind-color-gray-700)',
    800: 'var(--fluxwind-color-gray-800)',
    900: 'var(--fluxwind-color-gray-900)',
    950: 'var(--fluxwind-color-gray-950)',
  },
  // Basics
  white: 'var(--fluxwind-color-white)',
  black: 'var(--fluxwind-color-black)',
  transparent: 'transparent',
  current: 'currentColor',
} as const;

/**
 * Typography CSS variables
 */
export const typographyVars = {
  fontFamily: {
    sans: 'var(--fluxwind-font-sans)',
    serif: 'var(--fluxwind-font-serif)',
    mono: 'var(--fluxwind-font-mono)',
  },
  fontSize: {
    xs: 'var(--fluxwind-text-xs)',
    sm: 'var(--fluxwind-text-sm)',
    base: 'var(--fluxwind-text-base)',
    lg: 'var(--fluxwind-text-lg)',
    xl: 'var(--fluxwind-text-xl)',
    '2xl': 'var(--fluxwind-text-2xl)',
    '3xl': 'var(--fluxwind-text-3xl)',
    '4xl': 'var(--fluxwind-text-4xl)',
    '5xl': 'var(--fluxwind-text-5xl)',
  },
} as const;

/**
 * All CSS variables in one object
 * Convenient export for consuming packages
 */
export const cssVars = {
  spacing: spacingVars,
  duration: durationVars,
  easing: easingVars,
  radius: radiusVars,
  borderWidth: borderWidthVars,
  shadow: shadowVars,
  color: colorVars,
  typography: typographyVars,
} as const;

/**
 * Helper to get CSS variable reference
 *
 * @example
 * ```typescript
 * getCssVar('spacing', '4'); // 'var(--fluxwind-space-4)'
 * getCssVar('color', 'primary', '500'); // 'var(--fluxwind-color-primary-500)'
 * ```
 */
export function getCssVar(category: keyof typeof cssVars, ...keys: string[]): string {
  const obj = cssVars[category] as Record<string, unknown>;
  let current: unknown = obj;

  for (const key of keys) {
    if (typeof current === 'object' && current !== null) {
      current = (current as Record<string, unknown>)[key];
    }
  }

  return typeof current === 'string' ? current : '';
}
