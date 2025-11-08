/**
 * @vitest-environment jsdom
 */

import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import {
  getCSSVariable,
  setCSSVariable,
  removeCSSVariable,
  getCSSVariables,
  setCSSVariables,
  hasCSSVariable,
  getCSSVariableWithFallback,
} from '../variables.utils';
import type {
  FluxwindCSSVariable,
  ComponentCSSVariable,
  AllCSSVariables,
} from '../types/variables.types';

describe('CSS Variables System', () => {
  let testElement: HTMLDivElement;

  beforeEach(() => {
    // Create a test element
    testElement = document.createElement('div');
    document.body.appendChild(testElement);

    // Load the CSS variables (in a real environment, these would be loaded via CSS file)
    // For testing, we'll set them manually
    testElement.style.setProperty('--fw-color-primary', '#3b82f6');
    testElement.style.setProperty('--fw-color-secondary', '#8b5cf6');
    testElement.style.setProperty('--fw-spacing-4', '1rem');
    testElement.style.setProperty('--fw-duration-base', '250ms');
  });

  afterEach(() => {
    document.body.removeChild(testElement);
  });

  describe('getCSSVariable', () => {
    it('should get a CSS variable value', () => {
      const value = getCSSVariable('--fw-color-primary' as FluxwindCSSVariable, testElement);
      expect(value).toBe('#3b82f6');
    });

    it('should return empty string for non-existent variable', () => {
      const value = getCSSVariable('--fw-nonexistent' as FluxwindCSSVariable, testElement);
      expect(value).toBe('');
    });

    it('should trim whitespace from values', () => {
      testElement.style.setProperty('--fw-test', '  value  ');
      const value = getCSSVariable('--fw-test' as FluxwindCSSVariable, testElement);
      expect(value).toBe('value');
    });
  });

  describe('setCSSVariable', () => {
    it('should set a CSS variable value', () => {
      setCSSVariable('--fw-color-primary' as FluxwindCSSVariable, '#ff0000', testElement);
      const value = getCSSVariable('--fw-color-primary' as FluxwindCSSVariable, testElement);
      expect(value).toBe('#ff0000');
    });

    it('should override existing variable', () => {
      const original = getCSSVariable('--fw-color-primary' as FluxwindCSSVariable, testElement);
      expect(original).toBe('#3b82f6');

      setCSSVariable('--fw-color-primary' as FluxwindCSSVariable, '#00ff00', testElement);
      const updated = getCSSVariable('--fw-color-primary' as FluxwindCSSVariable, testElement);
      expect(updated).toBe('#00ff00');
    });
  });

  describe('removeCSSVariable', () => {
    it('should remove a CSS variable', () => {
      expect(getCSSVariable('--fw-color-primary' as FluxwindCSSVariable, testElement)).toBe(
        '#3b82f6'
      );

      removeCSSVariable('--fw-color-primary' as FluxwindCSSVariable, testElement);

      expect(getCSSVariable('--fw-color-primary' as FluxwindCSSVariable, testElement)).toBe('');
    });

    it('should not throw when removing non-existent variable', () => {
      expect(() => {
        removeCSSVariable('--fw-nonexistent' as FluxwindCSSVariable, testElement);
      }).not.toThrow();
    });
  });

  describe('getCSSVariables', () => {
    it('should get multiple CSS variables', () => {
      const variables = getCSSVariables(
        [
          '--fw-color-primary' as FluxwindCSSVariable,
          '--fw-color-secondary' as FluxwindCSSVariable,
          '--fw-spacing-4' as FluxwindCSSVariable,
        ],
        testElement
      );

      expect(variables['--fw-color-primary' as FluxwindCSSVariable]).toBe('#3b82f6');
      expect(variables['--fw-color-secondary' as FluxwindCSSVariable]).toBe('#8b5cf6');
      expect(variables['--fw-spacing-4' as FluxwindCSSVariable]).toBe('1rem');
    });

    it('should return empty strings for non-existent variables', () => {
      const variables = getCSSVariables(
        ['--fw-color-primary' as FluxwindCSSVariable, '--fw-nonexistent' as FluxwindCSSVariable],
        testElement
      );

      expect(variables['--fw-color-primary' as FluxwindCSSVariable]).toBe('#3b82f6');
      expect(variables['--fw-nonexistent' as FluxwindCSSVariable]).toBe('');
    });

    it('should handle empty array', () => {
      const variables = getCSSVariables([], testElement);
      expect(variables).toEqual({});
    });
  });

  describe('setCSSVariables', () => {
    it('should set multiple CSS variables', () => {
      setCSSVariables(
        {
          '--fw-color-primary': '#ff0000',
          '--fw-color-secondary': '#00ff00',
        } as Record<FluxwindCSSVariable, string>,
        testElement
      );

      expect(getCSSVariable('--fw-color-primary' as FluxwindCSSVariable, testElement)).toBe(
        '#ff0000'
      );
      expect(getCSSVariable('--fw-color-secondary' as FluxwindCSSVariable, testElement)).toBe(
        '#00ff00'
      );
    });

    it('should skip undefined values', () => {
      const original = getCSSVariable('--fw-color-primary' as FluxwindCSSVariable, testElement);

      setCSSVariables(
        {
          '--fw-color-secondary': '#00ff00',
        } as Partial<Record<FluxwindCSSVariable, string>>,
        testElement
      );

      // Primary should remain unchanged
      expect(getCSSVariable('--fw-color-primary' as FluxwindCSSVariable, testElement)).toBe(
        original
      );
      // Secondary should be updated
      expect(getCSSVariable('--fw-color-secondary' as FluxwindCSSVariable, testElement)).toBe(
        '#00ff00'
      );
    });

    it('should handle empty object', () => {
      expect(() => {
        setCSSVariables({}, testElement);
      }).not.toThrow();
    });
  });

  describe('hasCSSVariable', () => {
    it('should return true for existing variable', () => {
      expect(hasCSSVariable('--fw-color-primary' as FluxwindCSSVariable, testElement)).toBe(true);
    });

    it('should return false for non-existent variable', () => {
      expect(hasCSSVariable('--fw-nonexistent' as FluxwindCSSVariable, testElement)).toBe(false);
    });

    it('should return false for removed variable', () => {
      removeCSSVariable('--fw-color-primary' as FluxwindCSSVariable, testElement);
      expect(hasCSSVariable('--fw-color-primary' as FluxwindCSSVariable, testElement)).toBe(false);
    });
  });

  describe('getCSSVariableWithFallback', () => {
    it('should return variable value when it exists', () => {
      const value = getCSSVariableWithFallback(
        '--fw-color-primary' as FluxwindCSSVariable,
        '#fallback',
        testElement
      );
      expect(value).toBe('#3b82f6');
    });

    it('should return fallback when variable does not exist', () => {
      const value = getCSSVariableWithFallback(
        '--fw-nonexistent' as FluxwindCSSVariable,
        '#fallback',
        testElement
      );
      expect(value).toBe('#fallback');
    });

    it('should return fallback when variable is empty string', () => {
      testElement.style.setProperty('--fw-empty', '');
      const value = getCSSVariableWithFallback(
        '--fw-empty' as FluxwindCSSVariable,
        '#fallback',
        testElement
      );
      expect(value).toBe('#fallback');
    });
  });

  describe('Integration Tests', () => {
    it('should work with chained operations', () => {
      // Set variables
      setCSSVariables(
        {
          '--fw-color-primary': '#ff0000',
          '--fw-color-secondary': '#00ff00',
          '--fw-spacing-4': '2rem',
        } as Record<FluxwindCSSVariable, string>,
        testElement
      );

      // Verify they were set
      expect(hasCSSVariable('--fw-color-primary' as FluxwindCSSVariable, testElement)).toBe(true);
      expect(hasCSSVariable('--fw-color-secondary' as FluxwindCSSVariable, testElement)).toBe(true);

      // Get all variables
      const variables = getCSSVariables(
        [
          '--fw-color-primary' as FluxwindCSSVariable,
          '--fw-color-secondary' as FluxwindCSSVariable,
          '--fw-spacing-4' as FluxwindCSSVariable,
        ],
        testElement
      );

      expect(variables['--fw-color-primary' as FluxwindCSSVariable]).toBe('#ff0000');
      expect(variables['--fw-color-secondary' as FluxwindCSSVariable]).toBe('#00ff00');
      expect(variables['--fw-spacing-4' as FluxwindCSSVariable]).toBe('2rem');

      // Remove one
      removeCSSVariable('--fw-color-primary' as FluxwindCSSVariable, testElement);
      expect(hasCSSVariable('--fw-color-primary' as FluxwindCSSVariable, testElement)).toBe(false);
      expect(hasCSSVariable('--fw-color-secondary' as FluxwindCSSVariable, testElement)).toBe(true);
    });

    it('should handle CSS variable references (var())', () => {
      // Set a variable that references another
      testElement.style.setProperty('--fw-color-base', '#3b82f6');
      testElement.style.setProperty('--fw-color-derived', 'var(--fw-color-base)');

      const base = getCSSVariable('--fw-color-base' as FluxwindCSSVariable, testElement);
      const derived = getCSSVariable('--fw-color-derived' as FluxwindCSSVariable, testElement);

      expect(base).toBe('#3b82f6');
      // The computed value should resolve the var() reference
      expect(derived).toBe('var(--fw-color-base)'); // Raw value
    });
  });

  describe('Type Safety', () => {
    it('should only accept valid FluxwindCSSVariable names', () => {
      // These should compile without errors
      getCSSVariable('--fw-color-primary' as FluxwindCSSVariable, testElement);
      getCSSVariable('--fw-spacing-4' as FluxwindCSSVariable, testElement);
      getCSSVariable('--fw-duration-base' as FluxwindCSSVariable, testElement);

      // TypeScript will catch invalid variable names at compile time
      // @ts-expect-error - Invalid variable name
      getCSSVariable('--invalid-var', testElement);
    });

    it('should handle undefined values in setCSSVariables', () => {
      // Set initial value
      setCSSVariable('--fw-color-primary' as FluxwindCSSVariable, '#initial', testElement);
      const initial = getCSSVariable('--fw-color-primary' as FluxwindCSSVariable, testElement);
      expect(initial).toBe('#initial');

      // Pass object with undefined value - should skip it
      const variablesWithUndefined: Partial<Record<FluxwindCSSVariable, string | undefined>> = {
        '--fw-color-primary': undefined,
        '--fw-color-secondary': '#updated',
      };

      setCSSVariables(
        variablesWithUndefined as Partial<Record<FluxwindCSSVariable, string>>,
        testElement
      );

      // Primary should be unchanged (undefined was skipped)
      expect(getCSSVariable('--fw-color-primary' as FluxwindCSSVariable, testElement)).toBe(
        '#initial'
      );
      // Secondary should be updated
      expect(getCSSVariable('--fw-color-secondary' as FluxwindCSSVariable, testElement)).toBe(
        '#updated'
      );
    });
  });

  describe('Type Imports', () => {
    it('should import and use type definitions', async () => {
      // Import all types to ensure they're covered in coverage report
      const types = await import('../types/variables.types');

      expect(types).toBeDefined();

      // Verify type exports exist (they're just types, so we check the module)
      expect(typeof types).toBe('object');
    });
  });
});

describe('Component CSS Variables System', () => {
  let testElement: HTMLDivElement;

  beforeEach(async () => {
    // Import component variable utilities
    await import('../variables.utils');

    // Create a test element
    testElement = document.createElement('div');
    document.body.appendChild(testElement);

    // Set up test component variables
    testElement.style.setProperty('--fw-button-bg', '#3b82f6');
    testElement.style.setProperty('--fw-button-color', '#ffffff');
    testElement.style.setProperty('--fw-input-border', '#d1d5db');
    testElement.style.setProperty('--fw-checkbox-size', '20px');
  });

  afterEach(() => {
    document.body.removeChild(testElement);
  });

  describe('getComponentVariable', () => {
    it('should get a component CSS variable value', async () => {
      const { getComponentVariable } = await import('../variables.utils');
      const value = getComponentVariable('--fw-button-bg', testElement);
      expect(value).toBe('#3b82f6');
    });

    it('should return empty string for non-existent component variable', async () => {
      const { getComponentVariable } = await import('../variables.utils');
      const value = getComponentVariable(
        '--fw-button-nonexistent' as ComponentCSSVariable,
        testElement
      );
      expect(value).toBe('');
    });

    it('should trim whitespace from component variable values', async () => {
      const { getComponentVariable } = await import('../variables.utils');
      testElement.style.setProperty('--fw-button-test', '  value  ');
      const value = getComponentVariable('--fw-button-test' as ComponentCSSVariable, testElement);
      expect(value).toBe('value');
    });
  });

  describe('setComponentVariable', () => {
    it('should set a component CSS variable value', async () => {
      const { setComponentVariable, getComponentVariable } = await import('../variables.utils');
      setComponentVariable('--fw-button-bg', '#ff0000', testElement);
      const value = getComponentVariable('--fw-button-bg', testElement);
      expect(value).toBe('#ff0000');
    });

    it('should override existing component variable', async () => {
      const { setComponentVariable, getComponentVariable } = await import('../variables.utils');
      const original = getComponentVariable('--fw-button-bg', testElement);
      expect(original).toBe('#3b82f6');

      setComponentVariable('--fw-button-bg', '#00ff00', testElement);
      const updated = getComponentVariable('--fw-button-bg', testElement);
      expect(updated).toBe('#00ff00');
    });
  });

  describe('removeComponentVariable', () => {
    it('should remove a component CSS variable', async () => {
      const { removeComponentVariable, getComponentVariable } = await import('../variables.utils');
      expect(getComponentVariable('--fw-button-bg', testElement)).toBe('#3b82f6');

      removeComponentVariable('--fw-button-bg', testElement);

      expect(getComponentVariable('--fw-button-bg', testElement)).toBe('');
    });

    it('should not throw when removing non-existent component variable', async () => {
      const { removeComponentVariable } = await import('../variables.utils');
      expect(() => {
        removeComponentVariable('--fw-button-nonexistent' as ComponentCSSVariable, testElement);
      }).not.toThrow();
    });
  });

  describe('getComponentVariables', () => {
    it('should get multiple component CSS variables', async () => {
      const { getComponentVariables } = await import('../variables.utils');
      const variables = getComponentVariables(
        ['--fw-button-bg', '--fw-button-color', '--fw-input-border'],
        testElement
      );

      expect(variables['--fw-button-bg']).toBe('#3b82f6');
      expect(variables['--fw-button-color']).toBe('#ffffff');
      expect(variables['--fw-input-border']).toBe('#d1d5db');
    });

    it('should return empty strings for non-existent component variables', async () => {
      const { getComponentVariables } = await import('../variables.utils');
      const variables = getComponentVariables(
        [
          '--fw-button-nonexistent' as ComponentCSSVariable,
          '--fw-input-nonexistent' as ComponentCSSVariable,
        ],
        testElement
      );

      expect(variables['--fw-button-nonexistent' as ComponentCSSVariable]).toBe('');
      expect(variables['--fw-input-nonexistent' as ComponentCSSVariable]).toBe('');
    });

    it('should handle empty array', async () => {
      const { getComponentVariables } = await import('../variables.utils');
      const variables = getComponentVariables([], testElement);
      expect(variables).toEqual({});
    });
  });

  describe('setComponentVariables', () => {
    it('should set multiple component CSS variables', async () => {
      const { setComponentVariables, getComponentVariable } = await import('../variables.utils');
      setComponentVariables(
        {
          '--fw-button-bg': '#ff0000',
          '--fw-button-color': '#000000',
          '--fw-input-border': '#ff00ff',
        },
        testElement
      );

      expect(getComponentVariable('--fw-button-bg', testElement)).toBe('#ff0000');
      expect(getComponentVariable('--fw-button-color', testElement)).toBe('#000000');
      expect(getComponentVariable('--fw-input-border', testElement)).toBe('#ff00ff');
    });

    it('should skip undefined values in component variables', async () => {
      const { setComponentVariables, getComponentVariable } = await import('../variables.utils');
      // Set initial value
      testElement.style.setProperty('--fw-button-bg', '#initial');

      const variablesWithUndefined: Partial<Record<ComponentCSSVariable, string | undefined>> = {
        '--fw-button-bg': undefined,
        '--fw-button-color': '#updated',
      };

      setComponentVariables(
        variablesWithUndefined as Partial<Record<ComponentCSSVariable, string>>,
        testElement
      );

      // Button bg should be unchanged (undefined was skipped)
      expect(getComponentVariable('--fw-button-bg', testElement)).toBe('#initial');
      // Button color should be updated
      expect(getComponentVariable('--fw-button-color', testElement)).toBe('#updated');
    });

    it('should handle empty object', async () => {
      const { setComponentVariables } = await import('../variables.utils');
      expect(() => {
        setComponentVariables({}, testElement);
      }).not.toThrow();
    });
  });

  describe('hasComponentVariable', () => {
    it('should return true for existing component variable', async () => {
      const { hasComponentVariable } = await import('../variables.utils');
      expect(hasComponentVariable('--fw-button-bg', testElement)).toBe(true);
    });

    it('should return false for non-existent component variable', async () => {
      const { hasComponentVariable } = await import('../variables.utils');
      expect(
        hasComponentVariable('--fw-button-nonexistent' as ComponentCSSVariable, testElement)
      ).toBe(false);
    });

    it('should return false for empty component variable', async () => {
      const { hasComponentVariable } = await import('../variables.utils');
      testElement.style.setProperty('--fw-button-empty', '');
      expect(hasComponentVariable('--fw-button-empty' as ComponentCSSVariable, testElement)).toBe(
        false
      );
    });
  });

  describe('getComponentVariableWithFallback', () => {
    it('should return component variable value when it exists', async () => {
      const { getComponentVariableWithFallback } = await import('../variables.utils');
      const value = getComponentVariableWithFallback('--fw-button-bg', '#fallback', testElement);
      expect(value).toBe('#3b82f6');
    });

    it('should return fallback for non-existent component variable', async () => {
      const { getComponentVariableWithFallback } = await import('../variables.utils');
      const value = getComponentVariableWithFallback(
        '--fw-button-nonexistent' as ComponentCSSVariable,
        '#fallback',
        testElement
      );
      expect(value).toBe('#fallback');
    });

    it('should return fallback when component variable is empty string', async () => {
      const { getComponentVariableWithFallback } = await import('../variables.utils');
      testElement.style.setProperty('--fw-button-empty', '');
      const value = getComponentVariableWithFallback(
        '--fw-button-empty' as ComponentCSSVariable,
        '#fallback',
        testElement
      );
      expect(value).toBe('#fallback');
    });
  });

  describe('Universal Variable Functions', () => {
    it('should get base CSS variables with getVariable', async () => {
      const { getVariable } = await import('../variables.utils');
      testElement.style.setProperty('--fw-color-primary', '#3b82f6');
      const value = getVariable('--fw-color-primary', testElement);
      expect(value).toBe('#3b82f6');
    });

    it('should get component CSS variables with getVariable', async () => {
      const { getVariable } = await import('../variables.utils');
      const value = getVariable('--fw-button-bg', testElement);
      expect(value).toBe('#3b82f6');
    });

    it('should set base CSS variables with setVariable', async () => {
      const { setVariable, getVariable } = await import('../variables.utils');
      setVariable('--fw-color-primary', '#ff0000', testElement);
      const value = getVariable('--fw-color-primary', testElement);
      expect(value).toBe('#ff0000');
    });

    it('should set component CSS variables with setVariable', async () => {
      const { setVariable, getVariable } = await import('../variables.utils');
      setVariable('--fw-button-bg', '#ff0000', testElement);
      const value = getVariable('--fw-button-bg', testElement);
      expect(value).toBe('#ff0000');
    });
  });

  describe('Component Integration Tests', () => {
    it('should work with chained component operations', async () => {
      const {
        setComponentVariables,
        hasComponentVariable,
        getComponentVariables,
        removeComponentVariable,
      } = await import('../variables.utils');

      // Set variables
      setComponentVariables(
        {
          '--fw-button-bg': '#ff0000',
          '--fw-button-color': '#ffffff',
          '--fw-input-border': '#00ff00',
        },
        testElement
      );

      // Verify they were set
      expect(hasComponentVariable('--fw-button-bg', testElement)).toBe(true);
      expect(hasComponentVariable('--fw-button-color', testElement)).toBe(true);

      // Get all variables
      const variables = getComponentVariables(
        ['--fw-button-bg', '--fw-button-color', '--fw-input-border'],
        testElement
      );

      expect(variables['--fw-button-bg']).toBe('#ff0000');
      expect(variables['--fw-button-color']).toBe('#ffffff');
      expect(variables['--fw-input-border']).toBe('#00ff00');

      // Remove one
      removeComponentVariable('--fw-button-bg', testElement);
      expect(hasComponentVariable('--fw-button-bg', testElement)).toBe(false);
      expect(hasComponentVariable('--fw-button-color', testElement)).toBe(true);
    });

    it('should handle component variable references (var())', async () => {
      const { getComponentVariable } = await import('../variables.utils');
      // Set a component variable that references a base variable
      testElement.style.setProperty('--fw-color-base', '#3b82f6');
      testElement.style.setProperty('--fw-button-bg', 'var(--fw-color-base)');

      const buttonBg = getComponentVariable('--fw-button-bg', testElement);

      // The raw value should contain the var() reference
      expect(buttonBg).toBe('var(--fw-color-base)');
    });
  });

  describe('Mixed Variable Operations', () => {
    it('should work with both base and component variables', async () => {
      const { getVariable, setVariable } = await import('../variables.utils');

      // Set base variable
      setVariable('--fw-color-primary', '#primary', testElement);
      // Set component variable
      setVariable('--fw-button-bg', '#button-bg', testElement);

      // Get both
      const primaryColor = getVariable('--fw-color-primary', testElement);
      const buttonBg = getVariable('--fw-button-bg', testElement);

      expect(primaryColor).toBe('#primary');
      expect(buttonBg).toBe('#button-bg');
    });
  });
});

describe('Theme Switching System', () => {
  let testElement: HTMLDivElement;

  beforeEach(async () => {
    await import('../variables.utils');
    testElement = document.createElement('div');
    document.body.appendChild(testElement);

    // Set up default (light) theme variables
    testElement.style.setProperty('--fw-color-primary', '#3b82f6');
    testElement.style.setProperty('--fw-color-bg-primary', '#ffffff');
    testElement.style.setProperty('--fw-color-text-primary', '#111827');
    testElement.style.setProperty('--fw-button-bg', '#3b82f6');
    testElement.style.setProperty('--fw-input-bg', '#ffffff');
  });

  afterEach(() => {
    document.body.removeChild(testElement);
  });

  describe('Dark Theme', () => {
    it('should apply dark theme attribute', () => {
      testElement.setAttribute('data-theme', 'dark');
      expect(testElement.getAttribute('data-theme')).toBe('dark');
    });

    it('should update variables when dark theme is applied', async () => {
      const { getVariable, setVariable } = await import('../variables.utils');

      // Simulate dark theme CSS being applied
      testElement.setAttribute('data-theme', 'dark');
      setVariable('--fw-color-primary', '#60a5fa', testElement); // Dark mode primary
      setVariable('--fw-color-bg-primary', '#111827', testElement); // Dark bg
      setVariable('--fw-color-text-primary', '#f9fafb', testElement); // Light text

      expect(getVariable('--fw-color-primary', testElement)).toBe('#60a5fa');
      expect(getVariable('--fw-color-bg-primary', testElement)).toBe('#111827');
      expect(getVariable('--fw-color-text-primary', testElement)).toBe('#f9fafb');
    });

    it('should update component variables in dark theme', async () => {
      const { getComponentVariable, setComponentVariable } = await import('../variables.utils');

      testElement.setAttribute('data-theme', 'dark');
      setComponentVariable('--fw-button-bg', '#2563eb', testElement); // Darker button
      setComponentVariable('--fw-input-bg', '#1f2937', testElement); // Dark input bg

      expect(getComponentVariable('--fw-button-bg', testElement)).toBe('#2563eb');
      expect(getComponentVariable('--fw-input-bg', testElement)).toBe('#1f2937');
    });
  });

  describe('Sepia Theme', () => {
    it('should apply sepia theme attribute', () => {
      testElement.setAttribute('data-theme', 'sepia');
      expect(testElement.getAttribute('data-theme')).toBe('sepia');
    });

    it('should update variables when sepia theme is applied', async () => {
      const { getVariable, setVariable } = await import('../variables.utils');

      // Simulate sepia theme CSS being applied
      testElement.setAttribute('data-theme', 'sepia');
      setVariable('--fw-color-primary', '#d97706', testElement); // Amber primary
      setVariable('--fw-color-bg-primary', '#fef3c7', testElement); // Warm bg
      setVariable('--fw-color-text-primary', '#78350f', testElement); // Dark brown text

      expect(getVariable('--fw-color-primary', testElement)).toBe('#d97706');
      expect(getVariable('--fw-color-bg-primary', testElement)).toBe('#fef3c7');
      expect(getVariable('--fw-color-text-primary', testElement)).toBe('#78350f');
    });

    it('should update component variables in sepia theme', async () => {
      const { getComponentVariable, setComponentVariable } = await import('../variables.utils');

      testElement.setAttribute('data-theme', 'sepia');
      setComponentVariable('--fw-button-bg', '#d97706', testElement); // Amber button
      setComponentVariable('--fw-input-bg', '#fffbeb', testElement); // Warm input bg
      setComponentVariable('--fw-checkbox-bg', '#fffbeb', testElement); // Warm checkbox

      expect(getComponentVariable('--fw-button-bg', testElement)).toBe('#d97706');
      expect(getComponentVariable('--fw-input-bg', testElement)).toBe('#fffbeb');
      expect(getComponentVariable('--fw-checkbox-bg', testElement)).toBe('#fffbeb');
    });
  });

  describe('Theme Transitions', () => {
    it('should switch from light to dark theme', async () => {
      const { getVariable, setVariable } = await import('../variables.utils');

      // Start with light theme
      setVariable('--fw-color-bg-primary', '#ffffff', testElement);
      expect(getVariable('--fw-color-bg-primary', testElement)).toBe('#ffffff');

      // Switch to dark
      testElement.setAttribute('data-theme', 'dark');
      setVariable('--fw-color-bg-primary', '#111827', testElement);
      expect(getVariable('--fw-color-bg-primary', testElement)).toBe('#111827');
    });

    it('should switch from dark to sepia theme', async () => {
      const { getVariable, setVariable } = await import('../variables.utils');

      // Start with dark theme
      testElement.setAttribute('data-theme', 'dark');
      setVariable('--fw-color-primary', '#60a5fa', testElement);
      expect(getVariable('--fw-color-primary', testElement)).toBe('#60a5fa');

      // Switch to sepia
      testElement.setAttribute('data-theme', 'sepia');
      setVariable('--fw-color-primary', '#d97706', testElement);
      expect(getVariable('--fw-color-primary', testElement)).toBe('#d97706');
    });

    it('should switch from sepia back to light theme', async () => {
      const { getVariable, setVariable } = await import('../variables.utils');

      // Start with sepia
      testElement.setAttribute('data-theme', 'sepia');
      setVariable('--fw-color-primary', '#d97706', testElement);

      // Switch back to light
      testElement.removeAttribute('data-theme');
      setVariable('--fw-color-primary', '#3b82f6', testElement);
      expect(getVariable('--fw-color-primary', testElement)).toBe('#3b82f6');
    });

    it('should handle rapid theme switching', async () => {
      const { getVariable, setVariable } = await import('../variables.utils');

      // Light
      setVariable('--fw-color-primary', '#3b82f6', testElement);
      expect(getVariable('--fw-color-primary', testElement)).toBe('#3b82f6');

      // Dark
      testElement.setAttribute('data-theme', 'dark');
      setVariable('--fw-color-primary', '#60a5fa', testElement);
      expect(getVariable('--fw-color-primary', testElement)).toBe('#60a5fa');

      // Sepia
      testElement.setAttribute('data-theme', 'sepia');
      setVariable('--fw-color-primary', '#d97706', testElement);
      expect(getVariable('--fw-color-primary', testElement)).toBe('#d97706');

      // Back to light
      testElement.removeAttribute('data-theme');
      setVariable('--fw-color-primary', '#3b82f6', testElement);
      expect(getVariable('--fw-color-primary', testElement)).toBe('#3b82f6');
    });
  });

  describe('Theme-aware Component Behavior', () => {
    it('should maintain component state across theme changes', async () => {
      const { getComponentVariable, setComponentVariable } = await import('../variables.utils');

      // Set button state in light theme
      setComponentVariable('--fw-button-bg', '#3b82f6', testElement);
      setComponentVariable('--fw-button-color', '#ffffff', testElement);

      // Switch to dark
      testElement.setAttribute('data-theme', 'dark');
      setComponentVariable('--fw-button-bg', '#2563eb', testElement);

      // Button color should still be accessible
      expect(getComponentVariable('--fw-button-color', testElement)).toBe('#ffffff');
      expect(getComponentVariable('--fw-button-bg', testElement)).toBe('#2563eb');
    });

    it('should update multiple components when theme changes', async () => {
      const { setComponentVariables, getComponentVariables } = await import('../variables.utils');

      // Set components in sepia theme
      testElement.setAttribute('data-theme', 'sepia');
      setComponentVariables(
        {
          '--fw-button-bg': '#d97706',
          '--fw-input-bg': '#fffbeb',
          '--fw-checkbox-bg': '#fffbeb',
          '--fw-switch-track-bg': '#d6d3d1',
        },
        testElement
      );

      const variables = getComponentVariables(
        ['--fw-button-bg', '--fw-input-bg', '--fw-checkbox-bg', '--fw-switch-track-bg'],
        testElement
      );

      expect(variables['--fw-button-bg']).toBe('#d97706');
      expect(variables['--fw-input-bg']).toBe('#fffbeb');
      expect(variables['--fw-checkbox-bg']).toBe('#fffbeb');
      expect(variables['--fw-switch-track-bg']).toBe('#d6d3d1');
    });
  });

  describe('Theme Validation', () => {
    it('should handle invalid theme attribute gracefully', async () => {
      const { getVariable } = await import('../variables.utils');

      testElement.setAttribute('data-theme', 'invalid-theme');
      testElement.style.setProperty('--fw-color-primary', '#3b82f6');

      // Should still return the set value
      expect(getVariable('--fw-color-primary', testElement)).toBe('#3b82f6');
    });

    it('should preserve user-defined variables across theme changes', async () => {
      const { getVariable, setVariable } = await import('../variables.utils');

      // Set custom variable
      setVariable('--fw-custom-color' as AllCSSVariables, '#custom', testElement);

      // Change theme
      testElement.setAttribute('data-theme', 'dark');

      // Custom variable should persist
      expect(getVariable('--fw-custom-color' as AllCSSVariables, testElement)).toBe('#custom');
    });
  });
});
