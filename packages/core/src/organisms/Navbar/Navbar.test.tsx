import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import axe from "axe-core";
import { Navbar } from "./Navbar";

// ─── Fixtures ─────────────────────────────────────────────────────────────────

function BasicNavbar({ sticky = false }: { sticky?: boolean }) {
  return (
    <Navbar.Root sticky={sticky}>
      <Navbar.Brand href="/">Brand</Navbar.Brand>
      <Navbar.Links>
        <Navbar.Link href="/home" active>
          Home
        </Navbar.Link>
        <Navbar.Link href="/about">About</Navbar.Link>
        <Navbar.Link href="/contact">Contact</Navbar.Link>
      </Navbar.Links>
      <Navbar.Actions>
        <button type="button">Sign in</button>
      </Navbar.Actions>
      <Navbar.MobileToggle />
      <Navbar.MobileMenu>
        <Navbar.MobileLink href="/home" active>
          Home
        </Navbar.MobileLink>
        <Navbar.MobileLink href="/about">About</Navbar.MobileLink>
        <Navbar.MobileLink href="/contact">Contact</Navbar.MobileLink>
      </Navbar.MobileMenu>
    </Navbar.Root>
  );
}

// ─── Structure ────────────────────────────────────────────────────────────────

describe("Navbar – structure", () => {
  it("renders a header landmark", () => {
    render(<BasicNavbar />);
    expect(screen.getByRole("banner")).toBeInTheDocument();
  });

  it("renders a navigation landmark", () => {
    render(<BasicNavbar />);
    expect(
      screen.getByRole("navigation", { name: "Main navigation" }),
    ).toBeInTheDocument();
  });

  it("renders the brand link", () => {
    render(<BasicNavbar />);
    expect(screen.getByRole("link", { name: "Brand" })).toBeInTheDocument();
  });

  it("renders desktop nav links", () => {
    render(<BasicNavbar />);
    expect(screen.getByRole("link", { name: "Home" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "About" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Contact" })).toBeInTheDocument();
  });

  it("renders the mobile toggle button", () => {
    render(<BasicNavbar />);
    expect(
      screen.getByRole("button", { name: "Open menu" }),
    ).toBeInTheDocument();
  });

  it("mobile menu is hidden by default", () => {
    render(<BasicNavbar />);
    // MobileMenu renders null when closed — mobile links should not be in the DOM
    expect(screen.queryByRole("link", { name: "Home" })).toBeInTheDocument(); // desktop link still there
    // Mobile panel div is absent
    const toggle = screen.getByRole("button", { name: "Open menu" });
    const menuId = toggle.getAttribute("aria-controls") ?? "";
    expect(document.getElementById(menuId)).toBeNull();
  });
});

// ─── ARIA ─────────────────────────────────────────────────────────────────────

describe("Navbar – ARIA", () => {
  it("active desktop link has aria-current=page", () => {
    render(<BasicNavbar />);
    expect(screen.getByRole("link", { name: "Home" })).toHaveAttribute(
      "aria-current",
      "page",
    );
  });

  it("inactive desktop links do not have aria-current", () => {
    render(<BasicNavbar />);
    expect(screen.getByRole("link", { name: "About" })).not.toHaveAttribute(
      "aria-current",
    );
  });

  it("toggle button has aria-expanded=false when menu is closed", () => {
    render(<BasicNavbar />);
    expect(screen.getByRole("button", { name: "Open menu" })).toHaveAttribute(
      "aria-expanded",
      "false",
    );
  });

  it("toggle button has aria-controls pointing to the menu panel", async () => {
    const user = userEvent.setup();
    render(<BasicNavbar />);

    await user.click(screen.getByRole("button", { name: "Open menu" }));

    const toggle = screen.getByRole("button", { name: "Close menu" });
    const menuId = toggle.getAttribute("aria-controls") ?? "";
    expect(document.getElementById(menuId)).toBeInTheDocument();
  });

  it("passes axe accessibility audit (closed menu)", async () => {
    const { container } = render(
      <div>
        <BasicNavbar />
      </div>,
    );
    const results = await axe.run(container);
    expect(results.violations).toHaveLength(0);
  });

  it("passes axe accessibility audit (open menu)", async () => {
    const user = userEvent.setup();
    const { container } = render(
      <div>
        <BasicNavbar />
      </div>,
    );
    await user.click(screen.getByRole("button", { name: "Open menu" }));
    const results = await axe.run(container);
    expect(results.violations).toHaveLength(0);
  });
});

// ─── Interaction ──────────────────────────────────────────────────────────────

describe("Navbar – interaction", () => {
  it("clicking the toggle opens the mobile menu", async () => {
    const user = userEvent.setup();
    render(<BasicNavbar />);

    await user.click(screen.getByRole("button", { name: "Open menu" }));

    expect(screen.getByRole("button", { name: "Close menu" })).toHaveAttribute(
      "aria-expanded",
      "true",
    );
  });

  it("clicking the toggle again closes the mobile menu", async () => {
    const user = userEvent.setup();
    render(<BasicNavbar />);

    await user.click(screen.getByRole("button", { name: "Open menu" }));
    await user.click(screen.getByRole("button", { name: "Close menu" }));

    expect(screen.getByRole("button", { name: "Open menu" })).toHaveAttribute(
      "aria-expanded",
      "false",
    );
  });

  it("mobile menu panel is present in DOM when open", async () => {
    const user = userEvent.setup();
    render(<BasicNavbar />);

    await user.click(screen.getByRole("button", { name: "Open menu" }));

    const toggle = screen.getByRole("button", { name: "Close menu" });
    const menuId = toggle.getAttribute("aria-controls") ?? "";
    expect(document.getElementById(menuId)).toBeInTheDocument();
  });

  it("active mobile link has aria-current=page when menu is open", async () => {
    const user = userEvent.setup();
    render(<BasicNavbar />);

    await user.click(screen.getByRole("button", { name: "Open menu" }));

    // There will be two "Home" links (desktop + mobile); both visible in DOM
    const homeLinks = screen.getAllByRole("link", { name: "Home" });
    const mobileHome = homeLinks.find(
      (l) => l.getAttribute("aria-current") === "page",
    );
    expect(mobileHome).toBeDefined();
  });

  it("clicking a mobile link closes the menu", async () => {
    const user = userEvent.setup();
    render(<BasicNavbar />);

    await user.click(screen.getByRole("button", { name: "Open menu" }));
    // Desktop + mobile "About" links are both in DOM; take the last one (mobile)
    const aboutLinks = screen.getAllByRole("link", { name: "About" });
    await user.click(aboutLinks[aboutLinks.length - 1]);

    expect(screen.getByRole("button", { name: "Open menu" })).toHaveAttribute(
      "aria-expanded",
      "false",
    );
  });
});

// ─── Keyboard ─────────────────────────────────────────────────────────────────

describe("Navbar – keyboard", () => {
  it("pressing Escape closes the open menu", async () => {
    const user = userEvent.setup();
    render(<BasicNavbar />);

    await user.click(screen.getByRole("button", { name: "Open menu" }));
    await user.keyboard("{Escape}");

    expect(screen.getByRole("button", { name: "Open menu" })).toHaveAttribute(
      "aria-expanded",
      "false",
    );
  });

  it("Escape returns focus to the toggle button", async () => {
    const user = userEvent.setup();
    render(<BasicNavbar />);

    await user.click(screen.getByRole("button", { name: "Open menu" }));
    await user.keyboard("{Escape}");

    expect(screen.getByRole("button", { name: "Open menu" })).toHaveFocus();
  });

  it("pressing Escape when menu is already closed does nothing", async () => {
    const user = userEvent.setup();
    render(<BasicNavbar />);

    // Menu is already closed; just verify no error and state unchanged
    await user.keyboard("{Escape}");

    expect(screen.getByRole("button", { name: "Open menu" })).toHaveAttribute(
      "aria-expanded",
      "false",
    );
  });
});

// ─── Props passthrough ────────────────────────────────────────────────────────

describe("Navbar – props passthrough", () => {
  it("Root forwards className to the header element", () => {
    render(
      <Navbar.Root className="custom-root">
        <Navbar.MobileToggle />
        <Navbar.MobileMenu>
          <span>item</span>
        </Navbar.MobileMenu>
      </Navbar.Root>,
    );
    expect(screen.getByRole("banner")).toHaveClass("custom-root");
  });

  it("Root accepts a custom navLabel", () => {
    render(
      <Navbar.Root navLabel="Site navigation">
        <Navbar.MobileToggle />
        <Navbar.MobileMenu>
          <span>item</span>
        </Navbar.MobileMenu>
      </Navbar.Root>,
    );
    expect(
      screen.getByRole("navigation", { name: "Site navigation" }),
    ).toBeInTheDocument();
  });

  it("Brand forwards href", () => {
    render(
      <Navbar.Root>
        <Navbar.Brand href="/home">Logo</Navbar.Brand>
        <Navbar.MobileToggle />
        <Navbar.MobileMenu>
          <span>item</span>
        </Navbar.MobileMenu>
      </Navbar.Root>,
    );
    expect(screen.getByRole("link", { name: "Logo" })).toHaveAttribute(
      "href",
      "/home",
    );
  });

  it("MobileToggle accepts custom open/close labels", async () => {
    const user = userEvent.setup();
    render(
      <Navbar.Root>
        <Navbar.MobileToggle openLabel="Abrir menú" closeLabel="Cerrar menú" />
        <Navbar.MobileMenu>
          <span>item</span>
        </Navbar.MobileMenu>
      </Navbar.Root>,
    );

    expect(
      screen.getByRole("button", { name: "Abrir menú" }),
    ).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Abrir menú" }));
    expect(
      screen.getByRole("button", { name: "Cerrar menú" }),
    ).toBeInTheDocument();
  });

  it("throws when context-dependent sub-component is used outside Navbar.Root", () => {
    const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    expect(() => render(<Navbar.MobileToggle />)).toThrow(
      "<Navbar.MobileToggle> must be rendered inside <Navbar.Root>.",
    );
    consoleSpy.mockRestore();
  });
});
