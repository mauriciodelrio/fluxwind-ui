import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Text } from "@/atoms/Text";
import { CalendarMonthPicker } from "@/molecules/CalendarMonthPicker";
import type { CalendarMonthPickerLabels } from "@/molecules/CalendarMonthPicker";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface CalendarBookingStep1Props {
  availableDays: string[];
  selectedDate?: string;
  onDaySelect: (date: string) => void;
  minDate?: string;
  /** Override the initially displayed month — "YYYY-MM". Useful for testing. */
  initialMonth?: string;
  className?: string;
  labels?: CalendarBookingStep1Labels;
}

export interface CalendarBookingStep1Labels {
  title?: string;
  subtitle?: string;
  monthPicker?: CalendarMonthPickerLabels;
}

// ─── Component ────────────────────────────────────────────────────────────────

/**
 * CalendarBookingStep1 — day selection step.
 * Renders a MonthPicker with available days highlighted.
 */
export function CalendarBookingStep1({
  availableDays,
  selectedDate,
  onDaySelect,
  minDate,
  initialMonth,
  className,
  labels = {},
}: CalendarBookingStep1Props): ReactNode {
  return (
    <div className={cn("flex flex-col gap-4", className)}>
      <div className="flex flex-col gap-1">
        <Text variant="label" weight="semibold">
          {labels.title ?? "Selecciona un día"}
        </Text>
        <Text variant="caption">
          {labels.subtitle ??
            "Los días con disponibilidad están marcados en azul."}
        </Text>
      </div>

      <CalendarMonthPicker
        availableDays={availableDays}
        selectedDate={selectedDate}
        onDaySelect={onDaySelect}
        minDate={minDate}
        initialMonth={initialMonth}
        labels={labels.monthPicker}
      />
    </div>
  );
}
