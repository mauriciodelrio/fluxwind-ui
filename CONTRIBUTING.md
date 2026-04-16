# Contributing to FluxWind UI

Thanks for your interest in contributing! FluxWind is an open-source design system and every contribution — whether it's a new component, a bug fix, an accessibility improvement, or a documentation clarification — makes it better for everyone.

---

## Getting Started

1. **Fork** the repository
2. **Clone** your fork locally
3. **Install dependencies** with pnpm (required):
   ```bash
   pnpm install
   ```
4. **Create a branch** from `main` using conventional naming:
   ```bash
   git checkout -b feat/add-tooltip-arrow
   git checkout -b fix/button-focus-ring-dark
   git checkout -b a11y/combobox-keyboard-nav
   ```

---

## Adding a New Component

### Folder structure

Every component lives in its own folder with four mandatory files:

```
packages/core/src/atoms/MyComponent/
├── MyComponent.tsx           component implementation
├── MyComponent.variants.ts   CVA variants + exported types
├── MyComponent.stories.tsx   Storybook CSF3 stories
├── MyComponent.test.tsx      Vitest + RTL + axe-core tests
└── index.ts                  barrel export
```

### Required checklist

- [ ] All color classes use `var(--color-fw-*)` tokens — no hardcoded colors
- [ ] All size/radius/transition values come from `sizeMap`, `radiusMap`, or `transitionMap` in `tokens.ts`
- [ ] ARIA roles and attributes follow [ARIA APG patterns](https://www.w3.org/WAI/ARIA/apg/)
- [ ] Keyboard navigation works (Tab, Enter, Space, Escape, arrow keys as applicable)
- [ ] `axe-core` assertion included in the test file (`expect(await axe(container)).toHaveNoViolations()`)
- [ ] All CVA variant types exported from `.variants.ts`
- [ ] Component added to the barrel export in `src/atoms/index.ts` (or molecules/organisms)
- [ ] At least one Storybook story per major variant

### The token rule

Components must **never** use Tailwind's built-in color palette or hardcoded hex/rgba values. Always reference FluxWind tokens:

```tsx
// ✅ Correct
className="text-[var(--color-fw-primary-text)] bg-[var(--color-fw-primary)]"

// ❌ Wrong
className="text-blue-600 bg-blue-500"
className="text-[#3b82f6]"
```

---

## Fixing a Bug

1. Reproduce the bug with a failing test before fixing it
2. Fix the smallest possible change — no scope creep
3. Ensure `pnpm test` and `pnpm type-check` pass after the fix

---

## Accessibility Contributions

Accessibility fixes are **high priority** and always welcome. When fixing a contrast issue:

- Use OKLCH values — check that L (lightness) produces ≥4.5:1 on the intended background
- Verify with the browser DevTools accessibility tree and contrast checker
- If the fix changes token values, update both `src/styles/index.css` and `.storybook/preview.css`

---

## Commit Convention

We use [Conventional Commits](https://www.conventionalcommits.org/):

| Prefix | Usage |
|--------|-------|
| `feat:` | New component or feature |
| `fix:` | Bug fix |
| `a11y:` | Accessibility improvement |
| `style:` | Token, CSS, or visual change |
| `refactor:` | Code restructure without behavior change |
| `test:` | Add or update tests |
| `docs:` | README, CONTRIBUTING, or Storybook docs |
| `chore:` | Tooling, dependencies, CI config |

Examples:
```
feat: add Timeline molecule component
fix: button focus ring missing in dark mode
a11y: add aria-live to Alert dismiss
style: adjust legal theme navy contrast to 5:1
test: add axe assertion to Combobox stories
```

---

## Pull Request Process

1. **One PR per component or change** — keep scope focused
2. **All checks must pass** — tests, type-check, lint
3. **Include Storybook screenshots** if your change is visual
4. **Reference the issue** if your PR relates to one

---

## Code of Conduct

- Be respectful and constructive
- Welcome newcomers — no question is too simple
- Keep discussions focused on the contribution

---

## Questions?

Open a [GitHub Issue](https://github.com/mauriciodelrio/fluxwind-ui/issues) or start a [Discussion](https://github.com/mauriciodelrio/fluxwind-ui/discussions).

---

Thank you for helping make FluxWind better for everyone!
