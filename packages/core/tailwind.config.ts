import type { Config } from 'tailwindcss';
import { fluxwindConfig } from '@fluxwind/themes';
import { fluxwindComponentsPlugin } from './src/config/tailwind-plugin';
import { join } from 'path';

/**
 * Tailwind CSS configuration for @fluxwind/core
 *
 * Extends the base Fluxwind theme with component-specific utilities
 * generated dynamically from component JSON configurations.
 */
const config: Config = {
  content: ['./src/**/*.{ts,tsx}', './src/**/*.stories.{ts,tsx}'],

  // Extend base Fluxwind configuration
  presets: [fluxwindConfig as Config],

  theme: {
    extend: {
      // Component-specific customizations can go here
    },
  },

  plugins: [
    // Fluxwind Components Plugin
    // Automatically generates utilities from component configs
    fluxwindComponentsPlugin({
      componentsDir: join(__dirname, 'src/components'),
    }),
  ],
};

export default config;
