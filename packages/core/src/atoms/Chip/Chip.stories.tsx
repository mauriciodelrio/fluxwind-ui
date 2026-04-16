import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Tag, Hash, Code } from "lucide-react";
import { Icon } from "@/atoms/Icon";
import { Chip } from "./Chip";

const meta: Meta<typeof Chip> = {
  title: "Atoms/Chip",
  component: Chip,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "An interactive label atom — the interactive counterpart to `Badge`.\n\n" +
          "| | Badge | Chip |\n" +
          "|---|---|---|\n" +
          "| Interactive | ✗ | ✓ |\n" +
          "| Dismissible | ✗ | ✓ |\n" +
          "| Hover state | ✗ | Always |\n" +
          "| Element | `<span>` | `<span>` or `<button>` |\n\n" +
          "**onClick:** makes the entire chip a `<button>` — ideal for filter toggles.\n\n" +
          '**onDismiss:** adds an `×` button with `aria-label="Remove {label}"` — ' +
          "ideal for tag lists and multi-select inputs.\n\n" +
          "Both can coexist: a clickable chip that is also independently dismissible.",
      },
    },
  },
  argTypes: {
    label: {
      description: "Text label rendered inside the chip.",
      control: "text",
    },
    variant: {
      description: "Colour variant.",
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
    size: {
      description: "Size of the chip.",
      control: "select",
      options: ["sm", "md", "lg"],
      table: {
        type: { summary: "'sm' | 'md' | 'lg'" },
        defaultValue: { summary: "'md'" },
      },
    },
    radius: {
      description: "Corner radius.",
      control: "select",
      options: ["none", "sm", "md", "lg", "full"],
      table: {
        type: { summary: "'none' | 'sm' | 'md' | 'lg' | 'full'" },
        defaultValue: { summary: "'full'" },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Chip>;

// ─── Playground ───────────────────────────────────────────────────────────────

export const Default: Story = {
  args: { label: "React" },
};

// ─── All variants ─────────────────────────────────────────────────────────────

export const Variants: Story = {
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
        <Chip key={v} label={v} variant={v} />
      ))}
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "All colour variants in their static (non-dismissible) form.",
      },
    },
  },
};

// ─── Sizes ───────────────────────────────────────────────────────────────────

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <Chip label="Small" size="sm" />
      <Chip label="Medium" size="md" />
      <Chip label="Large" size="lg" />
    </div>
  ),
};

// ─── With icon ────────────────────────────────────────────────────────────────

export const WithIcon: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Chip
        label="TypeScript"
        icon={<Icon icon={Code} size="sm" />}
        variant="primary"
      />
      <Chip label="Tag" icon={<Icon icon={Tag} size="sm" />} />
      <Chip
        label="Topic"
        icon={<Icon icon={Hash} size="sm" />}
        variant="outline"
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Leading icon slot — pass any Lucide component via `<Icon icon={...} />`.",
      },
    },
  },
};

// ─── Dismissible ─────────────────────────────────────────────────────────────

export const Dismissible: Story = {
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [tags, setTags] = useState([
      "React",
      "TypeScript",
      "Tailwind",
      "Vite",
      "Vitest",
    ]);
    const remove = (tag: string) => {
      setTags((prev) => prev.filter((t) => t !== tag));
    };

    return (
      <div
        className="flex flex-wrap gap-2"
        role="group"
        aria-label="Selected technologies"
      >
        {tags.map((tag) => (
          <Chip
            key={tag}
            label={tag}
            onDismiss={() => {
              remove(tag);
            }}
          />
        ))}
        {tags.length === 0 && (
          <span className="text-sm text-[var(--color-fw-muted)]">
            All tags removed
          </span>
        )}
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'Dismissible chips — each has an `×` button with `aria-label="Remove {label}"`. ' +
          "Click any chip to remove it from the list.",
      },
    },
  },
};

// ─── Clickable (filter toggle) ───────────────────────────────────────────────

export const FilterToggle: Story = {
  render: () => {
    const filters = ["Frontend", "Backend", "DevOps", "Design", "Mobile"];
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [active, setActive] = useState<string[]>(["Frontend"]);
    const toggle = (f: string) => {
      setActive((prev) =>
        prev.includes(f) ? prev.filter((x) => x !== f) : [...prev, f],
      );
    };

    return (
      <div className="flex flex-col gap-4">
        <div
          className="flex flex-wrap gap-2"
          role="group"
          aria-label="Filter by category"
        >
          {filters.map((f) => (
            <Chip
              key={f}
              label={f}
              variant={active.includes(f) ? "primary" : "default"}
              onClick={() => {
                toggle(f);
              }}
              aria-pressed={active.includes(f)}
            />
          ))}
        </div>
        <p className="text-xs text-[var(--color-fw-muted)]">
          Active: {active.length === 0 ? "none" : active.join(", ")}
        </p>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "When `onClick` is provided the chip root becomes a `<button>`. " +
          "Pair with `aria-pressed` for toggle semantics — active chips use the `primary` variant.",
      },
    },
  },
};

// ─── Dismissible + icon ──────────────────────────────────────────────────────

export const TagInput: Story = {
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [tags, setTags] = useState(["react", "typescript", "node"]);
    const remove = (tag: string) => {
      setTags((prev) => prev.filter((t) => t !== tag));
    };

    return (
      <div
        className="flex flex-wrap gap-1.5 p-2.5 min-h-[2.5rem] rounded-lg border border-[var(--color-fw-border)] w-72"
        role="group"
        aria-label="Tags"
      >
        {tags.map((tag) => (
          <Chip
            key={tag}
            label={tag}
            icon={<Icon icon={Hash} size="sm" />}
            onDismiss={() => {
              remove(tag);
            }}
            size="sm"
            variant="outline"
          />
        ))}
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "Simulates a tag-input field container — small `outline` chips with a `#` icon and dismiss button.",
      },
    },
  },
};

// ─── All variants dismissible ────────────────────────────────────────────────

export const AllVariantsDismissible: Story = {
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
        <Chip key={v} label={v} variant={v} onDismiss={() => {}} />
      ))}
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "All variants with dismiss button — verify × button color contrast per variant.",
      },
    },
  },
};
