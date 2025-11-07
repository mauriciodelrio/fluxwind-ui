// Store
export {
  preferences,
  announcements,
  shouldReduceMotion,
  isHighContrast,
  isFocusVisible,
  prefersDarkMode,
  shouldReduceTransparency,
  isRTL,
  setPreferences,
  setCustomPreference,
  getCustomPreference,
  announce,
  clearAnnouncements,
  type A11yPreferences,
  type Announcement,
} from './store';

// Hooks
export { useId } from './hooks/useId';
export { useFocusTrap } from './hooks/useFocusTrap';
export { useKeyboard } from './hooks/useKeyboard';
export { useAriaLive, useAnnouncement } from './hooks/useAriaLive';
export { useA11yPreferences } from './hooks/useA11yPreferences';

// Components
export { VisuallyHidden, type VisuallyHiddenProps } from './components/VisuallyHidden';
export { AriaLive, type AriaLiveProps } from './components/AriaLive';

// Utils - Keyboard
export {
  KEYS,
  isKey,
  isActivationKey,
  isArrowKey,
  handleKeyboardNavigation,
  type KeyboardKey,
} from './utils/keyboard';

// Utils - ARIA
export {
  getButtonAriaProps,
  getDialogAriaProps,
  getMenuAriaProps,
  getMenuItemAriaProps,
  getLiveRegionAriaProps,
  buildAriaLabelledBy,
  buildAriaDescribedBy,
  type AriaRole,
} from './utils/aria';

// Utils - Focus
export {
  getFocusableElements,
  getFirstFocusable,
  getLastFocusable,
  trapFocus,
  focusFirst,
  focusLast,
  FocusManager,
} from './utils/focus';
