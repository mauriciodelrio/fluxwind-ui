import type { Meta, StoryObj } from "@storybook/react-vite";
import { HeroSection } from "./HeroSection";

// ─── Meta ─────────────────────────────────────────────────────────────────────

const meta: Meta<typeof HeroSection.Root> = {
  title: "Organisms/HeroSection",
  component: HeroSection.Root,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "HeroSection is the primary above-the-fold organism. Supports centered and split layouts with an optional media slot (image or video with play/pause).\n\n" +
          "## Usage\n\n" +
          "```tsx\n" +
          '<HeroSection.Root layout="centered">\n' +
          "  <HeroSection.Text>\n" +
          "    <HeroSection.Eyebrow>New</HeroSection.Eyebrow>\n" +
          "    <HeroSection.Heading>Build faster UIs</HeroSection.Heading>\n" +
          "    <HeroSection.Subheading>A design system.</HeroSection.Subheading>\n" +
          "    <HeroSection.Actions>\n" +
          '      <a href="/start">Get started</a>\n' +
          "    </HeroSection.Actions>\n" +
          "  </HeroSection.Text>\n" +
          "  <HeroSection.Media>\n" +
          '    <HeroSection.Image src="/hero.png" alt="Dashboard preview" />\n' +
          "  </HeroSection.Media>\n" +
          "</HeroSection.Root>\n" +
          "```\n\n" +
          "## Design decisions\n\n" +
          "| Decision | Rationale |\n" +
          "|---|---|\n" +
          "| Compound component | Caller controls which sub-components appear and in what order |\n" +
          "| Signal store for video | `isPlaying` signal avoids prop drilling to the play button |\n" +
          "| Media slot is generic | Works with `<Image>`, `<Video>`, or any custom content |\n" +
          "| `layout` drives CSS grid | Container and text block swap order via CSS `order`, no JS |\n" +
          "| `sectionPaddingMap` token | Consistent vertical rhythm with FeatureGrid, CTA, Footer |\n",
      },
    },
  },
  argTypes: {
    layout: {
      description: "Content layout — text position relative to media.",
      control: "select",
      options: ["centered", "split-left", "split-right"],
    },
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
    headingSize: {
      description: "Scale of heading and subheading.",
      control: "select",
      options: ["sm", "md", "lg"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof HeroSection.Root>;

// ─── Shared action buttons ────────────────────────────────────────────────────

function PrimaryButton({
  children,
  href,
}: {
  children: React.ReactNode;
  href: string;
}) {
  return (
    <a
      href={href}
      className="inline-flex items-center justify-center rounded-md bg-[var(--color-fw-primary)] px-5 py-2.5 text-sm font-semibold text-[var(--color-fw-primary-fg)] hover:bg-[var(--color-fw-primary-hover)]"
    >
      {children}
    </a>
  );
}

function SecondaryButton({
  children,
  href,
}: {
  children: React.ReactNode;
  href: string;
}) {
  return (
    <a
      href={href}
      className="inline-flex items-center justify-center rounded-md border border-[var(--color-fw-border)] bg-[var(--color-fw-background)] px-5 py-2.5 text-sm font-semibold text-[var(--color-fw-foreground)] hover:bg-[var(--color-fw-secondary)]"
    >
      {children}
    </a>
  );
}

// ─── Stories ─────────────────────────────────────────────────────────────────

export const Centered: Story = {
  name: "Centered (text only)",
  render: (args) => (
    <div className="bg-[var(--color-fw-background)]">
      <HeroSection.Root {...args}>
        <HeroSection.Text>
          <HeroSection.Eyebrow>New · FluxWind 2.0</HeroSection.Eyebrow>
          <HeroSection.Heading>
            Build beautiful interfaces,{" "}
            <span className="text-[var(--color-fw-primary-text)]">faster</span>
          </HeroSection.Heading>
          <HeroSection.Subheading>
            A production-ready design system for modern React apps. Accessible,
            themeable, and built on Tailwind CSS.
          </HeroSection.Subheading>
          <HeroSection.Actions>
            <PrimaryButton href="/get-started">Get started</PrimaryButton>
            <SecondaryButton href="/docs">Documentation</SecondaryButton>
          </HeroSection.Actions>
        </HeroSection.Text>
      </HeroSection.Root>
    </div>
  ),
  args: {
    layout: "centered",
    padding: "lg",
    maxWidth: "lg",
    headingSize: "md",
  },
};

export const CenteredWithImage: Story = {
  name: "Centered + image",
  render: (args) => (
    <div className="bg-[var(--color-fw-background)]">
      <HeroSection.Root {...args}>
        <HeroSection.Text>
          <HeroSection.Eyebrow>Open Source</HeroSection.Eyebrow>
          <HeroSection.Heading>Design systems done right</HeroSection.Heading>
          <HeroSection.Subheading>
            Composable, accessible components that scale with your product.
          </HeroSection.Subheading>
          <HeroSection.Actions>
            <PrimaryButton href="/get-started">Get started</PrimaryButton>
            <SecondaryButton href="/github">View on GitHub</SecondaryButton>
          </HeroSection.Actions>
        </HeroSection.Text>
        <HeroSection.Media>
          <HeroSection.Image
            src="https://placehold.co/1280x720/1e293b/94a3b8?text=Product+Screenshot"
            alt="Product screenshot"
          />
        </HeroSection.Media>
      </HeroSection.Root>
    </div>
  ),
  args: {
    layout: "centered",
    padding: "lg",
    maxWidth: "lg",
    headingSize: "md",
  },
};

export const SplitLeft: Story = {
  name: "Split left (text | image)",
  render: (args) => (
    <div className="bg-[var(--color-fw-background)]">
      <HeroSection.Root {...args}>
        <HeroSection.Text>
          <HeroSection.Eyebrow>Enterprise ready</HeroSection.Eyebrow>
          <HeroSection.Heading>Ship with confidence</HeroSection.Heading>
          <HeroSection.Subheading>
            Every component is tested, accessible, and production-ready out of
            the box.
          </HeroSection.Subheading>
          <HeroSection.Actions>
            <PrimaryButton href="/get-started">Start building</PrimaryButton>
          </HeroSection.Actions>
        </HeroSection.Text>
        <HeroSection.Media>
          <HeroSection.Image
            src="https://placehold.co/800x600/1e293b/94a3b8?text=App+Preview"
            alt="App interface preview"
          />
        </HeroSection.Media>
      </HeroSection.Root>
    </div>
  ),
  args: {
    layout: "split-left",
    padding: "lg",
    maxWidth: "lg",
    headingSize: "md",
  },
};

export const SplitRight: Story = {
  name: "Split right (image | text)",
  render: (args) => (
    <div className="bg-[var(--color-fw-background)]">
      <HeroSection.Root {...args}>
        <HeroSection.Text>
          <HeroSection.Eyebrow>Developer first</HeroSection.Eyebrow>
          <HeroSection.Heading>Built for the modern stack</HeroSection.Heading>
          <HeroSection.Subheading>
            React 19, TypeScript strict, Tailwind CSS 4, and Signals for
            reactivity.
          </HeroSection.Subheading>
          <HeroSection.Actions>
            <PrimaryButton href="/docs">Read the docs</PrimaryButton>
            <SecondaryButton href="/examples">See examples</SecondaryButton>
          </HeroSection.Actions>
        </HeroSection.Text>
        <HeroSection.Media>
          <HeroSection.Image
            src="https://placehold.co/800x600/1e293b/94a3b8?text=Code+Editor"
            alt="Code editor preview"
          />
        </HeroSection.Media>
      </HeroSection.Root>
    </div>
  ),
  args: {
    layout: "split-right",
    padding: "lg",
    maxWidth: "lg",
    headingSize: "md",
  },
};

export const WithVideo: Story = {
  name: "Centered + video (play/pause)",
  render: (args) => (
    <div className="bg-[var(--color-fw-background)]">
      <HeroSection.Root {...args}>
        <HeroSection.Text>
          <HeroSection.Eyebrow>Watch the demo</HeroSection.Eyebrow>
          <HeroSection.Heading>See it in action</HeroSection.Heading>
          <HeroSection.Subheading>
            Watch how FluxWind accelerates UI development from design to
            production.
          </HeroSection.Subheading>
          <HeroSection.Actions>
            <PrimaryButton href="/get-started">Get started free</PrimaryButton>
          </HeroSection.Actions>
        </HeroSection.Text>
        <HeroSection.Media>
          <HeroSection.Video
            src="https://www.w3schools.com/html/mov_bbb.mp4"
            poster="https://placehold.co/1280x720/1e293b/94a3b8?text=Click+to+Play"
            captionsSrc="data:text/vtt,WEBVTT"
            playLabel="Play demo video"
            pauseLabel="Pause demo video"
          />
        </HeroSection.Media>
      </HeroSection.Root>
    </div>
  ),
  args: {
    layout: "centered",
    padding: "lg",
    maxWidth: "lg",
    headingSize: "md",
  },
};

export const LargeHeading: Story = {
  name: "Large heading scale",
  render: (args) => (
    <div className="bg-[var(--color-fw-background)]">
      <HeroSection.Root {...args}>
        <HeroSection.Text>
          <HeroSection.Heading>The future of UI</HeroSection.Heading>
          <HeroSection.Subheading>
            A bold statement deserves a bold hero.
          </HeroSection.Subheading>
          <HeroSection.Actions>
            <PrimaryButton href="/get-started">Get started</PrimaryButton>
          </HeroSection.Actions>
        </HeroSection.Text>
      </HeroSection.Root>
    </div>
  ),
  args: {
    layout: "centered",
    padding: "lg",
    maxWidth: "md",
    headingSize: "lg",
  },
};
