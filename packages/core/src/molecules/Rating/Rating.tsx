import { useId, type HTMLAttributes } from "react";
import { useSignal } from "@preact/signals-react";
import { useSignals } from "@preact/signals-react/runtime";
import { cn } from "@/lib/cn";
import {
  ratingContainerVariants,
  ratingStarVariants,
  ratingInputFocusClass,
  type RatingVariants,
} from "./Rating.variants";

// ─── Star SVG ─────────────────────────────────────────────────────────────────

const STAR_PATH =
  "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z";

/**
 * Two-layer star:
 * - Background layer — always rendered in `--color-fw-border` (empty colour).
 * - Foreground layer — absolutely positioned, clipped to `fillFraction × 100 %`
 *   width so it reveals only the filled portion of the star.
 *
 * `fillFraction` range: 0 (empty) → 1 (full). Decimals produce partial fills,
 * which is used for display-only ratings (e.g. average score 3.7 / 5).
 * During interactive use the value is always a whole number →0 / 1 fractions.
 */
function StarIcon({ fillFraction }: { fillFraction: number }) {
  const pct = Math.round(Math.min(1, Math.max(0, fillFraction)) * 100);
  return (
    <>
      {/* Background: always the empty/border colour — fills the parent label */}
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        className="absolute inset-0 size-full text-[var(--color-fw-border)]"
        aria-hidden="true"
        focusable={false}
      >
        <path d={STAR_PATH} />
      </svg>
      {/*
       * Clip container: anchored to the left edge, variable width (N% of the
       * star label). `overflow-hidden` clips the foreground SVG so only the
       * filled portion is visible.
       *
       * `inset-y-0 left-0` (NOT `inset-0`) avoids the `right: 0` conflict
       * that would fight the explicit `width: N%` and break the crop.
       *
       * The inner SVG uses `h-full w-auto` so it always renders at the full
       * star size (height-driven, square aspect ratio) — the container then
       * crops it from the right, producing a clean left-to-right horizontal
       * fill (e.g. 4.5 → 4 full stars + left half of 5th star coloured).
       */}
      {pct > 0 && (
        <span
          aria-hidden="true"
          className="absolute inset-y-0 left-0 overflow-hidden text-[var(--color-fw-warning)]"
          style={{ width: `${String(pct)}%` }}
        >
          <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            className="h-full w-auto"
            aria-hidden="true"
            focusable={false}
          >
            <path d={STAR_PATH} />
          </svg>
        </span>
      )}
    </>
  );
}

// ─── Default text getters (English fallbacks — consumers supply translated fns) ─

function defaultGetValueText(value: number, max: number): string {
  if (value === 0) {
    return "No rating";
  }
  return `${String(value)} of ${String(max)} stars`;
}

function defaultGetStarLabel(starValue: number, _max: number): string {
  return starValue === 1 ? "1 star" : `${String(starValue)} stars`;
}

// ─── Props ────────────────────────────────────────────────────────────────────

export interface RatingProps extends Pick<
  HTMLAttributes<HTMLFieldSetElement>,
  "className" | "id" | "style"
> {
  /**
   * Controlled rating value. `0` = no selection, `1..max` = N stars selected.
   * When provided, the component is fully controlled — pair with `onChange`.
   */
  value?: number;

  /** Uncontrolled initial value (default: `0` — nothing selected). */
  defaultValue?: number;

  /** Called when the user selects or clears a star. */
  onChange?: (value: number) => void;

  /** Total number of stars to render (default: `5`). */
  max?: number;

  /** Star size used for the label wrapper (default: `md`). */
  size?: RatingVariants["size"];

  /**
   * When `true`, the widget renders as display-only — hover and click are
   * disabled but the element is still visible and legible.
   */
  readonly?: boolean;

  /**
   * When `true`, disables the fieldset — greyed-out, non-operable,
   * skipped in tab order.
   */
  disabled?: boolean;

  /**
   * **Required.** Accessible label for the rating fieldset.
   * Announced by screen readers as the group name.
   * e.g. `"Rate this product"`, `"Customer rating"`
   *
   * Supply the translated string from the parent — the DS never hardcodes text.
   */
  label: string;

  /**
   * Returns the `aria-valuetext` string read by screen readers.
   * The default English implementation is `"N of max stars"` / `"No rating"`.
   * Override for localisation: `(v, m) => t("rating.valueText", { value: v, max: m })`
   */
  getValueText?: (value: number, max: number) => string;

  /**
   * Returns the accessible label for each individual star radio button.
   * Default: `"1 star"` (singular) / `"N stars"` (plural).
   * Override for localisation: `(v) => t("rating.starLabel", { count: v })`
   */
  getStarLabel?: (starValue: number, max: number) => string;
}

// ─── Component ────────────────────────────────────────────────────────────────

/**
 * Rating — a star-picker molecule.
 *
 * Built with `<fieldset>` + visually-hidden `<input type="radio">` elements
 * for native keyboard navigation and screen-reader semantics (WCAG 2.2 AA).
 * The visual stars are `<label>` wrappers — no `<button>` required.
 *
 * Internal hover state and uncontrolled value are managed via React `useState`.
 * Hover state can be migrated to `useSignal` from `@preact/signals-react` once
 * the Vite/Babel transform is configured for finer-grained hover updates.
 *
 * Decimal `value` support: pass a fractional number (e.g. `value={3.7}`) for
 * display-only contexts such as average ratings. The widget renders a partial
 * star via a CSS clip-width overlay — no rounding applied to the display layer.
 * Interactive use (click/keyboard) always produces whole-number values.
 *
 * ```tsx
 * // Uncontrolled
 * <Rating label="Rate this product" defaultValue={3} onChange={console.log} />
 *
 * // Controlled
 * const [stars, setStars] = useState(0);
 * <Rating label="Your rating" value={stars} onChange={setStars} />
 *
 * // Read-only display
 * <Rating label="Average rating" value={4} readonly />
 * ```
 *
 * **Keyboard:** Arrow keys change the value; Home = 1 (min); End = max.
 * Clicking a selected star deselects it (resets to 0).
 *
 * **i18n:** All text is injected via props — no hardcoded strings.
 */
export function Rating({
  value: controlledValue,
  defaultValue = 0,
  onChange,
  max = 5,
  size,
  readonly = false,
  disabled = false,
  label,
  getValueText = defaultGetValueText,
  getStarLabel = defaultGetStarLabel,
  className,
  ...props
}: RatingProps) {
  // Unique name for the radio group — prevents collisions on the same page
  const radioGroupName = useId();
  useSignals();

  // Hover state — drives the visual fill preview on mouse-over.
  const hovered = useSignal(0);

  // Uncontrolled value — only used when `controlledValue` is undefined
  const internalValue = useSignal(defaultValue);

  const isInteractive = !readonly && !disabled;

  // Committed (persisted) value: controlled prop wins over internal state
  const currentValue = controlledValue ?? internalValue.value;

  // Displayed value: hover preview wins over current value
  const displayedValue = hovered.value > 0 ? hovered.value : currentValue;

  function handleChange(starValue: number) {
    if (!isInteractive) {
      return;
    }
    if (controlledValue === undefined) {
      internalValue.value = starValue;
    }
    onChange?.(starValue);
  }

  function handleClickDeselect(starValue: number) {
    if (!isInteractive) {
      return;
    }
    // Clicking the already-selected star deselects (resets to 0)
    if (starValue === currentValue) {
      if (controlledValue === undefined) {
        internalValue.value = 0;
      }
      onChange?.(0);
    }
  }

  return (
    // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions -- fieldset hosts radio inputs; onMouseLeave resets hover preview
    <fieldset
      disabled={disabled}
      className={cn(
        ratingContainerVariants({ size }),
        readonly && "pointer-events-none",
        className,
      )}
      onMouseLeave={() => {
        if (isInteractive) {
          hovered.value = 0;
        }
      }}
      {...props}
    >
      {/*
       * sr-only legend — provides the accessible group name for screen readers.
       * WCAG 1.3.1 Info and Relationships (A) + 2.4.6 Headings and Labels (AA).
       */}
      <legend className="sr-only">{label}</legend>

      {/*
       * Current value announced to screen readers via a live region.
       * Positioned off-screen; updates when the value changes.
       */}
      <span className="sr-only" aria-live="polite" aria-atomic="true">
        {getValueText(currentValue, max)}
      </span>

      {Array.from({ length: max }, (_, i) => {
        const starValue = i + 1;
        // fillFraction: 0 (empty) → 1 (full), supports decimals for display.
        // e.g. displayedValue=3.7 →0: star 1–3 → 1.0, star 4 → 0.7, star 5 → 0.0
        const fillFraction = Math.min(
          1,
          Math.max(0, displayedValue - (starValue - 1)),
        );

        return (
          // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions -- label wraps a radio input; onMouseEnter drives hover preview
          <label
            key={starValue}
            className={ratingStarVariants({ size })}
            onMouseEnter={() => {
              if (isInteractive) {
                hovered.value = starValue;
              }
            }}
          >
            {/* Visually hidden radio — carries semantics + keyboard nav */}
            <input
              type="radio"
              name={radioGroupName}
              value={starValue}
              checked={currentValue === starValue}
              onChange={() => {
                handleChange(starValue);
              }}
              onClick={() => {
                handleClickDeselect(starValue);
              }}
              disabled={disabled}
              className={cn("sr-only", ratingInputFocusClass)}
              aria-label={getStarLabel(starValue, max)}
            />
            {/* Visual star — aria-hidden since the input carries all semantics */}
            <StarIcon fillFraction={fillFraction} />
          </label>
        );
      })}
    </fieldset>
  );
}

Rating.displayName = "Rating";
