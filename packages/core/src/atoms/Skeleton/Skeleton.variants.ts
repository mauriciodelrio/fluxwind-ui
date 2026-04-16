import { cva, type VariantProps } from "class-variance-authority";

/**
 * Skeleton variants — shape controls geometry, animate controls the loading
 * feedback style.
 *
 * `shape="text"`   → full-width, 1rem tall line (text placeholder)
 * `shape="circle"` → fully rounded; pair with a `size-*` className
 * `shape="rect"`   → full-width block; pair with an `h-*` className
 *
 * `animate="pulse"`   → Tailwind's `animate-pulse` opacity effect (default)
 * `animate="shimmer"` → moving gradient sweep via `fw-skeleton-shimmer`
 * `animate="none"`    → static placeholder (useful for reduced-motion contexts
 *                        or when a parent controls the transition)
 */
export const skeletonVariants = cva("block", {
  variants: {
    shape: {
      text: "h-4 w-full rounded-sm",
      circle: "rounded-full",
      rect: "w-full rounded-md",
    },
    animate: {
      pulse: "bg-[var(--color-fw-border)] motion-safe:animate-pulse",
      shimmer: "fw-skeleton-shimmer motion-safe:animate-fw-skeleton-shimmer",
      none: "bg-[var(--color-fw-border)]",
    },
  },
  defaultVariants: { shape: "text", animate: "pulse" },
});

export type SkeletonVariants = VariantProps<typeof skeletonVariants>;
