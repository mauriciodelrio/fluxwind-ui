// ─── Size Tokens ─────────────────────────────────────────────────────────────
// Unified scale used by every component. Never use arbitrary values (h-[37px]).
// If a size doesn't exist here, add it to the map — never write it inline.
//
// All height/text values use Tailwind's rem-based spacing scale, which scales
// with the user's browser font-size setting (WCAG 1.4.4 Resize Text, AA).
//
// Touch target minimums (WCAG 2.5.8, AA):
//   xs  h-7  → 1.75rem ≈ 28px  ⚠  icon-only buttons must add extra padding
//   sm  h-8  → 2.00rem ≈ 32px  ✓  above 24 px minimum
//   md  h-10 → 2.50rem ≈ 40px  ✓  recommended for most interactive elements
//   lg  h-12 → 3.00rem ≈ 48px  ✓  ideal for primary CTAs
//   xl  h-14 → 3.50rem ≈ 56px  ✓  hero-level actions

export const sizeMap = {
  xs: { height: "h-7", px: "px-2", text: "text-xs", icon: "size-3.5" },
  sm: { height: "h-8", px: "px-3", text: "text-sm", icon: "size-4" },
  md: { height: "h-10", px: "px-4", text: "text-sm", icon: "size-4" },
  lg: { height: "h-12", px: "px-5", text: "text-base", icon: "size-5" },
  xl: { height: "h-14", px: "px-6", text: "text-lg", icon: "size-5" },
} as const;

export type Size = keyof typeof sizeMap;

// ─── Radius Tokens ───────────────────────────────────────────────────────────

export const radiusMap = {
  none: "rounded-none",
  sm: "rounded-sm",
  md: "rounded-md",
  lg: "rounded-lg",
  xl: "rounded-xl",
  "2xl": "rounded-2xl",
  full: "rounded-full",
} as const;

export type Radius = keyof typeof radiusMap;

// ─── Shadow Tokens ───────────────────────────────────────────────────────────

export const shadowMap = {
  none: "",
  sm: "shadow-sm",
  md: "shadow-md",
  lg: "shadow-lg",
  xl: "shadow-xl",
} as const;

export type Shadow = keyof typeof shadowMap;

// ─── Transition Tokens ───────────────────────────────────────────────────────
// Consumed as a prop: transition?: Transition (default 'smooth')
// Global CSS enforces prefers-reduced-motion: no animations override.

export const transitionMap = {
  none: "",
  smooth: "transition-all duration-300 ease-in-out",
  snappy: "transition-all duration-150 ease-out",
  spring: "transition-all duration-400 ease-[cubic-bezier(0.34,1.56,0.64,1)]",
  slow: "transition-all duration-500 ease-in-out",
} as const;

export type Transition = keyof typeof transitionMap;

// ─── Focus Ring Tokens ────────────────────────────────────────────────────────
// WCAG 2.4.11 Focus Appearance (AA): minimum 2 CSS px, 3:1 contrast ratio.
// Uses `--color-fw-ring` from @theme — adapts automatically to the active theme.
// Apply via focusRingMap[variant] on every interactive element.

export const focusRingMap = {
  default:
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-fw-ring",
  inset:
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-fw-ring",
  none: "focus-visible:outline-none",
} as const;

export type FocusRing = keyof typeof focusRingMap;

// ─── Disabled State Tokens ────────────────────────────────────────────────────
// `full` adds pointer-events-none to prevent tooltip flicker on disabled state.
// Combine with aria-disabled="true" for screen-reader compatibility.

export const disabledMap = {
  soft: "opacity-50 cursor-not-allowed",
  full: "opacity-50 cursor-not-allowed pointer-events-none",
} as const;

export type Disabled = keyof typeof disabledMap;

// ─── Organism Layout Tokens ───────────────────────────────────────────────────
// Tokens for organism-level layout: container widths and bar heights.
// Shared across organisms (Navbar, HeroSection, Footer, etc.) to enforce a
// consistent page layout scale.

/** Max-width of page-level containers. */
export const containerMaxWidthMap = {
  sm: "max-w-3xl",
  md: "max-w-5xl",
  lg: "max-w-7xl",
  full: "max-w-full",
} as const;

export type ContainerMaxWidth = keyof typeof containerMaxWidthMap;

/** Height of sticky/fixed bars (Navbar, SubNav, etc.). */
export const barHeightMap = {
  md: "h-16", // 64px — standard nav bar
  lg: "h-20", // 80px — taller / hero nav
} as const;

export type BarHeight = keyof typeof barHeightMap;

/** Vertical padding for page-level sections (HeroSection, FeatureGrid, CTA, etc.). */
export const sectionPaddingMap = {
  sm: "py-12 sm:py-16",
  md: "py-16 sm:py-24",
  lg: "py-24 sm:py-32",
} as const;

export type SectionPadding = keyof typeof sectionPaddingMap;
