/**
 * useComponentConfig Hook
 *
 * React hook for loading and accessing component configurations
 * with optional runtime overrides.
 *
 * @module @fluxwind/core/shared/hooks
 */

import { useMemo } from 'react';
import type {
  ComponentConfig,
  ComponentConfigWithMetadata,
  ComponentConfigOverride,
  ComponentType,
} from '../../config/schema.types';
import { loadComponentConfig, loadComponentConfigWithOverrides } from '../../config/config-loader';

export interface UseComponentConfigOptions {
  /** Component name (e.g., 'Button', 'Input') */
  componentName: string;
  /** Atomic design type */
  componentType: ComponentType;
  /** Runtime configuration overrides */
  overrides?: ComponentConfigOverride;
}

/**
 * Load component configuration with optional overrides
 *
 * @param options - Configuration options
 * @returns Component configuration
 *
 * @example
 * ```tsx
 * function MyButton() {
 *   const config = useComponentConfig({
 *     componentName: 'Button',
 *     componentType: 'atom',
 *     overrides: {
 *       sizing: { mode: 'classic' }
 *     }
 *   });
 *
 *   return <button style={{ height: config.sizing.classic.default }}>Click me</button>;
 * }
 * ```
 */
export function useComponentConfig(
  options: UseComponentConfigOptions
): ComponentConfigWithMetadata {
  const { componentName, componentType, overrides } = options;

  return useMemo(() => {
    if (overrides) {
      return loadComponentConfigWithOverrides(componentName, componentType, overrides);
    }
    return loadComponentConfig(componentName, componentType);
  }, [componentName, componentType, overrides]);
}

/**
 * Extract specific section from component config
 *
 * @example
 * ```tsx
 * function MyButton() {
 *   const sizingConfig = useComponentConfigSection({
 *     componentName: 'Button',
 *     componentType: 'atom',
 *     section: 'sizing'
 *   });
 *
 *   console.log(sizingConfig.mode); // 'intelligent'
 * }
 * ```
 */
export function useComponentConfigSection<K extends keyof ComponentConfig>(
  options: UseComponentConfigOptions & { section: K }
): ComponentConfig[K] {
  const config = useComponentConfig(options);
  return config[options.section];
}
