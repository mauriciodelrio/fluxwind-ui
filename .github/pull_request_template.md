## Description

<!-- Brief summary of the changes made and why. -->

## Type of Change

- [ ] New atom / molecule / organism
- [ ] Bug fix
- [ ] Refactor
- [ ] Tokens update
- [ ] Storybook / docs only
- [ ] CI / config

## Checklist

- [ ] Follows Conventional Commits in all messages
- [ ] Granular commits (1 commit = 1 logical task)
- [ ] No `console.log` or commented-out code
- [ ] No `any` types — strict TypeScript throughout
- [ ] No arbitrary Tailwind values — all sizes/colors from tokens
- [ ] Tests added/updated (Vitest + RTL + axe-core)
- [ ] Tests pass locally (`pnpm test`)
- [ ] Successful build (`pnpm build`)
- [ ] Type-check passes (`pnpm type-check`)
- [ ] Changeset added (`pnpm changeset`) — skip for docs/CI-only changes

## Storybook

- [ ] Story added or updated for the component
- [ ] All variants and states are covered (default, hover, focus, disabled, loading)
- [ ] Verified visually in Storybook (`pnpm storybook`)

## Accessibility

- [ ] `axe-core` reports zero violations
- [ ] Fully keyboard-navigable (Tab, Enter/Space, Escape, arrow keys where applicable)
- [ ] WCAG 2.2 AA color contrast verified
- [ ] Touch targets meet minimum size (24×24 px; 44×44 px preferred for primary actions)
- [ ] `aria-*` attributes and roles correctly applied
- [ ] Responsive layout verified (mobile + desktop)

## Tests

<!-- Attach screenshot or paste test output. -->

### Unit / Component
<!-- ![tests](url) -->

## Build

<!-- Attach screenshot or paste successful build output. -->
<!-- ![build](url) -->

## Additional Notes

<!-- Extra context, technical decisions, trade-offs. Remove section if not applicable. -->
