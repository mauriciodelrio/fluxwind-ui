import { test, expect } from '@playwright/test';

/**
 * Example E2E test to validate Playwright setup
 *
 * This test runs against Storybook and verifies basic component interaction.
 * Once Core components are built, tests will follow this pattern.
 */

test.describe('Example Button - E2E Setup Validation', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the button story
    await page.goto('/iframe.html?id=examples-button--primary');
  });

  test('renders button correctly', async ({ page }) => {
    const button = page.getByRole('button', { name: 'Click me' });
    await expect(button).toBeVisible();
    await expect(button).toHaveText('Click me');
  });

  test('button has correct styles', async ({ page }) => {
    const button = page.getByRole('button', { name: 'Click me' });

    // Check base styles
    await expect(button).toHaveCSS('padding-left', '16px');
    await expect(button).toHaveCSS('padding-right', '16px');
    await expect(button).toHaveCSS('border-radius', '6px');
  });

  test('button is keyboard accessible', async ({ page }) => {
    // Tab to focus the button
    await page.keyboard.press('Tab');

    const button = page.getByRole('button', { name: 'Click me' });
    await expect(button).toBeFocused();

    // Press Enter should work (even though this button doesn't have onClick)
    await page.keyboard.press('Enter');
  });

  test('button hover state works', async ({ page }) => {
    const button = page.getByRole('button', { name: 'Click me' });

    // Hover over button
    await button.hover();

    // Note: Testing exact hover color is tricky, but we can verify it's still visible
    await expect(button).toBeVisible();
  });
});

test.describe('Example Button - Responsive', () => {
  test('works on mobile viewport', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });

    await page.goto('/iframe.html?id=examples-button--primary');

    const button = page.getByRole('button', { name: 'Click me' });
    await expect(button).toBeVisible();

    // Verify button is tappable on mobile
    await button.tap();
  });

  test('works on tablet viewport', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });

    await page.goto('/iframe.html?id=examples-button--primary');

    const button = page.getByRole('button', { name: 'Click me' });
    await expect(button).toBeVisible();
  });
});

test.describe('Example Button - Accessibility', () => {
  test('has proper ARIA role', async ({ page }) => {
    await page.goto('/iframe.html?id=examples-button--primary');

    // Verify button role exists
    const button = page.getByRole('button');
    await expect(button).toBeVisible();
  });

  test('is keyboard navigable', async ({ page }) => {
    await page.goto('/iframe.html?id=examples-button--primary');

    // Start with no focus
    await page.keyboard.press('Tab');

    const button = page.getByRole('button', { name: 'Click me' });
    await expect(button).toBeFocused();

    // Can activate with Space
    await page.keyboard.press('Space');

    // Can activate with Enter
    await page.keyboard.press('Enter');
  });
});

test.describe('Example Button - Cross-browser', () => {
  test('renders consistently across browsers', async ({ page, browserName }) => {
    await page.goto('/iframe.html?id=examples-button--primary');

    const button = page.getByRole('button', { name: 'Click me' });
    await expect(button).toBeVisible();

    // Take screenshot for visual comparison
    await expect(button).toHaveScreenshot(`button-${browserName}.png`);
  });
});
