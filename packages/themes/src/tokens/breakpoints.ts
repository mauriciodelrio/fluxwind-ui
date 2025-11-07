/**
 * Breakpoint tokens for Fluxwind UI
 * Responsive design breakpoints
 */

export const breakpointTokens = {
  xs: '475px', // Extra small devices (large phones)
  sm: '640px', // Small devices (tablets)
  md: '768px', // Medium devices (tablets landscape)
  lg: '1024px', // Large devices (desktops)
  xl: '1280px', // Extra large devices (large desktops)
  '2xl': '1536px', // 2X large devices (larger desktops)
} as const;

/**
 * Media query helpers
 * Pre-formatted media queries for common use cases
 */
export const mediaQueries = {
  xs: `(min-width: ${breakpointTokens.xs})`,
  sm: `(min-width: ${breakpointTokens.sm})`,
  md: `(min-width: ${breakpointTokens.md})`,
  lg: `(min-width: ${breakpointTokens.lg})`,
  xl: `(min-width: ${breakpointTokens.xl})`,
  '2xl': `(min-width: ${breakpointTokens['2xl']})`,

  // Max-width queries
  maxXs: `(max-width: ${breakpointTokens.xs})`,
  maxSm: `(max-width: ${breakpointTokens.sm})`,
  maxMd: `(max-width: ${breakpointTokens.md})`,
  maxLg: `(max-width: ${breakpointTokens.lg})`,
  maxXl: `(max-width: ${breakpointTokens.xl})`,
  max2xl: `(max-width: ${breakpointTokens['2xl']})`,

  // Device-specific
  mobile: `(max-width: ${breakpointTokens.md})`,
  tablet: `(min-width: ${breakpointTokens.md}) and (max-width: ${breakpointTokens.lg})`,
  desktop: `(min-width: ${breakpointTokens.lg})`,

  // Orientation
  portrait: '(orientation: portrait)',
  landscape: '(orientation: landscape)',

  // Touch devices
  touch: '(hover: none) and (pointer: coarse)',
  mouse: '(hover: hover) and (pointer: fine)',

  // Dark mode
  dark: '(prefers-color-scheme: dark)',
  light: '(prefers-color-scheme: light)',

  // Reduced motion
  reducedMotion: '(prefers-reduced-motion: reduce)',
  motion: '(prefers-reduced-motion: no-preference)',

  // High contrast
  highContrast: '(prefers-contrast: high)',

  // Print
  print: 'print',
  screen: 'screen',
} as const;

export type Breakpoint = keyof typeof breakpointTokens;
export type MediaQuery = keyof typeof mediaQueries;
