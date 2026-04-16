import type { Meta, StoryObj } from "@storybook/react-vite";
import { Rocket, BookOpen, Star, ArrowRight } from "lucide-react";
import { Button } from "@/atoms/Button";
import { Icon } from "@/atoms/Icon";
import { CTASection } from "./CTASection";

// ─── Meta ─────────────────────────────────────────────────────────────────────

const meta: Meta<typeof CTASection.Root> = {
  title: "Organisms/CTASection",
  component: CTASection.Root,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "CTASection is a page-section organism for conversion moments. " +
          "Supports centered and split layouts with four background styles " +
          "(default, muted, brand, dark) and an optional top divider.\n\n" +
          "## Usage\n\n" +
          "```tsx\n" +
          '<CTASection.Root background="brand" layout="centered">\n' +
          "  <CTASection.TextBlock>\n" +
          "    <CTASection.Eyebrow>Get started</CTASection.Eyebrow>\n" +
          "    <CTASection.Heading>Ship faster, today</CTASection.Heading>\n" +
          "    <CTASection.Subheading>Join thousands of developers building with FluxWind.</CTASection.Subheading>\n" +
          "  </CTASection.TextBlock>\n" +
          "  <CTASection.Actions>\n" +
          '    <Button variant="secondary">Learn more</Button>\n' +
          "  </CTASection.Actions>\n" +
          "</CTASection.Root>\n" +
          "```",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof CTASection.Root>;

// ─── Stories ──────────────────────────────────────────────────────────────────

/** Default centered layout over a plain background. */
export const CenteredDefault: Story = {
  name: "Centered — Default",
  render: () => (
    <CTASection.Root background="default" layout="centered">
      <CTASection.TextBlock>
        <CTASection.Eyebrow>Get started today</CTASection.Eyebrow>
        <CTASection.Heading>Build without limits</CTASection.Heading>
        <CTASection.Subheading>
          FluxWind gives you accessible, themeable components so you can focus
          on what matters — shipping great products.
        </CTASection.Subheading>
      </CTASection.TextBlock>
      <CTASection.Actions>
        <Button variant="primary" size="lg">
          <Icon icon={Rocket} size="sm" aria-hidden="true" />
          Start for free
        </Button>
        <Button variant="secondary" size="lg">
          Read the docs
          <Icon icon={ArrowRight} size="sm" aria-hidden="true" />
        </Button>
      </CTASection.Actions>
    </CTASection.Root>
  ),
};

/** Muted background — subtle section between content blocks. */
export const CenteredMuted: Story = {
  name: "Centered — Muted",
  render: () => (
    <CTASection.Root background="muted" layout="centered">
      <CTASection.TextBlock>
        <CTASection.Eyebrow>Community</CTASection.Eyebrow>
        <CTASection.Heading>Join the conversation</CTASection.Heading>
        <CTASection.Subheading>
          Thousands of developers already use FluxWind. Come chat on Discord and
          share what you're building.
        </CTASection.Subheading>
      </CTASection.TextBlock>
      <CTASection.Actions>
        <Button variant="primary" size="lg">
          <Icon icon={Star} size="sm" aria-hidden="true" />
          Join Discord
        </Button>
        <Button variant="secondary" size="lg">
          <Icon icon={BookOpen} size="sm" aria-hidden="true" />
          Browse components
        </Button>
      </CTASection.Actions>
    </CTASection.Root>
  ),
};

/** Brand-coloured background — high-conversion hero CTA. */
export const CenteredBrand: Story = {
  name: "Centered — Brand",
  render: () => (
    <CTASection.Root background="brand" layout="centered">
      <CTASection.TextBlock>
        <CTASection.Eyebrow background="brand">Limited time</CTASection.Eyebrow>
        <CTASection.Heading background="brand">
          Launch your next project free
        </CTASection.Heading>
        <CTASection.Subheading background="brand">
          No credit card required. Full access for 30 days.
        </CTASection.Subheading>
      </CTASection.TextBlock>
      <CTASection.Actions>
        <Button variant="secondary" size="lg">
          <Icon icon={Rocket} size="sm" aria-hidden="true" />
          Create free account
        </Button>
      </CTASection.Actions>
    </CTASection.Root>
  ),
};

/** Dark background — works great as a page footer CTA. */
export const CenteredDark: Story = {
  name: "Centered — Dark",
  render: () => (
    <CTASection.Root background="dark" layout="centered">
      <CTASection.TextBlock>
        <CTASection.Eyebrow background="dark">
          Enterprise ready
        </CTASection.Eyebrow>
        <CTASection.Heading background="dark">
          Scale confidently with FluxWind
        </CTASection.Heading>
        <CTASection.Subheading background="dark">
          SSO, audit logs, custom SLAs — everything your team needs at scale.
        </CTASection.Subheading>
      </CTASection.TextBlock>
      <CTASection.Actions>
        <Button variant="primary" size="lg">
          Talk to sales
        </Button>
        <Button
          variant="ghost"
          size="lg"
          className="text-[var(--color-fw-background)] hover:bg-[var(--color-fw-background)]/10"
        >
          View pricing
          <Icon icon={ArrowRight} size="sm" aria-hidden="true" />
        </Button>
      </CTASection.Actions>
    </CTASection.Root>
  ),
};

/**
 * Split layout — text left, actions pinned right. Ideal for inline conversion
 * banners inside a page rather than full-width section breaks.
 */
export const SplitLayout: Story = {
  name: "Split — Default",
  render: () => (
    <CTASection.Root background="default" layout="split">
      <CTASection.TextBlock layout="split">
        <CTASection.Heading>Ready to get started?</CTASection.Heading>
        <CTASection.Subheading>
          Try FluxWind free for 30 days — no credit card needed.
        </CTASection.Subheading>
      </CTASection.TextBlock>
      <CTASection.Actions layout="split">
        <Button variant="primary" size="lg">
          Get started
        </Button>
        <Button variant="secondary" size="lg">
          Learn more
        </Button>
      </CTASection.Actions>
    </CTASection.Root>
  ),
};

/** Split layout with brand background. */
export const SplitBrand: Story = {
  name: "Split — Brand",
  render: () => (
    <CTASection.Root background="brand" layout="split">
      <CTASection.TextBlock layout="split">
        <CTASection.Heading background="brand">
          Ship your MVP faster.
        </CTASection.Heading>
        <CTASection.Subheading background="brand">
          Production-grade components, zero configuration.
        </CTASection.Subheading>
      </CTASection.TextBlock>
      <CTASection.Actions layout="split">
        <Button variant="secondary" size="lg">
          <Icon icon={Rocket} size="sm" aria-hidden="true" />
          Start building
        </Button>
      </CTASection.Actions>
    </CTASection.Root>
  ),
};

/** With a top divider separating it from previous content. */
export const WithDivider: Story = {
  name: "With Top Divider",
  render: () => (
    <div>
      <section className="py-16 px-8">
        <p className="text-[var(--color-fw-muted-foreground)]">
          ...previous section content...
        </p>
      </section>
      <CTASection.Root background="muted" layout="centered" divider>
        <CTASection.TextBlock>
          <CTASection.Heading>
            Thousands of teams trust FluxWind
          </CTASection.Heading>
          <CTASection.Subheading>
            Start your free trial today — cancel anytime.
          </CTASection.Subheading>
        </CTASection.TextBlock>
        <CTASection.Actions>
          <Button variant="primary" size="lg">
            Start free trial
          </Button>
        </CTASection.Actions>
      </CTASection.Root>
    </div>
  ),
};
