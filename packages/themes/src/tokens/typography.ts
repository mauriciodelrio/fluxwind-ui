/**
 * Typography tokens for Fluxwind UI
 * Font families, sizes, weights, and line heights
 */

export const typographyTokens = {
  /**
   * Font families
   * Using system font stacks for performance
   */
  fontFamily: {
    sans: [
      'Inter',
      'ui-sans-serif',
      'system-ui',
      '-apple-system',
      'BlinkMacSystemFont',
      'Segoe UI',
      'Roboto',
      'Helvetica Neue',
      'Arial',
      'sans-serif',
      'Apple Color Emoji',
      'Segoe UI Emoji',
      'Segoe UI Symbol',
    ],
    serif: ['ui-serif', 'Georgia', 'Cambria', 'Times New Roman', 'Times', 'serif'],
    mono: [
      'JetBrains Mono',
      'ui-monospace',
      'SFMono-Regular',
      'Monaco',
      'Consolas',
      'Liberation Mono',
      'Courier New',
      'monospace',
    ],
  },

  /**
   * Font sizes with corresponding line heights
   * Format: [fontSize, { lineHeight, letterSpacing? }]
   */
  fontSize: {
    xs: ['0.75rem', { lineHeight: '1rem' }], // 12px / 16px
    sm: ['0.875rem', { lineHeight: '1.25rem' }], // 14px / 20px
    base: ['1rem', { lineHeight: '1.5rem' }], // 16px / 24px
    lg: ['1.125rem', { lineHeight: '1.75rem' }], // 18px / 28px
    xl: ['1.25rem', { lineHeight: '1.75rem' }], // 20px / 28px
    '2xl': ['1.5rem', { lineHeight: '2rem' }], // 24px / 32px
    '3xl': ['1.875rem', { lineHeight: '2.25rem' }], // 30px / 36px
    '4xl': ['2.25rem', { lineHeight: '2.5rem' }], // 36px / 40px
    '5xl': ['3rem', { lineHeight: '1' }], // 48px / 48px
    '6xl': ['3.75rem', { lineHeight: '1' }], // 60px / 60px
    '7xl': ['4.5rem', { lineHeight: '1' }], // 72px / 72px
    '8xl': ['6rem', { lineHeight: '1' }], // 96px / 96px
    '9xl': ['8rem', { lineHeight: '1' }], // 128px / 128px
  },

  /**
   * Font weights
   */
  fontWeight: {
    thin: '100',
    extralight: '200',
    light: '300',
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
    extrabold: '800',
    black: '900',
  },

  /**
   * Letter spacing
   */
  letterSpacing: {
    tighter: '-0.05em',
    tight: '-0.025em',
    normal: '0em',
    wide: '0.025em',
    wider: '0.05em',
    widest: '0.1em',
  },

  /**
   * Line height (for custom use)
   */
  lineHeight: {
    none: '1',
    tight: '1.25',
    snug: '1.375',
    normal: '1.5',
    relaxed: '1.625',
    loose: '2',
  },
} as const;

/**
 * Semantic typography tokens for specific use cases
 */
export const semanticTypography = {
  // Headings
  heading: {
    h1: {
      fontSize: typographyTokens.fontSize['5xl'],
      fontWeight: typographyTokens.fontWeight.bold,
      letterSpacing: typographyTokens.letterSpacing.tight,
    },
    h2: {
      fontSize: typographyTokens.fontSize['4xl'],
      fontWeight: typographyTokens.fontWeight.bold,
      letterSpacing: typographyTokens.letterSpacing.tight,
    },
    h3: {
      fontSize: typographyTokens.fontSize['3xl'],
      fontWeight: typographyTokens.fontWeight.semibold,
      letterSpacing: typographyTokens.letterSpacing.tight,
    },
    h4: {
      fontSize: typographyTokens.fontSize['2xl'],
      fontWeight: typographyTokens.fontWeight.semibold,
      letterSpacing: typographyTokens.letterSpacing.normal,
    },
    h5: {
      fontSize: typographyTokens.fontSize.xl,
      fontWeight: typographyTokens.fontWeight.semibold,
      letterSpacing: typographyTokens.letterSpacing.normal,
    },
    h6: {
      fontSize: typographyTokens.fontSize.lg,
      fontWeight: typographyTokens.fontWeight.semibold,
      letterSpacing: typographyTokens.letterSpacing.normal,
    },
  },

  // Body text
  body: {
    xs: {
      fontSize: typographyTokens.fontSize.xs,
      lineHeight: typographyTokens.lineHeight.normal,
    },
    sm: {
      fontSize: typographyTokens.fontSize.sm,
      lineHeight: typographyTokens.lineHeight.normal,
    },
    md: {
      fontSize: typographyTokens.fontSize.base,
      lineHeight: typographyTokens.lineHeight.relaxed,
    },
    lg: {
      fontSize: typographyTokens.fontSize.lg,
      lineHeight: typographyTokens.lineHeight.relaxed,
    },
  },

  // Code/Mono
  code: {
    fontSize: typographyTokens.fontSize.sm,
    fontFamily: typographyTokens.fontFamily.mono,
  },

  // Labels
  label: {
    fontSize: typographyTokens.fontSize.sm,
    fontWeight: typographyTokens.fontWeight.medium,
  },

  // Captions
  caption: {
    fontSize: typographyTokens.fontSize.xs,
    lineHeight: typographyTokens.lineHeight.normal,
  },
} as const;
