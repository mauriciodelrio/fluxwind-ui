import { cva, type VariantProps } from "class-variance-authority";

/**
 * Root wrapper — controls divider / border appearance.
 */
export const accordionRootVariants = cva("w-full", {
  variants: {
    variant: {
      default: "divide-y divide-[var(--color-fw-border)]",
      bordered:
        "border border-[var(--color-fw-border)] rounded-[var(--radius-fw-lg)] divide-y divide-[var(--color-fw-border)] overflow-hidden",
      separated: "flex flex-col gap-2",
    },
  },
  defaultVariants: { variant: "default" },
});

/**
 * Individual item wrapper.
 * The `separated` variant needs its own border + radius.
 */
export const accordionItemVariants = cva("w-full", {
  variants: {
    variant: {
      default: "",
      bordered: "",
      separated:
        "border border-[var(--color-fw-border)] rounded-[var(--radius-fw-lg)] overflow-hidden",
    },
  },
  defaultVariants: { variant: "default" },
});

/**
 * Trigger — the `<summary>` element.
 * `list-none` removes the default disclosure marker in WebKit/Blink.
 * `::-webkit-details-marker { display: none }` is handled in global CSS,
 * but `list-none` is the Tailwind-safe equivalent.
 */
export const accordionTriggerVariants = cva(
  [
    "flex w-full items-center justify-between",
    "list-none cursor-pointer select-none bg-transparent",
    "focus-visible:outline-none",
    "focus-visible:ring-2 focus-visible:ring-[var(--color-fw-ring)] focus-visible:ring-offset-1",
    "text-[var(--color-fw-foreground)]",
    "hover:bg-[var(--color-fw-surface)]",
    "disabled:cursor-not-allowed",
  ].join(" "),
  {
    variants: {
      size: {
        sm: "px-3 py-2 text-sm",
        md: "px-4 py-3 text-sm",
        lg: "px-5 py-4 text-base",
      },
    },
    defaultVariants: { size: "md" },
  },
);

/**
 * Collapsible panel — the content area inside `<details>`.
 */
export const accordionPanelVariants = cva(
  "text-[var(--color-fw-muted-foreground)]",
  {
    variants: {
      size: {
        sm: "px-3 pb-2 text-sm",
        md: "px-4 pb-3 text-sm",
        lg: "px-5 pb-4 text-base",
      },
    },
    defaultVariants: { size: "md" },
  },
);

export type AccordionRootVariants = VariantProps<typeof accordionRootVariants>;
export type AccordionTriggerVariants = VariantProps<
  typeof accordionTriggerVariants
>;
export type AccordionPanelVariants = VariantProps<
  typeof accordionPanelVariants
>;
