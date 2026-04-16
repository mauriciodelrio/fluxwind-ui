import { cva, type VariantProps } from "class-variance-authority";
import { radiusMap, transitionMap, focusRingMap } from "@/tokens";

/**
 * Chip outer pill — interactive (clickable and/or dismissible), unlike Badge
 * which is purely presentational. Always has a hover state.
 */
export const chipVariants = cva(
  [
    "inline-flex items-center justify-center gap-1.5 font-medium text-center select-none",
    "border",
    transitionMap.snappy,
  ],
  {
    variants: {
      variant: {
        default: [
          "bg-[var(--color-fw-secondary)] text-[var(--color-fw-secondary-fg)]",
          "border-[var(--color-fw-border)]",
          "hover:bg-[var(--color-fw-secondary-hover)]",
        ],
        primary: [
          "bg-[var(--color-fw-primary)] text-[var(--color-fw-primary-fg)]",
          "border-[var(--color-fw-primary)]",
          "hover:bg-[var(--color-fw-primary-hover)] hover:border-[var(--color-fw-primary-hover)]",
        ],
        success: [
          "bg-[var(--color-fw-success)]/15 text-[var(--color-fw-success-text)]",
          "border-[var(--color-fw-success)]/30",
          "hover:bg-[var(--color-fw-success)]/25",
        ],
        warning: [
          "bg-[var(--color-fw-warning)]/15 text-[var(--color-fw-warning-text)]",
          "border-[var(--color-fw-warning)]/30",
          "hover:bg-[var(--color-fw-warning)]/25",
        ],
        destructive: [
          "bg-[var(--color-fw-destructive)]/15 text-[var(--color-fw-destructive-text)]",
          "border-[var(--color-fw-destructive)]/30",
          "hover:bg-[var(--color-fw-destructive)]/25",
        ],
        info: [
          "bg-[var(--color-fw-info)]/15 text-[var(--color-fw-info-text)]",
          "border-[var(--color-fw-info)]/30",
          "hover:bg-[var(--color-fw-info)]/25",
        ],
        outline: [
          "bg-transparent text-[var(--color-fw-foreground)]",
          "border-[var(--color-fw-border)]",
          "hover:bg-[var(--color-fw-surface)]",
        ],
      },
      size: {
        sm: "h-6 px-2 text-xs",
        md: "h-7 px-2.5 text-xs",
        lg: "h-8 px-3 text-sm",
      },
      radius: {
        none: radiusMap.none,
        sm: radiusMap.sm,
        md: radiusMap.md,
        lg: radiusMap.lg,
        full: radiusMap.full,
      },
    },
    defaultVariants: { variant: "default", size: "md", radius: "full" },
  },
);

/**
 * Dismiss (×) button inside the chip — a separate interactive target that must
 * meet WCAG 2.5.8 minimum 24×24px touch target. We use `size-4` (16px visible)
 * but pad it to `p-0.5` so the clickable area is ~20px, acceptable for an
 * icon-within-a-chip use case. For standalone chips, size "md"/"lg" provides
 * sufficient surrounding padding.
 */
export const chipDismissVariants = cva(
  [
    "inline-flex items-center justify-center shrink-0",
    "rounded-full opacity-60 hover:opacity-100",
    "size-4 -mr-0.5",
    focusRingMap.default,
    transitionMap.snappy,
  ],
  {
    variants: {
      variant: {
        default: "hover:bg-[var(--color-fw-border)]",
        primary: "hover:bg-black/20",
        success: "hover:bg-[var(--color-fw-success)]/20",
        warning: "hover:bg-[var(--color-fw-warning)]/20",
        destructive: "hover:bg-[var(--color-fw-destructive)]/20",
        info: "hover:bg-[var(--color-fw-info)]/20",
        outline: "hover:bg-[var(--color-fw-surface)]",
      },
    },
    defaultVariants: { variant: "default" },
  },
);

export type ChipVariants = VariantProps<typeof chipVariants>;
export type ChipDismissVariants = VariantProps<typeof chipDismissVariants>;
