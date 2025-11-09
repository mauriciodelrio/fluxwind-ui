import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['../../vitest.setup.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html', 'lcov'],
      exclude: [
        'node_modules/',
        'dist/',
        '**/*.config.*',
        '**/*.test.*',
        '**/*.spec.*',
        '**/types/**',
      ],
      thresholds: {
        lines: 95,
        functions: 95,
        branches: 95,
        statements: 95,
      },
    },
  },
});
