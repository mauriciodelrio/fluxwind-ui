import { useState, useId, type ReactNode } from "react";
import { cn } from "@/lib/cn";
import { CalendarDayCell } from "@/atoms/CalendarDayCell";
import type { CalendarDayCellState } from "@/atoms/CalendarDayCell";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface CalendarMonthPickerProps {
  /** Days that have available slots — "YYYY-MM-DD" strings. */
  availableDays: string[];
  /** Currently selected date — "YYYY-MM-DD". */
  selectedDate?: string;
  /** Called when a day with availability is clicked. */
  onDaySelect: (date: string) => void;
  /**
   * Initial month to display. Defaults to the current month.
   * "YYYY-MM" format.
   */
  initialMonth?: string;
  /** Minimum selectable date. Days before this are disabled. Defaults to today. */
  minDate?: string;
  className?: string;
  /** Override labels for i18n. */
  labels?: CalendarMonthPickerLabels;
}

export interface CalendarMonthPickerLabels {
  previousMonth?: string;
  nextMonth?: string;
  /** Day-of-week headers, starting Monday. Array of 7 strings. */
  weekDays?: string[];
  /** Month names array (index 0 = January). */
  monthNames?: string[];
}

// ─── Defaults ─────────────────────────────────────────────────────────────────

const DEFAULT_WEEK_DAYS = ["Lu", "Ma", "Mi", "Ju", "Vi", "Sa", "Do"];

const DEFAULT_MONTH_NAMES = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre",
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function toDateString(year: number, month: number, day: number): string {
  const mm = String(month + 1).padStart(2, "0");
  const dd = String(day).padStart(2, "0");
  return `${String(year)}-${mm}-${dd}`;
}

function parseYearMonth(ym: string): { year: number; month: number } {
  const parts = ym.split("-").map(Number);
  const year = parts[0];
  const month = (parts[1]) - 1;
  return { year, month };
}

/** Returns "YYYY-MM" string from a Date. */
function toYearMonth(date: Date): string {
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  return `${String(date.getFullYear())}-${mm}`;
}

/** Today's date string "YYYY-MM-DD". */
function todayString(): string {
  return toDateString(
    new Date().getFullYear(),
    new Date().getMonth(),
    new Date().getDate(),
  );
}

/** Returns how many days are in a given month. */
function daysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate();
}

/**
 * Day-of-week index for the first day of the month.
 * Adjusted so Monday = 0, Sunday = 6.
 */
function firstDayOffset(year: number, month: number): number {
  const dow = new Date(year, month, 1).getDay();
  // JS: 0=Sun … 6=Sat → convert to Mon=0 … Sun=6
  return (dow + 6) % 7;
}

// ─── Component ────────────────────────────────────────────────────────────────

/**
 * CalendarMonthPicker — custom month grid for picking a day.
 *
 * - No external date-picker library.
 * - Available days show a blue dot.
 * - Past days and days before `minDate` are disabled.
 * - Supports prev/next month navigation.
 * - Mobile-first: 44×44px touch targets (size-10 cells + 4px gap).
 *
 * ```tsx
 * <CalendarMonthPicker
 *   availableDays={availableDays}
 *   selectedDate={selectedDate}
 *   onDaySelect={handleDaySelect}
 * />
 * ```
 */
export function CalendarMonthPicker({
  availableDays,
  selectedDate,
  onDaySelect,
  initialMonth,
  minDate,
  className,
  labels = {},
}: CalendarMonthPickerProps): ReactNode {
  const today = todayString();
  const effectiveMin = minDate ?? today;

  const initialYM = initialMonth ?? toYearMonth(new Date());
  const [currentYM, setCurrentYM] = useState(initialYM);

  const { year, month } = parseYearMonth(currentYM);

  const weekDays = labels.weekDays ?? DEFAULT_WEEK_DAYS;
  const monthNames = labels.monthNames ?? DEFAULT_MONTH_NAMES;

  const availableSet = new Set(availableDays);
  const totalDays = daysInMonth(year, month);
  const offset = firstDayOffset(year, month);

  function goToPrev() {
    const d = new Date(year, month - 1, 1);
    setCurrentYM(toYearMonth(d));
  }

  function goToNext() {
    const d = new Date(year, month + 1, 1);
    setCurrentYM(toYearMonth(d));
  }

  function getDayState(day: number): CalendarDayCellState {
    const dateStr = toDateString(year, month, day);
    if (dateStr < effectiveMin) return "disabled";
    if (dateStr === selectedDate) return "selected";
    if (dateStr === today) return "today";
    if (availableSet.has(dateStr)) return "available";
    return "default";
  }

  function handleDayClick(day: number) {
    const dateStr = toDateString(year, month, day);
    if (!availableSet.has(dateStr)) return;
    onDaySelect(dateStr);
  }

  // Build grid cells: leading empty cells + day cells
  const cells: ({ isEmpty: true } | { isEmpty: false; day: number })[] = [
    ...Array.from({ length: offset }, () => ({ isEmpty: true as const })),
    ...Array.from({ length: totalDays }, (_, i) => ({
      isEmpty: false as const,
      day: i + 1,
    })),
  ];

  const headingId = useId();

  return (
    <div
      className={cn("flex flex-col gap-4", className)}
      role="group"
      aria-labelledby={headingId}
    >
      {/* Month navigation header */}
      <div className="flex items-center justify-between gap-2">
        <button
          type="button"
          aria-label={labels.previousMonth ?? "Mes anterior"}
          onClick={goToPrev}
          className={cn(
            "size-10 flex items-center justify-center rounded-full",
            "text-[var(--color-fw-muted)] hover:text-[var(--color-fw-foreground)]",
            "hover:bg-[var(--color-fw-surface)] transition-colors",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-fw-primary)]",
          )}
        >
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            className="size-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>

        <h3
          id={headingId}
          className="text-sm font-semibold text-[var(--color-fw-foreground)] capitalize"
          aria-live="polite"
        >
          {monthNames[month]} {year}
        </h3>

        <button
          type="button"
          aria-label={labels.nextMonth ?? "Mes siguiente"}
          onClick={goToNext}
          className={cn(
            "size-10 flex items-center justify-center rounded-full",
            "text-[var(--color-fw-muted)] hover:text-[var(--color-fw-foreground)]",
            "hover:bg-[var(--color-fw-surface)] transition-colors",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-fw-primary)]",
          )}
        >
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            className="size-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>

      {/* Week day headers */}
      <div className="grid grid-cols-7 gap-1" aria-hidden="true">
        {weekDays.map((wd) => (
          <div
            key={wd}
            className="size-10 flex items-center justify-center text-xs font-medium text-[var(--color-fw-muted)]"
          >
            {wd}
          </div>
        ))}
      </div>

      {/* Day grid — ARIA: grid > row > gridcell */}
      <div
        className="grid grid-cols-7 gap-1"
        role="grid"
        aria-label={`${monthNames[month]} ${String(year)}`}
      >
        {Array.from({ length: Math.ceil(cells.length / 7) }, (_, rowIdx) => (
          <div key={`row-${String(rowIdx)}`} role="row" className="contents">
            {cells.slice(rowIdx * 7, rowIdx * 7 + 7).map((cell, colIdx) => {
              if (cell.isEmpty) {
                return (
                  <div
                    key={`empty-${String(rowIdx)}-${String(colIdx)}`}
                    role="gridcell"
                    aria-hidden="true"
                    className="size-10"
                  />
                );
              }
              const { day } = cell;
              const state = getDayState(day);
              const dateStr = toDateString(year, month, day);
              const hasAvailability = availableSet.has(dateStr);

              return (
                <div key={dateStr} role="gridcell">
                  <CalendarDayCell
                    day={day}
                    state={state}
                    hasAvailability={hasAvailability}
                    aria-label={`${String(day)} de ${monthNames[month]} de ${String(year)}`}
                    onClick={() => {
                      handleDayClick(day);
                    }}
                  />
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
