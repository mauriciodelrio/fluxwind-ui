/**
 * Keyboard key constants for accessibility
 */
export const KEYS = {
  ENTER: 'Enter',
  SPACE: ' ',
  ESCAPE: 'Escape',
  TAB: 'Tab',
  ARROW_UP: 'ArrowUp',
  ARROW_DOWN: 'ArrowDown',
  ARROW_LEFT: 'ArrowLeft',
  ARROW_RIGHT: 'ArrowRight',
  HOME: 'Home',
  END: 'End',
  PAGE_UP: 'PageUp',
  PAGE_DOWN: 'PageDown',
} as const;

export type KeyboardKey = (typeof KEYS)[keyof typeof KEYS];

/**
 * Check if a keyboard event matches a specific key
 */
export const isKey = (event: KeyboardEvent, key: KeyboardKey): boolean => {
  return event.key === key;
};

/**
 * Check if a keyboard event is an activation key (Enter or Space)
 */
export const isActivationKey = (event: KeyboardEvent): boolean => {
  return event.key === KEYS.ENTER || event.key === KEYS.SPACE;
};

/**
 * Check if a keyboard event is an arrow key
 */
export const isArrowKey = (event: KeyboardEvent): boolean => {
  const arrowKeys = [KEYS.ARROW_UP, KEYS.ARROW_DOWN, KEYS.ARROW_LEFT, KEYS.ARROW_RIGHT] as string[];
  return arrowKeys.includes(event.key);
};

/**
 * Handle keyboard navigation
 */
export const handleKeyboardNavigation = (
  event: KeyboardEvent,
  handlers: Partial<Record<KeyboardKey, (event: KeyboardEvent) => void>>
): void => {
  const handler = handlers[event.key as KeyboardKey];
  if (handler) {
    handler(event);
  }
};
