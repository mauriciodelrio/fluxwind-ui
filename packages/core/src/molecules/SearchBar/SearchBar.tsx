import {
  forwardRef,
  useId,
  useRef,
  useCallback,
  type InputHTMLAttributes,
  type KeyboardEvent,
  type ChangeEvent,
} from "react";
import { Search, X } from "lucide-react";
import { cn } from "@/lib/cn";
import {
  searchBarInputVariants,
  searchBarClearVariants,
  type SearchBarSize,
  type SearchBarRadius,
} from "./SearchBar.variants";

// ─── Icon size map ────────────────────────────────────────────────────────────

const ICON_SIZE: Record<SearchBarSize, string> = {
  sm: "size-3.5",
  md: "size-4",
  lg: "size-5",
};

// Trailing padding when the clear button is visible, per size
const CLEAR_PR: Record<SearchBarSize, string> = {
  sm: "pr-8",
  md: "pr-9",
  lg: "pr-10",
};

// ─── Props ────────────────────────────────────────────────────────────────────

export interface SearchBarProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "size" | "type"
> {
  /** Visible label — required for accessibility (rendered as visually-hidden <label>). */
  label: string;
  /** Size variant. @default "md" */
  size?: SearchBarSize;
  /** Border radius variant. @default "md" */
  radius?: SearchBarRadius;
  /**
   * Callback fired when the user presses Enter or clicks the search icon.
   * Receives the current input value.
   */
  onSearch?: (value: string) => void;
  /**
   * Callback fired when the clear (×) button is clicked.
   * When provided, the clear button appears whenever the input has a value.
   */
  onClear?: () => void;
  /**
   * Accessible label for the clear button.
   * @default "Clear search"
   */
  clearLabel?: string;
}

// ─── Component ────────────────────────────────────────────────────────────────

const SearchBar = forwardRef<HTMLInputElement, SearchBarProps>(
  (
    {
      label,
      size = "md",
      radius = "md",
      onSearch,
      onClear,
      clearLabel = "Clear search",
      value,
      defaultValue,
      onChange,
      onKeyDown,
      disabled,
      className,
      id: externalId,
      ...props
    },
    ref,
  ) => {
    const generatedId = useId();
    const id = externalId ?? generatedId;
    const labelId = `${id}-label`;

    const internalRef = useRef<HTMLInputElement>(null);
    // When a ref is forwarded use it; otherwise fall back to the internal one
    const inputRef =
      (ref as React.RefObject<HTMLInputElement> | null) ?? internalRef;

    // Determine whether the input currently has a value (controlled or defaultValue)
    const rawValue = value ?? defaultValue;
    const hasValue = rawValue !== undefined && String(rawValue).length > 0;

    // Show clear button only when a clear handler is wired and there is something to clear
    const showClear = onClear !== undefined && hasValue;

    const handleKeyDown = useCallback(
      (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && onSearch) {
          onSearch((e.currentTarget as HTMLInputElement).value);
        }
        onKeyDown?.(e);
      },
      [onSearch, onKeyDown],
    );

    const handleChange = useCallback(
      (e: ChangeEvent<HTMLInputElement>) => {
        onChange?.(e);
      },
      [onChange],
    );

    const handleClear = useCallback(() => {
      onClear?.();
      // Return focus to the input after clearing
      inputRef.current?.focus();
    }, [onClear, inputRef]);

    const iconSize = ICON_SIZE[size];

    return (
      <div className="flex flex-col gap-1.5 w-full">
        {/* Visually hidden label — always present for screen readers */}
        <label id={labelId} htmlFor={id} className="sr-only">
          {label}
        </label>

        <div className="relative flex items-center">
          {/* Leading search icon — always decorative (label provides context) */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute left-3 text-[var(--color-fw-muted)]"
          >
            <Search className={iconSize} />
          </span>

          <input
            ref={inputRef}
            id={id}
            type="search"
            role="searchbox"
            aria-labelledby={labelId}
            disabled={disabled}
            value={value}
            defaultValue={defaultValue}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            className={cn(
              searchBarInputVariants({ size, radius }),
              showClear ? CLEAR_PR[size] : undefined,
              // Remove native clear button (WebKit) — we provide our own
              "[&::-webkit-search-cancel-button]:appearance-none",
              className,
            )}
            {...props}
          />

          {/* Trailing clear button */}
          {showClear ? (
            <button
              type="button"
              tabIndex={0}
              aria-label={clearLabel}
              onClick={handleClear}
              className={searchBarClearVariants({ size })}
            >
              <X aria-hidden="true" className={iconSize} />
            </button>
          ) : null}
        </div>
      </div>
    );
  },
);

SearchBar.displayName = "SearchBar";

export { SearchBar };
