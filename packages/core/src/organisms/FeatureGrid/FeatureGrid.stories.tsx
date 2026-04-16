import type { Meta, StoryObj } from "@storybook/react-vite";
import { Zap, Accessibility, Palette, ShieldCheck, Gauge } from "lucide-react";
import { Icon } from "@/atoms/Icon";
import { FeatureGrid } from "./FeatureGrid";

// ─── Meta ─────────────────────────────────────────────────────────────────────

const meta: Meta<typeof FeatureGrid.Root> = {
  title: "Organisms/FeatureGrid",
  component: FeatureGrid.Root,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "FeatureGrid is a page-section organism for showcasing product features. " +
          "Supports 2/3/4-column layouts and three card visual styles (flat, outlined, elevated).\n\n" +
          "## Usage\n\n" +
          "```tsx\n" +
          "<FeatureGrid.Root columns={3}>\n" +
          "  <FeatureGrid.Header>\n" +
          "    <FeatureGrid.Eyebrow>Why FluxWind</FeatureGrid.Eyebrow>\n" +
          "    <FeatureGrid.Heading>Everything you need</FeatureGrid.Heading>\n" +
          "  </FeatureGrid.Header>\n" +
          "  <FeatureGrid.List columns={3}>\n" +
          "    <FeatureGrid.Card>\n" +
          "      <FeatureGrid.Icon><SpeedIcon /></FeatureGrid.Icon>\n" +
          "      <FeatureGrid.Title>Fast</FeatureGrid.Title>\n" +
          "      <FeatureGrid.Body>Zero overhead at runtime.</FeatureGrid.Body>\n" +
          "    </FeatureGrid.Card>\n" +
          "  </FeatureGrid.List>\n" +
          "</FeatureGrid.Root>\n" +
          "```\n\n" +
          "## Design decisions\n\n" +
          "| Decision | Rationale |\n" +
          "|---|---|\n" +
          "| No context provider | Cards are siblings, not deeply nested — props suffice |\n" +
          "| `columns` on `List` | Caller may want header above a narrower grid |\n" +
          "| `interactive` card prop | Adds hover/active CSS; consumer wraps card in a link |\n" +
          "| `aria-hidden` on Icon | Icons are decorative; title provides the label |\n",
      },
    },
  },
  argTypes: {
    padding: {
      description: "Vertical padding of the section.",
      control: "select",
      options: ["sm", "md", "lg"],
    },
    maxWidth: {
      description: "Max-width of the inner container.",
      control: "select",
      options: ["sm", "md", "lg", "full"],
    },
    columns: {
      description: "Number of grid columns.",
      control: "select",
      options: [2, 3, 4],
    },
  },
};

export default meta;
type Story = StoryObj<typeof FeatureGrid.Root>;

// ─── Shared feature data ──────────────────────────────────────────────────────

const features3 = [
  {
    Icon: Zap,
    title: "Blazing fast",
    body: "Built on Tailwind CSS and CVA — zero runtime overhead. Components ship as plain class strings.",
    href: "/performance",
  },
  {
    Icon: Accessibility,
    title: "Accessible by default",
    body: "Every component ships with WCAG 2.2 AA compliance — ARIA roles, keyboard nav, focus management.",
    href: "/accessibility",
  },
  {
    Icon: Palette,
    title: "Fully themeable",
    body: "CSS custom properties power every color and radius token. Light/dark mode included.",
    href: "/theming",
  },
];

const features4 = [
  {
    Icon: Gauge,
    title: "Performance",
    body: "Tree-shaken, CSS-only variants.",
  },
  {
    Icon: Accessibility,
    title: "Accessible",
    body: "WCAG 2.2 AA out of the box.",
  },
  { Icon: Palette, title: "Themeable", body: "Design tokens throughout." },
  {
    Icon: ShieldCheck,
    title: "Type-safe",
    body: "TypeScript strict throughout.",
  },
];

// ─── Stories ─────────────────────────────────────────────────────────────────

export const FlatThreeColumns: Story = {
  name: "Flat · 3 columns",
  render: (args) => (
    <div className="bg-[var(--color-fw-background)]">
      <FeatureGrid.Root {...args}>
        <FeatureGrid.Header>
          <FeatureGrid.Eyebrow>Why FluxWind</FeatureGrid.Eyebrow>
          <FeatureGrid.Heading>Everything you need</FeatureGrid.Heading>
          <FeatureGrid.Subheading>
            A production-ready design system that scales with your product.
          </FeatureGrid.Subheading>
        </FeatureGrid.Header>
        <FeatureGrid.List columns={3}>
          {features3.map(({ Icon: FeatureIcon, title, body, href }) => (
            <FeatureGrid.Card key={title}>
              <FeatureGrid.Icon>
                <Icon icon={FeatureIcon} size="md" />
              </FeatureGrid.Icon>
              <FeatureGrid.Title>{title}</FeatureGrid.Title>
              <FeatureGrid.Body>{body}</FeatureGrid.Body>
              <FeatureGrid.Link href={href}>Learn more</FeatureGrid.Link>
            </FeatureGrid.Card>
          ))}
        </FeatureGrid.List>
      </FeatureGrid.Root>
    </div>
  ),
  args: { padding: "md", maxWidth: "lg", columns: 3 },
};

export const OutlinedThreeColumns: Story = {
  name: "Outlined · 3 columns",
  render: (args) => (
    <div className="bg-[var(--color-fw-background)]">
      <FeatureGrid.Root {...args}>
        <FeatureGrid.Header>
          <FeatureGrid.Heading>Core capabilities</FeatureGrid.Heading>
          <FeatureGrid.Subheading>
            Every component is tested, documented, and ready to ship.
          </FeatureGrid.Subheading>
        </FeatureGrid.Header>
        <FeatureGrid.List columns={3}>
          {features3.map(({ Icon: FeatureIcon, title, body }) => (
            <FeatureGrid.Card key={title} variant="outlined">
              <FeatureGrid.Icon>
                <Icon icon={FeatureIcon} size="md" />
              </FeatureGrid.Icon>
              <FeatureGrid.Title>{title}</FeatureGrid.Title>
              <FeatureGrid.Body>{body}</FeatureGrid.Body>
            </FeatureGrid.Card>
          ))}
        </FeatureGrid.List>
      </FeatureGrid.Root>
    </div>
  ),
  args: { padding: "md", maxWidth: "lg" },
};

export const ElevatedFourColumns: Story = {
  name: "Elevated · 4 columns",
  render: (args) => (
    <div className="bg-[var(--color-fw-background)]">
      <FeatureGrid.Root {...args}>
        <FeatureGrid.Header>
          <FeatureGrid.Eyebrow>The full picture</FeatureGrid.Eyebrow>
          <FeatureGrid.Heading>Built for scale</FeatureGrid.Heading>
        </FeatureGrid.Header>
        <FeatureGrid.List columns={4}>
          {features4.map(({ Icon: FeatureIcon, title, body }) => (
            <FeatureGrid.Card key={title} variant="elevated">
              <FeatureGrid.Icon>
                <Icon icon={FeatureIcon} size="md" />
              </FeatureGrid.Icon>
              <FeatureGrid.Title>{title}</FeatureGrid.Title>
              <FeatureGrid.Body>{body}</FeatureGrid.Body>
            </FeatureGrid.Card>
          ))}
        </FeatureGrid.List>
      </FeatureGrid.Root>
    </div>
  ),
  args: { padding: "md", maxWidth: "lg" },
};

export const TwoColumnsCentered: Story = {
  name: "Flat · 2 columns · centered",
  render: (args) => (
    <div className="bg-[var(--color-fw-background)]">
      <FeatureGrid.Root {...args}>
        <FeatureGrid.Header>
          <FeatureGrid.Heading>Two key pillars</FeatureGrid.Heading>
        </FeatureGrid.Header>
        <FeatureGrid.List columns={2}>
          <FeatureGrid.Card align="center">
            <FeatureGrid.Icon>
              <Icon icon={Gauge} size="md" />
            </FeatureGrid.Icon>
            <FeatureGrid.Title>Performance</FeatureGrid.Title>
            <FeatureGrid.Body>
              Zero-overhead CSS class variants via CVA and Tailwind.
            </FeatureGrid.Body>
          </FeatureGrid.Card>
          <FeatureGrid.Card align="center">
            <FeatureGrid.Icon>
              <Icon icon={Accessibility} size="md" />
            </FeatureGrid.Icon>
            <FeatureGrid.Title>Accessibility</FeatureGrid.Title>
            <FeatureGrid.Body>
              WCAG 2.2 AA compliance built into every component.
            </FeatureGrid.Body>
          </FeatureGrid.Card>
        </FeatureGrid.List>
      </FeatureGrid.Root>
    </div>
  ),
  args: { padding: "md", maxWidth: "md" },
};

export const InteractiveCards: Story = {
  name: "Interactive cards (elevated + links)",
  render: (args) => (
    <div className="bg-[var(--color-fw-background)]">
      <FeatureGrid.Root {...args}>
        <FeatureGrid.Header>
          <FeatureGrid.Eyebrow>Explore the docs</FeatureGrid.Eyebrow>
          <FeatureGrid.Heading>Start building today</FeatureGrid.Heading>
        </FeatureGrid.Header>
        <FeatureGrid.List columns={3}>
          {features3.map(({ Icon: FeatureIcon, title, body, href }) => (
            <FeatureGrid.Card key={title} variant="elevated" interactive>
              <FeatureGrid.Icon>
                <Icon icon={FeatureIcon} size="md" />
              </FeatureGrid.Icon>
              <FeatureGrid.Title>{title}</FeatureGrid.Title>
              <FeatureGrid.Body>{body}</FeatureGrid.Body>
              <FeatureGrid.Link href={href}>Learn more</FeatureGrid.Link>
            </FeatureGrid.Card>
          ))}
        </FeatureGrid.List>
      </FeatureGrid.Root>
    </div>
  ),
  args: { padding: "lg", maxWidth: "lg" },
};

export const DarkBackground: Story = {
  name: "Dark background",
  parameters: {
    backgrounds: { default: "dark" },
  },
  render: (args) => (
    <div data-theme="dark" className="bg-[var(--color-fw-background)] min-h-40">
      <FeatureGrid.Root {...args}>
        <FeatureGrid.Header>
          <FeatureGrid.Eyebrow>Dark mode ready</FeatureGrid.Eyebrow>
          <FeatureGrid.Heading>Adapts automatically</FeatureGrid.Heading>
          <FeatureGrid.Subheading>
            All tokens switch to their dark-mode values via{" "}
            <code>data-theme="dark"</code>.
          </FeatureGrid.Subheading>
        </FeatureGrid.Header>
        <FeatureGrid.List columns={3}>
          {features3.map(({ Icon: FeatureIcon, title, body }) => (
            <FeatureGrid.Card key={title} variant="outlined">
              <FeatureGrid.Icon>
                <Icon icon={FeatureIcon} size="md" />
              </FeatureGrid.Icon>
              <FeatureGrid.Title>{title}</FeatureGrid.Title>
              <FeatureGrid.Body>{body}</FeatureGrid.Body>
            </FeatureGrid.Card>
          ))}
        </FeatureGrid.List>
      </FeatureGrid.Root>
    </div>
  ),
  args: { padding: "md", maxWidth: "lg" },
};
