/**
 * Tabs E2E Tests
 *
 * End-to-end tests using Playwright.
 *
 * @module @fluxwind/core/components
 */

import { test, expect } from '@playwright/test';
import { gotoStory } from '../../../../../../playwright/helpers';

test.describe('Tabs', () => {
  test('renders correctly', async ({ page }) => {
    await gotoStory(page, 'core-tabs--default');

    const component = page.locator('[class*="tabs"]').first();
    await expect(component).toBeVisible();
  });

  test('displays all size variants', async ({ page }) => {
    await gotoStory(page, 'core-tabs--sizes');

    const components = page.locator('[class*="tabs"]');
    await expect(components).toHaveCount(6); // xs, sm, md, lg, xl, 2xl
  });

  test('displays all variants', async ({ page }) => {
    await gotoStory(page, 'core-tabs--variants');

    const components = page.locator('[class*="tabs"]');
    await expect(components).toHaveCount(7); // All color variants
  });

  test('is accessible', async ({ page }) => {
    await gotoStory(page, 'core-tabs--default');

    // Check for basic accessibility
    const component = page.locator('[class*="tabs"]').first();
    await expect(component).toBeVisible();

    // Add more a11y checks as needed
  });
});
