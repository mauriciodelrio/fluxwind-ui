/**
 * Color tokens for Fluxwind UI
 * Includes Tailwind's default colors plus custom brand colors
 */

// Re-export Tailwind's colors for consistency
import colors from 'tailwindcss/colors';

// Remove deprecated color names to avoid warnings
const {
  lightBlue: _lightBlue,
  warmGray: _warmGray,
  trueGray: _trueGray,
  coolGray: _coolGray,
  blueGray: _blueGray,
  ...modernColors
} = colors;

/**
 * Custom color palettes (not in Tailwind by default)
 * Each palette follows the same 50-950 scale as Tailwind
 */
export const customColors = {
  /**
   * Ocean - Professional blue-green, perfect for corporate/tech brands
   * Use case: Primary color for SaaS, fintech, productivity apps
   */
  ocean: {
    50: '#ecfeff',
    100: '#cffafe',
    200: '#a5f3fc',
    300: '#67e8f9',
    400: '#22d3ee',
    500: '#06b6d4',
    600: '#0891b2',
    700: '#0e7490',
    800: '#155e75',
    900: '#164e63',
    950: '#083344',
  },

  /**
   * Tangerine - Vibrant orange, modern and energetic
   * Use case: CTAs, highlights, creative/marketing brands
   */
  tangerine: {
    50: '#fff7ed',
    100: '#ffedd5',
    200: '#fed7aa',
    300: '#fdba74',
    400: '#fb923c',
    500: '#f97316',
    600: '#ea580c',
    700: '#c2410c',
    800: '#9a3412',
    900: '#7c2d12',
    950: '#431407',
  },

  /**
   * Sapphire - Rich blue, premium and trustworthy
   * Use case: Finance, healthcare, enterprise applications
   */
  sapphire: {
    50: '#eff6ff',
    100: '#dbeafe',
    200: '#bfdbfe',
    300: '#93c5fd',
    400: '#60a5fa',
    500: '#3b82f6',
    600: '#2563eb',
    700: '#1d4ed8',
    800: '#1e40af',
    900: '#1e3a8a',
    950: '#172554',
  },

  /**
   * Mint - Fresh green-teal, clean and modern
   * Use case: Health, wellness, eco-friendly brands
   */
  mint: {
    50: '#f0fdfa',
    100: '#ccfbf1',
    200: '#99f6e4',
    300: '#5eead4',
    400: '#2dd4bf',
    500: '#14b8a6',
    600: '#0d9488',
    700: '#0f766e',
    800: '#115e59',
    900: '#134e4a',
    950: '#042f2e',
  },

  /**
   * Lavender - Soft purple, elegant and sophisticated
   * Use case: Creative, beauty, luxury brands
   */
  lavender: {
    50: '#faf5ff',
    100: '#f3e8ff',
    200: '#e9d5ff',
    300: '#d8b4fe',
    400: '#c084fc',
    500: '#a855f7',
    600: '#9333ea',
    700: '#7e22ce',
    800: '#6b21a8',
    900: '#581c87',
    950: '#3b0764',
  },

  /**
   * Coral - Warm pink-orange, friendly and approachable
   * Use case: Social, community, lifestyle brands
   */
  coral: {
    50: '#fff1f2',
    100: '#ffe4e6',
    200: '#fecdd3',
    300: '#fda4af',
    400: '#fb7185',
    500: '#f43f5e',
    600: '#e11d48',
    700: '#be123c',
    800: '#9f1239',
    900: '#881337',
    950: '#4c0519',
  },

  /**
   * Electric - Neon blue, tech and futuristic
   * Use case: Gaming, tech startups, AI/ML products
   */
  electric: {
    50: '#f0f9ff',
    100: '#e0f2fe',
    200: '#bae6fd',
    300: '#7dd3fc',
    400: '#38bdf8',
    500: '#0ea5e9',
    600: '#0284c7',
    700: '#0369a1',
    800: '#075985',
    900: '#0c4a6e',
    950: '#082f49',
  },
} as const;

/**
 * Complete color palette combining Tailwind + custom colors
 */
export const colorTokens = {
  // Inherit all Tailwind colors (excluding deprecated ones)
  ...modernColors,

  // Add custom colors
  ...customColors,

  // Override 'gray' to use a more neutral shade (Tailwind's neutral)
  gray: modernColors.neutral,
} as const;

export type ColorToken = keyof typeof colorTokens;
export type ColorShade = 50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900 | 950;
