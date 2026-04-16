import {
  createContext,
  forwardRef,
  useCallback,
  useContext,
  useId,
  type ButtonHTMLAttributes,
  type HTMLAttributes,
  type KeyboardEvent,
  type ReactNode,
} from "react";
import { useSignal } from "@preact/signals-react";
import { useSignals } from "@preact/signals-react/runtime";
import { cn } from "@/lib/cn";
import {
  tabsListVariants,
  tabsPanelVariants,
  tabsTriggerVariants,
  type TabsVariant,
  type TabsSize,
} from "./Tabs.variants";

// ─── Context ──────────────────────────────────────────────────────────────────

interface TabsContextValue {
  activeValue: string;
  setActiveValue: (value: string) => void;
  variant: TabsVariant;
  size: TabsSize;
  baseId: string;
}

const TabsContext = createContext<TabsContextValue | null>(null);

function useTabsContext(component: string): TabsContextValue {
  const ctx = useContext(TabsContext);
  if (!ctx) {
    throw new Error(
      `<Tabs.${component}> must be rendered inside a <Tabs> root.`,
    );
  }
  return ctx;
}

// ─── ID helpers ───────────────────────────────────────────────────────────────

const toTabId = (baseId: string, value: string) => `${baseId}-tab-${value}`;
const toPanelId = (baseId: string, value: string) => `${baseId}-panel-${value}`;

// ─── Tabs (root) ──────────────────────────────────────────────────────────────

export interface TabsProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  "onChange"
> {
  /**
   * Controlled active tab value. Pair with `onChange`.
   */
  value?: string;
  /**
   * Default active tab value for uncontrolled mode.
   * If omitted the first tab should be activated manually or via `value`.
   */
  defaultValue?: string;
  /** Called when the active tab changes. */
  onChange?: (value: string) => void;
  /** Visual style of the tab list. @default "line" */
  variant?: TabsVariant;
  /** Size of the tab triggers. @default "md" */
  size?: TabsSize;
  children: ReactNode;
}

const TabsRoot = ({
  value: controlledValue,
  defaultValue = "",
  onChange,
  variant = "line",
  size = "md",
  className,
  children,
  ...props
}: TabsProps) => {
  useSignals();
  const internalValue = useSignal(defaultValue);
  const isControlled = controlledValue !== undefined;
  const activeValue = isControlled ? controlledValue : internalValue.value;
  const baseId = useId();

  const setActiveValue = useCallback(
    (val: string) => {
      if (!isControlled) internalValue.value = val;
      onChange?.(val);
    },
    [isControlled, onChange, internalValue],
  );

  return (
    <TabsContext.Provider
      value={{ activeValue, setActiveValue, variant, size, baseId }}
    >
      <div className={cn("w-full", className)} {...props}>
        {children}
      </div>
    </TabsContext.Provider>
  );
};

// ─── Tabs.List ────────────────────────────────────────────────────────────────

export interface TabsListProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

const TabsList = forwardRef<HTMLDivElement, TabsListProps>(
  ({ className, children, ...props }, ref) => {
    const { variant } = useTabsContext("List");

    return (
      <div
        ref={ref}
        role="tablist"
        className={cn(tabsListVariants({ variant }), className)}
        {...props}
      >
        {children}
      </div>
    );
  },
);

TabsList.displayName = "Tabs.List";

// ─── Tabs.Trigger ─────────────────────────────────────────────────────────────

export interface TabsTriggerProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Must match the `value` of the corresponding `<Tabs.Panel>`. */
  value: string;
  children: ReactNode;
}

const TabsTrigger = forwardRef<HTMLButtonElement, TabsTriggerProps>(
  (
    { value, disabled, className, children, onClick, onKeyDown, ...props },
    ref,
  ) => {
    const { activeValue, setActiveValue, variant, size, baseId } =
      useTabsContext("Trigger");

    const isActive = activeValue === value;

    const handleClick = useCallback(
      (e: React.MouseEvent<HTMLButtonElement>) => {
        if (disabled) return;
        setActiveValue(value);
        onClick?.(e);
      },
      [disabled, setActiveValue, value, onClick],
    );

    const handleKeyDown = useCallback(
      (e: KeyboardEvent<HTMLButtonElement>) => {
        onKeyDown?.(e);

        const list = e.currentTarget.closest('[role="tablist"]');
        if (!list) return;

        const tabs = Array.from(
          list.querySelectorAll<HTMLButtonElement>(
            '[role="tab"]:not([aria-disabled="true"])',
          ),
        );
        if (tabs.length === 0) return;

        const currentIndex = tabs.indexOf(e.currentTarget);
        if (currentIndex === -1) return;

        let nextIndex: number | null = null;

        switch (e.key) {
          case "ArrowLeft":
            e.preventDefault();
            nextIndex = currentIndex === 0 ? tabs.length - 1 : currentIndex - 1;
            break;
          case "ArrowRight":
            e.preventDefault();
            nextIndex = currentIndex === tabs.length - 1 ? 0 : currentIndex + 1;
            break;
          case "Home":
            e.preventDefault();
            nextIndex = 0;
            break;
          case "End":
            e.preventDefault();
            nextIndex = tabs.length - 1;
            break;
          default:
            return;
        }

        // nextIndex is always within 0..tabs.length-1 per the switch above;
        // using .at() which returns T|undefined makes the null-check below valid.
        const nextTab = tabs.at(nextIndex);
        if (!nextTab) return;

        nextTab.focus();
        const nextValue = nextTab.dataset.tabsValue;
        if (nextValue !== undefined) setActiveValue(nextValue);
      },
      [onKeyDown, setActiveValue],
    );

    return (
      <button
        ref={ref}
        id={toTabId(baseId, value)}
        role="tab"
        type="button"
        aria-selected={isActive}
        aria-controls={toPanelId(baseId, value)}
        aria-disabled={disabled ? "true" : undefined}
        data-state={isActive ? "active" : "inactive"}
        data-tabs-value={value}
        tabIndex={isActive ? 0 : -1}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        className={cn(tabsTriggerVariants({ variant, size }), className)}
        {...props}
      >
        {children}
      </button>
    );
  },
);

TabsTrigger.displayName = "Tabs.Trigger";

// ─── Tabs.Panel ───────────────────────────────────────────────────────────────

export interface TabsPanelProps extends HTMLAttributes<HTMLDivElement> {
  /** Must match the `value` of the corresponding `<Tabs.Trigger>`. */
  value: string;
  children: ReactNode;
}

const TabsPanel = forwardRef<HTMLDivElement, TabsPanelProps>(
  ({ value, className, children, ...props }, ref) => {
    const { activeValue, baseId, variant } = useTabsContext("Panel");
    const isActive = activeValue === value;

    // jsx-a11y/no-noninteractive-tabindex: tabIndex={0} on a tabpanel is
    // explicitly required by WAI-ARIA Authoring Practices so keyboard users
    // can Tab from a trigger into the panel content.
    /* eslint-disable jsx-a11y/no-noninteractive-tabindex */
    return (
      <div
        ref={ref}
        id={toPanelId(baseId, value)}
        role="tabpanel"
        aria-labelledby={toTabId(baseId, value)}
        tabIndex={0}
        hidden={!isActive}
        className={cn(tabsPanelVariants({ variant }), className)}
        {...props}
      >
        {children}
      </div>
    );
    /* eslint-enable jsx-a11y/no-noninteractive-tabindex */
  },
);

TabsPanel.displayName = "Tabs.Panel";

// ─── Compound export ──────────────────────────────────────────────────────────

export const Tabs = Object.assign(TabsRoot, {
  List: TabsList,
  Trigger: TabsTrigger,
  Panel: TabsPanel,
});
