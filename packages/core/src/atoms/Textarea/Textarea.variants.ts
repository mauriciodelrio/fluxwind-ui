import { cva, type VariantProps } from "class-variance-authority";
import { radiusMap, transitionMap } from "@/tokens";

export const textareaVariants = cva(
  [
    "w-full bg-[var(--color-fw-background)] text-[var(--color-fw-foreground)]",
    "border border-[var(--color-fw-border)]",
    "placeholder:text-[var(--color-fw-muted)]",
    "focus-visible:outline-2 focus-visible:outline-offset-0 focus-visible:outline-[var(--color-fw-ring)]",
    "disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-[var(--color-fw-surface)]",
    "aria-[invalid=true]:border-[var(--color-fw-destructive)]",
    "aria-[invalid=true]:focus-visible:outline-[var(--color-fw-destructive)]",
    "px-3 py-2 text-sm",
    "min-h-[80px]",
  ],
  {
    variants: {
      resize: {
        none: "resize-none",
        vertical: "resize-y",
        horizontal: "resize-x",
        both: "resize",
      },
      radius: {
        none: radiusMap.none,
        sm: radiusMap.sm,
        md: radiusMap.md,
        lg: radiusMap.lg,
        xl: radiusMap.xl,
      },
      transition: {
        none: transitionMap.none,
        smooth: transitionMap.smooth,
        snappy: transitionMap.snappy,
      },
    },
    defaultVariants: {
      resize: "vertical",
      radius: "md",
      transition: "smooth",
    },
  },
);

export type TextareaVariants = VariantProps<typeof textareaVariants>;
