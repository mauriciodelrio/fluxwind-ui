import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, within, userEvent } from "storybook/test";
import { Accordion } from "./Accordion";

const meta: Meta<typeof Accordion> = {
  title: "Atoms/Accordion",
  component: Accordion,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Collapsible disclosure atom built on native `<details>` / `<summary>` — zero-JS toggle.\n\n" +
          "**Root (`<Accordion>`)** wraps multiple items and provides shared `variant`, `size`, and `exclusive` context.\n\n" +
          "**Item (`<Accordion.Item>`)** can also be used standalone, without a Root wrapper.\n\n" +
          "**A11y:** `<details>` carries `role='group'` implicitly; `<summary>` carries `role='button'` implicitly. " +
          "No extra ARIA needed for basic disclosure. Disabled items expose `aria-disabled='true'` on the summary.",
      },
    },
  },
  argTypes: {
    variant: {
      description: "Visual style of the accordion wrapper.",
      control: "select",
      options: ["default", "bordered", "separated"],
      table: {
        type: { summary: "'default' | 'bordered' | 'separated'" },
        defaultValue: { summary: "'default'" },
      },
    },
    size: {
      description: "Controls padding and text size of all child items.",
      control: "select",
      options: ["sm", "md", "lg"],
      table: {
        type: { summary: "'sm' | 'md' | 'lg'" },
        defaultValue: { summary: "'md'" },
      },
    },
    exclusive: {
      description:
        "When `true`, opening one item closes all others (accordion behaviour). Managed via Preact Signals.",
      control: "boolean",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
  },
  args: {
    variant: "default",
    size: "md",
    exclusive: false,
  },
};

export default meta;
type Story = StoryObj<typeof Accordion>;

// ─── Default ──────────────────────────────────────────────────────────────────

export const Default: Story = {
  render: (args) => (
    <Accordion {...args}>
      <Accordion.Item trigger="What is FluxWind?">
        FluxWind is an open-source React component library built with Tailwind
        CSS 4 and TypeScript strict mode.
      </Accordion.Item>
      <Accordion.Item trigger="How do I install it?">
        Run <code>pnpm add @fluxwind/core</code> then import the CSS at the root
        of your app.
      </Accordion.Item>
      <Accordion.Item trigger="Is it accessible?">
        Yes. Components follow WCAG 2.2 AA using native HTML elements wherever
        possible.
      </Accordion.Item>
    </Accordion>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    // All items start closed
    const groups = canvas.getAllByRole("group");
    await expect(groups).toHaveLength(3);
  },
};

// ─── Bordered ─────────────────────────────────────────────────────────────────

export const Bordered: Story = {
  args: { variant: "bordered" },
  render: (args) => (
    <Accordion {...args}>
      <Accordion.Item trigger="Card-style accordion">
        All items share a single outer border and inner dividers.
      </Accordion.Item>
      <Accordion.Item trigger="Rounded corners included">
        The root wrapper clips its children with border-radius.
      </Accordion.Item>
      <Accordion.Item trigger="Great for settings panels">
        Use this variant inside cards or sidebar sections.
      </Accordion.Item>
    </Accordion>
  ),
};

// ─── Separated ────────────────────────────────────────────────────────────────

export const Separated: Story = {
  args: { variant: "separated" },
  render: (args) => (
    <Accordion {...args}>
      <Accordion.Item trigger="Each item is independent">
        Separated items have their own border and border-radius.
      </Accordion.Item>
      <Accordion.Item trigger="Spaced with gap">
        Use this variant for dashboards or step-by-step guides.
      </Accordion.Item>
      <Accordion.Item trigger="Works great with icons" icon={<span>📋</span>}>
        Icons appear on the left, the chevron stays on the right.
      </Accordion.Item>
    </Accordion>
  ),
};

// ─── Sizes ───────────────────────────────────────────────────────────────────

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-8">
      {(["sm", "md", "lg"] as const).map((size) => (
        <div key={size}>
          <p className="mb-2 text-xs font-semibold uppercase tracking-widest opacity-50">
            size: {size}
          </p>
          <Accordion size={size} variant="bordered">
            <Accordion.Item trigger={`Trigger — size ${size}`}>
              Panel content at size <strong>{size}</strong>.
            </Accordion.Item>
            <Accordion.Item trigger="Another item">
              More content here.
            </Accordion.Item>
          </Accordion>
        </div>
      ))}
    </div>
  ),
};

// ─── Exclusive ────────────────────────────────────────────────────────────────

export const Exclusive: Story = {
  args: { exclusive: true, variant: "separated" },
  render: (args) => (
    <Accordion {...args}>
      <Accordion.Item trigger="Option A" id="option-a">
        Content for option A. Opening another item will close this one.
      </Accordion.Item>
      <Accordion.Item trigger="Option B" id="option-b">
        Content for option B.
      </Accordion.Item>
      <Accordion.Item trigger="Option C" id="option-c">
        Content for option C.
      </Accordion.Item>
    </Accordion>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Click Option A — it should open
    await userEvent.click(canvas.getByText("Option A"));
    await expect(
      canvasElement.querySelector("details:nth-of-type(1)"),
    ).toHaveAttribute("open");

    // Click Option B — Option A should close, Option B opens
    await userEvent.click(canvas.getByText("Option B"));
    await expect(
      canvasElement.querySelector("details:nth-of-type(1)"),
    ).not.toHaveAttribute("open");
    await expect(
      canvasElement.querySelector("details:nth-of-type(2)"),
    ).toHaveAttribute("open");
  },
};

// ─── Disabled items ───────────────────────────────────────────────────────────

export const WithDisabledItem: Story = {
  render: () => (
    <Accordion variant="bordered">
      <Accordion.Item trigger="Available item">Open me freely.</Accordion.Item>
      <Accordion.Item trigger="Locked — unavailable in your plan" disabled>
        This content requires a Pro subscription.
      </Accordion.Item>
      <Accordion.Item trigger="Another available item">
        Open me too.
      </Accordion.Item>
    </Accordion>
  ),
};

// ─── With icons ───────────────────────────────────────────────────────────────

export const WithIcons: Story = {
  render: () => (
    <Accordion variant="separated">
      <Accordion.Item
        trigger="Shipping & delivery"
        icon={
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="h-4 w-4"
            aria-hidden="true"
          >
            <path d="M6.5 3a1 1 0 0 0-1 1v.268l-1.447.482A2 2 0 0 0 2.75 6.64V14.5a2 2 0 0 0 2 2h10.5a2 2 0 0 0 2-2V6.64a2 2 0 0 0-1.303-1.89L14.5 4.268V4a1 1 0 0 0-1-1h-7Z" />
          </svg>
        }
      >
        Orders typically ship within 1-2 business days.
      </Accordion.Item>
      <Accordion.Item
        trigger="Returns & refunds"
        icon={
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="h-4 w-4"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M7.793 2.232a.75.75 0 0 1-.025 1.06L3.622 7.25h10.003a5.375 5.375 0 0 1 0 10.75H10.75a.75.75 0 0 1 0-1.5h2.875a3.875 3.875 0 0 0 0-7.75H3.622l4.146 3.957a.75.75 0 0 1-1.036 1.085l-5.5-5.25a.75.75 0 0 1 0-1.085l5.5-5.25a.75.75 0 0 1 1.061.025Z"
              clipRule="evenodd"
            />
          </svg>
        }
      >
        We accept returns within 30 days of purchase.
      </Accordion.Item>
    </Accordion>
  ),
};

// ─── FAQ (5 items) ────────────────────────────────────────────────────────────

export const FAQ: Story = {
  render: () => (
    <div className="mx-auto max-w-2xl">
      <h2 className="mb-6 text-2xl font-bold text-[var(--color-fw-foreground)]">
        Frequently Asked Questions
      </h2>
      <Accordion variant="separated">
        <Accordion.Item trigger="What is FluxWind UI?">
          FluxWind UI is an open-source design system built with React 19,
          Tailwind CSS 4, and TypeScript strict mode. It provides accessible,
          customisable components for building modern web interfaces.
        </Accordion.Item>
        <Accordion.Item trigger="How do I get started?">
          Install the package with <code>pnpm add @fluxwind/core</code>, import
          the CSS at the root of your application, and start using components.
          See the README for full setup instructions.
        </Accordion.Item>
        <Accordion.Item trigger="Is FluxWind free to use?">
          Yes. FluxWind is released under the MIT licence. You can use it in
          personal and commercial projects at no cost.
        </Accordion.Item>
        <Accordion.Item trigger="Does it support dark mode?">
          Yes. FluxWind uses CSS custom properties (design tokens) with a
          <code>data-theme="dark"</code> attribute or the <code>.dark</code>{" "}
          class on the root element, compatible with system preference via{" "}
          <code>@media (prefers-color-scheme)</code>.
        </Accordion.Item>
        <Accordion.Item trigger="How do I contribute?">
          Fork the repository, create a branch following our naming conventions,
          and open a pull request with your changes. All contributions must
          include tests and stories.
        </Accordion.Item>
      </Accordion>
    </div>
  ),
};
