import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Rating } from "./Rating";

const meta: Meta<typeof Rating> = {
  title: "Molecules/Rating",
  component: Rating,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "A star-picker molecule that composes native radio inputs with a visual SVG overlay.\n\n" +
          "## Design decisions\n\n" +
          "| Decision | Rationale |\n" +
          "|---|---|\n" +
          '| `<fieldset>` + `<input type="radio">` | Native keyboard nav (arrows), WCAG 2.2 AA out of the box |\n' +
          "| `@preact/signals-react` `useSignal` | Hover preview without re-rendering the whole component tree |\n" +
          "| Controlled **and** uncontrolled | Works as a form field or standalone display |\n" +
          "| `label` required prop | Forces an accessible group name — no hardcoded strings |\n" +
          '| Deselect on same-star click | `onChange(0)` — useful for "clear rating" UX |\n' +
          "| `getValueText` / `getStarLabel` | Full i18n support — consumers supply translated functions |\n\n" +
          "## Keyboard\n\n" +
          "- `Tab` — enters/exits the widget\n" +
          "- `→` / `↑` — increases value\n" +
          "- `←` / `↓` — decreases value\n" +
          "- `Space` — selects focused star\n" +
          "- Click on current star — deselects (value resets to 0)\n",
      },
    },
  },
  argTypes: {
    label: {
      description:
        "Required accessible label for the `<fieldset>` group. " +
        "Announced by screen readers. Never hardcoded — always a prop.",
      control: "text",
    },
    value: {
      description:
        "Controlled value (`0` = nothing selected, `1..max` = N stars).",
      control: { type: "number", min: 0, max: 10 },
    },
    defaultValue: {
      description: "Uncontrolled initial value.",
      control: { type: "number", min: 0, max: 10 },
    },
    max: {
      description: "Number of stars to render.",
      control: { type: "number", min: 1, max: 10 },
      table: { defaultValue: { summary: "5" } },
    },
    size: {
      description: "Star size.",
      control: "select",
      options: ["sm", "md", "lg"],
      table: { defaultValue: { summary: "'md'" } },
    },
    readonly: {
      description: "Display-only — no hover or click interaction.",
      control: "boolean",
      table: { defaultValue: { summary: "false" } },
    },
    disabled: {
      description: "Greyed-out and non-operable.",
      control: "boolean",
      table: { defaultValue: { summary: "false" } },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Rating>;

// ─── Playground ───────────────────────────────────────────────────────────────

export const Default: Story = {
  args: {
    label: "Rate this product",
    defaultValue: 0,
  },
};

// ─── Controlled ───────────────────────────────────────────────────────────────

export const Controlled: Story = {
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [value, setValue] = useState(3);
    return (
      <div className="flex flex-col gap-4">
        <Rating label="Your rating" value={value} onChange={setValue} />
        <p className="text-sm text-[var(--color-fw-muted)]">
          Selected:{" "}
          {value === 0
            ? "none"
            : `${String(value)} star${value !== 1 ? "s" : ""}`}
        </p>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => {
              setValue(0);
            }}
            className="text-xs underline text-[var(--color-fw-muted)]"
          >
            Clear
          </button>
          {[1, 2, 3, 4, 5].map((v) => (
            <button
              key={v}
              type="button"
              onClick={() => {
                setValue(v);
              }}
              className="text-xs underline text-[var(--color-fw-primary)]"
            >
              Set {v}
            </button>
          ))}
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "Fully controlled mode — `value` + `onChange`. " +
          "Use the buttons below to set the value externally. " +
          "Click the current star to deselect (`onChange(0)`).",
      },
    },
  },
};

// ─── All sizes ────────────────────────────────────────────────────────────────

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      {(["sm", "md", "lg"] as const).map((size) => (
        <div key={size} className="flex items-center gap-3">
          <span className="text-xs w-6 text-[var(--color-fw-muted)]">
            {size}
          </span>
          <Rating label={`Rating size ${size}`} defaultValue={3} size={size} />
        </div>
      ))}
    </div>
  ),
};

// ─── Readonly ─────────────────────────────────────────────────────────────────

export const Readonly: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      {[1, 2, 3, 4, 5].map((v) => (
        <div key={v} className="flex items-center gap-3">
          <Rating
            label={`${String(v)} out of 5`}
            value={v}
            readonly
            size="sm"
          />
          <span className="text-sm text-[var(--color-fw-muted)]">{v} / 5</span>
        </div>
      ))}
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "`readonly` mode — no hover or click. " +
          "Ideal for displaying average ratings in cards or review lists.",
      },
    },
  },
};

// ─── Disabled ─────────────────────────────────────────────────────────────────

export const Disabled: Story = {
  args: {
    label: "Rating (disabled)",
    value: 3,
    disabled: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          "`disabled` — all inputs are greyed out and removed from tab order.",
      },
    },
  },
};

// ─── Custom max ───────────────────────────────────────────────────────────────

export const CustomMax: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div>
        <p className="text-xs text-[var(--color-fw-muted)] mb-1">max=3</p>
        <Rating label="Rate 1–3" max={3} defaultValue={2} />
      </div>
      <div>
        <p className="text-xs text-[var(--color-fw-muted)] mb-1">max=7</p>
        <Rating label="Rate 1–7" max={7} defaultValue={5} />
      </div>
      <div>
        <p className="text-xs text-[var(--color-fw-muted)] mb-1">max=10</p>
        <Rating label="Rate 1–10" max={10} defaultValue={8} size="sm" />
      </div>
    </div>
  ),
};

// ─── i18n (localised labels) ─────────────────────────────────────────────────

export const I18n: Story = {
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [value, setValue] = useState(0);
    return (
      <div className="flex flex-col gap-2">
        <Rating
          label="Califica este producto"
          value={value}
          onChange={setValue}
          getStarLabel={(v) => `${String(v)} estrella${v !== 1 ? "s" : ""}`}
          getValueText={(v, m) =>
            v === 0
              ? "Sin calificación"
              : `${String(v)} de ${String(m)} estrellas`
          }
        />
        <p className="text-xs text-[var(--color-fw-muted)]">
          {value === 0 ? "Sin calificación" : `${String(value)} de 5 estrellas`}
        </p>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "All text is injected via `getStarLabel` and `getValueText` — " +
          "no hardcoded English strings. Supply translated functions from your i18n layer.",
      },
    },
  },
};

// ─── In a review form (real-world) ───────────────────────────────────────────

export const ReviewForm: Story = {
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [rating, setRating] = useState(0);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [submitted, setSubmitted] = useState(false);

    if (submitted) {
      return (
        <div className="text-sm text-[var(--color-fw-success)]">
          Thank you! You rated this {rating} star{rating !== 1 ? "s" : ""}.
        </div>
      );
    }

    return (
      <form
        className="flex flex-col gap-4 p-4 w-80 rounded-xl border border-[var(--color-fw-border)] bg-[var(--color-fw-surface)]"
        onSubmit={(e) => {
          e.preventDefault();
          setSubmitted(true);
        }}
      >
        <h3 className="font-semibold text-sm text-[var(--color-fw-foreground)]">
          Write a review
        </h3>

        <div className="flex flex-col gap-1">
          <p className="text-xs font-medium text-[var(--color-fw-foreground)]">
            Overall rating
            <span
              className="text-[var(--color-fw-destructive)] ml-0.5"
              aria-hidden="true"
            >
              *
            </span>
          </p>
          <Rating
            label="Overall rating (required)"
            value={rating}
            onChange={setRating}
            size="lg"
          />
          {rating === 0 && (
            <p className="text-xs text-[var(--color-fw-muted)]">
              Select at least 1 star to submit
            </p>
          )}
        </div>

        <textarea
          placeholder="Share your thoughts (optional)"
          className="text-sm rounded-lg border border-[var(--color-fw-border)] bg-[var(--color-fw-background)] p-2.5 h-20 resize-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fw-ring"
          aria-label="Review text (optional)"
        />

        <button
          type="submit"
          disabled={rating === 0}
          className="rounded-lg bg-[var(--color-fw-primary)] text-[var(--color-fw-primary-fg)] text-sm font-medium h-9 px-4 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[var(--color-fw-primary-hover)] transition-colors"
        >
          Submit review
        </button>
      </form>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "Real-world: a review form with a required rating field. " +
          "Submit is disabled until at least 1 star is selected.",
      },
    },
  },
};

// ─── Product card (display) ──────────────────────────────────────────────────

export const ProductCard: Story = {
  render: () => {
    const products = [
      { name: "Mechanical Keyboard", rating: 4, reviews: 128 },
      { name: "USB-C Hub", rating: 3, reviews: 64 },
      { name: "Monitor Stand", rating: 5, reviews: 312 },
    ];

    return (
      <div className="flex flex-col gap-3 w-64">
        {products.map((p) => (
          <div
            key={p.name}
            className="flex flex-col gap-1 p-3 rounded-xl border border-[var(--color-fw-border)]"
          >
            <p className="text-sm font-medium text-[var(--color-fw-foreground)]">
              {p.name}
            </p>
            <div className="flex items-center gap-2">
              <Rating
                label={`Rating for ${p.name}`}
                value={p.rating}
                readonly
                size="sm"
              />
              <span className="text-xs text-[var(--color-fw-muted)]">
                ({p.reviews})
              </span>
            </div>
          </div>
        ))}
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "Read-only `Rating` used inside product cards to display aggregate ratings. " +
          "Each instance has a unique `label` prop for screen reader context.",
      },
    },
  },
};

// ─── Decimal fills (display-only) ────────────────────────────────────────────────

export const Decimals: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      {[0.3, 0.7, 1.5, 2.3, 3.0, 3.7, 4.1, 4.9, 5].map((v) => (
        <div key={v} className="flex items-center gap-4">
          <Rating label={`${String(v)} out of 5`} value={v} readonly />
          <span className="text-xs tabular-nums text-[var(--color-fw-muted)] w-8">
            {String(v)}
          </span>
        </div>
      ))}
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Decimal `value` support for display-only contexts (e.g. average product score). " +
          "Each star shows a proportional fill via a CSS clip-width overlay — no rounding applied. " +
          "Clicking stars in interactive mode still produces whole numbers only.",
      },
    },
  },
};
