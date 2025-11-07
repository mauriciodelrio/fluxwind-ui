# @fluxwind/icons

Icon system for Fluxwind UI - A curated set of Lucide icons with consistent styling.

## Features

- 🎨 **150+ carefully selected icons** from Lucide
- 📦 **Tree-shakeable** - Only import what you need
- ♿ **Accessible** - Built-in ARIA support
- 🎯 **TypeScript** - Full type safety
- 🪶 **Lightweight** - Minimal bundle impact
- 📱 **Customizable** - Size, color, stroke width

## Installation

```bash
pnpm add @fluxwind/icons
```

## Usage

### Basic Usage

```tsx
import { Search, User, Settings } from '@fluxwind/icons';

function App() {
  return (
    <div>
      <Search size={24} />
      <User color="blue" />
      <Settings strokeWidth={1.5} />
    </div>
  );
}
```

### Using Custom Icons

The `Icon` wrapper allows you to use your own custom icons **or icons from other libraries** while maintaining consistency with Fluxwind's icon system:

```tsx
import { Icon } from '@fluxwind/icons';

// Option 1: Inline SVG component
const MyCustomIcon = (props) => (
  <svg {...props} viewBox="0 0 24 24" fill="none">
    <path d="M12 2L2 7l10 5 10-5-10-5z" />
    <path d="M2 17l10 5 10-5M2 12l10 5 10-5" />
  </svg>
);
<Icon as={MyCustomIcon} size={32} color="red" />

// Option 2: Imported SVG
import CustomLogo from './logo.svg';
<Icon as={CustomLogo} size={48} />

// Option 3: React Icons (Font Awesome, Feather, etc.)
import { FaBeer } from 'react-icons/fa';
import { FiAirplay } from 'react-icons/fi';
<Icon as={FaBeer} size={24} color="gold" />
<Icon as={FiAirplay} size={32} />

// Option 4: Heroicons
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
<Icon as={MagnifyingGlassIcon} size={24} />

// Option 5: Material UI Icons
import SearchIcon from '@mui/icons-material/Search';
<Icon as={SearchIcon} size={28} color="primary" />
```

**Why use the Icon wrapper?**

- ✅ **Universal compatibility** - Works with any icon library
- ✅ **Consistent sizing** - Same API regardless of icon source
- ✅ **Standardized props** - size, color work everywhere
- ✅ **Built-in accessibility** - ARIA props included
- ✅ **TypeScript support** - Full type safety
- ✅ **No lock-in** - Mix and match icon sources freely

**Supported Icon Libraries:**

- ✅ Lucide React (our default)
- ✅ React Icons (Font Awesome, Feather, Material Design, etc.)
- ✅ Heroicons
- ✅ Material UI Icons
- ✅ Custom SVG files
- ✅ Inline SVG components
- ✅ Any library that accepts size/color props

### With Accessibility

```tsx
import { Heart } from '@fluxwind/icons';

// Decorative icon (hidden from screen readers)
<Heart aria-hidden="true" />

// Meaningful icon (needs label)
<Heart aria-label="Like this post" />
```

### Customization

```tsx
import { Mail } from '@fluxwind/icons';

<Mail
  size={32} // Size in pixels
  color="#3b82f6" // Any CSS color
  strokeWidth={2} // Stroke thickness
  className="custom-class" // Additional classes
/>;
```

## Available Icons

### UI & Navigation

`Menu`, `X`, `ChevronLeft`, `ChevronRight`, `ChevronUp`, `ChevronDown`, `ArrowLeft`, `ArrowRight`, `Home`, `Settings`, `Search`, `Filter`

### User & Profile

`User`, `Users`, `UserPlus`, `LogIn`, `LogOut`, `Lock`, `Eye`, `EyeOff`, `Heart`, `Star`, `Bell`

### Files & Documents

`File`, `FileText`, `Folder`, `Download`, `Upload`, `Save`, `Trash`, `Copy`, `Clipboard`

### Communication

`Mail`, `MessageCircle`, `Send`, `Phone`, `Video`, `Mic`, `Volume`

### Status & Feedback

`Check`, `CheckCircle`, `XCircle`, `AlertCircle`, `AlertTriangle`, `Info`, `HelpCircle`, `Loader`

### Media

`Image`, `Play`, `Pause`, `Camera`, `Music`

### Editing

`Edit`, `Plus`, `PlusCircle`, `Minus`, `MinusCircle`

### And many more...

[See full icon list](https://lucide.dev/)

## Props

All icons accept these props:

| Prop          | Type               | Default        | Description                |
| ------------- | ------------------ | -------------- | -------------------------- |
| `size`        | `number \| string` | `24`           | Icon size in pixels        |
| `color`       | `string`           | `currentColor` | Icon color (any CSS color) |
| `strokeWidth` | `number \| string` | `2`            | Stroke thickness           |
| `className`   | `string`           | -              | Additional CSS classes     |
| `aria-label`  | `string`           | -              | Accessible label           |
| `aria-hidden` | `boolean`          | `false`        | Hide from screen readers   |

## Best Practices

### Custom Icons

When creating custom icons to use with Fluxwind:

```tsx
// ✅ Good - Accepts props and uses viewBox
const GoodIcon = (props) => (
  <svg {...props} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="..." stroke="currentColor" />
  </svg>
);

// ❌ Bad - Hardcoded dimensions and colors
const BadIcon = () => (
  <svg width="24" height="24" fill="red">
    <path d="..." />
  </svg>
);

// ✅ Good - Use with Icon wrapper
<Icon as={GoodIcon} size={32} color="blue" />;
```

**Custom Icon Guidelines:**

1. Always use `viewBox` instead of hardcoded `width`/`height`
2. Use `currentColor` for stroke/fill to allow color customization
3. Spread `{...props}` to accept Icon wrapper props
4. Keep icons on a 24x24 grid for consistency
5. Use `fill="none"` for outline icons
6. Remove unnecessary metadata from exported SVGs

### Accessibility

Always provide context for icons:

```tsx
// ✅ Good - Icon with text
<button>
  <Search aria-hidden="true" />
  <span>Search</span>
</button>

// ✅ Good - Icon with label
<button aria-label="Search">
  <Search />
</button>

// ❌ Bad - No context
<button>
  <Search />
</button>
```

### Performance

Import only what you need:

```tsx
// ✅ Good - Tree-shakeable
import { Search, User } from '@fluxwind/icons';

// ❌ Bad - Imports everything
import * as Icons from '@fluxwind/icons';
```

### Styling

Use Tailwind classes or CSS:

```tsx
// With Tailwind
<Search className="w-6 h-6 text-blue-500" />

// With inline styles
<Search style={{ width: 24, height: 24, color: 'blue' }} />

// With size prop (recommended)
<Search size={24} color="blue" />
```

## License

ISC (via lucide-react) - Compatible with MIT

Icons are from [Lucide](https://lucide.dev/) by the Lucide community.

## Troubleshooting

### Icons from other libraries not sizing correctly

The Icon wrapper normalizes props across different libraries. If you experience sizing issues:

```tsx
// Try using the style prop directly
<Icon
  as={SomeIcon}
  size={24}
  style={{ width: 24, height: 24 }}
/>

// Or use className with Tailwind
<Icon
  as={SomeIcon}
  className="w-6 h-6"
/>
```

### TypeScript errors with icon libraries

Some icon libraries have strict TypeScript types. You may need to cast:

```tsx
import type { ComponentType } from 'react';
import SomeIcon from 'some-library';

<Icon as={SomeIcon as ComponentType<any>} size={24} />;
```

### Icons not inheriting color

Ensure your custom SVGs use `currentColor`:

```tsx
// ✅ Good
const MyIcon = (props) => (
  <svg {...props}>
    <path stroke="currentColor" />
  </svg>
);

// ❌ Bad
const MyIcon = (props) => (
  <svg {...props}>
    <path stroke="#000" />
  </svg>
);
```

## Links

- [Lucide Icons](https://lucide.dev/)
- [Fluxwind UI Documentation](https://fluxwind-ui.dev)
- [GitHub](https://github.com/mauriciodelrio/fluxwind-ui)
