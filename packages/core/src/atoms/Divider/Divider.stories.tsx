import type { Meta, StoryObj } from "@storybook/react-vite";
import { Divider } from "./Divider";

const meta: Meta<typeof Divider> = {
  title: "Atoms/Divider",
  component: Divider,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "A semantic separator atom.\n\n" +
          "**Horizontal (default):** renders a native `<hr>` — the most semantic choice. " +
          'Add `label` to get a centered text divider (e.g. *"or"* in auth forms).\n\n' +
          "**Vertical:** place inside a `flex` row container — `self-stretch` makes the line fill the parent height automatically.\n\n" +
          "```tsx\n" +
          "<Divider />\n" +
          '<Divider label="or" />\n' +
          '<Divider orientation="vertical" />\n' +
          '<Divider variant="dashed" spacing="lg" />\n' +
          "```",
      },
    },
  },
  argTypes: {
    orientation: {
      description: "Horizontal (default) or vertical.",
      control: "select",
      options: ["horizontal", "vertical"],
      table: {
        type: { summary: "'horizontal' | 'vertical'" },
        defaultValue: { summary: "'horizontal'" },
      },
    },
    variant: {
      description: "Border style.",
      control: "select",
      options: ["solid", "dashed", "dotted"],
      table: {
        type: { summary: "'solid' | 'dashed' | 'dotted'" },
        defaultValue: { summary: "'solid'" },
      },
    },
    spacing: {
      description: "`my-*` for horizontal, `mx-*` for vertical.",
      control: "select",
      options: ["none", "sm", "md", "lg"],
      table: {
        type: { summary: "'none' | 'sm' | 'md' | 'lg'" },
        defaultValue: { summary: "'md'" },
      },
    },
    label: {
      description: "Text rendered in the center (horizontal only).",
      control: "text",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Divider>;

// ─── Playground ───────────────────────────────────────────────────────────────

export const Default: Story = {
  args: {},
  decorators: [
    (Story) => (
      <div style={{ width: "360px" }}>
        <p className="text-sm text-[var(--color-fw-foreground)] mb-0">
          Above the divider
        </p>
        <Story />
        <p className="text-sm text-[var(--color-fw-foreground)] mt-0">
          Below the divider
        </p>
      </div>
    ),
  ],
};

// ─── Variants ─────────────────────────────────────────────────────────────────

export const Variants: Story = {
  render: () => (
    <div className="flex flex-col gap-6" style={{ width: "360px" }}>
      {(["solid", "dashed", "dotted"] as const).map((v) => (
        <div key={v}>
          <p className="text-xs text-[var(--color-fw-muted)] mb-3">
            variant=&quot;{v}&quot;
          </p>
          <Divider variant={v} spacing="none" />
        </div>
      ))}
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Three border styles — solid, dashed, and dotted.",
      },
    },
  },
};

// ─── Spacing ─────────────────────────────────────────────────────────────────

export const Spacing: Story = {
  render: () => (
    <div className="flex flex-col" style={{ width: "360px" }}>
      {(["none", "sm", "md", "lg"] as const).map((s) => (
        <div
          key={s}
          className="border border-dashed border-[var(--color-fw-border)] rounded px-2"
        >
          <p className="text-xs text-[var(--color-fw-muted)]">
            spacing=&quot;{s}&quot;
          </p>
          <Divider spacing={s} />
          <p className="text-xs text-[var(--color-fw-muted)]">next section</p>
        </div>
      ))}
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Spacing controls the `my-*` margin around the divider.",
      },
    },
  },
};

// ─── Labeled ─────────────────────────────────────────────────────────────────

export const WithLabel: Story = {
  render: () => (
    <div className="flex flex-col gap-6" style={{ width: "360px" }}>
      <Divider label="or" />
      <Divider label="continue with" />
      <Divider label="or" variant="dashed" />
      <Divider label="or" variant="dotted" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "A text label centred between two hairlines — the classic auth form separator. " +
          "The label span is rendered visually and used as the separator's accessible name via its text content.",
      },
    },
  },
};

// ─── Vertical ─────────────────────────────────────────────────────────────────

export const Vertical: Story = {
  render: () => (
    <div className="flex flex-col gap-8">
      {/* Toolbar row */}
      <div>
        <p className="text-xs text-[var(--color-fw-muted)] mb-3">Toolbar</p>
        <div className="inline-flex items-center h-9 gap-1 px-2 rounded-lg border border-[var(--color-fw-border)]">
          {(["B", "I", "U"] as const).map((f, i) => (
            <button
              key={f}
              className="size-7 rounded text-sm font-medium hover:bg-[var(--color-fw-surface)] transition-colors"
              style={{
                fontStyle: f === "I" ? "italic" : "normal",
                textDecoration: f === "U" ? "underline" : "none",
              }}
            >
              {f}
              {i === 2 && null}
            </button>
          ))}
          <Divider orientation="vertical" spacing="sm" />
          {(["←", "↔", "→"] as const).map((a) => (
            <button
              key={a}
              className="size-7 rounded text-sm hover:bg-[var(--color-fw-surface)] transition-colors"
            >
              {a}
            </button>
          ))}
        </div>
      </div>

      {/* Stat row */}
      <div>
        <p className="text-xs text-[var(--color-fw-muted)] mb-3">Stat row</p>
        <div className="flex items-stretch gap-0">
          {[
            { label: "Commits", value: "1,204" },
            { label: "Branches", value: "12" },
            { label: "Releases", value: "8" },
          ].map((stat, i) => (
            <div key={stat.label} className="flex items-stretch">
              {i > 0 && <Divider orientation="vertical" spacing="md" />}
              <div className="flex flex-col items-center px-4">
                <span className="text-lg font-semibold text-[var(--color-fw-foreground)]">
                  {stat.value}
                </span>
                <span className="text-xs text-[var(--color-fw-muted)]">
                  {stat.label}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Variant showcase */}
      <div>
        <p className="text-xs text-[var(--color-fw-muted)] mb-3">
          Border variants
        </p>
        <div className="flex items-stretch h-10 gap-0">
          {(["solid", "dashed", "dotted"] as const).map((v, i) => (
            <div key={v} className="flex items-stretch">
              {i > 0 && (
                <Divider orientation="vertical" variant={v} spacing="md" />
              )}
              <span className="px-3 text-xs flex items-center text-[var(--color-fw-muted)]">
                {v}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Vertical dividers inside flex row containers. `self-stretch` fills the parent height — " +
          "no explicit height needed on the divider itself.",
      },
    },
  },
};

// ─── In context: login form ───────────────────────────────────────────────────

export const LoginFormContext: Story = {
  render: () => (
    <div
      className="flex flex-col gap-4 p-6 rounded-xl border border-[var(--color-fw-border)]"
      style={{ width: "360px" }}
    >
      <h2 className="text-base font-semibold text-[var(--color-fw-foreground)]">
        Sign in
      </h2>

      <button className="w-full h-10 rounded-lg border border-[var(--color-fw-border)] text-sm font-medium text-[var(--color-fw-foreground)] hover:bg-[var(--color-fw-surface)] transition-colors">
        Continue with Google
      </button>

      <Divider label="or" />

      <div className="flex flex-col gap-3">
        <input
          type="email"
          placeholder="Email"
          className="h-10 w-full rounded-lg border border-[var(--color-fw-border)] px-3 text-sm outline-none focus:ring-2 focus:ring-[var(--color-fw-ring)]"
        />
        <input
          type="password"
          placeholder="Password"
          className="h-10 w-full rounded-lg border border-[var(--color-fw-border)] px-3 text-sm outline-none focus:ring-2 focus:ring-[var(--color-fw-ring)]"
        />
        <button className="w-full h-10 rounded-lg bg-[var(--color-fw-primary)] text-[var(--color-fw-primary-fg)] text-sm font-medium hover:bg-[var(--color-fw-primary-hover)] transition-colors">
          Sign in
        </button>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'The canonical use case for a labeled divider: separating social auth from email/password in a login form. `<Divider label="or" />` is idiomatic for this pattern.',
      },
    },
  },
};
