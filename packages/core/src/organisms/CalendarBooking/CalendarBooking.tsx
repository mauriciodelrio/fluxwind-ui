import { useState, useRef, useEffect, useId, type ReactElement, type ReactNode, type RefObject } from "react";
import { cn } from "@/lib/cn";
import { Text } from "@/atoms/Text";
import { Modal } from "@/organisms/Modal";
import { CalendarBookingStep1 } from "./CalendarBookingStep1";
import { CalendarBookingStep2 } from "./CalendarBookingStep2";
import { CalendarBookingStep3 } from "./CalendarBookingStep3";
import type {
  CalendarBookingStep1Labels,
  CalendarBookingStep1Props,
} from "./CalendarBookingStep1";
import type { CalendarBookingStep2Labels } from "./CalendarBookingStep2";
import type { CalendarBookingStep3Labels } from "./CalendarBookingStep3";
import type { TimeSlot, Booking } from "@/__fixtures__/calendar";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface CalendarBookingProps {
  /** Controls visibility of the modal. */
  open: boolean;
  lawyerId: string;
  /** Available days shown in the month picker — "YYYY-MM-DD" strings. */
  availableDays: string[];
  /**
   * Contextual info rendered in Step 3 (address, meeting link, etc.).
   * The organism does not interpret the content.
   */
  infoContent: ReactElement;
  /**
   * Called when user selects a day.
   * Must resolve with the day's TimeSlot array.
   */
  onDaySelect: (date: string) => Promise<TimeSlot[]>;
  /**
   * Called when user confirms the booking.
   * Must resolve on success, reject on error.
   */
  onConfirm: (booking: Omit<Booking, "id" | "status">) => Promise<void>;
  onClose: () => void;
  /** Minimum selectable date. Defaults to today. */
  minDate?: string;
  /** Override the initially displayed month — "YYYY-MM". Useful for testing. */
  initialMonth?: string;
  className?: string;
  labels?: CalendarBookingLabels;
}

export interface CalendarBookingLabels {
  closeLabel?: string;
  step1?: CalendarBookingStep1Labels;
  step2?: CalendarBookingStep2Labels;
  step3?: CalendarBookingStep3Labels;
  /** Override individual step label — e.g. ["Paso 1 de 3", "Paso 2 de 3", "Paso 3 de 3"] */
  stepIndicators?: [string, string, string];
}

type Step = 1 | 2 | 3;

// ─── Component ────────────────────────────────────────────────────────────────

/**
 * CalendarBooking — 3-step booking flow wrapped in the existing Modal.
 *
 * Step 1: Day selection (CalendarMonthPicker)
 * Step 2: Slot selection (CalendarSlotList) — fetches slots via onDaySelect
 * Step 3: Confirmation form (clientName + clientEmail) + infoContent
 *
 * Mobile-first. Uses `h-dvh` on mobile via Modal size="sm" + custom className.
 *
 * ```tsx
 * <CalendarBooking
 *   open={isOpen}
 *   lawyerId="lawyer-123"
 *   availableDays={availableDays}
 *   infoContent={<p>Providencia 1234, oficina 5</p>}
 *   onDaySelect={fetchSlotsForDay}
 *   onConfirm={createBooking}
 *   onClose={() => setOpen(false)}
 * />
 * ```
 */
export function CalendarBooking({
  open,
  lawyerId,
  availableDays,
  infoContent,
  onDaySelect,
  onConfirm,
  onClose,
  minDate,
  initialMonth,
  className,
  labels = {},
}: CalendarBookingProps): ReactNode {
  const [step, setStep] = useState<Step>(1);
  const [selectedDate, setSelectedDate] = useState<string | undefined>(undefined);
  const [slots, setSlots] = useState<TimeSlot[]>([]);
  const [selectedSlot, setSelectedSlot] = useState<TimeSlot | undefined>(undefined);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [slotError, setSlotError] = useState<string | undefined>(undefined);

  const stepHeadingRef = useRef<HTMLHeadingElement>(null);
  const liveRegionId = useId();

  const DEFAULT_INDICATORS: [string, string, string] = ["Paso 1 de 3", "Paso 2 de 3", "Paso 3 de 3"];
  const stepIndicators = labels.stepIndicators ?? DEFAULT_INDICATORS;

  // Move focus to step heading on step change (AC-14)
  useEffect(() => {
    if (open) {
      stepHeadingRef.current?.focus();
    }
  }, [step, open]);

  // Reset state when modal closes
  useEffect(() => {
    if (!open) {
      setStep(1);
      setSelectedDate(undefined);
      setSlots([]);
      setSelectedSlot(undefined);
      setLoadingSlots(false);
      setSlotError(undefined);
    }
  }, [open]);

  async function handleDaySelect(date: string) {
    setSelectedDate(date);
    setSlots([]);
    setSlotError(undefined);
    setLoadingSlots(true);
    setStep(2);
    try {
      const fetched = await onDaySelect(date);
      setSlots(fetched);
    } catch {
      setSlotError("No fue posible obtener los horarios. Intenta nuevamente.");
    } finally {
      setLoadingSlots(false);
    }
  }

  async function fetchSlotsForDate(date: string) {
    setSlots([]);
    setSlotError(undefined);
    setLoadingSlots(true);
    try {
      const fetched = await onDaySelect(date);
      setSlots(fetched);
    } catch {
      setSlotError("No fue posible obtener los horarios. Intenta nuevamente.");
    } finally {
      setLoadingSlots(false);
    }
  }

  function handleSlotSelect(slot: TimeSlot) {
    setSelectedSlot(slot);
    setStep(3);
  }

  function handleBackToStep1() {
    setStep(1);
    setSlots([]);
    setSlotError(undefined);
  }

  function handleBackToStep2() {
    setStep(2);
  }

  async function handleConfirm(clientName: string, clientEmail: string) {
    if (selectedDate === undefined || selectedSlot === undefined) return;
    await onConfirm({
      lawyerId,
      date: selectedDate,
      startTime: selectedSlot.startTime,
      endTime: selectedSlot.endTime,
      attendanceMode: selectedSlot.attendanceMode,
      clientName,
      clientEmail,
    });
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      size="sm"
      className={cn("sm:max-h-[95dvh]", className)}
    >
      <Modal.Header closeLabel={labels.closeLabel ?? "Cerrar"}>
        <div className="flex flex-col gap-0.5">
          {/* Live region for step announcements (AC-14) */}
          <span
            id={liveRegionId}
            aria-live="polite"
            className="sr-only"
          >
            {stepIndicators[step - 1]}
          </span>
          <Text
            as="h2"
            ref={stepHeadingRef as RefObject<HTMLHeadingElement>}
            variant="label"
            weight="semibold"
            tabIndex={-1}
            className="outline-none"
          >
            Reservar hora
          </Text>
          <Text variant="caption" className="text-[var(--color-fw-muted)]">
            {stepIndicators[step - 1]}
          </Text>
        </div>
      </Modal.Header>

      <Modal.Body>
        {step === 1 ? (
          <CalendarBookingStep1
            availableDays={availableDays}
            selectedDate={selectedDate}
            onDaySelect={(date) => { void handleDaySelect(date); }}
            minDate={minDate}
            initialMonth={initialMonth}
            labels={labels.step1}
          />
        ) : null}

        {step === 2 && selectedDate !== undefined ? (
          <CalendarBookingStep2
            selectedDate={selectedDate}
            slots={slots}
            loading={loadingSlots}
            error={slotError}
            onSlotSelect={handleSlotSelect}
            onBack={handleBackToStep1}
            onRetry={() => { void fetchSlotsForDate(selectedDate); }}
            labels={labels.step2}
          />
        ) : null}

        {step === 3 && selectedDate !== undefined && selectedSlot !== undefined ? (
          <CalendarBookingStep3
            selectedDate={selectedDate}
            selectedSlot={selectedSlot}
            infoContent={infoContent}
            onConfirm={(name, email) => handleConfirm(name, email)}
            onBack={handleBackToStep2}
            labels={labels.step3}
          />
        ) : null}
      </Modal.Body>
    </Modal>
  );
}
