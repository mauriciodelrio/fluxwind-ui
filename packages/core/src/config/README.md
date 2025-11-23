# Component Configuration System

## Overview

The Fluxwind Core configuration system provides a **zero-code customization layer** for all components through JSON configuration files. This approach makes the design system highly fork-friendly and enterprise-ready.

## Key Features

- 🎯 **Type-Safe**: Full TypeScript support with runtime validation
- 🎨 **Theme Compliant**: Enforced usage of design tokens (no hardcoded colors)
- 📱 **Intelligent Sizing**: Responsive size variants that adapt to screen size
- 🌍 **I18n Ready**: Built-in internationalization support for all text props
- ♿ **A11y First**: Accessibility configuration baked into every component
- 🔧 **Fork-Friendly**: Customize defaults without touching TypeScript code

## Configuration Schema

Every component follows a universal schema with these sections:

### 1. Metadata

Component information and versioning

### 2. Sizing System

- **Classic Mode**: Static sizes across all breakpoints
- **Intelligent Mode**: Responsive sizes that adapt (mobile: sm, tablet/desktop: md)

### 3. Spacing

Consistent padding, gap, and margin using theme tokens

### 4. Colors

Semantic color variants with theme compliance enforcement

### 5. Typography

Font families, sizes, weights coordinated with theme

### 6. Borders

Border widths, radius, and colors

### 7. Shadows

Elevation system for different component states

### 8. Animations

Motion design with `prefers-reduced-motion` support

### 9. Accessibility

ARIA labels, keyboard shortcuts, focus strategies

### 10. Internationalization

Default texts and i18n key mappings

### 11. States

Loading, disabled, error, success configurations

### 12. Variants

Available appearance, size, and color scheme options

## Usage

### Loading Configuration

\`\`\`typescript
import { loadComponentConfig } from '@fluxwind/core/config';

const buttonConfig = loadComponentConfig('Button', 'atom');
console.log(buttonConfig.sizing.mode); // 'intelligent'
\`\`\`

### With Overrides

\`\`\`typescript
import { loadComponentConfigWithOverrides } from '@fluxwind/core/config';

const customConfig = loadComponentConfigWithOverrides('Button', 'atom', {
sizing: { mode: 'classic' },
colors: {
variants: {
primary: {
bg: 'var(--my-custom-primary)',
},
},
},
});
\`\`\`

### React Hooks

\`\`\`tsx
import { useComponentConfig, useResponsiveSize } from '@fluxwind/core/shared/hooks';

function Button({ size = 'md', sizeMode }) {
const config = useComponentConfig({
componentName: 'Button',
componentType: 'atom',
});

const { height, effectiveSize } = useResponsiveSize({
sizingConfig: config.sizing,
size,
mode: sizeMode,
});

return <button style={{ height }}>{children}</button>;
}
\`\`\`

## File Structure

\`\`\`
components/
├── atoms/
│ └── Button/
│ ├── Button.tsx
│ ├── Button.types.ts
│ ├── Button.variants.ts (CVA)
│ ├── Button.config.json ⭐
│ ├── Button.test.tsx
│ ├── Button.stories.tsx
│ ├── Button.spec.ts
│ └── index.ts
\`\`\`

## Customization Workflow

### For End Users (No Fork)

Override configurations at runtime through props:

\`\`\`tsx
<Button sizeMode="classic" size="lg">Click me</Button>
\`\`\`

### For Teams (Fork)

Modify `.config.json` files directly:

\`\`\`json
{
"sizing": {
"mode": "classic",
"classic": {
"default": "lg"
}
}
}
\`\`\`

### For Enterprises (Deep Customization)

Replace entire config files while maintaining schema compliance:

\`\`\`bash
cp Button.config.json Button.config.custom.json

# Edit Button.config.custom.json

# Build tooling will validate schema

\`\`\`

## Validation

All configs are validated for:

- ✅ Schema compliance (TypeScript + Zod)
- ✅ Theme token usage (no hardcoded colors)
- ✅ Accessibility requirements
- ✅ I18n completeness

Run validation:
\`\`\`bash
pnpm validate:configs
\`\`\`

## See Also

- [Component Development Guide](../../../docs/local/CORE_DEVELOPMENT_GUIDE.md)
- [Design System Rules](../../../docs/local/CORE_DESIGN_SYSTEM_RULES.md)
- [Component Roadmap](../../../docs/local/CORE_COMPONENTS_ROADMAP.md)
