import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import axe from "axe-core";
import { ComponentShowcase } from "./ComponentShowcase";

// ─── Fixtures ─────────────────────────────────────────────────────────────────

function BasicShowcase({ defaultTab = "tab-a" }: { defaultTab?: string }) {
  return (
    <ComponentShowcase.Root defaultTab={defaultTab} aria-label="Test showcase">
      <ComponentShowcase.Header>
        <h2>Test Showcase</h2>
      </ComponentShowcase.Header>
      <ComponentShowcase.TabList aria-label="Test tabs">
        <ComponentShowcase.Tab value="tab-a">Tab A</ComponentShowcase.Tab>
        <ComponentShowcase.Tab value="tab-b">Tab B</ComponentShowcase.Tab>
        <ComponentShowcase.Tab value="tab-c">Tab C</ComponentShowcase.Tab>
      </ComponentShowcase.TabList>
      <ComponentShowcase.Panel value="tab-a">
        <ComponentShowcase.Items columns={2}>
          <ComponentShowcase.Item label="Item 1">
            <span>Content A1</span>
          </ComponentShowcase.Item>
          <ComponentShowcase.Item label="Item 2">
            <span>Content A2</span>
          </ComponentShowcase.Item>
        </ComponentShowcase.Items>
      </ComponentShowcase.Panel>
      <ComponentShowcase.Panel value="tab-b">
        <span>Content B</span>
      </ComponentShowcase.Panel>
      <ComponentShowcase.Panel value="tab-c">
        <span>Content C</span>
      </ComponentShowcase.Panel>
    </ComponentShowcase.Root>
  );
}

function ShowcaseNoDefault() {
  return (
    <ComponentShowcase.Root>
      <ComponentShowcase.TabList>
        <ComponentShowcase.Tab value="x">X</ComponentShowcase.Tab>
      </ComponentShowcase.TabList>
      <ComponentShowcase.Panel value="x">
        <span>Panel X</span>
      </ComponentShowcase.Panel>
    </ComponentShowcase.Root>
  );
}

// ─── Structure ────────────────────────────────────────────────────────────────

describe("ComponentShowcase – structure", () => {
  it("renders a section landmark with aria-label", () => {
    render(<BasicShowcase />);
    expect(
      screen.getByRole("region", { name: "Test showcase" }),
    ).toBeInTheDocument();
  });

  it("renders the tablist with correct aria-label", () => {
    render(<BasicShowcase />);
    expect(
      screen.getByRole("tablist", { name: "Test tabs" }),
    ).toBeInTheDocument();
  });

  it("renders all tabs", () => {
    render(<BasicShowcase />);
    expect(screen.getByRole("tab", { name: "Tab A" })).toBeInTheDocument();
    expect(screen.getByRole("tab", { name: "Tab B" })).toBeInTheDocument();
    expect(screen.getByRole("tab", { name: "Tab C" })).toBeInTheDocument();
  });

  it("renders the header", () => {
    render(<BasicShowcase />);
    expect(
      screen.getByRole("heading", { name: "Test Showcase" }),
    ).toBeInTheDocument();
  });
});

// ─── Default tab ─────────────────────────────────────────────────────────────

describe("ComponentShowcase – default tab", () => {
  it("shows the defaultTab panel on mount", () => {
    render(<BasicShowcase defaultTab="tab-a" />);
    expect(screen.getByText("Content A1")).toBeInTheDocument();
    expect(screen.queryByText("Content B")).not.toBeInTheDocument();
  });

  it("active tab has aria-selected=true", () => {
    render(<BasicShowcase defaultTab="tab-a" />);
    const tabA = screen.getByRole("tab", { name: "Tab A" });
    expect(tabA).toHaveAttribute("aria-selected", "true");
  });

  it("inactive tabs have aria-selected=false", () => {
    render(<BasicShowcase defaultTab="tab-a" />);
    const tabB = screen.getByRole("tab", { name: "Tab B" });
    const tabC = screen.getByRole("tab", { name: "Tab C" });
    expect(tabB).toHaveAttribute("aria-selected", "false");
    expect(tabC).toHaveAttribute("aria-selected", "false");
  });

  it("active tab has tabIndex=0, inactive have tabIndex=-1", () => {
    render(<BasicShowcase defaultTab="tab-a" />);
    expect(screen.getByRole("tab", { name: "Tab A" })).toHaveAttribute(
      "tabindex",
      "0",
    );
    expect(screen.getByRole("tab", { name: "Tab B" })).toHaveAttribute(
      "tabindex",
      "-1",
    );
  });

  it("renders no panel when defaultTab does not match any value", () => {
    render(<ShowcaseNoDefault />);
    // Panel X has value "x", defaultTab is "" → panel not rendered
    expect(screen.queryByText("Panel X")).not.toBeInTheDocument();
  });
});

// ─── Tab switching ────────────────────────────────────────────────────────────

describe("ComponentShowcase – tab switching", () => {
  it("shows the clicked tab panel and hides the previous", async () => {
    const user = userEvent.setup();
    render(<BasicShowcase defaultTab="tab-a" />);

    await user.click(screen.getByRole("tab", { name: "Tab B" }));

    expect(screen.getByText("Content B")).toBeInTheDocument();
    expect(screen.queryByText("Content A1")).not.toBeInTheDocument();
  });

  it("clicking a tab updates aria-selected", async () => {
    const user = userEvent.setup();
    render(<BasicShowcase defaultTab="tab-a" />);

    await user.click(screen.getByRole("tab", { name: "Tab B" }));

    expect(screen.getByRole("tab", { name: "Tab B" })).toHaveAttribute(
      "aria-selected",
      "true",
    );
    expect(screen.getByRole("tab", { name: "Tab A" })).toHaveAttribute(
      "aria-selected",
      "false",
    );
  });

  it("can switch through all tabs", async () => {
    const user = userEvent.setup();
    render(<BasicShowcase defaultTab="tab-a" />);

    await user.click(screen.getByRole("tab", { name: "Tab B" }));
    expect(screen.getByText("Content B")).toBeInTheDocument();

    await user.click(screen.getByRole("tab", { name: "Tab C" }));
    expect(screen.getByText("Content C")).toBeInTheDocument();

    await user.click(screen.getByRole("tab", { name: "Tab A" }));
    expect(screen.getByText("Content A1")).toBeInTheDocument();
  });
});

// ─── Panel ────────────────────────────────────────────────────────────────────

describe("ComponentShowcase – panel", () => {
  it("panel has role=tabpanel", () => {
    render(<BasicShowcase defaultTab="tab-a" />);
    expect(screen.getByRole("tabpanel")).toBeInTheDocument();
  });

  it("panel is labelled by its tab via aria-labelledby", () => {
    render(<BasicShowcase defaultTab="tab-a" />);
    const panel = screen.getByRole("tabpanel");
    const labelledBy = panel.getAttribute("aria-labelledby");
    const tab = document.getElementById(labelledBy ?? "");
    expect(tab).toHaveTextContent("Tab A");
  });

  it("panel has tabIndex=0 for keyboard focus", () => {
    render(<BasicShowcase defaultTab="tab-a" />);
    expect(screen.getByRole("tabpanel")).toHaveAttribute("tabindex", "0");
  });
});

// ─── Items / Item ─────────────────────────────────────────────────────────────

describe("ComponentShowcase – Items and Item", () => {
  it("renders Items as a grid", () => {
    render(<BasicShowcase defaultTab="tab-a" />);
    const items = screen
      .getAllByRole("generic")
      .find((el) => el.className.includes("grid"));
    expect(items).toBeDefined();
  });

  it("renders Item with aria-label when provided", () => {
    render(<BasicShowcase defaultTab="tab-a" />);
    expect(screen.getByLabelText("Item 1")).toBeInTheDocument();
  });
});

// ─── Guard: missing context ───────────────────────────────────────────────────

describe("ComponentShowcase – context guard", () => {
  it("Tab throws when rendered outside Root", () => {
    const consoleError = vi
      .spyOn(console, "error")
      .mockImplementation(() => {});
    expect(() =>
      render(<ComponentShowcase.Tab value="x">X</ComponentShowcase.Tab>),
    ).toThrow("<ComponentShowcase.Tab> must be rendered inside");
    consoleError.mockRestore();
  });

  it("Panel throws when rendered outside Root", () => {
    const consoleError = vi
      .spyOn(console, "error")
      .mockImplementation(() => {});
    expect(() =>
      render(
        <ComponentShowcase.Panel value="x">
          <span>x</span>
        </ComponentShowcase.Panel>,
      ),
    ).toThrow("<ComponentShowcase.Panel> must be rendered inside");
    consoleError.mockRestore();
  });
});

// ─── ARIA / a11y ─────────────────────────────────────────────────────────────

describe("ComponentShowcase – a11y", () => {
  it("passes axe-core with default tab selected", async () => {
    const { container } = render(<BasicShowcase defaultTab="tab-a" />);
    const results = await axe.run(container);
    expect(results.violations).toHaveLength(0);
  });

  it("passes axe-core after switching tab", async () => {
    const user = userEvent.setup();
    const { container } = render(<BasicShowcase defaultTab="tab-a" />);
    await user.click(screen.getByRole("tab", { name: "Tab B" }));
    const results = await axe.run(container);
    expect(results.violations).toHaveLength(0);
  });
});
