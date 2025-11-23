# Tailwind CSS Integration

## Overview

Fluxwind Core includes a custom Tailwind CSS plugin that automatically generates utilities from component JSON configurations. This enables dynamic styling based on your component definitions without manual Tailwind config management.

## Features

- ✅ **Automatic Utility Generation** - Creates component-specific classes from `.config.json` files
- ✅ **Intelligent Safelist** - Prevents Tailwind from purging component classes
- ✅ **Dynamic Sizing** - Responsive height/width utilities for intelligent sizing mode
- ✅ **Theme Integration** - Seamlessly integrates with `@fluxwind/themes` tokens
- ✅ **Zero Manual Config** - Add new components, get utilities automatically

## Installation

The plugin is already installed in `@fluxwind/core`. To use it in your app:

```bash
# In your app (docs, playground, etc.)
pnpm add -D tailwindcss @fluxwind/core
```

## Usage

### In Applications (docs, playground)

```typescript
// tailwind.config.ts
import type { Config } from 'tailwindcss';
import { fluxwindConfig } from '@fluxwind/themes';
import { fluxwindComponentsPlugin } from '@fluxwind/core/config';
import { join } from 'path';

const config: Config = {
  content: [
    './src/**/*.{ts,tsx}',
    // Include core components in content scan
    '../../packages/core/src/**/*.{ts,tsx}',
  ],

  presets: [fluxwindConfig as Config],

  plugins: [
    fluxwindComponentsPlugin({
      // Point to core components directory
      componentsDir: join(__dirname, '../../packages/core/src/components'),
    }),
  ],
};

export default config;
```

### In Core Package

Already configured in `packages/core/tailwind.config.ts`:

```typescript
import { fluxwindComponentsPlugin } from './src/config/tailwind-plugin';

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  presets: [fluxwindConfig as Config],
  plugins: [
    fluxwindComponentsPlugin({
      componentsDir: join(__dirname, 'src/components'),
    }),
  ],
};
```

## What Gets Generated

### 1. Component Size Utilities

From `Button.config.json`:

```json
{
  "sizing": {
    "classic": {
      "values": {
        "md": { "height": "40px", "minWidth": "96px" }
      }
    }
  }
}
```

Generates:

```css
.button-md {
  height: 40px;
  min-width: 96px;
}
```

### 2. Spacing Utilities

From `Card.config.json`:

```json
{
  "spacing": {
    "padding": {
      "x": { "md": "var(--fluxwind-space-6)" },
      "y": { "md": "var(--fluxwind-space-6)" }
    }
  }
}
```

Generates:

```css
.card-padding-md {
  padding-left: var(--fluxwind-space-6);
  padding-right: var(--fluxwind-space-6);
  padding-top: var(--fluxwind-space-6);
  padding-bottom: var(--fluxwind-space-6);
}
```

### 3. Base Component Styles

For each component:

```css
.button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: all 200ms ease;
}

.button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  pointer-events: none;
}
```

### 4. Safelist Entries

Prevents Tailwind from purging:

- `button-sm`, `button-md`, `button-lg` (size variants)
- `button-primary`, `button-secondary` (color schemes)
- `button-default`, `button-outline` (appearances)

### 5. Responsive Sizing Classes

For intelligent sizing mode:

```css
/* Mobile: 36px, Tablet+: 40px */
.button-md {
  @apply h-9 md:h-10;
}
```

Safelist patterns:

- `h-(7|9|10|11|13|14|15)` with `md`, `lg` variants

## Component Configuration Examples

### Button

```typescript
// Use generated utilities
<button className="button button-md button-primary">
  Click me
</button>

// Or with CVA (recommended)
import { buttonVariants } from './Button.variants';

<button className={buttonVariants({ size: 'md', variant: 'primary' })}>
  Click me
</button>
```

### Card

```typescript
<div className="card card-padding-md">
  <h2>Card Title</h2>
  <p>Card content</p>
</div>
```

## Advanced: Custom Utilities

You can extend the plugin by modifying `tailwind-plugin.ts`:

```typescript
// Add custom utility extraction
function extractComponentClasses(config: ComponentConfigWithMetadata) {
  const classes: Record<string, string> = {};

  // Your custom logic here
  if (config.customProperty) {
    classes[`${componentName}-custom`] = `
      custom-property: ${config.customProperty};
    `;
  }

  return classes;
}
```

## Debugging

Enable verbose logging:

```typescript
fluxwindComponentsPlugin({
  componentsDir: './src/components',
});

// Console output:
// ✅ Loaded 17 component configurations for Tailwind
```

Check generated utilities:

```bash
# Build Tailwind with verbose output
npx tailwindcss -i input.css -o output.css --verbose

# Search for component utilities
grep "button-md" output.css
```

## Performance

- **Build Time**: +50-100ms for 17 components (negligible)
- **Bundle Size**: No impact (utilities are purged like normal Tailwind)
- **Hot Reload**: Plugin runs once, cached by Tailwind

## Best Practices

1. **Use CVA over direct utilities** - More maintainable
2. **Keep config minimal** - Only add what components truly need
3. **Leverage safelist** - For dynamic classes in Storybook
4. **Test purging** - Ensure production builds are lean

## Troubleshooting

### Utilities not generating

1. Check `componentsDir` path is correct
2. Verify `.config.json` files exist
3. Run `pnpm validate:configs` to check JSON validity
4. Check Tailwind build output for errors

### Classes getting purged

1. Add to safelist in component config
2. Use safelist patterns for dynamic classes
3. Check Tailwind `content` paths include component files

### TypeScript errors

1. Ensure `@fluxwind/core` is built: `pnpm build`
2. Check plugin is exported from `config/index.ts`
3. Verify `tailwindcss` types are installed

## See Also

- [Component Configuration System](./src/config/README.md)
- [Design System Rules](../../docs/local/CORE_DESIGN_SYSTEM_RULES.md)
- [Tailwind CSS Plugin API](https://tailwindcss.com/docs/plugins)
