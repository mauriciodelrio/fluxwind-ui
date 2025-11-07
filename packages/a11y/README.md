# @fluxwind/a11y

> Accessibility utilities and hooks for FluxWind UI - WCAG compliant, signals-based, zero re-renders

[![Coverage](https://img.shields.io/badge/coverage-97.6%25-brightgreen.svg)](https://github.com/mauriciodelrio/fluxwind-ui)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

## ✨ Features

- 🎯 **WCAG Compliant** - Built with web accessibility standards in mind
- 🚀 **Zero Re-renders** - Powered by Preact Signals for optimal performance
- ⌨️ **Keyboard Navigation** - Complete keyboard support utilities
- 🔊 **Screen Reader** - ARIA live regions and announcements
- 🎨 **Visual Hiding** - Hide content visually while keeping it accessible
- 🎛️ **Focus Management** - Focus trap, focus restoration, and navigation
- 🌐 **Universal** - Works with any React-based framework
- 📦 **Type-Safe** - Full TypeScript support with autocomplete
- 🧪 **Well Tested** - 97.6% code coverage
- 🎨 **Extensible** - Custom preferences for team-specific needs
- 🌍 **i18n Ready** - RTL support and dark mode detection

## 📦 Installation

```bash
npm install @fluxwind/a11y
# or
yarn add @fluxwind/a11y
# or
pnpm add @fluxwind/a11y
```

## 🚀 Quick Start

```tsx
import { announce, useId, useFocusTrap, VisuallyHidden, KEYS } from '@fluxwind/a11y';

function MyComponent() {
  const id = useId('dialog');
  const dialogRef = useFocusTrap({ active: true });

  return (
    <div ref={dialogRef} role="dialog" aria-labelledby={id}>
      <h2 id={id}>Accessible Dialog</h2>
      <VisuallyHidden>This content is only for screen readers</VisuallyHidden>
      <button onClick={() => announce('Action completed!')}>Click me</button>
    </div>
  );
}
```

## 📚 API Reference

### Hooks

#### `useId(prefix?: string)`

Generate unique IDs for accessibility attributes.

```tsx
const MyForm = () => {
  const labelId = useId('label');
  const errorId = useId('error');

  return (
    <>
      <label id={labelId}>Username</label>
      <input aria-labelledby={labelId} aria-describedby={errorId} />
      <span id={errorId}>Required field</span>
    </>
  );
};
```

#### `useFocusTrap(options)`

Trap focus within a container (for modals, dialogs, etc.)

```tsx
const Modal = ({ isOpen, onClose }) => {
  const modalRef = useFocusTrap({
    active: isOpen,
    autoFocus: true,
    restoreFocus: true,
  });

  if (!isOpen) return null;

  return (
    <div ref={modalRef} role="dialog">
      <h2>Modal Title</h2>
      <button onClick={onClose}>Close</button>
    </div>
  );
};
```

**Options:**

- `active?: boolean` - Whether the focus trap is active
- `autoFocus?: boolean` - Focus first element on mount
- `restoreFocus?: boolean` - Restore focus when deactivated

#### `useKeyboard(handlers)`

Handle keyboard events declaratively.

```tsx
const Menu = () => {
  const keyboardProps = useKeyboard({
    [KEYS.ESCAPE]: () => closeMenu(),
    [KEYS.ARROW_DOWN]: () => focusNextItem(),
    [KEYS.ARROW_UP]: () => focusPrevItem(),
    [KEYS.ENTER]: () => selectItem(),
  });

  return (
    <div role="menu" {...keyboardProps}>
      ...
    </div>
  );
};
```

#### `useAriaLive()`

Announce messages to screen readers.

```tsx
const Notifications = () => {
  const { announcePolite, announceAssertive } = useAriaLive();

  return (
    <>
      <button onClick={() => announcePolite('Item added to cart')}>Add to Cart</button>
      <button onClick={() => announceAssertive('Error occurred!')}>Delete</button>
    </>
  );
};
```

#### `useAnnouncement(message, politeness, deps)`

Announce on mount or when dependencies change.

```tsx
const LoadingState = ({ isLoading }) => {
  useAnnouncement(isLoading ? 'Loading...' : 'Content loaded', 'polite', [isLoading]);

  return <div>...</div>;
};
```

#### `useA11yPreferences()`

Access and manage user's accessibility preferences.

```tsx
const AnimatedComponent = () => {
  const {
    shouldReduceMotion,
    isHighContrast,
    prefersDarkMode,
    shouldReduceTransparency,
    isRTL,
    setPreferences,
    setCustomPreference,
    getCustomPreference,
  } = useA11yPreferences();

  return (
    <div
      className={cn({
        'animate-fade': !shouldReduceMotion,
        'high-contrast': isHighContrast,
        dark: prefersDarkMode,
      })}
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      Content
    </div>
  );
};
```

**Available preferences:**

- `shouldReduceMotion: boolean` - User prefers reduced motion
- `isHighContrast: boolean` - User prefers high contrast
- `isFocusVisible: boolean` - Show focus indicators
- `prefersDarkMode: boolean` - User prefers dark color scheme
- `shouldReduceTransparency: boolean` - User prefers reduced transparency
- `isRTL: boolean` - Text direction is right-to-left

**Custom preferences:**

```tsx
const MyComponent = () => {
  const { setCustomPreference, getCustomPreference } = useA11yPreferences();

  // Set custom preference
  setCustomPreference('fontSize', 18);
  setCustomPreference('enableAnimations', false);

  // Get custom preference
  const fontSize = getCustomPreference('fontSize'); // 18

  return <div style={{ fontSize: `${fontSize}px` }}>...</div>;
};
```

### Components

#### `<VisuallyHidden>`

Hide content visually while keeping it accessible to screen readers.

```tsx
<button>
  <Icon name="trash" />
  <VisuallyHidden>Delete item</VisuallyHidden>
</button>
```

**Props:**

- `children: ReactNode` - Content to hide visually
- `as?: keyof JSX.IntrinsicElements` - HTML element (default: 'span')
- `className?: string` - Additional classes

#### `<AriaLive>`

Render a live region for announcements.

```tsx
<>
  <AriaLive politeness="polite" />
  <AriaLive politeness="assertive" />
</>
```

**Props:**

- `politeness?: 'polite' | 'assertive' | 'off'` - Announcement priority
- `className?: string` - Additional classes

### Utilities - Keyboard

```tsx
import { KEYS, isKey, isActivationKey, isArrowKey } from '@fluxwind/a11y';

// Keyboard constants
KEYS.ENTER; // 'Enter'
KEYS.SPACE; // ' '
KEYS.ESCAPE; // 'Escape'
KEYS.TAB; // 'Tab'
KEYS.ARROW_UP; // 'ArrowUp'
// ... and more

// Check specific key
if (isKey(event, KEYS.ESCAPE)) {
  closeDialog();
}

// Check activation keys (Enter or Space)
if (isActivationKey(event)) {
  toggleButton();
}

// Check arrow keys
if (isArrowKey(event)) {
  navigate(event.key);
}
```

### Utilities - ARIA

```tsx
import { getButtonAriaProps, getDialogAriaProps, buildAriaLabelledBy } from '@fluxwind/a11y';

// Button props
const buttonProps = getButtonAriaProps({
  pressed: isPressed,
  expanded: isExpanded,
  disabled: isDisabled,
});

// Dialog props
const dialogProps = getDialogAriaProps({
  label: 'Confirmation',
  modal: true,
});

// Build composite IDs
const labelledBy = buildAriaLabelledBy(titleId, subtitleId);
```

**Available helpers:**

- `getButtonAriaProps(options)`
- `getDialogAriaProps(options)`
- `getMenuAriaProps(options)`
- `getMenuItemAriaProps(options)`
- `getLiveRegionAriaProps(options)`
- `buildAriaLabelledBy(...ids)`
- `buildAriaDescribedBy(...ids)`

### Utilities - Focus

```tsx
import { getFocusableElements, trapFocus, focusFirst, FocusManager } from '@fluxwind/a11y';

// Get all focusable elements
const focusable = getFocusableElements(container);

// Trap focus
document.addEventListener('keydown', (e) => {
  trapFocus(container, e);
});

// Focus management
focusFirst(container);
focusLast(container);

// Save and restore focus
const focusManager = new FocusManager();
focusManager.save();
// ... do something ...
focusManager.restore();
```

### Store

Direct access to signals store (advanced usage).

```tsx
import {
  preferences,
  announcements,
  shouldReduceMotion,
  setPreferences,
  announce,
} from '@fluxwind/a11y';

// Read preferences
console.log(preferences.value.reducedMotion);

// Update preferences
setPreferences({ reducedMotion: true });

// Announce
announce('Message', 'polite');
```

## 🎯 Best Practices

### 1. Always provide text alternatives

```tsx
// ❌ Bad
<button><Icon name="close" /></button>

// ✅ Good
<button>
  <Icon name="close" />
  <VisuallyHidden>Close dialog</VisuallyHidden>
</button>
```

### 2. Use semantic HTML

```tsx
// ❌ Bad
<div onClick={handleClick}>Click me</div>

// ✅ Good
<button onClick={handleClick}>Click me</button>
```

### 3. Implement keyboard navigation

```tsx
// ✅ Good
const Menu = () => {
  const keyboardProps = useKeyboard({
    [KEYS.ESCAPE]: closeMenu,
    [KEYS.ARROW_DOWN]: focusNext,
    [KEYS.ARROW_UP]: focusPrev,
  });

  return (
    <div role="menu" {...keyboardProps}>
      ...
    </div>
  );
};
```

### 4. Trap focus in modals

```tsx
const Modal = ({ isOpen }) => {
  const modalRef = useFocusTrap({
    active: isOpen,
    restoreFocus: true,
  });

  return (
    <div ref={modalRef} role="dialog">
      ...
    </div>
  );
};
```

### 5. Announce dynamic content

```tsx
const Search = () => {
  const { announcePolite } = useAriaLive();

  useEffect(() => {
    if (results.length) {
      announcePolite(`${results.length} results found`);
    }
  }, [results]);

  return <ResultsList results={results} />;
};
```

### 6. Respect user preferences

```tsx
const Animation = () => {
  const { shouldReduceMotion } = useA11yPreferences();

  return <motion.div animate={shouldReduceMotion ? {} : { scale: 1.2 }}>Content</motion.div>;
};
```

## 🧪 Testing

All utilities are thoroughly tested with 97.77% coverage:

```bash
pnpm test
pnpm test:coverage
```

## 📄 License

MIT © Mauricio Del Rio

## 🤝 Contributing

Contributions are welcome! Please read our contributing guidelines before submitting PRs.

---

Built with ❤️ for accessible web experiences
