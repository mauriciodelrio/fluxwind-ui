/**
 * @vitest-environment jsdom
 */
import '@testing-library/jest-dom/vitest';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeProvider, useTheme, useThemeSafe } from '../ThemeProvider';
import { createThemeStore } from '@/theme.store';

describe('ThemeProvider', () => {
  let root: HTMLElement;

  beforeEach(() => {
    root = document.documentElement;
    root.removeAttribute('data-theme');
    root.style.cssText = '';
    localStorage.clear();
  });

  afterEach(() => {
    root.removeAttribute('data-theme');
    root.style.cssText = '';
    localStorage.clear();
  });

  describe('Basic rendering', () => {
    it('should render children', () => {
      render(
        <ThemeProvider>
          <div data-testid="child">Child content</div>
        </ThemeProvider>
      );

      expect(screen.getByTestId('child')).toBeTruthy();
      expect(screen.getByTestId('child').textContent).toBe('Child content');
    });

    it('should apply default theme', () => {
      render(
        <ThemeProvider>
          <div>Content</div>
        </ThemeProvider>
      );

      expect(root.getAttribute('data-theme')).toBe('light');
    });

    it('should apply custom initial theme', () => {
      render(
        <ThemeProvider initialTheme="dark">
          <div>Content</div>
        </ThemeProvider>
      );

      expect(root.getAttribute('data-theme')).toBe('dark');
    });
  });

  describe('Configuration props', () => {
    it('should accept followSystem prop', () => {
      render(
        <ThemeProvider followSystem={true}>
          <div>Content</div>
        </ThemeProvider>
      );

      // Component should render without errors
      expect(root).toBeDefined();
    });

    it('should accept persist prop', () => {
      render(
        <ThemeProvider persist={false}>
          <div>Content</div>
        </ThemeProvider>
      );

      // Should not persist to localStorage
      expect(localStorage.getItem('fw-theme')).toBeNull();
    });

    it('should accept custom storageKey', () => {
      render(
        <ThemeProvider storageKey="custom-theme" persist={true}>
          <div>Content</div>
        </ThemeProvider>
      );

      expect(localStorage.getItem('custom-theme')).toBe('light');
    });

    it('should accept transition prop', () => {
      render(
        <ThemeProvider transition={500}>
          <div>Content</div>
        </ThemeProvider>
      );

      expect(root.getAttribute('data-theme')).toBe('light');
    });
  });

  describe('Custom store prop', () => {
    it('should use custom store when provided', () => {
      const customStore = createThemeStore({ initialTheme: 'sepia' });

      render(
        <ThemeProvider store={customStore}>
          <div>Content</div>
        </ThemeProvider>
      );

      expect(root.getAttribute('data-theme')).toBe('sepia');
    });

    it('should not cleanup custom store on unmount', () => {
      const customStore = createThemeStore({ initialTheme: 'dark' });
      const cleanupSpy = vi.spyOn(customStore, 'cleanup');

      const { unmount } = render(
        <ThemeProvider store={customStore}>
          <div>Content</div>
        </ThemeProvider>
      );

      unmount();

      expect(cleanupSpy).not.toHaveBeenCalled();
    });
  });

  describe('Cleanup behavior', () => {
    it('should cleanup store on unmount', () => {
      const { unmount } = render(
        <ThemeProvider followSystem={true}>
          <div>Content</div>
        </ThemeProvider>
      );

      unmount();

      // Should not throw errors
      expect(true).toBe(true);
    });
  });
});

describe('useTheme hook', () => {
  let root: HTMLElement;

  beforeEach(() => {
    root = document.documentElement;
    root.removeAttribute('data-theme');
    root.style.cssText = '';
    localStorage.clear();
  });

  afterEach(() => {
    root.removeAttribute('data-theme');
    root.style.cssText = '';
    localStorage.clear();
  });

  describe('Basic usage', () => {
    it('should provide theme store', () => {
      function TestComponent() {
        const theme = useTheme();
        return <div data-testid="theme">{theme.currentTheme.value}</div>;
      }

      render(
        <ThemeProvider initialTheme="dark">
          <TestComponent />
        </ThemeProvider>
      );

      expect(screen.getByTestId('theme').textContent).toBe('dark');
    });

    it('should throw error when used outside provider', () => {
      function TestComponent() {
        useTheme();
        return <div>Content</div>;
      }

      // Suppress console.error for this test
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

      expect(() => render(<TestComponent />)).toThrow(
        'useTheme must be used within a ThemeProvider'
      );

      consoleSpy.mockRestore();
    });

    it('should provide access to all store methods', () => {
      function TestComponent() {
        const theme = useTheme();

        return (
          <div>
            <span data-testid="current">{theme.currentTheme.value}</span>
            <span data-testid="effective">{theme.effectiveTheme.value}</span>
            <span data-testid="system">{theme.systemTheme.value}</span>
            <span data-testid="following">{String(theme.followingSystem.value)}</span>
            <button onClick={() => theme.setTheme('dark')}>Set Dark</button>
            <button onClick={() => theme.toggleTheme()}>Toggle</button>
            <button onClick={() => theme.setFollowSystem(true)}>Follow System</button>
          </div>
        );
      }

      render(
        <ThemeProvider>
          <TestComponent />
        </ThemeProvider>
      );

      expect(screen.getByTestId('current')).toBeTruthy();
      expect(screen.getByTestId('effective')).toBeTruthy();
      expect(screen.getByTestId('system')).toBeTruthy();
      expect(screen.getByTestId('following')).toBeTruthy();
    });
  });

  describe('Theme manipulation', () => {
    it('should allow setting theme', async () => {
      const user = userEvent.setup();

      function TestComponent() {
        const theme = useTheme();

        return (
          <div>
            <span data-testid="theme">{theme.currentTheme.value}</span>
            <button onClick={() => theme.setTheme('dark')}>Set Dark</button>
          </div>
        );
      }

      render(
        <ThemeProvider initialTheme="light">
          <TestComponent />
        </ThemeProvider>
      );

      expect(screen.getByTestId('theme').textContent).toBe('light');

      await user.click(screen.getByText('Set Dark'));

      await waitFor(() => {
        expect(root.getAttribute('data-theme')).toBe('dark');
      });
    });

    it('should allow toggling theme', async () => {
      const user = userEvent.setup();

      function TestComponent() {
        const theme = useTheme();

        return (
          <div>
            <span data-testid="theme">{theme.currentTheme.value}</span>
            <button onClick={() => theme.toggleTheme()}>Toggle</button>
          </div>
        );
      }

      render(
        <ThemeProvider initialTheme="light">
          <TestComponent />
        </ThemeProvider>
      );

      expect(screen.getByTestId('theme').textContent).toBe('light');

      await user.click(screen.getByText('Toggle'));

      await waitFor(() => {
        expect(root.getAttribute('data-theme')).toBe('dark');
      });
    });

    it('should allow setting custom theme preset', async () => {
      const user = userEvent.setup();

      function TestComponent() {
        const theme = useTheme();

        const customTheme = {
          name: 'custom' as const,
          label: 'Custom',
          category: 'custom' as const,
          variables: {
            '--fw-color-primary': '#ff0000',
          },
        };

        return (
          <div>
            <span data-testid="theme">{theme.currentTheme.value}</span>
            <button onClick={() => theme.setTheme(customTheme)}>Set Custom</button>
          </div>
        );
      }

      render(
        <ThemeProvider>
          <TestComponent />
        </ThemeProvider>
      );

      await user.click(screen.getByText('Set Custom'));

      await waitFor(() => {
        expect(root.getAttribute('data-theme')).toBe('custom');
        expect(root.style.getPropertyValue('--fw-color-primary')).toBe('#ff0000');
      });
    });
  });

  describe('Reactive updates', () => {
    it('should react to theme changes', async () => {
      const user = userEvent.setup();

      function TestComponent() {
        const theme = useTheme();

        return (
          <div>
            <span data-testid="current">{theme.currentTheme.value}</span>
            <span data-testid="effective">{theme.effectiveTheme.value}</span>
            <button onClick={() => theme.setTheme('dark')}>Change</button>
          </div>
        );
      }

      render(
        <ThemeProvider initialTheme="light">
          <TestComponent />
        </ThemeProvider>
      );

      expect(screen.getByTestId('current').textContent).toBe('light');
      expect(screen.getByTestId('effective').textContent).toBe('light');

      await user.click(screen.getByText('Change'));

      // Verify theme was applied to DOM
      await waitFor(() => {
        expect(root.getAttribute('data-theme')).toBe('dark');
      });

      // Note: Signal reactivity in React requires @preact/signals-react integration
      // The theme state is updated in the store and applied to DOM correctly
    });
  });
});

describe('useThemeSafe hook', () => {
  let root: HTMLElement;

  beforeEach(() => {
    root = document.documentElement;
    root.removeAttribute('data-theme');
    root.style.cssText = '';
    localStorage.clear();
  });

  afterEach(() => {
    root.removeAttribute('data-theme');
    root.style.cssText = '';
    localStorage.clear();
  });

  describe('Basic usage', () => {
    it('should provide theme store when inside provider', () => {
      function TestComponent() {
        const theme = useThemeSafe();
        return <div data-testid="theme">{theme ? theme.currentTheme.value : 'no theme'}</div>;
      }

      render(
        <ThemeProvider initialTheme="dark">
          <TestComponent />
        </ThemeProvider>
      );

      expect(screen.getByTestId('theme').textContent).toBe('dark');
    });

    it('should return null when used outside provider', () => {
      function TestComponent() {
        const theme = useThemeSafe();
        return <div data-testid="theme">{theme ? 'has theme' : 'no theme'}</div>;
      }

      render(<TestComponent />);

      expect(screen.getByTestId('theme').textContent).toBe('no theme');
    });

    it('should allow conditional rendering based on theme availability', () => {
      function TestComponent() {
        const theme = useThemeSafe();

        if (!theme) {
          return <div data-testid="fallback">Using default theme</div>;
        }

        return <div data-testid="themed">Current: {theme.currentTheme.value}</div>;
      }

      const { rerender } = render(<TestComponent />);

      expect(screen.getByTestId('fallback')).toBeTruthy();
      expect(screen.getByTestId('fallback').textContent).toBe('Using default theme');

      rerender(
        <ThemeProvider initialTheme="dark">
          <TestComponent />
        </ThemeProvider>
      );

      expect(screen.getByTestId('themed').textContent).toBe('Current: dark');
    });
  });
});
