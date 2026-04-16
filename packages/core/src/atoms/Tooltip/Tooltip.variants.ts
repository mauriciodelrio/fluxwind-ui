import { cva, type VariantProps } from "class-variance-authority";
import { transitionMap } from "@/tokens";

/**
 * The tooltip bubble — positioned absolutely relative to the wrapper.
 * Visibility is driven by `group-hover` and `group-focus-within` on the wrapper.
 *
 * `placement` drives the position (top/bottom/left/right).
 * Each placement variant includes the arrow pseudo-element positioning via
 * data-placement on the wrapper, handled in Tooltip.tsx with inline logic.
 */
export const tooltipBubbleVariants = cva(
  [
    // Layout
    "absolute z-50 pointer-events-none",
    "px-2.5 py-1.5 rounded-md",
    "max-w-xs w-max",
    // Typography
    "text-xs font-medium leading-snug",
    // Colours (inverted for contrast)
    "bg-[var(--color-fw-foreground)] text-[var(--color-fw-background)]",
    // Visible only on group-hover / group-focus-within
    "invisible opacity-0",
    "group-hover:visible group-hover:opacity-100",
    "group-focus-within:visible group-focus-within:opacity-100",
    transitionMap.snappy,
    // Don't inherit the group transitions on wrapper — scoped to bubble only
    "transition-[opacity,visibility]",
  ],
  {
    variants: {
      placement: {
        top: ["bottom-full left-1/2 -translate-x-1/2 mb-2"],
        bottom: ["top-full left-1/2 -translate-x-1/2 mt-2"],
        left: ["right-full top-1/2 -translate-y-1/2 mr-2"],
        right: ["left-full top-1/2 -translate-y-1/2 ml-2"],
      },
    },
    defaultVariants: { placement: "top" },
  },
);

/**
 * Arrow — a small rotated square anchored to the bubble edge facing the trigger.
 * One set of classes per placement.
 */
export const tooltipArrowVariants = cva(
  ["absolute size-2 rotate-45", "bg-[var(--color-fw-foreground)]"],
  {
    variants: {
      placement: {
        top: "top-full left-1/2 -translate-x-1/2 -translate-y-1/2",
        bottom: "bottom-full left-1/2 -translate-x-1/2 translate-y-1/2",
        left: "left-full top-1/2 -translate-x-1/2 -translate-y-1/2",
        right: "right-full top-1/2 translate-x-1/2 -translate-y-1/2",
      },
    },
    defaultVariants: { placement: "top" },
  },
);

export type TooltipVariants = VariantProps<typeof tooltipBubbleVariants>;
