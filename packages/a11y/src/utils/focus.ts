/**
 * Focusable element selector
 */
const FOCUSABLE_SELECTOR = [
  'a[href]:not([tabindex="-1"])',
  'button:not([disabled]):not([tabindex="-1"])',
  'textarea:not([disabled]):not([tabindex="-1"])',
  'input:not([disabled]):not([tabindex="-1"])',
  'select:not([disabled]):not([tabindex="-1"])',
  '[tabindex]:not([tabindex="-1"])',
  '[contenteditable="true"]:not([tabindex="-1"])',
].join(',');

/**
 * Get all focusable elements within a container
 */
export const getFocusableElements = (container: HTMLElement): HTMLElement[] => {
  return Array.from(container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)).filter(
    (element) => {
      // Check if element has hidden attribute
      if (element.hasAttribute('hidden')) return false;

      // Check computed visibility
      const computedStyle = window.getComputedStyle(element);
      if (computedStyle.visibility === 'hidden' || computedStyle.display === 'none') {
        return false;
      }

      return true;
    }
  );
};

/**
 * Get the first focusable element within a container
 */
export const getFirstFocusable = (container: HTMLElement): HTMLElement | null => {
  const focusableElements = getFocusableElements(container);
  return focusableElements[0] || null;
};

/**
 * Get the last focusable element within a container
 */
export const getLastFocusable = (container: HTMLElement): HTMLElement | null => {
  const focusableElements = getFocusableElements(container);
  return focusableElements[focusableElements.length - 1] || null;
};

/**
 * Trap focus within a container
 */
export const trapFocus = (container: HTMLElement, event: KeyboardEvent): void => {
  const focusableElements = getFocusableElements(container);
  if (focusableElements.length === 0) return;

  const firstElement = focusableElements[0];
  const lastElement = focusableElements[focusableElements.length - 1];

  if (event.key === 'Tab') {
    if (event.shiftKey && document.activeElement === firstElement) {
      event.preventDefault();
      if (lastElement) lastElement.focus();
    } else if (!event.shiftKey && document.activeElement === lastElement) {
      event.preventDefault();
      if (firstElement) firstElement.focus();
    }
  }
};

/**
 * Focus the first element in a container
 */
export const focusFirst = (container: HTMLElement): void => {
  const firstElement = getFirstFocusable(container);
  if (firstElement) {
    firstElement.focus();
  }
};

/**
 * Focus the last element in a container
 */
export const focusLast = (container: HTMLElement): void => {
  const lastElement = getLastFocusable(container);
  if (lastElement) {
    lastElement.focus();
  }
};

/**
 * Save and restore focus
 */
export class FocusManager {
  private previousFocus: HTMLElement | null = null;

  /**
   * Save the currently focused element
   */
  save(): void {
    this.previousFocus = document.activeElement as HTMLElement;
  }

  /**
   * Restore focus to the previously saved element
   */
  restore(): void {
    if (this.previousFocus && document.contains(this.previousFocus)) {
      this.previousFocus.focus();
    }
  }

  /**
   * Clear saved focus
   */
  clear(): void {
    this.previousFocus = null;
  }
}
