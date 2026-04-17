import type { Meta, StoryObj } from "@storybook/react-vite";
import { Logo } from "./Logo";

const meta: Meta<typeof Logo> = {
  title: "Atoms/Logo",
  component: Logo,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "The FluxWind wordmark/icon rendered as an inline SVG. " +
          "No external assets — zero fetch, fully tree-shakeable, works offline.\n\n" +
          "**Accessibility:** pass `label` to turn the SVG into a meaningful image " +
          '(`role="img"`, `<title>`, `aria-label`). ' +
          "Omit `label` when the logo is decorative and nearby text already names the brand " +
          '(`aria-hidden="true"`).',
      },
    },
  },
  argTypes: {
    size: {
      description:
        "Controls the rendered `width` and `height` via the shared `sizeMap` token.",
      control: "select",
      options: ["xs", "sm", "md", "lg", "xl"],
      table: {
        type: { summary: "'xs' | 'sm' | 'md' | 'lg' | 'xl'" },
        defaultValue: { summary: "'md'" },
      },
    },
    label: {
      description:
        'Accessible name for the logo. When provided, adds `role="img"`, `aria-label`, and `<title>`. ' +
        "Omit for decorative usage.",
      control: "text",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "undefined" },
      },
    },
    className: {
      description:
        "Additional Tailwind classes applied to the `<svg>` element.",
      control: "text",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Logo>;

// ─── Default ──────────────────────────────────────────────────────────────────

export const Default: Story = {
  args: { size: "md" },
  parameters: {
    docs: {
      description: {
        story:
          "Default `md` size, no label → decorative (`aria-hidden`). " +
          "Use when the surrounding layout already names the brand.",
      },
    },
  },
};

// ─── Labelled ─────────────────────────────────────────────────────────────────

export const AriaLabelled: Story = {
  args: { size: "md", label: "FluxWind" },
  parameters: {
    docs: {
      description: {
        story:
          '`label` provided → `role="img"` + `aria-label` + `<title>` on the SVG. ' +
          "**Not a visible text label** — the brand name is only exposed to screen readers. " +
          "**Required** when the logo is the only identifier of the brand on the page and no visible text names it.",
      },
    },
  },
};

// ─── Sizes ────────────────────────────────────────────────────────────────────

export const Sizes: Story = {
  parameters: {
    docs: {
      description: {
        story: "All 5 sizes mapped to the shared `sizeMap` token.",
      },
    },
  },
  render: () => (
    <div className="flex flex-wrap items-end gap-6">
      {(["xs", "sm", "md", "lg", "xl"] as const).map((s) => (
        <div key={s} className="flex flex-col items-center gap-2">
          <Logo size={s} label={`FluxWind logo ${s}`} />
          <span className="text-xs text-[var(--color-fw-neutral-500)]">
            {s}
          </span>
        </div>
      ))}
    </div>
  ),
};

// ─── On dark background ───────────────────────────────────────────────────────

export const OnDark: Story = {
  parameters: {
    backgrounds: { default: "dark" },
    docs: {
      description: {
        story:
          "The logo uses solid fill colors that work on both light and dark backgrounds without modification.",
      },
    },
  },
  render: () => (
    <div className="bg-[#111] p-6 rounded-xl inline-flex gap-4 items-end">
      {(["sm", "md", "lg"] as const).map((s) => (
        <Logo key={s} size={s} label="FluxWind" />
      ))}
    </div>
  ),
};
