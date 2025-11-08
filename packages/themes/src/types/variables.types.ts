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
  | 'opacity'
  | 'component';

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
 * Component-specific CSS variable names
 */
export type ComponentCSSVariable =
  // Button
  | '--fw-button-bg'
  | '--fw-button-color'
  | '--fw-button-border'
  | '--fw-button-border-width'
  | '--fw-button-border-radius'
  | '--fw-button-padding-x'
  | '--fw-button-padding-y'
  | '--fw-button-font-size'
  | '--fw-button-font-weight'
  | '--fw-button-line-height'
  | '--fw-button-shadow'
  | '--fw-button-transition'
  | '--fw-button-bg-hover'
  | '--fw-button-color-hover'
  | '--fw-button-border-hover'
  | '--fw-button-shadow-hover'
  | '--fw-button-scale-hover'
  | '--fw-button-bg-active'
  | '--fw-button-color-active'
  | '--fw-button-border-active'
  | '--fw-button-shadow-active'
  | '--fw-button-scale-active'
  | '--fw-button-outline-focus'
  | '--fw-button-outline-offset-focus'
  | '--fw-button-bg-disabled'
  | '--fw-button-color-disabled'
  | '--fw-button-border-disabled'
  | '--fw-button-opacity-disabled'
  | '--fw-button-cursor-disabled'
  | '--fw-button-opacity-loading'
  | '--fw-button-cursor-loading'
  // Input
  | '--fw-input-bg'
  | '--fw-input-color'
  | '--fw-input-border'
  | '--fw-input-border-width'
  | '--fw-input-border-radius'
  | '--fw-input-padding-x'
  | '--fw-input-padding-y'
  | '--fw-input-font-size'
  | '--fw-input-font-weight'
  | '--fw-input-line-height'
  | '--fw-input-shadow'
  | '--fw-input-transition'
  | '--fw-input-placeholder-color'
  | '--fw-input-border-hover'
  | '--fw-input-shadow-hover'
  | '--fw-input-border-focus'
  | '--fw-input-outline-focus'
  | '--fw-input-outline-offset-focus'
  | '--fw-input-shadow-focus'
  | '--fw-input-bg-disabled'
  | '--fw-input-color-disabled'
  | '--fw-input-border-disabled'
  | '--fw-input-cursor-disabled'
  | '--fw-input-opacity-disabled'
  | '--fw-input-border-error'
  | '--fw-input-outline-error'
  | '--fw-input-color-error'
  | '--fw-input-border-success'
  | '--fw-input-outline-success'
  | '--fw-input-color-success'
  // Select
  | '--fw-select-bg'
  | '--fw-select-color'
  | '--fw-select-border'
  | '--fw-select-border-width'
  | '--fw-select-border-radius'
  | '--fw-select-padding-x'
  | '--fw-select-padding-y'
  | '--fw-select-font-size'
  | '--fw-select-shadow'
  | '--fw-select-transition'
  | '--fw-select-icon-color'
  | '--fw-select-icon-size'
  | '--fw-select-icon-spacing'
  | '--fw-select-border-hover'
  | '--fw-select-shadow-hover'
  | '--fw-select-border-focus'
  | '--fw-select-outline-focus'
  | '--fw-select-shadow-focus'
  | '--fw-select-bg-disabled'
  | '--fw-select-color-disabled'
  | '--fw-select-border-disabled'
  | '--fw-select-cursor-disabled'
  | '--fw-select-dropdown-bg'
  | '--fw-select-dropdown-border'
  | '--fw-select-dropdown-border-radius'
  | '--fw-select-dropdown-shadow'
  | '--fw-select-dropdown-max-height'
  | '--fw-select-option-padding-x'
  | '--fw-select-option-padding-y'
  | '--fw-select-option-hover-bg'
  | '--fw-select-option-selected-bg'
  | '--fw-select-option-selected-color'
  // Checkbox
  | '--fw-checkbox-size'
  | '--fw-checkbox-bg'
  | '--fw-checkbox-border'
  | '--fw-checkbox-border-width'
  | '--fw-checkbox-border-radius'
  | '--fw-checkbox-transition'
  | '--fw-checkbox-shadow'
  | '--fw-checkbox-check-color'
  | '--fw-checkbox-check-size'
  | '--fw-checkbox-check-stroke-width'
  | '--fw-checkbox-border-hover'
  | '--fw-checkbox-shadow-hover'
  | '--fw-checkbox-bg-checked'
  | '--fw-checkbox-border-checked'
  | '--fw-checkbox-outline-focus'
  | '--fw-checkbox-outline-offset-focus'
  | '--fw-checkbox-bg-disabled'
  | '--fw-checkbox-border-disabled'
  | '--fw-checkbox-cursor-disabled'
  | '--fw-checkbox-opacity-disabled'
  | '--fw-checkbox-bg-indeterminate'
  | '--fw-checkbox-border-indeterminate'
  | '--fw-checkbox-icon-indeterminate'
  // Radio
  | '--fw-radio-size'
  | '--fw-radio-bg'
  | '--fw-radio-border'
  | '--fw-radio-border-width'
  | '--fw-radio-border-radius'
  | '--fw-radio-transition'
  | '--fw-radio-shadow'
  | '--fw-radio-dot-size'
  | '--fw-radio-dot-color'
  | '--fw-radio-border-hover'
  | '--fw-radio-shadow-hover'
  | '--fw-radio-bg-checked'
  | '--fw-radio-border-checked'
  | '--fw-radio-outline-focus'
  | '--fw-radio-outline-offset-focus'
  | '--fw-radio-bg-disabled'
  | '--fw-radio-border-disabled'
  | '--fw-radio-cursor-disabled'
  | '--fw-radio-opacity-disabled'
  // Switch
  | '--fw-switch-track-width'
  | '--fw-switch-track-height'
  | '--fw-switch-track-bg'
  | '--fw-switch-track-border-radius'
  | '--fw-switch-track-transition'
  | '--fw-switch-track-shadow'
  | '--fw-switch-track-bg-checked'
  | '--fw-switch-track-bg-hover'
  | '--fw-switch-track-bg-checked-hover'
  | '--fw-switch-thumb-size'
  | '--fw-switch-thumb-bg'
  | '--fw-switch-thumb-shadow'
  | '--fw-switch-thumb-transition'
  | '--fw-switch-thumb-offset'
  | '--fw-switch-thumb-translate-checked'
  | '--fw-switch-outline-focus'
  | '--fw-switch-outline-offset-focus'
  | '--fw-switch-track-bg-disabled'
  | '--fw-switch-thumb-bg-disabled'
  | '--fw-switch-cursor-disabled'
  | '--fw-switch-opacity-disabled'
  | '--fw-switch-opacity-loading'
  | '--fw-switch-cursor-loading';

/**
 * All CSS variables (base + component)
 */
export type AllCSSVariables = FluxwindCSSVariable | ComponentCSSVariable;

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
  component: Record<string, CSSVariableValue>;
}

/**
 * Component-specific variable map by component name
 */
export interface ComponentVariableMap {
  button: Record<string, CSSVariableValue>;
  input: Record<string, CSSVariableValue>;
  select: Record<string, CSSVariableValue>;
  checkbox: Record<string, CSSVariableValue>;
  radio: Record<string, CSSVariableValue>;
  switch: Record<string, CSSVariableValue>;
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

/**
 * Utility function type for getting component CSS variable value
 *
 * @example
 * ```ts
 * const buttonBg = getComponentVariable('--fw-button-bg');
 * ```
 */
export type GetComponentVariable = (variableName: ComponentCSSVariable) => CSSVariableValue;

/**
 * Utility function type for setting component CSS variable value
 *
 * @example
 * ```ts
 * setComponentVariable('--fw-button-bg', '#ff0000');
 * ```
 */
export type SetComponentVariable = (
  variableName: ComponentCSSVariable,
  value: CSSVariableValue
) => void;
