import { type ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Badge } from "@/atoms/Badge";
import { Button } from "@/atoms/Button";
import { Divider } from "@/atoms/Divider";
import { Text } from "@/atoms/Text";
import type {
  CalendarBlock,
  DayOfWeek,
  BlockType,
} from "@/__fixtures__/calendar";

// ─── Types ───────────────────────────────────────────────────────────────────

export interface CalendarBlockListProps {
  blocks: CalendarBlock[];
  onRemove: (id: string) => void;
  className?: string;
  /** Slot rendered when the list is empty. */
  emptyState?: ReactNode;
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

const DAY_NAMES: Record<DayOfWeek, string> = {
  0: "Domingo",
  1: "Lunes",
  2: "Martes",
  3: "Miércoles",
  4: "Jueves",
  5: "Viernes",
  6: "Sábado",
};

const PERIOD_LABELS: Record<string, string> = {
  weekly: "Semanal",
  biweekly: "Quincenal",
  monthly: "Mensual",
  once: "Fecha única",
};

const DURATION_LABEL: Record<number, string> = {
  30: "30 min",
  45: "45 min",
  60: "1 hora",
};

function groupKey(block: CalendarBlock): string {
  if (block.periodicity === "once") return `date:${block.date ?? ""}`;
  return `day:${String(block.dayOfWeek ?? 0)}`;
}

function groupLabel(key: string): string {
  if (key.startsWith("date:")) {
    const date = key.replace("date:", "");
    return new Intl.DateTimeFormat("es-CL", {
      day: "numeric",
      month: "long",
      year: "numeric",
      timeZone: "UTC",
    }).format(new Date(`${date}T00:00:00Z`));
  }
  const day = Number(key.replace("day:", "")) as DayOfWeek;
  return DAY_NAMES[day];
}

function groupSortOrder(key: string): number {
  if (key.startsWith("date:")) return 999;
  return Number(key.replace("day:", ""));
}

function blockTypeLabel(type: BlockType): string {
  return type === "available" ? "Disponible" : "Protegido";
}

// ─── Sub-component: single block row ─────────────────────────────────────────

interface BlockRowProps {
  block: CalendarBlock;
  onRemove: (id: string) => void;
}

function BlockRow({ block, onRemove }: BlockRowProps) {
  const label = `Eliminar bloque ${block.startTime}–${block.endTime} ${DAY_NAMES[block.dayOfWeek ?? 1]}`;

  return (
    <li className="flex items-center justify-between gap-3 py-2.5 px-3 rounded-lg hover:bg-[var(--color-fw-secondary)] transition-colors duration-150">
      <div className="flex items-center gap-2.5 min-w-0">
        <Badge
          variant={block.type === "available" ? "primary" : "default"}
          radius="md"
        >
          {blockTypeLabel(block.type)}
        </Badge>

        <span className="text-sm text-[var(--color-fw-foreground)] font-medium tabular-nums shrink-0">
          {block.startTime} – {block.endTime}
        </span>

        <span className="text-xs text-[var(--color-fw-muted-foreground)] shrink-0">
          {PERIOD_LABELS[block.periodicity]}
          {block.type === "available" &&
            ` · ${DURATION_LABEL[block.slotDuration]}`}
        </span>
      </div>

      <Button
        type="button"
        variant="ghost"
        size="sm"
        aria-label={label}
        onClick={() => {
          onRemove(block.id);
        }}
        className="shrink-0 text-[var(--color-fw-muted-foreground)] hover:text-[var(--color-fw-destructive)]"
      >
        ×
      </Button>
    </li>
  );
}

// ─── Component ───────────────────────────────────────────────────────────────

/**
 * CalendarBlockList — displays schedule blocks grouped by day of week or date.
 *
 * Recurrent blocks (weekly/biweekly/monthly) are grouped by `dayOfWeek` and
 * sorted Mon→Sun. One-time blocks (`periodicity === "once"`) are appended after,
 * sorted by date string.
 *
 * ```tsx
 * <CalendarBlockList blocks={blocks} onRemove={handleRemove} />
 * ```
 */
export function CalendarBlockList({
  blocks,
  onRemove,
  className,
  emptyState,
}: CalendarBlockListProps) {
  if (blocks.length === 0) {
    return (
      <div
        className={cn(
          "flex flex-col items-center justify-center py-12 text-center",
          className,
        )}
      >
        {emptyState ?? (
          <Text variant="small">No hay bloques configurados.</Text>
        )}
      </div>
    );
  }

  // Group blocks by key (day or date)
  const grouped = new Map<string, CalendarBlock[]>();
  for (const block of blocks) {
    const key = groupKey(block);
    if (!grouped.has(key)) grouped.set(key, []);
    const group = grouped.get(key);
    if (group) group.push(block);
  }

  // Sort groups: Mon(1)→Sun(0), then dates at the end
  const sortedKeys = [...grouped.keys()].sort(
    (a, b) => groupSortOrder(a) - groupSortOrder(b),
  );

  return (
    <div className={cn("flex flex-col gap-1", className)}>
      {sortedKeys.map((key, idx) => (
        <section key={key} aria-label={groupLabel(key)}>
          <div className="flex items-center gap-2 px-3 py-1.5">
            <Text
              as="h3"
              variant="caption"
              weight="semibold"
              className="uppercase tracking-wider"
            >
              {groupLabel(key)}
            </Text>
          </div>

          <ul className="flex flex-col">
            {(grouped.get(key) ?? []).map((block) => (
              <BlockRow key={block.id} block={block} onRemove={onRemove} />
            ))}
          </ul>

          {idx < sortedKeys.length - 1 && <Divider spacing="sm" />}
        </section>
      ))}
    </div>
  );
}
