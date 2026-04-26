import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { CalendarSlotCell } from "@/atoms/CalendarSlotCell";
import { Skeleton } from "@/atoms/Skeleton";
import type { TimeSlot } from "@/__fixtures__/calendar";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface CalendarSlotListProps {
  /** List of time slots for the selected day. */
  slots: TimeSlot[];
  /** When true, renders skeleton placeholders instead of slots. */
  loading?: boolean;
  /** Called when an available slot is selected. */
  onSlotSelect: (slot: TimeSlot) => void;
  className?: string;
  /** Override labels for i18n. */
  labels?: CalendarSlotListLabels;
}

export interface CalendarSlotListLabels {
  noSlots?: string;
  loadingAriaLabel?: string;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatSlotLabel(slot: TimeSlot): string {
  return `${slot.startTime} – ${slot.endTime}`;
}

// ─── Component ────────────────────────────────────────────────────────────────

/**
 * CalendarSlotList — list of time slot chips for a selected day.
 *
 * - Shows skeleton chips while loading.
 * - `available` chips are interactive. `booked` and `protected` are visual only.
 * - Mobile-first: wraps chips in a flex-wrap layout.
 *
 * ```tsx
 * <CalendarSlotList
 *   slots={slots}
 *   loading={isLoading}
 *   onSlotSelect={handleSelect}
 * />
 * ```
 */
export function CalendarSlotList({
  slots,
  loading = false,
  onSlotSelect,
  className,
  labels = {},
}: CalendarSlotListProps): ReactNode {
  if (loading) {
    return (
      <div
        className={cn("flex flex-wrap gap-2", className)}
        aria-label={labels.loadingAriaLabel ?? "Cargando horarios disponibles"}
        aria-busy="true"
      >
        {Array.from({ length: 6 }, (_, i) => (
          <Skeleton key={i} className="h-7 w-24 rounded-md" />
        ))}
      </div>
    );
  }

  if (slots.length === 0) {
    return (
      <p className={cn("text-sm text-[var(--color-fw-muted)]", className)}>
        {labels.noSlots ?? "No hay horarios disponibles para este día."}
      </p>
    );
  }

  return (
    <ul
      className={cn("flex flex-wrap gap-2 list-none m-0 p-0", className)}
      aria-label="Horarios del día"
    >
      {slots.map((slot) => (
        <li key={`${slot.date}-${slot.startTime}`}>
          <CalendarSlotCell
            label={formatSlotLabel(slot)}
            status={slot.status}
            onClick={
              slot.status === "available"
                ? () => {
                    onSlotSelect(slot);
                  }
                : undefined
            }
            aria-label={`${formatSlotLabel(slot)}${slot.status !== "available" ? `, ${slot.status === "booked" ? "ocupado" : "protegido"}` : ""}`}
          />
        </li>
      ))}
    </ul>
  );
}
