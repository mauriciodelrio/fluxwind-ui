/**
 * Border tokens for Fluxwind UI
 * Border widths and radius values
 */

/**
 * Border widths
 */
export const borderWidth = {
  0: '0px',
  DEFAULT: '1px',
  2: '2px',
  4: '4px',
  8: '8px',
} as const;

/**
 * Border radius
 * Rounded corners for different use cases
 */
export const borderRadius = {
  none: '0px',
  sm: '0.125rem', // 2px
  DEFAULT: '0.25rem', // 4px
  md: '0.375rem', // 6px
  lg: '0.5rem', // 8px
  xl: '0.75rem', // 12px
  '2xl': '1rem', // 16px
  '3xl': '1.5rem', // 24px
  full: '9999px', // Pill shape
} as const;

/**
 * Semantic border tokens
 */
export const semanticBorders = {
  // Input borders
  input: {
    width: borderWidth.DEFAULT,
    radius: borderRadius.md,
  },

  // Button borders
  button: {
    width: borderWidth.DEFAULT,
    radius: borderRadius.md,
  },

  // Card borders
  card: {
    width: borderWidth.DEFAULT,
    radius: borderRadius.lg,
  },

  // Modal/Dialog borders
  modal: {
    width: borderWidth.DEFAULT,
    radius: borderRadius.xl,
  },

  // Badge/Tag borders
  badge: {
    width: borderWidth.DEFAULT,
    radius: borderRadius.full,
  },
} as const;

export type BorderWidth = keyof typeof borderWidth;
export type BorderRadius = keyof typeof borderRadius;
