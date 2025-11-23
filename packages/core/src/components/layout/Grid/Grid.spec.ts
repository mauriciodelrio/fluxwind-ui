/**
 * Grid E2E Tests
 *
 * End-to-end tests using Playwright.
 *
 * @module @fluxwind/core/components
 */

import { test, expect } from '@playwright/test';
import { gotoStory } from '../../../../../../playwright/helpers';

test.describe('Grid', () => {
  test('renders correctly', async ({ page }) => {
    await gotoStory(page, 'core-grid--default');

    const component = page.locator('[class*="grid"]').first();
    await expect(component).toBeVisible();
  });

  test('displays all size variants', async ({ page }) => {
    await gotoStory(page, 'core-grid--sizes');

    const components = page.locator('[class*="grid"]');
    await expect(components).toHaveCount(6); // xs, sm, md, lg, xl, 2xl
  });

  test('displays all variants', async ({ page }) => {
    await gotoStory(page, 'core-grid--variants');

    const components = page.locator('[class*="grid"]');
    await expect(components).toHaveCount(7); // All color variants
  });

  test('is accessible', async ({ page }) => {
    await gotoStory(page, 'core-grid--default');

    // Check for basic accessibility
    const component = page.locator('[class*="grid"]').first();
    await expect(component).toBeVisible();

    // Add more a11y checks as needed
  });
});
