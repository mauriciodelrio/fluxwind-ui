import type { Meta, StoryObj } from "@storybook/react-vite";
import { Link } from "./Link";

const meta: Meta<typeof Link> = {
  title: "Atoms/Link",
  component: Link,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Inline text hyperlink atom. Renders a native `<a>` with forwarded ref, " +
          "4 colour variants, 3 underline modes, and 5 text sizes.\n\n" +
          "Use `Link` for **navigation** (href-based). For button-like actions without navigation, " +
          'use `<Button variant="link">` instead.\n\n' +
          '**External links:** set `external` to automatically add `target="_blank"`, ' +
          '`rel="noopener noreferrer"`, and a trailing icon that signals out-of-site navigation.',
      },
    },
  },
  argTypes: {
    variant: {
      description: "Colour intent of the link.",
      control: "select",
      options: ["default", "muted", "destructive", "inherit"],
      table: {
        type: { summary: "'default' | 'muted' | 'destructive' | 'inherit'" },
        defaultValue: { summary: "'default'" },
      },
    },
    underline: {
      description: "When the underline is visible.",
      control: "select",
      options: ["always", "hover", "none"],
      table: {
        type: { summary: "'always' | 'hover' | 'none'" },
        defaultValue: { summary: "'hover'" },
      },
    },
    size: {
      description: "Text size — maps to the shared `sizeMap` token scale.",
      control: "select",
      options: ["xs", "sm", "md", "lg", "xl"],
      table: {
        type: { summary: "'xs' | 'sm' | 'md' | 'lg' | 'xl'" },
        defaultValue: { summary: "'md'" },
      },
    },
    external: {
      description:
        'Adds `target="_blank"` + `rel="noopener noreferrer"` and a trailing icon. ' +
        "Use for links that navigate outside the current site.",
      control: "boolean",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    href: {
      description: "Destination URL.",
      control: "text",
      table: { type: { summary: "string" } },
    },
    children: {
      description: "Visible link text.",
      control: "text",
      table: { type: { summary: "ReactNode" } },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Link>;

// ─── Default ──────────────────────────────────────────────────────────────────

export const Default: Story = {
  args: { href: "/explore", children: "Read the docs" },
  parameters: {
    docs: {
      description: {
        story:
          "Default `primary` variant, `hover` underline. Adjust any prop in the Controls panel.",
      },
    },
  },
};

// ─── Variants ─────────────────────────────────────────────────────────────────

export const Variants: Story = {
  parameters: {
    docs: {
      description: {
        story: "All 4 colour variants side by side.",
      },
    },
  },
  render: () => (
    <div className="flex flex-wrap gap-6 items-center">
      <Link href="/explore">Default</Link>
      <Link href="/explore" variant="muted">
        Muted
      </Link>
      <Link href="/explore" variant="destructive">
        Destructive
      </Link>
      <span className="text-[var(--color-fw-foreground)]">
        Text with{" "}
        <Link href="/explore" variant="inherit">
          inherited colour
        </Link>{" "}
        link
      </span>
    </div>
  ),
};

// ─── Underline modes ──────────────────────────────────────────────────────────

export const UnderlineModes: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Three underline modes: `always`, `hover` (default), and `none`.",
      },
    },
  },
  render: () => (
    <div className="flex flex-wrap gap-6 items-center">
      <Link href="/explore" underline="always">
        Always underlined
      </Link>
      <Link href="/explore" underline="hover">
        Hover underlined
      </Link>
      <Link href="/explore" underline="none">
        No underline
      </Link>
    </div>
  ),
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
    <div className="flex flex-wrap gap-6 items-baseline">
      {(["xs", "sm", "md", "lg", "xl"] as const).map((s) => (
        <Link key={s} href="/explore" size={s}>
          Size {s}
        </Link>
      ))}
    </div>
  ),
};

// ─── External ─────────────────────────────────────────────────────────────────

export const External: Story = {
  parameters: {
    docs: {
      description: {
        story:
          '`external` adds `target="_blank"`, `rel="noopener noreferrer"`, and a trailing icon. ' +
          "The icon is `aria-hidden` — screen readers read only the link text.",
      },
    },
  },
  render: () => (
    <div className="flex flex-wrap gap-6 items-center">
      <Link href="https://github.com" external>
        GitHub
      </Link>
      <Link href="https://npmjs.com" external variant="muted" size="sm">
        npm registry
      </Link>
    </div>
  ),
};
