import type { ThemePreset } from '@/types/theme.types.js';

/**
 * Wellness Theme
 *
 * Calming natural theme with sage green and lavender tones. Perfect for
 * mental health applications, wellness platforms, and holistic health services.
 * Promotes relaxation and mindfulness.
 *
 * @category Healthcare
 * @wcag AA
 */
export const wellnessTheme: ThemePreset = {
  name: 'wellness',
  label: 'Wellness',
  description:
    'Calming natural theme with sage green and lavender tones. Ideal for mental health apps, wellness platforms, and holistic health services.',
  category: 'healthcare',
  industry: ['wellness', 'mental-health', 'fitness', 'nutrition'],
  extends: 'light',
  previewColor: '#84cc16',
  author: 'Fluxwind UI Team',
  version: '1.0.0',
  variables: {
    // ========================================
    // PRIMARY COLORS - Sage green
    // ========================================
    '--fw-color-primary': '#84cc16', // Lime 500
    '--fw-color-primary-hover': '#65a30d', // Lime 600
    '--fw-color-primary-active': '#4d7c0f', // Lime 700
    '--fw-color-primary-light': '#bef264', // Lime 300
    '--fw-color-primary-dark': '#3f6212', // Lime 800

    // ========================================
    // SECONDARY COLORS - Soft lavender
    // ========================================
    '--fw-color-secondary': '#a78bfa', // Violet 400
    '--fw-color-secondary-hover': '#8b5cf6', // Violet 500
    '--fw-color-secondary-active': '#7c3aed', // Violet 600

    // ========================================
    // SEMANTIC COLORS - Natural wellness
    // ========================================
    '--fw-color-success': '#22c55e', // Green 500 - Growth
    '--fw-color-success-hover': '#16a34a',
    '--fw-color-warning': '#fbbf24', // Amber 400 - Gentle caution
    '--fw-color-warning-hover': '#f59e0b',
    '--fw-color-error': '#f87171', // Red 400 - Soft alert
    '--fw-color-error-hover': '#ef4444',
    '--fw-color-info': '#a78bfa', // Violet 400 - Mindful info
    '--fw-color-info-hover': '#8b5cf6',

    // ========================================
    // BACKGROUND - Organic and calming
    // ========================================
    '--fw-color-bg-primary': '#fafaf9', // Stone 50
    '--fw-color-bg-secondary': '#f5f5f4', // Stone 100
    '--fw-color-bg-tertiary': '#e7e5e4', // Stone 200

    // ========================================
    // TEXT - Natural and readable
    // ========================================
    '--fw-color-text-primary': '#1c1917', // Stone 900
    '--fw-color-text-secondary': '#57534e', // Stone 600
    '--fw-color-text-tertiary': '#78716c', // Stone 500

    // ========================================
    // BORDERS - Organic edges
    // ========================================
    '--fw-color-border-primary': '#d6d3d1', // Stone 300
    '--fw-color-border-secondary': '#e7e5e4', // Stone 200
    '--fw-color-border-focus': '#84cc16', // Lime 500
    '--fw-color-border-error': '#f87171', // Red 400

    // ========================================
    // BORDER RADIUS - Soft and organic
    // ========================================
    '--fw-radius-base': '0.75rem',
    '--fw-radius-md': '1rem',
    '--fw-radius-lg': '1.25rem',

    // ========================================
    // SHADOWS - Gentle and natural
    // ========================================
    '--fw-shadow-sm': '0 1px 2px 0 rgba(28, 25, 23, 0.04)',
    '--fw-shadow-base': '0 1px 3px 0 rgba(28, 25, 23, 0.08)',
    '--fw-shadow-md': '0 4px 6px -1px rgba(28, 25, 23, 0.08)',
    '--fw-shadow-lg': '0 10px 15px -3px rgba(28, 25, 23, 0.08)',

    // ========================================
    // COMPONENTS - Natural wellness UI
    // ========================================

    // Button - Calming action
    '--fw-button-bg': '#84cc16',
    '--fw-button-color': '#ffffff',
    '--fw-button-bg-hover': '#65a30d',
    '--fw-button-border-radius': '0.75rem',

    // Input - Organic forms
    '--fw-input-bg': '#ffffff',
    '--fw-input-border': '1px solid #d6d3d1',
    '--fw-input-border-focus': '1px solid #84cc16',
    '--fw-input-border-radius': '0.75rem',
  },
};
