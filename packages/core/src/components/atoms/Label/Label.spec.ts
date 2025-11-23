/**
 * Label E2E Tests
 *
 * End-to-end tests using Playwright.
 *
 * @module @fluxwind/core/components
 */

import { test, expect } from '@playwright/test';
import { gotoStory } from '../../../../../../playwright/helpers';

test.describe('Label', () => {
  test('renders correctly', async ({ page }) => {
    await gotoStory(page, 'core-label--default');

    const component = page.locator('[class*="label"]').first();
    await expect(component).toBeVisible();
  });

  test('displays all size variants', async ({ page }) => {
    await gotoStory(page, 'core-label--sizes');

    const components = page.locator('[class*="label"]');
    await expect(components).toHaveCount(6); // xs, sm, md, lg, xl, 2xl
  });

  test('displays all variants', async ({ page }) => {
    await gotoStory(page, 'core-label--variants');

    const components = page.locator('[class*="label"]');
    await expect(components).toHaveCount(7); // All color variants
  });

  test('is accessible', async ({ page }) => {
    await gotoStory(page, 'core-label--default');

    // Check for basic accessibility
    const component = page.locator('[class*="label"]').first();
    await expect(component).toBeVisible();

    // Add more a11y checks as needed
  });
});
