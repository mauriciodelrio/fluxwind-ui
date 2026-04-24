import {
  forwardRef,
  type AriaRole,
  type ElementType,
  type HTMLAttributes,
} from "react";
import { cn } from "@/lib/cn";
import {
  statusTextVariants,
  type StatusTextVariants,
} from "./StatusText.variants";

// Elements that carry role="status" implicitly in the accessibility tree.
// <output> is the only standard HTML element with this implicit role.
const IMPLICIT_STATUS_ELEMENTS = new Set(["output"]);

export interface StatusTextProps
  extends Omit<HTMLAttributes<HTMLElement>, "color">, StatusTextVariants {
  /**
   * HTML element to render.
   *
   * Defaults to `<output>`, which has `role="status"` implicitly — screen
   * readers announce content changes politely without explicit ARIA.
   * When changed to any other element, `role="status"` is added automatically
   * so the live region behaviour is preserved.
   *
   * @default "output"
   */
  as?: ElementType;
  /**
   * Identifies this live region when multiple `StatusText` components exist
   * on the same page. Screen readers prepend the label to each announcement.
   *
   * @example aria-label="Guardado automático"
   */
  "aria-label"?: string;
  /**
   * Whether the AT announces the entire region on every change (`true`) or
   * only the changed nodes (`false`).
   *
   * Defaults to `true` — most status messages are short enough that full
   * re-announcement is clearer than a partial delta.
   *
   * @default true
   */
  "aria-atomic"?: boolean | "true" | "false";
  /**
   * Override the live region politeness level.
   * `"polite"` waits for the user to be idle (default, inherited from `<output>`).
   * `"off"` silences the region entirely — useful for transient states you want
   * to stop announcing without unmounting the element.
   *
   * Do NOT use `"assertive"` here — use `Alert` for interrupting announcements.
   */
  "aria-live"?: "polite" | "off";
}

/**
 * `StatusText` wraps the native `<output>` element to surface its implicit
 * `role="status"` live region to screen readers. Content changes inside this
 * component are announced **politely** (without interrupting the user) by
 * assistive technologies — no ARIA configuration required.
 *
 * **When to use `StatusText` vs `Alert`:**
 * - `StatusText` → polite, non-critical feedback (auto-save, search result count,
 *   form field validation success, character counter).
 * - `Alert` → assertive, time-sensitive feedback (error messages, session expiry).
 *
 * @example
 * // Basic usage — <output> is implicit role="status"
 * <StatusText aria-label="Save status" color="success">
 *   Changes saved
 * </StatusText>
 *
 * @example
 * // Override element — role="status" is added explicitly
 * <StatusText as="p" color="muted">3 results found</StatusText>
 */
const StatusText = forwardRef<HTMLElement, StatusTextProps>(
  (
    {
      as: Tag = "output",
      className,
      variant,
      color,
      "aria-atomic": ariaAtomic = true,
      ...props
    },
    ref,
  ) => {
    // Add explicit role="status" only when the rendered element does not
    // carry it implicitly — preserves correct AT semantics regardless of `as`.
    const needsExplicitRole =
      typeof Tag === "string" && !IMPLICIT_STATUS_ELEMENTS.has(Tag);

    const role: AriaRole | undefined = needsExplicitRole ? "status" : undefined;

    return (
      <Tag
        ref={ref}
        role={role}
        aria-atomic={ariaAtomic}
        className={cn(statusTextVariants({ variant, color }), className)}
        {...props}
      />
    );
  },
);

StatusText.displayName = "StatusText";

export { StatusText };
