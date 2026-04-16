import type { Meta, StoryObj } from "@storybook/react-vite";
import { Info } from "lucide-react";
import { Tooltip } from "./Tooltip";
import { Button } from "../Button";
import { Icon } from "../Icon";

const meta: Meta<typeof Tooltip> = {
  title: "Atoms/Tooltip",
  component: Tooltip,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="flex items-center justify-center p-16">
        <Story />
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        component:
          "Contextual label atom. Shows a short text bubble on hover and keyboard focus.\n\n" +
          "**CSS-only** — no JS state, no portal. The bubble is driven by Tailwind `group-hover` / " +
          "`group-focus-within` on a `relative inline-flex group` wrapper.\n\n" +
          '**A11y:** The bubble has `role="tooltip"` and is linked to the trigger wrapper via `aria-describedby`. ' +
          "The trigger **must be focusable** (a `<button>`, `<a>`, or element with `tabIndex`) so keyboard " +
          "users can reveal the tooltip on focus.\n\n" +
          "**Atom scope:** Overflow clipping by a parent can hide the bubble. For scroll-aware or " +
          "viewport-safe positioning, use a Molecule that integrates Floating UI.",
      },
    },
  },
  argTypes: {
    content: {
      description: "Tooltip text — also used as `aria-describedby` target.",
      control: "text",
    },
    placement: {
      description: "Position of the bubble relative to the trigger.",
      control: "select",
      options: ["top", "bottom", "left", "right"],
      table: {
        type: { summary: "'top' | 'bottom' | 'left' | 'right'" },
        defaultValue: { summary: "'top'" },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Tooltip>;

export const Default: Story = {
  args: {
    content: "Save this document",
    placement: "top",
  },
  render: (args) => (
    <Tooltip {...args}>
      <Button variant="secondary">Save</Button>
    </Tooltip>
  ),
};

export const WithIconTrigger: Story = {
  args: {
    content: "More information about this field",
    placement: "top",
  },
  render: (args) => (
    <Tooltip {...args}>
      <button
        type="button"
        aria-label="More information"
        className="inline-flex items-center justify-center size-8 rounded-full text-[var(--color-fw-muted)] hover:text-[var(--color-fw-foreground)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-fw-ring)]"
      >
        <Icon icon={Info} size="md" />
      </button>
    </Tooltip>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Icon-only triggers are a common pattern. Pair with a meaningful `aria-label` on the icon " +
          "so screen readers announce both the button purpose and the tooltip description.",
      },
    },
  },
};

export const Placements: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "All four placements — hover or focus each button to reveal the tooltip.",
      },
    },
  },
  render: () => (
    <div className="grid grid-cols-2 gap-6 p-8">
      {(["top", "bottom", "left", "right"] as const).map((p) => (
        <Tooltip key={p} content={`Placement: ${p}`} placement={p}>
          <Button variant="secondary" size="sm">
            {p}
          </Button>
        </Tooltip>
      ))}
    </div>
  ),
};

export const LongContent: Story = {
  args: {
    content:
      "This field is required. Enter a valid email address that will be used to send account notifications.",
    placement: "bottom",
  },
  render: (args) => (
    <Tooltip {...args}>
      <Button variant="secondary">Email field help</Button>
    </Tooltip>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Tooltip content is capped at `max-w-xs` and wraps naturally. Keep tooltips short — " +
          "move longer explanations to hint text or a popover Molecule.",
      },
    },
  },
};

export const DisabledTriggerPattern: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Native `disabled` buttons cannot receive focus, so the tooltip would not be keyboard-accessible. " +
          "Wrap a `disabled`-looking span with `tabIndex={0}` instead, or use `aria-disabled` on a button.",
      },
    },
  },
  render: () => (
    <Tooltip
      content="You don't have permission to delete this item."
      placement="top"
    >
      <button
        type="button"
        aria-disabled="true"
        className="inline-flex items-center px-4 h-10 rounded-md text-sm font-medium bg-[var(--color-fw-secondary)] text-[var(--color-fw-muted)] cursor-not-allowed"
      >
        Delete
      </button>
    </Tooltip>
  ),
};
