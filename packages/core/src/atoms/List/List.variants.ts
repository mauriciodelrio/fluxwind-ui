import { cva, type VariantProps } from "class-variance-authority";

// ─── List Root ────────────────────────────────────────────────────────────────

export const listVariants = cva(
  // Reset
  "m-0",
  {
    variants: {
      variant: {
        unordered: "list-disc pl-5",
        ordered: "list-decimal pl-5",
        none: "list-none",
      },
      size: {
        sm: "space-y-1 text-sm",
        md: "space-y-1.5 text-sm",
        lg: "space-y-2.5 text-base",
      },
    },
    defaultVariants: {
      variant: "unordered",
      size: "md",
    },
  },
);

// ─── List Item ────────────────────────────────────────────────────────────────

export const listItemVariants = cva("leading-relaxed", {
  variants: {
    muted: {
      true: "text-[var(--color-fw-muted-foreground)]",
      false: "text-[var(--color-fw-foreground)]",
    },
  },
  defaultVariants: {
    muted: false,
  },
});

// ─── Types ────────────────────────────────────────────────────────────────────

export type ListVariants = VariantProps<typeof listVariants>;
export type ListVariant = NonNullable<ListVariants["variant"]>;
export type ListSize = NonNullable<ListVariants["size"]>;
export type ListItemVariants = VariantProps<typeof listItemVariants>;
