import { useState, type ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Text } from "@/atoms/Text";
import { Divider } from "@/atoms/Divider";
import { CalendarBlockList } from "@/molecules/CalendarBlockList";
import {
  CalendarBlockForm,
  type CalendarBlockFormData,
} from "@/molecules/CalendarBlockForm";
import type { CalendarBlock, AttendanceMode } from "@/__fixtures__/calendar";

// ─── Types ───────────────────────────────────────────────────────────────────

export interface CalendarManagerProps {
  /**
   * Attendance mode applied to every block created.
   * Set at the organism level — not chosen per block.
   */
  attendanceMode: AttendanceMode;
  /** Current list of schedule blocks. */
  blocks: CalendarBlock[];
  /** Called when the user submits the form to create a new block. */
  onAddBlock: (block: Omit<CalendarBlock, "id" | "timezone">) => void;
  /** Called when the user removes an existing block. */
  onRemoveBlock: (id: string) => void;
  /** Timezone label shown in the header. @default "America/Santiago" */
  timezone?: string;
  /** Optional slot rendered inside the empty state below the CTA text. */
  emptyStateSlot?: ReactNode;
  className?: string;
}

// ─── Empty state ─────────────────────────────────────────────────────────────

interface EmptyStateProps {
  extra?: ReactNode;
}

function EmptyState({ extra }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center h-full py-16 text-center gap-2">
      <svg
        aria-hidden="true"
        className="size-10 text-[var(--color-fw-muted)]"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 9v7.5"
        />
      </svg>
      <Text variant="small" weight="medium">
        Sin bloques configurados
      </Text>
      <Text variant="caption">
        Usa el formulario para agregar tu primer bloque de atención.
      </Text>
      {extra}
    </div>
  );
}

// ─── Component ───────────────────────────────────────────────────────────────

/**
 * CalendarManager — organismo de configuración de agenda.
 *
 * Desktop-first. Layout de dos columnas fijas:
 * - Izquierda: lista de bloques agrupada por día.
 * - Derecha: formulario siempre visible para agregar bloques.
 *
 * El `attendanceMode` se aplica en nivel organismo — el abogado lo configura
 * una vez, no por bloque individual.
 *
 * ```tsx
 * <CalendarManager
 *   attendanceMode="in-person"
 *   blocks={blocks}
 *   onAddBlock={handleAdd}
 *   onRemoveBlock={handleRemove}
 * />
 * ```
 */
export function CalendarManager({
  attendanceMode,
  blocks,
  onAddBlock,
  onRemoveBlock,
  timezone = "America/Santiago",
  emptyStateSlot,
  className,
}: CalendarManagerProps) {
  const [key, setKey] = useState(0);

  function handleAdd(data: CalendarBlockFormData) {
    onAddBlock(data);
    // Reset the form by remounting it
    setKey((k) => k + 1);
  }

  return (
    <section
      aria-label="Configuración de agenda"
      className={cn(
        "flex flex-col gap-0 rounded-xl border border-[var(--color-fw-border)] bg-[var(--color-fw-background)] overflow-hidden",
        className,
      )}
    >
      {/* Header */}
      <header className="flex items-center justify-between px-5 py-4 border-b border-[var(--color-fw-border)]">
        <div className="flex flex-col gap-0.5">
          <Text as="h2" variant="label" weight="semibold">
            Horarios de atención
          </Text>
          <Text variant="caption">Zona horaria: {timezone}</Text>
        </div>

        <Text variant="caption">
          {blocks.length} {blocks.length === 1 ? "bloque" : "bloques"}
        </Text>
      </header>

      {/* Body: two-column layout */}
      <div className="grid grid-cols-[1fr_auto] min-h-[400px]">
        {/* Left: block list */}
        <div className="overflow-y-auto py-3 px-1">
          {blocks.length === 0 ? (
            <EmptyState extra={emptyStateSlot} />
          ) : (
            <CalendarBlockList blocks={blocks} onRemove={onRemoveBlock} />
          )}
        </div>

        {/* Right: divider + form panel (wrapped so grid sees only 2 children) */}
        <div className="flex">
          <Divider orientation="vertical" spacing="none" />
          <div className="w-80 px-5 py-5 flex flex-col gap-4 bg-[var(--color-fw-surface)]">
            <div className="flex flex-col gap-0.5">
              <Text variant="label" weight="semibold">
                Agregar bloque
              </Text>
              <Text variant="caption">
                Modo: {attendanceMode === "in-person" ? "Presencial" : "Remoto"}
              </Text>
            </div>

            <CalendarBlockForm
              key={key}
              attendanceMode={attendanceMode}
              existingBlocks={blocks}
              onSubmit={handleAdd}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
