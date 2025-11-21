# Playwright E2E Testing

End-to-end testing setup for Fluxwind UI components using Playwright.

## Setup

Playwright is already installed. To reinstall browsers if needed:

```bash
pnpm exec playwright install
```

## Running Tests

```bash
# Run all E2E tests
pnpm test:e2e

# Run with UI (interactive mode)
pnpm test:e2e:ui

# Run with headed browsers (see what's happening)
pnpm test:e2e:headed

# Debug mode (step through tests)
pnpm test:e2e:debug

# Run specific browser
pnpm test:e2e:chromium
pnpm test:e2e:firefox
pnpm test:e2e:webkit

# Run mobile tests only
pnpm test:e2e:mobile

# View test report
pnpm test:e2e:report
```

## Writing Tests

Tests are co-located with components:

```
packages/core/src/components/button/
├─ button.tsx
├─ button.test.tsx    # Unit tests (Vitest)
├─ button.spec.ts     # E2E tests (Playwright) ← HERE
```

### Basic Test Pattern

```typescript
import { test, expect } from '@playwright/test';

test.describe('Button Component', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to Storybook story
    await page.goto('/iframe.html?id=components-button--primary');
  });

  test('renders correctly', async ({ page }) => {
    const button = page.getByRole('button', { name: 'Click me' });
    await expect(button).toBeVisible();
  });

  test('handles clicks', async ({ page }) => {
    const button = page.getByRole('button');
    await button.click();
    // Assert expected behavior
  });
});
```

### Using Helpers

```typescript
import { gotoStory, testTabOrder, testDarkMode } from '../../../playwright/helpers';

test('keyboard navigation works', async ({ page }) => {
  await gotoStory(page, 'components-button--primary');
  await testTabOrder(page, ['Submit', 'Cancel']);
});

test('supports dark mode', async ({ page }) => {
  await gotoStory(page, 'components-button--primary');
  await testDarkMode(page, 'button');
});
```

## Test Categories

### 1. Rendering Tests

- Component renders correctly
- All variants display properly
- Props affect appearance
- States (hover, focus, disabled) work

### 2. Interaction Tests

- Click events
- Keyboard events (Enter, Space, Escape, Arrows)
- Form submission
- Focus management

### 3. Accessibility Tests

- ARIA attributes present
- Keyboard navigation works
- Screen reader compatibility
- Focus indicators visible
- Color contrast sufficient

### 4. Responsive Tests

- Mobile viewport (375x667)
- Tablet viewport (768x1024)
- Desktop viewport (1280x720)
- Touch interactions on mobile

### 5. Cross-browser Tests

- Chromium (Chrome/Edge)
- Firefox
- WebKit (Safari)

## Best Practices

### ✅ DO

```typescript
// Use semantic locators
page.getByRole('button', { name: 'Submit' });
page.getByLabel('Email address');
page.getByText('Welcome');

// Wait for elements properly
await expect(button).toBeVisible();

// Test keyboard navigation
await page.keyboard.press('Tab');
await page.keyboard.press('Enter');

// Test accessibility
await expect(button).toHaveAttribute('aria-label', 'Close');
```

### ❌ DON'T

```typescript
// Don't use fragile selectors
page.locator('.btn-primary'); // ❌ CSS classes can change

// Don't use hardcoded waits
await page.waitForTimeout(1000); // ❌ Flaky

// Don't test implementation details
await page.locator('#internal-id'); // ❌ Internal IDs
```

## Configuration

See `playwright.config.ts` in root for:

- Browser configurations
- Viewport sizes
- Timeout settings
- Reporter options
- Storybook web server setup

## Debugging

### Visual Debugging

```bash
pnpm test:e2e:debug
```

This opens Playwright Inspector where you can:

- Step through tests
- Inspect page state
- See screenshots
- View traces

### Screenshots & Videos

On failure, Playwright automatically captures:

- Screenshots (png)
- Videos (webm)
- Traces (zip)

Find them in `playwright-report/` folder.

### Headed Mode

```bash
pnpm test:e2e:headed
```

See browsers running in real-time.

## CI/CD

In CI, tests run:

- In parallel (faster)
- With retries (2 attempts)
- With single worker (stability)
- Generate JSON report

## Performance

E2E tests are slower than unit tests:

- Unit tests: ~milliseconds
- E2E tests: ~seconds per test

Use E2E for:

- Critical user flows
- Cross-browser compatibility
- Accessibility validation
- Visual regression

Use unit tests for:

- Props validation
- State management
- Edge cases
- Error handling

## Troubleshooting

### Storybook not starting

```bash
# Manually start Storybook first
pnpm --filter @fluxwind/docs dev

# Then run tests in another terminal
pnpm test:e2e
```

### Tests timing out

Increase timeout in `playwright.config.ts`:

```typescript
timeout: 60 * 1000, // 60 seconds
```

### Browser not found

Reinstall browsers:

```bash
pnpm exec playwright install --force
```

## Resources

- [Playwright Documentation](https://playwright.dev/)
- [Best Practices](https://playwright.dev/docs/best-practices)
- [Accessibility Testing](https://playwright.dev/docs/accessibility-testing)
- [Debugging Guide](https://playwright.dev/docs/debug)
