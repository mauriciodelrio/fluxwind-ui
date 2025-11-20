import type { ThemePreset } from '@/types/theme.types.js';

/**
 * Fintech Theme
 *
 * Vibrant fintech theme with neon green and purple gradients. Designed for
 * modern financial technology platforms, crypto exchanges, and payment apps.
 * Conveys innovation and disruption.
 *
 * @category Finance
 * @wcag AA
 */
export const fintechTheme: ThemePreset = {
  name: 'fintech',
  label: 'Fintech',
  description:
    'Vibrant fintech theme with neon green and purple. Perfect for modern fintech platforms, crypto exchanges, and payment applications.',
  category: 'finance',
  industry: ['fintech', 'crypto', 'payment'],
  extends: 'dark',
  previewColor: '#10b981',
  author: 'Fluxwind UI Team',
  version: '1.0.0',
  variables: {
    // ========================================
    // PRIMARY COLORS - Neon green
    // ========================================
    '--fw-color-primary': '#10b981', // Emerald 500
    '--fw-color-primary-hover': '#059669', // Emerald 600
    '--fw-color-primary-active': '#047857', // Emerald 700
    '--fw-color-primary-light': '#34d399', // Emerald 400
    '--fw-color-primary-dark': '#065f46', // Emerald 800

    // ========================================
    // SECONDARY COLORS - Tech purple
    // ========================================
    '--fw-color-secondary': '#8b5cf6', // Violet 500
    '--fw-color-secondary-hover': '#7c3aed', // Violet 600
    '--fw-color-secondary-active': '#6d28d9', // Violet 700

    // ========================================
    // SEMANTIC COLORS - Fintech context
    // ========================================
    '--fw-color-success': '#10b981', // Emerald 500 - Gain
    '--fw-color-success-hover': '#059669',
    '--fw-color-warning': '#fbbf24', // Amber 400 - Warning
    '--fw-color-warning-hover': '#f59e0b',
    '--fw-color-error': '#f87171', // Red 400 - Loss
    '--fw-color-error-hover': '#ef4444',
    '--fw-color-info': '#8b5cf6', // Violet 500 - Info
    '--fw-color-info-hover': '#7c3aed',

    // ========================================
    // BACKGROUND - Dark fintech
    // ========================================
    '--fw-color-bg-primary': '#0f172a', // Slate 900
    '--fw-color-bg-secondary': '#1e293b', // Slate 800
    '--fw-color-bg-tertiary': '#334155', // Slate 700

    // ========================================
    // TEXT - High contrast on dark
    // ========================================
    '--fw-color-text-primary': '#f8fafc', // Slate 50
    '--fw-color-text-secondary': '#cbd5e1', // Slate 300
    '--fw-color-text-tertiary': '#94a3b8', // Slate 400
    '--fw-color-text-inverse': '#0f172a', // Slate 900

    // ========================================
    // BORDERS - Neon accents
    // ========================================
    '--fw-color-border-primary': '#475569', // Slate 600
    '--fw-color-border-secondary': '#334155', // Slate 700
    '--fw-color-border-focus': '#10b981', // Emerald 500
    '--fw-color-border-error': '#f87171', // Red 400

    // ========================================
    // SHADOWS - Neon glow effects
    // ========================================
    '--fw-shadow-sm': '0 1px 2px 0 rgba(16, 185, 129, 0.1)',
    '--fw-shadow-base': '0 1px 3px 0 rgba(16, 185, 129, 0.2)',
    '--fw-shadow-md': '0 4px 6px -1px rgba(16, 185, 129, 0.2)',
    '--fw-shadow-lg': '0 10px 15px -3px rgba(16, 185, 129, 0.25)',
    '--fw-shadow-xl': '0 20px 25px -5px rgba(16, 185, 129, 0.3)',
    '--fw-shadow-focus': '0 0 0 3px rgba(16, 185, 129, 0.4)',

    // ========================================
    // COMPONENTS - Fintech interface
    // ========================================

    // Button - Vibrant action
    '--fw-button-bg': '#10b981',
    '--fw-button-color': '#0f172a',
    '--fw-button-bg-hover': '#059669',
    '--fw-button-shadow-hover': '0 4px 12px 0 rgba(16, 185, 129, 0.4)',

    // Input - Dark with neon focus
    '--fw-input-bg': '#1e293b',
    '--fw-input-border': '1px solid #475569',
    '--fw-input-color': '#f8fafc',
    '--fw-input-border-focus': '1px solid #10b981',
  },
};
