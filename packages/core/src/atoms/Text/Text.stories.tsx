import type { Meta, StoryObj } from "@storybook/react-vite";
import { Text } from "./Text";

const meta: Meta<typeof Text> = {
  title: "Atoms/Text",
  component: Text,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Polymorphic typography atom. Renders as `<p>` by default; use the `as` prop to output any valid HTML text-level element without losing the token-driven styles.\n\n" +
          "All text styles are defined by CVA variants — never hardcode font sizes or colors directly; always use `variant` and `weight`.",
      },
    },
  },
  argTypes: {
    children: {
      description: "**Required.** The visible text content.",
      table: { type: { summary: "ReactNode" } },
      control: "text",
    },
    as: {
      description:
        "HTML element to render. Useful for semantic headings, inline spans, or form labels without changing the visual style.\n\n" +
        "Common values: `p` (default), `span`, `div`, `h1`–`h6`, `label`, `strong`, `em`.",
      control: "select",
      options: [
        "p",
        "span",
        "div",
        "h1",
        "h2",
        "h3",
        "h4",
        "h5",
        "h6",
        "label",
      ],
      table: {
        type: { summary: "ElementType" },
        defaultValue: { summary: "'p'" },
      },
    },
    variant: {
      description:
        "Sets the typographic scale and color for the element.\n\n" +
        "| Value | Size | Color | Use case |\n" +
        "|---|---|---|---|\n" +
        "| `body` | `text-base` | foreground | Default paragraph text |\n" +
        "| `lead` | `text-lg` | foreground | Introductory / hero copy |\n" +
        "| `small` | `text-sm` | muted | Supporting text |\n" +
        "| `caption` | `text-xs` | muted | Helper text, timestamps |\n" +
        "| `code` | `text-sm` mono | surface bg | Inline code snippets |\n" +
        "| `label` | `text-sm` | foreground | Form field labels |",
      control: "select",
      options: ["body", "lead", "small", "caption", "code", "label"],
      table: {
        type: {
          summary: "'body' | 'lead' | 'small' | 'caption' | 'code' | 'label'",
        },
        defaultValue: { summary: "'body'" },
      },
    },
    weight: {
      description:
        "Font weight applied independently of `variant`. When omitted, weight is inherited from the variant styles.",
      control: "select",
      options: ["normal", "medium", "semibold", "bold"],
      table: {
        type: { summary: "'normal' | 'medium' | 'semibold' | 'bold'" },
        defaultValue: { summary: "undefined" },
      },
    },
    align: {
      description:
        "Text alignment. When omitted, alignment inherits from the parent container.",
      control: "select",
      options: ["left", "center", "right", "justify"],
      table: {
        type: { summary: "'left' | 'center' | 'right' | 'justify'" },
        defaultValue: { summary: "undefined" },
      },
    },
    truncate: {
      description:
        "Clips overflowing text with an ellipsis (`text-overflow: ellipsis`). Requires the element or a parent to have a defined width.",
      control: "boolean",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Text>;

export const Default: Story = {
  args: { children: "The quick brown fox jumps over the lazy dog." },
  parameters: {
    docs: {
      description: {
        story:
          "Default `body` variant. Use the Controls panel to explore variants, weights and alignment.",
      },
    },
  },
};

export const Variants: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "All 6 typographic variants. `code` renders with a monospace font and a surface-colored background for inline code snippets.",
      },
    },
  },
  render: () => (
    <div className="flex flex-col gap-3">
      {(["body", "lead", "small", "caption", "label"] as const).map((v) => (
        <Text key={v} variant={v}>
          {v.charAt(0).toUpperCase() + v.slice(1)} — The quick brown fox
        </Text>
      ))}
      <Text variant="code">const answer = 42;</Text>
    </div>
  ),
};

export const Weights: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "All 4 weight values. Weights override the intrinsic weight of the variant, so `label` + `bold` creates a heavy label.",
      },
    },
  },
  render: () => (
    <div className="flex flex-col gap-2">
      {(["normal", "medium", "semibold", "bold"] as const).map((w) => (
        <Text key={w} weight={w}>
          Weight {w}
        </Text>
      ))}
    </div>
  ),
};

export const Truncated: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "`truncate` applies `white-space: nowrap; overflow: hidden; text-overflow: ellipsis`. The parent must have a constrained width for this to take effect.",
      },
    },
  },
  render: () => (
    <div className="w-48">
      <Text truncate>
        This very long text will be truncated at the container boundary.
      </Text>
    </div>
  ),
};

export const PolymorphicHeading: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "The `as` prop swaps the rendered HTML element without changing visual styles. Use this to keep semantic heading hierarchy correct in the document outline while controlling appearance via `variant`.",
      },
    },
  },
  render: () => (
    <div className="flex flex-col gap-2">
      <Text as="h1" variant="lead" weight="bold">
        H1 via as prop
      </Text>
      <Text as="h2" variant="body" weight="semibold">
        H2 via as prop
      </Text>
      <Text as="span" variant="caption">
        span via as prop
      </Text>
    </div>
  ),
};
