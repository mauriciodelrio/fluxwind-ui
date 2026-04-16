import type { Meta, StoryObj } from "@storybook/react-vite";
import { Select, type SelectItem } from "./Select";

const FRAMEWORKS: SelectItem[] = [
  { value: "react", label: "React" },
  { value: "vue", label: "Vue" },
  { value: "svelte", label: "Svelte" },
  { value: "solid", label: "SolidJS" },
];

const GROUPED: SelectItem[] = [
  {
    group: "Frontend",
    options: [
      { value: "react", label: "React" },
      { value: "vue", label: "Vue" },
      { value: "svelte", label: "Svelte" },
    ],
  },
  {
    group: "Backend",
    options: [
      { value: "node", label: "Node.js" },
      { value: "django", label: "Django" },
      { value: "rails", label: "Ruby on Rails" },
    ],
  },
  {
    group: "Mobile",
    options: [
      { value: "rn", label: "React Native" },
      { value: "flutter", label: "Flutter", disabled: true },
    ],
  },
];

const meta: Meta<typeof Select> = {
  title: "Atoms/Select",
  component: Select,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Native `<select>` atom with the same design language as `Input`. " +
          "`appearance-none` removes the OS arrow and a custom SVG chevron is layered in its place.\n\n" +
          "**Scope of this atom:** Single-value selection from a predefined list. " +
          "For searchable / multi-select / async lists, use the `Combobox` molecule.\n\n" +
          "**Options API:** Pass flat `SelectOption[]` or mixed with `SelectGroup[]` for grouped options (`<optgroup>`).\n\n" +
          "**A11y:** Always pass a `label`. Use `placeholder` to add a non-selectable default prompt. " +
          "Error state sets `aria-invalid=true` and links the message via `aria-describedby`.",
      },
    },
  },
  argTypes: {
    label: {
      description: "Visible label — always required for accessibility.",
      control: "text",
      table: { type: { summary: "string" } },
    },
    placeholder: {
      description:
        "First disabled option shown as a prompt when no value is pre-selected.",
      control: "text",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "undefined" },
      },
    },
    size: {
      description: "Trigger height using the shared size scale.",
      control: "select",
      options: ["sm", "md", "lg"],
      table: {
        type: { summary: "'sm' | 'md' | 'lg'" },
        defaultValue: { summary: "'md'" },
      },
    },
    radius: {
      description: "Border radius.",
      control: "select",
      options: ["none", "sm", "md", "lg", "xl", "full"],
      table: {
        type: { summary: "'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full'" },
        defaultValue: { summary: "'md'" },
      },
    },
    hint: {
      description: "Helper text below the trigger.",
      control: "text",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "undefined" },
      },
    },
    error: {
      description:
        "Validation error. Sets `aria-invalid=true` and links the message via `aria-describedby`.",
      control: "text",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "undefined" },
      },
    },
    disabled: {
      description: "Disables the entire select.",
      control: "boolean",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Select>;

export const Default: Story = {
  args: {
    label: "Framework",
    options: FRAMEWORKS,
    placeholder: "Choose a framework…",
  },
};

export const WithHint: Story = {
  args: {
    label: "Primary language",
    options: FRAMEWORKS,
    placeholder: "Select one…",
    hint: "This will be shown on your public profile.",
  },
};

export const WithError: Story = {
  args: {
    label: "Framework",
    options: FRAMEWORKS,
    placeholder: "Select one…",
    error: "Please select a framework to continue.",
  },
};

export const Grouped: Story = {
  args: {
    label: "Technology",
    options: GROUPED,
    placeholder: "Choose a technology…",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Pass `SelectGroup` objects to render `<optgroup>` sections. " +
          "Individual options can be disabled (e.g. Flutter above).",
      },
    },
  },
};

export const Sizes: Story = {
  parameters: {
    docs: {
      description: { story: "sm, md (default), lg." },
    },
  },
  render: () => (
    <div className="flex flex-col gap-4 w-64">
      {(["sm", "md", "lg"] as const).map((s) => (
        <Select
          key={s}
          size={s}
          label={`Size — ${s}`}
          options={FRAMEWORKS}
          placeholder="Choose…"
        />
      ))}
    </div>
  ),
};

export const Disabled: Story = {
  args: {
    label: "Region",
    options: [{ value: "us", label: "United States" }],
    defaultValue: "us",
    disabled: true,
    hint: "Region cannot be changed after account creation.",
  },
};
