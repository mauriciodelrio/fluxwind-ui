"use client";

import {
  forwardRef,
  useId,
  useRef,
  useImperativeHandle,
  useEffect,
  useCallback,
  type KeyboardEvent,
} from "react";
import { cn } from "@/lib/cn";
import {
  datePickerInputVariants,
  datePickerPopoverVariants,
} from "./DatePicker.variants";
import type { DatePickerInputVariants } from "./DatePicker.variants";
import { useDatePicker } from "./useDatePicker";
import { CalendarGrid } from "./CalendarGrid";

// ─── Types ────────────────────────────────────────────────────────────────────

export type DatePickerOutput = "date" | "iso";

export interface DatePickerProps extends Omit<
  DatePickerInputVariants,
  "error"
> {
  /** Visible label — required for accessibility. */
  label: string;
  /** Controlled selected date. */
  value?: Date | null;
  /**
   * Called when the user selects a date.
   * Receives a `Date` when `formatOutput="date"` (default),
   * or an ISO string (`YYYY-MM-DD`) when `formatOutput="iso"`.
   */
  onChange?: (value: Date | string) => void;
  /** Output format. @default "date" */
  formatOutput?: DatePickerOutput;
  /** Earliest selectable date. */
  minDate?: Date;
  /** Latest selectable date. */
  maxDate?: Date;
  /** Helper text. */
  hint?: string;
  /** Error message — triggers invalid state and aria-describedby. */
  error?: string;
  disabled?: boolean;
  /** Placeholder shown when no date is selected. @default "Select a date" */
  placeholder?: string;
  /** Accessible label for the "previous month" button. @default "Previous month" */
  prevMonthLabel?: string;
  /** Accessible label for the "next month" button. @default "Next month" */
  nextMonthLabel?: string;
  id?: string;
  className?: string;
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function toISODate(d: Date): string {
  const y = String(d.getFullYear()).padStart(4, "0");
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function formatDisplay(d: Date): string {
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

// ─── Component ────────────────────────────────────────────────────────────────

const DatePicker = forwardRef<HTMLButtonElement, DatePickerProps>(
  (
    {
      label,
      value,
      onChange,
      formatOutput = "date",
      minDate,
      maxDate,
      hint,
      error,
      disabled,
      placeholder = "Select a date",
      prevMonthLabel = "Previous month",
      nextMonthLabel = "Next month",
      radius,
      id: externalId,
      className,
    },
    ref,
  ) => {
    const generatedId = useId();
    const id = externalId ?? generatedId;
    const labelId = `${id}-label`;
    const hintId = hint ? `${id}-hint` : undefined;
    const errorId = error ? `${id}-error` : undefined;
    const popoverId = `${id}-popover`;
    const describedBy =
      [hintId, errorId].filter(Boolean).join(" ") || undefined;

    const triggerRef = useRef<HTMLButtonElement | null>(null);
    useImperativeHandle(ref, () => {
      const { current } = triggerRef;
      if (current === null)
        throw new Error("[DatePicker] trigger ref not attached");
      return current;
    });

    const popoverRef = useRef<HTMLDivElement | null>(null);

    const {
      selected,
      grid,
      weekDays,
      monthLabel,
      isDisabled,
      prevMonth,
      nextMonth,
      selectDate,
      isOpen,
      closePopover,
      togglePopover,
    } = useDatePicker({
      value,
      onChange: (date) => {
        onChange?.(formatOutput === "iso" ? toISODate(date) : date);
      },
      minDate,
      maxDate,
    });

    // Close popover on outside click
    useEffect(() => {
      if (!isOpen) return;

      function handleOutside(e: MouseEvent) {
        const target = e.target as Node;
        if (
          !triggerRef.current?.contains(target) &&
          !popoverRef.current?.contains(target)
        ) {
          closePopover();
        }
      }

      document.addEventListener("mousedown", handleOutside);
      return () => {
        document.removeEventListener("mousedown", handleOutside);
      };
    }, [isOpen, closePopover]);

    // Close on Escape
    const handleTriggerKeyDown = useCallback(
      (e: KeyboardEvent<HTMLButtonElement>) => {
        if (e.key === "Escape") closePopover();
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          togglePopover();
        }
      },
      [closePopover, togglePopover],
    );

    const handlePopoverKeyDown = useCallback(
      (e: KeyboardEvent<HTMLDivElement>) => {
        if (e.key === "Escape") {
          closePopover();
          triggerRef.current?.focus();
        }
        if (e.key === "Tab") {
          closePopover();
        }
      },
      [closePopover],
    );

    const displayValue = selected ? formatDisplay(selected) : null;

    return (
      <div className={cn("relative flex flex-col gap-1.5 w-full", className)}>
        {/* Label */}
        <label
          id={labelId}
          htmlFor={id}
          className="text-sm font-medium text-[var(--color-fw-foreground)]"
        >
          {label}
        </label>

        {/* Trigger button */}
        <button
          ref={triggerRef}
          id={id}
          type="button"
          role="combobox"
          aria-haspopup="true"
          aria-expanded={isOpen}
          aria-controls={popoverId}
          aria-labelledby={labelId}
          aria-describedby={describedBy}
          aria-invalid={error ? true : undefined}
          disabled={disabled}
          onClick={togglePopover}
          onKeyDown={handleTriggerKeyDown}
          className={datePickerInputVariants({
            radius,
            error: error ? true : false,
          })}
        >
          <span
            className={cn(
              "truncate",
              !displayValue && "text-[var(--color-fw-muted)]",
            )}
          >
            {displayValue ?? placeholder}
          </span>
          {/* Calendar icon */}
          <svg
            aria-hidden="true"
            className="shrink-0 size-4 text-[var(--color-fw-muted)]"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.5}
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5"
            />
          </svg>
        </button>

        {/* Popover */}
        {isOpen ? (
          <div
            id={popoverId}
            ref={popoverRef}
            role="dialog"
            aria-modal="true"
            aria-label={label}
            tabIndex={-1}
            className={datePickerPopoverVariants()}
            onKeyDown={handlePopoverKeyDown}
          >
            <CalendarGrid
              weekDays={weekDays}
              grid={grid}
              selected={selected}
              monthLabel={monthLabel}
              isDisabled={isDisabled}
              onSelectDate={selectDate}
              onPrevMonth={prevMonth}
              onNextMonth={nextMonth}
              prevMonthLabel={prevMonthLabel}
              nextMonthLabel={nextMonthLabel}
              labelledById={labelId}
            />
          </div>
        ) : null}

        {/* Error / hint */}
        {error ? (
          <span
            id={errorId}
            className="text-xs text-[var(--color-fw-destructive-text)]"
          >
            {error}
          </span>
        ) : null}
        {hint ? (
          <span id={hintId} className="text-xs text-[var(--color-fw-muted)]">
            {hint}
          </span>
        ) : null}
      </div>
    );
  },
);

DatePicker.displayName = "DatePicker";

export { DatePicker };
