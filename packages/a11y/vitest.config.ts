import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/__tests__/setup.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html', 'lcov'],
      exclude: ['node_modules/', 'src/__tests__/', '**/*.d.ts', '**/*.config.*', '**/dist/'],
      thresholds: {
        lines: 95,
        functions: 94, // Event listeners are initialization code, hard to test directly
        branches: 94,
        statements: 95,
      },
    },
  },
});
