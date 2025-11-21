# Fluxwind UI - Themes Package Documentation

Complete theming system with design tokens, CSS variables, and React integration.

## Table of Contents

1. [Introduction](#introduction)
2. [Quick Start](#quick-start)
3. [Core Concepts](#core-concepts)
4. [Design Tokens](#design-tokens)
5. [CSS Variables](#css-variables)
6. [Theme System](#theme-system)
7. [React Integration](#react-integration)
8. [Tailwind Integration](#tailwind-integration)
9. [Advanced Usage](#advanced-usage)
10. [API Reference](#api-reference)

---

## Introduction

The Fluxwind themes package provides a comprehensive theming system built on three foundational layers:

**Design Tokens** → Raw values (colors, spacing, typography)  
**CSS Variables** → Dynamic runtime customization  
**Theme Utilities** → Programmatic theme management

### Key Features

- **280+ Design Tokens** including 26 color palettes with 11 shades each
- **150+ Base CSS Variables** plus 130+ component-specific variables
- **Signals-Based Reactivity** using Preact Signals for zero re-renders
- **Full TypeScript Support** with comprehensive type definitions
- **Built-in Themes** (light, dark, sepia) with easy custom theme creation
- **System Theme Detection** with automatic light/dark mode switching
- **Persistent Storage** with localStorage and custom storage adapters
- **SSR Compatible** with proper server-side rendering support

---

## Quick Start

### Installation

```bash
# Using pnpm
pnpm add @fluxwind/themes

# Using npm
npm install @fluxwind/themes

# Using yarn
yarn add @fluxwind/themes
```

### Basic Setup

```typescript
// 1. Import CSS variables
import '@fluxwind/themes/variables.css';
import '@fluxwind/themes/variables-components.css';

// 2. Import theme utilities
import { applyTheme, initTheme } from '@fluxwind/themes';

// 3. Initialize theme on app load
initTheme({
  followSystem: true, // Auto-detect system preference
  defaultTheme: 'light',
  persist: true,
});

// 4. Apply themes programmatically
applyTheme('dark');
```

### React Integration

```tsx
import { ThemeProvider, useTheme } from '@fluxwind/themes';

function App() {
  return (
    <ThemeProvider initialTheme="light" followSystem={true} persist={true}>
      <YourApp />
    </ThemeProvider>
  );
}

function ThemeToggle() {
  const theme = useTheme();

  return <button onClick={() => theme.toggleTheme()}>Current: {theme.effectiveTheme.value}</button>;
}
```

### Tailwind Integration

```javascript
// tailwind.config.js
import { fluxwindConfig } from '@fluxwind/themes';

export default {
  presets: [fluxwindConfig],
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  // Your custom config...
};
```

---

## Core Concepts

### 1. Design Tokens

Design tokens are the atomic values of your design system. They are JavaScript objects that export raw values like colors, spacing scales, and typography settings.

```typescript
import { fluxwindColors, spacingTokens, typographyTokens } from '@fluxwind/themes';

// Use tokens directly in JavaScript
const primaryColor = fluxwindColors.sapphire[500]; // '#3b82f6'
const baseSpacing = spacingTokens[4]; // '1rem'
```

**Purpose**: Source of truth for design values, consumed by Tailwind config and CSS variables.

### 2. CSS Variables

CSS custom properties that can be dynamically changed at runtime. They bridge design tokens to actual CSS styling.

```css
:root {
  --fw-color-primary: #3b82f6;
  --fw-spacing-4: 1rem;
  --fw-button-bg: var(--fw-color-primary);
}
```

```typescript
import { setCSSVariable, getCSSVariable } from '@fluxwind/themes';

// Get current value
const primary = getCSSVariable('--fw-color-primary');

// Set new value
setCSSVariable('--fw-color-primary', '#ff0000');
```

**Purpose**: Runtime customization, theming, and component styling.

### 3. Themes

A theme is a coordinated set of CSS variable overrides that change the visual appearance of your application.

```typescript
import { createTheme, applyTheme } from '@fluxwind/themes';

const oceanTheme = createTheme({
  name: 'ocean',
  label: 'Ocean Blue',
  variables: {
    '--fw-color-primary': '#06b6d4',
    '--fw-color-secondary': '#0891b2',
  },
  extends: 'light',
});

applyTheme(oceanTheme);
```

**Purpose**: Consistent visual identity that can be switched at runtime.

---

## Design Tokens

### Color Tokens

The package includes **26 color palettes**, each with 11 shades (50-950):

#### Tailwind Default Colors

All standard Tailwind colors are available: `slate`, `gray`, `zinc`, `neutral`, `stone`, `red`, `orange`, `amber`, `yellow`, `lime`, `green`, `emerald`, `teal`, `cyan`, `sky`, `blue`, `indigo`, `violet`, `purple`, `fuchsia`, `pink`, `rose`.

#### Fluxwind Extended Colors (26 palettes)

```typescript
import {
  ocean,
  tangerine,
  sapphire,
  mint,
  lavender,
  crimson,
  emerald,
  sunset,
  midnight,
  coral,
  forest,
  honey,
  plum,
  slate,
  sky,
  cherry,
  moss,
  sand,
  storm,
  blush,
  navy,
  rust,
  sage,
  charcoal,
  cream,
  peacock,
} from '@fluxwind/themes';

// Each palette has 11 shades
const primary = sapphire[500]; // '#3b82f6'
const hover = sapphire[600]; // '#2563eb'
```

**Usage in Tailwind:**

```tsx
<div className="bg-sapphire-500 text-ocean-50">Fluxwind Colors</div>
```

### Spacing Tokens

Consistent spacing scale based on 0.25rem (4px) increments:

```typescript
import { spacingTokens } from '@fluxwind/themes';

// Available values: 0, 1, 2, 3, 4, 5, 6, 8, 10, 12, 16, 20, 24
const spacing = spacingTokens[4]; // '1rem' (16px)
```

### Typography Tokens

Font families, sizes, weights, and line heights:

```typescript
import { typographyTokens } from '@fluxwind/themes';

const {
  fontFamily, // { sans, mono }
  fontSize, // { xs, sm, base, lg, xl, 2xl, 3xl, 4xl }
  fontWeight, // { light, normal, medium, semibold, bold }
  lineHeight, // { tight, normal, relaxed }
  letterSpacing,
} = typographyTokens;
```

### Shadow Tokens

Box shadows for depth and elevation:

```typescript
import { shadowTokens, semanticShadows, coloredShadows } from '@fluxwind/themes';

// Basic shadows: xs, sm, base, md, lg, xl, inner, none
// Semantic shadows: focus, focus-error
// Colored shadows: primary, secondary, success, error, warning
```

### Animation Tokens

Duration, easing, and keyframes:

```typescript
import {
  animationDurations, // instant, fast, base, moderate, slow
  animationEasings, // standard, decelerate, accelerate
  extendedAnimationKeyframes, // fadeIn, slideUp, scaleIn, etc.
} from '@fluxwind/themes';
```

### Border Tokens

Border widths and radii:

```typescript
import { borderWidth, borderRadius } from '@fluxwind/themes';

// Widths: 0, 1, 2, 4, 8
// Radii: none, sm, base, md, lg, xl, 2xl, full
```

---

## CSS Variables

### Base Variables (150+)

#### Color Variables

```css
/* Primary Colors */
--fw-color-primary: #3b82f6;
--fw-color-primary-hover: #2563eb;
--fw-color-primary-active: #1d4ed8;
--fw-color-primary-light: #60a5fa;
--fw-color-primary-dark: #1e40af;

/* Secondary Colors */
--fw-color-secondary: #8b5cf6;
--fw-color-secondary-hover: #7c3aed;
--fw-color-secondary-active: #6d28d9;

/* Semantic Colors */
--fw-color-success: #22c55e;
--fw-color-warning: #f59e0b;
--fw-color-error: #ef4444;
--fw-color-info: #3b82f6;

/* Background Colors */
--fw-color-bg-primary: #ffffff;
--fw-color-bg-secondary: #f9fafb;
--fw-color-bg-tertiary: #f3f4f6;
--fw-color-bg-inverse: #111827;

/* Text Colors */
--fw-color-text-primary: #111827;
--fw-color-text-secondary: #4b5563;
--fw-color-text-tertiary: #6b7280;
--fw-color-text-inverse: #ffffff;
--fw-color-text-disabled: #9ca3af;

/* Border Colors */
--fw-color-border-primary: #d1d5db;
--fw-color-border-secondary: #e5e7eb;
--fw-color-border-focus: var(--fw-color-primary);
--fw-color-border-error: var(--fw-color-error);
```

#### Spacing Variables

```css
--fw-spacing-0: 0;
--fw-spacing-1: 0.25rem; /* 4px */
--fw-spacing-2: 0.5rem; /* 8px */
--fw-spacing-3: 0.75rem; /* 12px */
--fw-spacing-4: 1rem; /* 16px */
--fw-spacing-5: 1.25rem; /* 20px */
--fw-spacing-6: 1.5rem; /* 24px */
--fw-spacing-8: 2rem; /* 32px */
--fw-spacing-10: 2.5rem; /* 40px */
--fw-spacing-12: 3rem; /* 48px */
--fw-spacing-16: 4rem; /* 64px */
--fw-spacing-20: 5rem; /* 80px */
--fw-spacing-24: 6rem; /* 96px */
```

#### Typography Variables

```css
/* Font Families */
--fw-font-sans: system-ui, -apple-system, sans-serif;
--fw-font-mono: 'SF Mono', Monaco, 'Cascadia Code', monospace;

/* Font Sizes */
--fw-font-size-xs: 0.75rem; /* 12px */
--fw-font-size-sm: 0.875rem; /* 14px */
--fw-font-size-base: 1rem; /* 16px */
--fw-font-size-lg: 1.125rem; /* 18px */
--fw-font-size-xl: 1.25rem; /* 20px */
--fw-font-size-2xl: 1.5rem; /* 24px */
--fw-font-size-3xl: 1.875rem; /* 30px */
--fw-font-size-4xl: 2.25rem; /* 36px */

/* Font Weights */
--fw-font-weight-light: 300;
--fw-font-weight-normal: 400;
--fw-font-weight-medium: 500;
--fw-font-weight-semibold: 600;
--fw-font-weight-bold: 700;

/* Line Heights */
--fw-line-height-tight: 1.25;
--fw-line-height-normal: 1.5;
--fw-line-height-relaxed: 1.75;
```

### Component Variables (130+)

#### Button Variables

```css
/* Button Base */
--fw-button-bg: var(--fw-color-primary);
--fw-button-color: var(--fw-color-white);
--fw-button-border: transparent;
--fw-button-border-width: 1px;
--fw-button-border-radius: var(--fw-radius-base);
--fw-button-padding-x: var(--fw-spacing-4);
--fw-button-padding-y: var(--fw-spacing-2);
--fw-button-font-size: var(--fw-font-size-base);
--fw-button-font-weight: var(--fw-font-weight-medium);
--fw-button-shadow: var(--fw-shadow-sm);
--fw-button-transition: all 150ms ease-in-out;

/* Button States */
--fw-button-bg-hover: var(--fw-color-primary-hover);
--fw-button-scale-hover: 1.02;
--fw-button-shadow-hover: var(--fw-shadow-md);
--fw-button-bg-active: var(--fw-color-primary-active);
--fw-button-scale-active: 0.98;
--fw-button-outline-focus: 2px solid var(--fw-color-border-focus);

/* Button Disabled */
--fw-button-bg-disabled: var(--fw-color-gray-300);
--fw-button-opacity-disabled: 0.6;
--fw-button-cursor-disabled: not-allowed;
```

#### Input Variables

```css
/* Input Base */
--fw-input-bg: var(--fw-color-white);
--fw-input-color: var(--fw-color-text-primary);
--fw-input-border: 1px solid var(--fw-color-border-primary);
--fw-input-border-radius: var(--fw-radius-base);
--fw-input-padding-x: var(--fw-spacing-3);
--fw-input-padding-y: var(--fw-spacing-2);
--fw-input-font-size: var(--fw-font-size-base);
--fw-input-shadow: var(--fw-shadow-sm);
--fw-input-placeholder-color: var(--fw-color-text-tertiary);

/* Input States */
--fw-input-border-hover: 1px solid var(--fw-color-border-secondary);
--fw-input-border-focus: 2px solid var(--fw-color-border-focus);
--fw-input-shadow-focus: var(--fw-shadow-focus);
--fw-input-border-error: 2px solid var(--fw-color-border-error);
--fw-input-color-error: var(--fw-color-error);
```

#### Select, Checkbox, Radio, Switch Variables

Similar comprehensive variables are available for all form components. See the complete reference in `variables-components.css`.

### Using CSS Variables in Code

```typescript
import { getCSSVariable, setCSSVariable, getCSSVariables, setCSSVariables } from '@fluxwind/themes';

// Get single variable
const primaryColor = getCSSVariable('--fw-color-primary');

// Set single variable
setCSSVariable('--fw-color-primary', '#ff0000');

// Get multiple variables
const colors = getCSSVariables(['--fw-color-primary', '--fw-color-secondary']);

// Set multiple variables
setCSSVariables({
  '--fw-color-primary': '#ff0000',
  '--fw-color-secondary': '#00ff00',
});
```

---

## Theme System

### Built-in Themes

The package includes three built-in themes:

**Light Theme** - Default, clean and bright  
**Dark Theme** - High contrast dark mode  
**Sepia Theme** - Warm, low blue-light for reading

### Applying Themes

```typescript
import { applyTheme } from '@fluxwind/themes';

// Apply by name
applyTheme('dark');

// Apply with options
applyTheme('dark', {
  persist: true, // Save to localStorage
  transition: 300, // Smooth transition in ms
  storageKey: 'my-theme', // Custom storage key
});
```

### Creating Custom Themes

```typescript
import { createTheme, applyTheme } from '@fluxwind/themes';

const oceanTheme = createTheme({
  name: 'ocean',
  label: 'Ocean Blue',
  variables: {
    // Override any CSS variable
    '--fw-color-primary': '#06b6d4',
    '--fw-color-primary-hover': '#0891b2',
    '--fw-color-primary-active': '#0e7490',
    '--fw-color-secondary': '#22d3ee',
    '--fw-color-bg-primary': '#ecfeff',
    '--fw-color-text-primary': '#164e63',
  },
  extends: 'light', // Base theme to extend
});

applyTheme(oceanTheme);
```

### Theme Utilities

```typescript
import {
  applyTheme,
  getTheme,
  removeTheme,
  initTheme,
  toggleTheme,
  getSystemTheme,
  watchSystemTheme,
} from '@fluxwind/themes';

// Get current theme
const current = getTheme(); // 'dark'

// Initialize on app load
const appliedTheme = initTheme({
  followSystem: true,
  defaultTheme: 'light',
});

// Toggle between light/dark
toggleTheme({ persist: true });

// Remove theme and reset
removeTheme();

// Get system preference
const systemPref = getSystemTheme(); // 'dark' | 'light' | 'no-preference'

// Watch system changes
const cleanup = watchSystemTheme((theme) => {
  console.log('System theme changed:', theme);
  applyTheme(theme);
});

// Later, stop watching
cleanup();
```

### Theme Events

Listen to theme changes:

```typescript
window.addEventListener('themechange', (event: CustomEvent) => {
  const { previous, current, timestamp } = event.detail;
  console.log(`Theme changed from ${previous} to ${current}`);
});
```

### Theme Persistence

Themes are automatically saved to localStorage (or custom storage):

```typescript
import { saveThemePreference, loadThemePreference, clearThemePreference } from '@fluxwind/themes';

// Manual storage operations
saveThemePreference('dark');
const saved = loadThemePreference(); // 'dark'
clearThemePreference();
```

### Custom Storage Adapter

Implement your own storage (e.g., for mobile apps):

```typescript
import { saveThemePreference, type ThemeStorageAdapter } from '@fluxwind/themes';

const asyncStorageAdapter: ThemeStorageAdapter = {
  get: (key) => AsyncStorage.getItem(key),
  set: (key, value) => AsyncStorage.setItem(key, value),
  remove: (key) => AsyncStorage.removeItem(key),
};

saveThemePreference('dark', 'my-theme-key', asyncStorageAdapter);
```

---

## React Integration

### ThemeProvider

Wrap your app with the ThemeProvider:

```tsx
import { ThemeProvider } from '@fluxwind/themes';

function App() {
  return (
    <ThemeProvider
      initialTheme="light"
      followSystem={true}
      persist={true}
      storageKey="my-app-theme"
      transition={200}
    >
      <YourApp />
    </ThemeProvider>
  );
}
```

### useTheme Hook

Access and control themes in components:

```tsx
import { useTheme } from '@fluxwind/themes';

function ThemeControls() {
  const theme = useTheme();

  // Reactive signals (no re-renders!)
  const currentTheme = theme.currentTheme.value;
  const effectiveTheme = theme.effectiveTheme.value;
  const systemTheme = theme.systemTheme.value;
  const followingSystem = theme.followingSystem.value;

  return (
    <div>
      <p>Current theme: {currentTheme}</p>
      <p>Effective theme: {effectiveTheme}</p>
      <p>System theme: {systemTheme}</p>

      <button onClick={() => theme.setTheme('dark')}>Dark</button>
      <button onClick={() => theme.setTheme('light')}>Light</button>
      <button onClick={() => theme.toggleTheme()}>Toggle</button>
      <button onClick={() => theme.setFollowSystem(!followingSystem)}>
        Follow System: {followingSystem ? 'On' : 'Off'}
      </button>
    </div>
  );
}
```

### useThemeSafe Hook

Safe version that doesn't throw if used outside ThemeProvider:

```tsx
import { useThemeSafe } from '@fluxwind/themes';

function OptionalThemeComponent() {
  const theme = useThemeSafe();

  if (!theme) {
    return <div>Theme not available</div>;
  }

  return <div>Current: {theme.currentTheme.value}</div>;
}
```

### Custom Store

Provide your own theme store instance:

```tsx
import { ThemeProvider, createThemeStore } from '@fluxwind/themes';

const customStore = createThemeStore({
  initialTheme: 'dark',
  followSystem: false,
});

function App() {
  return (
    <ThemeProvider store={customStore}>
      <YourApp />
    </ThemeProvider>
  );
}
```

### Signals-Based Reactivity

The theme store uses Preact Signals for reactive state without React re-renders:

```tsx
import { useTheme } from '@fluxwind/themes';

function PerformantComponent() {
  const theme = useTheme();

  // This component never re-renders, but UI updates automatically!
  return <div>Theme: {theme.currentTheme.value}</div>;
}
```

---

## Tailwind Integration

### Configuration

Add Fluxwind config as a preset:

```javascript
// tailwind.config.js
import { fluxwindConfig } from '@fluxwind/themes';

export default {
  presets: [fluxwindConfig],
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      // Your custom extensions...
    },
  },
};
```

### Using Design Tokens in Tailwind

All tokens are available as Tailwind utilities:

```tsx
// Extended color palettes
<div className="bg-sapphire-500 text-ocean-50">
  Fluxwind Colors
</div>

// Semantic shadows
<div className="shadow-focus border-2">
  Focus state
</div>

// Extended animations
<div className="animate-fade-in duration-moderate ease-standard">
  Animated content
</div>
```

### Using CSS Variables in Tailwind

CSS variables are exposed with the `fw-` prefix:

```tsx
// Background colors
<div className="bg-fw-primary text-fw-inverse">
  Primary background
</div>

// Text colors
<p className="text-fw-primary">Primary text</p>
<p className="text-fw-secondary">Secondary text</p>

// Border colors
<div className="border border-fw-focus">
  Focus border
</div>
```

### Arbitrary Values with CSS Variables

Use CSS variables in arbitrary values:

```tsx
<div className="bg-[var(--fw-color-primary)]">
  Direct CSS variable usage
</div>

<button className="px-[var(--fw-spacing-4)] py-[var(--fw-spacing-2)]">
  Custom spacing
</button>
```

---

## Advanced Usage

### Time-Based Theme Switching

Automatically switch themes based on time of day:

```typescript
import { applyTheme } from '@fluxwind/themes';

function applyTimeBasedTheme() {
  const hour = new Date().getHours();

  if (hour >= 6 && hour < 18) {
    applyTheme('light');
  } else {
    applyTheme('dark');
  }
}

// Check every hour
setInterval(applyTimeBasedTheme, 3600000);
applyTimeBasedTheme(); // Initial call
```

### Multi-Theme Application

Support multiple theme categories:

```typescript
import { createTheme, applyTheme } from '@fluxwind/themes';

const themes = {
  professional: createTheme({
    name: 'professional',
    variables: { '--fw-color-primary': '#1e40af' },
  }),
  creative: createTheme({
    name: 'creative',
    variables: { '--fw-color-primary': '#a855f7' },
  }),
  minimal: createTheme({
    name: 'minimal',
    variables: { '--fw-color-primary': '#6b7280' },
  }),
};

function ThemeSwitcher() {
  return (
    <select onChange={(e) => applyTheme(themes[e.target.value])}>
      <option value="professional">Professional</option>
      <option value="creative">Creative</option>
      <option value="minimal">Minimal</option>
    </select>
  );
}
```

### Scoped Themes

Apply themes to specific elements:

```typescript
import { applyTheme } from '@fluxwind/themes';

const container = document.querySelector('.theme-container');

applyTheme('dark', {
  target: container,
  persist: false,
});
```

### Theme Merging

Combine multiple theme configurations:

```typescript
import { mergeThemeVariables, createTheme } from '@fluxwind/themes';

const baseTheme = {
  '--fw-color-primary': '#3b82f6',
  '--fw-color-secondary': '#8b5cf6',
};

const brandOverrides = {
  '--fw-color-primary': '#ff0000',
  '--fw-button-border-radius': '0', // Square buttons
};

const mergedVariables = mergeThemeVariables(baseTheme, brandOverrides);

const brandTheme = createTheme({
  name: 'brand',
  variables: mergedVariables,
});
```

### SSR Considerations

The package is SSR-safe with proper guards:

```typescript
// All window/document access is guarded
import { getTheme, applyTheme } from '@fluxwind/themes';

// Safe to call on server (returns null)
const theme = getTheme();

// Safe to call on server (no-op)
applyTheme('dark');
```

For Next.js app router:

```tsx
'use client';

import { useEffect } from 'react';
import { initTheme } from '@fluxwind/themes';

export default function ThemeInitializer() {
  useEffect(() => {
    initTheme({ followSystem: true });
  }, []);

  return null;
}
```

---

## API Reference

### Theme Utilities

#### `createTheme(config: ThemeConfig): ThemePreset`

Create a custom theme configuration.

```typescript
const theme = createTheme({
  name: 'ocean',
  label: 'Ocean Blue',
  variables: { '--fw-color-primary': '#06b6d4' },
  extends: 'light',
});
```

#### `applyTheme(theme: ThemeNameExtended | ThemeConfig, options?: ApplyThemeOptions): void`

Apply a theme to the document or target element.

```typescript
applyTheme('dark', {
  target: document.documentElement,
  persist: true,
  storageKey: 'theme',
  transition: 300,
});
```

#### `getTheme(target?: HTMLElement): ThemeNameExtended | null`

Get the currently applied theme name.

```typescript
const current = getTheme(); // 'dark'
```

#### `removeTheme(options?: ApplyThemeOptions): void`

Remove the current theme and reset to default.

```typescript
removeTheme({ persist: true });
```

#### `initTheme(options): ThemeNameExtended`

Initialize theme from saved preference or system preference.

```typescript
const applied = initTheme({
  followSystem: true,
  defaultTheme: 'light',
  storageKey: 'theme',
});
```

#### `toggleTheme(options?: ApplyThemeOptions): ThemeNameExtended`

Toggle between light and dark themes.

```typescript
const newTheme = toggleTheme({ persist: true }); // 'dark' or 'light'
```

#### `getSystemTheme(): SystemTheme`

Get system theme preference.

```typescript
const system = getSystemTheme(); // 'dark' | 'light' | 'no-preference'
```

#### `watchSystemTheme(callback: ThemeWatcherCallback): ThemeWatcherCleanup`

Watch for system theme changes.

```typescript
const cleanup = watchSystemTheme((theme) => {
  console.log('System theme:', theme);
});

// Later
cleanup();
```

### Theme Store

#### `createThemeStore(config?: ThemeStoreConfig): ThemeStore`

Create a reactive theme store with signals.

```typescript
const store = createThemeStore({
  initialTheme: 'dark',
  followSystem: true,
  persist: true,
  storageKey: 'theme',
  transition: 200,
});
```

**Store Methods:**

- `setTheme(theme: ThemeNameExtended | ThemePreset): void`
- `toggleTheme(): void`
- `setFollowSystem(follow: boolean): void`
- `getActiveTheme(): ThemeNameExtended | null`
- `cleanup(): void`

**Store Signals:**

- `currentTheme: Signal<ThemeNameExtended>`
- `systemTheme: Signal<SystemTheme>`
- `followingSystem: Signal<boolean>`
- `effectiveTheme: Signal<ThemeNameExtended>` (computed)

### CSS Variable Utilities

#### `getCSSVariable(variableName: FluxwindCSSVariable, element?: HTMLElement): string`

Get CSS variable value.

```typescript
const primary = getCSSVariable('--fw-color-primary');
```

#### `setCSSVariable(variableName: FluxwindCSSVariable, value: string, element?: HTMLElement): void`

Set CSS variable value.

```typescript
setCSSVariable('--fw-color-primary', '#ff0000');
```

#### `getCSSVariables(variableNames: FluxwindCSSVariable[], element?: HTMLElement): Record<...>`

Get multiple CSS variables.

```typescript
const vars = getCSSVariables(['--fw-color-primary', '--fw-color-secondary']);
```

#### `setCSSVariables(variables: Record<...>, element?: HTMLElement): void`

Set multiple CSS variables.

```typescript
setCSSVariables({
  '--fw-color-primary': '#ff0000',
  '--fw-color-secondary': '#00ff00',
});
```

### React Components & Hooks

#### `<ThemeProvider>`

React context provider for theme management.

```tsx
<ThemeProvider
  initialTheme="light"
  followSystem={true}
  persist={true}
  storageKey="theme"
  transition={200}
  store={customStore} // optional
>
  {children}
</ThemeProvider>
```

#### `useTheme(): ThemeStore`

Hook to access theme store. Throws if outside ThemeProvider.

```tsx
const theme = useTheme();
```

#### `useThemeSafe(): ThemeStore | null`

Safe version that returns null instead of throwing.

```tsx
const theme = useThemeSafe();
```

### TypeScript Types

```typescript
// Theme types
type ThemeNameExtended = 'light' | 'dark' | 'sepia' | string;
type SystemTheme = 'light' | 'dark' | 'no-preference';

interface ThemeConfig {
  name: ThemeNameExtended;
  label?: string;
  variables?: Partial<Record<AllCSSVariables, string>>;
  extends?: ThemeNameExtended;
}

interface ThemePreset extends ThemeConfig {
  description?: string;
  category?: 'default' | 'a11y' | 'premium' | 'custom';
  previewColor?: string;
}

// CSS Variable types
type FluxwindCSSVariable = '--fw-color-primary' | '--fw-spacing-4' | ...;
type ComponentCSSVariable = '--fw-button-bg' | '--fw-input-color' | ...;
type AllCSSVariables = FluxwindCSSVariable | ComponentCSSVariable;
```

---

## Best Practices

### 1. Use Design Tokens for Static Values

Prefer design tokens when values don't need to change at runtime:

```typescript
// Good - using tokens
import { fluxwindColors } from '@fluxwind/themes';
const buttonColor = fluxwindColors.sapphire[500];

// Also good - using Tailwind classes
<button className="bg-sapphire-500">Click me</button>
```

### 2. Use CSS Variables for Dynamic Theming

Use CSS variables when values need to change with themes:

```css
/* Good - themeable */
.button {
  background: var(--fw-button-bg);
  color: var(--fw-button-color);
}

/* Bad - static, not themeable */
.button {
  background: #3b82f6;
  color: white;
}
```

### 3. Initialize Theme Early

Initialize the theme as early as possible to avoid flashing:

```typescript
// In your app entry point
import { initTheme } from '@fluxwind/themes';

initTheme({ followSystem: true });
```

### 4. Leverage Signals for Performance

Use signals directly instead of deriving state:

```tsx
// Good - no re-renders
function Component() {
  const theme = useTheme();
  return <div>{theme.currentTheme.value}</div>;
}

// Bad - unnecessary state
function Component() {
  const theme = useTheme();
  const [current, setCurrent] = useState(theme.currentTheme.value);
  // ... unnecessary complexity
}
```

### 5. Clean Up Watchers

Always clean up theme watchers:

```typescript
useEffect(() => {
  const cleanup = watchSystemTheme((theme) => {
    applyTheme(theme);
  });

  return cleanup; // Clean up on unmount
}, []);
```

### 6. Test Themes

Test your components with different themes:

```tsx
import { render } from '@testing-library/react';
import { ThemeProvider } from '@fluxwind/themes';

test('renders correctly in dark mode', () => {
  render(
    <ThemeProvider initialTheme="dark">
      <MyComponent />
    </ThemeProvider>
  );
  // assertions...
});
```

---

## Troubleshooting

### Themes Not Persisting

**Problem**: Theme changes don't persist across page reloads.

**Solution**: Ensure `persist: true` is set:

```typescript
applyTheme('dark', { persist: true });
```

Check localStorage is accessible (not disabled in private mode).

### CSS Variables Not Updating

**Problem**: CSS variables aren't updating in components.

**Solution**: Ensure CSS is imported:

```typescript
import '@fluxwind/themes/variables.css';
import '@fluxwind/themes/variables-components.css';
```

Check that variables are defined in `:root` or parent element.

### useTheme Hook Throwing Error

**Problem**: `useTheme must be used within a ThemeProvider`

**Solution**: Wrap your app with ThemeProvider:

```tsx
<ThemeProvider>
  <App />
</ThemeProvider>
```

Or use `useThemeSafe()` if ThemeProvider is optional.

### System Theme Not Detected

**Problem**: `getSystemTheme()` returns `'no-preference'`

**Solution**: This is normal in environments without `matchMedia` (Node.js, old browsers).

For SSR, detect theme on client side:

```tsx
'use client';
useEffect(() => {
  const theme = getSystemTheme();
  if (theme !== 'no-preference') {
    applyTheme(theme);
  }
}, []);
```

### Tailwind Classes Not Working

**Problem**: Fluxwind color classes not available.

**Solution**: Add Fluxwind config as preset:

```javascript
import { fluxwindConfig } from '@fluxwind/themes';

export default {
  presets: [fluxwindConfig],
  // ...
};
```

### Type Errors with CSS Variables

**Problem**: TypeScript errors when using CSS variable names.

**Solution**: Import types:

```typescript
import type { FluxwindCSSVariable } from '@fluxwind/themes';

const variable: FluxwindCSSVariable = '--fw-color-primary';
```

---

## Contributing

Found an issue or want to contribute? Visit the [GitHub repository](https://github.com/mauriciodelrio/fluxwind-ui).

## License

MIT License - see LICENSE file for details.
