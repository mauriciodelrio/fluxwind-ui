import type { ThemePreset } from '@/types/theme.types.js';

/**
 * Blogging Theme
 *
 * Warm editorial theme with terracotta and olive tones. Designed for
 * blogging platforms, content sites, and editorial applications.
 * Promotes reading and engagement.
 *
 * @category Creative
 * @wcag AA
 */
export const bloggingTheme: ThemePreset = {
  name: 'blogging',
  label: 'Blogging',
  description:
    'Warm editorial theme with terracotta and olive tones. Perfect for blogging platforms, content sites, and editorial applications.',
  category: 'creative',
  industry: ['blogging', 'magazine', 'news'],
  extends: 'sepia',
  previewColor: '#ea580c',
  author: 'Fluxwind UI Team',
  version: '1.0.0',
  variables: {
    // ========================================
    // PRIMARY COLORS - Warm terracotta
    // ========================================
    '--fw-color-primary': '#ea580c', // Orange 600
    '--fw-color-primary-hover': '#c2410c', // Orange 700
    '--fw-color-primary-active': '#9a3412', // Orange 800
    '--fw-color-primary-light': '#f97316', // Orange 500
    '--fw-color-primary-dark': '#7c2d12', // Orange 900

    // ========================================
    // SECONDARY COLORS - Natural olive
    // ========================================
    '--fw-color-secondary': '#84cc16', // Lime 500
    '--fw-color-secondary-hover': '#65a30d', // Lime 600
    '--fw-color-secondary-active': '#4d7c0f', // Lime 700

    // ========================================
    // SEMANTIC COLORS - Editorial context
    // ========================================
    '--fw-color-success': '#22c55e', // Green 500
    '--fw-color-success-hover': '#16a34a',
    '--fw-color-warning': '#f59e0b', // Amber 500
    '--fw-color-warning-hover': '#d97706',
    '--fw-color-error': '#dc2626', // Red 600
    '--fw-color-error-hover': '#b91c1c',
    '--fw-color-info': '#ea580c', // Orange 600
    '--fw-color-info-hover': '#c2410c',

    // ========================================
    // BACKGROUND - Warm paper tones
    // ========================================
    '--fw-color-bg-primary': '#fef3c7', // Amber 100
    '--fw-color-bg-secondary': '#fef9c3', // Yellow 100
    '--fw-color-bg-tertiary': '#fef08a', // Yellow 200

    // ========================================
    // TEXT - Rich editorial
    // ========================================
    '--fw-color-text-primary': '#78350f', // Amber 900
    '--fw-color-text-secondary': '#92400e', // Amber 800
    '--fw-color-text-tertiary': '#b45309', // Amber 700

    // ========================================
    // BORDERS - Subtle editorial lines
    // ========================================
    '--fw-color-border-primary': '#fde68a', // Yellow 300
    '--fw-color-border-secondary': '#fef08a', // Yellow 200
    '--fw-color-border-focus': '#ea580c', // Orange 600
    '--fw-color-border-error': '#dc2626', // Red 600

    // ========================================
    // TYPOGRAPHY - Editorial focus
    // ========================================
    '--fw-line-height-normal': '1.75',
    '--fw-line-height-relaxed': '2',

    // ========================================
    // SHADOWS - Soft paper depth
    // ========================================
    '--fw-shadow-sm': '0 1px 2px 0 rgba(120, 53, 15, 0.05)',
    '--fw-shadow-base': '0 1px 3px 0 rgba(120, 53, 15, 0.08)',
    '--fw-shadow-md': '0 4px 6px -1px rgba(120, 53, 15, 0.08)',
    '--fw-shadow-lg': '0 10px 15px -3px rgba(120, 53, 15, 0.08)',

    // ========================================
    // COMPONENTS - Editorial interface
    // ========================================

    // Button - Subtle editorial action
    '--fw-button-bg': '#ea580c',
    '--fw-button-color': '#ffffff',
    '--fw-button-bg-hover': '#c2410c',

    // Input - Warm editorial forms
    '--fw-input-bg': '#fefce8', // Yellow 50
    '--fw-input-border': '1px solid #fde68a',
    '--fw-input-color': '#78350f',
    '--fw-input-border-focus': '1px solid #ea580c',
  },
};
