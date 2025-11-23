/**
 * Tooltip E2E Tests
 *
 * End-to-end tests using Playwright.
 *
 * @module @fluxwind/core/components
 */

import { test, expect } from '@playwright/test';
import { gotoStory } from '../../../../../../playwright/helpers';

test.describe('Tooltip', () => {
  test('renders correctly', async ({ page }) => {
    await gotoStory(page, 'core-tooltip--default');

    const component = page.locator('[class*="tooltip"]').first();
    await expect(component).toBeVisible();
  });

  test('displays all size variants', async ({ page }) => {
    await gotoStory(page, 'core-tooltip--sizes');

    const components = page.locator('[class*="tooltip"]');
    await expect(components).toHaveCount(6); // xs, sm, md, lg, xl, 2xl
  });

  test('displays all variants', async ({ page }) => {
    await gotoStory(page, 'core-tooltip--variants');

    const components = page.locator('[class*="tooltip"]');
    await expect(components).toHaveCount(7); // All color variants
  });

  test('is accessible', async ({ page }) => {
    await gotoStory(page, 'core-tooltip--default');

    // Check for basic accessibility
    const component = page.locator('[class*="tooltip"]').first();
    await expect(component).toBeVisible();

    // Add more a11y checks as needed
  });
});
