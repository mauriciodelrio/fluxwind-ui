import { cva, type VariantProps } from "class-variance-authority";
import { sizeMap, focusRingMap, transitionMap } from "@/tokens";

// ─── Root nav container ───────────────────────────────────────────────────────

export const paginationVariants = cva("flex items-center gap-1 select-none");

// ─── Page button (numbered page + prev/next arrows) ───────────────────────────

export const paginationItemVariants = cva(
  [
    "inline-flex items-center justify-center",
    "rounded-md font-medium",
    "border border-transparent",
    transitionMap.snappy,
    focusRingMap.default,
    "disabled:pointer-events-none disabled:opacity-40",
  ],
  {
    variants: {
      size: {
        sm: [sizeMap.sm.height, sizeMap.sm.px, sizeMap.sm.text, "min-w-8"],
        md: [sizeMap.md.height, sizeMap.md.px, sizeMap.md.text, "min-w-10"],
        lg: [sizeMap.lg.height, sizeMap.lg.px, sizeMap.lg.text, "min-w-12"],
      },
      active: {
        true: [
          "border-[var(--color-fw-primary)]",
          "bg-[var(--color-fw-primary)]",
          "text-[var(--color-fw-primary-fg)]",
          "pointer-events-none",
        ],
        false: [
          "text-[var(--color-fw-foreground)]",
          "hover:bg-[var(--color-fw-secondary-hover)]",
          "hover:border-[var(--color-fw-border)]",
        ],
      },
    },
    defaultVariants: { size: "md", active: false },
  },
);

// ─── Ellipsis span (non-interactive) ─────────────────────────────────────────

export const paginationEllipsisVariants = cva(
  ["inline-flex items-center justify-center", "text-[var(--color-fw-muted)]"],
  {
    variants: {
      size: {
        sm: [sizeMap.sm.height, sizeMap.sm.px, sizeMap.sm.text],
        md: [sizeMap.md.height, sizeMap.md.px, sizeMap.md.text],
        lg: [sizeMap.lg.height, sizeMap.lg.px, sizeMap.lg.text],
      },
    },
    defaultVariants: { size: "md" },
  },
);

// ─── Types ────────────────────────────────────────────────────────────────────

export type PaginationVariants = VariantProps<typeof paginationItemVariants>;
