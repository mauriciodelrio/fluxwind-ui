import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState, type ComponentPropsWithoutRef } from "react";
import { SearchBar } from "./SearchBar";

// ─── Meta ─────────────────────────────────────────────────────────────────────

const meta: Meta<typeof SearchBar> = {
  title: "Molecules/SearchBar",
  component: SearchBar,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "SearchBar composes a search input with a leading icon, optional clear button, and keyboard shortcut support.\n\n" +
          "## Design decisions\n\n" +
          "| Decision | Rationale |\n" +
          "|---|---|\n" +
          '| `type="search"` + `role="searchbox"` | Native semantics + explicit ARIA for assistive tech |\n' +
          "| Visually-hidden `<label>` | Always present — placeholder alone fails WCAG 1.3.1 |\n" +
          "| `onSearch(value)` on Enter | Decoupled from routing — caller decides what to do with the query |\n" +
          "| `onClear` gates clear button | Caller owns state — enables debounce resets, URL sync, etc. |\n" +
          "| WebKit cancel button suppressed | We render a consistent cross-browser clear button instead |\n\n" +
          "## Controlled vs uncontrolled\n\n" +
          "For most use cases, use **controlled** mode (`value` + `onChange` + `onClear`).\n" +
          "This gives you full control over debounce, URL state, and analytics.",
      },
    },
  },
  argTypes: {
    label: {
      description: "**Required.** Visually hidden label for screen readers.",
      control: "text",
    },
    size: {
      description: "Size variant.",
      control: "select",
      options: ["sm", "md", "lg"],
    },
    radius: {
      description: "Border radius variant.",
      control: "select",
      options: ["none", "sm", "md", "lg", "full"],
    },
    placeholder: {
      description: "Input placeholder text.",
      control: "text",
    },
    disabled: {
      description: "Disables the input and clear button.",
      control: "boolean",
    },
    onSearch: {
      description: "Fired on Enter. Receives the current input value.",
      control: false,
    },
    onClear: {
      description:
        "When provided, shows the clear (×) button on non-empty input.",
      control: false,
    },
  },
};

export default meta;
type Story = StoryObj<typeof SearchBar>;

// ─── Static (uncontrolled) ────────────────────────────────────────────────────

export const Default: Story = {
  args: {
    label: "Search products",
    placeholder: "Search…",
  },
};

export const WithPlaceholder: Story = {
  args: {
    label: "Search docs",
    placeholder: "Search documentation…",
    size: "md",
    radius: "md",
  },
};

export const Disabled: Story = {
  args: {
    label: "Search",
    placeholder: "Search unavailable",
    disabled: true,
  },
};

// ─── Sizes ────────────────────────────────────────────────────────────────────

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4 max-w-sm">
      <SearchBar label="Small search" size="sm" placeholder="Small (sm)…" />
      <SearchBar label="Medium search" size="md" placeholder="Medium (md)…" />
      <SearchBar label="Large search" size="lg" placeholder="Large (lg)…" />
    </div>
  ),
};

// ─── Radius ───────────────────────────────────────────────────────────────────

export const Rounded: Story = {
  args: {
    label: "Pill search",
    placeholder: "Search…",
    radius: "full",
  },
};

// ─── Controlled with clear ────────────────────────────────────────────────────

function ControlledSearchBar(args: ComponentPropsWithoutRef<typeof SearchBar>) {
  const [value, setValue] = useState("");
  const [lastSearch, setLastSearch] = useState<string | null>(null);

  return (
    <div className="flex flex-col gap-3 max-w-sm">
      <SearchBar
        {...args}
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
        }}
        onClear={() => {
          setValue("");
          setLastSearch(null);
        }}
        onSearch={(q) => {
          setLastSearch(q);
        }}
      />
      {lastSearch !== null ? (
        <p className="text-sm text-[var(--color-fw-muted)]">
          Last search:{" "}
          <span className="font-medium text-[var(--color-fw-foreground)]">
            {lastSearch}
          </span>
        </p>
      ) : null}
    </div>
  );
}

export const WithClearButton: Story = {
  render: (args) => <ControlledSearchBar {...args} />,
  args: {
    label: "Search products",
    placeholder: "Type and press Enter…",
  },
};

// ─── All sizes with clear ─────────────────────────────────────────────────────

function ClearableSearch({ size }: { size: "sm" | "md" | "lg" }) {
  const [value, setValue] = useState("hello world");
  return (
    <SearchBar
      label={`Search ${size}`}
      size={size}
      value={value}
      onChange={(e) => {
        setValue(e.target.value);
      }}
      onClear={() => {
        setValue("");
      }}
    />
  );
}

export const AllSizesWithClear: Story = {
  render: () => (
    <div className="flex flex-col gap-4 max-w-sm">
      <ClearableSearch size="sm" />
      <ClearableSearch size="md" />
      <ClearableSearch size="lg" />
    </div>
  ),
};
