import { type HTMLAttributes, type ReactNode, type MouseEvent } from "react";
import { cn } from "@/lib/cn";
import {
  chipVariants,
  chipDismissVariants,
  type ChipVariants,
} from "./Chip.variants";

export interface ChipProps
  extends Omit<HTMLAttributes<HTMLSpanElement>, "children">, ChipVariants {
  /** Label text rendered inside the chip. */
  label: string;
  /** Optional leading icon (any ReactNode — pass a Lucide component or custom SVG). */
  icon?: ReactNode;
  /**
   * When provided, renders a dismiss (×) button. The callback receives the
   * click event on the dismiss button (not the chip root).
   * The button's accessible label is `"Remove ${label}"`.
   */
  onDismiss?: (e: MouseEvent<HTMLButtonElement>) => void;
  /**
   * When provided, the chip root becomes a `<button>` instead of a `<span>`,
   * making the entire chip clickable (e.g. filter toggle).
   */
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
}

/**
 * Chip — an interactive label atom.
 *
 * Differs from `Badge` in two key ways:
 * 1. **Interactive** — supports `onClick` (toggleable filter) and `onDismiss`
 *    (removable tag). Badge is purely presentational.
 * 2. **Always has hover state** — the visual treatment acknowledges the
 *    interactive affordance.
 *
 * ```tsx
 * <Chip label="React" />
 * <Chip label="React" onDismiss={() => removeTag("React")} />
 * <Chip label="TypeScript" icon={<Icon icon={Code} size="sm" />} />
 * <Chip label="Filter active" variant="primary" onClick={toggleFilter} />
 * ```
 *
 * **A11y:** When `onClick` is present, the root renders as `<button>` with
 * `type="button"`. The dismiss button carries `aria-label="Remove {label}"` so
 * both targets are independently operable via keyboard.
 */
export function Chip({
  label,
  icon,
  onDismiss,
  onClick,
  variant,
  size,
  radius,
  className,
  ...props
}: ChipProps) {
  const rootClass = cn(
    chipVariants({ variant, size, radius }),
    onClick ? "cursor-pointer" : "cursor-default",
    className,
  );

  const inner = (
    <>
      {icon ? (
        <span aria-hidden="true" className="shrink-0 flex items-center">
          {icon}
        </span>
      ) : null}
      <span>{label}</span>
      {onDismiss ? (
        <button
          type="button"
          aria-label={`Remove ${label}`}
          className={cn(chipDismissVariants({ variant }))}
          onClick={onDismiss}
          // Prevent click from bubbling to the root when chip is also clickable
          onMouseDown={(e) => {
            e.stopPropagation();
          }}
        >
          {/* × icon as inline SVG — no external dep needed for a 10×10 glyph */}
          <svg
            aria-hidden="true"
            viewBox="0 0 10 10"
            className="size-2.5"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
          >
            <path d="M2 2l6 6M8 2l-6 6" />
          </svg>
        </button>
      ) : null}
    </>
  );

  if (onClick) {
    return (
      <button
        type="button"
        className={rootClass}
        onClick={onClick}
        {...(props as HTMLAttributes<HTMLButtonElement>)}
      >
        {inner}
      </button>
    );
  }

  return (
    <span className={rootClass} {...props}>
      {inner}
    </span>
  );
}
