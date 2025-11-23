#!/usr/bin/env node
/**
 * Component Generator
 *
 * CLI tool to scaffold new components with all required files.
 * Creates the complete 7-file structure + config.json automatically.
 *
 * Usage:
 *   pnpm generate:component Button --type atom
 *   pnpm generate:component Card --type molecule
 *   pnpm generate:component DataTable --type organism
 *
 * @module @fluxwind/core/scripts
 */

import { mkdirSync, writeFileSync, existsSync } from 'fs';
import { join } from 'path';

interface GeneratorOptions {
  name: string;
  type: 'atom' | 'molecule' | 'organism' | 'layout';
  force?: boolean;
}

const COMPONENT_TYPES = ['atom', 'molecule', 'organism', 'layout'] as const;

/**
 * Generate component.tsx
 */
function generateComponentFile(name: string, type: string): string {
  return `/**
 * ${name} Component
 * 
 * ${type.charAt(0).toUpperCase() + type.slice(1)} component for Fluxwind UI.
 * 
 * @module @fluxwind/core/components/${type}s
 */

import React from 'react';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';
import type { ${name}Props } from './${name}.types';
import { ${name.toLowerCase()}Variants } from './${name}.variants';

export const ${name} = React.forwardRef<HTMLElement, ${name}Props>(
  (
    {
      children,
      className,
      size = 'md',
      variant = 'default',
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref as React.Ref<HTMLDivElement>}
        className={twMerge(clsx(${name.toLowerCase()}Variants({ size, variant }), className))}
        {...props}
      >
        {children}
      </div>
    );
  }
);

${name}.displayName = '${name}';
`;
}

/**
 * Generate component.types.ts
 */
function generateTypesFile(name: string): string {
  return `/**
 * ${name} Types
 * 
 * TypeScript type definitions for ${name} component.
 * 
 * @module @fluxwind/core/components
 */

import type { ComponentConfig } from '../../../config/schema.types';

export interface ${name}Props extends React.HTMLAttributes<HTMLElement> {
  /** Content of the ${name.toLowerCase()} */
  children?: React.ReactNode;
  
  /** Additional CSS classes */
  className?: string;
  
  /** Size variant */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  
  /** Visual variant */
  variant?: 'default' | 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info';
  
  /** Override sizing mode */
  sizeMode?: ComponentConfig['sizing']['mode'];
}
`;
}

/**
 * Generate component.variants.ts (CVA)
 */
function generateVariantsFile(name: string): string {
  return `/**
 * ${name} Variants
 * 
 * CVA (class-variance-authority) variant definitions.
 * Uses component config for consistent styling.
 * 
 * @module @fluxwind/core/components
 */

import { cva, type VariantProps } from 'class-variance-authority';

export const ${name.toLowerCase()}Variants = cva(
  // Base styles
  [
    'inline-flex',
    'items-center',
    'justify-center',
    'transition-all',
    'duration-200',
  ],
  {
    variants: {
      variant: {
        default: 'bg-gray-100 text-gray-900',
        primary: 'bg-primary-500 text-white',
        secondary: 'bg-secondary-500 text-white',
        success: 'bg-success-500 text-white',
        error: 'bg-error-500 text-white',
        warning: 'bg-warning-500 text-white',
        info: 'bg-info-500 text-white',
      },
      size: {
        xs: 'h-7 px-2 text-xs',
        sm: 'h-8 px-3 text-sm',
        md: 'h-10 px-4 text-base',
        lg: 'h-12 px-5 text-lg',
        xl: 'h-14 px-6 text-xl',
        '2xl': 'h-16 px-8 text-2xl',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
);

export type ${name}VariantProps = VariantProps<typeof ${name.toLowerCase()}Variants>;
`;
}

/**
 * Generate component.test.tsx (Vitest)
 */
function generateTestFile(name: string): string {
  return `/**
 * ${name} Tests
 * 
 * Unit tests using Vitest and Testing Library.
 * 
 * @module @fluxwind/core/components
 */

import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ${name} } from './${name}';

describe('${name}', () => {
  it('renders correctly', () => {
    render(<${name}>Test Content</${name}>);
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(
      <${name} className="custom-class">Content</${name}>
    );
    expect(container.firstChild).toHaveClass('custom-class');
  });

  it('renders different sizes', () => {
    const { rerender, container } = render(
      <${name} size="sm">Content</${name}>
    );
    expect(container.firstChild).toHaveClass('h-8');

    rerender(<${name} size="lg">Content</${name}>);
    expect(container.firstChild).toHaveClass('h-12');
  });

  it('renders different variants', () => {
    const { rerender, container } = render(
      <${name} variant="primary">Content</${name}>
    );
    expect(container.firstChild).toHaveClass('bg-primary-500');

    rerender(<${name} variant="error">Content</${name}>);
    expect(container.firstChild).toHaveClass('bg-error-500');
  });

  it('forwards ref correctly', () => {
    const ref = { current: null };
    render(<${name} ref={ref}>Content</${name}>);
    expect(ref.current).toBeInstanceOf(HTMLElement);
  });
});
`;
}

/**
 * Generate component.stories.tsx (Storybook)
 */
function generateStoriesFile(name: string, type: string): string {
  return `/**
 * ${name} Stories
 * 
 * Storybook stories for visual testing and documentation.
 * 
 * @module @fluxwind/core/components
 */

import type { Meta, StoryObj } from '@storybook/react';
import { ${name} } from './${name}';

const meta = {
  title: 'Core/${type.charAt(0).toUpperCase() + type.slice(1)}s/${name}',
  component: ${name},
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl', '2xl'],
    },
    variant: {
      control: 'select',
      options: ['default', 'primary', 'secondary', 'success', 'error', 'warning', 'info'],
    },
  },
} satisfies Meta<typeof ${name}>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: '${name} Component',
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <${name} size="xs">Extra Small</${name}>
      <${name} size="sm">Small</${name}>
      <${name} size="md">Medium</${name}>
      <${name} size="lg">Large</${name}>
      <${name} size="xl">Extra Large</${name}>
      <${name} size="2xl">2X Large</${name}>
    </div>
  ),
};

export const Variants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <${name} variant="default">Default</${name}>
      <${name} variant="primary">Primary</${name}>
      <${name} variant="secondary">Secondary</${name}>
      <${name} variant="success">Success</${name}>
      <${name} variant="error">Error</${name}>
      <${name} variant="warning">Warning</${name}>
      <${name} variant="info">Info</${name}>
    </div>
  ),
};
`;
}

/**
 * Generate component.spec.ts (Playwright)
 */
function generateSpecFile(name: string): string {
  return `/**
 * ${name} E2E Tests
 * 
 * End-to-end tests using Playwright.
 * 
 * @module @fluxwind/core/components
 */

import { test, expect } from '@playwright/test';
import { gotoStory } from '../../../../../../playwright/helpers';

test.describe('${name}', () => {
  test('renders correctly', async ({ page }) => {
    await gotoStory(page, 'core-${name.toLowerCase()}--default');
    
    const component = page.locator('[class*="${name.toLowerCase()}"]').first();
    await expect(component).toBeVisible();
  });

  test('displays all size variants', async ({ page }) => {
    await gotoStory(page, 'core-${name.toLowerCase()}--sizes');
    
    const components = page.locator('[class*="${name.toLowerCase()}"]');
    await expect(components).toHaveCount(6); // xs, sm, md, lg, xl, 2xl
  });

  test('displays all variants', async ({ page }) => {
    await gotoStory(page, 'core-${name.toLowerCase()}--variants');
    
    const components = page.locator('[class*="${name.toLowerCase()}"]');
    await expect(components).toHaveCount(7); // All color variants
  });

  test('is accessible', async ({ page }) => {
    await gotoStory(page, 'core-${name.toLowerCase()}--default');
    
    // Check for basic accessibility
    const component = page.locator('[class*="${name.toLowerCase()}"]').first();
    await expect(component).toBeVisible();
    
    // Add more a11y checks as needed
  });
});
`;
}

/**
 * Generate minimal config.json
 */
function generateConfigFile(name: string, type: string): string {
  const config = {
    metadata: {
      name,
      type,
      version: '1.0.0',
      description: `${name} component`,
      tags: [type],
    },
    sizing: {
      mode: 'intelligent',
      classic: {
        default: 'md',
        values: {
          xs: { height: '28px' },
          sm: { height: '32px' },
          md: { height: '40px' },
          lg: { height: '48px' },
          xl: { height: '56px' },
          '2xl': { height: '64px' },
        },
      },
      intelligent: {
        mobile: 'sm',
        tablet: 'md',
        desktop: 'md',
        values: {
          xs: { mobile: '28px', tablet: '28px', desktop: '28px' },
          sm: { mobile: '32px', tablet: '36px', desktop: '36px' },
          md: { mobile: '36px', tablet: '40px', desktop: '40px' },
          lg: { mobile: '40px', tablet: '48px', desktop: '48px' },
          xl: { mobile: '48px', tablet: '56px', desktop: '56px' },
          '2xl': { mobile: '56px', tablet: '64px', desktop: '64px' },
        },
      },
    },
    spacing: {
      padding: {
        x: {
          xs: 'var(--fluxwind-space-2)',
          sm: 'var(--fluxwind-space-3)',
          md: 'var(--fluxwind-space-4)',
          lg: 'var(--fluxwind-space-5)',
          xl: 'var(--fluxwind-space-6)',
          '2xl': 'var(--fluxwind-space-8)',
        },
        y: {
          xs: 'var(--fluxwind-space-1)',
          sm: 'var(--fluxwind-space-2)',
          md: 'var(--fluxwind-space-2)',
          lg: 'var(--fluxwind-space-3)',
          xl: 'var(--fluxwind-space-4)',
          '2xl': 'var(--fluxwind-space-5)',
        },
      },
    },
    colors: {
      variants: {
        primary: {
          bg: 'var(--fluxwind-color-primary-500)',
          text: 'var(--fluxwind-color-white)',
          border: 'var(--fluxwind-color-primary-500)',
        },
        secondary: {
          bg: 'var(--fluxwind-color-gray-500)',
          text: 'var(--fluxwind-color-white)',
          border: 'var(--fluxwind-color-gray-500)',
        },
        success: {
          bg: 'var(--fluxwind-color-success-500)',
          text: 'var(--fluxwind-color-white)',
          border: 'var(--fluxwind-color-success-500)',
        },
        error: {
          bg: 'var(--fluxwind-color-error-500)',
          text: 'var(--fluxwind-color-white)',
          border: 'var(--fluxwind-color-error-500)',
        },
        warning: {
          bg: 'var(--fluxwind-color-warning-500)',
          text: 'var(--fluxwind-color-white)',
          border: 'var(--fluxwind-color-warning-500)',
        },
        info: {
          bg: 'var(--fluxwind-color-info-500)',
          text: 'var(--fluxwind-color-white)',
          border: 'var(--fluxwind-color-info-500)',
        },
        neutral: {
          bg: 'var(--fluxwind-color-gray-200)',
          text: 'var(--fluxwind-color-gray-900)',
          border: 'var(--fluxwind-color-gray-300)',
        },
      },
      states: {
        hover: { bgOpacity: '0.9', scale: '1.02' },
        active: { bgOpacity: '0.95', scale: '0.98' },
        disabled: { opacity: '0.4', cursor: 'not-allowed' },
        focus: {
          ringWidth: '2px',
          ringOffset: '2px',
          ringColor: 'var(--fluxwind-color-primary-500)',
        },
      },
    },
    typography: {
      fontFamily: 'var(--fluxwind-font-sans)',
      fontSize: {
        xs: 'var(--fluxwind-text-xs)',
        sm: 'var(--fluxwind-text-sm)',
        md: 'var(--fluxwind-text-base)',
        lg: 'var(--fluxwind-text-lg)',
        xl: 'var(--fluxwind-text-xl)',
        '2xl': 'var(--fluxwind-text-2xl)',
      },
      fontWeight: { default: 500, emphasis: 600 },
      lineHeight: {
        xs: '1.25',
        sm: '1.375',
        md: '1.5',
        lg: '1.5',
        xl: '1.5',
        '2xl': '1.5',
      },
    },
    borders: {
      width: { default: '1px', focus: '2px', error: '2px' },
      radius: {
        xs: 'var(--fluxwind-radius-sm)',
        sm: 'var(--fluxwind-radius-sm)',
        md: 'var(--fluxwind-radius-md)',
        lg: 'var(--fluxwind-radius-md)',
        xl: 'var(--fluxwind-radius-lg)',
        '2xl': 'var(--fluxwind-radius-lg)',
      },
      color: 'currentColor',
    },
    shadows: {
      default: null,
      hover: 'var(--fluxwind-shadow-sm)',
      focus: 'var(--fluxwind-shadow-focus-ring)',
      active: null,
    },
    animations: {
      transition: {
        default: {
          duration: 'var(--fluxwind-duration-fast)',
          easing: 'var(--fluxwind-easing-easeOut)',
          properties: ['background-color', 'border-color', 'color', 'transform', 'box-shadow'],
        },
      },
      respectReducedMotion: true,
    },
    a11y: {
      role: 'group',
      ariaLabels: {},
      focusStrategy: 'auto',
      minimumTouchTarget: '44px',
    },
    i18n: {
      namespace: `core.${name.toLowerCase()}`,
      defaultTexts: {},
      textProps: ['children'],
    },
    states: {
      disabled: {
        opacity: 0.4,
        cursor: 'not-allowed',
        pointerEvents: 'none',
      },
    },
    variants: {
      appearance: ['default'],
      size: ['xs', 'sm', 'md', 'lg', 'xl', '2xl'],
      colorScheme: ['primary', 'secondary', 'success', 'error', 'warning', 'info', 'neutral'],
    },
  };

  return JSON.stringify(config, null, 2);
}

/**
 * Generate index.ts
 */
function generateIndexFile(name: string): string {
  return `export { ${name} } from './${name}';
export type { ${name}Props } from './${name}.types';
export { ${name.toLowerCase()}Variants } from './${name}.variants';
`;
}

/**
 * Main generator function
 */
function generateComponent(options: GeneratorOptions): void {
  const { name, type, force } = options;

  // Validate component type
  if (!COMPONENT_TYPES.includes(type)) {
    console.error(`❌ Invalid component type: ${type}`);
    console.error(`   Valid types: ${COMPONENT_TYPES.join(', ')}`);
    process.exit(1);
  }

  // Determine component directory
  const srcDir = join(__dirname, '..');
  const typeDir = type === 'layout' ? 'layout' : `${type}s`;
  const componentDir = join(srcDir, 'components', typeDir, name);

  // Check if component already exists
  if (existsSync(componentDir) && !force) {
    console.error(`❌ Component "${name}" already exists!`);
    console.error('   Use --force to overwrite');
    process.exit(1);
  }

  // Create component directory
  mkdirSync(componentDir, { recursive: true });

  console.log(`\n🔨 Generating ${type} component: ${name}\n`);
  console.log('═'.repeat(50));

  // Generate all files
  const files = [
    { name: `${name}.tsx`, content: generateComponentFile(name, type) },
    { name: `${name}.types.ts`, content: generateTypesFile(name) },
    { name: `${name}.variants.ts`, content: generateVariantsFile(name) },
    { name: `${name}.test.tsx`, content: generateTestFile(name) },
    { name: `${name}.stories.tsx`, content: generateStoriesFile(name, type) },
    { name: `${name}.spec.ts`, content: generateSpecFile(name) },
    { name: `${name}.config.json`, content: generateConfigFile(name, type) },
    { name: 'index.ts', content: generateIndexFile(name) },
  ];

  files.forEach(({ name: fileName, content }) => {
    const filePath = join(componentDir, fileName);
    writeFileSync(filePath, content, 'utf-8');
    console.log(`✅ Created: ${fileName}`);
  });

  console.log('═'.repeat(50));
  console.log(`\n🎉 Component "${name}" generated successfully!\n`);
  console.log(`📂 Location: packages/core/src/components/${typeDir}/${name}/\n`);
  console.log('Next steps:');
  console.log(`  1. Customize ${name}.config.json with your design requirements`);
  console.log(`  2. Update ${name}.variants.ts with proper CVA variants`);
  console.log(`  3. Implement component logic in ${name}.tsx`);
  console.log(`  4. Run tests: pnpm test ${name}`);
  console.log(`  5. View in Storybook: pnpm storybook\n`);
}

/**
 * CLI entry point
 */
function main() {
  const args = process.argv.slice(2);

  if (args.length === 0 || args.includes('--help') || args.includes('-h')) {
    console.log(`
📦 Fluxwind Component Generator

Usage:
  pnpm generate:component <ComponentName> --type <type> [options]

Arguments:
  ComponentName   Name of the component (PascalCase)

Options:
  --type, -t      Component type (required)
                  Values: atom, molecule, organism, layout
  --force, -f     Overwrite existing component
  --help, -h      Show this help message

Examples:
  pnpm generate:component Button --type atom
  pnpm generate:component Card --type molecule
  pnpm generate:component DataTable --type organism
  pnpm generate:component Grid --type layout
  pnpm generate:component Button --type atom --force

Generated files:
  ✓ ComponentName.tsx         - Component implementation
  ✓ ComponentName.types.ts    - TypeScript types
  ✓ ComponentName.variants.ts - CVA variants
  ✓ ComponentName.config.json - Configuration
  ✓ ComponentName.test.tsx    - Vitest unit tests
  ✓ ComponentName.stories.tsx - Storybook stories
  ✓ ComponentName.spec.ts     - Playwright E2E tests
  ✓ index.ts                  - Barrel export
    `);
    process.exit(0);
  }

  const name = args[0];
  const typeIndex = args.findIndex((arg) => arg === '--type' || arg === '-t');
  const type = typeIndex !== -1 ? args[typeIndex + 1] : undefined;
  const force = args.includes('--force') || args.includes('-f');

  if (!name) {
    console.error('❌ Component name is required!');
    console.error('   Usage: pnpm generate:component <ComponentName> --type <type>');
    process.exit(1);
  }

  if (!type) {
    console.error('❌ Component type is required!');
    console.error('   Usage: pnpm generate:component <ComponentName> --type <type>');
    console.error(`   Valid types: ${COMPONENT_TYPES.join(', ')}`);
    process.exit(1);
  }

  generateComponent({
    name,
    type: type as GeneratorOptions['type'],
    force,
  });
}

// Run if executed directly
if (require.main === module) {
  main();
}

export { generateComponent, type GeneratorOptions };
