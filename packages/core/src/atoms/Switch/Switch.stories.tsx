import type { Meta, StoryObj } from "@storybook/react-vite";
import { Switch } from "./Switch";

const meta: Meta<typeof Switch> = {
  title: "Atoms/Switch",
  component: Switch,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          'Boolean toggle atom built on `<input type="checkbox" role="switch">` (sr-only) + ' +
          "layered visual siblings using Tailwind `peer-*` variants.\n\n" +
          "**When to use Switch vs Checkbox:** Use Switch for settings that take effect immediately (no submit needed). " +
          "Use Checkbox for form selections confirmed via a submit button.\n\n" +
          '**A11y:** Always provide a `label`. The `role="switch"` communicates the on/off semantics to screen readers. ' +
          "Use `error` for inline validation — it sets `aria-invalid` and announces the message via `aria-describedby`.",
      },
    },
  },
  argTypes: {
    label: {
      description: "Visible label — always required for accessibility.",
      control: "text",
      table: { type: { summary: "string" } },
    },
    size: {
      description: "Switch size.",
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
        "Validation error. Sets `aria-invalid=true` and links the message via `aria-describedby`.",
      control: "text",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "undefined" },
      },
    },
    disabled: {
      description: "Disables the switch and reduces opacity.",
      control: "boolean",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Switch>;

export const Default: Story = {
  args: {
    label: "Dark mode",
  },
};

export const On: Story = {
  args: {
    label: "Dark mode",
    defaultChecked: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Pre-toggled state via `defaultChecked` (uncontrolled) or `checked` (controlled).",
      },
    },
  },
};

export const WithHint: Story = {
  args: {
    label: "Email notifications",
    hint: "We'll send digest emails at most once a day.",
  },
};

export const WithError: Story = {
  args: {
    label: "Accept data sharing",
    error: "You must enable this to continue.",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Error state sets `aria-invalid=true` and turns the track destructive when toggled on.",
      },
    },
  },
};

export const Disabled: Story = {
  args: {
    label: "Beta features",
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
        <Switch key={s} size={s} label={`Size — ${s}`} />
      ))}
    </div>
  ),
};

export const Group: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Typical settings panel pattern. Compose at the consumer level — " +
          "Switch has no built-in group API.",
      },
    },
  },
  render: () => (
    <div className="flex flex-col gap-3 w-72">
      <Switch label="Dark mode" />
      <Switch label="Email notifications" hint="Daily digest." defaultChecked />
      <Switch label="Push notifications" />
      <Switch label="Analytics" disabled hint="Requires admin." />
    </div>
  ),
};
