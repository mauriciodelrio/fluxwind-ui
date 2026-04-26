import { forwardRef, type ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/cn";
import {
  calendarDayCellVariants,
  type CalendarDayCellVariants,
} from "./CalendarDayCell.variants";

export type CalendarDayCellState =
  | "default"
  | "available"
  | "selected"
  | "disabled"
  | "today";

export interface CalendarDayCellProps extends Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "children"
> {
  /** Day number to display (1–31). */
  day: number;
  /** Visual state of the day cell. */
  state?: CalendarDayCellState;
  /** When true, renders a dot indicator below the day number (marks days with available slots). */
  hasAvailability?: boolean;
  transition?: CalendarDayCellVariants["transition"];
}

/**
 * CalendarDayCell — a single day button in a month picker grid.
 *
 * States:
 * - `default`    — normal day, no availability
 * - `available`  — has slots (shown with a blue dot)
 * - `selected`   — currently selected day (filled blue)
 * - `disabled`   — past day or outside range (not clickable)
 * - `today`      — current calendar day (ring highlight)
 *
 * ```tsx
 * <CalendarDayCell day={14} state="available" hasAvailability onClick={handleSelect} />
 * <CalendarDayCell day={3} state="disabled" />
 * <CalendarDayCell day={26} state="selected" hasAvailability />
 * ```
 */
const CalendarDayCell = forwardRef<HTMLButtonElement, CalendarDayCellProps>(
  (
    {
      day,
      state = "default",
      hasAvailability = false,
      transition,
      className,
      disabled,
      onClick,
      ...props
    },
    ref,
  ) => {
    const isDisabled = state === "disabled" || disabled;

    return (
      <button
        ref={ref}
        type="button"
        disabled={isDisabled}
        onClick={onClick}
        aria-pressed={state === "selected" ? true : undefined}
        aria-current={state === "today" ? "date" : undefined}
        className={cn(
          calendarDayCellVariants({
            state: isDisabled ? "disabled" : state,
            transition,
          }),
          className,
        )}
        {...props}
      >
        <span>{day}</span>
        {hasAvailability && state !== "disabled" ? (
          <span
            aria-hidden="true"
            className={cn(
              "absolute bottom-1 size-1 rounded-full",
              state === "selected"
                ? "bg-white"
                : "bg-[var(--color-fw-primary)]",
            )}
          />
        ) : null}
      </button>
    );
  },
);

CalendarDayCell.displayName = "CalendarDayCell";

export { CalendarDayCell };
