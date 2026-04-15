import { resolve } from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import dts from 'vite-plugin-dts';

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    dts({
      include: ['src'],
      exclude: ['src/**/*.test.*', 'src/**/*.stories.*', 'src/test'],
      rollupTypes: true,
      insertTypesEntry: true,
    }),
  ],
  resolve: {
    alias: { '@': resolve(__dirname, 'src') },
  },
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      formats: ['es'],
      fileName: 'index',
    },
    rollupOptions: {
      // React and react-dom are peer deps — never bundle them
      external: ['react', 'react-dom', 'react/jsx-runtime'],
      output: {
        // CSS output path — consumers import '@fluxwind-ui/core/styles'
        assetFileNames: 'styles/[name][extname]',
      },
    },
    cssCodeSplit: false,
  },
});
