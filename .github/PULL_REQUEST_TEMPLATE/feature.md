---
name: Feature Pull Request
about: Submit a new feature or enhancement
title: 'feat: '
labels: enhancement
---

## ✨ Feature Description

<!-- Clearly describe the new feature or enhancement -->

## 🎯 Motivation

<!-- Why is this feature needed? What problem does it solve? -->

## 📋 Implementation Details

<!-- Describe the technical approach and key changes -->

### Components Added/Modified

-
-

### API Changes

<!-- List any new props, hooks, or API changes -->

-

## 🎨 UI/UX Changes

<!-- Screenshots or videos of the new feature -->

### Before

<!-- If modifying existing feature -->

### After

## 🧪 Testing

- [ ] Unit tests added/updated
- [ ] Integration tests added/updated
- [ ] Storybook stories added/updated
- [ ] Manual testing completed
- [ ] Accessibility testing completed (keyboard navigation, screen readers)

## 📚 Documentation

- [ ] Component documentation updated
- [ ] Storybook documentation added
- [ ] README updated (if needed)
- [ ] Examples added to GETTING_STARTED.md (if needed)

## ⚠️ Breaking Changes

<!-- Does this introduce any breaking changes? -->

- [ ] Yes
- [ ] No

<!-- If yes, describe the breaking changes and migration path -->

## 📦 Bundle Size Impact

<!-- Run `pnpm build` and note any significant size changes -->

- Bundle size change: <!-- +X KB / -X KB / no change -->

## ♿️ Accessibility

<!-- Confirm accessibility compliance -->

- [ ] Keyboard navigation works
- [ ] Screen reader compatible
- [ ] Color contrast meets WCAG standards
- [ ] Focus indicators visible

## 🔍 Checklist

- [ ] Code follows project conventions
- [ ] All tests pass
- [ ] No console warnings/errors
- [ ] Signals-based internal state (if stateful)
- [ ] React hooks exposed externally
- [ ] TypeScript types exported
- [ ] Changesets added (`pnpm changeset`)
