import { cva, type VariantProps } from "class-variance-authority";

// ─── Tab List container ───────────────────────────────────────────────────────

export const tabsListVariants = cva(["flex items-center"], {
  variants: {
    variant: {
      line: "border-b border-[var(--color-fw-border)]",
      pill: "gap-1 p-1 bg-[var(--color-fw-surface)] rounded-lg",
    },
  },
  defaultVariants: { variant: "line" },
});

// ─── Tab Trigger ─────────────────────────────────────────────────────────────

export const tabsTriggerVariants = cva(
  [
    "relative inline-flex items-center justify-center font-medium whitespace-nowrap",
    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-fw-ring)]",
    "aria-[disabled=true]:cursor-not-allowed aria-[disabled=true]:opacity-40",
    "cursor-pointer select-none",
  ],
  {
    variants: {
      variant: {
        line: [
          "text-[var(--color-fw-muted)]",
          "border-b-2 border-transparent -mb-px",
          "hover:text-[var(--color-fw-foreground)]",
          "data-[state=active]:border-[var(--color-fw-primary)]",
          "data-[state=active]:text-[var(--color-fw-foreground)]",
        ],
        pill: [
          "rounded-md",
          "text-[var(--color-fw-muted)]",
          "hover:text-[var(--color-fw-foreground)]",
          "data-[state=active]:bg-[var(--color-fw-background)]",
          "data-[state=active]:text-[var(--color-fw-foreground)]",
          "data-[state=active]:shadow-sm",
        ],
      },
      size: {
        sm: "text-xs",
        md: "text-sm",
        lg: "text-base",
      },
    },
    compoundVariants: [
      { variant: "line", size: "sm", class: "px-2 pb-2 pt-1" },
      { variant: "line", size: "md", class: "px-3 pb-3 pt-2" },
      { variant: "line", size: "lg", class: "px-4 pb-3 pt-2" },
      { variant: "pill", size: "sm", class: "px-2.5 py-1" },
      { variant: "pill", size: "md", class: "px-3 py-1.5" },
      { variant: "pill", size: "lg", class: "px-4 py-2" },
    ],
    defaultVariants: { variant: "line", size: "md" },
  },
);

// ─── Tab Panel ────────────────────────────────────────────────────────────────

export const tabsPanelVariants = cva(
  [
    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-fw-ring)]",
  ],
  {
    variants: {
      variant: {
        line: "pt-4",
        pill: "pt-3",
      },
    },
    defaultVariants: { variant: "line" },
  },
);

// ─── Types ────────────────────────────────────────────────────────────────────

export type TabsVariants = VariantProps<typeof tabsListVariants>;
export type TabsVariant = NonNullable<TabsVariants["variant"]>;
export type TabsSize = NonNullable<
  VariantProps<typeof tabsTriggerVariants>["size"]
>;
