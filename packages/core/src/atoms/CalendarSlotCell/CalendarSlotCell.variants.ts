import { cva, type VariantProps } from "class-variance-authority";
import { transitionMap } from "@/tokens";

export const calendarSlotCellVariants = cva(
  [
    "inline-flex items-center justify-center",
    "px-3 py-1.5 rounded-md text-xs font-medium leading-none",
    "select-none whitespace-nowrap",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1",
    "disabled:pointer-events-none disabled:opacity-40",
  ],
  {
    variants: {
      status: {
        available: [
          "bg-[var(--color-fw-primary)]/15 text-[var(--color-fw-primary)]",
          "border border-[var(--color-fw-primary)]/30",
          "hover:bg-[var(--color-fw-primary)]/25 cursor-pointer",
          "focus-visible:ring-[var(--color-fw-primary)]",
        ],
        booked: [
          "bg-[var(--color-fw-destructive)]/15 text-[var(--color-fw-destructive-text)]",
          "border border-[var(--color-fw-destructive)]/30",
          "cursor-default",
        ],
        protected: [
          "bg-[var(--color-fw-foreground)]/10 text-[var(--color-fw-foreground)]",
          "border border-[var(--color-fw-foreground)]/20",
          "cursor-default",
        ],
      },
      transition: {
        none: transitionMap.none,
        smooth: transitionMap.smooth,
        snappy: transitionMap.snappy,
      },
    },
    defaultVariants: {
      status: "available",
      transition: "snappy",
    },
  },
);

export type CalendarSlotCellVariants = VariantProps<
  typeof calendarSlotCellVariants
>;
