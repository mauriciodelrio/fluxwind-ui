import { defineConfig, devices } from '@playwright/test';

/**
 * Playwright Configuration for Fluxwind UI
 *
 * E2E tests run against Storybook to test components in isolation
 * with real browser interactions.
 */
export default defineConfig({
  // Test file patterns
  testDir: './packages',
  testMatch: '**/*.spec.ts',

  // Execution settings
  fullyParallel: true,
  forbidOnly: !!process.env['CI'],
  retries: process.env['CI'] ? 2 : 0,
  ...(process.env['CI'] ? { workers: 1 } : {}),

  // Timeouts
  timeout: 30 * 1000,
  expect: {
    timeout: 5000,
  },

  // Reporting
  reporter: [
    ['html', { outputFolder: 'playwright-report' }],
    ['list'],
    ...(process.env['CI'] ? [['json', { outputFile: 'playwright-results.json' }] as const] : []),
  ],

  // Global settings for all tests
  use: {
    // Base URL for navigation
    baseURL: 'http://localhost:6006',

    // Debugging
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',

    // Browser context
    viewport: { width: 1280, height: 720 },
    actionTimeout: 10 * 1000,
    navigationTimeout: 30 * 1000,
  },

  // Browser configurations
  projects: [
    // Desktop browsers
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        // Chrome-specific settings
        launchOptions: {
          args: ['--disable-web-security'],
        },
      },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },

    // Mobile browsers
    {
      name: 'mobile-chrome',
      use: {
        ...devices['Pixel 5'],
      },
    },
    {
      name: 'mobile-safari',
      use: {
        ...devices['iPhone 12'],
      },
    },

    // Tablet
    {
      name: 'tablet',
      use: {
        ...devices['iPad Pro'],
      },
    },
  ],

  // Start Storybook before running tests
  webServer: {
    command: 'pnpm --filter @fluxwind/docs dev',
    url: 'http://localhost:6006',
    reuseExistingServer: !process.env['CI'],
    timeout: 120 * 1000,
    stdout: 'pipe',
    stderr: 'pipe',
  },
});
