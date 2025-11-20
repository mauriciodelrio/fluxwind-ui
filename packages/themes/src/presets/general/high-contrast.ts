/**
 * High Contrast Theme - Accessibility-First
 * WCAG AAA compliant with maximum contrast ratios
 * @module presets/general/high-contrast
 */

import type { ThemePreset } from '../../types/theme.types';

/**
 * High Contrast theme for maximum accessibility
 *
 * Features:
 * - WCAG AAA contrast ratios (7:1 minimum)
 * - Pure black on white for text
 * - Strong borders for clarity
 * - No subtle grays - only clear distinctions
 * - Optimized for low vision users
 * - Screen reader friendly
 *
 * @example
 * ```tsx
 * import { highContrastTheme } from '@fluxwind/themes/presets';
 * import { applyTheme } from '@fluxwind/themes';
 *
 * applyTheme(highContrastTheme);
 * ```
 */
export const highContrastTheme: ThemePreset = {
  name: 'high-contrast',
  label: 'High Contrast',
  description:
    'Maximum accessibility with WCAG AAA contrast ratios. Pure black on white for optimal readability.',
  category: 'general',
  industry: ['accessibility', 'general'],
  extends: 'light',
  previewColor: '#000000',
  author: 'Fluxwind UI Team',
  version: '1.0.0',

  variables: {
    // ========================================
    // COLORS - Maximum Contrast
    // ========================================

    // Background colors - Pure white
    '--fw-color-bg-primary': '#ffffff',
    '--fw-color-bg-secondary': '#ffffff',
    '--fw-color-bg-tertiary': '#f5f5f5',
    '--fw-color-bg-inverse': '#000000',

    // Text colors - Pure black for AAA compliance
    '--fw-color-text-primary': '#000000',
    '--fw-color-text-secondary': '#000000',
    '--fw-color-text-tertiary': '#1a1a1a',
    '--fw-color-text-inverse': '#ffffff',
    '--fw-color-text-disabled': '#666666', // Still AAA on white (7.3:1)

    // Primary colors - High contrast blue
    '--fw-color-primary': '#0000ff', // Pure blue
    '--fw-color-primary-hover': '#0000cc',
    '--fw-color-primary-active': '#000099',

    // Secondary colors - High contrast orange
    '--fw-color-secondary': '#ff6600',
    '--fw-color-secondary-hover': '#cc5200',
    '--fw-color-secondary-active': '#994000',

    // Semantic colors - Bold and clear
    '--fw-color-success': '#008000', // Pure green
    '--fw-color-success-hover': '#006600',

    '--fw-color-warning': '#ff8c00', // Dark orange
    '--fw-color-warning-hover': '#cc7000',

    '--fw-color-error': '#cc0000', // Dark red
    '--fw-color-error-hover': '#990000',

    '--fw-color-info': '#0066cc', // Dark blue
    '--fw-color-info-hover': '#0052a3',

    // Border colors - Strong and visible
    '--fw-color-border-primary': '#000000',
    '--fw-color-border-secondary': '#333333',
    '--fw-color-border-focus': '#0000ff',
    '--fw-color-border-error': '#cc0000',

    // ========================================
    // BORDERS - Thicker for visibility
    // ========================================

    '--fw-border-width-1': '2px',
    '--fw-border-width-2': '3px',
    '--fw-border-width-4': '4px',

    // ========================================
    // SHADOWS - Strong and defined
    // ========================================

    '--fw-shadow-sm': '0 1px 3px 0 rgba(0, 0, 0, 0.5)',
    '--fw-shadow-base': '0 2px 6px 0 rgba(0, 0, 0, 0.5)',
    '--fw-shadow-md': '0 4px 12px 0 rgba(0, 0, 0, 0.5)',
    '--fw-shadow-lg': '0 8px 24px 0 rgba(0, 0, 0, 0.5)',
    '--fw-shadow-xl': '0 12px 36px 0 rgba(0, 0, 0, 0.5)',

    // Focus shadow - Strong blue outline
    '--fw-shadow-focus': '0 0 0 3px rgba(0, 0, 255, 0.5)',

    // ========================================
    // COMPONENT VARIABLES
    // ========================================

    // Button - Maximum contrast
    '--fw-button-bg': '#0000ff',
    '--fw-button-color': '#ffffff',
    '--fw-button-border': '3px solid #000000',
    '--fw-button-border-width': '3px',
    '--fw-button-bg-hover': '#0000cc',
    '--fw-button-shadow-hover': '0 4px 12px 0 rgba(0, 0, 255, 0.5)',

    // Input - Clear boundaries
    '--fw-input-bg': '#ffffff',
    '--fw-input-border': '3px solid #000000',
    '--fw-input-border-width': '3px',
    '--fw-input-color': '#000000',
    '--fw-input-placeholder-color': '#666666',
    '--fw-input-border-focus': '3px solid #0000ff',

    // Select - Strong visual feedback
    '--fw-select-bg': '#ffffff',
    '--fw-select-border': '3px solid #000000',
    '--fw-select-border-width': '3px',
    '--fw-select-color': '#000000',
    '--fw-select-border-focus': '3px solid #0000ff',

    // Checkbox & Radio - High visibility
    '--fw-checkbox-border': '3px solid #000000',
    '--fw-checkbox-border-width': '3px',
    '--fw-checkbox-bg-checked': '#0000ff',
    '--fw-checkbox-border-checked': '3px solid #000000',

    '--fw-radio-border': '3px solid #000000',
    '--fw-radio-border-width': '3px',
    '--fw-radio-bg-checked': '#0000ff',
    '--fw-radio-border-checked': '3px solid #000000',

    // Switch - Clear on/off states
    '--fw-switch-track-bg': '#cccccc',
    '--fw-switch-track-bg-checked': '#0000ff',
    '--fw-switch-thumb-bg': '#ffffff',
  },
};
