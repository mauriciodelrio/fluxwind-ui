/**
 * Utility functions for working with Fluxwind CSS Variables
 */

import type {
  FluxwindCSSVariable,
  ComponentCSSVariable,
  AllCSSVariables,
  CSSVariableValue,
} from './types/variables.types';

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

/* ========================================
   COMPONENT CSS VARIABLE UTILITIES
   ======================================== */

/**
 * Get the value of a component CSS variable from the document root
 *
 * @param variableName - The component CSS variable name (e.g., '--fw-button-bg')
 * @param element - Optional element to get the variable from (defaults to document.documentElement)
 * @returns The value of the CSS variable
 *
 * @example
 * ```ts
 * const buttonBg = getComponentVariable('--fw-button-bg');
 * console.log(buttonBg); // 'var(--fw-color-primary)'
 * ```
 */
export function getComponentVariable(
  variableName: ComponentCSSVariable,
  element: HTMLElement = document.documentElement
): CSSVariableValue {
  return getComputedStyle(element).getPropertyValue(variableName).trim();
}

/**
 * Set the value of a component CSS variable on the document root
 *
 * @param variableName - The component CSS variable name (e.g., '--fw-button-bg')
 * @param value - The value to set
 * @param element - Optional element to set the variable on (defaults to document.documentElement)
 *
 * @example
 * ```ts
 * setComponentVariable('--fw-button-bg', '#ff0000');
 * ```
 */
export function setComponentVariable(
  variableName: ComponentCSSVariable,
  value: CSSVariableValue,
  element: HTMLElement = document.documentElement
): void {
  element.style.setProperty(variableName, value);
}

/**
 * Remove a component CSS variable from the document root
 *
 * @param variableName - The component CSS variable name to remove
 * @param element - Optional element to remove the variable from (defaults to document.documentElement)
 *
 * @example
 * ```ts
 * removeComponentVariable('--fw-button-bg');
 * ```
 */
export function removeComponentVariable(
  variableName: ComponentCSSVariable,
  element: HTMLElement = document.documentElement
): void {
  element.style.removeProperty(variableName);
}

/**
 * Get multiple component CSS variables at once
 *
 * @param variableNames - Array of component CSS variable names
 * @param element - Optional element to get the variables from
 * @returns Object mapping variable names to their values
 *
 * @example
 * ```ts
 * const buttonVars = getComponentVariables([
 *   '--fw-button-bg',
 *   '--fw-button-color'
 * ]);
 * console.log(buttonVars['--fw-button-bg']); // 'var(--fw-color-primary)'
 * ```
 */
export function getComponentVariables(
  variableNames: ComponentCSSVariable[],
  element: HTMLElement = document.documentElement
): Record<ComponentCSSVariable, CSSVariableValue> {
  const result = {} as Record<ComponentCSSVariable, CSSVariableValue>;

  variableNames.forEach((name) => {
    result[name] = getComponentVariable(name, element);
  });

  return result;
}

/**
 * Set multiple component CSS variables at once
 *
 * @param variables - Object mapping component variable names to values
 * @param element - Optional element to set the variables on
 *
 * @example
 * ```ts
 * setComponentVariables({
 *   '--fw-button-bg': '#ff0000',
 *   '--fw-button-color': '#ffffff'
 * });
 * ```
 */
export function setComponentVariables(
  variables: Partial<Record<ComponentCSSVariable, CSSVariableValue>>,
  element: HTMLElement = document.documentElement
): void {
  Object.entries(variables).forEach(([name, value]) => {
    if (value !== undefined) {
      setComponentVariable(name as ComponentCSSVariable, value, element);
    }
  });
}

/**
 * Check if a component CSS variable exists
 *
 * @param variableName - The component CSS variable name to check
 * @param element - Optional element to check on
 * @returns True if the variable exists and has a value
 *
 * @example
 * ```ts
 * if (hasComponentVariable('--fw-button-bg')) {
 *   console.log('Button background is defined');
 * }
 * ```
 */
export function hasComponentVariable(
  variableName: ComponentCSSVariable,
  element: HTMLElement = document.documentElement
): boolean {
  const value = getComponentVariable(variableName, element);
  return value !== '';
}

/**
 * Get a component CSS variable value with a fallback
 *
 * @param variableName - The component CSS variable name
 * @param fallback - Fallback value if variable doesn't exist
 * @param element - Optional element to get the variable from
 * @returns The variable value or fallback
 *
 * @example
 * ```ts
 * const buttonBg = getComponentVariableWithFallback(
 *   '--fw-button-bg-custom',
 *   '#3b82f6'
 * );
 * ```
 */
export function getComponentVariableWithFallback(
  variableName: ComponentCSSVariable,
  fallback: CSSVariableValue,
  element: HTMLElement = document.documentElement
): CSSVariableValue {
  const value = getComponentVariable(variableName, element);
  return value || fallback;
}

/**
 * Universal CSS variable getter that works with both base and component variables
 *
 * @param variableName - Any CSS variable name (base or component)
 * @param element - Optional element to get the variable from
 * @returns The value of the CSS variable
 *
 * @example
 * ```ts
 * const primary = getVariable('--fw-color-primary');
 * const buttonBg = getVariable('--fw-button-bg');
 * ```
 */
export function getVariable(
  variableName: AllCSSVariables,
  element: HTMLElement = document.documentElement
): CSSVariableValue {
  return getComputedStyle(element).getPropertyValue(variableName).trim();
}

/**
 * Universal CSS variable setter that works with both base and component variables
 *
 * @param variableName - Any CSS variable name (base or component)
 * @param value - The value to set
 * @param element - Optional element to set the variable on
 *
 * @example
 * ```ts
 * setVariable('--fw-color-primary', '#ff0000');
 * setVariable('--fw-button-bg', '#00ff00');
 * ```
 */
export function setVariable(
  variableName: AllCSSVariables,
  value: CSSVariableValue,
  element: HTMLElement = document.documentElement
): void {
  element.style.setProperty(variableName, value);
}
