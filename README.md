# Fluxwind UI

<div align="center">
  <h3>A modern, minimal React component library</h3>
  <p>Built on Tailwind CSS with signals-based reactivity for optimal performance</p>
</div>

---

## ✨ Features

- 🎨 **Tailwind-first** - Built on top of Tailwind CSS with customizable design tokens
- ⚡ **Signals Inside** - Uses @preact/signals-core internally for superior performance
- 🪶 **Minimal Dependencies** - Lean and focused on what matters
- 🎯 **Type-Safe** - Full TypeScript support with strict mode
- ♿ **Accessible** - WCAG compliant components out of the box
- 🌳 **Tree-Shakeable** - Import only what you need
- 📦 **Monorepo** - Well-organized with Turborepo
- 🧪 **Well-Tested** - Comprehensive test coverage with Vitest

## 📦 Packages

This monorepo contains the following packages:

- **[@fluxwind/core](./packages/core)** - Core UI components
- **[@fluxwind/themes](./packages/themes)** - Design tokens and Tailwind configurations
- **[@fluxwind/utils](./packages/utils)** - Shared utilities

## 🚀 Getting Started

### Installation

```bash
npm install @fluxwind/core @fluxwind/themes
# or
pnpm add @fluxwind/core @fluxwind/themes
# or
yarn add @fluxwind/core @fluxwind/themes
```

### Setup Tailwind

Extend your `tailwind.config.ts`:

```typescript
import type { Config } from 'tailwindcss';
import { fluxwindConfig } from '@fluxwind/themes';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx}', './node_modules/@fluxwind/core/dist/**/*.js'],
  ...fluxwindConfig,
};

export default config;
```

### Usage

```tsx
import { cn } from '@fluxwind/core';

function App() {
  return <div className={cn('text-primary-600', 'font-bold')}>Hello Fluxwind!</div>;
}
```

## 🏗️ Development

This project uses:

- **[pnpm](https://pnpm.io/)** - Fast, disk space efficient package manager
- **[Turborepo](https://turbo.build/)** - High-performance build system
- **[TypeScript](https://www.typescriptlang.org/)** - Type safety
- **[Vitest](https://vitest.dev/)** - Fast unit testing
- **[Storybook](https://storybook.js.org/)** - Component documentation
- **[Changesets](https://github.com/changesets/changesets)** - Version management

### Prerequisites

- Node.js >= 20
- pnpm >= 8

### Setup

```bash
# Install dependencies
pnpm install

# Setup git hooks
pnpm prepare
```

### Commands

```bash
# Development
pnpm dev              # Start all packages in dev mode
pnpm dev:docs         # Start Storybook
pnpm dev:playground   # Start playground app

# Building
pnpm build            # Build all packages
pnpm build --filter @fluxwind/core  # Build specific package

# Testing
pnpm test             # Run tests
pnpm test:watch       # Run tests in watch mode
pnpm test:coverage    # Generate coverage report

# Linting & Formatting
pnpm lint             # Run ESLint
pnpm format           # Format code with Prettier
pnpm format:check     # Check formatting
pnpm type-check       # Run TypeScript type checking

# Versioning
pnpm changeset        # Create a changeset
pnpm version-packages # Version packages
pnpm release          # Publish to npm
```

## 📖 Documentation

Visit our [Storybook](https://mauriciodelrio.github.io/fluxwind-ui) for live examples and documentation.

## 🤝 Contributing

Contributions are welcome! Please read our [Contributing Guide](./CONTRIBUTING.md) for details.

### Commit Convention

We follow [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: add new Button component
fix: resolve issue with color tokens
docs: update installation guide
chore: bump dependencies
```

## 📄 License

MIT © [Mauricio Del Rio](https://github.com/mauriciodelrio)

## 🙏 Acknowledgments

Built with inspiration from:

- [Radix UI](https://www.radix-ui.com/)
- [Shadcn UI](https://ui.shadcn.com/)
- [Headless UI](https://headlessui.com/)
- [Preact Signals](https://preactjs.com/guide/v10/signals/)

---

<div align="center">
  Made with ❤️ and ⚛️
</div>
