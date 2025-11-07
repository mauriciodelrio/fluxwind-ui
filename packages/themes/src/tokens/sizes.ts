/**
 * Size tokens for Fluxwind UI
 * Predefined sizes for icons, components, and other elements
 */

/**
 * Icon sizes
 * Standard sizes for iconography
 */
export const iconSizes = {
  xs: '0.75rem', // 12px
  sm: '1rem', // 16px
  base: '1.25rem', // 20px
  md: '1.5rem', // 24px
  lg: '2rem', // 32px
  xl: '2.5rem', // 40px
  '2xl': '3rem', // 48px
} as const;

/**
 * Component heights
 * Standard heights for form elements and buttons
 */
export const componentHeights = {
  xs: '1.5rem', // 24px
  sm: '2rem', // 32px
  base: '2.5rem', // 40px
  md: '2.5rem', // 40px
  lg: '3rem', // 48px
  xl: '3.5rem', // 56px
  '2xl': '4rem', // 64px
} as const;

/**
 * Avatar sizes
 */
export const avatarSizes = {
  xs: '1.5rem', // 24px
  sm: '2rem', // 32px
  base: '2.5rem', // 40px
  md: '3rem', // 48px
  lg: '4rem', // 64px
  xl: '6rem', // 96px
  '2xl': '8rem', // 128px
} as const;

/**
 * Container max widths
 * For constraining content width
 */
export const containerMaxWidths = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
  full: '100%',
} as const;

/**
 * Semantic size tokens for specific components
 */
export const semanticSizes = {
  // Button sizes
  button: {
    xs: componentHeights.xs,
    sm: componentHeights.sm,
    md: componentHeights.base,
    lg: componentHeights.lg,
    xl: componentHeights.xl,
  },

  // Input sizes
  input: {
    xs: componentHeights.xs,
    sm: componentHeights.sm,
    md: componentHeights.base,
    lg: componentHeights.lg,
    xl: componentHeights.xl,
  },

  // Icon button (square)
  iconButton: {
    xs: componentHeights.xs,
    sm: componentHeights.sm,
    md: componentHeights.base,
    lg: componentHeights.lg,
    xl: componentHeights.xl,
  },

  // Spinner sizes
  spinner: {
    xs: iconSizes.sm,
    sm: iconSizes.base,
    md: iconSizes.md,
    lg: iconSizes.lg,
    xl: iconSizes.xl,
  },
} as const;

export type IconSize = keyof typeof iconSizes;
export type ComponentHeight = keyof typeof componentHeights;
export type AvatarSize = keyof typeof avatarSizes;
