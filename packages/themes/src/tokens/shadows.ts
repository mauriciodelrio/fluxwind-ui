/**
 * Shadow tokens for Fluxwind UI
 * Elevation and depth system
 */

export const shadowTokens = {
  // No shadow
  none: 'none',

  // Subtle shadows for slight elevation
  xs: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
  sm: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',

  // Default shadow
  DEFAULT: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',

  // Medium elevation
  md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',

  // Higher elevation
  lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
  xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',

  // Very high elevation
  '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',

  // Inner shadow (for inset effects)
  inner: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)',
} as const;

/**
 * Semantic shadow tokens for specific use cases
 */
export const semanticShadows = {
  // Component elevations
  card: shadowTokens.sm,
  cardHover: shadowTokens.md,
  dropdown: shadowTokens.lg,
  modal: shadowTokens.xl,
  popover: shadowTokens.lg,
  tooltip: shadowTokens.md,

  // Input states
  inputFocus: '0 0 0 3px rgb(59 130 246 / 0.1)', // Blue ring
  inputError: '0 0 0 3px rgb(239 68 68 / 0.1)', // Red ring

  // Button states
  buttonHover: shadowTokens.sm,
  buttonActive: shadowTokens.inner,

  // Floating elements
  fab: shadowTokens.lg, // Floating Action Button
  sticky: shadowTokens.sm, // Sticky headers/footers
} as const;

/**
 * Colored shadows for special effects
 */
export const coloredShadows = {
  // Primary color glow
  primaryGlow: '0 0 20px rgb(59 130 246 / 0.3)',
  primaryGlowLg: '0 0 40px rgb(59 130 246 / 0.4)',

  // Success glow
  successGlow: '0 0 20px rgb(34 197 94 / 0.3)',

  // Error glow
  errorGlow: '0 0 20px rgb(239 68 68 / 0.3)',

  // Warning glow
  warningGlow: '0 0 20px rgb(234 179 8 / 0.3)',
} as const;

export type ShadowToken = keyof typeof shadowTokens;
