import type { Meta, StoryObj } from "@storybook/react-vite";
import { Checkbox } from "./Checkbox";

const meta: Meta<typeof Checkbox> = {
  title: "Atoms/Checkbox",
  component: Checkbox,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Form selection atom supporting three states: **unchecked**, **checked**, and **indeterminate**.\n\n" +
          'Built on a native `<input type="checkbox">` (sr-only) + layered visual siblings using Tailwind `peer-*` variants — ' +
          "so the component stays in the a11y tree and participates in form submission without any custom ARIA trickery.\n\n" +
          "**A11y:** Always provide a meaningful `label`. " +
          "Use `error` to surface validation state — it sets `aria-invalid` and links the message via `aria-describedby`.",
      },
    },
  },
  argTypes: {
    label: {
      description: "Visible label text — always required for accessibility.",
      control: "text",
      table: { type: { summary: "string" } },
    },
    size: {
      description: "Checkbox size.",
      control: "select",
      options: ["sm", "md", "lg"],
      table: {
        type: { summary: "'sm' | 'md' | 'lg'" },
        defaultValue: { summary: "'md'" },
      },
    },
    hint: {
      description: "Helper text shown below the label.",
      control: "text",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "undefined" },
      },
    },
    error: {
      description:
        "Validation error message. Sets `aria-invalid=true` on the input and links the message via `aria-describedby`.",
      control: "text",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "undefined" },
      },
    },
    indeterminate: {
      description:
        "Renders a dash instead of a checkmark. Used for 'select all' parent checkboxes when some (but not all) children are selected.",
      control: "boolean",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    disabled: {
      description: "Disables the checkbox and reduces opacity.",
      control: "boolean",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

export const Default: Story = {
  args: {
    label: "Accept terms and conditions",
  },
};

export const WithHint: Story = {
  args: {
    label: "Subscribe to newsletter",
    hint: "We send at most one email per week.",
  },
  parameters: {
    docs: {
      description: {
        story: "Hint text linked to the input via `aria-describedby`.",
      },
    },
  },
};

export const WithError: Story = {
  args: {
    label: "Accept terms and conditions",
    error: "You must accept the terms to continue.",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Error state sets `aria-invalid=true` and announces the message via `aria-describedby`. " +
          "The visual indicator turns destructive-red.",
      },
    },
  },
};

export const Indeterminate: Story = {
  args: {
    label: "Select all items",
    indeterminate: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Indeterminate state — shows a dash instead of a checkmark. " +
          'Use for "select all" parent checkboxes when some (but not all) children are selected.',
      },
    },
  },
};

export const Disabled: Story = {
  args: {
    label: "Accept terms and conditions",
    disabled: true,
  },
};

export const Sizes: Story = {
  parameters: {
    docs: {
      description: { story: "sm, md (default), lg." },
    },
  },
  render: () => (
    <div className="flex flex-col gap-3">
      {(["sm", "md", "lg"] as const).map((s) => (
        <Checkbox key={s} size={s} label={`Size — ${s}`} />
      ))}
    </div>
  ),
};

export const Group: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Typical checkbox group. Compose at the consumer level — " +
          "Checkbox has no built-in group API.",
      },
    },
  },
  render: () => (
    <fieldset className="flex flex-col gap-2 border-0 p-0 m-0">
      <legend className="text-sm font-semibold text-[var(--color-fw-foreground)] mb-1">
        Notification preferences
      </legend>
      <Checkbox label="Email notifications" defaultChecked />
      <Checkbox label="Push notifications" />
      <Checkbox label="SMS notifications" hint="Standard rates may apply." />
      <Checkbox label="All channels" indeterminate />
    </fieldset>
  ),
};
