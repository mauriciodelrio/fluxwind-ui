/**
 * Tailwind CSS Plugin for Fluxwind Components
 *
 * Dynamically generates utilities based on component configurations.
 * This allows components to use Tailwind classes that map directly to their JSON configs.
 *
 * @module @fluxwind/core/config/tailwind-plugin
 */

import plugin from 'tailwindcss/plugin';
import { readdirSync, readFileSync, existsSync } from 'fs';
import { join } from 'path';
import type { ComponentConfigWithMetadata } from './schema.types';

/**
 * Find all component config files recursively
 */
function findAllConfigs(baseDir: string): string[] {
  const configs: string[] = [];

  function searchDirectory(dir: string) {
    if (!existsSync(dir)) return;

    const entries = readdirSync(dir, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = join(dir, entry.name);

      if (entry.isDirectory()) {
        searchDirectory(fullPath);
      } else if (entry.isFile() && entry.name.endsWith('.config.json')) {
        configs.push(fullPath);
      }
    }
  }

  searchDirectory(baseDir);
  return configs;
}

/**
 * Load a component configuration file
 */
function loadConfig(filePath: string): ComponentConfigWithMetadata | null {
  try {
    const content = readFileSync(filePath, 'utf-8');
    return JSON.parse(content) as ComponentConfigWithMetadata;
  } catch (error) {
    console.warn(`Failed to load config: ${filePath}`, error);
    return null;
  }
}

/**
 * Extract component-specific CSS classes from config
 */
function extractComponentClasses(config: ComponentConfigWithMetadata): Record<string, string> {
  const classes: Record<string, string> = {};
  const componentName = config.metadata.name.toLowerCase();

  // Size variants
  if (config.sizing.classic?.values) {
    Object.entries(config.sizing.classic.values).forEach(([size, values]) => {
      if (values && typeof values === 'object' && 'height' in values) {
        const sizeValue = values as { height: string; minWidth?: string };
        classes[`${componentName}-${size}`] = `
          height: ${sizeValue.height};
          ${sizeValue.minWidth ? `min-width: ${sizeValue.minWidth};` : ''}
        `.trim();
      }
    });
  }

  // Spacing utilities
  if (config.spacing.padding) {
    const { x, y } = config.spacing.padding;
    if (typeof x === 'string' && typeof y === 'string') {
      classes[`${componentName}-padding`] = `
        padding-left: ${x};
        padding-right: ${x};
        padding-top: ${y};
        padding-bottom: ${y};
      `.trim();
    } else if (typeof x === 'object' && typeof y === 'object') {
      // Size-specific padding
      Object.keys(x).forEach((size) => {
        const xVal = (x as Record<string, string>)[size];
        const yVal = (y as Record<string, string>)[size];
        classes[`${componentName}-padding-${size}`] = `
          padding-left: ${xVal};
          padding-right: ${xVal};
          padding-top: ${yVal};
          padding-bottom: ${yVal};
        `.trim();
      });
    }
  }

  return classes;
}

/**
 * Generate safelist for all component variants
 */
function generateSafelist(configs: ComponentConfigWithMetadata[]): string[] {
  const safelist: string[] = [];

  configs.forEach((config) => {
    const componentName = config.metadata.name.toLowerCase();

    // Add size variants
    if (config.variants?.size) {
      config.variants.size.forEach((size: string) => {
        safelist.push(`${componentName}-${size}`);
      });
    }

    // Add color scheme variants
    if (config.variants?.colorScheme) {
      config.variants.colorScheme.forEach((scheme: string) => {
        safelist.push(`${componentName}-${scheme}`);
      });
    }

    // Add appearance variants
    if (config.variants?.appearance) {
      config.variants.appearance.forEach((appearance: string) => {
        safelist.push(`${componentName}-${appearance}`);
      });
    }
  });

  return safelist;
}

/**
 * Fluxwind Components Tailwind Plugin
 *
 * Usage in tailwind.config.ts:
 * ```typescript
 * import { fluxwindComponentsPlugin } from '@fluxwind/core/config';
 *
 * export default {
 *   plugins: [
 *     fluxwindComponentsPlugin({ componentsDir: './src/components' })
 *   ]
 * }
 * ```
 */
export const fluxwindComponentsPlugin = plugin.withOptions<{
  componentsDir?: string;
}>(
  (options = {}) => {
    const { componentsDir = join(__dirname, '../components') } = options;

    return ({ addUtilities, addComponents }) => {
      // Find all component configs
      const configPaths = findAllConfigs(componentsDir);
      const configs = configPaths
        .map(loadConfig)
        .filter((c): c is ComponentConfigWithMetadata => c !== null);

      console.log(`✅ Loaded ${configs.length} component configurations for Tailwind`);

      // Generate component-specific utilities
      const utilities: Record<string, Record<string, string>> = {};

      configs.forEach((config) => {
        const componentClasses = extractComponentClasses(config);
        Object.entries(componentClasses).forEach(([className, styles]) => {
          utilities[`.${className}`] = styles.split(';').reduce(
            (acc, style) => {
              const [prop, value] = style.split(':').map((s) => s.trim());
              if (prop && value) {
                // Convert kebab-case to camelCase for CSS-in-JS
                const camelProp = prop.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase());
                acc[camelProp] = value;
              }
              return acc;
            },
            {} as Record<string, string>
          );
        });
      });

      // Add utilities
      addUtilities(utilities);

      // Generate component base styles
      const componentStyles: Record<string, Record<string, string>> = {};

      configs.forEach((config) => {
        const componentName = config.metadata.name.toLowerCase();

        // Base component styles
        componentStyles[`.${componentName}`] = {
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: `all ${config.animations?.transition?.default?.duration || '200ms'} ${config.animations?.transition?.default?.easing || 'ease'}`,
        };

        // Disabled state
        if (config.states?.disabled) {
          componentStyles[`.${componentName}:disabled`] = {
            opacity: String(config.states.disabled.opacity || 0.5),
            cursor: config.states.disabled.cursor || 'not-allowed',
            pointerEvents: config.states.disabled.pointerEvents || 'none',
          };
        }
      });

      addComponents(componentStyles);
    };
  },
  (options = {}) => {
    const { componentsDir = join(__dirname, '../components') } = options;

    // Extend Tailwind config
    const configPaths = findAllConfigs(componentsDir);
    const configs = configPaths
      .map(loadConfig)
      .filter((c): c is ComponentConfigWithMetadata => c !== null);

    const safelist = generateSafelist(configs);

    return {
      safelist: [
        ...safelist,
        // Add responsive variants for intelligent sizing
        {
          pattern: /^(h|w|min-w|max-w|min-h|max-h)-(7|9|10|11|13|14|15)$/,
          variants: ['md', 'lg'],
        },
      ],
    };
  }
);

/**
 * Export type for external usage
 */
export type FluxwindComponentsPluginOptions = {
  componentsDir?: string;
};
