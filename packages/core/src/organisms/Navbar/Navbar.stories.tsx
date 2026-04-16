import type { Meta, StoryObj } from "@storybook/react-vite";
import { Navbar } from "./Navbar";

// ─── Meta ─────────────────────────────────────────────────────────────────────

const meta: Meta<typeof Navbar.Root> = {
  title: "Organisms/Navbar",
  component: Navbar.Root,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Navbar is a full-width page header organism with integrated mobile menu.\n\n" +
          "## Usage\n\n" +
          "```tsx\n" +
          "<Navbar.Root sticky>\n" +
          '  <Navbar.Brand href="/">Brand</Navbar.Brand>\n' +
          "  <Navbar.Links>\n" +
          '    <Navbar.Link href="/" active>Home</Navbar.Link>\n' +
          '    <Navbar.Link href="/about">About</Navbar.Link>\n' +
          "  </Navbar.Links>\n" +
          "  <Navbar.Actions>\n" +
          "    <Button>Sign in</Button>\n" +
          "  </Navbar.Actions>\n" +
          "  <Navbar.MobileToggle />\n" +
          "  <Navbar.MobileMenu>\n" +
          '    <Navbar.MobileLink href="/" active>Home</Navbar.MobileLink>\n' +
          '    <Navbar.MobileLink href="/about">About</Navbar.MobileLink>\n' +
          "  </Navbar.MobileMenu>\n" +
          "</Navbar.Root>\n" +
          "```\n\n" +
          "## Design decisions\n\n" +
          "| Decision | Rationale |\n" +
          "|---|---|\n" +
          "| Compound component | Caller controls which sub-components appear and in what order |\n" +
          "| Signal store in Root | `isOpen` signal avoids prop drilling across sub-components |\n" +
          "| MobileMenu renders null when closed | Keeps DOM clean; avoids hidden-but-present panel confusion |\n" +
          "| Escape returns focus to toggle | ARIA APG disclosure pattern for menu buttons |\n" +
          "| Auto-close on desktop resize | Prevents stale open state if user resizes the window |\n" +
          "| `<header>` + `<nav aria-label>` | Correct landmark hierarchy for screen readers |\n",
      },
    },
  },
  argTypes: {
    theme: {
      description: "Visual theme of the bar.",
      control: "select",
      options: ["solid", "transparent", "blurred"],
    },
    size: {
      description: "Height of the bar.",
      control: "select",
      options: ["md", "lg"],
    },
    maxWidth: {
      description: "Max-width of the inner container.",
      control: "select",
      options: ["sm", "md", "lg", "full"],
    },
    sticky: {
      description: "Stick to the top of the viewport.",
      control: "boolean",
    },
    navLabel: {
      description: "Accessible label for the <nav> landmark.",
      control: "text",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Navbar.Root>;

// ─── Shared fragments ─────────────────────────────────────────────────────────

function DesktopLinks() {
  return (
    <Navbar.Links>
      <Navbar.Link href="/" active>
        Home
      </Navbar.Link>
      <Navbar.Link href="/products">Products</Navbar.Link>
      <Navbar.Link href="/pricing">Pricing</Navbar.Link>
      <Navbar.Link href="/blog">Blog</Navbar.Link>
    </Navbar.Links>
  );
}

function MobileLinks() {
  return (
    <Navbar.MobileMenu>
      <Navbar.MobileLink href="/" active>
        Home
      </Navbar.MobileLink>
      <Navbar.MobileLink href="/products">Products</Navbar.MobileLink>
      <Navbar.MobileLink href="/pricing">Pricing</Navbar.MobileLink>
      <Navbar.MobileLink href="/blog">Blog</Navbar.MobileLink>
    </Navbar.MobileMenu>
  );
}

function Actions() {
  return (
    <Navbar.Actions>
      <a
        href="/login"
        className="text-sm font-medium text-[var(--color-fw-muted-foreground)] hover:text-[var(--color-fw-foreground)]"
      >
        Log in
      </a>
      <a
        href="/signup"
        className="rounded-md bg-[var(--color-fw-primary)] px-3.5 py-1.5 text-sm font-semibold text-[var(--color-fw-primary-fg)] hover:bg-[var(--color-fw-primary-hover)]"
      >
        Sign up
      </a>
    </Navbar.Actions>
  );
}

// ─── Page scaffold for layout stories ────────────────────────────────────────

function PageScaffold({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[var(--color-fw-background)]">
      {children}
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="rounded-lg border border-[var(--color-fw-border)] bg-[var(--color-fw-surface)] p-8">
          <p className="text-sm text-[var(--color-fw-muted-foreground)]">
            Page content goes here.
          </p>
        </div>
      </div>
    </div>
  );
}

// ─── Stories ─────────────────────────────────────────────────────────────────

export const Default: Story = {
  name: "Solid (default)",
  render: (args) => (
    <PageScaffold>
      <Navbar.Root {...args}>
        <Navbar.Brand href="/">FluxWind</Navbar.Brand>
        <DesktopLinks />
        <Actions />
        <Navbar.MobileToggle />
        <MobileLinks />
      </Navbar.Root>
    </PageScaffold>
  ),
  args: { theme: "solid", size: "md", maxWidth: "lg", sticky: false },
};

export const Blurred: Story = {
  name: "Blurred glass",
  render: (args) => (
    <PageScaffold>
      <Navbar.Root {...args}>
        <Navbar.Brand href="/">FluxWind</Navbar.Brand>
        <DesktopLinks />
        <Actions />
        <Navbar.MobileToggle />
        <MobileLinks />
      </Navbar.Root>
    </PageScaffold>
  ),
  args: { theme: "blurred", size: "md", maxWidth: "lg", sticky: false },
};

export const Transparent: Story = {
  name: "Transparent (on dark hero)",
  render: (args) => (
    // data-theme="dark" activates dark-mode tokens so the navbar's text and
    // icons use var(--color-fw-foreground/muted-foreground/primary-text) at
    // the correct dark-mode values — no hardcoded white classes needed.
    <div
      data-theme="dark"
      className="min-h-screen bg-[var(--color-fw-background)]"
    >
      <Navbar.Root {...args}>
        <Navbar.Brand href="/">FluxWind</Navbar.Brand>
        <Navbar.Links>
          <Navbar.Link href="/" active>
            Home
          </Navbar.Link>
          <Navbar.Link href="/products">Products</Navbar.Link>
          <Navbar.Link href="/pricing">Pricing</Navbar.Link>
        </Navbar.Links>
        <Navbar.MobileToggle />
        <Navbar.MobileMenu>
          <Navbar.MobileLink href="/" active>
            Home
          </Navbar.MobileLink>
          <Navbar.MobileLink href="/products">Products</Navbar.MobileLink>
          <Navbar.MobileLink href="/pricing">Pricing</Navbar.MobileLink>
        </Navbar.MobileMenu>
      </Navbar.Root>
      <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <p className="text-2xl font-bold text-[var(--color-fw-foreground)]">
          Hero content
        </p>
      </div>
    </div>
  ),
  args: { theme: "transparent", size: "lg", maxWidth: "lg", sticky: false },
};

export const Sticky: Story = {
  name: "Sticky bar",
  render: (args) => (
    <div className="min-h-[200vh] bg-[var(--color-fw-background)]">
      <Navbar.Root {...args}>
        <Navbar.Brand href="/">FluxWind</Navbar.Brand>
        <DesktopLinks />
        <Actions />
        <Navbar.MobileToggle />
        <MobileLinks />
      </Navbar.Root>
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <p className="text-sm text-[var(--color-fw-muted-foreground)]">
          Scroll down — the navbar sticks to the top.
        </p>
      </div>
    </div>
  ),
  args: { theme: "solid", size: "md", maxWidth: "lg", sticky: true },
};

export const Tall: Story = {
  name: "Tall bar (lg)",
  render: (args) => (
    <PageScaffold>
      <Navbar.Root {...args}>
        <Navbar.Brand href="/">FluxWind</Navbar.Brand>
        <DesktopLinks />
        <Actions />
        <Navbar.MobileToggle />
        <MobileLinks />
      </Navbar.Root>
    </PageScaffold>
  ),
  args: { theme: "solid", size: "lg", maxWidth: "lg", sticky: false },
};

export const NarrowContainer: Story = {
  name: "Narrow container (md)",
  render: (args) => (
    <PageScaffold>
      <Navbar.Root {...args}>
        <Navbar.Brand href="/">FluxWind</Navbar.Brand>
        <DesktopLinks />
        <Actions />
        <Navbar.MobileToggle />
        <MobileLinks />
      </Navbar.Root>
    </PageScaffold>
  ),
  args: { theme: "solid", size: "md", maxWidth: "md", sticky: false },
};

export const LinksOnly: Story = {
  name: "Links only (no actions)",
  render: (args) => (
    <PageScaffold>
      <Navbar.Root {...args}>
        <Navbar.Brand href="/">FluxWind</Navbar.Brand>
        <DesktopLinks />
        <Navbar.MobileToggle />
        <MobileLinks />
      </Navbar.Root>
    </PageScaffold>
  ),
  args: { theme: "solid", size: "md", maxWidth: "lg", sticky: false },
};
