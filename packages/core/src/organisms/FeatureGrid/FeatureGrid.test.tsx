import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import axe from "axe-core";
import { FeatureGrid } from "./FeatureGrid";

// ─── Fixtures ─────────────────────────────────────────────────────────────────

function BasicGrid() {
  return (
    <FeatureGrid.Root>
      <FeatureGrid.Header>
        <FeatureGrid.Eyebrow>Why FluxWind</FeatureGrid.Eyebrow>
        <FeatureGrid.Heading>Everything you need</FeatureGrid.Heading>
        <FeatureGrid.Subheading>
          Accessible, themeable, production-ready.
        </FeatureGrid.Subheading>
      </FeatureGrid.Header>
      <FeatureGrid.List columns={3}>
        <FeatureGrid.Card>
          <FeatureGrid.Icon>
            <span>⚡</span>
          </FeatureGrid.Icon>
          <FeatureGrid.Title>Fast</FeatureGrid.Title>
          <FeatureGrid.Body>Zero overhead at runtime.</FeatureGrid.Body>
        </FeatureGrid.Card>
        <FeatureGrid.Card>
          <FeatureGrid.Title>Accessible</FeatureGrid.Title>
          <FeatureGrid.Body>WCAG 2.2 AA out of the box.</FeatureGrid.Body>
        </FeatureGrid.Card>
        <FeatureGrid.Card>
          <FeatureGrid.Title>Themeable</FeatureGrid.Title>
          <FeatureGrid.Body>CSS custom properties throughout.</FeatureGrid.Body>
          <FeatureGrid.Link href="/themes">Explore themes</FeatureGrid.Link>
        </FeatureGrid.Card>
      </FeatureGrid.List>
    </FeatureGrid.Root>
  );
}

// ─── Structure ────────────────────────────────────────────────────────────────

describe("FeatureGrid – structure", () => {
  it("renders a section landmark", () => {
    render(<BasicGrid />);
    const section = document.querySelector("section");
    expect(section).toBeInTheDocument();
  });

  it("renders eyebrow text", () => {
    render(<BasicGrid />);
    expect(screen.getByText("Why FluxWind")).toBeInTheDocument();
  });

  it("renders heading as h2 by default", () => {
    render(<BasicGrid />);
    expect(
      screen.getByRole("heading", { level: 2, name: "Everything you need" }),
    ).toBeInTheDocument();
  });

  it("renders heading as h3 when as='h3'", () => {
    render(
      <FeatureGrid.Root>
        <FeatureGrid.Heading as="h3">Secondary</FeatureGrid.Heading>
        <FeatureGrid.List>
          <FeatureGrid.Card>
            <FeatureGrid.Title>A</FeatureGrid.Title>
          </FeatureGrid.Card>
        </FeatureGrid.List>
      </FeatureGrid.Root>,
    );
    expect(
      screen.getByRole("heading", { level: 3, name: "Secondary" }),
    ).toBeInTheDocument();
  });

  it("renders subheading text", () => {
    render(<BasicGrid />);
    expect(
      screen.getByText("Accessible, themeable, production-ready."),
    ).toBeInTheDocument();
  });

  it("renders card titles", () => {
    render(<BasicGrid />);
    expect(
      screen.getByRole("heading", { level: 3, name: "Fast" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { level: 3, name: "Accessible" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { level: 3, name: "Themeable" }),
    ).toBeInTheDocument();
  });

  it("renders card body text", () => {
    render(<BasicGrid />);
    expect(screen.getByText("Zero overhead at runtime.")).toBeInTheDocument();
  });

  it("renders card title as h4 when as='h4'", () => {
    render(
      <FeatureGrid.Root>
        <FeatureGrid.List>
          <FeatureGrid.Card>
            <FeatureGrid.Title as="h4">Deep nested</FeatureGrid.Title>
            <FeatureGrid.Body>Body text.</FeatureGrid.Body>
          </FeatureGrid.Card>
        </FeatureGrid.List>
      </FeatureGrid.Root>,
    );
    expect(
      screen.getByRole("heading", { level: 4, name: "Deep nested" }),
    ).toBeInTheDocument();
  });

  it("renders FeatureGrid.Link with href and arrow", () => {
    render(<BasicGrid />);
    // The → arrow is aria-hidden; accessible name is children text only
    const link = screen.getByRole("link", { name: "Explore themes" });
    expect(link).toHaveAttribute("href", "/themes");
  });

  it("icon wrapper has aria-hidden", () => {
    render(<BasicGrid />);
    const icon = screen.getByText("⚡").closest("[aria-hidden]");
    expect(icon).toHaveAttribute("aria-hidden", "true");
  });
});

// ─── Variants ─────────────────────────────────────────────────────────────────

describe("FeatureGrid – variants", () => {
  it("applies outlined variant class to card", () => {
    render(
      <FeatureGrid.Root>
        <FeatureGrid.List>
          <FeatureGrid.Card variant="outlined" data-testid="card">
            <FeatureGrid.Title>Outlined</FeatureGrid.Title>
            <FeatureGrid.Body>Body.</FeatureGrid.Body>
          </FeatureGrid.Card>
        </FeatureGrid.List>
      </FeatureGrid.Root>,
    );
    const card = screen.getByTestId("card");
    expect(card.className).toContain("border");
  });

  it("applies elevated variant shadow class to card", () => {
    render(
      <FeatureGrid.Root>
        <FeatureGrid.List>
          <FeatureGrid.Card variant="elevated" data-testid="card">
            <FeatureGrid.Title>Elevated</FeatureGrid.Title>
            <FeatureGrid.Body>Body.</FeatureGrid.Body>
          </FeatureGrid.Card>
        </FeatureGrid.List>
      </FeatureGrid.Root>,
    );
    const card = screen.getByTestId("card");
    expect(card.className).toContain("shadow");
  });

  it("applies interactive classes when interactive=true", () => {
    render(
      <FeatureGrid.Root>
        <FeatureGrid.List>
          <FeatureGrid.Card interactive data-testid="card">
            <FeatureGrid.Title>Interactive</FeatureGrid.Title>
            <FeatureGrid.Body>Body.</FeatureGrid.Body>
          </FeatureGrid.Card>
        </FeatureGrid.List>
      </FeatureGrid.Root>,
    );
    const card = screen.getByTestId("card");
    expect(card.className).toContain("cursor-pointer");
  });

  it("applies center-align class when align='center'", () => {
    render(
      <FeatureGrid.Root>
        <FeatureGrid.List>
          <FeatureGrid.Card align="center" data-testid="card">
            <FeatureGrid.Title>Centered</FeatureGrid.Title>
            <FeatureGrid.Body>Body.</FeatureGrid.Body>
          </FeatureGrid.Card>
        </FeatureGrid.List>
      </FeatureGrid.Root>,
    );
    const card = screen.getByTestId("card");
    expect(card.className).toContain("items-center");
  });
});

// ─── Props passthrough ────────────────────────────────────────────────────────

describe("FeatureGrid – props passthrough", () => {
  it("forwards className on Root", () => {
    render(
      <FeatureGrid.Root className="custom-section" data-testid="root">
        <FeatureGrid.List>
          <FeatureGrid.Card>
            <FeatureGrid.Title>X</FeatureGrid.Title>
            <FeatureGrid.Body>Y</FeatureGrid.Body>
          </FeatureGrid.Card>
        </FeatureGrid.List>
      </FeatureGrid.Root>,
    );
    expect(screen.getByTestId("root").className).toContain("custom-section");
  });

  it("forwards className on Card", () => {
    render(
      <FeatureGrid.Root>
        <FeatureGrid.List>
          <FeatureGrid.Card className="custom-card" data-testid="card">
            <FeatureGrid.Title>X</FeatureGrid.Title>
            <FeatureGrid.Body>Y</FeatureGrid.Body>
          </FeatureGrid.Card>
        </FeatureGrid.List>
      </FeatureGrid.Root>,
    );
    expect(screen.getByTestId("card").className).toContain("custom-card");
  });
});

// ─── Accessibility ────────────────────────────────────────────────────────────

describe("FeatureGrid – accessibility (axe)", () => {
  it("passes axe on basic three-column grid", async () => {
    const { container } = render(<BasicGrid />);
    const results = await axe.run(container);
    expect(results.violations).toHaveLength(0);
  });

  it("passes axe on 2-column outlined grid", async () => {
    const { container } = render(
      <FeatureGrid.Root>
        <FeatureGrid.Heading>Features</FeatureGrid.Heading>
        <FeatureGrid.List columns={2}>
          <FeatureGrid.Card variant="outlined">
            <FeatureGrid.Title>Alpha</FeatureGrid.Title>
            <FeatureGrid.Body>Alpha body.</FeatureGrid.Body>
          </FeatureGrid.Card>
          <FeatureGrid.Card variant="outlined">
            <FeatureGrid.Title>Beta</FeatureGrid.Title>
            <FeatureGrid.Body>Beta body.</FeatureGrid.Body>
          </FeatureGrid.Card>
        </FeatureGrid.List>
      </FeatureGrid.Root>,
    );
    const results = await axe.run(container);
    expect(results.violations).toHaveLength(0);
  });

  it("passes axe on 4-column elevated interactive grid", async () => {
    const { container } = render(
      <FeatureGrid.Root>
        <FeatureGrid.Heading>Why us</FeatureGrid.Heading>
        <FeatureGrid.List columns={4}>
          {(["Speed", "Safety", "Scale", "Support"] as const).map((label) => (
            <FeatureGrid.Card key={label} variant="elevated" interactive>
              <FeatureGrid.Title>{label}</FeatureGrid.Title>
              <FeatureGrid.Body>
                Description of {label.toLowerCase()}.
              </FeatureGrid.Body>
            </FeatureGrid.Card>
          ))}
        </FeatureGrid.List>
      </FeatureGrid.Root>,
    );
    const results = await axe.run(container);
    expect(results.violations).toHaveLength(0);
  });
});
