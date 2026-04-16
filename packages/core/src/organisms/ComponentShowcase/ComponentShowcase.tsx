import {
  createContext,
  useContext,
  useId,
  type ButtonHTMLAttributes,
  type HTMLAttributes,
  type ReactNode,
} from "react";
import { useSignal } from "@preact/signals-react";
import { useSignals } from "@preact/signals-react/runtime";
import { cn } from "@/lib/cn";
import {
  componentShowcaseHeaderVariants,
  componentShowcaseItemsVariants,
  componentShowcaseItemVariants,
  componentShowcasePanelVariants,
  componentShowcaseRootVariants,
  componentShowcaseTabListVariants,
  componentShowcaseTabVariants,
  type ComponentShowcaseColumns,
  type ComponentShowcaseMaxWidth,
  type ComponentShowcasePadding,
  type ComponentShowcasePanelVariant,
} from "./ComponentShowcase.variants";

// ─── Context ──────────────────────────────────────────────────────────────────

interface ComponentShowcaseContextValue {
  activeTab: ReturnType<typeof useSignal<string>>;
  baseId: string;
}

const ComponentShowcaseContext =
  createContext<ComponentShowcaseContextValue | null>(null);

function useComponentShowcaseContext(
  component: string,
): ComponentShowcaseContextValue {
  const ctx = useContext(ComponentShowcaseContext);
  if (!ctx) {
    throw new Error(
      `<ComponentShowcase.${component}> must be rendered inside <ComponentShowcase.Root>.`,
    );
  }
  return ctx;
}

// ─── ID helpers ───────────────────────────────────────────────────────────────

const toTabId = (baseId: string, value: string) => `${baseId}-cs-tab-${value}`;
const toPanelId = (baseId: string, value: string) =>
  `${baseId}-cs-panel-${value}`;

// ─── Root ─────────────────────────────────────────────────────────────────────

export interface ComponentShowcaseRootProps extends HTMLAttributes<HTMLDivElement> {
  /** The default active tab value (uncontrolled). */
  defaultTab?: string;
  /** Visual padding of the section. @default "md" */
  padding?: ComponentShowcasePadding;
  /** Max-width of the container. @default "lg" */
  maxWidth?: ComponentShowcaseMaxWidth;
  /** Accessible label for the landmark region. */
  "aria-label"?: string;
  children: ReactNode;
}

function ComponentShowcaseRoot({
  defaultTab = "",
  padding = "md",
  maxWidth = "lg",
  className,
  children,
  "aria-label": ariaLabel = "Component showcase",
  ...props
}: ComponentShowcaseRootProps) {
  useSignals();
  const activeTab = useSignal(defaultTab);
  const baseId = useId();

  return (
    <ComponentShowcaseContext.Provider value={{ activeTab, baseId }}>
      <section
        aria-label={ariaLabel}
        className={cn(
          componentShowcaseRootVariants({ padding, maxWidth }),
          "mx-auto",
          className,
        )}
        {...props}
      >
        {children}
      </section>
    </ComponentShowcaseContext.Provider>
  );
}
ComponentShowcaseRoot.displayName = "ComponentShowcase.Root";

// ─── Header ──────────────────────────────────────────────────────────────────

export interface ComponentShowcaseHeaderProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

function ComponentShowcaseHeader({
  className,
  children,
  ...props
}: ComponentShowcaseHeaderProps) {
  return (
    <div
      className={cn(componentShowcaseHeaderVariants(), className)}
      {...props}
    >
      {children}
    </div>
  );
}
ComponentShowcaseHeader.displayName = "ComponentShowcase.Header";

// ─── TabList ─────────────────────────────────────────────────────────────────

export interface ComponentShowcaseTabListProps extends HTMLAttributes<HTMLDivElement> {
  /** Accessible label for the tablist. @default "Component categories" */
  "aria-label"?: string;
  children: ReactNode;
}

function ComponentShowcaseTabList({
  className,
  children,
  "aria-label": ariaLabel = "Component categories",
  ...props
}: ComponentShowcaseTabListProps) {
  return (
    <div
      role="tablist"
      aria-label={ariaLabel}
      className={cn(componentShowcaseTabListVariants(), className)}
      {...props}
    >
      {children}
    </div>
  );
}
ComponentShowcaseTabList.displayName = "ComponentShowcase.TabList";

// ─── Tab ─────────────────────────────────────────────────────────────────────

export interface ComponentShowcaseTabProps extends Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "onClick"
> {
  /** Unique value linking this tab to its panel. */
  value: string;
  children: ReactNode;
}

function ComponentShowcaseTab({
  value,
  className,
  children,
  ...props
}: ComponentShowcaseTabProps) {
  useSignals();
  const { activeTab, baseId } = useComponentShowcaseContext("Tab");
  const isActive = activeTab.value === value;

  return (
    <button
      type="button"
      role="tab"
      id={toTabId(baseId, value)}
      aria-controls={toPanelId(baseId, value)}
      aria-selected={isActive}
      tabIndex={isActive ? 0 : -1}
      onClick={() => {
        activeTab.value = value;
      }}
      className={cn(
        componentShowcaseTabVariants({ active: isActive }),
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
ComponentShowcaseTab.displayName = "ComponentShowcase.Tab";

// ─── Panel ───────────────────────────────────────────────────────────────────

export interface ComponentShowcasePanelProps extends HTMLAttributes<HTMLDivElement> {
  /** Must match the `value` of its corresponding `<ComponentShowcase.Tab>`. */
  value: string;
  /** Layout variant. @default "preview" */
  variant?: ComponentShowcasePanelVariant;
  children: ReactNode;
}

function ComponentShowcasePanel({
  value,
  variant = "preview",
  className,
  children,
  ...props
}: ComponentShowcasePanelProps) {
  useSignals();
  const { activeTab, baseId } = useComponentShowcaseContext("Panel");
  const isActive = activeTab.value === value;

  if (!isActive) return null;

  /* eslint-disable jsx-a11y/no-noninteractive-tabindex */
  // tabpanel with tabIndex=0 is required by the ARIA APG tabs pattern to ensure
  // the panel is reachable by keyboard when none of its children are focusable.
  return (
    <div
      role="tabpanel"
      id={toPanelId(baseId, value)}
      aria-labelledby={toTabId(baseId, value)}
      tabIndex={0}
      className={cn(componentShowcasePanelVariants({ variant }), className)}
      {...props}
    >
      {children}
    </div>
  );
  /* eslint-enable jsx-a11y/no-noninteractive-tabindex */
}
ComponentShowcasePanel.displayName = "ComponentShowcase.Panel";

// ─── Items (grid wrapper) ─────────────────────────────────────────────────────

export interface ComponentShowcaseItemsProps extends HTMLAttributes<HTMLDivElement> {
  /** Number of grid columns. @default 2 */
  columns?: ComponentShowcaseColumns;
  children: ReactNode;
}

function ComponentShowcaseItems({
  columns = 2,
  className,
  children,
  ...props
}: ComponentShowcaseItemsProps) {
  return (
    <div
      className={cn(componentShowcaseItemsVariants({ columns }), className)}
      {...props}
    >
      {children}
    </div>
  );
}
ComponentShowcaseItems.displayName = "ComponentShowcase.Items";

// ─── Item ─────────────────────────────────────────────────────────────────────

export interface ComponentShowcaseItemProps extends HTMLAttributes<HTMLDivElement> {
  /** Accessible label that describes this item in the context of the showcase. */
  label?: string;
  children: ReactNode;
}

function ComponentShowcaseItem({
  label,
  className,
  children,
  ...props
}: ComponentShowcaseItemProps) {
  return (
    <div
      aria-label={label}
      className={cn(componentShowcaseItemVariants(), className)}
      {...props}
    >
      {children}
    </div>
  );
}
ComponentShowcaseItem.displayName = "ComponentShowcase.Item";

// ─── Compound export ──────────────────────────────────────────────────────────

export const ComponentShowcase = {
  Root: ComponentShowcaseRoot,
  Header: ComponentShowcaseHeader,
  TabList: ComponentShowcaseTabList,
  Tab: ComponentShowcaseTab,
  Panel: ComponentShowcasePanel,
  Items: ComponentShowcaseItems,
  Item: ComponentShowcaseItem,
};
