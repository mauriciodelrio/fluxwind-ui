/**
 * Utility functions for working with Fluxwind CSS Variables
 */

import type { FluxwindCSSVariable, CSSVariableValue } from './types/variables.types';

/**
 * Get the value of a CSS variable from the document root
 *
 * @param variableName - The CSS variable name (e.g., '--fw-color-primary')
 * @param element - Optional element to get the variable from (defaults to document.documentElement)
 * @returns The value of the CSS variable
 *
 * @example
 * ```ts
 * const primaryColor = getCSSVariable('--fw-color-primary');
 * console.log(primaryColor); // '#3b82f6'
 * ```
 */
export function getCSSVariable(
  variableName: FluxwindCSSVariable,
  element: HTMLElement = document.documentElement
): CSSVariableValue {
  return getComputedStyle(element).getPropertyValue(variableName).trim();
}

/**
 * Set the value of a CSS variable on the document root
 *
 * @param variableName - The CSS variable name (e.g., '--fw-color-primary')
 * @param value - The value to set
 * @param element - Optional element to set the variable on (defaults to document.documentElement)
 *
 * @example
 * ```ts
 * setCSSVariable('--fw-color-primary', '#ff0000');
 * ```
 */
export function setCSSVariable(
  variableName: FluxwindCSSVariable,
  value: CSSVariableValue,
  element: HTMLElement = document.documentElement
): void {
  element.style.setProperty(variableName, value);
}

/**
 * Remove a CSS variable from the document root
 *
 * @param variableName - The CSS variable name to remove
 * @param element - Optional element to remove the variable from (defaults to document.documentElement)
 *
 * @example
 * ```ts
 * removeCSSVariable('--fw-color-primary');
 * ```
 */
export function removeCSSVariable(
  variableName: FluxwindCSSVariable,
  element: HTMLElement = document.documentElement
): void {
  element.style.removeProperty(variableName);
}

/**
 * Get multiple CSS variables at once
 *
 * @param variableNames - Array of CSS variable names
 * @param element - Optional element to get the variables from
 * @returns Object mapping variable names to their values
 *
 * @example
 * ```ts
 * const colors = getCSSVariables([
 *   '--fw-color-primary',
 *   '--fw-color-secondary'
 * ]);
 * console.log(colors['--fw-color-primary']); // '#3b82f6'
 * ```
 */
export function getCSSVariables(
  variableNames: FluxwindCSSVariable[],
  element: HTMLElement = document.documentElement
): Record<FluxwindCSSVariable, CSSVariableValue> {
  const result = {} as Record<FluxwindCSSVariable, CSSVariableValue>;

  variableNames.forEach((name) => {
    result[name] = getCSSVariable(name, element);
  });

  return result;
}

/**
 * Set multiple CSS variables at once
 *
 * @param variables - Object mapping variable names to values
 * @param element - Optional element to set the variables on
 *
 * @example
 * ```ts
 * setCSSVariables({
 *   '--fw-color-primary': '#ff0000',
 *   '--fw-color-secondary': '#00ff00'
 * });
 * ```
 */
export function setCSSVariables(
  variables: Partial<Record<FluxwindCSSVariable, CSSVariableValue>>,
  element: HTMLElement = document.documentElement
): void {
  Object.entries(variables).forEach(([name, value]) => {
    if (value !== undefined) {
      setCSSVariable(name as FluxwindCSSVariable, value, element);
    }
  });
}

/**
 * Check if a CSS variable exists
 *
 * @param variableName - The CSS variable name to check
 * @param element - Optional element to check on
 * @returns True if the variable exists and has a value
 *
 * @example
 * ```ts
 * if (hasCSSVariable('--fw-color-primary')) {
 *   console.log('Primary color is defined');
 * }
 * ```
 */
export function hasCSSVariable(
  variableName: FluxwindCSSVariable,
  element: HTMLElement = document.documentElement
): boolean {
  const value = getCSSVariable(variableName, element);
  return value !== '';
}

/**
 * Get a CSS variable value with a fallback
 *
 * @param variableName - The CSS variable name
 * @param fallback - Fallback value if variable doesn't exist
 * @param element - Optional element to get the variable from
 * @returns The variable value or fallback
 *
 * @example
 * ```ts
 * const color = getCSSVariableWithFallback(
 *   '--fw-color-custom',
 *   '#3b82f6'
 * );
 * ```
 */
export function getCSSVariableWithFallback(
  variableName: FluxwindCSSVariable,
  fallback: CSSVariableValue,
  element: HTMLElement = document.documentElement
): CSSVariableValue {
  const value = getCSSVariable(variableName, element);
  return value || fallback;
}
