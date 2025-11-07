/**
 * TypeScript type definitions for CSS Variables
 *
 * These types provide intellisense and type safety when working with
 * Fluxwind CSS custom properties in TypeScript/JavaScript.
 */

/**
 * CSS Variable categories
 */
export type CSSVariableCategory =
  | 'color'
  | 'spacing'
  | 'typography'
  | 'animation'
  | 'border'
  | 'shadow'
  | 'zIndex'
  | 'size'
  | 'opacity';

/**
 * All available CSS variable names in the design system
 */
export type FluxwindCSSVariable =
  // Colors
  | '--fw-color-primary'
  | '--fw-color-primary-hover'
  | '--fw-color-primary-active'
  | '--fw-color-primary-light'
  | '--fw-color-primary-dark'
  | '--fw-color-secondary'
  | '--fw-color-secondary-hover'
  | '--fw-color-secondary-active'
  | '--fw-color-success'
  | '--fw-color-success-hover'
  | '--fw-color-warning'
  | '--fw-color-warning-hover'
  | '--fw-color-error'
  | '--fw-color-error-hover'
  | '--fw-color-info'
  | '--fw-color-info-hover'
  | '--fw-color-white'
  | '--fw-color-black'
  | '--fw-color-gray-50'
  | '--fw-color-gray-100'
  | '--fw-color-gray-200'
  | '--fw-color-gray-300'
  | '--fw-color-gray-400'
  | '--fw-color-gray-500'
  | '--fw-color-gray-600'
  | '--fw-color-gray-700'
  | '--fw-color-gray-800'
  | '--fw-color-gray-900'
  | '--fw-color-bg-primary'
  | '--fw-color-bg-secondary'
  | '--fw-color-bg-tertiary'
  | '--fw-color-bg-inverse'
  | '--fw-color-text-primary'
  | '--fw-color-text-secondary'
  | '--fw-color-text-tertiary'
  | '--fw-color-text-inverse'
  | '--fw-color-text-disabled'
  | '--fw-color-border-primary'
  | '--fw-color-border-secondary'
  | '--fw-color-border-focus'
  | '--fw-color-border-error'
  // Spacing
  | '--fw-spacing-0'
  | '--fw-spacing-1'
  | '--fw-spacing-2'
  | '--fw-spacing-3'
  | '--fw-spacing-4'
  | '--fw-spacing-5'
  | '--fw-spacing-6'
  | '--fw-spacing-8'
  | '--fw-spacing-10'
  | '--fw-spacing-12'
  | '--fw-spacing-16'
  | '--fw-spacing-20'
  | '--fw-spacing-24'
  | '--fw-spacing-component-gap'
  | '--fw-spacing-component-padding-x'
  | '--fw-spacing-component-padding-y'
  | '--fw-spacing-section-gap'
  // Typography
  | '--fw-font-sans'
  | '--fw-font-mono'
  | '--fw-font-size-xs'
  | '--fw-font-size-sm'
  | '--fw-font-size-base'
  | '--fw-font-size-lg'
  | '--fw-font-size-xl'
  | '--fw-font-size-2xl'
  | '--fw-font-size-3xl'
  | '--fw-font-size-4xl'
  | '--fw-font-weight-light'
  | '--fw-font-weight-normal'
  | '--fw-font-weight-medium'
  | '--fw-font-weight-semibold'
  | '--fw-font-weight-bold'
  | '--fw-line-height-tight'
  | '--fw-line-height-normal'
  | '--fw-line-height-relaxed'
  // Animation
  | '--fw-duration-instant'
  | '--fw-duration-fast'
  | '--fw-duration-base'
  | '--fw-duration-moderate'
  | '--fw-duration-slow'
  | '--fw-easing-standard'
  | '--fw-easing-decelerate'
  | '--fw-easing-accelerate'
  | '--fw-transition-base'
  | '--fw-transition-fast'
  | '--fw-transition-color'
  | '--fw-transition-transform'
  // Border
  | '--fw-radius-none'
  | '--fw-radius-sm'
  | '--fw-radius-base'
  | '--fw-radius-md'
  | '--fw-radius-lg'
  | '--fw-radius-xl'
  | '--fw-radius-2xl'
  | '--fw-radius-full'
  | '--fw-border-width-0'
  | '--fw-border-width-1'
  | '--fw-border-width-2'
  | '--fw-border-width-4'
  | '--fw-border-width-8'
  | '--fw-border-base'
  // Shadow
  | '--fw-shadow-xs'
  | '--fw-shadow-sm'
  | '--fw-shadow-base'
  | '--fw-shadow-md'
  | '--fw-shadow-lg'
  | '--fw-shadow-xl'
  | '--fw-shadow-inner'
  | '--fw-shadow-none'
  | '--fw-shadow-focus'
  | '--fw-shadow-focus-error'
  // Z-Index
  | '--fw-z-base'
  | '--fw-z-dropdown'
  | '--fw-z-sticky'
  | '--fw-z-fixed'
  | '--fw-z-modal-backdrop'
  | '--fw-z-modal'
  | '--fw-z-popover'
  | '--fw-z-tooltip'
  | '--fw-z-toast'
  | '--fw-z-max'
  // Size
  | '--fw-size-icon-xs'
  | '--fw-size-icon-sm'
  | '--fw-size-icon-base'
  | '--fw-size-icon-lg'
  | '--fw-size-icon-xl'
  | '--fw-container-sm'
  | '--fw-container-md'
  | '--fw-container-lg'
  | '--fw-container-xl'
  | '--fw-container-2xl'
  // Opacity
  | '--fw-opacity-0'
  | '--fw-opacity-5'
  | '--fw-opacity-10'
  | '--fw-opacity-20'
  | '--fw-opacity-25'
  | '--fw-opacity-30'
  | '--fw-opacity-40'
  | '--fw-opacity-50'
  | '--fw-opacity-60'
  | '--fw-opacity-70'
  | '--fw-opacity-75'
  | '--fw-opacity-80'
  | '--fw-opacity-90'
  | '--fw-opacity-95'
  | '--fw-opacity-100'
  | '--fw-opacity-disabled'
  | '--fw-opacity-hover'
  | '--fw-opacity-overlay';

/**
 * Helper type for CSS variable values
 */
export type CSSVariableValue = string;

/**
 * Map of CSS variables organized by category
 */
export interface CSSVariableMap {
  color: Record<string, CSSVariableValue>;
  spacing: Record<string, CSSVariableValue>;
  typography: Record<string, CSSVariableValue>;
  animation: Record<string, CSSVariableValue>;
  border: Record<string, CSSVariableValue>;
  shadow: Record<string, CSSVariableValue>;
  zIndex: Record<string, CSSVariableValue>;
  size: Record<string, CSSVariableValue>;
  opacity: Record<string, CSSVariableValue>;
}

/**
 * Utility function type for getting CSS variable value
 *
 * @example
 * ```ts
 * const primaryColor = getCSSVariable('--fw-color-primary');
 * ```
 */
export type GetCSSVariable = (variableName: FluxwindCSSVariable) => CSSVariableValue;

/**
 * Utility function type for setting CSS variable value
 *
 * @example
 * ```ts
 * setCSSVariable('--fw-color-primary', '#ff0000');
 * ```
 */
export type SetCSSVariable = (variableName: FluxwindCSSVariable, value: CSSVariableValue) => void;
