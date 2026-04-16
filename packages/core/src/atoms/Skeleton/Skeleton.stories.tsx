import type { Meta, StoryObj } from "@storybook/react-vite";
import { Skeleton } from "./Skeleton";

const meta: Meta<typeof Skeleton> = {
  title: "Atoms/Skeleton",
  component: Skeleton,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "A pure CSS loading placeholder atom. Renders `aria-hidden` so screen readers skip it.\n\n" +
          '**A11y pattern:** Wrap skeletons in a container with `aria-busy="true"` and `aria-label` ' +
          "to communicate the loading state to assistive technology.\n\n" +
          "**Dimensions:** `text` ships with sensible defaults (`h-4 w-full`). " +
          "For `circle` and `rect`, pass the size via `className`:\n\n" +
          "```tsx\n" +
          '<Skeleton shape="circle" className="size-10" />\n' +
          '<Skeleton shape="rect"   className="h-48"    />\n' +
          "```\n\n" +
          "**Animation:** `pulse` (default) fades opacity. `shimmer` sweeps a gradient — great for " +
          "card-level placeholders. `none` disables animation when a parent boundary owns the transition.",
      },
    },
  },
  argTypes: {
    shape: {
      description: "Geometry of the placeholder.",
      control: "select",
      options: ["text", "circle", "rect"],
      table: {
        type: { summary: "'text' | 'circle' | 'rect'" },
        defaultValue: { summary: "'text'" },
      },
    },
    animate: {
      description: "Loading feedback animation.",
      control: "select",
      options: ["pulse", "shimmer", "none"],
      table: {
        type: { summary: "'pulse' | 'shimmer' | 'none'" },
        defaultValue: { summary: "'pulse'" },
      },
    },
    className: {
      description:
        "Pass sizing classes here — e.g. `size-10` for circles, `h-48` for rects.",
      control: "text",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Skeleton>;

// ─── Single playground ───────────────────────────────────────────────────────

export const Default: Story = {
  args: { shape: "text" },
  decorators: [
    (Story) => (
      <div style={{ width: "320px" }}>
        <Story />
      </div>
    ),
  ],
};

// ─── All shapes ──────────────────────────────────────────────────────────────

export const Shapes: Story = {
  render: () => (
    <div
      role="status"
      className="flex flex-col gap-6"
      style={{ width: "320px" }}
      aria-busy="true"
      aria-label="Loading content"
    >
      <div className="flex flex-col gap-1">
        <p className="text-xs text-[var(--color-fw-muted)] mb-2">
          text (default)
        </p>
        <Skeleton shape="text" />
      </div>

      <div className="flex flex-col gap-1">
        <p className="text-xs text-[var(--color-fw-muted)] mb-2">circle</p>
        <Skeleton shape="circle" className="size-12" />
      </div>

      <div className="flex flex-col gap-1">
        <p className="text-xs text-[var(--color-fw-muted)] mb-2">rect</p>
        <Skeleton shape="rect" className="h-32" />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Three shape variants. Pair `circle` and `rect` with sizing classes.",
      },
    },
  },
};

// ─── Paragraph placeholder ───────────────────────────────────────────────────

export const ParagraphPlaceholder: Story = {
  render: () => (
    <div
      role="status"
      className="flex flex-col gap-2"
      style={{ width: "360px" }}
      aria-busy="true"
      aria-label="Loading article"
    >
      <Skeleton shape="text" />
      <Skeleton shape="text" />
      <Skeleton shape="text" className="w-5/6" />
      <Skeleton shape="text" className="w-3/4" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Simulate a text paragraph by stacking text skeletons with varying widths. " +
          "The last line is intentionally shorter for a natural look.",
      },
    },
  },
};

// ─── Card placeholder ─────────────────────────────────────────────────────────

export const CardPlaceholder: Story = {
  render: () => (
    <div
      role="status"
      className="w-[320px] rounded-xl border border-[var(--color-fw-border)] overflow-hidden"
      aria-busy="true"
      aria-label="Loading card"
    >
      {/* Cover image */}
      <Skeleton shape="rect" className="h-44 rounded-none" />

      <div className="p-4 flex flex-col gap-4">
        {/* Author row */}
        <div className="flex items-center gap-3">
          <Skeleton shape="circle" className="size-9 shrink-0" />
          <div className="flex-1 flex flex-col gap-1.5">
            <Skeleton shape="text" className="w-1/2" />
            <Skeleton shape="text" className="w-1/3 h-3" />
          </div>
        </div>

        {/* Body */}
        <div className="flex flex-col gap-2">
          <Skeleton shape="text" />
          <Skeleton shape="text" />
          <Skeleton shape="text" className="w-4/5" />
        </div>

        {/* Action row */}
        <div className="flex gap-2 pt-1">
          <Skeleton shape="rect" className="h-8 w-20 rounded-md" />
          <Skeleton shape="rect" className="h-8 w-16 rounded-md" />
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "A real-world composition: cover image, author avatar, body text and action buttons " +
          "all replaced with skeleton placeholders.",
      },
    },
  },
};

// ─── Profile list placeholder ────────────────────────────────────────────────

export const ProfileList: Story = {
  render: () => (
    <div
      role="status"
      className="w-[360px] flex flex-col divide-y divide-[var(--color-fw-border)]"
      aria-busy="true"
      aria-label="Loading profiles"
    >
      {Array.from({ length: 4 }, (_, i) => (
        <div key={i} className="flex items-center gap-3 py-3">
          <Skeleton shape="circle" className="size-10 shrink-0" />
          <div className="flex-1 flex flex-col gap-1.5">
            <Skeleton shape="text" className="w-2/5" />
            <Skeleton shape="text" className="w-3/5 h-3" />
          </div>
          <Skeleton shape="rect" className="h-7 w-14 rounded-full shrink-0" />
        </div>
      ))}
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "A list of profile rows. Each row has an avatar, two text lines and a badge-sized action.",
      },
    },
  },
};

// ─── Animation variants ──────────────────────────────────────────────────────

export const AnimationVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-8" style={{ width: "360px" }}>
      {(["pulse", "shimmer", "none"] as const).map((anim) => (
        <div
          key={anim}
          aria-busy={anim !== "none"}
          aria-label={`Loading (${anim})`}
        >
          <p className="text-xs text-[var(--color-fw-muted)] mb-3">
            animate=&quot;{anim}&quot;
          </p>
          <div className="flex flex-col gap-2">
            <Skeleton animate={anim} shape="text" />
            <Skeleton animate={anim} shape="text" className="w-4/5" />
            <Skeleton animate={anim} shape="text" className="w-3/5" />
          </div>
        </div>
      ))}
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "`pulse` fades the entire placeholder. `shimmer` sweeps a gradient left-to-right — " +
          "preferred for larger placeholders like images and cards. `none` disables animation.",
      },
    },
  },
};
