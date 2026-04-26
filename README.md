<p align="center">
  <img src="assets/logo.svg" alt="FluxWind UI" width="110" />
</p>

<h1 align="center">FluxWind UI</h1>

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENCE)
[![npm](https://img.shields.io/npm/v/@fluxwind/core)](https://www.npmjs.com/package/@fluxwind/core)
[![Sponsor](https://img.shields.io/badge/Sponsor-💖-pink)](FUNDING.md)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)
[![Tests](https://img.shields.io/badge/tests-939%20passing-brightgreen)](packages/core)
[![Coverage](https://img.shields.io/badge/coverage-90%25%2B-brightgreen)](packages/core/coverage)
[![WCAG](https://img.shields.io/badge/a11y-WCAG%202.2%20AA-blue)](https://www.w3.org/TR/WCAG22/)
[![TypeScript](https://img.shields.io/badge/TypeScript-strict-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Storybook](https://img.shields.io/badge/Storybook-10-FF4785?logo=storybook&logoColor=white)](https://storybook.js.org/)

Extensible design system built on React 19, Tailwind CSS 4, and TypeScript strict. WCAG 2.2 AA out of the box, seven installable brand themes, and a fully accessible atomic component library.

---

## Quick Start

```bash
npm install @fluxwind/core
# or
pnpm add @fluxwind/core
```

```tsx
// 1. Import the base styles (required)
import "@fluxwind/core/styles";

// 2. Optionally add a brand theme
import "@fluxwind/core/styles/themes/health";

// 3. Use components
import { Button, Badge, Card } from "@fluxwind/core";

export function App() {
  return (
    <Card.Root>
      <Card.Body>
        <Badge variant="success">Live</Badge>
        <Button variant="primary">Get Started</Button>
      </Card.Body>
    </Card.Root>
  );
}
```

---

## Features

- **49 components** — 26 atoms · 14 molecules · 9 organisms
- **WCAG 2.2 AA** — every component tested with axe-core
- **7 brand themes** — installable CSS files, zero JS overhead
- **Dark mode** — automatic via `data-theme="dark"` or `.dark`
- **TypeScript strict** — full type safety, no `any`
- **CVA variants** — consistent, predictable API across all components
- **Signals state** — `@preact/signals-react` for complex organism internals
- **939 tests** — RTL + axe-core, 90%+ coverage

---

## Brand Themes

FluxWind ships with seven industry-specific brand themes. Each is a single CSS file that overrides the 5 primary color tokens — zero JavaScript, zero runtime cost.

```ts
import "@fluxwind/core/styles";

// Pick one:
import "@fluxwind/core/styles/themes/health";      // Teal — Healthcare, clinical
import "@fluxwind/core/styles/themes/legal";       // Navy — Legal, compliance
import "@fluxwind/core/styles/themes/commerce";    // Amber — E-commerce, retail
import "@fluxwind/core/styles/themes/finance";     // Green — Fintech, banking
import "@fluxwind/core/styles/themes/creative";    // Rose — Creative, agencies
import "@fluxwind/core/styles/themes/education";   // Cyan — EdTech, learning
import "@fluxwind/core/styles/themes/high-contrast"; // WCAG AAA — Accessibility
```

| Theme | Hue | Primary color | WCAG |
|---|---|---|---|
| `default` | 264 | Indigo | AA |
| `health` | 212 | Teal | AA |
| `legal` | 238 | Navy | AA |
| `commerce` | 70 | Amber (dark text) | AA |
| `finance` | 145 | Forest green | AA |
| `creative` | 340 | Rose/magenta | AA |
| `education` | 185 | Cyan | AA |
| `high-contrast` | — | Navy / Yellow canary | **AAA** |

All tokens use **OKLCH** — perceptually uniform, gamut-safe, consistent contrast across hues at the same lightness value.

---

## Components

### Atoms (26)

Single-responsibility building blocks. No dependencies on other components.

| Component | Key variants |
|---|---|
| **Accordion** | `type`: single/multiple · `collapsible` · keyboard navigation |
| **Avatar** | `size`: xs–2xl · `radius`: none–full · fallback: initials/icon |
| **Badge** | `variant`: default/primary/secondary/success/warning/destructive/info/outline |
| **Button** | `variant`: primary/secondary/outline/ghost/destructive/link · `size`: xs–xl |
| **CalendarDayCell** | `state`: default/available/selected/disabled/today · `hasAvailability` dot |
| **CalendarSlotCell** | `status`: available/booked/protected · time label chip |
| **Checkbox** | `size`: sm/md/lg · indeterminate |
| **Chip** | `variant`: default/primary/outline/ghost · `removable` |
| **Divider** | `variant`: solid/dashed/dotted · horizontal/vertical · labeled |
| **Gauge** | Circular arc progress indicator · `size`: sm/md/lg · `variant`: primary/success/warning/destructive |
| **Icon** | Wrapper for `lucide-react` icons |
| **Input** | `size`: sm/md/lg · `status`: default/error/success · prefix/suffix slots |
| **Link** | `variant`: default/muted/destructive · icon slots · polymorphic `as` |
| **List** | `variant`: unordered/ordered/none · `size`: sm/md/lg |
| **Logo** | Brand logo SVG wrapper |
| **Progress** | `variant`: primary/success/warning/destructive · indeterminate |
| **Radio** | `size`: sm/md/lg · `RadioGroup` wrapper |
| **Select** | `size`: sm/md/lg · `status`: default/error |
| **Skeleton** | `shape`: text/rectangle/circle/bar/pill · `animate`: pulse/wave/none |
| **Spinner** | `size`: xs–xl · `variant`: primary/secondary/white |
| **StatusDot** | `status`: online/offline/busy/away/unknown · `pulse` |
| **StatusText** | Inline status label · `status`: success/warning/destructive/info/default |
| **Switch** | `size`: sm/md/lg |
| **Text** | `variant`: display/heading/subheading/body/caption/label/code · polymorphic `as` |
| **Textarea** | `resize`: none/vertical/horizontal/both |
| **Tooltip** | `placement`: top/bottom/left/right |

### Molecules (14)

Composed atoms with their own interaction logic.

| Component | Description |
|---|---|
| **Alert** | Dismissible status banners — info/success/warning/error |
| **CalendarBlockForm** | Form for creating recurring or one-off availability blocks |
| **CalendarBlockList** | List of calendar blocks with edit/delete actions |
| **CalendarMonthPicker** | Month-level calendar grid for day selection; week starts Monday; ARIA grid/row/gridcell |
| **CalendarSlotList** | Scrollable list of bookable time-slot chips with loading skeleton |
| **Card** | Flat/outlined/elevated container with Header/Body/Footer slots |
| **CodeBlock** | Syntax-highlighted code with copy button (Prism) |
| **Combobox** | Async-searchable, multi-select, keyboard navigable |
| **FieldGroup** | Wraps radio/checkbox groups with `<fieldset>`, legend, hint, and error |
| **FormField** | Wraps any input with label, hint, and error |
| **Pagination** | Controlled page navigation with ARIA labels |
| **Rating** | Star rating — half-precision, readOnly, keyboard accessible |
| **SearchBar** | Loading state, clearable, `onSearch` handler |
| **Tabs** | `variant`: line/pill/box · horizontal/vertical · keyboard nav |

### Organisms (9)

Full page sections and complex flows — composable, token-driven, accessible.

| Component | Description |
|---|---|
| **CalendarBooking** | 3-step booking modal: day selection → slot selection → confirmation form |
| **CalendarManager** | Full availability manager combining block form, block list, and month preview |
| **ComponentShowcase** | Developer gallery grid for design system component previews |
| **CTASection** | Call-to-action block · centered/split · brand background |
| **FeatureGrid** | 2/3/4-column card grid · multiple card variants |
| **Footer** | Multi-column · social links · navigation groups · legal links |
| **HeroSection** | Centered/split layout · multiple background modes |
| **Modal** | Accessible `<dialog>` with Header/Body/Footer slots; focus trap; `open`/`onClose` API |
| **Navbar** | Sticky/transparent/blurred bar · compound component · mobile menu · signals state |

---

## Theming Architecture

Tokens are CSS custom properties declared in `@theme` (Tailwind CSS 4). All components reference `var(--color-fw-*)` — never hardcoded colors.

### Activating dark mode

```html
<!-- Via data attribute (recommended) -->
<html data-theme="dark">

<!-- Via class -->
<html class="dark">
```

### Custom theme (advanced)

```css
/* Override any of the 5 primary tokens */
:root {
  --color-fw-primary:       oklch(0.44 0.22 180); /* custom hue */
  --color-fw-primary-hover: oklch(0.38 0.22 180);
  --color-fw-primary-fg:    oklch(1 0 0);
  --color-fw-primary-text:  oklch(0.44 0.22 180);
  --color-fw-ring:          oklch(0.44 0.22 180);
}
```

---

## Project Structure

```
packages/core/
├── src/
│   ├── atoms/          26 atomic components
│   ├── molecules/      14 molecule components
│   ├── organisms/      9 organism components
│   ├── styles/
│   │   ├── index.css         base tokens + Tailwind import
│   │   └── themes/           7 installable brand theme files
│   ├── tokens.ts             sizeMap, radiusMap, focusRingMap, transitionMap
│   └── index.ts              package entry point
├── .storybook/         Storybook 10 configuration
└── package.json        exports for CSS base + all 7 themes
```

Each component follows a consistent structure:

```
Button/
├── Button.tsx           component
├── Button.variants.ts   CVA variants + exported types
├── Button.stories.tsx   Storybook CSF3 stories
├── Button.test.tsx      Vitest + RTL + axe-core
└── index.ts             barrel export
```

---

## Development

```bash
# Install dependencies
pnpm install

# Run Storybook
pnpm --filter @fluxwind/core storybook

# Run tests
pnpm --filter @fluxwind/core test

# Type check
pnpm --filter @fluxwind/core type-check

# Build
pnpm --filter @fluxwind/core build
```

---

## Accessibility

Every component ships with:

- Correct ARIA roles and attributes
- Keyboard navigation following [ARIA APG patterns](https://www.w3.org/WAI/ARIA/apg/)
- Color contrast ≥4.5:1 for normal text, ≥3:1 for large text (WCAG 2.2 AA)
- Focus indicators visible at ≥3:1 contrast
- `axe-core` assertions in every test file
- `prefers-reduced-motion` respected — all transitions disabled

---

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines on adding components, fixing bugs, and submitting pull requests.

---

## License

[MIT](LICENCE) © Mauricio Del Rio
