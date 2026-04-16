import { cva, type VariantProps } from "class-variance-authority";

/**
 * StatusDot variants.
 *
 * status — semantic colour:
 *   online      → green   (available / active)
 *   away        → yellow  (idle / away)
 *   busy        → red     (do not disturb)
 *   offline     → gray    (disconnected)
 *   info        → blue    (informational)
 *
 * size — diameter:
 *   xs → size-1.5  (6 px)   — inline next to tight text
 *   sm → size-2    (8 px)   — default; avatar badges, list items
 *   md → size-2.5  (10 px)  — card headers
 *   lg → size-3    (12 px)  — standalone status indicators
 *
 * pulse — animate-pulse ring for "live" indicators (e.g. currently online)
 */
export const statusDotVariants = cva("inline-block shrink-0 rounded-full", {
  variants: {
    status: {
      online: "bg-[var(--color-fw-success)]",
      away: "bg-[var(--color-fw-warning)]",
      busy: "bg-[var(--color-fw-destructive)]",
      offline: "bg-[var(--color-fw-muted)]",
      info: "bg-[var(--color-fw-info)]",
    },
    size: {
      xs: "size-1.5",
      sm: "size-2",
      md: "size-2.5",
      lg: "size-3",
    },
    pulse: {
      true: "motion-safe:animate-pulse",
      false: "",
    },
  },
  defaultVariants: {
    status: "offline",
    size: "sm",
    pulse: false,
  },
});

export type StatusDotVariants = VariantProps<typeof statusDotVariants>;
