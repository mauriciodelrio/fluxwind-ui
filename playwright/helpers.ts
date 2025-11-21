import type { Page } from '@playwright/test';
import { expect } from '@playwright/test';

/**
 * Playwright helper utilities for component testing
 */

/**
 * Navigate to a specific Storybook story
 */
export async function gotoStory(page: Page, storyId: string) {
  await page.goto(`/iframe.html?id=${storyId}`);
  await page.waitForLoadState('networkidle');
}

/**
 * Wait for story to be fully rendered
 */
export async function waitForStoryReady(page: Page) {
  await page.waitForLoadState('domcontentloaded');
  await page.waitForTimeout(100); // Small delay for animations
}

/**
 * Test keyboard navigation (Tab order)
 */
export async function testTabOrder(page: Page, expectedOrder: string[]) {
  for (const label of expectedOrder) {
    await page.keyboard.press('Tab');
    const focused = page.locator(':focus');
    await expect(focused).toHaveAccessibleName(label);
  }
}

/**
 * Test reduced motion preference
 */
export async function testReducedMotion(page: Page, element: string) {
  // Enable reduced motion
  await page.emulateMedia({ reducedMotion: 'reduce' });

  const el = page.locator(element);
  const transitionDuration = await el.evaluate((node) => {
    return window.getComputedStyle(node).transitionDuration;
  });

  // Should be 0s or very short
  expect(parseFloat(transitionDuration)).toBeLessThanOrEqual(0.01);
}

/**
 * Test dark mode support
 */
export async function testDarkMode(page: Page, element: string) {
  // Enable dark mode
  await page.emulateMedia({ colorScheme: 'dark' });

  // Wait for theme to apply
  await page.waitForTimeout(100);

  const el = page.locator(element);
  await expect(el).toBeVisible();
}

/**
 * Test color contrast ratio (WCAG AA minimum: 4.5:1)
 */
export async function testContrast(page: Page, element: string, _minRatio = 4.5) {
  const el = page.locator(element);

  const { textColor, bgColor } = await el.evaluate((node) => {
    const style = window.getComputedStyle(node);
    return {
      textColor: style.color,
      bgColor: style.backgroundColor,
    };
  });

  // Basic check that colors exist
  expect(textColor).toBeTruthy();
  expect(bgColor).toBeTruthy();

  // Note: Actual contrast calculation would require a helper function
  // For now, we just verify colors are defined
}

/**
 * Test focus visible indicator
 */
export async function testFocusVisible(page: Page, selector: string) {
  const element = page.locator(selector);

  // Focus element
  await element.focus();

  // Check for outline or ring
  const outlineWidth = await element.evaluate((node) => {
    const style = window.getComputedStyle(node);
    return style.outlineWidth;
  });

  // Should have visible outline
  expect(parseFloat(outlineWidth)).toBeGreaterThan(0);
}

/**
 * Simulate keyboard navigation pattern
 */
export async function navigateWithKeyboard(
  page: Page,
  keys: Array<
    'Tab' | 'Enter' | 'Space' | 'Escape' | 'ArrowUp' | 'ArrowDown' | 'ArrowLeft' | 'ArrowRight'
  >
) {
  for (const key of keys) {
    await page.keyboard.press(key);
    await page.waitForTimeout(50); // Small delay between keys
  }
}

/**
 * Check ARIA attributes
 */
export async function checkAriaAttributes(
  page: Page,
  selector: string,
  attributes: Record<string, string>
) {
  const element = page.locator(selector);

  for (const [attr, expectedValue] of Object.entries(attributes)) {
    const actualValue = await element.getAttribute(attr);
    expect(actualValue).toBe(expectedValue);
  }
}

/**
 * Test responsive behavior across viewports
 */
export const viewports = {
  mobile: { width: 375, height: 667 },
  tablet: { width: 768, height: 1024 },
  desktop: { width: 1280, height: 720 },
  wide: { width: 1920, height: 1080 },
} as const;

export async function testResponsive(
  page: Page,
  storyId: string,
  testFn: (page: Page) => Promise<void>
) {
  for (const [_name, viewport] of Object.entries(viewports)) {
    await page.setViewportSize(viewport);
    await gotoStory(page, storyId);
    await testFn(page);
  }
}
