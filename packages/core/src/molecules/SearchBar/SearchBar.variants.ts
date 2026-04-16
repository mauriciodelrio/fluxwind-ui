import { cva, type VariantProps } from "class-variance-authority";
import { sizeMap, radiusMap } from "@/tokens";

// ─── Input wrapper (the full pill/box) ───────────────────────────────────────
// We build our own input classes rather than reusing inputVariants so we can
// fine-tune padding to accommodate the fixed leading search icon and optional
// trailing clear button without prop-drilling into Input atom.

export const searchBarInputVariants = cva(
  [
    "w-full bg-[var(--color-fw-background)] text-[var(--color-fw-foreground)]",
    "border border-[var(--color-fw-border)]",
    "placeholder:text-[var(--color-fw-muted)]",
    "focus-visible:outline-2 focus-visible:outline-offset-0 focus-visible:outline-[var(--color-fw-ring)]",
    "disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-[var(--color-fw-surface)]",
    // Leading icon padding is always applied; trailing clear button padding
    // is controlled via a data attribute on the wrapper (see SearchBar.tsx)
    "pl-9",
  ],
  {
    variants: {
      size: {
        sm: [sizeMap.sm.height, sizeMap.sm.text, "pr-3"],
        md: [sizeMap.md.height, sizeMap.md.text, "pr-3"],
        lg: [sizeMap.lg.height, sizeMap.lg.text, "pr-4"],
      },
      radius: {
        none: radiusMap.none,
        sm: radiusMap.sm,
        md: radiusMap.md,
        lg: radiusMap.lg,
        full: radiusMap.full,
      },
    },
    defaultVariants: { size: "md", radius: "md" },
  },
);

// ─── Clear button ─────────────────────────────────────────────────────────────

export const searchBarClearVariants = cva(
  [
    "absolute inset-y-0 right-0 flex items-center cursor-pointer",
    "text-[var(--color-fw-muted)] hover:text-[var(--color-fw-foreground)]",
    "focus-visible:outline-2 focus-visible:outline-offset-1",
    "focus-visible:outline-[var(--color-fw-ring)]",
    "rounded transition-colors duration-150",
  ],
  {
    variants: {
      size: {
        sm: "px-2",
        md: "px-2.5",
        lg: "px-3",
      },
    },
    defaultVariants: { size: "md" },
  },
);

// ─── Types ────────────────────────────────────────────────────────────────────

export type SearchBarVariants = VariantProps<typeof searchBarInputVariants>;
export type SearchBarSize = NonNullable<SearchBarVariants["size"]>;
export type SearchBarRadius = NonNullable<SearchBarVariants["radius"]>;
