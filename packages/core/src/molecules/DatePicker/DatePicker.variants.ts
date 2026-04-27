import { cva, type VariantProps } from "class-variance-authority";
import { radiusMap, transitionMap } from "@/tokens";

// ─── Input trigger ────────────────────────────────────────────────────────────

export const datePickerInputVariants = cva(
  [
    "flex items-center justify-between gap-2 w-full cursor-pointer select-none",
    "px-3 h-10 text-sm",
    "bg-[var(--color-fw-background)] text-[var(--color-fw-foreground)]",
    "border border-[var(--color-fw-border)]",
    "focus-visible:outline-2 focus-visible:outline-offset-0 focus-visible:outline-[var(--color-fw-ring)]",
    "disabled:pointer-events-none disabled:opacity-50",
    transitionMap.smooth,
  ],
  {
    variants: {
      radius: {
        none: radiusMap.none,
        sm: radiusMap.sm,
        md: radiusMap.md,
        lg: radiusMap.lg,
        xl: radiusMap.xl,
        "2xl": radiusMap["2xl"],
        full: radiusMap.full,
      },
      error: {
        true: "border-[var(--color-fw-destructive)] focus-visible:outline-[var(--color-fw-destructive)]",
        false: "",
      },
    },
    defaultVariants: {
      radius: "md",
      error: false,
    },
  },
);

// ─── Popover panel ────────────────────────────────────────────────────────────

export const datePickerPopoverVariants = cva([
  "absolute z-50 mt-1 w-72 p-3",
  "bg-[var(--color-fw-background)]",
  "border border-[var(--color-fw-border)]",
  "rounded-lg shadow-lg",
  transitionMap.snappy,
]);

// ─── Calendar header (month nav) ─────────────────────────────────────────────

export const datePickerNavButtonVariants = cva([
  "flex items-center justify-center w-7 h-7 rounded-md",
  "text-[var(--color-fw-muted)]",
  "hover:bg-[var(--color-fw-surface)] hover:text-[var(--color-fw-foreground)]",
  "focus-visible:outline-2 focus-visible:outline-offset-0 focus-visible:outline-[var(--color-fw-ring)]",
  transitionMap.snappy,
]);

// ─── Day cell ─────────────────────────────────────────────────────────────────

export const datePickerDayVariants = cva(
  [
    "flex items-center justify-center w-8 h-8 rounded-md text-sm",
    "focus-visible:outline-2 focus-visible:outline-offset-0 focus-visible:outline-[var(--color-fw-ring)]",
    transitionMap.snappy,
  ],
  {
    variants: {
      selected: {
        true: "bg-[var(--color-fw-foreground)] text-[var(--color-fw-background)] font-semibold",
        false: "",
      },
      today: {
        true: "font-semibold text-[var(--color-fw-foreground)] underline underline-offset-2",
        false: "",
      },
      outside: {
        true: "text-[var(--color-fw-muted)] opacity-40",
        false: "",
      },
      disabled: {
        true: "pointer-events-none opacity-30",
        false: "hover:bg-[var(--color-fw-surface)] cursor-pointer",
      },
    },
    defaultVariants: {
      selected: false,
      today: false,
      outside: false,
      disabled: false,
    },
  },
);

export type DatePickerInputVariants = VariantProps<
  typeof datePickerInputVariants
>;
export type DatePickerDayVariants = VariantProps<typeof datePickerDayVariants>;
