import type { Meta, StoryObj } from "@storybook/react-vite";
import { Spinner } from "./Spinner";

const meta: Meta<typeof Spinner> = {
  title: "Atoms/Spinner",
  component: Spinner,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          'Accessible loading indicator atom. Renders a `role="status"` wrapper with an `aria-label` for screen readers and an `aria-hidden` inner element for the visual spin animation.\n\n' +
          '**A11y:** Always provide a meaningful `label` — the default `"Loading"` covers most cases but you can pass contextual text like `"Saving changes"` when needed.',
      },
    },
  },
  argTypes: {
    size: {
      description: "Diameter of the spinner using the shared size scale.",
      control: "select",
      options: ["xs", "sm", "md", "lg", "xl"],
      table: {
        type: { summary: "'xs' | 'sm' | 'md' | 'lg' | 'xl'" },
        defaultValue: { summary: "'md'" },
      },
    },
    variant: {
      description:
        "Color of the spinner track.\n\n" +
        "| Value | Description |\n" +
        "|---|---|\n" +
        "| `current` | Inherits `color` from parent (composable in buttons, etc) |\n" +
        "| `primary` | Brand blue |\n" +
        "| `muted` | Neutral grey |\n" +
        "| `destructive` | Error red |\n" +
        "| `white` | Force white (use on dark backgrounds) |",
      control: "select",
      options: ["current", "primary", "muted", "destructive", "white"],
      table: {
        type: {
          summary: "'current' | 'primary' | 'muted' | 'destructive' | 'white'",
        },
        defaultValue: { summary: "'current'" },
      },
    },
    label: {
      description:
        'Screen reader accessible label announced via `aria-label` on the `role="status"` element.',
      control: "text",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: '"Loading"' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Spinner>;

export const Default: Story = {
  args: { size: "md", variant: "primary" },
  parameters: {
    docs: {
      description: {
        story:
          "Default `md` size with `primary` variant. Use the Controls panel to explore all combinations.",
      },
    },
  },
};

export const Sizes: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "All 5 sizes from `xs` (12px) to `xl` (32px). Match the spinner size to its surrounding context — use `sm` inside form fields, `lg` for full-section loaders.",
      },
    },
  },
  render: () => (
    <div className="flex items-center gap-4">
      {(["xs", "sm", "md", "lg", "xl"] as const).map((s) => (
        <Spinner key={s} size={s} variant="primary" label={`Loading — ${s}`} />
      ))}
    </div>
  ),
};

export const Variants: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Color variants. `current` inherits `color` from its parent, making it composable inside buttons or text without extra props.",
      },
    },
  },
  render: () => (
    <div className="flex items-center gap-4 flex-wrap">
      <Spinner size="lg" variant="primary" label="Loading primary" />
      <Spinner size="lg" variant="muted" label="Loading muted" />
      <Spinner size="lg" variant="destructive" label="Loading destructive" />
      <span className="bg-[var(--color-fw-primary)] p-2 rounded-md inline-flex">
        <Spinner size="lg" variant="white" label="Loading white" />
      </span>
    </div>
  ),
};

export const InContext: Story = {
  parameters: {
    docs: {
      description: {
        story:
          '`variant="current"` composing with parent text color — no extra props needed.',
      },
    },
  },
  render: () => (
    <div className="flex flex-col gap-3">
      <p className="text-[var(--color-fw-primary-text)] flex items-center gap-2 text-sm">
        <Spinner size="sm" />
        Loading your data…
      </p>
      <p className="text-[var(--color-fw-muted)] flex items-center gap-2 text-sm">
        <Spinner size="sm" />
        Syncing…
      </p>
    </div>
  ),
};
