import React, { useState } from "react";
import { cn } from "@/lib/cn";
import { Input } from "@/atoms/Input";
import { Select } from "@/atoms/Select";
import { Button } from "@/atoms/Button";
import type {
  BlockType,
  Periodicity,
  DayOfWeek,
  SlotDuration,
  AttendanceMode,
  CalendarBlock,
} from "@/__fixtures__/calendar";

// ─── Types ───────────────────────────────────────────────────────────────────

export type CalendarBlockFormData = Omit<CalendarBlock, "id" | "timezone">;

export interface CalendarBlockFormProps {
  /** Called with validated data when the user submits the form. */
  onSubmit: (data: CalendarBlockFormData) => void;
  /** Called when the user clicks Cancel. */
  onCancel?: () => void;
  /** attendanceMode is set at the organism level — not chosen per block. */
  attendanceMode: AttendanceMode;
  /** Existing blocks — used to detect time overlaps on the same day. */
  existingBlocks?: Pick<
    CalendarBlock,
    "dayOfWeek" | "date" | "startTime" | "endTime"
  >[];
  className?: string;
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function toMinutes(time: string): number {
  const [h, m] = time.split(":").map(Number);
  return h * 60 + m;
}

function hasOverlap(
  dayOfWeek: DayOfWeek | undefined,
  date: string | undefined,
  startTime: string,
  endTime: string,
  existing: Pick<
    CalendarBlock,
    "dayOfWeek" | "date" | "startTime" | "endTime"
  >[],
): boolean {
  const start = toMinutes(startTime);
  const end = toMinutes(endTime);

  return existing.some((block) => {
    const sameDay =
      dayOfWeek !== undefined
        ? block.dayOfWeek === dayOfWeek
        : block.date === date;
    if (!sameDay) return false;
    const bStart = toMinutes(block.startTime);
    const bEnd = toMinutes(block.endTime);
    return start < bEnd && end > bStart;
  });
}

// ─── Form state ───────────────────────────────────────────────────────────────

interface FormState {
  type: BlockType;
  periodicity: Periodicity;
  dayOfWeek: string;
  date: string;
  startTime: string;
  endTime: string;
  slotDuration: string;
}

const INITIAL_STATE: FormState = {
  type: "available",
  periodicity: "weekly",
  dayOfWeek: "1",
  date: "",
  startTime: "09:00",
  endTime: "13:00",
  slotDuration: "60",
};

// ─── Component ───────────────────────────────────────────────────────────────

/**
 * CalendarBlockForm — form for creating a schedule block.
 *
 * Manages its own local form state. When valid, calls `onSubmit` with the
 * block data (without id/timezone — the caller assigns those).
 *
 * Conditional fields:
 * - `slotDuration` only shown when `type === "available"`
 * - `dayOfWeek` only shown when `periodicity !== "once"`
 * - `date` only shown when `periodicity === "once"`
 */
export function CalendarBlockForm({
  onSubmit,
  onCancel,
  attendanceMode,
  existingBlocks = [],
  className,
}: CalendarBlockFormProps) {
  const [form, setForm] = useState<FormState>(INITIAL_STATE);
  const [errors, setErrors] = useState<
    Partial<Record<keyof FormState, string>>
  >({});
  const [overlapWarning, setOverlapWarning] = useState(false);

  const isOnce = form.periodicity === "once";
  const isAvailable = form.type === "available";

  function set<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
    setOverlapWarning(false);
  }

  function validate(): boolean {
    const next: typeof errors = {};

    if (isOnce && !form.date) {
      next.date = "Ingresa una fecha";
    }
    if (!form.startTime) {
      next.startTime = "Ingresa hora de inicio";
    }
    if (!form.endTime) {
      next.endTime = "Ingresa hora de término";
    }
    if (
      form.startTime &&
      form.endTime &&
      toMinutes(form.endTime) <= toMinutes(form.startTime)
    ) {
      next.endTime = "La hora de término debe ser posterior al inicio";
    }

    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!validate()) return;

    const dayOfWeek = isOnce
      ? undefined
      : (Number(form.dayOfWeek) as DayOfWeek);
    const date = isOnce ? form.date : undefined;

    const overlap = hasOverlap(
      dayOfWeek,
      date,
      form.startTime,
      form.endTime,
      existingBlocks,
    );
    setOverlapWarning(overlap);

    onSubmit({
      type: form.type,
      periodicity: form.periodicity,
      dayOfWeek,
      date,
      startTime: form.startTime,
      endTime: form.endTime,
      slotDuration: Number(form.slotDuration) as SlotDuration,
      attendanceMode,
    });

    setForm(INITIAL_STATE);
    setErrors({});
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={cn("flex flex-col gap-4", className)}
      noValidate
    >
      <Select
        label="Tipo de bloque"
        value={form.type}
        onChange={(e) => {
          set("type", e.target.value as BlockType);
        }}
        options={[
          { value: "available", label: "Disponible para reservas" },
          { value: "protected", label: "Protegido (no asignable)" },
        ]}
      />

      <Select
        label="Periodicidad"
        value={form.periodicity}
        onChange={(e) => {
          set("periodicity", e.target.value as Periodicity);
        }}
        options={[
          { value: "weekly", label: "Semanal" },
          { value: "biweekly", label: "Quincenal" },
          { value: "monthly", label: "Mensual" },
          { value: "once", label: "Fecha específica" },
        ]}
      />

      {isOnce ? (
        <Input
          label="Fecha"
          type="date"
          value={form.date}
          onChange={(e) => {
            set("date", e.target.value);
          }}
          error={errors.date}
        />
      ) : (
        <Select
          label="Día de la semana"
          value={form.dayOfWeek}
          onChange={(e) => {
            set("dayOfWeek", e.target.value);
          }}
          options={[
            { value: "1", label: "Lunes" },
            { value: "2", label: "Martes" },
            { value: "3", label: "Miércoles" },
            { value: "4", label: "Jueves" },
            { value: "5", label: "Viernes" },
            { value: "6", label: "Sábado" },
            { value: "0", label: "Domingo" },
          ]}
        />
      )}

      <div className="grid grid-cols-2 gap-3">
        <Input
          label="Inicio"
          type="time"
          value={form.startTime}
          onChange={(e) => {
            set("startTime", e.target.value);
          }}
          error={errors.startTime}
        />
        <Input
          label="Término"
          type="time"
          value={form.endTime}
          onChange={(e) => {
            set("endTime", e.target.value);
          }}
          error={errors.endTime}
        />
      </div>

      {isAvailable ? (
        <Select
          label="Duración de cada slot"
          value={form.slotDuration}
          onChange={(e) => {
            set("slotDuration", e.target.value);
          }}
          options={[
            { value: "30", label: "30 minutos" },
            { value: "45", label: "45 minutos" },
            { value: "60", label: "1 hora" },
          ]}
        />
      ) : null}

      {overlapWarning ? (
        <p
          role="alert"
          className="text-xs text-[var(--color-fw-warning-text)] bg-[var(--color-fw-warning)]/10 border border-[var(--color-fw-warning)]/30 rounded-md px-3 py-2"
        >
          Este bloque se superpone con uno existente del mismo día.
        </p>
      ) : null}

      <div className="flex gap-2 pt-1">
        <Button type="submit" variant="primary" size="sm" fullWidth>
          Agregar bloque
        </Button>
        {onCancel ? (
          <Button type="button" variant="ghost" size="sm" onClick={onCancel}>
            Cancelar
          </Button>
        ) : null}
      </div>
    </form>
  );
}
