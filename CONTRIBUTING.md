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
4. **Create a branch** following our naming convention (see [Branching Strategy](#branching-strategy))

## Branching Strategy

We follow a **simplified Git Flow** with semantic branch naming.

### Branch Structure

#### Permanent Branches

- **`main`** - Production-ready code, always stable
  - Protected: requires PR approval
  - Tagged with version numbers (`v1.0.0`, `v1.1.0`, etc.)
  - Only accepts merges from `develop`

- **`develop`** - Integration branch for features
  - Latest development state
  - All feature branches start from here
  - Merged into `main` for releases

#### Temporary Branches

All temporary branches must follow this naming pattern:

```
<prefix>/<descriptive-name>
```

**Valid prefixes:**

| Prefix      | Purpose                       | Example                       |
| ----------- | ----------------------------- | ----------------------------- |
| `feature/`  | New features and enhancements | `feature/button-component`    |
| `fix/`      | Bug fixes                     | `fix/dropdown-keyboard-nav`   |
| `docs/`     | Documentation changes         | `docs/contributing-guide`     |
| `refactor/` | Code refactoring              | `refactor/signal-performance` |
| `test/`     | Adding or updating tests      | `test/button-accessibility`   |
| `chore/`    | Maintenance tasks             | `chore/upgrade-deps`          |
| `perf/`     | Performance improvements      | `perf/reduce-bundle-size`     |
| `ci/`       | CI/CD configuration           | `ci/add-lighthouse`           |
| `revert/`   | Reverting previous changes    | `revert/broken-feature`       |

**Naming rules:**

- Use lowercase letters, numbers, and hyphens
- Start and end with alphanumeric characters
- Be descriptive and specific
- Avoid generic names like `feature/new-stuff` or `fix/bug`

**Examples:**

```bash
✓ feature/button-component
✓ feature/dropdown-with-keyboard-nav
✓ fix/tooltip-positioning
✓ docs/animation-tokens
✓ refactor/use-cva-for-variants
✓ test/button-a11y
✓ chore/upgrade-react-19

✗ feature/new-feature
✗ fix/bug
✗ Feature/Button (uppercase)
✗ button-component (no prefix)
```

### Workflow

#### Starting a New Feature

```bash
# Option 1: Manual workflow
# 1. Ensure you're on develop and it's up to date
git checkout develop
git pull origin develop

# 2. Create your branch
git checkout -b feature/my-awesome-feature

# Option 2: Using helper scripts (recommended)
pnpm branch:feature my-awesome-feature
# This automatically checks out develop, pulls latest, and creates feature/my-awesome-feature

# Available branch helpers:
# pnpm branch:feature <name>    - Create feature branches
# pnpm branch:fix <name>         - Create fix branches
# pnpm branch:docs <name>        - Create documentation branches
# pnpm branch:refactor <name>    - Create refactor branches
# pnpm branch:test <name>        - Create test branches
# pnpm branch:chore <name>       - Create chore branches

# 3. Make your changes and commit
git add .
git commit -m "feat(core): add awesome feature"

# 4. Push your branch
git push origin feature/my-awesome-feature

# 5. Open a Pull Request to `develop`
```

#### Validating Your Branch Name

You can manually validate your branch name:

```bash
pnpm branch:validate
```

This will check if your current branch follows our naming convention.

#### Creating a Release

```bash
# 1. Merge develop into main
git checkout main
git merge develop --no-ff

# 2. Create a version tag
git tag -a v1.0.0 -m "Release v1.0.0"

# 3. Push to remote
git push origin main --tags
```

### Branch Validation

We use **Husky hooks** to enforce branch naming automatically:

- **Pre-push hook** validates branch name before pushing
- Invalid branch names will show helpful error messages
- Protected branches (`main`, `develop`) are always allowed

If you have an invalid branch name, rename it:

```bash
git branch -m old-branch-name feature/new-valid-name
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

We use [Conventional Commits](https://www.conventionalcommits.org/) with **enforced scopes**:

```
<type>(<scope>): <description>

[optional body]

[optional footer]
```

#### Types

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `perf`: Performance improvements
- `test`: Adding or updating tests
- `build`: Build system changes
- `ci`: CI/CD changes
- `chore`: Maintenance tasks
- `revert`: Revert previous changes

#### Scopes

Scopes are **required** and must be one of the following:

**Package scopes:**

- `core` - @fluxwind-ui/core (React components)
- `themes` - @fluxwind-ui/themes (Design tokens and themes)
- `utils` - @fluxwind-ui/utils (Utility functions)

**Component scopes** (when working on specific components):

- `button`, `input`, `select`, `checkbox`, `radio`, `switch`, `slider`
- `dropdown`, `modal`, `dialog`, `tooltip`, `popover`, `toast`, `alert`
- `badge`, `avatar`, `card`, `table`, `tabs`, `accordion`
- `breadcrumb`, `pagination`, `menu`, `sidebar`, `navbar`, `footer`
- `form`, `datepicker`, `timepicker`, `calendar`
- `progress`, `spinner`, `skeleton`

**Feature/Area scopes:**

- `a11y` - Accessibility improvements
- `i18n` - Internationalization
- `animation` - Animation system
- `tokens` - Design tokens
- `signals` - Signal system
- `hooks` - React hooks
- `types` - TypeScript types
- `icons` - Icon system
- `layout` - Layout components

**Infrastructure scopes:**

- `deps` - Dependencies
- `dx` - Developer experience
- `config` - Configuration files
- `scripts` - Build/dev scripts
- `ci` - CI/CD
- `release` - Release process
- `security` - Security fixes/improvements

**Documentation scopes:**

- `docs` - General documentation
- `storybook` - Storybook stories
- `examples` - Example applications
- `playground` - Playground app
- `contributing` - Contributing guide
- `readme` - README files
- `changelog` - CHANGELOG files

**Monorepo scopes:**

- `monorepo` - Monorepo configuration
- `workspace` - Workspace configuration

#### Examples

```bash
# Package scopes
feat(core): add Button component
feat(themes): add sepia theme variant
fix(utils): correct debounce timing

# Component scopes (for granularity)
feat(button): add loading state with spinner
feat(button): add icon support
fix(dropdown): resolve keyboard navigation issue
test(modal): add accessibility tests

# Feature/Area scopes
feat(a11y): add ARIA labels to all interactive components
feat(animation): implement spring physics system
refactor(signals): improve performance with batching
docs(tokens): document color token usage

# Infrastructure scopes
chore(deps): upgrade React to v19
ci(release): add automated changelog generation
build(config): optimize bundle size
```

#### Commit Message Rules

- Use **present tense** ("add feature" not "added feature")
- Use **imperative mood** ("move cursor to..." not "moves cursor to...")
- Keep first line under **72 characters**
- Reference issues/PRs when applicable: `fixes #123`
- Add breaking changes in footer: `BREAKING CHANGE: removed old API`

### Creating a Changeset

Before submitting your PR, create a changeset:

```bash
pnpm changeset
```

Follow the prompts to describe your changes. This helps with versioning and changelog generation.

### Using PR Agent (AI Assistant)

We use [PR Agent](https://github.com/Codium-ai/pr-agent) to help with pull request descriptions and code reviews.

**Available Commands** (comment on your PR):

- `/describe` - Auto-generate comprehensive PR description
  - Analyzes all code changes
  - Categorizes changes (Added/Modified/Removed)
  - Identifies affected packages
  - Suggests labels and type

- `/review` - Get AI code review
  - Security analysis
  - Performance suggestions
  - Best practices check
  - Accessibility review
  - Estimates review effort

- `/improve` - Get code improvement suggestions
  - React patterns optimization
  - TypeScript improvements
  - Performance enhancements
  - Accessibility fixes

- `/ask <question>` - Ask questions about the changes
  - Example: `/ask how does this affect bundle size?`
  - Example: `/ask what are the accessibility implications?`

- `/update_changelog` - Update changelog based on changes

**Automatic Features:**

- ✅ Auto-description on PR open (if not draft)
- ✅ Auto-review when PR is ready for review
- ✅ Labels suggested based on changes
- ✅ Breaking change detection

**Best Practices:**

1. Open PR as **draft** initially to prevent auto-review
2. Use `/describe` after pushing all commits
3. Review AI suggestions before requesting human review
4. Use `/ask` for clarification on complex changes

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

export function Button({ variant = 'primary', className, ...props }: ButtonProps) {
  // Component implementation
  return (
    <button
      className={cn('base-styles', variant === 'primary' && 'primary-styles', className)}
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
5. **Generate PR description**: `pnpm pr:generate` (optional but recommended)
6. **Submit PR** with clear description
7. **Wait for review** from maintainers

### Generating PR Descriptions

We provide a handy script to automatically generate comprehensive PR descriptions based on your branch name and changes:

```bash
# Generate PR description comparing to develop (default)
pnpm pr:generate

# Generate PR description comparing to main
pnpm pr:generate:main

# Or run directly with custom base branch
.husky/scripts/generate-pr-description.sh my-base-branch
```

The script will:
- Analyze your branch name and extract type, scope, and description
- List all commits on your branch
- Categorize changed files
- Generate statistics about your changes
- Create a well-structured PR description following our template

Simply copy the generated output and paste it into your PR description!

## Questions?

Feel free to open an issue for any questions or concerns!

## License

By contributing, you agree that your contributions will be licensed under the MIT License.
