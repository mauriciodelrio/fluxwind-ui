import { cva, type VariantProps } from "class-variance-authority";
import { sizeMap, radiusMap, transitionMap } from "@/tokens";

// ─── Trigger (the visible input-like button) ──────────────────────────────────

export const comboboxTriggerVariants = cva(
  [
    "w-full flex items-center justify-between gap-2",
    "bg-[var(--color-fw-background)] text-[var(--color-fw-foreground)]",
    "border border-[var(--color-fw-border)]",
    "focus-visible:outline-2 focus-visible:outline-offset-0 focus-visible:outline-[var(--color-fw-ring)]",
    "disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-[var(--color-fw-surface)]",
    "aria-[invalid=true]:border-[var(--color-fw-destructive)]",
    "aria-[invalid=true]:focus-visible:outline-[var(--color-fw-destructive)]",
    "cursor-pointer",
  ],
  {
    variants: {
      size: {
        sm: [sizeMap.sm.height, sizeMap.sm.px, sizeMap.sm.text],
        md: [sizeMap.md.height, sizeMap.md.px, sizeMap.md.text],
        lg: [sizeMap.lg.height, sizeMap.lg.px, sizeMap.lg.text],
      },
      radius: {
        none: radiusMap.none,
        sm: radiusMap.sm,
        md: radiusMap.md,
        lg: radiusMap.lg,
        full: radiusMap.full,
      },
      transition: {
        none: transitionMap.none,
        smooth: transitionMap.smooth,
        snappy: transitionMap.snappy,
      },
    },
    defaultVariants: {
      size: "md",
      radius: "md",
      transition: "smooth",
    },
  },
);

// ─── Search input inside the dropdown ────────────────────────────────────────

export const comboboxSearchVariants = cva([
  "w-full bg-transparent text-[var(--color-fw-foreground)]",
  "placeholder:text-[var(--color-fw-muted)]",
  "border-b border-[var(--color-fw-border)]",
  "focus-visible:outline-none",
  "px-3 py-2 text-sm",
]);

// ─── Dropdown panel ───────────────────────────────────────────────────────────

export const comboboxDropdownVariants = cva(
  [
    "absolute z-50 w-full mt-1",
    "bg-[var(--color-fw-background)]",
    "border border-[var(--color-fw-border)]",
    "shadow-md overflow-hidden",
  ],
  {
    variants: {
      radius: {
        none: radiusMap.none,
        sm: radiusMap.sm,
        md: radiusMap.md,
        lg: radiusMap.lg,
        full: radiusMap.sm, // full radius maps to sm for a panel
      },
    },
    defaultVariants: { radius: "md" },
  },
);

// ─── Option item ──────────────────────────────────────────────────────────────

export const comboboxOptionVariants = cva(
  [
    "flex items-center gap-2 px-3 py-2 text-sm cursor-pointer",
    "text-[var(--color-fw-foreground)]",
    "transition-colors duration-100",
    "aria-selected:bg-[var(--color-fw-ring)]/10 aria-selected:text-[var(--color-fw-ring)]",
    "aria-disabled:pointer-events-none aria-disabled:opacity-50",
  ],
  {
    variants: {
      highlighted: {
        true: "bg-[var(--color-fw-surface)]",
        false: "",
      },
    },
    defaultVariants: { highlighted: false },
  },
);

// ─── Types ────────────────────────────────────────────────────────────────────

export type ComboboxVariants = VariantProps<typeof comboboxTriggerVariants>;
export type ComboboxSize = NonNullable<ComboboxVariants["size"]>;
export type ComboboxRadius = NonNullable<ComboboxVariants["radius"]>;
