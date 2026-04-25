import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState, type ComponentPropsWithoutRef } from "react";
import { expect } from "storybook/test";
import { userEvent, within } from "storybook/test";
import { Combobox } from "./Combobox";
import type { ComboboxOption } from "./Combobox";

// ─── Shared fixtures ──────────────────────────────────────────────────────────

const FRAMEWORKS: ComboboxOption[] = [
  { value: "react", label: "React" },
  { value: "vue", label: "Vue" },
  { value: "svelte", label: "Svelte" },
  { value: "angular", label: "Angular" },
  { value: "solid", label: "Solid" },
  { value: "qwik", label: "Qwik" },
];

const COUNTRIES: ComboboxOption[] = [
  { value: "ar", label: "Argentina" },
  { value: "br", label: "Brazil" },
  { value: "cl", label: "Chile" },
  { value: "co", label: "Colombia" },
  { value: "mx", label: "Mexico" },
  { value: "pe", label: "Peru" },
  { value: "uy", label: "Uruguay" },
  { value: "us", label: "United States" },
  { value: "gb", label: "United Kingdom" },
  { value: "de", label: "Germany" },
  { value: "fr", label: "France" },
  { value: "jp", label: "Japan" },
];

const WITH_DISABLED: ComboboxOption[] = [
  { value: "free", label: "Free plan" },
  { value: "pro", label: "Pro plan" },
  { value: "enterprise", label: "Enterprise (contact sales)", disabled: true },
];

// ─── Meta ─────────────────────────────────────────────────────────────────────

const meta: Meta<typeof Combobox> = {
  title: "Molecules/Combobox",
  component: Combobox,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Combobox implements the WAI-ARIA 1.2 **combobox + listbox** pattern. It supports " +
          "client-side filtering, async (server-side) filtering via `onFilter`, controlled and " +
          "uncontrolled modes, keyboard navigation (↑↓ Enter Escape), and a clear button.\n\n" +
          "## ARIA pattern\n\n" +
          "| Element | Role | Notes |\n" +
          "|---|---|---|\n" +
          "| Trigger | `combobox` | `aria-haspopup=listbox`, `aria-expanded`, `aria-controls` |\n" +
          "| Options panel | `listbox` | `aria-label` mirrors the combobox label |\n" +
          "| Each option | `option` | `aria-selected`, `aria-disabled` |\n" +
          "| Search box | `searchbox` | `aria-controls` → listbox id |\n\n" +
          "## Controlled vs uncontrolled\n\n" +
          "- **Controlled**: pass `value` + `onChange` — the parent owns the selection state.\n" +
          "- **Uncontrolled**: pass `defaultValue` (optional) — the combobox manages its own state.\n\n" +
          "## Async filtering\n\n" +
          "Pass `onFilter(query)` to delegate search to the server. In this mode the component " +
          "renders whatever `options` you pass — swap them out as results arrive.",
      },
    },
  },
  argTypes: {
    size: { control: "select", options: ["sm", "md", "lg"] },
    radius: { control: "select", options: ["none", "sm", "md", "lg", "full"] },
    searchable: { control: "boolean" },
    disabled: { control: "boolean" },
    onChange: { control: false },
    onFilter: { control: false },
  },
};

export default meta;
type Story = StoryObj<typeof Combobox>;

// ─── Default (uncontrolled) ───────────────────────────────────────────────────

export const Default: Story = {
  args: {
    label: "Framework",
    options: FRAMEWORKS,
    placeholder: "Select a framework…",
  },
};

// ─── With default value ───────────────────────────────────────────────────────

export const WithDefaultValue: Story = {
  args: {
    label: "Framework",
    options: FRAMEWORKS,
    defaultValue: "svelte",
  },
};

// ─── Controlled ───────────────────────────────────────────────────────────────

function ControlledCombobox(args: ComponentPropsWithoutRef<typeof Combobox>) {
  const [value, setValue] = useState("");
  const selected = FRAMEWORKS.find((f) => f.value === value);

  return (
    <div className="flex flex-col gap-4 max-w-xs">
      <Combobox
        {...args}
        value={value}
        onChange={(v) => {
          setValue(v);
        }}
      />
      <p className="text-sm text-[var(--color-fw-muted)]">
        Selected:{" "}
        <span className="font-medium text-[var(--color-fw-foreground)]">
          {selected?.label ?? "none"}
        </span>
      </p>
    </div>
  );
}

export const Controlled: Story = {
  render: (args) => <ControlledCombobox {...args} />,
  args: {
    label: "Framework",
    options: FRAMEWORKS,
    placeholder: "Select a framework…",
  },
};

// ─── Many options (long list) ─────────────────────────────────────────────────

export const ManyOptions: Story = {
  args: {
    label: "Country",
    options: COUNTRIES,
    placeholder: "Select a country…",
    searchPlaceholder: "Search countries…",
  },
};

// ─── Disabled option ──────────────────────────────────────────────────────────

export const WithDisabledOption: Story = {
  args: {
    label: "Plan",
    options: WITH_DISABLED,
    placeholder: "Select a plan…",
    searchable: false,
  },
};

// ─── Not searchable ───────────────────────────────────────────────────────────

export const NotSearchable: Story = {
  args: {
    label: "Framework",
    options: FRAMEWORKS,
    searchable: false,
    placeholder: "Select a framework…",
  },
};

// ─── Disabled ─────────────────────────────────────────────────────────────────

export const Disabled: Story = {
  args: {
    label: "Framework",
    options: FRAMEWORKS,
    disabled: true,
    value: "react",
  },
};

// ─── With hint ────────────────────────────────────────────────────────────────

export const WithHint: Story = {
  args: {
    label: "Framework",
    options: FRAMEWORKS,
    hint: "The framework your project is built with.",
    placeholder: "Select a framework…",
  },
};

// ─── With error ───────────────────────────────────────────────────────────────

export const WithError: Story = {
  args: {
    label: "Framework",
    options: FRAMEWORKS,
    error: "Please select a framework to continue.",
    placeholder: "Select a framework…",
  },
};

// ─── Sizes ────────────────────────────────────────────────────────────────────

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-6 max-w-xs">
      <Combobox label="Small" size="sm" options={FRAMEWORKS} placeholder="sm" />
      <Combobox
        label="Medium"
        size="md"
        options={FRAMEWORKS}
        placeholder="md"
      />
      <Combobox label="Large" size="lg" options={FRAMEWORKS} placeholder="lg" />
    </div>
  ),
};

// ─── Async filtering ──────────────────────────────────────────────────────────

function AsyncCombobox(args: ComponentPropsWithoutRef<typeof Combobox>) {
  const [query, setQuery] = useState("");
  const [value, setValue] = useState("");

  const filtered = COUNTRIES.filter((c) =>
    c.label.toLowerCase().includes(query.toLowerCase()),
  );

  return (
    <div className="flex flex-col gap-3 max-w-xs">
      <Combobox
        {...args}
        options={filtered}
        value={value}
        onChange={(v) => {
          setValue(v);
        }}
        onFilter={(q) => {
          setQuery(q);
        }}
      />
      <p className="text-xs text-[var(--color-fw-muted)]">
        Query: <code className="font-mono">{query || "—"}</code> · Showing{" "}
        {filtered.length} of {COUNTRIES.length} options
      </p>
    </div>
  );
}

export const AsyncFiltering: Story = {
  render: (args) => <AsyncCombobox {...args} />,
  args: {
    label: "Country",
    placeholder: "Search countries…",
    searchPlaceholder: "Type to filter…",
  },
  parameters: {
    docs: {
      description: {
        story:
          "When `onFilter` is provided the component delegates filtering to the caller. " +
          "Use this for server-side search — swap out `options` as results arrive. " +
          "In this demo the filtering is simulated client-side.",
      },
    },
  },
};

// ─── Multi-select fixtures ────────────────────────────────────────────────────

const SKILLS: ComboboxOption[] = [
  { value: "ts", label: "TypeScript" },
  { value: "react", label: "React" },
  { value: "node", label: "Node.js" },
  { value: "go", label: "Go" },
  { value: "rust", label: "Rust" },
  { value: "python", label: "Python" },
  { value: "graphql", label: "GraphQL" },
  { value: "docker", label: "Docker" },
];

const GROUPED_TECH: ComboboxOption[] = [
  { value: "react", label: "React", group: "Frontend" },
  { value: "vue", label: "Vue", group: "Frontend" },
  { value: "svelte", label: "Svelte", group: "Frontend" },
  { value: "node", label: "Node.js", group: "Backend" },
  { value: "go", label: "Go", group: "Backend" },
  { value: "rust", label: "Rust", group: "Backend" },
  { value: "pg", label: "PostgreSQL", group: "Database" },
  { value: "mongo", label: "MongoDB", group: "Database" },
  { value: "docker", label: "Docker" }, // ungrouped
];

// ─── Multi-select (uncontrolled) ──────────────────────────────────────────────

function MultiSelectWrapper(args: ComponentPropsWithoutRef<typeof Combobox>) {
  const [selected, setSelected] = useState<string[]>([]);
  return (
    <div className="flex flex-col gap-4 max-w-xs">
      <Combobox
        {...args}
        multiple
        value={selected}
        onChange={(v) => {
          setSelected(v);
        }}
      />
      <p className="text-xs text-[var(--color-fw-muted)]">
        Selected:{" "}
        <span className="font-medium text-[var(--color-fw-foreground)]">
          {selected.length > 0 ? selected.join(", ") : "none"}
        </span>
      </p>
    </div>
  );
}

export const MultiSelect: Story = {
  render: (args) => <MultiSelectWrapper {...args} />,
  args: {
    label: "Skills",
    options: SKILLS,
    placeholder: "Select skills…",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Multi-select mode: selected options are displayed as **Chips** in the trigger. " +
          "Click the × on a chip to deselect. The dropdown stays open after each selection.",
      },
    },
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole("combobox");

    // Open and select two options
    await userEvent.click(trigger);
    await userEvent.click(canvas.getByRole("option", { name: /TypeScript/i }));
    await userEvent.click(canvas.getByRole("option", { name: /React/i }));

    // Chips appear in trigger
    await expect(canvas.getByText("TypeScript")).toBeInTheDocument();
    await expect(canvas.getByText("React")).toBeInTheDocument();

    // Dismiss "TypeScript" chip
    const dismissBtn = canvas.getByRole("button", {
      name: /Remove TypeScript/i,
    });
    await userEvent.click(dismissBtn);
    await expect(canvas.queryByText("TypeScript")).not.toBeInTheDocument();
    await expect(canvas.getByText("React")).toBeInTheDocument();
  },
};

// ─── Multi-select controlled ──────────────────────────────────────────────────

function ControlledMulti(args: ComponentPropsWithoutRef<typeof Combobox>) {
  const [values, setValues] = useState<string[]>(["react", "ts"]);

  return (
    <div className="flex flex-col gap-4 max-w-sm">
      <Combobox
        {...args}
        multiple
        value={values}
        onChange={(v) => {
          setValues(v);
        }}
      />
      <p className="text-xs text-[var(--color-fw-muted)]">
        Controlled state:{" "}
        <code className="font-mono">
          [{values.map((v) => `"${v}"`).join(", ")}]
        </code>
      </p>
    </div>
  );
}

export const MultiControlled: Story = {
  render: (args) => <ControlledMulti {...args} />,
  args: {
    label: "Skills",
    options: SKILLS,
    placeholder: "Select skills…",
  },
};

// ─── Multi with maxSelections ─────────────────────────────────────────────────

function MultiWithMaxSelectionsWrapper(
  args: ComponentPropsWithoutRef<typeof Combobox>,
) {
  const [values, setValues] = useState<string[]>([]);
  return (
    <div className="flex flex-col gap-4 max-w-xs">
      <Combobox
        {...args}
        multiple
        value={values}
        maxSelections={3}
        onChange={(v) => {
          setValues(v);
        }}
      />
      <p className="text-xs text-[var(--color-fw-muted)]">
        {values.length}/3 selected
      </p>
    </div>
  );
}

export const MultiWithMaxSelections: Story = {
  render: (args) => <MultiWithMaxSelectionsWrapper {...args} />,
  args: {
    label: "Top skills (max 3)",
    options: SKILLS,
    placeholder: "Select up to 3 skills…",
  },
  parameters: {
    docs: {
      description: {
        story:
          "With `maxSelections={3}`, once 3 options are selected the remaining unselected " +
          "options become `aria-disabled` and cannot be added. Already-selected options can " +
          "still be deselected.",
      },
    },
  },
};

// ─── Grouped options ──────────────────────────────────────────────────────────

export const WithGroups: Story = {
  args: {
    label: "Technology",
    options: GROUPED_TECH,
    placeholder: "Select a technology…",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Add a `group` field to any `ComboboxOption` to render categorized sections " +
          "with accessible group headers. Options without a `group` appear first. " +
          'Group headers are `role="presentation"` — they are not focusable or selectable.',
      },
    },
  },
};

// ─── Grouped multi-select ─────────────────────────────────────────────────────

function WithGroupsMultiWrapper(
  args: ComponentPropsWithoutRef<typeof Combobox>,
) {
  const [values, setValues] = useState<string[]>([]);
  return (
    <div className="max-w-sm">
      <Combobox
        {...args}
        multiple
        value={values}
        onChange={(v) => {
          setValues(v);
        }}
      />
    </div>
  );
}

export const WithGroupsMulti: Story = {
  render: (args) => <WithGroupsMultiWrapper {...args} />,
  args: {
    label: "Stack",
    options: GROUPED_TECH,
    placeholder: "Select your stack…",
  },
};

// ─── Creatable ────────────────────────────────────────────────────────────────

function CreatableCombobox(args: ComponentPropsWithoutRef<typeof Combobox>) {
  const [options, setOptions] = useState<ComboboxOption[]>(FRAMEWORKS);
  const [value, setValue] = useState<string>("");

  return (
    <div className="flex flex-col gap-3 max-w-xs">
      <Combobox
        {...args}
        options={options}
        value={value}
        creatable
        onChange={(v) => {
          setValue(v);
        }}
        onCreateOption={(q) => {
          const newOpt: ComboboxOption = {
            value: q.toLowerCase().replace(/\s+/g, "-"),
            label: q,
          };
          setOptions((prev) => [...prev, newOpt]);
          setValue(newOpt.value);
        }}
      />
      <p className="text-xs text-[var(--color-fw-muted)]">
        Options: {options.length} · Selected: {value || "—"}
      </p>
    </div>
  );
}

export const Creatable: Story = {
  render: (args) => <CreatableCombobox {...args} />,
  args: {
    label: "Framework",
    placeholder: "Select or create…",
  },
  parameters: {
    docs: {
      description: {
        story:
          "With `creatable`, when the search query produces no full match a " +
          '`Create "…"` option appears. Selecting it fires `onCreateOption(query)`. ' +
          "The caller is responsible for adding the new option to `options` — " +
          "in this demo a new entry is appended to the local array.",
      },
    },
  },
};

// ─── Single preserved (backward compat smoke) ────────────────────────────────

export const SinglePreserved: Story = {
  args: {
    label: "Framework (single — backward compat)",
    options: FRAMEWORKS,
    placeholder: "Select a framework…",
    defaultValue: "react",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Smoke-test that the original single-select API is unchanged. " +
          "All existing stories (`Default`, `Controlled`, `Async`, etc.) continue to work.",
      },
    },
  },
};
