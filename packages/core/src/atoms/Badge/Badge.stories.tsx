import type { Meta, StoryObj } from "@storybook/react-vite";
import { Badge } from "./Badge";

const meta: Meta<typeof Badge> = {
  title: "Atoms/Badge",
  component: Badge,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Non-interactive inline label atom for communicating status, categories, or counts at a glance. Renders as a `<span>`, making it safe to place inside any flow content.\n\n" +
          "**Note:** `dot` and `icon` are mutually exclusive — when `dot` is `true` it always takes precedence over `icon`.",
      },
    },
  },
  argTypes: {
    children: {
      description: "**Required.** The visible text label of the badge.",
      table: { type: { summary: "ReactNode" } },
      control: "text",
    },
    variant: {
      description:
        "Color scheme and semantic meaning of the badge.\n\n" +
        "| Value | Semantic use |\n" +
        "|---|---|\n" +
        "| `default` | Neutral / generic label |\n" +
        "| `primary` | Brand-colored highlight |\n" +
        "| `success` | Positive state |\n" +
        "| `warning` | Caution state |\n" +
        "| `destructive` | Error or danger state |\n" +
        "| `info` | Informational state |\n" +
        "| `outline` | Minimal bordered style |",
      control: "select",
      options: [
        "default",
        "primary",
        "success",
        "warning",
        "destructive",
        "info",
        "outline",
      ],
      table: {
        type: {
          summary:
            "'default' | 'primary' | 'success' | 'warning' | 'destructive' | 'info' | 'outline'",
        },
        defaultValue: { summary: "'default'" },
      },
    },
    radius: {
      description:
        "Border radius applied via the shared `radiusMap` token. Defaults to `full` (pill shape).",
      control: "select",
      options: ["none", "sm", "md", "lg", "full"],
      table: {
        type: { summary: "'none' | 'sm' | 'md' | 'lg' | 'full'" },
        defaultValue: { summary: "'full'" },
      },
    },
    dot: {
      description:
        "Renders a small filled dot before the label — ideal for presence or status indicators. When `true`, overrides `icon`.",
      control: "boolean",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    icon: {
      description:
        "Icon rendered before the label. Accepts any `ReactNode` — typically an `<Icon>` atom. Hidden from screen readers (`aria-hidden`). Not shown when `dot` is `true`.",
      control: false,
      table: {
        type: { summary: "ReactNode" },
        defaultValue: { summary: "undefined" },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const Default: Story = {
  args: { children: "Badge" },
  parameters: {
    docs: {
      description: {
        story:
          "Default `default` variant with `full` radius. Use the Controls panel to explore all prop combinations.",
      },
    },
  },
};

export const Variants: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "All 7 color variants. Choose the variant that matches the semantic meaning of the label in your UI.",
      },
    },
  },
  render: () => (
    <div className="flex flex-wrap gap-2">
      {(
        [
          "default",
          "primary",
          "success",
          "warning",
          "destructive",
          "info",
          "outline",
        ] as const
      ).map((v) => (
        <Badge key={v} variant={v}>
          {v.charAt(0).toUpperCase() + v.slice(1)}
        </Badge>
      ))}
    </div>
  ),
};

export const WithDot: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "`dot` renders a filled circle indicator before the label. Useful for online/offline presence states or compact status labels.",
      },
    },
  },
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge variant="success" dot>
        Online
      </Badge>
      <Badge variant="warning" dot>
        Away
      </Badge>
      <Badge variant="destructive" dot>
        Offline
      </Badge>
    </div>
  ),
};

export const Radii: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "All 5 `radius` options. The default is `full` (pill). Use `none` or `sm` for squared styles in dense table layouts.",
      },
    },
  },
  render: () => (
    <div className="flex flex-wrap gap-2">
      {(["none", "sm", "md", "lg", "full"] as const).map((r) => (
        <Badge key={r} radius={r}>
          {r}
        </Badge>
      ))}
    </div>
  ),
};
