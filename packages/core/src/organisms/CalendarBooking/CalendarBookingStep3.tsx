import { useState, type ReactElement, type ReactNode, type FormEvent, type ChangeEvent } from "react";
import { cn } from "@/lib/cn";
import { Text } from "@/atoms/Text";
import { Input } from "@/atoms/Input";
import { Button } from "@/atoms/Button";
import type { TimeSlot } from "@/__fixtures__/calendar";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface CalendarBookingStep3Props {
  selectedDate: string;
  selectedSlot: TimeSlot;
  /** Contextual info rendered in the summary — consumer decides the content. */
  infoContent: ReactElement;
  onConfirm: (clientName: string, clientEmail: string) => Promise<void>;
  onBack: () => void;
  className?: string;
  labels?: CalendarBookingStep3Labels;
}

export interface CalendarBookingStep3Labels {
  title?: string;
  summaryLabel?: string;
  infoSectionLabel?: string;
  clientNameLabel?: string;
  clientNamePlaceholder?: string;
  clientEmailLabel?: string;
  clientEmailPlaceholder?: string;
  confirmButton?: string;
  confirmingButton?: string;
  back?: string;
  successMessage?: string;
}

interface FormState {
  clientName: string;
  clientEmail: string;
}

interface FormErrors {
  clientName?: string;
  clientEmail?: string;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

const MONTH_NAMES_ES = [
  "enero", "febrero", "marzo", "abril", "mayo", "junio",
  "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre",
];

const DAY_NAMES_ES = [
  "domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado",
];

function formatDate(dateStr: string): string {
  const [y, m, d] = dateStr.split("-").map(Number);
  const date = new Date(y ?? 0, (m ?? 1) - 1, d ?? 1);
  const dayName = DAY_NAMES_ES[date.getDay()] ?? "";
  const monthName = MONTH_NAMES_ES[(m ?? 1) - 1] ?? "";
  const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
  return `${cap(dayName)} ${String(d)} de ${monthName} de ${String(y)}`;
}

function validateForm(values: FormState): FormErrors {
  const errors: FormErrors = {};
  if (!values.clientName.trim()) {
    errors.clientName = "El nombre es requerido.";
  }
  if (!values.clientEmail.trim()) {
    errors.clientEmail = "El email es requerido.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.clientEmail)) {
    errors.clientEmail = "El email no es válido.";
  }
  return errors;
}

// ─── Component ────────────────────────────────────────────────────────────────

/**
 * CalendarBookingStep3 — confirmation step.
 *
 * Shows a booking summary, renders `infoContent` as-is, and
 * collects clientName + clientEmail via a form.
 *
 * Handles loading/error/success states for the `onConfirm` async call.
 */
export function CalendarBookingStep3({
  selectedDate,
  selectedSlot,
  infoContent,
  onConfirm,
  onBack,
  className,
  labels = {},
}: CalendarBookingStep3Props): ReactNode {
  const [values, setValues] = useState<FormState>({ clientName: "", clientEmail: "" });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | undefined>(undefined);
  const [success, setSuccess] = useState(false);

  function handleChange(field: keyof FormState) {
    return (e: ChangeEvent<HTMLInputElement>) => {
      setValues((prev) => ({ ...prev, [field]: e.target.value }));
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    };
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const validation = validateForm(values);
    if (Object.keys(validation).length > 0) {
      setErrors(validation);
      return;
    }
    setSubmitting(true);
    setSubmitError(undefined);
    try {
      await onConfirm(values.clientName.trim(), values.clientEmail.trim());
      setSuccess(true);
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : "Ocurrió un error. Intenta nuevamente.");
    } finally {
      setSubmitting(false);
    }
  }

  if (success) {
    return (
      <div className={cn("flex flex-col gap-4 items-center py-8 text-center", className)} role="status">
        <svg
          aria-hidden="true"
          className="size-12 text-[var(--color-fw-primary)]"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <Text variant="label" weight="semibold">
          {labels.successMessage ?? "¡Cita confirmada!"}
        </Text>
        <Text variant="caption">
          {formatDate(selectedDate)} · {selectedSlot.startTime} – {selectedSlot.endTime}
        </Text>
      </div>
    );
  }

  return (
    <div className={cn("flex flex-col gap-5", className)}>
      <div className="flex flex-col gap-1">
        <Text variant="label" weight="semibold">
          {labels.title ?? "Confirma tu cita"}
        </Text>
      </div>

      {/* Booking summary */}
      <div className="rounded-lg border border-[var(--color-fw-border)] bg-[var(--color-fw-surface)] p-4 flex flex-col gap-1">
        <Text variant="small" weight="medium" className="text-[var(--color-fw-muted)]">
          {labels.summaryLabel ?? "Resumen"}
        </Text>
        <Text variant="small" weight="semibold">
          {formatDate(selectedDate)}
        </Text>
        <Text variant="small">
          {selectedSlot.startTime} – {selectedSlot.endTime}
        </Text>
      </div>

      {/* Info content — consumer decides */}
      <div aria-label={labels.infoSectionLabel ?? "Información adicional"}>
        {infoContent}
      </div>

      {/* Client form */}
      <form onSubmit={(e) => { void handleSubmit(e); }} className="flex flex-col gap-4" noValidate>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="clientName" className="text-sm font-medium text-[var(--color-fw-foreground)]">
            {labels.clientNameLabel ?? "Nombre"}
          </label>
          <Input
            id="clientName"
            type="text"
            placeholder={labels.clientNamePlaceholder ?? "Tu nombre completo"}
            value={values.clientName}
            onChange={handleChange("clientName")}
            aria-invalid={errors.clientName !== undefined ? true : undefined}
            aria-describedby={errors.clientName !== undefined ? "error-clientName" : undefined}
          />
          {errors.clientName !== undefined ? (
            <p id="error-clientName" role="alert" className="text-xs text-[var(--color-fw-destructive)]">
              {errors.clientName}
            </p>
          ) : null}
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="clientEmail" className="text-sm font-medium text-[var(--color-fw-foreground)]">
            {labels.clientEmailLabel ?? "Email"}
          </label>
          <Input
            id="clientEmail"
            type="email"
            placeholder={labels.clientEmailPlaceholder ?? "tu@email.com"}
            value={values.clientEmail}
            onChange={handleChange("clientEmail")}
            aria-invalid={errors.clientEmail !== undefined ? true : undefined}
            aria-describedby={errors.clientEmail !== undefined ? "error-clientEmail" : undefined}
          />
          {errors.clientEmail !== undefined ? (
            <p id="error-clientEmail" role="alert" className="text-xs text-[var(--color-fw-destructive)]">
              {errors.clientEmail}
            </p>
          ) : null}
        </div>

        {submitError !== undefined ? (
          <p role="alert" className="text-xs text-[var(--color-fw-destructive)]">
            {submitError}
          </p>
        ) : null}

        <Button type="submit" disabled={submitting} className="w-full">
          {submitting
            ? (labels.confirmingButton ?? "Confirmando…")
            : (labels.confirmButton ?? "Confirmar cita")}
        </Button>
      </form>

      <Button
        variant="ghost"
        size="sm"
        onClick={onBack}
        disabled={submitting}
        className="self-start -ml-2"
      >
        ← {labels.back ?? "Volver"}
      </Button>
    </div>
  );
}
