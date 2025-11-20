# Fluxwind UI

<div align="center">
  <h3>A modern, minimal React component library</h3>
  <p>Built on Tailwind CSS with signals-based reactivity for optimal performance</p>
  
  <p>
    <a href="https://github.com/mauriciodelrio/fluxwind-ui/actions/workflows/ci.yml">
      <img src="https://github.com/mauriciodelrio/fluxwind-ui/workflows/CI/badge.svg" alt="CI Status" />
    </a>
    <a href="https://github.com/mauriciodelrio/fluxwind-ui/blob/main/LICENSE">
      <img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="License" />
    </a>
    <a href="https://github.com/mauriciodelrio/fluxwind-ui">
      <img src="https://img.shields.io/github/stars/mauriciodelrio/fluxwind-ui?style=social" alt="GitHub stars" />
    </a>
  </p>
  
  <p>
    <img src="https://img.shields.io/badge/TypeScript-5.x-blue?logo=typescript&logoColor=white" alt="TypeScript" />
    <img src="https://img.shields.io/badge/React-18+-61DAFB?logo=react&logoColor=white" alt="React" />
    <img src="https://img.shields.io/badge/Tailwind-3.x-38B2AC?logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
    <img src="https://img.shields.io/badge/Vitest-2.x-729B1B?logo=vitest&logoColor=white" alt="Vitest" />
    <img src="https://img.shields.io/badge/pnpm-9.x-F69220?logo=pnpm&logoColor=white" alt="pnpm" />
  </p>
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
- **[@fluxwind/icons](./packages/icons)** - Icon system with Lucide React and custom icon support
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

# Branch Management & PR Tools
pnpm branch:validate  # Validate current branch name
pnpm pr:generate      # Generate PR description from branch info and changes
pnpm pr:generate:main # Generate PR description comparing to main branch

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

## � Support This Project

Fluxwind UI is **completely free and open source** under the MIT license. It will remain free forever with no paid tiers or exclusive features.

If you find it valuable and want to support its continued development, you can:

- ⭐ **Star this repository** - Helps with visibility and motivates development
- ☕ **Buy me a coffee** - One-time voluntary donation
- 💝 **Become a sponsor** - Monthly support for ongoing development
- 🐛 **Report issues** - Help improve quality for everyone
- 🔀 **Contribute code** - Join the community and add features
- 📢 **Spread the word** - Share with others who might benefit

<div align="center">
  <a href="https://github.com/sponsors/mauriciodelrio">
    <img src="https://img.shields.io/badge/sponsor-GitHub-ea4aaa?style=for-the-badge&logo=github&logoColor=white" alt="Sponsor on GitHub" />
  </a>
  <a href="https://www.buymeacoffee.com/mauriciodelrio">
    <img src="https://img.shields.io/badge/Buy%20Me%20A%20Coffee-support-FFDD00?style=for-the-badge&logo=buy-me-a-coffee&logoColor=black" alt="Buy Me A Coffee" />
  </a>
</div>

### 🏢 Sponsored Feature Development

**For companies:** If you need specific features or components for your business, you can sponsor their development. Here's how it works:

1. **Contact me** with your feature request
2. **Negotiate** a fair price for the development work
3. **I develop** the features according to your needs
4. **Features are released** to the public under MIT license for everyone to use

**Important:** All sponsored features become part of the free, open-source library. There are no exclusive components or enterprise-only features. This ensures the entire community benefits from your sponsorship.

This model allows companies to:

- ✅ Get features they need faster
- ✅ Support open source development
- ✅ Give back to the community
- ✅ Receive public recognition as a sponsor

### 🎯 Funding Principles

- **No paid tiers** - Everything is free, always
- **No exclusive features** - All features available to everyone
- **No recurring support contracts** - One-time sponsorships only
- **Complete transparency** - All sponsorships acknowledged publicly
- **MIT forever** - License will never change

---

## 📝 License

MIT © [Mauricio Del Rio](https://github.com/mauriciodelrio)

See [LICENSE](./LICENSE) for details. You are free to use this software for any purpose, commercial or non-commercial.

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
