import { cva, type VariantProps } from "class-variance-authority";

// ─── Card root ────────────────────────────────────────────────────────────────

export const cardVariants = cva(
  [
    "flex flex-col rounded-lg overflow-hidden",
    "transition-colors duration-150",
  ],
  {
    variants: {
      variant: {
        outlined: [
          "bg-[var(--color-fw-background)]",
          "border border-[var(--color-fw-border)]",
        ],
        elevated: ["bg-[var(--color-fw-background)]", "shadow-md"],
        ghost: ["bg-transparent"],
        filled: ["bg-[var(--color-fw-surface)]"],
      },
      isInteractive: {
        true: [
          "cursor-pointer",
          "hover:shadow-lg",
          "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-fw-ring)]",
        ],
        false: [],
      },
    },
    compoundVariants: [
      {
        variant: "outlined",
        isInteractive: true,
        class: "hover:border-[var(--color-fw-primary)] hover:shadow-sm",
      },
      {
        variant: "elevated",
        isInteractive: true,
        class: "hover:shadow-lg",
      },
      {
        variant: "filled",
        isInteractive: true,
        class: "hover:bg-[var(--color-fw-secondary)]",
      },
    ],
    defaultVariants: { variant: "outlined", isInteractive: false },
  },
);

// ─── Card Header ──────────────────────────────────────────────────────────────

export const cardHeaderVariants = cva(["flex flex-col gap-1.5 p-6 pb-0"]);

// ─── Card Body ────────────────────────────────────────────────────────────────

export const cardBodyVariants = cva(["p-6 flex-1"]);

// ─── Card Footer ─────────────────────────────────────────────────────────────

export const cardFooterVariants = cva(["flex items-center p-6 pt-0"]);

// ─── Types ────────────────────────────────────────────────────────────────────

export type CardVariants = VariantProps<typeof cardVariants>;
export type CardVariant = NonNullable<CardVariants["variant"]>;
