import type { Meta, StoryObj } from "@storybook/react-vite";
import { Radio } from "./Radio";
import { RadioGroup } from "./RadioGroup";

const meta: Meta<typeof Radio> = {
  title: "Atoms/Radio",
  component: Radio,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Form selection atom for mutually exclusive choices.\n\n" +
          'Built on a native `<input type="radio">` (sr-only) + layered visual siblings using Tailwind `peer-*` variants — ' +
          "so the component stays in the a11y tree and participates in form submission without custom ARIA.\n\n" +
          "**Group radios with `RadioGroup`** — it wraps items in a `<fieldset>` + `<legend>` so screen readers announce the group name " +
          "before each label. All radios in a group must share the same `name` prop for native mutual exclusion.\n\n" +
          "**A11y:** Always provide a meaningful `label`. Use `RadioGroup` with a descriptive `legend` for every group of radios.",
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
      description: "Radio size.",
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
    disabled: {
      description: "Disables the radio and reduces opacity.",
      control: "boolean",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Radio>;

export const Default: Story = {
  args: {
    label: "Standard shipping",
    name: "shipping",
    value: "standard",
  },
};

export const WithHint: Story = {
  args: {
    label: "Express shipping",
    name: "shipping",
    value: "express",
    hint: "Arrives within 2 business days.",
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
    label: "Standard shipping",
    name: "shipping",
    value: "standard",
    error: "Please select a shipping method.",
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

export const Checked: Story = {
  args: {
    label: "Pro plan",
    name: "plan",
    value: "pro",
    defaultChecked: true,
  },
  parameters: {
    docs: {
      description: { story: "Pre-selected radio using `defaultChecked`." },
    },
  },
};

export const Disabled: Story = {
  args: {
    label: "Enterprise plan",
    name: "plan",
    value: "enterprise",
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
        <Radio
          key={s}
          size={s}
          label={`Size — ${s}`}
          name={`size-${s}`}
          value={s}
        />
      ))}
    </div>
  ),
};

export const Group: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "`RadioGroup` wraps radios in a `<fieldset>` + `<legend>` for correct screen reader announcements. " +
          "Sharing the same `name` prop enables native mutual exclusion.",
      },
    },
  },
  render: () => (
    <RadioGroup
      legend="Subscription plan"
      hint="You can change your plan at any time."
    >
      <Radio
        label="Basic — free forever"
        name="plan"
        value="basic"
        defaultChecked
      />
      <Radio
        label="Pro — $9 / month"
        name="plan"
        value="pro"
        hint="Includes priority support."
      />
      <Radio
        label="Enterprise — custom pricing"
        name="plan"
        value="enterprise"
        disabled
      />
    </RadioGroup>
  ),
};

export const GroupWithError: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Group-level `error` sets `aria-invalid` on the `<fieldset>` and renders the message below.",
      },
    },
  },
  render: () => (
    <RadioGroup
      legend="Preferred contact method"
      error="Please select a contact method."
    >
      <Radio label="Email" name="contact-err" value="email" />
      <Radio label="Phone" name="contact-err" value="phone" />
      <Radio label="SMS" name="contact-err" value="sms" />
    </RadioGroup>
  ),
};

export const GroupHorizontal: Story = {
  parameters: {
    docs: {
      description: {
        story:
          '`direction="horizontal"` lays out radios in a row — useful for short option sets.',
      },
    },
  },
  render: () => (
    <RadioGroup legend="Priority" direction="horizontal">
      <Radio label="Low" name="priority" value="low" />
      <Radio label="Medium" name="priority" value="medium" defaultChecked />
      <Radio label="High" name="priority" value="high" />
    </RadioGroup>
  ),
};
