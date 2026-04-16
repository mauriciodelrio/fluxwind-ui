import "@testing-library/jest-dom";
import { cleanup } from "@testing-library/react";
import { afterEach, vi } from "vitest";

// Automatically clean up DOM after each test
afterEach(() => {
  cleanup();
});

// jsdom does not implement scrollIntoView — stub it globally so component
// useEffect hooks that call scrollIntoView do not throw in tests.
window.HTMLElement.prototype.scrollIntoView = vi.fn();

// jsdom does not implement matchMedia — stub it so useDarkMode and other
// hooks that call window.matchMedia do not throw in tests.
// Returns light-mode by default (matches: false).
Object.defineProperty(window, "matchMedia", {
  writable: true,
  configurable: true,
  value: vi.fn((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});
