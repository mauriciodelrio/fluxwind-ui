/**
 * Component Configuration Loader
 *
 * Utilities for loading and merging component JSON configurations.
 * Provides type-safe access to component defaults with override support.
 *
 * @module @fluxwind/core/config
 */

import type {
  ComponentConfig,
  ComponentConfigWithMetadata,
  ComponentConfigOverride,
  DeepPartial,
} from './schema.types';

/**
 * Deep merge utility for configuration objects
 * Later objects take precedence over earlier ones
 */
function deepMerge<T extends Record<string, unknown>>(target: T, ...sources: DeepPartial<T>[]): T {
  if (!sources.length) return target;

  const source = sources.shift();
  if (!source) return target;

  const output = { ...target };

  for (const key in source) {
    const sourceValue = source[key];
    const targetValue = output[key];

    if (
      sourceValue &&
      typeof sourceValue === 'object' &&
      !Array.isArray(sourceValue) &&
      targetValue &&
      typeof targetValue === 'object' &&
      !Array.isArray(targetValue)
    ) {
      output[key] = deepMerge(
        targetValue as Record<string, unknown>,
        sourceValue as Record<string, unknown>
      ) as T[Extract<keyof T, string>];
    } else if (sourceValue !== undefined) {
      output[key] = sourceValue as T[Extract<keyof T, string>];
    }
  }

  return deepMerge(output, ...sources);
}

/**
 * Load a component configuration from its JSON file
 *
 * @param componentName - Name of the component (e.g., 'Button', 'Input')
 * @param componentType - Atomic design type ('atom', 'molecule', 'organism', 'layout')
 * @returns Component configuration with metadata
 *
 * @example
 * ```ts
 * const buttonConfig = loadComponentConfig('Button', 'atom');
 * console.log(buttonConfig.sizing.mode); // 'intelligent'
 * ```
 */
export function loadComponentConfig(
  componentName: string,
  componentType: 'atom' | 'molecule' | 'organism' | 'layout'
): ComponentConfigWithMetadata {
  try {
    // Dynamic import of JSON config
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const config = require(
      `../components/${componentType}s/${componentName}/${componentName}.config.json`
    ) as ComponentConfigWithMetadata;
    return config;
  } catch (error) {
    throw new Error(
      `Failed to load config for ${componentName} (${componentType}): ${
        error instanceof Error ? error.message : String(error)
      }`
    );
  }
}

/**
 * Load component configuration with custom overrides
 *
 * @param componentName - Name of the component
 * @param componentType - Atomic design type
 * @param overrides - Partial configuration overrides
 * @returns Merged configuration
 *
 * @example
 * ```ts
 * const customButtonConfig = loadComponentConfigWithOverrides(
 *   'Button',
 *   'atom',
 *   {
 *     sizing: { mode: 'classic' },
 *     colors: {
 *       variants: {
 *         primary: {
 *           bg: 'var(--my-custom-primary)',
 *         },
 *       },
 *     },
 *   }
 * );
 * ```
 */
export function loadComponentConfigWithOverrides(
  componentName: string,
  componentType: 'atom' | 'molecule' | 'organism' | 'layout',
  overrides?: ComponentConfigOverride
): ComponentConfigWithMetadata {
  const baseConfig = loadComponentConfig(componentName, componentType);

  if (!overrides) {
    return baseConfig;
  }

  return deepMerge(
    baseConfig as unknown as Record<string, unknown>,
    overrides
  ) as unknown as ComponentConfigWithMetadata;
}

/**
 * Load all component configurations for a given type
 *
 * @param componentType - Atomic design type
 * @returns Map of component names to their configurations
 *
 * @example
 * ```ts
 * const allAtoms = loadAllComponentConfigs('atom');
 * console.log(allAtoms.Button.sizing.mode);
 * console.log(allAtoms.Input.a11y.role);
 * ```
 */
export function loadAllComponentConfigs(
  _componentType: 'atom' | 'molecule' | 'organism' | 'layout'
): Record<string, ComponentConfigWithMetadata> {
  // This will be populated as components are created
  // For now, return empty object
  return {};
}

/**
 * Extract specific section from component config
 *
 * @param config - Full component configuration
 * @param section - Section key to extract
 * @returns Extracted section
 *
 * @example
 * ```ts
 * const buttonConfig = loadComponentConfig('Button', 'atom');
 * const sizingConfig = extractConfigSection(buttonConfig, 'sizing');
 * console.log(sizingConfig.mode); // 'intelligent'
 * ```
 */
export function extractConfigSection<K extends keyof ComponentConfig>(
  config: ComponentConfig | ComponentConfigWithMetadata,
  section: K
): ComponentConfig[K] {
  return config[section];
}

/**
 * Validate that a config uses theme tokens (no hardcoded colors)
 *
 * @param config - Configuration to validate
 * @returns Array of validation errors (empty if valid)
 *
 * @example
 * ```ts
 * const errors = validateThemeCompliance(buttonConfig);
 * if (errors.length > 0) {
 *   console.error('Theme violations:', errors);
 * }
 * ```
 */
export function validateThemeCompliance(
  config: ComponentConfig | ComponentConfigWithMetadata
): string[] {
  const errors: string[] = [];
  const hardcodedColorPattern = /#[0-9A-Fa-f]{3,8}|rgb\(|rgba\(|hsl\(|hsla\(/;

  // Check color variants
  Object.entries(config.colors.variants).forEach(([variant, colors]) => {
    Object.entries(colors).forEach(([key, value]) => {
      if (hardcodedColorPattern.test(value)) {
        errors.push(`Hardcoded color found in colors.variants.${variant}.${key}: ${value}`);
      }
    });
  });

  // Check border color
  if (config.borders.color && hardcodedColorPattern.test(config.borders.color)) {
    errors.push(`Hardcoded color found in borders.color: ${config.borders.color}`);
  }

  return errors;
}

/**
 * Get CSS variable value from token reference
 *
 * @param tokenRef - CSS variable reference (e.g., 'var(--fluxwind-space-4)')
 * @returns Extracted variable name
 *
 * @example
 * ```ts
 * const varName = extractCSSVariable('var(--fluxwind-space-4)');
 * console.log(varName); // '--fluxwind-space-4'
 * ```
 */
export function extractCSSVariable(tokenRef: string): string | null {
  const match = tokenRef.match(/var\((--[\w-]+)\)/);
  return match?.[1] ?? null;
}

/**
 * Check if a string is a theme token reference
 *
 * @param value - Value to check
 * @returns True if value is a CSS variable reference
 *
 * @example
 * ```ts
 * isThemeToken('var(--fluxwind-color-primary-500)'); // true
 * isThemeToken('#3B82F6'); // false
 * ```
 */
export function isThemeToken(value: string): boolean {
  return /^var\(--fluxwind-[\w-]+\)$/.test(value);
}

/**
 * Type guard to check if config has metadata
 */
export function hasMetadata(
  config: ComponentConfig | ComponentConfigWithMetadata
): config is ComponentConfigWithMetadata {
  return 'metadata' in config;
}
