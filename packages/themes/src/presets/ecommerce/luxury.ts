import type { ThemePreset } from '@/types/theme.types.js';

/**
 * Luxury Theme
 *
 * Premium luxury theme with black and rose gold. Designed for high-end
 * retail, luxury brands, and premium e-commerce experiences.
 * Conveys exclusivity and sophistication.
 *
 * @category E-Commerce
 * @wcag AA
 */
export const luxuryTheme: ThemePreset = {
  name: 'luxury',
  label: 'Luxury',
  description:
    'Premium luxury theme with black and rose gold. Perfect for high-end retail, luxury brands, and premium e-commerce experiences.',
  category: 'ecommerce',
  industry: ['luxury', 'fashion', 'retail'],
  extends: 'dark',
  previewColor: '#fb923c',
  author: 'Fluxwind UI Team',
  version: '1.0.0',
  variables: {
    // ========================================
    // PRIMARY COLORS - Rose gold
    // ========================================
    '--fw-color-primary': '#fb923c', // Orange 400 (rose gold)
    '--fw-color-primary-hover': '#f97316', // Orange 500
    '--fw-color-primary-active': '#ea580c', // Orange 600
    '--fw-color-primary-light': '#fdba74', // Orange 300
    '--fw-color-primary-dark': '#c2410c', // Orange 700

    // ========================================
    // SECONDARY COLORS - Champagne gold
    // ========================================
    '--fw-color-secondary': '#fbbf24', // Amber 400
    '--fw-color-secondary-hover': '#f59e0b', // Amber 500
    '--fw-color-secondary-active': '#d97706', // Amber 600

    // ========================================
    // SEMANTIC COLORS - Luxury context
    // ========================================
    '--fw-color-success': '#34d399', // Emerald 400
    '--fw-color-success-hover': '#10b981',
    '--fw-color-warning': '#fbbf24', // Amber 400
    '--fw-color-warning-hover': '#f59e0b',
    '--fw-color-error': '#f87171', // Red 400
    '--fw-color-error-hover': '#ef4444',
    '--fw-color-info': '#fb923c', // Orange 400
    '--fw-color-info-hover': '#f97316',

    // ========================================
    // BACKGROUND - Rich blacks
    // ========================================
    '--fw-color-bg-primary': '#0f172a', // Slate 900
    '--fw-color-bg-secondary': '#1e293b', // Slate 800
    '--fw-color-bg-tertiary': '#334155', // Slate 700
    '--fw-color-bg-inverse': '#ffffff',

    // ========================================
    // TEXT - Elegant contrast
    // ========================================
    '--fw-color-text-primary': '#fafafa', // Neutral 50
    '--fw-color-text-secondary': '#d4d4d4', // Neutral 300
    '--fw-color-text-tertiary': '#a3a3a3', // Neutral 400
    '--fw-color-text-inverse': '#0f172a',

    // ========================================
    // BORDERS - Subtle luxury
    // ========================================
    '--fw-color-border-primary': '#475569', // Slate 600
    '--fw-color-border-secondary': '#334155', // Slate 700
    '--fw-color-border-focus': '#fb923c', // Orange 400 (rose gold)
    '--fw-color-border-error': '#f87171', // Red 400

    // ========================================
    // SHADOWS - Premium depth
    // ========================================
    '--fw-shadow-sm': '0 1px 2px 0 rgba(251, 146, 60, 0.1)',
    '--fw-shadow-base': '0 1px 3px 0 rgba(251, 146, 60, 0.2)',
    '--fw-shadow-md': '0 4px 6px -1px rgba(251, 146, 60, 0.25)',
    '--fw-shadow-lg': '0 10px 15px -3px rgba(251, 146, 60, 0.3)',
    '--fw-shadow-xl': '0 20px 25px -5px rgba(251, 146, 60, 0.35)',
    '--fw-shadow-focus': '0 0 0 3px rgba(251, 146, 60, 0.4)',

    // ========================================
    // COMPONENTS - Luxury interface
    // ========================================

    // Button - Premium CTA
    '--fw-button-bg': '#fb923c',
    '--fw-button-color': '#0f172a',
    '--fw-button-bg-hover': '#f97316',
    '--fw-button-border-radius': '0.375rem',
    '--fw-button-shadow-hover': '0 4px 12px 0 rgba(251, 146, 60, 0.5)',

    // Input - Elegant forms
    '--fw-input-bg': '#1e293b',
    '--fw-input-border': '1px solid #475569',
    '--fw-input-color': '#fafafa',
    '--fw-input-border-focus': '1px solid #fb923c',
    '--fw-input-border-radius': '0.375rem',
  },
};
