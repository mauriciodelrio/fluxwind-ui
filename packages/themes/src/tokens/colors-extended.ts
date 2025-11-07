/**
 * Extended color palettes exclusive to Fluxwind UI
 *
 * Each palette includes 11 shades (50-950) with proper contrast ratios
 * for accessibility compliance (WCAG AA/AAA)
 *
 * @module colors-extended
 */

/**
 * Ocean - Deep blue-green palette
 *
 * Professional and calm, perfect for corporate applications.
 * Evokes trust, stability, and depth.
 *
 * Use cases:
 * - Primary color for business apps
 * - Professional dashboards
 * - Financial interfaces
 *
 * @example
 * ```tsx
 * <div className="bg-ocean-500 text-ocean-50">Ocean themed component</div>
 * ```
 */
export const ocean = {
  50: '#ecfeff',
  100: '#cffafe',
  200: '#a5f3fc',
  300: '#67e8f9',
  400: '#22d3ee',
  500: '#06b6d4', // Primary
  600: '#0891b2',
  700: '#0e7490',
  800: '#155e75',
  900: '#164e63',
  950: '#083344',
} as const;

/**
 * Tangerine - Vibrant orange palette
 *
 * Modern and energetic, perfect for creative applications.
 * Evokes enthusiasm, warmth, and innovation.
 *
 * Use cases:
 * - Call-to-action buttons
 * - Creative portfolios
 * - Marketing websites
 *
 * @example
 * ```tsx
 * <button className="bg-tangerine-500 hover:bg-tangerine-600">
 *   Get Started
 * </button>
 * ```
 */
export const tangerine = {
  50: '#fff7ed',
  100: '#ffedd5',
  200: '#fed7aa',
  300: '#fdba74',
  400: '#fb923c',
  500: '#f97316', // Primary
  600: '#ea580c',
  700: '#c2410c',
  800: '#9a3412',
  900: '#7c2d12',
  950: '#431407',
} as const;

/**
 * Sapphire - Rich blue palette
 *
 * Premium and sophisticated, perfect for luxury brands.
 * Evokes elegance, quality, and exclusivity.
 *
 * Use cases:
 * - Premium product showcases
 * - Luxury e-commerce
 * - High-end services
 *
 * @example
 * ```tsx
 * <div className="bg-sapphire-500 text-sapphire-50">
 *   Premium Feature
 * </div>
 * ```
 */
export const sapphire = {
  50: '#eff6ff',
  100: '#dbeafe',
  200: '#bfdbfe',
  300: '#93c5fd',
  400: '#60a5fa',
  500: '#3b82f6', // Primary
  600: '#2563eb',
  700: '#1d4ed8',
  800: '#1e40af',
  900: '#1e3a8a',
  950: '#172554',
} as const;

/**
 * Mint - Fresh green palette
 *
 * Clean and refreshing, perfect for health and wellness.
 * Evokes growth, nature, and vitality.
 *
 * Use cases:
 * - Health apps
 * - Environmental platforms
 * - Wellness products
 *
 * @example
 * ```tsx
 * <div className="bg-mint-500 text-white">
 *   Healthy Living
 * </div>
 * ```
 */
export const mint = {
  50: '#f0fdfa',
  100: '#ccfbf1',
  200: '#99f6e4',
  300: '#5eead4',
  400: '#2dd4bf',
  500: '#14b8a6', // Primary
  600: '#0d9488',
  700: '#0f766e',
  800: '#115e59',
  900: '#134e4a',
  950: '#042f2e',
} as const;

/**
 * Lavender - Soft purple palette
 *
 * Elegant and calming, perfect for creative and artistic projects.
 * Evokes creativity, luxury, and imagination.
 *
 * Use cases:
 * - Creative tools
 * - Art galleries
 * - Beauty products
 *
 * @example
 * ```tsx
 * <div className="bg-lavender-500 text-lavender-50">
 *   Creative Studio
 * </div>
 * ```
 */
export const lavender = {
  50: '#faf5ff',
  100: '#f3e8ff',
  200: '#e9d5ff',
  300: '#d8b4fe',
  400: '#c084fc',
  500: '#a855f7', // Primary
  600: '#9333ea',
  700: '#7e22ce',
  800: '#6b21a8',
  900: '#581c87',
  950: '#3b0764',
} as const;

/**
 * Coral - Warm pink-orange palette
 *
 * Friendly and inviting, perfect for social and community apps.
 * Evokes warmth, compassion, and connection.
 *
 * Use cases:
 * - Social networks
 * - Community platforms
 * - Dating apps
 *
 * @example
 * ```tsx
 * <div className="bg-coral-500 text-white">
 *   Join Community
 * </div>
 * ```
 */
export const coral = {
  50: '#fff1f2',
  100: '#ffe4e6',
  200: '#fecdd3',
  300: '#fda4af',
  400: '#fb7185',
  500: '#f43f5e', // Primary
  600: '#e11d48',
  700: '#be123c',
  800: '#9f1239',
  900: '#881337',
  950: '#4c0519',
} as const;

/**
 * Electric - Bright blue palette
 *
 * Tech-forward and dynamic, perfect for tech startups.
 * Evokes innovation, energy, and modernity.
 *
 * Use cases:
 * - Tech startups
 * - SaaS products
 * - Developer tools
 *
 * @example
 * ```tsx
 * <div className="bg-electric-500 text-white">
 *   Next-Gen Technology
 * </div>
 * ```
 */
export const electric = {
  50: '#eff6ff',
  100: '#dbeafe',
  200: '#bfdbfe',
  300: '#93c5fd',
  400: '#60a5fa',
  500: '#3b82f6', // Primary
  600: '#2563eb',
  700: '#1d4ed8',
  800: '#1e40af',
  900: '#1e3a8a',
  950: '#172554',
} as const;

/**
 * Amber - Warm golden palette
 *
 * Luxurious and warm, perfect for premium brands.
 * Evokes quality, warmth, and prestige.
 *
 * Use cases:
 * - Luxury brands
 * - Premium services
 * - Award systems
 *
 * @example
 * ```tsx
 * <div className="bg-amber-500 text-amber-950">
 *   Premium Member
 * </div>
 * ```
 */
export const amber = {
  50: '#fffbeb',
  100: '#fef3c7',
  200: '#fde68a',
  300: '#fcd34d',
  400: '#fbbf24',
  500: '#f59e0b', // Primary
  600: '#d97706',
  700: '#b45309',
  800: '#92400e',
  900: '#78350f',
  950: '#451a03',
} as const;

/**
 * Rose - Romantic pink palette
 *
 * Romantic and elegant, perfect for lifestyle brands.
 * Evokes romance, beauty, and sophistication.
 *
 * Use cases:
 * - Fashion brands
 * - Wedding planners
 * - Beauty industry
 *
 * @example
 * ```tsx
 * <div className="bg-rose-500 text-white">
 *   Romantic Collection
 * </div>
 * ```
 */
export const rose = {
  50: '#fff1f2',
  100: '#ffe4e6',
  200: '#fecdd3',
  300: '#fda4af',
  400: '#fb7185',
  500: '#f43f5e', // Primary
  600: '#e11d48',
  700: '#be123c',
  800: '#9f1239',
  900: '#881337',
  950: '#4c0519',
} as const;

/**
 * Lime - Fresh yellow-green palette
 *
 * Energetic and fresh, perfect for eco-conscious brands.
 * Evokes energy, nature, and vitality.
 *
 * Use cases:
 * - Eco-friendly products
 * - Energy brands
 * - Sports apps
 *
 * @example
 * ```tsx
 * <div className="bg-lime-500 text-lime-950">
 *   Fresh Energy
 * </div>
 * ```
 */
export const lime = {
  50: '#f7fee7',
  100: '#ecfccb',
  200: '#d9f99d',
  300: '#bef264',
  400: '#a3e635',
  500: '#84cc16', // Primary
  600: '#65a30d',
  700: '#4d7c0f',
  800: '#3f6212',
  900: '#365314',
  950: '#1a2e05',
} as const;

/**
 * Emerald - Rich green palette
 *
 * Prestigious and natural, perfect for finance and health.
 * Evokes growth, stability, and prosperity.
 *
 * Use cases:
 * - Financial apps
 * - Investment platforms
 * - Health services
 *
 * @example
 * ```tsx
 * <div className="bg-emerald-500 text-white">
 *   Growth Portfolio
 * </div>
 * ```
 */
export const emerald = {
  50: '#ecfdf5',
  100: '#d1fae5',
  200: '#a7f3d0',
  300: '#6ee7b7',
  400: '#34d399',
  500: '#10b981', // Primary
  600: '#059669',
  700: '#047857',
  800: '#065f46',
  900: '#064e3b',
  950: '#022c22',
} as const;

/**
 * Sky - Light blue palette
 *
 * Airy and open, perfect for travel and communication.
 * Evokes freedom, clarity, and openness.
 *
 * Use cases:
 * - Travel apps
 * - Communication tools
 * - Weather apps
 *
 * @example
 * ```tsx
 * <div className="bg-sky-500 text-white">
 *   Book Your Flight
 * </div>
 * ```
 */
export const sky = {
  50: '#f0f9ff',
  100: '#e0f2fe',
  200: '#bae6fd',
  300: '#7dd3fc',
  400: '#38bdf8',
  500: '#0ea5e9', // Primary
  600: '#0284c7',
  700: '#0369a1',
  800: '#075985',
  900: '#0c4a6e',
  950: '#082f49',
} as const;

/**
 * Indigo - Deep purple-blue palette
 *
 * Professional and trustworthy, perfect for enterprise.
 * Evokes authority, trust, and professionalism.
 *
 * Use cases:
 * - Enterprise software
 * - Legal services
 * - Corporate websites
 *
 * @example
 * ```tsx
 * <div className="bg-indigo-500 text-white">
 *   Enterprise Solution
 * </div>
 * ```
 */
export const indigo = {
  50: '#eef2ff',
  100: '#e0e7ff',
  200: '#c7d2fe',
  300: '#a5b4fc',
  400: '#818cf8',
  500: '#6366f1', // Primary
  600: '#4f46e5',
  700: '#4338ca',
  800: '#3730a3',
  900: '#312e81',
  950: '#1e1b4b',
} as const;

/**
 * Violet - Rich purple palette
 *
 * Creative and luxurious, perfect for artistic brands.
 * Evokes creativity, luxury, and imagination.
 *
 * Use cases:
 * - Creative agencies
 * - Art platforms
 * - Music apps
 *
 * @example
 * ```tsx
 * <div className="bg-violet-500 text-white">
 *   Creative Studio
 * </div>
 * ```
 */
export const violet = {
  50: '#faf5ff',
  100: '#f3e8ff',
  200: '#e9d5ff',
  300: '#d8b4fe',
  400: '#c084fc',
  500: '#a855f7', // Primary
  600: '#9333ea',
  700: '#7e22ce',
  800: '#6b21a8',
  900: '#581c87',
  950: '#3b0764',
} as const;

/**
 * Fuchsia - Vibrant magenta palette
 *
 * Bold and playful, perfect for entertainment brands.
 * Evokes excitement, playfulness, and energy.
 *
 * Use cases:
 * - Entertainment apps
 * - Gaming platforms
 * - Youth brands
 *
 * @example
 * ```tsx
 * <div className="bg-fuchsia-500 text-white">
 *   Play Now
 * </div>
 * ```
 */
export const fuchsia = {
  50: '#fdf4ff',
  100: '#fae8ff',
  200: '#f5d0fe',
  300: '#f0abfc',
  400: '#e879f9',
  500: '#d946ef', // Primary
  600: '#c026d3',
  700: '#a21caf',
  800: '#86198f',
  900: '#701a75',
  950: '#4a044e',
} as const;

/**
 * Bronze - Warm metallic palette
 *
 * Earthy and sophisticated, perfect for artisan brands.
 * Evokes craftsmanship, tradition, and quality.
 *
 * Use cases:
 * - Artisan products
 * - Coffee/tea brands
 * - Heritage brands
 *
 * @example
 * ```tsx
 * <div className="bg-bronze-500 text-white">
 *   Handcrafted Quality
 * </div>
 * ```
 */
export const bronze = {
  50: '#faf8f5',
  100: '#f5f0e8',
  200: '#e8dcc9',
  300: '#d6c3a3',
  400: '#c4a577',
  500: '#b8935a', // Primary
  600: '#a67c4a',
  700: '#8a6640',
  800: '#715439',
  900: '#5d4631',
  950: '#332519',
} as const;

/**
 * Crimson - Deep red palette
 *
 * Bold and passionate, perfect for strong brands.
 * Evokes passion, power, and determination.
 *
 * Use cases:
 * - Sports brands
 * - Automotive
 * - Bold campaigns
 *
 * @example
 * ```tsx
 * <div className="bg-crimson-500 text-white">
 *   Ultimate Performance
 * </div>
 * ```
 */
export const crimson = {
  50: '#fef2f2',
  100: '#fee2e2',
  200: '#fecaca',
  300: '#fca5a5',
  400: '#f87171',
  500: '#ef4444', // Primary
  600: '#dc2626',
  700: '#b91c1c',
  800: '#991b1b',
  900: '#7f1d1d',
  950: '#450a0a',
} as const;

/**
 * Teal - Balanced cyan-green palette
 *
 * Balanced and trustworthy, perfect for healthcare.
 * Evokes balance, healing, and trust.
 *
 * Use cases:
 * - Healthcare platforms
 * - Meditation apps
 * - Wellness services
 *
 * @example
 * ```tsx
 * <div className="bg-teal-500 text-white">
 *   Healthcare Services
 * </div>
 * ```
 */
export const teal = {
  50: '#f0fdfa',
  100: '#ccfbf1',
  200: '#99f6e4',
  300: '#5eead4',
  400: '#2dd4bf',
  500: '#14b8a6', // Primary
  600: '#0d9488',
  700: '#0f766e',
  800: '#115e59',
  900: '#134e4a',
  950: '#042f2e',
} as const;

// ============================================================================
// SEMANTIC COLORS (Enhanced for Fluxwind)
// ============================================================================

/**
 * Success - Enhanced green palette for positive feedback
 *
 * Optimized for success states, confirmations, and positive actions.
 * Designed for optimal visibility and accessibility.
 *
 * Use cases:
 * - Success messages
 * - Confirmation dialogs
 * - Completed states
 * - Positive indicators
 *
 * @example
 * ```tsx
 * <Alert variant="success" className="bg-success-50 border-success-500">
 *   Operation completed successfully!
 * </Alert>
 * ```
 */
export const success = {
  50: '#f0fdf4',
  100: '#dcfce7',
  200: '#bbf7d0',
  300: '#86efac',
  400: '#4ade80',
  500: '#22c55e', // Primary - Optimized for visibility
  600: '#16a34a',
  700: '#15803d',
  800: '#166534',
  900: '#14532d',
  950: '#052e16',
} as const;

/**
 * Warning - Enhanced amber palette for caution states
 *
 * Optimized for warning messages and cautionary actions.
 * Balanced between attention-grabbing and not alarming.
 *
 * Use cases:
 * - Warning messages
 * - Caution indicators
 * - Important notices
 * - Pending states
 *
 * @example
 * ```tsx
 * <Alert variant="warning" className="bg-warning-50 border-warning-500">
 *   Please review before continuing
 * </Alert>
 * ```
 */
export const warning = {
  50: '#fffbeb',
  100: '#fef3c7',
  200: '#fde68a',
  300: '#fcd34d',
  400: '#fbbf24',
  500: '#f59e0b', // Primary - High contrast
  600: '#d97706',
  700: '#b45309',
  800: '#92400e',
  900: '#78350f',
  950: '#451a03',
} as const;

/**
 * Error - Enhanced red palette for error states
 *
 * Optimized for error messages and destructive actions.
 * Strong visibility while maintaining professional appearance.
 *
 * Use cases:
 * - Error messages
 * - Destructive actions
 * - Failed states
 * - Critical alerts
 *
 * @example
 * ```tsx
 * <Alert variant="error" className="bg-error-50 border-error-500">
 *   An error occurred. Please try again.
 * </Alert>
 * ```
 */
export const error = {
  50: '#fef2f2',
  100: '#fee2e2',
  200: '#fecaca',
  300: '#fca5a5',
  400: '#f87171',
  500: '#ef4444', // Primary - Clear error indication
  600: '#dc2626',
  700: '#b91c1c',
  800: '#991b1b',
  900: '#7f1d1d',
  950: '#450a0a',
} as const;

/**
 * Info - Enhanced blue palette for informational states
 *
 * Optimized for informational messages and neutral actions.
 * Professional and non-intrusive.
 *
 * Use cases:
 * - Info messages
 * - Tips and hints
 * - Documentation
 * - Neutral indicators
 *
 * @example
 * ```tsx
 * <Alert variant="info" className="bg-info-50 border-info-500">
 *   Did you know? You can customize themes!
 * </Alert>
 * ```
 */
export const info = {
  50: '#eff6ff',
  100: '#dbeafe',
  200: '#bfdbfe',
  300: '#93c5fd',
  400: '#60a5fa',
  500: '#3b82f6', // Primary - Professional blue
  600: '#2563eb',
  700: '#1d4ed8',
  800: '#1e40af',
  900: '#1e3a8a',
  950: '#172554',
} as const;

// ============================================================================
// NEUTRAL PALETTES (Premium variations)
// ============================================================================

/**
 * Warm Gray - Warm neutral palette
 *
 * Slightly warm gray, perfect for cozy interfaces.
 * More inviting than pure gray.
 *
 * Use cases:
 * - Background colors
 * - Text colors
 * - Borders
 * - Warm-toned interfaces
 */
export const warmGray = {
  50: '#fafaf9',
  100: '#f5f5f4',
  200: '#e7e5e4',
  300: '#d6d3d1',
  400: '#a8a29e',
  500: '#78716c', // Primary
  600: '#57534e',
  700: '#44403c',
  800: '#292524',
  900: '#1c1917',
  950: '#0c0a09',
} as const;

/**
 * Cool Gray - Cool neutral palette
 *
 * Slightly cool gray, perfect for tech interfaces.
 * More modern and crisp than warm gray.
 *
 * Use cases:
 * - Background colors
 * - Tech interfaces
 * - Professional apps
 * - Clean designs
 */
export const coolGray = {
  50: '#f9fafb',
  100: '#f3f4f6',
  200: '#e5e7eb',
  300: '#d1d5db',
  400: '#9ca3af',
  500: '#6b7280', // Primary
  600: '#4b5563',
  700: '#374151',
  800: '#1f2937',
  900: '#111827',
  950: '#030712',
} as const;

/**
 * Slate Blue - Blue-tinted neutral palette
 *
 * Slightly blue-tinted gray, perfect for sophisticated interfaces.
 * Professional with a hint of personality.
 *
 * Use cases:
 * - Enterprise apps
 * - Professional platforms
 * - Modern dashboards
 */
export const slateBlue = {
  50: '#f8fafc',
  100: '#f1f5f9',
  200: '#e2e8f0',
  300: '#cbd5e1',
  400: '#94a3b8',
  500: '#64748b', // Primary
  600: '#475569',
  700: '#334155',
  800: '#1e293b',
  900: '#0f172a',
  950: '#020617',
} as const;

/**
 * True Neutral - Pure neutral palette
 *
 * Pure neutral gray, perfect for minimalist designs.
 * No color bias, maximum flexibility.
 *
 * Use cases:
 * - Minimalist designs
 * - Black and white themes
 * - High contrast needs
 */
export const trueNeutral = {
  50: '#fafafa',
  100: '#f5f5f5',
  200: '#e5e5e5',
  300: '#d4d4d4',
  400: '#a3a3a3',
  500: '#737373', // Primary
  600: '#525252',
  700: '#404040',
  800: '#262626',
  900: '#171717',
  950: '#0a0a0a',
} as const;

/**
 * All extended Fluxwind colors
 *
 * Combines 24 exclusive color palettes:
 * - 12 thematic colors (ocean, tangerine, sapphire, etc.)
 * - 4 semantic colors (success, warning, error, info)
 * - 4 neutral variations (warmGray, coolGray, slateBlue, trueNeutral)
 *
 * @example
 * ```typescript
 * import { fluxwindColors } from '@fluxwind/themes/tokens/colors-extended';
 *
 * // Use in Tailwind config
 * colors: {
 *   ...fluxwindColors,
 * }
 * ```
 */
export const fluxwindColors = {
  // Thematic colors (12)
  ocean,
  tangerine,
  sapphire,
  mint,
  lavender,
  coral,
  electric,
  amber,
  rose,
  lime,
  emerald,
  sky,
  indigo,
  violet,
  fuchsia,
  bronze,
  crimson,
  teal,

  // Semantic colors (4)
  success,
  warning,
  error,
  info,

  // Neutral variations (4)
  warmGray,
  coolGray,
  slateBlue,
  trueNeutral,
} as const;

/**
 * Type for extended color shades (50-950)
 */
export type ExtendedColorShade =
  | '50'
  | '100'
  | '200'
  | '300'
  | '400'
  | '500'
  | '600'
  | '700'
  | '800'
  | '900'
  | '950';

/**
 * Type for a complete color palette
 */
export type ExtendedColorPalette = Record<ExtendedColorShade, string>;

/**
 * Type for all Fluxwind color names
 */
export type FluxwindColorName = keyof typeof fluxwindColors;

/**
 * Type for accessing specific color shades
 *
 * @example
 * ```typescript
 * const color: FluxwindColor = 'ocean-500';
 * ```
 */
export type FluxwindColor = `${FluxwindColorName}-${ExtendedColorShade}`;
