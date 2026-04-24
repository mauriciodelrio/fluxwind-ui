import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, within } from "storybook/test";
import { Gauge } from "./Gauge";

const meta: Meta<typeof Gauge> = {
  title: "Atoms/Gauge",
  component: Gauge,
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
          "Semantic measurement bar wrapping the native `<meter>` element.\n\n" +
          "**Accessible by default:** the native `<meter>` element has an implicit `role='meter'` " +
          "recognized by screen readers — no explicit role attribute is needed.\n\n" +
          "**Auto variant:** when `variant='auto'` the fill color is derived from the " +
          "`low`, `high`, and `optimum` attributes, mirroring the browser's native coloring algorithm.\n\n" +
          "**A11y:** Always provide `aria-label`, `aria-labelledby`, or `label` — a dev-mode " +
          "warning is printed when none of these are set.",
      },
    },
  },
  argTypes: {
    value: {
      description:
        "Current measured value (required). Clamped to `[min, max]`.",
      control: { type: "range", min: 0, max: 100, step: 1 },
      table: {
        type: { summary: "number" },
      },
    },
    min: {
      description: "Minimum value of the range.",
      control: { type: "number" },
      table: {
        type: { summary: "number" },
        defaultValue: { summary: "0" },
      },
    },
    max: {
      description: "Maximum value of the range.",
      control: { type: "number" },
      table: {
        type: { summary: "number" },
        defaultValue: { summary: "100" },
      },
    },
    low: {
      description: "Upper boundary of the low range.",
      control: { type: "number" },
      table: { type: { summary: "number" } },
    },
    high: {
      description: "Lower boundary of the high range.",
      control: { type: "number" },
      table: { type: { summary: "number" } },
    },
    optimum: {
      description: "The value that is considered optimal.",
      control: { type: "number" },
      table: { type: { summary: "number" } },
    },
    variant: {
      description:
        "Color variant. `auto` derives color from value position relative to low/high/optimum.",
      control: "select",
      options: ["auto", "primary", "success", "warning", "destructive"],
      table: {
        type: {
          summary: "'auto' | 'primary' | 'success' | 'warning' | 'destructive'",
        },
        defaultValue: { summary: "'auto'" },
      },
    },
    size: {
      description: "Track height.",
      control: "select",
      options: ["xs", "sm", "md", "lg"],
      table: {
        type: { summary: "'xs' | 'sm' | 'md' | 'lg'" },
        defaultValue: { summary: "'md'" },
      },
    },
    radius: {
      description: "Corner radius for track and fill.",
      control: "select",
      options: ["none", "sm", "md", "lg", "full"],
      table: {
        type: { summary: "'none' | 'sm' | 'md' | 'lg' | 'full'" },
        defaultValue: { summary: "'full'" },
      },
    },
    label: {
      description:
        "Visible label rendered above the bar. Also used as `aria-label` when no explicit one is set.",
      control: "text",
    },
    showValue: {
      description: "Show the formatted `{value}{unit}` alongside the label.",
      control: "boolean",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    unit: {
      description: "Unit appended to the displayed value.",
      control: "text",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: '"%"' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Gauge>;

// ─── Default ─────────────────────────────────────────────────────────────────

export const Default: Story = {
  args: {
    value: 65,
    label: "Profile completion",
    showValue: true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const meter = canvas.getByRole("meter");
    await expect(meter).toBeInTheDocument();
    await expect(meter).toHaveAttribute("value", "65");
  },
};

// ─── WithLabelAndValue ───────────────────────────────────────────────────────

export const WithLabelAndValue: Story = {
  args: {
    value: 72,
    min: 0,
    max: 100,
    label: "Disk usage",
    showValue: true,
    unit: "%",
  },
  parameters: {
    docs: {
      description: {
        story:
          "`label` renders a visible caption above the bar; `showValue` appends the current value.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText("Disk usage")).toBeInTheDocument();
    await expect(canvas.getByText("72%")).toBeInTheDocument();
  },
};

// ─── WithAutoVariant ─────────────────────────────────────────────────────────

export const WithAutoVariant: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "When `variant='auto'`, the fill color is computed from `low`, `high`, and `optimum`. " +
          "Here `optimum=90` means high values are optimal, so the success/warning/destructive " +
          "thresholds map to `>= high`, `>= low`, and `< low` respectively.",
      },
    },
  },
  render: () => (
    <div className="flex flex-col gap-4">
      <Gauge
        value={90}
        min={0}
        max={100}
        low={25}
        high={75}
        optimum={90}
        label="Score (optimal ≥ 75)"
        showValue
        variant="auto"
      />
      <Gauge
        value={50}
        min={0}
        max={100}
        low={25}
        high={75}
        optimum={90}
        label="Score (mid-range)"
        showValue
        variant="auto"
      />
      <Gauge
        value={10}
        min={0}
        max={100}
        low={25}
        high={75}
        optimum={90}
        label="Score (sub-optimal)"
        showValue
        variant="auto"
      />
    </div>
  ),
};

// ─── Sizes ────────────────────────────────────────────────────────────────────

export const Sizes: Story = {
  parameters: {
    docs: {
      description: { story: "xs (hairline), sm, md (default), lg (chunky)." },
    },
  },
  render: () => (
    <div className="flex flex-col gap-4">
      <Gauge value={65} size="xs" label="Extra small" showValue />
      <Gauge value={65} size="sm" label="Small" showValue />
      <Gauge value={65} size="md" label="Medium (default)" showValue />
      <Gauge value={65} size="lg" label="Large" showValue />
    </div>
  ),
};

// ─── Variants ─────────────────────────────────────────────────────────────────

export const Variants: Story = {
  parameters: {
    docs: {
      description: { story: "All fixed color variants." },
    },
  },
  render: () => (
    <div className="flex flex-col gap-4">
      <Gauge value={65} variant="primary" label="Primary" showValue />
      <Gauge value={65} variant="success" label="Success" showValue />
      <Gauge value={65} variant="warning" label="Warning" showValue />
      <Gauge value={65} variant="destructive" label="Destructive" showValue />
    </div>
  ),
};

// ─── Radius ───────────────────────────────────────────────────────────────────

export const RadiusVariants: Story = {
  parameters: {
    docs: {
      description: { story: "Corner radius options for track and fill." },
    },
  },
  render: () => (
    <div className="flex flex-col gap-4">
      <Gauge value={65} radius="none" label="None" size="lg" />
      <Gauge value={65} radius="sm" label="Small" size="lg" />
      <Gauge value={65} radius="md" label="Medium" size="lg" />
      <Gauge value={65} radius="lg" label="Large" size="lg" />
      <Gauge value={65} radius="full" label="Full (default)" size="lg" />
    </div>
  ),
};

// ─── CustomRange ──────────────────────────────────────────────────────────────

export const CustomRange: Story = {
  args: {
    value: 37,
    min: 20,
    max: 45,
    label: "Temperature",
    showValue: true,
    unit: "°C",
    variant: "warning",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Custom `min`, `max`, and non-% `unit` — e.g. a temperature gauge.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const meter = canvas.getByRole("meter");
    await expect(meter).toHaveAttribute("value", "37");
    await expect(meter).toHaveAttribute("min", "20");
    await expect(meter).toHaveAttribute("max", "45");
    await expect(canvas.getByText("37°C")).toBeInTheDocument();
  },
};
