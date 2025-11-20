import type { ThemePreset } from '@/types/theme.types.js';

/**
 * Creative Theme
 *
 * Bold creative theme with purple gradients and cyan accents. Designed for
 * design agencies, creative portfolios, and artistic platforms.
 * Inspires creativity and self-expression.
 *
 * @category Creative
 * @wcag AA
 */
export const creativeTheme: ThemePreset = {
  name: 'creative',
  label: 'Creative',
  description:
    'Bold creative theme with purple gradients and cyan accents. Perfect for design agencies, creative portfolios, and artistic platforms.',
  category: 'creative',
  industry: ['creative', 'design', 'portfolio'],
  extends: 'dark',
  previewColor: '#a855f7',
  author: 'Fluxwind UI Team',
  version: '1.0.0',
  variables: {
    // ========================================
    // PRIMARY COLORS - Bold purple
    // ========================================
    '--fw-color-primary': '#a855f7', // Purple 500
    '--fw-color-primary-hover': '#9333ea', // Purple 600
    '--fw-color-primary-active': '#7e22ce', // Purple 700
    '--fw-color-primary-light': '#c084fc', // Purple 400
    '--fw-color-primary-dark': '#6b21a8', // Purple 800

    // ========================================
    // SECONDARY COLORS - Electric cyan
    // ========================================
    '--fw-color-secondary': '#06b6d4', // Cyan 500
    '--fw-color-secondary-hover': '#0891b2', // Cyan 600
    '--fw-color-secondary-active': '#0e7490', // Cyan 700

    // ========================================
    // SEMANTIC COLORS - Creative context
    // ========================================
    '--fw-color-success': '#10b981', // Emerald 500
    '--fw-color-success-hover': '#059669',
    '--fw-color-warning': '#f59e0b', // Amber 500
    '--fw-color-warning-hover': '#d97706',
    '--fw-color-error': '#ef4444', // Red 500
    '--fw-color-error-hover': '#dc2626',
    '--fw-color-info': '#06b6d4', // Cyan 500
    '--fw-color-info-hover': '#0891b2',

    // ========================================
    // BACKGROUND - Creative dark
    // ========================================
    '--fw-color-bg-primary': '#18181b', // Zinc 900
    '--fw-color-bg-secondary': '#27272a', // Zinc 800
    '--fw-color-bg-tertiary': '#3f3f46', // Zinc 700
    '--fw-color-bg-inverse': '#ffffff',

    // ========================================
    // TEXT - Bold contrast
    // ========================================
    '--fw-color-text-primary': '#fafafa', // Neutral 50
    '--fw-color-text-secondary': '#d4d4d4', // Neutral 300
    '--fw-color-text-tertiary': '#a3a3a3', // Neutral 400
    '--fw-color-text-inverse': '#18181b',

    // ========================================
    // BORDERS - Creative accents
    // ========================================
    '--fw-color-border-primary': '#52525b', // Zinc 600
    '--fw-color-border-secondary': '#3f3f46', // Zinc 700
    '--fw-color-border-focus': '#a855f7', // Purple 500
    '--fw-color-border-error': '#ef4444', // Red 500

    // ========================================
    // BORDER RADIUS - Creative curves
    // ========================================
    '--fw-radius-base': '1rem',
    '--fw-radius-md': '1.25rem',
    '--fw-radius-lg': '1.5rem',
    '--fw-radius-xl': '2rem',

    // ========================================
    // SHADOWS - Vibrant glow
    // ========================================
    '--fw-shadow-sm': '0 1px 2px 0 rgba(168, 85, 247, 0.1)',
    '--fw-shadow-base': '0 1px 3px 0 rgba(168, 85, 247, 0.2)',
    '--fw-shadow-md': '0 4px 6px -1px rgba(168, 85, 247, 0.25)',
    '--fw-shadow-lg': '0 10px 15px -3px rgba(168, 85, 247, 0.3)',
    '--fw-shadow-xl': '0 20px 25px -5px rgba(168, 85, 247, 0.35)',
    '--fw-shadow-focus': '0 0 0 3px rgba(168, 85, 247, 0.4)',

    // ========================================
    // COMPONENTS - Creative interface
    // ========================================

    // Button - Bold creative action
    '--fw-button-bg': '#a855f7',
    '--fw-button-color': '#ffffff',
    '--fw-button-bg-hover': '#9333ea',
    '--fw-button-border-radius': '1rem',
    '--fw-button-shadow-hover': '0 8px 16px 0 rgba(168, 85, 247, 0.4)',

    // Input - Creative forms
    '--fw-input-bg': '#27272a',
    '--fw-input-border': '1px solid #52525b',
    '--fw-input-color': '#fafafa',
    '--fw-input-border-focus': '1px solid #a855f7',
    '--fw-input-border-radius': '1rem',
  },
};
