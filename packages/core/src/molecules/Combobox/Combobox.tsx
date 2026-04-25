import {
  forwardRef,
  useId,
  useRef,
  useCallback,
  useEffect,
  type HTMLAttributes,
  type KeyboardEvent,
  type MouseEvent,
} from "react";
import { useSignal } from "@preact/signals-react";
import { useSignals } from "@preact/signals-react/runtime";
import { ChevronsUpDown, Check, Search, X, Plus } from "lucide-react";
import { cn } from "@/lib/cn";
import { Chip } from "@/atoms/Chip";
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
  sm: "right-7",
  md: "right-9",
  lg: "right-11",
};

// Extra right padding on the trigger when the clear button is visible
const CLEAR_VISIBLE_PR: Record<ComboboxSize, string> = {
  sm: "pr-14",
  md: "pr-16",
  lg: "pr-20",
};

// Min-height for multi-select trigger when chips are present
const MULTI_MIN_H: Record<ComboboxSize, string> = {
  sm: "min-h-8",
  md: "min-h-10",
  lg: "min-h-12",
};

// Chip size inside the trigger
const CHIP_SIZE_MAP: Record<ComboboxSize, "sm" | "md" | "lg"> = {
  sm: "sm",
  md: "sm",
  lg: "md",
};

// ─── Option type ──────────────────────────────────────────────────────────────

export interface ComboboxOption {
  /** Unique identifier — used as value and React key. */
  value: string;
  /** Display label rendered in the trigger and option list. */
  label: string;
  /** Prevents selection when true. */
  disabled?: boolean;
  /**
   * Optional group name. Options sharing the same group are rendered under a
   * group header in the listbox. Options without a group appear first.
   */
  group?: string;
}

// ─── Props — base (shared between single and multi) ──────────────────────────

interface ComboboxBaseProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  "onChange"
> {
  /** Visible label above the combobox. */
  label: string;
  /** List of selectable options. */
  options: ComboboxOption[];
  /** Placeholder text shown in the trigger when nothing is selected. */
  placeholder?: string;
  /** Enables the search input inside the dropdown. @default true */
  searchable?: boolean;
  /** Placeholder for the search input. @default "Search…" */
  searchPlaceholder?: string;
  /**
   * Async mode: delegate filtering to the caller (e.g. server-side search).
   * When omitted, options are filtered client-side.
   */
  onFilter?: (query: string) => void;
  /** Empty-state message shown when no options match the query. @default "No results found." */
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
  /**
   * Creatable mode: shows a "Create '{query}'" option when no results match.
   * @default false
   */
  creatable?: boolean;
  /**
   * Fired when the user selects the "Create" option.
   * The caller is responsible for adding the new option to `options`.
   */
  onCreateOption?: (query: string) => void;
}

// ─── Props — single-select ────────────────────────────────────────────────────

export interface ComboboxSingleProps extends ComboboxBaseProps {
  multiple?: false;
  /** Controlled selected value. */
  value?: string;
  /** Default value for uncontrolled usage. */
  defaultValue?: string;
  /** Fired when the selected value changes. */
  onChange?: (value: string) => void;
}

// ─── Props — multi-select ─────────────────────────────────────────────────────

export interface ComboboxMultiProps extends ComboboxBaseProps {
  /** Enables multi-select mode. Selected values are rendered as Chips. */
  multiple: true;
  /** Controlled selected values. */
  value?: string[];
  /** Default values for uncontrolled usage. */
  defaultValue?: string[];
  /** Fired when the selection array changes. */
  onChange?: (value: string[]) => void;
  /**
   * Maximum number of selectable options. When reached, unselected options
   * become `aria-disabled` and cannot be selected.
   */
  maxSelections?: number;
}

export type ComboboxProps = ComboboxSingleProps | ComboboxMultiProps;

// ─── Component ────────────────────────────────────────────────────────────────

const Combobox = forwardRef<HTMLDivElement, ComboboxProps>((props, ref) => {
  useSignals();

  // ── Mode flag ──────────────────────────────────────────────────────────────

  const isMultiple = props.multiple === true;

  // ── Common props ──────────────────────────────────────────────────────────

  const {
    className,
    label,
    options,
    placeholder: placeholderProp,
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
    creatable = false,
    onCreateOption,
  } = props;

  const placeholder =
    placeholderProp ?? (isMultiple ? "Select options…" : "Select an option…");

  // ── Mode-specific props (narrowed) ────────────────────────────────────────

  const controlledSingleValue = !isMultiple ? props.value : undefined;
  const singleDefaultValue = !isMultiple ? props.defaultValue : undefined;
  const onChangeSingle = !isMultiple ? props.onChange : undefined;

  const controlledMultiValue = isMultiple ? props.value : undefined;
  const multiDefaultValue = isMultiple ? props.defaultValue : undefined;
  const onChangeMulti = isMultiple ? props.onChange : undefined;
  const maxSelections = isMultiple ? props.maxSelections : undefined;

  // ── HTML div props (strip all Combobox-specific keys) ─────────────────────

  const {
    multiple: _multiple,
    value: _value,
    defaultValue: _defaultValue,
    onChange: _onChange,
    maxSelections: _maxSelections,
    label: _label,
    options: _options,
    placeholder: _placeholder,
    searchable: _searchable,
    searchPlaceholder: _sp,
    onFilter: _onFilter,
    emptyLabel: _emptyLabel,
    disabled: _disabled,
    error: _error,
    hint: _hint,
    size: _size,
    radius: _radius,
    id: _id,
    creatable: _creatable,
    onCreateOption: _onCreateOption,
    className: _className,
    ...divProps
  } = props as ComboboxMultiProps &
    Record<string, unknown> &
    HTMLAttributes<HTMLDivElement>;

  // ── IDs ────────────────────────────────────────────────────────────────────

  const generatedId = useId();
  const id = externalId ?? generatedId;
  const labelId = `${id}-label`;
  const listboxId = `${id}-listbox`;
  const hintId =
    hint !== undefined && error === undefined ? `${id}-hint` : undefined;
  const errorId = error !== undefined ? `${id}-error` : undefined;
  const describedBy = [hintId, errorId].filter(Boolean).join(" ") || undefined;

  // ── State ─────────────────────────────────────────────────────────────────

  // Single-select internal state
  const isSingleControlled = controlledSingleValue !== undefined;
  const internalSingleValue = useSignal<string>(singleDefaultValue ?? "");
  const selectedSingleValue = isSingleControlled
    ? controlledSingleValue
    : internalSingleValue.value;

  // Multi-select internal state
  const isMultiControlled = controlledMultiValue !== undefined;
  const internalMultiValue = useSignal<string[]>(multiDefaultValue ?? []);
  const selectedMultiValues = isMultiControlled
    ? controlledMultiValue
    : internalMultiValue.value;

  // Dropdown state
  const isOpen = useSignal<boolean>(false);
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

  // ── Derived — filtered options ────────────────────────────────────────────

  let filteredOptions: ComboboxOption[];
  if (onFilter !== undefined) {
    filteredOptions = options;
  } else if (query.value.trim() === "") {
    filteredOptions = options;
  } else {
    filteredOptions = options.filter((o) =>
      o.label.toLowerCase().includes(query.value.toLowerCase()),
    );
  }

  // ── Derived — grouped sections ────────────────────────────────────────────

  const hasGroups = filteredOptions.some((o) => o.group !== undefined);

  interface GroupSection {
    title?: string;
    items: ComboboxOption[];
  }
  let groupedSections: GroupSection[];

  if (!hasGroups) {
    groupedSections = [{ items: filteredOptions }];
  } else {
    const ungrouped = filteredOptions.filter((o) => !o.group);
    const groupMap = new Map<string, ComboboxOption[]>();
    for (const opt of filteredOptions) {
      if (!opt.group) continue;
      if (!groupMap.has(opt.group)) groupMap.set(opt.group, []);
      groupMap.get(opt.group)?.push(opt);
    }
    groupedSections = [
      ...(ungrouped.length > 0 ? [{ items: ungrouped }] : []),
      ...Array.from(groupMap.entries()).map(([title, items]) => ({
        title,
        items,
      })),
    ];
  }

  // ── Derived — creatable option ────────────────────────────────────────────

  const createQuery =
    creatable && query.value.trim() !== "" ? query.value.trim() : null;

  // ── Derived — navigable options (for keyboard nav) ────────────────────────

  const navigableOptions = filteredOptions.filter((o) => {
    if (o.disabled) return false;
    // In multi mode, max-reached options are not navigable (unless already selected)
    if (
      isMultiple &&
      maxSelections !== undefined &&
      selectedMultiValues.length >= maxSelections &&
      !selectedMultiValues.includes(o.value)
    )
      return false;
    return true;
  });

  // The create option is always last in keyboard nav when present
  const totalNavigable =
    navigableOptions.length + (createQuery !== null ? 1 : 0);

  // ── Derived — single selected option ─────────────────────────────────────

  const selectedSingleOption = !isMultiple
    ? options.find((o) => o.value === selectedSingleValue)
    : undefined;

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

  const removeValue = useCallback(
    (valueToRemove: string) => {
      const current = isMultiControlled
        ? controlledMultiValue
        : internalMultiValue.value;
      const next = current.filter((v) => v !== valueToRemove);
      if (!isMultiControlled) internalMultiValue.value = next;
      onChangeMulti?.(next);
    },
    [
      isMultiControlled,
      controlledMultiValue,
      internalMultiValue,
      onChangeMulti,
    ],
  );

  const selectOption = useCallback(
    (option: ComboboxOption) => {
      if (option.disabled) return;

      if (isMultiple) {
        const current = isMultiControlled
          ? controlledMultiValue
          : internalMultiValue.value;
        const isSelected = current.includes(option.value);

        // Block adding when maxSelections reached
        if (
          !isSelected &&
          maxSelections !== undefined &&
          current.length >= maxSelections
        )
          return;

        const next = isSelected
          ? current.filter((v) => v !== option.value)
          : [...current, option.value];

        if (!isMultiControlled) internalMultiValue.value = next;
        onChangeMulti?.(next);
        // Stay open; clear search query
        query.value = "";
        highlightedIndex.value = -1;
      } else {
        if (!isSingleControlled) internalSingleValue.value = option.value;
        onChangeSingle?.(option.value);
        close();
        triggerRef.current?.focus();
      }
    },
    [
      isMultiple,
      isMultiControlled,
      controlledMultiValue,
      internalMultiValue,
      maxSelections,
      onChangeMulti,
      query,
      highlightedIndex,
      isSingleControlled,
      internalSingleValue,
      onChangeSingle,
      close,
    ],
  );

  const handleCreate = useCallback(() => {
    if (!createQuery) return;
    onCreateOption?.(createQuery);
    close();
    triggerRef.current?.focus();
  }, [createQuery, onCreateOption, close]);

  const clearSelection = useCallback(() => {
    if (isMultiple) {
      if (!isMultiControlled) internalMultiValue.value = [];
      onChangeMulti?.([]);
    } else {
      if (!isSingleControlled) internalSingleValue.value = "";
      onChangeSingle?.("");
    }
    triggerRef.current?.focus();
  }, [
    isMultiple,
    isMultiControlled,
    internalMultiValue,
    onChangeMulti,
    isSingleControlled,
    internalSingleValue,
    onChangeSingle,
  ]);

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
      // Backspace in empty search removes last chip in multi mode
      if (
        e.key === "Backspace" &&
        query.value === "" &&
        isMultiple &&
        searchable
      ) {
        e.preventDefault();
        const current = isMultiControlled
          ? controlledMultiValue
          : internalMultiValue.value;
        const last = current.at(-1);
        if (last !== undefined) removeValue(last);
        return;
      }

      if (e.key === "Escape") {
        close();
        triggerRef.current?.focus();
        return;
      }
      if (e.key === "ArrowDown") {
        e.preventDefault();
        highlightedIndex.value =
          highlightedIndex.value < totalNavigable - 1
            ? highlightedIndex.value + 1
            : 0;
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        highlightedIndex.value =
          highlightedIndex.value > 0
            ? highlightedIndex.value - 1
            : totalNavigable - 1;
      } else if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        const idx = highlightedIndex.value;
        if (idx >= 0 && idx < navigableOptions.length) {
          selectOption(navigableOptions[idx]);
        } else if (idx === navigableOptions.length && createQuery !== null) {
          // Last slot = create option
          handleCreate();
        }
      } else if (e.key === "Tab") {
        close();
      }
    },
    [
      query,
      isMultiple,
      searchable,
      isMultiControlled,
      controlledMultiValue,
      internalMultiValue,
      removeValue,
      close,
      highlightedIndex,
      totalNavigable,
      navigableOptions,
      selectOption,
      createQuery,
      handleCreate,
    ],
  );

  // ── Focus search on open ──────────────────────────────────────────────────

  useEffect(() => {
    if (isOpenValue && searchable) {
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

  // ── Scroll highlighted option into view ──────────────────────────────────

  useEffect(() => {
    if (highlightedIndexValue < 0 || listRef.current === null) return;
    const item = Array.from(
      listRef.current.querySelectorAll<HTMLLIElement>("[role='option']"),
    ).at(highlightedIndexValue);
    if (item !== undefined) {
      item.scrollIntoView({ block: "nearest" });
    }
  }, [highlightedIndexValue]);

  // ── Derived — has selections (for clear button) ───────────────────────────

  const hasSelections = isMultiple
    ? selectedMultiValues.length > 0
    : selectedSingleOption !== undefined;

  // ── Render ────────────────────────────────────────────────────────────────

  const singleTriggerText = selectedSingleOption?.label ?? (
    <span className="text-[var(--color-fw-muted)]">{placeholder}</span>
  );

  // aria-label for multi trigger announces selection count to screen readers
  const triggerAriaLabel =
    isMultiple && selectedMultiValues.length > 0
      ? `${label}, ${String(selectedMultiValues.length)} item${selectedMultiValues.length !== 1 ? "s" : ""} selected`
      : undefined;

  return (
    <div
      ref={(node) => {
        containerRef.current = node;
        if (typeof ref === "function") {
          ref(node);
        } else if (ref !== null) {
          ref.current = node;
        }
      }}
      className={cn("relative flex flex-col gap-1.5 w-full", className)}
      {...(divProps as HTMLAttributes<HTMLDivElement>)}
    >
      {/* Label */}
      <label
        id={labelId}
        htmlFor={id}
        className="text-sm font-medium text-[var(--color-fw-foreground)]"
      >
        {label}
      </label>

      {/* Trigger wrapper: holds the combobox button + sibling clear button */}
      <div className="relative w-full">
        <button
          ref={triggerRef}
          id={id}
          type="button"
          role="combobox"
          aria-haspopup="listbox"
          aria-expanded={isOpen.value}
          aria-controls={listboxId}
          aria-labelledby={triggerAriaLabel === undefined ? labelId : undefined}
          aria-label={triggerAriaLabel}
          aria-activedescendant={
            highlightedIndex.value >= 0 &&
            highlightedIndex.value < navigableOptions.length
              ? `${id}-option-${navigableOptions[highlightedIndex.value].value}`
              : undefined
          }
          aria-invalid={error !== undefined ? true : undefined}
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
            // Multi with chips: allow trigger to grow vertically
            isMultiple && selectedMultiValues.length > 0
              ? cn("h-auto flex-wrap items-center py-1.5", MULTI_MIN_H[size])
              : undefined,
            // Room for the clear button when there are selections
            hasSelections && !disabled ? CLEAR_VISIBLE_PR[size] : undefined,
          )}
        >
          {!isMultiple && (
            <span className="min-w-0 flex-1 truncate text-left">
              {singleTriggerText}
            </span>
          )}
          {isMultiple && selectedMultiValues.length === 0 ? (
            <span className="min-w-0 flex-1 truncate text-left text-[var(--color-fw-muted)]">
              {placeholder}
            </span>
          ) : null}
          {isMultiple && selectedMultiValues.length > 0 ? (
            <div className="flex flex-wrap gap-1 flex-1 min-w-0">
              {selectedMultiValues.map((v) => {
                const opt = options.find((o) => o.value === v);
                if (opt === undefined) return null;
                return (
                  <Chip
                    key={v}
                    label={opt.label}
                    size={CHIP_SIZE_MAP[size]}
                    onDismiss={(e: MouseEvent<HTMLButtonElement>) => {
                      e.stopPropagation();
                      removeValue(v);
                    }}
                  />
                );
              })}
            </div>
          ) : null}
          <ChevronsUpDown
            className="size-4 text-[var(--color-fw-muted)] shrink-0 ml-1"
            aria-hidden="true"
          />
        </button>

        {/* Clear button — sibling of trigger, not nested inside it */}
        {hasSelections && !disabled ? (
          <button
            type="button"
            aria-label={isMultiple ? `Clear all ${label}` : `Clear ${label}`}
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
            aria-multiselectable={isMultiple}
            tabIndex={searchable ? -1 : 0}
            onKeyDown={searchable ? undefined : handleListKeyDown}
            className="max-h-56 overflow-y-auto py-1 focus-visible:outline-none"
          >
            {filteredOptions.length === 0 && createQuery === null ? (
              <li
                role="presentation"
                className="px-3 py-2 text-sm text-[var(--color-fw-muted)]"
              >
                {emptyLabel}
              </li>
            ) : (
              <>
                {groupedSections.map((section, sectionIdx) => (
                  // biome-ignore lint/suspicious/noArrayIndexKey: sections are derived from options; order is stable within a render
                  <li
                    key={section.title ?? `__ungrouped_${String(sectionIdx)}`}
                    role="presentation"
                  >
                    {section.title !== undefined ? (
                      <div
                        role="presentation"
                        className="px-3 pt-2 pb-1 text-xs font-semibold uppercase tracking-wide text-[var(--color-fw-muted)]"
                      >
                        {section.title}
                      </div>
                    ) : null}
                    <ul role="presentation">
                      {section.items.map((option) => {
                        const isSelected = isMultiple
                          ? selectedMultiValues.includes(option.value)
                          : option.value === selectedSingleValue;

                        const isMaxReached =
                          isMultiple &&
                          maxSelections !== undefined &&
                          selectedMultiValues.length >= maxSelections &&
                          !selectedMultiValues.includes(option.value);

                        const isDisabled =
                          option.disabled === true || isMaxReached;

                        const navIdx = navigableOptions.indexOf(option);
                        const isHighlighted =
                          navIdx >= 0 && navIdx === highlightedIndex.value;

                        return (
                          <li
                            key={option.value}
                            id={`${id}-option-${option.value}`}
                            role="option"
                            aria-selected={isSelected}
                            aria-disabled={isDisabled ? true : undefined}
                            className={comboboxOptionVariants({
                              highlighted: isHighlighted,
                            })}
                            onPointerDown={(e) => {
                              e.preventDefault();
                            }}
                            onClick={() => {
                              if (!isDisabled) selectOption(option);
                            }}
                            onKeyDown={(e) => {
                              if (
                                (e.key === "Enter" || e.key === " ") &&
                                !isDisabled
                              ) {
                                e.preventDefault();
                                selectOption(option);
                              }
                            }}
                            onPointerMove={() => {
                              if (!isDisabled) highlightedIndex.value = navIdx;
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
                      })}
                    </ul>
                  </li>
                ))}

                {/* Creatable option */}
                {createQuery !== null ? (
                  <li
                    role="option"
                    aria-selected={false}
                    className={comboboxOptionVariants({
                      highlighted:
                        highlightedIndex.value === navigableOptions.length,
                    })}
                    onPointerDown={(e) => {
                      e.preventDefault();
                    }}
                    onClick={handleCreate}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        handleCreate();
                      }
                    }}
                    onPointerMove={() => {
                      highlightedIndex.value = navigableOptions.length;
                    }}
                  >
                    <Plus
                      className="size-3.5 shrink-0 text-[var(--color-fw-ring)]"
                      aria-hidden="true"
                    />
                    Create &ldquo;{createQuery}&rdquo;
                  </li>
                ) : null}
              </>
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
});

Combobox.displayName = "Combobox";

export { Combobox };
