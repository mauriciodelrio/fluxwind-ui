import { cva, type VariantProps } from "class-variance-authority";
import { radiusMap } from "@/tokens";

export const avatarVariants = cva(
  [
    "relative inline-flex items-center justify-center shrink-0",
    "overflow-hidden select-none font-medium",
    "bg-[var(--color-fw-secondary)] text-[var(--color-fw-foreground)]",
    "border border-[var(--color-fw-border)]",
  ],
  {
    variants: {
      size: {
        xs: "size-6  text-[10px]",
        sm: "size-8  text-xs",
        md: "size-10 text-sm",
        lg: "size-12 text-base",
        xl: "size-16 text-xl",
      },
      radius: {
        none: radiusMap.none,
        sm: radiusMap.sm,
        md: radiusMap.md,
        lg: radiusMap.lg,
        full: radiusMap.full,
      },
    },
    defaultVariants: {
      size: "md",
      radius: "full",
    },
  },
);

export type AvatarVariants = VariantProps<typeof avatarVariants>;
