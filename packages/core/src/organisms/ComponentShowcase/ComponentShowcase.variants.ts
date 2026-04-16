import { cva, type VariantProps } from "class-variance-authority";
import {
  focusRingMap,
  containerMaxWidthMap,
  sectionPaddingMap,
} from "@/tokens";

// ─── Root wrapper ─────────────────────────────────────────────────────────────

export const componentShowcaseRootVariants = cva(["w-full"], {
  variants: {
    padding: {
      sm: sectionPaddingMap.sm,
      md: sectionPaddingMap.md,
      lg: sectionPaddingMap.lg,
      none: "",
    },
    maxWidth: {
      sm: containerMaxWidthMap.sm,
      md: containerMaxWidthMap.md,
      lg: containerMaxWidthMap.lg,
      full: containerMaxWidthMap.full,
    },
  },
  defaultVariants: { padding: "md", maxWidth: "lg" },
});

export type ComponentShowcasePadding = NonNullable<
  VariantProps<typeof componentShowcaseRootVariants>["padding"]
>;

export type ComponentShowcaseMaxWidth = NonNullable<
  VariantProps<typeof componentShowcaseRootVariants>["maxWidth"]
>;

// ─── Header ───────────────────────────────────────────────────────────────────

export const componentShowcaseHeaderVariants = cva([
  "flex flex-col gap-2 mb-8",
]);

// ─── Tab list ─────────────────────────────────────────────────────────────────

export const componentShowcaseTabListVariants = cva([
  "inline-flex items-center gap-1 rounded-lg p-1",
  "bg-[var(--color-fw-surface)]",
  "border border-[var(--color-fw-border)]",
  "overflow-x-auto",
]);

// ─── Tab trigger ──────────────────────────────────────────────────────────────

export const componentShowcaseTabVariants = cva(
  [
    "inline-flex items-center gap-1.5 rounded-md px-3 py-1.5",
    "text-sm font-medium whitespace-nowrap",
    "cursor-pointer select-none",
    "transition-colors duration-150",
    focusRingMap.default,
  ],
  {
    variants: {
      active: {
        true: [
          "bg-[var(--color-fw-background)]",
          "text-[var(--color-fw-foreground)]",
          "shadow-sm",
          "border border-[var(--color-fw-border)]",
        ],
        false: [
          "text-[var(--color-fw-muted-foreground)]",
          "hover:text-[var(--color-fw-foreground)]",
          "hover:bg-[var(--color-fw-background)]/50",
        ],
      },
    },
    defaultVariants: { active: false },
  },
);

// ─── Panel ───────────────────────────────────────────────────────────────────

export const componentShowcasePanelVariants = cva(
  [
    "mt-4 rounded-xl overflow-hidden",
    "border border-[var(--color-fw-border)]",
    "bg-[var(--color-fw-background)]",
  ],
  {
    variants: {
      variant: {
        preview: ["p-6"],
        split: ["grid grid-cols-1 lg:grid-cols-2"],
        fullscreen: ["min-h-96"],
      },
    },
    defaultVariants: { variant: "preview" },
  },
);

export type ComponentShowcasePanelVariant = NonNullable<
  VariantProps<typeof componentShowcasePanelVariants>["variant"]
>;

// ─── Item grid ────────────────────────────────────────────────────────────────

export const componentShowcaseItemsVariants = cva(["grid gap-4"], {
  variants: {
    columns: {
      1: "grid-cols-1",
      2: "grid-cols-1 sm:grid-cols-2",
      3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
      4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
    },
  },
  defaultVariants: { columns: 2 },
});

export type ComponentShowcaseColumns = NonNullable<
  VariantProps<typeof componentShowcaseItemsVariants>["columns"]
>;

// ─── Individual item ─────────────────────────────────────────────────────────

export const componentShowcaseItemVariants = cva([
  "flex flex-col gap-3 rounded-lg p-4",
  "bg-[var(--color-fw-surface)]",
  "border border-[var(--color-fw-border)]",
]);
