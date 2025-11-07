import type { Config } from 'tailwindcss';
import { fluxwindConfig } from '@fluxwind/themes';

const config: Config = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    '../../packages/core/src/**/*.{js,ts,jsx,tsx}',
  ],
  ...fluxwindConfig,
};

export default config;
