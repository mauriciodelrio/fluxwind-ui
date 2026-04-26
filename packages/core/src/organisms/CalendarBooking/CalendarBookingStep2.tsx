import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Text } from "@/atoms/Text";
import { Button } from "@/atoms/Button";
import { CalendarSlotList } from "@/molecules/CalendarSlotList";
import type { CalendarSlotListLabels } from "@/molecules/CalendarSlotList";
import type { TimeSlot } from "@/__fixtures__/calendar";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface CalendarBookingStep2Props {
  /** Selected date from Step 1 — "YYYY-MM-DD". */
  selectedDate: string;
  /** Slots for the selected day, empty while loading. */
  slots: TimeSlot[];
  /** True while onDaySelect promise is pending. */
  loading?: boolean;
  /** Error message from a failed onDaySelect call. */
  error?: string;
  onSlotSelect: (slot: TimeSlot) => void;
  onBack: () => void;
  /** Called to retry a failed slot fetch. */
  onRetry?: () => void;
  className?: string;
  labels?: CalendarBookingStep2Labels;
}

export interface CalendarBookingStep2Labels {
  title?: string;
  back?: string;
  retry?: string;
  slotList?: CalendarSlotListLabels;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

const MONTH_NAMES_ES = [
  "enero",
  "febrero",
  "marzo",
  "abril",
  "mayo",
  "junio",
  "julio",
  "agosto",
  "septiembre",
  "octubre",
  "noviembre",
  "diciembre",
];

const DAY_NAMES_ES = [
  "domingo",
  "lunes",
  "martes",
  "miércoles",
  "jueves",
  "viernes",
  "sábado",
];

function formatDate(dateStr: string): string {
  const parts = dateStr.split("-").map(Number);
  const y = parts[0];
  const m = parts[1];
  const d = parts[2];
  const date = new Date(y, m - 1, d);
  const dayName = DAY_NAMES_ES[date.getDay()];
  const monthName = MONTH_NAMES_ES[m - 1];
  const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
  return `${cap(dayName)} ${String(d)} de ${monthName} de ${String(y)}`;
}

// ─── Component ────────────────────────────────────────────────────────────────

/**
 * CalendarBookingStep2 — slot selection step.
 * Shows the formatted date and a list of available time slots.
 * Handles loading skeleton, error with retry, and empty state.
 */
export function CalendarBookingStep2({
  selectedDate,
  slots,
  loading = false,
  error,
  onSlotSelect,
  onBack,
  onRetry,
  className,
  labels = {},
}: CalendarBookingStep2Props): ReactNode {
  return (
    <div className={cn("flex flex-col gap-4", className)}>
      <div className="flex flex-col gap-1">
        <Text variant="label" weight="semibold">
          {labels.title ?? "Selecciona un horario"}
        </Text>
        <Text variant="caption" className="capitalize">
          {formatDate(selectedDate)}
        </Text>
      </div>

      {error !== undefined ? (
        <div className="flex flex-col gap-3 items-start" role="alert">
          <Text variant="small" className="text-[var(--color-fw-destructive)]">
            {error}
          </Text>
          {onRetry !== undefined ? (
            <Button variant="outline" size="sm" onClick={onRetry}>
              {labels.retry ?? "Reintentar"}
            </Button>
          ) : null}
        </div>
      ) : (
        <CalendarSlotList
          slots={slots}
          loading={loading}
          onSlotSelect={onSlotSelect}
          labels={labels.slotList}
        />
      )}

      <Button
        variant="ghost"
        size="sm"
        onClick={onBack}
        className="self-start -ml-2"
      >
        ← {labels.back ?? "Volver"}
      </Button>
    </div>
  );
}
