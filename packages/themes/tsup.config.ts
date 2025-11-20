import { defineConfig } from 'tsup';
import path from 'path';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['cjs', 'esm'],
  dts: {
    resolve: true,
  },
  esbuildOptions(options) {
    options.alias = {
      '@': path.resolve(__dirname, './src'),
    };
  },
  sourcemap: true,
  clean: true,
  external: ['tailwindcss'],
  treeshake: true,
  splitting: false,
  minify: false,
  target: 'es2020',
});
