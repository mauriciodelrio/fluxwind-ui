import '@testing-library/jest-dom';
import { vi } from 'vitest';

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query: string) => ({
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

// Mock window.getComputedStyle for focus tests
const originalGetComputedStyle = window.getComputedStyle;
window.getComputedStyle = (element: Element) => {
  const styles = originalGetComputedStyle(element);
  const htmlElement = element as HTMLElement;

  // Check for inline styles
  const inlineDisplay = htmlElement.style.display;
  const inlineVisibility = htmlElement.style.visibility;

  return {
    ...styles,
    display: inlineDisplay || styles.display || 'block',
    visibility: inlineVisibility || styles.visibility || 'visible',
  } as CSSStyleDeclaration;
};
