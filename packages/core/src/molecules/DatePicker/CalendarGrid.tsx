import { useRef, useCallback, type KeyboardEvent } from "react";
import { cn } from "@/lib/cn";
import {
  datePickerNavButtonVariants,
  datePickerDayVariants,
} from "./DatePicker.variants";
import type { CalendarDay } from "./useDatePicker";

// ─── Props ────────────────────────────────────────────────────────────────────

export interface CalendarGridProps {
  /** Abbreviated day-of-week headers (Mo–Su). */
  weekDays: string[];
  /** 42-cell grid produced by useDatePicker. */
  grid: CalendarDay[];
  /** Currently selected date (for highlighting). */
  selected: Date | null;
  /** Month + year label rendered in the header. */
  monthLabel: string;
  /** Whether a date is disabled. */
  isDisabled: (date: Date) => boolean;
  /** Callback when a day cell is activated. */
  onSelectDate: (date: Date) => void;
  /** Navigate to previous month. */
  onPrevMonth: () => void;
  /** Navigate to next month. */
  onNextMonth: () => void;
  /** Accessible label for the "previous month" nav button. */
  prevMonthLabel?: string;
  /** Accessible label for the "next month" nav button. */
  nextMonthLabel?: string;
  /** id of the element that labels this calendar (the input's label). */
  labelledById?: string;
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function isSameDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

// ─── Component ────────────────────────────────────────────────────────────────

export function CalendarGrid({
  weekDays,
  grid,
  selected,
  monthLabel,
  isDisabled,
  onSelectDate,
  onPrevMonth,
  onNextMonth,
  prevMonthLabel = "Previous month",
  nextMonthLabel = "Next month",
  labelledById,
}: CalendarGridProps) {
  const gridRef = useRef<HTMLDivElement>(null);

  // ── Keyboard navigation within the grid ──────────────────────────────────
  const handleKeyDown = useCallback((e: KeyboardEvent<HTMLDivElement>) => {
    const focused = document.activeElement as HTMLElement | null;
    if (!focused || !gridRef.current?.contains(focused)) return;

    const cells = Array.from(
      gridRef.current.querySelectorAll<HTMLButtonElement>(
        "button[data-date]:not([disabled])",
      ),
    );
    const idx = cells.indexOf(focused as HTMLButtonElement);
    if (idx === -1) return;

    let next: HTMLButtonElement | undefined;

    switch (e.key) {
      case "ArrowRight":
        e.preventDefault();
        next = cells[idx + 1];
        break;
      case "ArrowLeft":
        e.preventDefault();
        next = cells[idx - 1];
        break;
      case "ArrowDown":
        e.preventDefault();
        next = cells[idx + 7];
        break;
      case "ArrowUp":
        e.preventDefault();
        next = cells[idx - 7];
        break;
      case "Home":
        e.preventDefault();
        next = cells[0];
        break;
      case "End":
        e.preventDefault();
        next = cells[cells.length - 1];
        break;
      default:
        return;
    }

    next.focus();
  }, []);

  return (
    <div
      role="application"
      aria-label={monthLabel}
      aria-labelledby={labelledById}
    >
      {/* ── Month navigation header ── */}
      <div className="flex items-center justify-between mb-3">
        <button
          type="button"
          aria-label={prevMonthLabel}
          className={datePickerNavButtonVariants()}
          onClick={onPrevMonth}
        >
          ‹
        </button>
        <span
          aria-live="polite"
          aria-atomic="true"
          className="text-sm font-semibold text-[var(--color-fw-foreground)]"
        >
          {monthLabel}
        </span>
        <button
          type="button"
          aria-label={nextMonthLabel}
          className={datePickerNavButtonVariants()}
          onClick={onNextMonth}
        >
          ›
        </button>
      </div>

      {/* ── Day-of-week headers ── */}
      <div
        role="grid"
        aria-label={monthLabel}
        className="grid grid-cols-7 gap-0.5"
        tabIndex={0}
        onKeyDown={handleKeyDown}
        ref={gridRef}
      >
        <div role="row" className="contents">
          {weekDays.map((d) => (
            <div
              key={d}
              role="columnheader"
              aria-label={d}
              className="flex items-center justify-center h-8 text-xs font-medium text-[var(--color-fw-muted)]"
            >
              {d}
            </div>
          ))}
        </div>

        {/* ── Day cells — 6 rows × 7 cols ── */}
        {Array.from({ length: 6 }).map((_, rowIdx) => (
          <div
            key={grid[rowIdx * 7].date.toISOString()}
            role="row"
            className="contents"
          >
            {grid.slice(rowIdx * 7, rowIdx * 7 + 7).map((cell) => {
              const isSelected = selected
                ? isSameDay(cell.date, selected)
                : false;
              const disabled = isDisabled(cell.date);
              const label = cell.date.toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              });

              return (
                <div key={cell.date.toISOString()} role="gridcell">
                  <button
                    type="button"
                    data-date={cell.date.toISOString()}
                    aria-label={label}
                    aria-pressed={isSelected}
                    aria-disabled={disabled}
                    disabled={disabled}
                    tabIndex={
                      isSelected || (!selected && cell.isToday) ? 0 : -1
                    }
                    onClick={() => {
                      onSelectDate(cell.date);
                    }}
                    className={cn(
                      datePickerDayVariants({
                        selected: isSelected,
                        today: cell.isToday && !isSelected,
                        outside: cell.outside,
                        disabled,
                      }),
                      "w-full",
                    )}
                  >
                    {String(cell.day)}
                  </button>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
