import { useId, type ReactNode } from "react";
import { cn } from "@/lib/cn";
import {
  tooltipBubbleVariants,
  tooltipArrowVariants,
  type TooltipVariants,
} from "./Tooltip.variants";

export interface TooltipProps extends TooltipVariants {
  /**
   * The tooltip text content — announced via `aria-describedby` on the trigger.
   */
  content: string;
  /**
   * The trigger element. Must be focusable (a `<button>`, `<a>`, or element with
   * `tabIndex`) so keyboard users can reveal the tooltip on focus.
   */
  children: ReactNode;
  /** Additional classes applied to the outer wrapper. */
  className?: string;
}

/**
 * Tooltip — CSS-only contextual label atom.
 *
 * Wraps a focusable trigger in a `group` container. The bubble appears on
 * `hover` and `focus-within`, driven entirely by Tailwind `group-hover` /
 * `group-focus-within` — no JS state, no portal, no Floating UI.
 *
 * **A11y:**
 * - The bubble has `role="tooltip"` and a unique `id`.
 * - The trigger's wrapper has `aria-describedby` pointing to that `id`, so the
 *   tooltip text is read by screen readers when the trigger receives focus.
 * - The trigger itself must be natively focusable or have `tabIndex`.
 *
 * **Limitations (atom scope):**
 * Overflow clipping by a parent container can hide the bubble. If you need
 * scroll-aware or viewport-safe positioning, use a Molecule that wraps Floating UI.
 */
export function Tooltip({
  content,
  children,
  placement = "top",
  className,
}: TooltipProps) {
  const tooltipId = useId();

  return (
    <span
      className={cn("relative inline-flex group", className)}
      aria-describedby={tooltipId}
    >
      {children}

      {/* Bubble */}
      <span
        id={tooltipId}
        role="tooltip"
        className={tooltipBubbleVariants({ placement })}
      >
        {content}

        {/* Arrow */}
        <span
          aria-hidden="true"
          className={tooltipArrowVariants({ placement })}
        />
      </span>
    </span>
  );
}
