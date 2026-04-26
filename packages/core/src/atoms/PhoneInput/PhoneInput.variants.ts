import { cva, type VariantProps } from "class-variance-authority";
import { sizeMap, radiusMap, transitionMap } from "@/tokens";

/**
 * Wrapper variants — applied to the outer div that hosts the flag button + input.
 * The border, background, and focus-ring live here (not on the inner <input>).
 */
export const phoneInputWrapperVariants = cva(
  [
    "relative flex items-center w-full overflow-hidden",
    "bg-[var(--color-fw-background)]",
    "border border-[var(--color-fw-border)]",
    "focus-within:outline-2 focus-within:outline-offset-0 focus-within:outline-[var(--color-fw-ring)]",
  ],
  {
    variants: {
      size: {
        sm: sizeMap.sm.height,
        md: sizeMap.md.height,
        lg: sizeMap.lg.height,
      },
      radius: {
        none: radiusMap.none,
        sm: radiusMap.sm,
        md: radiusMap.md,
        lg: radiusMap.lg,
        xl: radiusMap.xl,
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

export type PhoneInputVariants = VariantProps<typeof phoneInputWrapperVariants>;
