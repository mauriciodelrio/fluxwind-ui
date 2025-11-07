# Contributing to Fluxwind UI

Thank you for your interest in contributing to Fluxwind UI! 🎉

## Getting Started

1. **Fork the repository**
2. **Clone your fork**:
   ```bash
   git clone https://github.com/YOUR_USERNAME/fluxwind-ui.git
   cd fluxwind-ui
   ```
3. **Install dependencies**:
   ```bash
   pnpm install
   ```
4. **Create a branch**:
   ```bash
   git checkout -b feat/my-new-feature
   ```

## Development Workflow

### Running the Development Environment

```bash
# Start all packages in development mode
pnpm dev

# Or run specific apps
pnpm --filter @fluxwind/docs dev      # Storybook
pnpm --filter @fluxwind/playground dev # Playground
```

### Making Changes

1. **Write your code** following our coding standards
2. **Add tests** for new features
3. **Update documentation** in Storybook stories
4. **Run tests**: `pnpm test`
5. **Check types**: `pnpm type-check`
6. **Lint your code**: `pnpm lint`

### Commit Guidelines

We use [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>(<scope>): <description>

[optional body]

[optional footer]
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `perf`: Performance improvements
- `test`: Adding or updating tests
- `chore`: Maintenance tasks
- `ci`: CI/CD changes

**Examples:**
```
feat(core): add Button component
fix(themes): resolve color contrast issue
docs(core): update Button documentation
test(core): add Button accessibility tests
```

### Creating a Changeset

Before submitting your PR, create a changeset:

```bash
pnpm changeset
```

Follow the prompts to describe your changes. This helps with versioning and changelog generation.

## Component Guidelines

### Architecture

- **Use signals internally** for state management
- **Expose React hooks** as the public API
- **Keep components focused** - single responsibility
- **Design for composition** - prefer small, composable pieces

### Example Component Structure

```tsx
// packages/core/src/components/button/button.tsx
import { signal } from '@/internal/signals';
import { useSignal } from '@/internal/signals';
import { cn } from '@/utils';
import type { ComponentPropsWithoutRef } from 'react';

// Internal state management with signals
class ButtonState {
  private _pressed = signal(false);
  
  get pressed() {
    return this._pressed.value;
  }
  
  setPressed(value: boolean) {
    this._pressed.value = value;
  }
}

export interface ButtonProps extends ComponentPropsWithoutRef<'button'> {
  variant?: 'primary' | 'secondary';
}

export function Button({ 
  variant = 'primary', 
  className,
  ...props 
}: ButtonProps) {
  // Component implementation
  return (
    <button
      className={cn(
        'base-styles',
        variant === 'primary' && 'primary-styles',
        className
      )}
      {...props}
    />
  );
}
```

### Testing Requirements

Every component must have:

1. **Unit tests** - Test component behavior
2. **Accessibility tests** - Check a11y compliance
3. **Visual tests** - Storybook stories for all variants

```tsx
// button.test.tsx
import { render, screen } from '@testing-library/react';
import { Button } from './button';

describe('Button', () => {
  it('renders correctly', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });
  
  it('is accessible', () => {
    const { container } = render(<Button>Click me</Button>);
    // Add accessibility tests
  });
});
```

### Storybook Stories

```tsx
// button.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './button';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    children: 'Button',
    variant: 'primary',
  },
};
```

## Accessibility

All components must:

- Have proper ARIA attributes
- Be keyboard navigable
- Have sufficient color contrast
- Support screen readers
- Pass axe accessibility tests

## Performance

- Avoid unnecessary re-renders
- Use signals for internal state
- Implement proper memoization when needed
- Keep bundle size minimal

## Pull Request Process

1. **Update documentation** if needed
2. **Add changeset**: `pnpm changeset`
3. **Ensure tests pass**: `pnpm test`
4. **Ensure linting passes**: `pnpm lint`
5. **Submit PR** with clear description
6. **Wait for review** from maintainers

## Questions?

Feel free to open an issue for any questions or concerns!

## License

By contributing, you agree that your contributions will be licensed under the MIT License.
