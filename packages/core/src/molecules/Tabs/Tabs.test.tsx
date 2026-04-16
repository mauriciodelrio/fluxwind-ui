import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import axe from "axe-core";
import { Tabs } from "./Tabs";

// ─── Fixtures ─────────────────────────────────────────────────────────────────

function BasicTabs({
  defaultValue = "one",
  onChange,
}: {
  defaultValue?: string;
  onChange?: (v: string) => void;
}) {
  return (
    <Tabs defaultValue={defaultValue} onChange={onChange}>
      <Tabs.List aria-label="Test tabs">
        <Tabs.Trigger value="one">One</Tabs.Trigger>
        <Tabs.Trigger value="two">Two</Tabs.Trigger>
        <Tabs.Trigger value="three">Three</Tabs.Trigger>
      </Tabs.List>
      <Tabs.Panel value="one">Panel One</Tabs.Panel>
      <Tabs.Panel value="two">Panel Two</Tabs.Panel>
      <Tabs.Panel value="three">Panel Three</Tabs.Panel>
    </Tabs>
  );
}

function TabsWithDisabled() {
  return (
    <Tabs defaultValue="one">
      <Tabs.List aria-label="Tabs with disabled">
        <Tabs.Trigger value="one">One</Tabs.Trigger>
        <Tabs.Trigger value="two" disabled>
          Two (disabled)
        </Tabs.Trigger>
        <Tabs.Trigger value="three">Three</Tabs.Trigger>
      </Tabs.List>
      <Tabs.Panel value="one">Panel One</Tabs.Panel>
      <Tabs.Panel value="two">Panel Two</Tabs.Panel>
      <Tabs.Panel value="three">Panel Three</Tabs.Panel>
    </Tabs>
  );
}

// ─── Structure ────────────────────────────────────────────────────────────────

describe("Tabs – structure", () => {
  it("renders a tablist", () => {
    render(<BasicTabs />);
    expect(screen.getByRole("tablist")).toBeInTheDocument();
  });

  it("renders all tab triggers", () => {
    render(<BasicTabs />);
    expect(screen.getAllByRole("tab")).toHaveLength(3);
  });

  it("renders all tab panels", () => {
    render(<BasicTabs />);
    // Only the active panel is visible; getByRole('tabpanel') returns visible ones
    expect(screen.getByRole("tabpanel")).toBeInTheDocument();
  });

  it("tab labels are visible", () => {
    render(<BasicTabs />);
    expect(screen.getByText("One")).toBeInTheDocument();
    expect(screen.getByText("Two")).toBeInTheDocument();
    expect(screen.getByText("Three")).toBeInTheDocument();
  });

  it("active panel content is visible", () => {
    render(<BasicTabs defaultValue="one" />);
    expect(screen.getByText("Panel One")).toBeInTheDocument();
  });
});

// ─── ARIA ─────────────────────────────────────────────────────────────────────

describe("Tabs – ARIA", () => {
  it("active tab has aria-selected=true", () => {
    render(<BasicTabs defaultValue="one" />);
    const tabs = screen.getAllByRole("tab");
    expect(tabs[0]).toHaveAttribute("aria-selected", "true");
    expect(tabs[1]).toHaveAttribute("aria-selected", "false");
    expect(tabs[2]).toHaveAttribute("aria-selected", "false");
  });

  it("active tab has tabIndex=0; others have tabIndex=-1", () => {
    render(<BasicTabs defaultValue="one" />);
    const tabs = screen.getAllByRole("tab");
    expect(tabs[0]).toHaveAttribute("tabindex", "0");
    expect(tabs[1]).toHaveAttribute("tabindex", "-1");
    expect(tabs[2]).toHaveAttribute("tabindex", "-1");
  });

  it("tab has aria-controls pointing to its panel", () => {
    render(<BasicTabs defaultValue="one" />);
    const tab = screen.getByRole("tab", { name: "One" });
    const panelId = tab.getAttribute("aria-controls") ?? "";
    expect(document.getElementById(panelId)).toHaveAttribute(
      "role",
      "tabpanel",
    );
  });

  it("panel has aria-labelledby pointing to its tab", () => {
    render(<BasicTabs defaultValue="one" />);
    const panel = screen.getByRole("tabpanel");
    const tabId = panel.getAttribute("aria-labelledby") ?? "";
    expect(document.getElementById(tabId)).toHaveAttribute("role", "tab");
  });

  it("panel has tabIndex=0 for keyboard access", () => {
    render(<BasicTabs defaultValue="one" />);
    const panel = screen.getByRole("tabpanel");
    expect(panel).toHaveAttribute("tabindex", "0");
  });

  it("disabled trigger has aria-disabled=true", () => {
    render(<TabsWithDisabled />);
    const disabledTab = screen.getByRole("tab", { name: "Two (disabled)" });
    expect(disabledTab).toHaveAttribute("aria-disabled", "true");
  });

  it("passes axe accessibility audit", async () => {
    const { container } = render(
      <div>
        <BasicTabs />
      </div>,
    );
    const results = await axe.run(container);
    expect(results.violations).toHaveLength(0);
  });
});

// ─── Interaction ──────────────────────────────────────────────────────────────

describe("Tabs – interaction", () => {
  it("clicking a tab activates it and shows its panel", async () => {
    const user = userEvent.setup();
    render(<BasicTabs defaultValue="one" />);

    await user.click(screen.getByRole("tab", { name: "Two" }));

    expect(screen.getByRole("tab", { name: "Two" })).toHaveAttribute(
      "aria-selected",
      "true",
    );
    expect(screen.getByRole("tabpanel")).toHaveTextContent("Panel Two");
  });

  it("clicking a disabled tab does nothing", async () => {
    const user = userEvent.setup();
    render(<TabsWithDisabled />);

    await user.click(screen.getByRole("tab", { name: "Two (disabled)" }));

    // "One" should still be active
    expect(screen.getByRole("tab", { name: "One" })).toHaveAttribute(
      "aria-selected",
      "true",
    );
    expect(screen.getByRole("tabpanel")).toHaveTextContent("Panel One");
  });

  it("calls onChange when a tab is clicked", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<BasicTabs onChange={onChange} />);

    await user.click(screen.getByRole("tab", { name: "Two" }));
    expect(onChange).toHaveBeenCalledWith("two");
  });
});

// ─── Keyboard navigation ──────────────────────────────────────────────────────

describe("Tabs – keyboard navigation", () => {
  it("ArrowRight moves focus and activates next tab", async () => {
    const user = userEvent.setup();
    render(<BasicTabs defaultValue="one" />);

    screen.getByRole("tab", { name: "One" }).focus();
    await user.keyboard("{ArrowRight}");

    expect(screen.getByRole("tab", { name: "Two" })).toHaveFocus();
    expect(screen.getByRole("tab", { name: "Two" })).toHaveAttribute(
      "aria-selected",
      "true",
    );
  });

  it("ArrowLeft moves focus and activates previous tab", async () => {
    const user = userEvent.setup();
    render(<BasicTabs defaultValue="two" />);

    screen.getByRole("tab", { name: "Two" }).focus();
    await user.keyboard("{ArrowLeft}");

    expect(screen.getByRole("tab", { name: "One" })).toHaveFocus();
    expect(screen.getByRole("tab", { name: "One" })).toHaveAttribute(
      "aria-selected",
      "true",
    );
  });

  it("ArrowRight wraps from last to first tab", async () => {
    const user = userEvent.setup();
    render(<BasicTabs defaultValue="three" />);

    screen.getByRole("tab", { name: "Three" }).focus();
    await user.keyboard("{ArrowRight}");

    expect(screen.getByRole("tab", { name: "One" })).toHaveFocus();
    expect(screen.getByRole("tab", { name: "One" })).toHaveAttribute(
      "aria-selected",
      "true",
    );
  });

  it("ArrowLeft wraps from first to last tab", async () => {
    const user = userEvent.setup();
    render(<BasicTabs defaultValue="one" />);

    screen.getByRole("tab", { name: "One" }).focus();
    await user.keyboard("{ArrowLeft}");

    expect(screen.getByRole("tab", { name: "Three" })).toHaveFocus();
    expect(screen.getByRole("tab", { name: "Three" })).toHaveAttribute(
      "aria-selected",
      "true",
    );
  });

  it("Home moves to first tab", async () => {
    const user = userEvent.setup();
    render(<BasicTabs defaultValue="three" />);

    screen.getByRole("tab", { name: "Three" }).focus();
    await user.keyboard("{Home}");

    expect(screen.getByRole("tab", { name: "One" })).toHaveFocus();
    expect(screen.getByRole("tab", { name: "One" })).toHaveAttribute(
      "aria-selected",
      "true",
    );
  });

  it("End moves to last tab", async () => {
    const user = userEvent.setup();
    render(<BasicTabs defaultValue="one" />);

    screen.getByRole("tab", { name: "One" }).focus();
    await user.keyboard("{End}");

    expect(screen.getByRole("tab", { name: "Three" })).toHaveFocus();
    expect(screen.getByRole("tab", { name: "Three" })).toHaveAttribute(
      "aria-selected",
      "true",
    );
  });

  it("keyboard navigation skips disabled tabs", async () => {
    const user = userEvent.setup();
    render(<TabsWithDisabled />);

    screen.getByRole("tab", { name: "One" }).focus();
    await user.keyboard("{ArrowRight}");

    // Two is disabled, so skip directly to Three
    expect(screen.getByRole("tab", { name: "Three" })).toHaveFocus();
    expect(screen.getByRole("tab", { name: "Three" })).toHaveAttribute(
      "aria-selected",
      "true",
    );
  });
});

// ─── Controlled mode ─────────────────────────────────────────────────────────

describe("Tabs – controlled mode", () => {
  it("respects controlled value", () => {
    render(
      <Tabs value="two">
        <Tabs.List aria-label="Controlled">
          <Tabs.Trigger value="one">One</Tabs.Trigger>
          <Tabs.Trigger value="two">Two</Tabs.Trigger>
        </Tabs.List>
        <Tabs.Panel value="one">Panel One</Tabs.Panel>
        <Tabs.Panel value="two">Panel Two</Tabs.Panel>
      </Tabs>,
    );
    expect(screen.getByRole("tab", { name: "Two" })).toHaveAttribute(
      "aria-selected",
      "true",
    );
    expect(screen.getByRole("tabpanel")).toHaveTextContent("Panel Two");
  });

  it("calls onChange with new value on click", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(
      <Tabs value="one" onChange={onChange}>
        <Tabs.List aria-label="Controlled onChange">
          <Tabs.Trigger value="one">One</Tabs.Trigger>
          <Tabs.Trigger value="two">Two</Tabs.Trigger>
        </Tabs.List>
        <Tabs.Panel value="one">Panel One</Tabs.Panel>
        <Tabs.Panel value="two">Panel Two</Tabs.Panel>
      </Tabs>,
    );
    await user.click(screen.getByRole("tab", { name: "Two" }));
    expect(onChange).toHaveBeenCalledWith("two");
  });
});

// ─── Variants ────────────────────────────────────────────────────────────────

describe("Tabs – variants", () => {
  it("renders with pill variant without errors", () => {
    render(
      <Tabs defaultValue="one" variant="pill">
        <Tabs.List aria-label="Pill tabs">
          <Tabs.Trigger value="one">One</Tabs.Trigger>
          <Tabs.Trigger value="two">Two</Tabs.Trigger>
        </Tabs.List>
        <Tabs.Panel value="one">Panel One</Tabs.Panel>
        <Tabs.Panel value="two">Panel Two</Tabs.Panel>
      </Tabs>,
    );
    expect(screen.getByRole("tablist")).toBeInTheDocument();
    expect(screen.getByRole("tab", { name: "One" })).toHaveAttribute(
      "aria-selected",
      "true",
    );
  });

  it.each(["sm", "md", "lg"] as const)(
    "renders size=%s without errors",
    (size) => {
      render(
        <Tabs defaultValue="one" size={size}>
          <Tabs.List aria-label={`${size} tabs`}>
            <Tabs.Trigger value="one">One</Tabs.Trigger>
          </Tabs.List>
          <Tabs.Panel value="one">Panel One</Tabs.Panel>
        </Tabs>,
      );
      expect(screen.getByRole("tab", { name: "One" })).toBeInTheDocument();
    },
  );
});

// ─── Error boundary ───────────────────────────────────────────────────────────

describe("Tabs – context guard", () => {
  it("throws when Tabs.Trigger is used outside Tabs root", () => {
    const consoleError = vi.spyOn(console, "error").mockReturnValue(undefined);
    expect(() => render(<Tabs.Trigger value="x">X</Tabs.Trigger>)).toThrow(
      "<Tabs.Trigger> must be rendered inside a <Tabs> root.",
    );
    consoleError.mockRestore();
  });

  it("throws when Tabs.Panel is used outside Tabs root", () => {
    const consoleError = vi.spyOn(console, "error").mockReturnValue(undefined);
    expect(() => render(<Tabs.Panel value="x">X</Tabs.Panel>)).toThrow(
      "<Tabs.Panel> must be rendered inside a <Tabs> root.",
    );
    consoleError.mockRestore();
  });
});
