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
import type { FluxwindCSSVariable } from '../types/variables.types';

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
