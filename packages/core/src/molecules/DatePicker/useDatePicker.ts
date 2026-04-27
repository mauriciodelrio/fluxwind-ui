import { useState, useCallback, useMemo } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface CalendarDay {
  date: Date;
  /** Day of month (1–31). */
  day: number;
  /** Whether this day belongs to a month other than the visible one. */
  outside: boolean;
  /** Whether this is today's date. */
  isToday: boolean;
}

export interface UseDatePickerOptions {
  value?: Date | null;
  onChange?: (date: Date) => void;
  /** Dates before this are disabled. */
  minDate?: Date;
  /** Dates after this are disabled. */
  maxDate?: Date;
}

export interface UseDatePickerReturn {
  /** Currently selected date (controlled or internal). */
  selected: Date | null;
  /** Month/year currently shown in the calendar grid. */
  viewYear: number;
  viewMonth: number;
  /** Flat array of 42 cells (6 weeks × 7 days) for the current view. */
  grid: CalendarDay[];
  /** Abbreviated day-of-week headers (Mon–Sun). */
  weekDays: string[];
  /** Formatted month + year label for the header. */
  monthLabel: string;
  /** Whether a date is disabled by minDate/maxDate. */
  isDisabled: (date: Date) => boolean;
  /** Navigate to previous month. */
  prevMonth: () => void;
  /** Navigate to next month. */
  nextMonth: () => void;
  /** Select a date (calls onChange if provided). */
  selectDate: (date: Date) => void;
  /** Whether the popover is open. */
  isOpen: boolean;
  openPopover: () => void;
  closePopover: () => void;
  togglePopover: () => void;
}

// ─── Constants ───────────────────────────────────────────────────────────────

const WEEK_DAYS = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];

const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
] as const;

// ─── Helpers ─────────────────────────────────────────────────────────────────

function startOfDay(d: Date): Date {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}

function isSameDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

/**
 * Builds a 42-cell (6 × 7) grid for the given year/month.
 * Week starts on Monday (ISO).
 */
function buildGrid(year: number, month: number): CalendarDay[] {
  const today = startOfDay(new Date());
  const firstOfMonth = new Date(year, month, 1);

  // getDay(): 0 = Sun … 6 = Sat — convert to Mon-first offset
  const rawOffset = firstOfMonth.getDay();
  const startOffset = rawOffset === 0 ? 6 : rawOffset - 1;

  const cells: CalendarDay[] = [];

  // Cells from previous month
  for (let i = startOffset - 1; i >= 0; i--) {
    const date = new Date(year, month, -i);
    cells.push({
      date,
      day: date.getDate(),
      outside: true,
      isToday: isSameDay(date, today),
    });
  }

  // Cells for current month
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  for (let d = 1; d <= daysInMonth; d++) {
    const date = new Date(year, month, d);
    cells.push({
      date,
      day: d,
      outside: false,
      isToday: isSameDay(date, today),
    });
  }

  // Pad to 42 cells with next-month days
  let nextDay = 1;
  while (cells.length < 42) {
    const date = new Date(year, month + 1, nextDay++);
    cells.push({
      date,
      day: date.getDate(),
      outside: true,
      isToday: isSameDay(date, today),
    });
  }

  return cells;
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

export function useDatePicker({
  value,
  onChange,
  minDate,
  maxDate,
}: UseDatePickerOptions = {}): UseDatePickerReturn {
  const today = new Date();

  const initialDate = value ?? null;
  const [internalSelected, setInternalSelected] = useState<Date | null>(
    initialDate,
  );
  const [viewYear, setViewYear] = useState((value ?? today).getFullYear());
  const [viewMonth, setViewMonth] = useState((value ?? today).getMonth());
  const [isOpen, setIsOpen] = useState(false);

  // If controlled, use prop value; otherwise internal
  const selected = value !== undefined ? (value ?? null) : internalSelected;

  const grid = useMemo(
    () => buildGrid(viewYear, viewMonth),
    [viewYear, viewMonth],
  );

  const monthLabel = `${MONTH_NAMES[viewMonth]} ${String(viewYear)}`;

  const prevMonth = useCallback(() => {
    setViewMonth((m) => {
      if (m === 0) {
        setViewYear((y) => y - 1);
        return 11;
      }
      return m - 1;
    });
  }, []);

  const nextMonth = useCallback(() => {
    setViewMonth((m) => {
      if (m === 11) {
        setViewYear((y) => y + 1);
        return 0;
      }
      return m + 1;
    });
  }, []);

  const isDisabled = useCallback(
    (date: Date): boolean => {
      const d = startOfDay(date);
      if (minDate && d < startOfDay(minDate)) return true;
      if (maxDate && d > startOfDay(maxDate)) return true;
      return false;
    },
    [minDate, maxDate],
  );

  const selectDate = useCallback(
    (date: Date) => {
      if (isDisabled(date)) return;
      setInternalSelected(date);
      onChange?.(date);
      setIsOpen(false);
    },
    [isDisabled, onChange],
  );

  const openPopover = useCallback(() => {
    setIsOpen(true);
  }, []);
  const closePopover = useCallback(() => {
    setIsOpen(false);
  }, []);
  const togglePopover = useCallback(() => {
    setIsOpen((o) => !o);
  }, []);

  return {
    selected,
    viewYear,
    viewMonth,
    grid,
    weekDays: WEEK_DAYS,
    monthLabel,
    isDisabled,
    prevMonth,
    nextMonth,
    selectDate,
    isOpen,
    openPopover,
    closePopover,
    togglePopover,
  };
}
