import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import axe from "axe-core";
import { CTASection } from "./CTASection";

// ─── Fixtures ─────────────────────────────────────────────────────────────────

function BasicCTA() {
  return (
    <CTASection.Root>
      <CTASection.TextBlock>
        <CTASection.Eyebrow>Get started</CTASection.Eyebrow>
        <CTASection.Heading>Boost your productivity</CTASection.Heading>
        <CTASection.Subheading>
          Start shipping faster with FluxWind.
        </CTASection.Subheading>
      </CTASection.TextBlock>
      <CTASection.Actions>
        <a href="/signup">Get started</a>
        <a href="/docs">Learn more</a>
      </CTASection.Actions>
    </CTASection.Root>
  );
}

function BrandCTA() {
  return (
    <CTASection.Root background="brand" layout="centered">
      <CTASection.TextBlock>
        <CTASection.Heading background="brand">
          Ready to ship?
        </CTASection.Heading>
        <CTASection.Subheading background="brand">
          Join thousands of developers.
        </CTASection.Subheading>
      </CTASection.TextBlock>
      <CTASection.Actions>
        <a href="/signup">Sign up free</a>
      </CTASection.Actions>
    </CTASection.Root>
  );
}

function SplitCTA() {
  return (
    <CTASection.Root layout="split">
      <CTASection.TextBlock layout="split">
        <CTASection.Heading>Start today</CTASection.Heading>
      </CTASection.TextBlock>
      <CTASection.Actions layout="split">
        <a href="/signup">Get started</a>
      </CTASection.Actions>
    </CTASection.Root>
  );
}

function CTAWithDivider() {
  return (
    <CTASection.Root divider>
      <CTASection.TextBlock>
        <CTASection.Heading>Above the fold</CTASection.Heading>
      </CTASection.TextBlock>
    </CTASection.Root>
  );
}

// ─── Structure ────────────────────────────────────────────────────────────────

describe("CTASection — structure", () => {
  it("renders as <section> by default", () => {
    const { container } = render(<BasicCTA />);
    expect(container.querySelector("section")).toBeTruthy();
  });

  it("renders as <div> when as='div'", () => {
    const { container } = render(
      <CTASection.Root as="div">
        <CTASection.TextBlock>
          <CTASection.Heading>Test</CTASection.Heading>
        </CTASection.TextBlock>
      </CTASection.Root>,
    );
    expect(container.querySelector("div")).toBeTruthy();
    expect(container.querySelector("section")).toBeFalsy();
  });

  it("renders heading text", () => {
    render(<BasicCTA />);
    expect(
      screen.getByRole("heading", { name: "Boost your productivity" }),
    ).toBeTruthy();
  });

  it("renders eyebrow text", () => {
    render(<BasicCTA />);
    expect(screen.getByText("Get started", { selector: "p" })).toBeTruthy();
  });

  it("renders subheading text", () => {
    render(<BasicCTA />);
    expect(
      screen.getByText("Start shipping faster with FluxWind."),
    ).toBeTruthy();
  });

  it("renders action links", () => {
    render(<BasicCTA />);
    expect(screen.getByRole("link", { name: "Learn more" })).toBeTruthy();
  });

  it("renders divider when divider=true", () => {
    const { container } = render(<CTAWithDivider />);
    // aria-hidden divider div
    expect(container.querySelector("[aria-hidden='true']")).toBeTruthy();
  });

  it("does NOT render divider when divider=false (default)", () => {
    const { container } = render(<BasicCTA />);
    expect(container.querySelector("[aria-hidden='true']")).toBeFalsy();
  });
});

// ─── Heading levels ───────────────────────────────────────────────────────────

describe("CTASection — heading levels", () => {
  it("defaults to h2", () => {
    render(<BasicCTA />);
    expect(screen.getByRole("heading", { level: 2 })).toBeTruthy();
  });

  it("renders h1 when as='h1'", () => {
    render(
      <CTASection.Root>
        <CTASection.TextBlock>
          <CTASection.Heading as="h1">H1 heading</CTASection.Heading>
        </CTASection.TextBlock>
      </CTASection.Root>,
    );
    expect(screen.getByRole("heading", { level: 1 })).toBeTruthy();
  });

  it("renders h3 when as='h3'", () => {
    render(
      <CTASection.Root>
        <CTASection.TextBlock>
          <CTASection.Heading as="h3">H3 heading</CTASection.Heading>
        </CTASection.TextBlock>
      </CTASection.Root>,
    );
    expect(screen.getByRole("heading", { level: 3 })).toBeTruthy();
  });
});

// ─── Variants ─────────────────────────────────────────────────────────────────

describe("CTASection — variants", () => {
  it("applies brand background class", () => {
    const { container } = render(<BrandCTA />);
    const section = container.querySelector("section");
    expect(section?.className).toContain("bg-[var(--color-fw-primary)]");
  });

  it("applies dark background class", () => {
    const { container } = render(
      <CTASection.Root background="dark">
        <CTASection.TextBlock>
          <CTASection.Heading background="dark">Dark</CTASection.Heading>
        </CTASection.TextBlock>
      </CTASection.Root>,
    );
    const section = container.querySelector("section");
    expect(section?.className).toContain("bg-[var(--color-fw-foreground)]");
  });

  it("applies split layout flex class on inner wrapper", () => {
    const { container } = render(<SplitCTA />);
    // The ctaInnerVariants with split adds sm:flex-row
    const inner = container.querySelector(".flex");
    expect(inner?.className).toContain("sm:flex-row");
  });
});

// ─── Props passthrough ────────────────────────────────────────────────────────

describe("CTASection — props passthrough", () => {
  it("forwards data-testid to root element", () => {
    const { getByTestId } = render(
      <CTASection.Root data-testid="cta-root">
        <CTASection.TextBlock>
          <CTASection.Heading>Test</CTASection.Heading>
        </CTASection.TextBlock>
      </CTASection.Root>,
    );
    expect(getByTestId("cta-root")).toBeTruthy();
  });

  it("merges custom className on Root", () => {
    const { container } = render(
      <CTASection.Root className="custom-class">
        <CTASection.TextBlock>
          <CTASection.Heading>Test</CTASection.Heading>
        </CTASection.TextBlock>
      </CTASection.Root>,
    );
    expect(container.querySelector("section")?.className).toContain(
      "custom-class",
    );
  });
});

// ─── Accessibility ────────────────────────────────────────────────────────────

describe("CTASection — a11y", () => {
  it("basic CTA has no axe violations", async () => {
    const { container } = render(
      <main>
        <BasicCTA />
      </main>,
    );
    const results = await axe.run(container);
    expect(results.violations).toHaveLength(0);
  });

  it("brand background CTA has no axe violations", async () => {
    const { container } = render(
      <main>
        <BrandCTA />
      </main>,
    );
    const results = await axe.run(container);
    expect(results.violations).toHaveLength(0);
  });

  it("split layout CTA has no axe violations", async () => {
    const { container } = render(
      <main>
        <SplitCTA />
      </main>,
    );
    const results = await axe.run(container);
    expect(results.violations).toHaveLength(0);
  });
});
