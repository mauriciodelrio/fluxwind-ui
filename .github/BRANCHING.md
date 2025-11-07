# Branching Strategy - Quick Reference

This document provides a quick reference for Fluxwind UI's branching strategy.

For complete contribution guidelines, see [CONTRIBUTING.md](../../CONTRIBUTING.md).

## Branch Structure

### Permanent Branches

- **`main`** - Production code (protected, requires PR)
- **`develop`** - Integration branch (all features merge here first)

### Temporary Branch Naming

```
<prefix>/<descriptive-name>
```

#### Valid Prefixes

| Prefix | Purpose | Example |
|--------|---------|---------|
| `feature/` | New features | `feature/button-component` |
| `fix/` | Bug fixes | `fix/dropdown-keyboard-nav` |
| `docs/` | Documentation | `docs/contributing-guide` |
| `refactor/` | Refactoring | `refactor/signal-performance` |
| `test/` | Tests | `test/button-accessibility` |
| `chore/` | Maintenance | `chore/upgrade-deps` |
| `perf/` | Performance | `perf/reduce-bundle-size` |
| `ci/` | CI/CD | `ci/add-lighthouse` |
| `revert/` | Reverts | `revert/broken-feature` |

#### Naming Rules

- ✅ Lowercase only
- ✅ Use hyphens for spaces
- ✅ Be descriptive
- ❌ No generic names (`feature/new-stuff`)
- ❌ No uppercase (`Feature/Button`)

## Quick Start

### Creating a New Branch

**Using helper scripts (recommended):**

```bash
pnpm branch:feature my-awesome-feature
pnpm branch:fix tooltip-positioning
pnpm branch:docs animation-tokens
```

**Manual workflow:**

```bash
git checkout develop
git pull origin develop
git checkout -b feature/my-awesome-feature
```

### Validation

Branch names are automatically validated on `git push`. You can also validate manually:

```bash
pnpm branch:validate
```

## Commit Message Format

```
<type>(<scope>): <description>
```

### Required Scopes

**Package scopes:**
- `core`, `themes`, `utils`

**Component scopes:**
- `button`, `input`, `dropdown`, `modal`, etc.

**Feature scopes:**
- `a11y`, `animation`, `tokens`, `signals`, `hooks`, etc.

**Infrastructure scopes:**
- `deps`, `ci`, `config`, `dx`, etc.

**Documentation scopes:**
- `docs`, `storybook`, `readme`, `contributing`, etc.

### Examples

```bash
feat(core): add Button component with variants
feat(button): add loading state
fix(dropdown): resolve keyboard navigation
docs(tokens): document color system
test(modal): add accessibility tests
chore(deps): upgrade React to v19
```

## Workflow Overview

```
develop ──┬──> feature/x ──┐
          ├──> fix/y ───────┼──> develop ──> main (release)
          └──> docs/z ──────┘
```

1. Branch from `develop`
2. Make changes and commit
3. Push and open PR to `develop`
4. After review, merge to `develop`
5. When ready for release, merge `develop` to `main`

## Protection Rules

- **`main`** - Requires PR approval, CI must pass
- **`develop`** - CI must pass
- **Branch names** - Validated on push (via Husky)
- **Commits** - Must follow Conventional Commits (via commitlint)

## Resources

- [Full Contributing Guide](../../CONTRIBUTING.md)
- [Conventional Commits](https://www.conventionalcommits.org/)
- [Semantic Versioning](https://semver.org/)
