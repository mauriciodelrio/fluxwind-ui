import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import axe from "axe-core";
import { Footer } from "./Footer";

// ─── Fixtures ─────────────────────────────────────────────────────────────────

const NAV_COLS = [
  {
    heading: "Product",
    links: [
      { label: "Features", href: "/features" },
      { label: "Pricing", href: "/pricing" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Blog", href: "/blog" },
    ],
  },
  {
    heading: "Legal",
    links: [
      { label: "Privacy", href: "/privacy" },
      { label: "Terms", href: "/terms" },
    ],
  },
];

function BasicFooter() {
  return (
    <Footer.Root>
      <Footer.Top>
        <Footer.Brand>
          <Footer.BrandName>FluxWind</Footer.BrandName>
          <Footer.Tagline>Ship faster. Build better.</Footer.Tagline>
        </Footer.Brand>
        <Footer.NavGrid columns={3}>
          {NAV_COLS.map((col) => (
            <Footer.NavColumn key={col.heading}>
              <Footer.NavHeading>{col.heading}</Footer.NavHeading>
              <Footer.NavList>
                {col.links.map((l) => (
                  <Footer.NavLink key={l.label} href={l.href}>
                    {l.label}
                  </Footer.NavLink>
                ))}
              </Footer.NavList>
            </Footer.NavColumn>
          ))}
        </Footer.NavGrid>
      </Footer.Top>
      <Footer.Bottom>
        <Footer.Copyright>
          © 2026 FluxWind. All rights reserved.
        </Footer.Copyright>
        <Footer.LegalList>
          <Footer.LegalLink href="/privacy">Privacy Policy</Footer.LegalLink>
          <Footer.LegalLink href="/terms">Terms of Service</Footer.LegalLink>
        </Footer.LegalList>
      </Footer.Bottom>
    </Footer.Root>
  );
}

function DarkFooter() {
  return (
    <Footer.Root background="dark">
      <Footer.Top>
        <Footer.Brand>
          <Footer.BrandName background="dark">FluxWind</Footer.BrandName>
          <Footer.Tagline background="dark">
            Ship faster. Build better.
          </Footer.Tagline>
        </Footer.Brand>
        <Footer.NavGrid>
          <Footer.NavColumn>
            <Footer.NavHeading background="dark">Product</Footer.NavHeading>
            <Footer.NavList>
              <Footer.NavLink background="dark" href="/features">
                Features
              </Footer.NavLink>
            </Footer.NavList>
          </Footer.NavColumn>
        </Footer.NavGrid>
      </Footer.Top>
      <Footer.Bottom background="dark">
        <Footer.Copyright background="dark">© 2026 FluxWind.</Footer.Copyright>
      </Footer.Bottom>
    </Footer.Root>
  );
}

function FooterWithSocial() {
  return (
    <Footer.Root>
      <Footer.Top>
        <Footer.Brand>
          <Footer.BrandName>FluxWind</Footer.BrandName>
          <Footer.SocialRow>
            <Footer.SocialLink href="https://github.com" label="GitHub">
              GH
            </Footer.SocialLink>
            <Footer.SocialLink href="https://twitter.com" label="Twitter / X">
              X
            </Footer.SocialLink>
          </Footer.SocialRow>
        </Footer.Brand>
        <Footer.NavGrid columns={2}>
          <Footer.NavColumn>
            <Footer.NavHeading>Product</Footer.NavHeading>
            <Footer.NavList>
              <Footer.NavLink href="/features">Features</Footer.NavLink>
            </Footer.NavList>
          </Footer.NavColumn>
          <Footer.NavColumn>
            <Footer.NavHeading>Legal</Footer.NavHeading>
            <Footer.NavList>
              <Footer.NavLink href="/privacy">Privacy</Footer.NavLink>
            </Footer.NavList>
          </Footer.NavColumn>
        </Footer.NavGrid>
      </Footer.Top>
      <Footer.Bottom>
        <Footer.Copyright>© 2026 FluxWind.</Footer.Copyright>
      </Footer.Bottom>
    </Footer.Root>
  );
}

// ─── Structure ────────────────────────────────────────────────────────────────

describe("Footer — structure", () => {
  it("renders a <footer> landmark", () => {
    render(<BasicFooter />);
    expect(screen.getByRole("contentinfo")).toBeTruthy();
  });

  it("renders brand name", () => {
    render(<BasicFooter />);
    expect(screen.getByText("FluxWind")).toBeTruthy();
  });

  it("renders tagline", () => {
    render(<BasicFooter />);
    expect(screen.getByText("Ship faster. Build better.")).toBeTruthy();
  });

  it("renders all nav column headings", () => {
    render(<BasicFooter />);
    expect(screen.getByText("Product")).toBeTruthy();
    expect(screen.getByText("Company")).toBeTruthy();
    expect(screen.getByText("Legal")).toBeTruthy();
  });

  it("renders nav links as <a> elements", () => {
    render(<BasicFooter />);
    expect(screen.getByRole("link", { name: "Features" })).toBeTruthy();
    expect(screen.getByRole("link", { name: "Pricing" })).toBeTruthy();
  });

  it("renders copyright text", () => {
    render(<BasicFooter />);
    expect(screen.getByText(/© 2026 FluxWind/)).toBeTruthy();
  });

  it("renders legal links", () => {
    render(<BasicFooter />);
    expect(screen.getByRole("link", { name: "Privacy Policy" })).toBeTruthy();
    expect(screen.getByRole("link", { name: "Terms of Service" })).toBeTruthy();
  });
});

// ─── Social links ─────────────────────────────────────────────────────────────

describe("Footer — social links", () => {
  it("renders social links with aria-label", () => {
    render(<FooterWithSocial />);
    expect(screen.getByRole("link", { name: "GitHub" })).toBeTruthy();
    expect(screen.getByRole("link", { name: "Twitter / X" })).toBeTruthy();
  });

  it("wraps social icon content in aria-hidden span", () => {
    const { container } = render(<FooterWithSocial />);
    const spans = container.querySelectorAll("[aria-hidden='true']");
    expect(spans.length).toBeGreaterThanOrEqual(2);
  });
});

// ─── Variants ─────────────────────────────────────────────────────────────────

describe("Footer — variants", () => {
  it("applies dark background class", () => {
    const { container } = render(<DarkFooter />);
    const footer = container.querySelector("footer");
    expect(footer?.className).toContain("bg-[var(--color-fw-foreground)]");
  });

  it("applies muted background class", () => {
    const { container } = render(
      <Footer.Root background="muted">
        <Footer.Bottom>
          <Footer.Copyright>© 2026</Footer.Copyright>
        </Footer.Bottom>
      </Footer.Root>,
    );
    const footer = container.querySelector("footer");
    expect(footer?.className).toContain("bg-[var(--color-fw-secondary)]");
  });

  it("applies 2-column grid class", () => {
    const { container } = render(<FooterWithSocial />);
    const grid = container.querySelector(".grid-cols-2");
    expect(grid).toBeTruthy();
  });
});

// ─── Props passthrough ────────────────────────────────────────────────────────

describe("Footer — props passthrough", () => {
  it("forwards data-testid to <footer>", () => {
    const { getByTestId } = render(
      <Footer.Root data-testid="footer-root">
        <Footer.Bottom>
          <Footer.Copyright>© 2026</Footer.Copyright>
        </Footer.Bottom>
      </Footer.Root>,
    );
    expect(getByTestId("footer-root")).toBeTruthy();
  });

  it("merges custom className on Root", () => {
    const { container } = render(
      <Footer.Root className="extra-class">
        <Footer.Bottom>
          <Footer.Copyright>© 2026</Footer.Copyright>
        </Footer.Bottom>
      </Footer.Root>,
    );
    expect(container.querySelector("footer")?.className).toContain(
      "extra-class",
    );
  });
});

// ─── Accessibility ────────────────────────────────────────────────────────────

describe("Footer — a11y", () => {
  it("basic footer has no axe violations", async () => {
    const { container } = render(<BasicFooter />);
    const results = await axe.run(container);
    expect(results.violations).toHaveLength(0);
  });

  it("dark footer has no axe violations", async () => {
    const { container } = render(<DarkFooter />);
    const results = await axe.run(container);
    expect(results.violations).toHaveLength(0);
  });

  it("footer with social links has no axe violations", async () => {
    const { container } = render(<FooterWithSocial />);
    const results = await axe.run(container);
    expect(results.violations).toHaveLength(0);
  });
});
