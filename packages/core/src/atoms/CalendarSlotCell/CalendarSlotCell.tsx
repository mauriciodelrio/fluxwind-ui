import { forwardRef, type ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/cn";
import {
  calendarSlotCellVariants,
  type CalendarSlotCellVariants,
} from "./CalendarSlotCell.variants";
import type { SlotStatus } from "@/__fixtures__/calendar";

export interface CalendarSlotCellProps extends Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "children"
> {
  /** Time label shown inside the cell (e.g. "09:00 – 10:00"). */
  label: string;
  /** Visual status of the slot. Controls color. */
  status: SlotStatus;
  transition?: CalendarSlotCellVariants["transition"];
}

/**
 * CalendarSlotCell — a single time slot chip.
 *
 * Renders as a `<button>` when status is `"available"`, acting as an
 * interactive time selection target. When `status` is `"booked"` or
 * `"protected"` the element is rendered as a non-interactive `<span>`
 * (via `aria-disabled`) to avoid cluttering the tab order.
 *
 * Color semantics:
 * - `available`  → blue  — selectable
 * - `booked`     → red   — occupied, not selectable
 * - `protected`  → black/muted — blocked, not selectable
 *
 * ```tsx
 * <CalendarSlotCell label="09:00 – 10:00" status="available" onClick={handleSelect} />
 * <CalendarSlotCell label="10:00 – 11:00" status="booked" />
 * <CalendarSlotCell label="12:00 – 13:00" status="protected" />
 * ```
 */
const CalendarSlotCell = forwardRef<HTMLButtonElement, CalendarSlotCellProps>(
  (
    { label, status, transition, className, disabled, onClick, ...props },
    ref,
  ) => {
    const isInteractive = status === "available" && !disabled;

    return (
      <button
        ref={ref}
        type="button"
        role={isInteractive ? "button" : undefined}
        aria-disabled={!isInteractive || undefined}
        disabled={!isInteractive}
        onClick={isInteractive ? onClick : undefined}
        className={cn(
          calendarSlotCellVariants({ status, transition }),
          className,
        )}
        {...props}
      >
        {label}
      </button>
    );
  },
);

CalendarSlotCell.displayName = "CalendarSlotCell";

export { CalendarSlotCell };
