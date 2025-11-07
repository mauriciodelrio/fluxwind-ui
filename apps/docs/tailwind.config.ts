import type { Config } from 'tailwindcss';
import { fluxwindConfig } from '@fluxwind/themes';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}', '../../packages/core/src/**/*.{js,ts,jsx,tsx}'],
  ...fluxwindConfig,
};

export default config;
