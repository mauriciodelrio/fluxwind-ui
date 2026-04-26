import { cva, type VariantProps } from "class-variance-authority";
import { transitionMap } from "@/tokens";

export const calendarDayCellVariants = cva(
  [
    "relative flex flex-col items-center justify-center",
    "size-10 rounded-full text-sm font-medium leading-none",
    "select-none",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1",
    "focus-visible:ring-[var(--color-fw-primary)]",
    "disabled:pointer-events-none disabled:opacity-40",
  ],
  {
    variants: {
      state: {
        default: [
          "text-[var(--color-fw-foreground)]",
          "hover:bg-[var(--color-fw-surface)] cursor-pointer",
        ],
        available: [
          "text-[var(--color-fw-foreground)]",
          "hover:bg-[var(--color-fw-surface)] cursor-pointer",
        ],
        selected: [
          "bg-[var(--color-fw-primary)] text-white cursor-pointer",
          "hover:bg-[var(--color-fw-primary)]",
        ],
        disabled: [
          "text-[var(--color-fw-muted)] cursor-not-allowed opacity-40",
        ],
        today: [
          "text-[var(--color-fw-primary)] font-semibold",
          "hover:bg-[var(--color-fw-surface)] cursor-pointer",
          "ring-1 ring-inset ring-[var(--color-fw-primary)]/40",
        ],
      },
      transition: {
        none: transitionMap.none,
        smooth: transitionMap.smooth,
        snappy: transitionMap.snappy,
      },
    },
    defaultVariants: {
      state: "default",
      transition: "snappy",
    },
  },
);

export type CalendarDayCellVariants = VariantProps<
  typeof calendarDayCellVariants
>;
