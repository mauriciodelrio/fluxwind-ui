import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import axe from "axe-core";
import { Combobox } from "./Combobox";
import type { ComboboxOption } from "./Combobox";

// ─── Fixtures ─────────────────────────────────────────────────────────────────

const FRUITS: ComboboxOption[] = [
  { value: "apple", label: "Apple" },
  { value: "banana", label: "Banana" },
  { value: "cherry", label: "Cherry" },
  { value: "durian", label: "Durian", disabled: true },
];

// ─── Structure ────────────────────────────────────────────────────────────────

describe("Combobox – structure", () => {
  it("renders a visible label", () => {
    render(<Combobox label="Favourite fruit" options={FRUITS} />);
    expect(screen.getByText("Favourite fruit")).toBeInTheDocument();
  });

  it("trigger has role=combobox", () => {
    render(<Combobox label="Fruit" options={FRUITS} />);
    expect(screen.getByRole("combobox")).toBeInTheDocument();
  });

  it("trigger is aria-expanded=false when closed", () => {
    render(<Combobox label="Fruit" options={FRUITS} />);
    expect(screen.getByRole("combobox")).toHaveAttribute(
      "aria-expanded",
      "false",
    );
  });

  it("trigger shows placeholder when no value selected", () => {
    render(
      <Combobox label="Fruit" options={FRUITS} placeholder="Pick a fruit" />,
    );
    expect(screen.getByText("Pick a fruit")).toBeInTheDocument();
  });

  it("trigger shows selected label when value is provided", () => {
    render(<Combobox label="Fruit" options={FRUITS} value="banana" />);
    expect(screen.getByRole("combobox")).toHaveTextContent("Banana");
  });

  it("renders hint text when provided", () => {
    render(
      <Combobox label="Fruit" options={FRUITS} hint="Choose your favourite" />,
    );
    expect(screen.getByText("Choose your favourite")).toBeInTheDocument();
  });

  it("renders error text and aria-invalid when error is provided", () => {
    render(
      <Combobox label="Fruit" options={FRUITS} error="Selection required" />,
    );
    expect(screen.getByText("Selection required")).toBeInTheDocument();
    expect(screen.getByRole("combobox")).toHaveAttribute(
      "aria-invalid",
      "true",
    );
  });

  it("does not render hint when error is also provided", () => {
    render(
      <Combobox
        label="Fruit"
        options={FRUITS}
        hint="Choose your favourite"
        error="Required"
      />,
    );
    expect(screen.queryByText("Choose your favourite")).not.toBeInTheDocument();
  });

  it("sets displayName", () => {
    expect(Combobox.displayName).toBe("Combobox");
  });
});

// ─── ARIA ─────────────────────────────────────────────────────────────────────

describe("Combobox – ARIA", () => {
  it("trigger aria-haspopup=listbox", () => {
    render(<Combobox label="Fruit" options={FRUITS} />);
    expect(screen.getByRole("combobox")).toHaveAttribute(
      "aria-haspopup",
      "listbox",
    );
  });

  it("trigger aria-controls points to listbox id", async () => {
    const user = userEvent.setup();
    render(<Combobox label="Fruit" options={FRUITS} />);
    const trigger = screen.getByRole("combobox");
    const listboxId = trigger.getAttribute("aria-controls");
    expect(listboxId).toBeTruthy();

    await user.click(trigger);
    const listbox = screen.getByRole("listbox");
    expect(listbox.id).toBe(listboxId);
  });

  it("listbox is labelled with the combobox label", async () => {
    const user = userEvent.setup();
    render(<Combobox label="Favourite fruit" options={FRUITS} />);
    await user.click(screen.getByRole("combobox"));
    expect(screen.getByRole("listbox")).toHaveAttribute(
      "aria-label",
      "Favourite fruit",
    );
  });

  it("options have role=option", async () => {
    const user = userEvent.setup();
    render(<Combobox label="Fruit" options={FRUITS} />);
    await user.click(screen.getByRole("combobox"));
    const opts = screen.getAllByRole("option");
    expect(opts.length).toBe(FRUITS.length);
  });

  it("selected option has aria-selected=true", async () => {
    const user = userEvent.setup();
    render(<Combobox label="Fruit" options={FRUITS} value="apple" />);
    await user.click(screen.getByRole("combobox"));
    const appleOpt = screen.getByRole("option", { name: /Apple/i });
    expect(appleOpt).toHaveAttribute("aria-selected", "true");
  });

  it("disabled option has aria-disabled=true", async () => {
    const user = userEvent.setup();
    render(<Combobox label="Fruit" options={FRUITS} />);
    await user.click(screen.getByRole("combobox"));
    const durianOpt = screen.getByRole("option", { name: /Durian/i });
    expect(durianOpt).toHaveAttribute("aria-disabled", "true");
  });

  it("trigger is disabled when disabled prop is set", () => {
    render(<Combobox label="Fruit" options={FRUITS} disabled />);
    expect(screen.getByRole("combobox")).toBeDisabled();
  });
});

// ─── Interactions ─────────────────────────────────────────────────────────────

describe("Combobox – interactions", () => {
  let onChange: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    onChange = vi.fn();
  });

  it("opens the dropdown on trigger click", async () => {
    const user = userEvent.setup();
    render(<Combobox label="Fruit" options={FRUITS} />);
    await user.click(screen.getByRole("combobox"));
    expect(screen.getByRole("listbox")).toBeInTheDocument();
    expect(screen.getByRole("combobox")).toHaveAttribute(
      "aria-expanded",
      "true",
    );
  });

  it("closes the dropdown on second trigger click", async () => {
    const user = userEvent.setup();
    render(<Combobox label="Fruit" options={FRUITS} />);
    const trigger = screen.getByRole("combobox");
    await user.click(trigger);
    await user.click(trigger);
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
  });

  it("selects an option and calls onChange", async () => {
    const user = userEvent.setup();
    render(<Combobox label="Fruit" options={FRUITS} onChange={onChange} />);
    await user.click(screen.getByRole("combobox"));
    await user.click(screen.getByRole("option", { name: /Banana/i }));
    expect(onChange).toHaveBeenCalledWith("banana");
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
  });

  it("does not call onChange when a disabled option is clicked", async () => {
    const user = userEvent.setup();
    render(<Combobox label="Fruit" options={FRUITS} onChange={onChange} />);
    await user.click(screen.getByRole("combobox"));
    await user.click(screen.getByRole("option", { name: /Durian/i }));
    expect(onChange).not.toHaveBeenCalled();
  });

  it("closes on Escape key", async () => {
    const user = userEvent.setup();
    render(<Combobox label="Fruit" options={FRUITS} />);
    await user.click(screen.getByRole("combobox"));
    await user.keyboard("{Escape}");
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
  });

  it("clears selection when clear button is clicked", async () => {
    const user = userEvent.setup();
    render(
      <Combobox
        label="Fruit"
        options={FRUITS}
        value="apple"
        onChange={onChange}
      />,
    );
    const clearBtn = screen.getByRole("button", { name: /Clear Fruit/i });
    await user.click(clearBtn);
    expect(onChange).toHaveBeenCalledWith("");
  });

  it("hides clear button when nothing is selected", () => {
    render(<Combobox label="Fruit" options={FRUITS} />);
    expect(
      screen.queryByRole("button", { name: /Clear/i }),
    ).not.toBeInTheDocument();
  });
});

// ─── Search (filtering) ───────────────────────────────────────────────────────

describe("Combobox – search", () => {
  it("renders search input inside the dropdown", async () => {
    const user = userEvent.setup();
    render(<Combobox label="Fruit" options={FRUITS} searchable />);
    await user.click(screen.getByRole("combobox"));
    expect(screen.getByRole("searchbox")).toBeInTheDocument();
  });

  it("filters options by label (client-side)", async () => {
    const user = userEvent.setup();
    render(<Combobox label="Fruit" options={FRUITS} searchable />);
    await user.click(screen.getByRole("combobox"));
    await user.type(screen.getByRole("searchbox"), "an");
    // "Banana" matches "an", "Apple"/"Cherry"/"Durian" do not (Durian has "an" too)
    const opts = screen.getAllByRole("option");
    const visibleLabels = opts.map((o) => o.textContent || "");
    expect(visibleLabels.some((t) => t.includes("Banana"))).toBe(true);
    expect(visibleLabels.some((t) => t.includes("Apple"))).toBe(false);
  });

  it("shows empty label when no options match", async () => {
    const user = userEvent.setup();
    render(
      <Combobox
        label="Fruit"
        options={FRUITS}
        searchable
        emptyLabel="No fruit found"
      />,
    );
    await user.click(screen.getByRole("combobox"));
    await user.type(screen.getByRole("searchbox"), "zzz");
    expect(screen.getByText("No fruit found")).toBeInTheDocument();
    expect(screen.queryAllByRole("option")).toHaveLength(0);
  });

  it("calls onFilter with the typed query in async mode", async () => {
    const onFilter = vi.fn();
    const user = userEvent.setup();
    render(
      <Combobox
        label="Fruit"
        options={FRUITS}
        searchable
        onFilter={onFilter}
      />,
    );
    await user.click(screen.getByRole("combobox"));
    await user.type(screen.getByRole("searchbox"), "ba");
    expect(onFilter).toHaveBeenCalledWith("b");
    expect(onFilter).toHaveBeenCalledWith("ba");
  });

  it("does not render search input when searchable=false", async () => {
    const user = userEvent.setup();
    render(<Combobox label="Fruit" options={FRUITS} searchable={false} />);
    await user.click(screen.getByRole("combobox"));
    expect(screen.queryByRole("searchbox")).not.toBeInTheDocument();
  });
});

// ─── Keyboard navigation ──────────────────────────────────────────────────────

describe("Combobox – keyboard navigation", () => {
  it("opens on ArrowDown key", async () => {
    const user = userEvent.setup();
    render(<Combobox label="Fruit" options={FRUITS} />);
    screen.getByRole("combobox").focus();
    await user.keyboard("{ArrowDown}");
    expect(screen.getByRole("listbox")).toBeInTheDocument();
  });

  it("opens on Enter key", async () => {
    const user = userEvent.setup();
    render(<Combobox label="Fruit" options={FRUITS} />);
    screen.getByRole("combobox").focus();
    await user.keyboard("{Enter}");
    expect(screen.getByRole("listbox")).toBeInTheDocument();
  });

  it("navigates options with ArrowDown/ArrowUp", async () => {
    const user = userEvent.setup();
    render(<Combobox label="Fruit" options={FRUITS} searchable={false} />);
    screen.getByRole("combobox").focus();
    await user.keyboard("{ArrowDown}");
    const listbox = screen.getByRole("listbox");
    await user.type(listbox, "{ArrowDown}");
    // First navigable option (Apple) should be highlighted
    const appleOpt = within(listbox).getByRole("option", { name: /Apple/i });
    expect(appleOpt.className).toMatch(/bg-/);
  });

  it("selects highlighted option with Enter in non-searchable mode", async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();
    render(
      <Combobox
        label="Fruit"
        options={FRUITS}
        onChange={onChange}
        searchable={false}
      />,
    );
    screen.getByRole("combobox").focus();
    await user.keyboard("{ArrowDown}");
    const listbox = screen.getByRole("listbox");
    // Navigate to first option and select
    await user.type(listbox, "{ArrowDown}{Enter}");
    expect(onChange).toHaveBeenCalledWith("apple");
  });
});

// ─── Accessibility (axe) ─────────────────────────────────────────────────────

describe("Combobox – a11y", () => {
  it("has no axe violations when closed", async () => {
    const { container } = render(<Combobox label="Fruit" options={FRUITS} />);
    const results = await axe.run(container);
    expect(results.violations).toHaveLength(0);
  });

  it("has no axe violations when open", async () => {
    const user = userEvent.setup();
    const { container } = render(<Combobox label="Fruit" options={FRUITS} />);
    await user.click(screen.getByRole("combobox"));
    const results = await axe.run(container);
    expect(results.violations).toHaveLength(0);
  });

  it("has no axe violations with a value selected", async () => {
    const { container } = render(
      <Combobox label="Fruit" options={FRUITS} value="cherry" />,
    );
    const results = await axe.run(container);
    expect(results.violations).toHaveLength(0);
  });

  it("has no axe violations in disabled state", async () => {
    const { container } = render(
      <Combobox label="Fruit" options={FRUITS} disabled />,
    );
    const results = await axe.run(container);
    expect(results.violations).toHaveLength(0);
  });

  it("has no axe violations with error", async () => {
    const { container } = render(
      <Combobox label="Fruit" options={FRUITS} error="Required" />,
    );
    const results = await axe.run(container);
    expect(results.violations).toHaveLength(0);
  });

  it("has no axe violations with searchable=false", async () => {
    const user = userEvent.setup();
    const { container } = render(
      <Combobox label="Fruit" options={FRUITS} searchable={false} />,
    );
    await user.click(screen.getByRole("combobox"));
    const results = await axe.run(container);
    expect(results.violations).toHaveLength(0);
  });
});
