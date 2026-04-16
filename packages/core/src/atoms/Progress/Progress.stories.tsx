import type { Meta, StoryObj } from "@storybook/react-vite";
import { Progress } from "./Progress";

const meta: Meta<typeof Progress> = {
  title: "Atoms/Progress",
  component: Progress,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div style={{ minWidth: "320px", maxWidth: "480px", width: "100%" }}>
        <Story />
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        component:
          "Linear progress bar atom for communicating operation status.\n\n" +
          "**Determined:** Pass `value` (0–100) — the fill animates via CSS transition as the value changes. " +
          "Values are clamped to `[0, 100]` internally.\n\n" +
          "**Indeterminate:** Omit `value` — a sliding bar animates indefinitely to signal activity " +
          "when the total progress cannot be measured (e.g. initial page load, unknown duration uploads). " +
          "Respects `prefers-reduced-motion`.\n\n" +
          '**A11y:** Always provide a meaningful `label` — it becomes the `aria-label` on the `role="progressbar"` element. ' +
          "Use `showLabel` to render it visually when consumers need a caption.",
      },
    },
  },
  argTypes: {
    value: {
      description: "Progress value (0–100). Omit for indeterminate state.",
      control: { type: "range", min: 0, max: 100, step: 1 },
      table: {
        type: { summary: "number" },
        defaultValue: { summary: "undefined" },
      },
    },
    label: {
      description: "Accessible name for the progressbar (always required).",
      control: "text",
    },
    showLabel: {
      description: "Show the label text visually above the bar.",
      control: "boolean",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    showValue: {
      description: "Show the percentage value above the bar (determined only).",
      control: "boolean",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    size: {
      description: "Track height.",
      control: "select",
      options: ["sm", "md", "lg"],
      table: {
        type: { summary: "'sm' | 'md' | 'lg'" },
        defaultValue: { summary: "'md'" },
      },
    },
    variant: {
      description: "Fill colour variant.",
      control: "select",
      options: [
        "primary",
        "success",
        "warning",
        "destructive",
        "info",
        "muted",
      ],
      table: {
        type: {
          summary:
            "'primary' | 'success' | 'warning' | 'destructive' | 'info' | 'muted'",
        },
        defaultValue: { summary: "'primary'" },
      },
    },
    radius: {
      description: "Corner radius for track and fill.",
      control: "select",
      options: ["none", "sm", "full"],
      table: {
        type: { summary: "'none' | 'sm' | 'full'" },
        defaultValue: { summary: "'full'" },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Progress>;

export const Default: Story = {
  args: {
    label: "Upload progress",
    value: 45,
    showLabel: true,
    showValue: true,
  },
};

export const WithLabelAndValue: Story = {
  args: {
    label: "Uploading files",
    value: 68,
    showLabel: true,
    showValue: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          "`showLabel` and `showValue` render a header row above the track.",
      },
    },
  },
};

export const Completed: Story = {
  args: {
    label: "Upload complete",
    value: 100,
    showLabel: true,
    showValue: true,
    variant: "success",
  },
  parameters: {
    docs: {
      description: { story: 'Completed state using `variant="success"`.' },
    },
  },
};

export const Error: Story = {
  args: {
    label: "Upload failed",
    value: 34,
    showLabel: true,
    showValue: true,
    variant: "destructive",
  },
  parameters: {
    docs: {
      description: { story: 'Error state using `variant="destructive"`.' },
    },
  },
};

export const Indeterminate: Story = {
  args: {
    label: "Loading, please wait",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Omit `value` to enter indeterminate state. " +
          "A bar slides back and forth to signal ongoing activity. " +
          "The animation respects `prefers-reduced-motion`.",
      },
    },
  },
};

export const Sizes: Story = {
  parameters: {
    docs: {
      description: { story: "sm (hairline), md (default), lg (chunky)." },
    },
  },
  render: () => (
    <div className="flex flex-col gap-4 w-full">
      {(["sm", "md", "lg"] as const).map((s) => (
        <Progress key={s} label={`Size ${s}`} value={60} size={s} showLabel />
      ))}
    </div>
  ),
};

export const Variants: Story = {
  parameters: {
    docs: {
      description: { story: "All colour variants at 60% fill." },
    },
  },
  render: () => (
    <div className="flex flex-col gap-4 w-full">
      {(
        [
          "primary",
          "success",
          "warning",
          "destructive",
          "info",
          "muted",
        ] as const
      ).map((v) => (
        <Progress key={v} label={v} value={60} variant={v} showLabel />
      ))}
    </div>
  ),
};

export const RadiusSquare: Story = {
  args: {
    label: "Processing",
    value: 55,
    showLabel: true,
    showValue: true,
    radius: "none",
    size: "lg",
  },
  parameters: {
    docs: {
      description: { story: '`radius="none"` for a squared-off bar.' },
    },
  },
};
