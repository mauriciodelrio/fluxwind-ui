import {
  forwardRef,
  useId,
  useRef,
  useCallback,
  useEffect,
  type HTMLAttributes,
  type KeyboardEvent,
} from "react";
import { useSignal } from "@preact/signals-react";
import { useSignals } from "@preact/signals-react/runtime";
import { ChevronsUpDown, Check, Search, X } from "lucide-react";
import { cn } from "@/lib/cn";
import {
  comboboxTriggerVariants,
  comboboxSearchVariants,
  comboboxDropdownVariants,
  comboboxOptionVariants,
  type ComboboxSize,
  type ComboboxRadius,
} from "./Combobox.variants";

// ─── Size maps ────────────────────────────────────────────────────────────────

// Right offset for the clear button (sits just left of the ChevronsUpDown icon)
const CLEAR_BTN_RIGHT: Record<ComboboxSize, string> = {
  sm: "right-7", // px-3(0.75rem) + size-4(1rem) ≈ 1.75rem
  md: "right-9", // px-4(1rem) + gap + size-4(1rem) ≈ 2.25rem
  lg: "right-11", // px-5(1.25rem) + gap + size-5(1.25rem) ≈ 2.75rem
};

// Extra right padding on the trigger when the clear button is visible
const CLEAR_VISIBLE_PR: Record<ComboboxSize, string> = {
  sm: "pr-14",
  md: "pr-16",
  lg: "pr-20",
};

// ─── Option type ──────────────────────────────────────────────────────────────

export interface ComboboxOption {
  /** Unique identifier — used as value and React key. */
  value: string;
  /** Display label rendered in the trigger and option list. */
  label: string;
  /** Prevents selection when true. */
  disabled?: boolean;
}

// ─── Props ────────────────────────────────────────────────────────────────────

export interface ComboboxProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  "onChange"
> {
  /** Visible label above the combobox. */
  label: string;
  /** List of selectable options. */
  options: ComboboxOption[];
  /**
   * Controlled selected value.
   * When provided the component behaves as a controlled input.
   */
  value?: string;
  /**
   * Default selected value for uncontrolled usage.
   */
  defaultValue?: string;
  /** Fired when the selected value changes. */
  onChange?: (value: string) => void;
  /** Placeholder text shown in the trigger when nothing is selected. */
  placeholder?: string;
  /** Enables the search input inside the dropdown. @default true */
  searchable?: boolean;
  /** Placeholder for the search input. @default "Search…" */
  searchPlaceholder?: string;
  /**
   * Async mode: provide this callback to delegate filtering to the caller
   * (e.g. for server-side search). When omitted, options are filtered
   * client-side (case-insensitive label match).
   */
  onFilter?: (query: string) => void;
  /** Emtpy-state message shown when no options match the query. @default "No results found." */
  emptyLabel?: string;
  /** Disables the combobox. */
  disabled?: boolean;
  /** Error message — triggers invalid state. */
  error?: string;
  /** Helper text rendered below the combobox. */
  hint?: string;
  /** Size variant. @default "md" */
  size?: ComboboxSize;
  /** Border radius variant. @default "md" */
  radius?: ComboboxRadius;
}

// ─── Component ────────────────────────────────────────────────────────────────

const Combobox = forwardRef<HTMLDivElement, ComboboxProps>(
  (
    {
      className,
      label,
      options,
      value: controlledValue,
      defaultValue,
      onChange,
      placeholder = "Select an option…",
      searchable = true,
      searchPlaceholder = "Search…",
      onFilter,
      emptyLabel = "No results found.",
      disabled = false,
      error,
      hint,
      size = "md",
      radius = "md",
      id: externalId,
      ...props
    },
    ref,
  ) => {
    useSignals();
    const generatedId = useId();
    const id = externalId ?? generatedId;
    const labelId = `${id}-label`;
    const listboxId = `${id}-listbox`;
    const hintId = hint ? `${id}-hint` : undefined;
    const errorId = error ? `${id}-error` : undefined;
    const describedBy =
      [hintId, errorId].filter(Boolean).join(" ") || undefined;

    // ── State ─────────────────────────────────────────────────────────────────

    const isControlled = controlledValue !== undefined;
    const internalValue = useSignal<string>(defaultValue ?? "");
    const selectedValue = isControlled ? controlledValue : internalValue.value;

    const isOpen = useSignal(false);
    const query = useSignal("");
    const highlightedIndex = useSignal<number>(-1);

    // Primitive values for useEffect dependencies
    const isOpenValue = isOpen.value;
    const highlightedIndexValue = highlightedIndex.value;

    // ── Refs ──────────────────────────────────────────────────────────────────

    const containerRef = useRef<HTMLDivElement>(null);
    const triggerRef = useRef<HTMLButtonElement>(null);
    const searchRef = useRef<HTMLInputElement>(null);
    const listRef = useRef<HTMLUListElement>(null);

    // ── Derived ───────────────────────────────────────────────────────────────

    const selectedOption = options.find((o) => o.value === selectedValue);

    let filteredOptions: ComboboxOption[];
    if (onFilter !== undefined) {
      // Async mode: caller controls filtering; show all options as-is
      filteredOptions = options;
    } else if (query.value.trim() === "") {
      filteredOptions = options;
    } else {
      filteredOptions = options.filter((o) =>
        o.label.toLowerCase().includes(query.value.toLowerCase()),
      );
    }

    // ── Helpers ───────────────────────────────────────────────────────────────

    const open = useCallback(() => {
      isOpen.value = true;
      highlightedIndex.value = -1;
    }, [isOpen, highlightedIndex]);

    const close = useCallback(() => {
      isOpen.value = false;
      query.value = "";
      highlightedIndex.value = -1;
    }, [isOpen, query, highlightedIndex]);

    const selectOption = useCallback(
      (option: ComboboxOption) => {
        if (option.disabled) return;
        if (!isControlled) {
          internalValue.value = option.value;
        }
        onChange?.(option.value);
        close();
        triggerRef.current?.focus();
      },
      [isControlled, onChange, close, internalValue],
    );

    const clearSelection = useCallback(() => {
      if (!isControlled) {
        internalValue.value = "";
      }
      onChange?.("");
      triggerRef.current?.focus();
    }, [isControlled, onChange, internalValue]);

    // ── Search ────────────────────────────────────────────────────────────────

    const handleSearchChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        const q = e.target.value;
        query.value = q;
        highlightedIndex.value = -1;
        if (onFilter !== undefined) {
          onFilter(q);
        }
      },
      [onFilter, query, highlightedIndex],
    );

    // ── Keyboard navigation ───────────────────────────────────────────────────

    const navigableOptions = filteredOptions.filter((o) => !o.disabled);

    const handleTriggerKeyDown = useCallback(
      (e: KeyboardEvent<HTMLButtonElement>) => {
        if (e.key === "Enter" || e.key === " " || e.key === "ArrowDown") {
          e.preventDefault();
          open();
        } else if (e.key === "Escape") {
          close();
        }
      },
      [open, close],
    );

    const handleListKeyDown = useCallback(
      (e: KeyboardEvent<HTMLUListElement | HTMLInputElement>) => {
        if (e.key === "Escape") {
          close();
          triggerRef.current?.focus();
          return;
        }
        if (e.key === "ArrowDown") {
          e.preventDefault();
          highlightedIndex.value =
            highlightedIndex.value < navigableOptions.length - 1
              ? highlightedIndex.value + 1
              : 0;
        } else if (e.key === "ArrowUp") {
          e.preventDefault();
          highlightedIndex.value =
            highlightedIndex.value > 0
              ? highlightedIndex.value - 1
              : navigableOptions.length - 1;
        } else if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          if (
            highlightedIndex.value >= 0 &&
            highlightedIndex.value < navigableOptions.length
          ) {
            selectOption(navigableOptions[highlightedIndex.value]);
          }
        } else if (e.key === "Tab") {
          close();
        }
      },
      [close, navigableOptions, selectOption, highlightedIndex],
    );

    // ── Focus search on open ──────────────────────────────────────────────────

    useEffect(() => {
      if (isOpenValue && searchable) {
        // Small delay so DOM is painted
        const raf = requestAnimationFrame(() => {
          searchRef.current?.focus();
        });
        return () => {
          cancelAnimationFrame(raf);
        };
      }
      return undefined;
    }, [isOpenValue, searchable]);

    // ── Close on outside click ────────────────────────────────────────────────

    useEffect(() => {
      if (!isOpenValue) return undefined;

      const handlePointerDown = (e: PointerEvent) => {
        if (
          containerRef.current !== null &&
          !containerRef.current.contains(e.target as Node)
        ) {
          close();
        }
      };

      document.addEventListener("pointerdown", handlePointerDown);
      return () => {
        document.removeEventListener("pointerdown", handlePointerDown);
      };
    }, [isOpenValue, close]);

    // ── Scroll highlighted option into view ───────────────────────────────────

    useEffect(() => {
      if (highlightedIndexValue < 0 || listRef.current === null) return;
      const item = Array.from(
        listRef.current.querySelectorAll<HTMLLIElement>("[role='option']"),
      ).at(highlightedIndexValue);
      if (item !== undefined) {
        item.scrollIntoView({ block: "nearest" });
      }
    }, [highlightedIndexValue]);

    // ── Render ────────────────────────────────────────────────────────────────

    const triggerText = selectedOption?.label ?? (
      <span className="text-[var(--color-fw-muted)]">{placeholder}</span>
    );

    return (
      <div
        ref={(node) => {
          // Merge forwarded ref with internal containerRef
          containerRef.current = node;
          if (typeof ref === "function") {
            ref(node);
          } else if (ref !== null) {
            ref.current = node;
          }
        }}
        className={cn("relative flex flex-col gap-1.5 w-full", className)}
        {...props}
      >
        {/* Label */}
        <label
          id={labelId}
          htmlFor={id}
          className="text-sm font-medium text-[var(--color-fw-foreground)]"
        >
          {label}
        </label>

        {/* Trigger: wrapper holds the combobox button + sibling clear button */}
        <div className="relative w-full">
          <button
            ref={triggerRef}
            id={id}
            type="button"
            role="combobox"
            aria-haspopup="listbox"
            aria-expanded={isOpen.value}
            aria-controls={listboxId}
            aria-labelledby={labelId}
            aria-activedescendant={
              highlightedIndex.value >= 0 &&
              navigableOptions[highlightedIndex.value]
                ? `${id}-option-${navigableOptions[highlightedIndex.value].value}`
                : undefined
            }
            aria-invalid={error ? true : undefined}
            aria-describedby={describedBy}
            disabled={disabled}
            onClick={() => {
              if (isOpen.value) {
                close();
              } else {
                open();
              }
            }}
            onKeyDown={handleTriggerKeyDown}
            className={cn(
              comboboxTriggerVariants({ size, radius }),
              selectedOption !== undefined && !disabled
                ? CLEAR_VISIBLE_PR[size]
                : undefined,
            )}
          >
            <span className="min-w-0 flex-1 truncate text-left">
              {triggerText}
            </span>
            <ChevronsUpDown
              className="size-4 text-[var(--color-fw-muted)] shrink-0 ml-1"
              aria-hidden="true"
            />
          </button>

          {/* Clear button — sibling of trigger, not nested inside it */}
          {selectedOption !== undefined && !disabled ? (
            <button
              type="button"
              aria-label={`Clear ${label}`}
              tabIndex={-1}
              className={cn(
                "absolute inset-y-0 flex items-center px-1",
                "text-[var(--color-fw-muted)] hover:text-[var(--color-fw-foreground)]",
                "transition-colors duration-100 rounded",
                CLEAR_BTN_RIGHT[size],
              )}
              onClick={clearSelection}
            >
              <X className="size-3.5" aria-hidden="true" />
            </button>
          ) : null}
        </div>

        {/* Dropdown */}
        {isOpen.value ? (
          <div
            className={comboboxDropdownVariants({ radius })}
            role="presentation"
          >
            {/* Search input */}
            {searchable ? (
              <div className="relative flex items-center">
                <Search
                  className="absolute left-3 size-3.5 text-[var(--color-fw-muted)] pointer-events-none"
                  aria-hidden="true"
                />
                <input
                  ref={searchRef}
                  type="text"
                  role="searchbox"
                  aria-label={`Search ${label}`}
                  aria-controls={listboxId}
                  value={query.value}
                  onChange={handleSearchChange}
                  onKeyDown={handleListKeyDown}
                  placeholder={searchPlaceholder}
                  className={cn(comboboxSearchVariants(), "pl-8")}
                />
              </div>
            ) : null}

            {/* Options list */}
            <ul
              ref={listRef}
              id={listboxId}
              role="listbox"
              aria-label={label}
              aria-multiselectable={false}
              tabIndex={searchable ? -1 : 0}
              onKeyDown={searchable ? undefined : handleListKeyDown}
              className="max-h-56 overflow-y-auto py-1 focus-visible:outline-none"
            >
              {filteredOptions.length === 0 ? (
                <li
                  role="presentation"
                  className="px-3 py-2 text-sm text-[var(--color-fw-muted)]"
                >
                  {emptyLabel}
                </li>
              ) : (
                filteredOptions.map((option, idx) => {
                  const isSelected = option.value === selectedValue;
                  // highlightedIndex tracks navigableOptions, so find the
                  // index of this option within navigableOptions
                  const navIdx = navigableOptions.indexOf(option);
                  const isHighlighted =
                    navIdx >= 0 && navIdx === highlightedIndex.value;

                  return (
                    <li
                      key={option.value}
                      id={`${id}-option-${option.value}`}
                      role="option"
                      aria-selected={isSelected}
                      aria-disabled={option.disabled ? true : undefined}
                      data-index={idx}
                      className={comboboxOptionVariants({
                        highlighted: isHighlighted,
                      })}
                      onPointerDown={(e) => {
                        // Prevent search input blur from firing before click
                        e.preventDefault();
                      }}
                      onClick={() => {
                        selectOption(option);
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          selectOption(option);
                        }
                      }}
                      onPointerMove={() => {
                        if (!option.disabled) {
                          highlightedIndex.value = navIdx;
                        }
                      }}
                    >
                      <Check
                        className={cn(
                          "size-3.5 shrink-0",
                          isSelected
                            ? "text-[var(--color-fw-ring)]"
                            : "invisible",
                        )}
                        aria-hidden="true"
                      />
                      {option.label}
                    </li>
                  );
                })
              )}
            </ul>
          </div>
        ) : null}

        {/* Hint / Error */}
        {hint !== undefined && error === undefined ? (
          <p id={hintId} className="text-xs text-[var(--color-fw-muted)]">
            {hint}
          </p>
        ) : null}
        {error !== undefined ? (
          <p
            id={errorId}
            role="alert"
            className="text-xs text-[var(--color-fw-destructive)]"
          >
            {error}
          </p>
        ) : null}
      </div>
    );
  },
);

Combobox.displayName = "Combobox";

export { Combobox };
