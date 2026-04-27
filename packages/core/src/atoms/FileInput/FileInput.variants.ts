import { cva, type VariantProps } from "class-variance-authority";
import { radiusMap, transitionMap } from "@/tokens";

/**
 * Variants for the trigger button (non-draggable mode).
 * The zone (draggable mode) uses a separate base class set.
 */
export const fileInputTriggerVariants = cva(
  [
    "inline-flex items-center gap-2 cursor-pointer select-none",
    "px-4 py-2 text-sm font-medium",
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
        full: radiusMap.full,
      },
    },
    defaultVariants: {
      radius: "md",
    },
  },
);

/**
 * Variants for the drag-and-drop zone (draggable mode).
 */
export const fileInputZoneVariants = cva(
  [
    "flex flex-col items-center justify-center gap-2 w-full",
    "border-2 border-dashed border-[var(--color-fw-border)]",
    "bg-[var(--color-fw-background)] text-[var(--color-fw-foreground)]",
    "cursor-pointer select-none px-6 py-10 text-sm",
    "focus-visible:outline-2 focus-visible:outline-offset-0 focus-visible:outline-[var(--color-fw-ring)]",
    "data-[dragging=true]:border-[var(--color-fw-ring)] data-[dragging=true]:bg-[var(--color-fw-surface)]",
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
        full: radiusMap.full,
      },
    },
    defaultVariants: {
      radius: "md",
    },
  },
);

export type FileInputVariants = VariantProps<typeof fileInputTriggerVariants>;
