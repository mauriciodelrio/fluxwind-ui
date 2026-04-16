import { cva, type VariantProps } from "class-variance-authority";
import { sizeMap, radiusMap, transitionMap } from "@/tokens";

export const selectVariants = cva(
  [
    // Layout — pr-9 reserves room for the custom chevron
    "w-full appearance-none pr-9",
    "bg-[var(--color-fw-background)] text-[var(--color-fw-foreground)]",
    "border border-[var(--color-fw-border)]",
    // Focus ring
    "focus-visible:outline-2 focus-visible:outline-offset-0 focus-visible:outline-[var(--color-fw-ring)]",
    // Disabled
    "disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-[var(--color-fw-surface)]",
    // Error
    "aria-[invalid=true]:border-[var(--color-fw-destructive)]",
    "aria-[invalid=true]:focus-visible:outline-[var(--color-fw-destructive)]",
    // Option colour inside native popup (limited styling — intentional)
    "[&>option]:bg-[var(--color-fw-background)] [&>option]:text-[var(--color-fw-foreground)]",
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

export type SelectVariants = VariantProps<typeof selectVariants>;
