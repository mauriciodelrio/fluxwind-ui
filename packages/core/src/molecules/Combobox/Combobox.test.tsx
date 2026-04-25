import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import axe from "axe-core";
import { Combobox } from "./Combobox";
import type { ComboboxOption, ComboboxMultiProps } from "./Combobox";

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

// ─── Multi-select — fixtures ──────────────────────────────────────────────────

const LANGS: ComboboxOption[] = [
  { value: "ts", label: "TypeScript" },
  { value: "js", label: "JavaScript" },
  { value: "py", label: "Python" },
  { value: "go", label: "Go", disabled: true },
];

// ─── Multi-select — structure ─────────────────────────────────────────────────

describe("Combobox – multi-select – structure", () => {
  it("listbox has aria-multiselectable=true when multiple", async () => {
    const user = userEvent.setup();
    render(<Combobox label="Languages" options={LANGS} multiple />);
    await user.click(screen.getByRole("combobox"));
    expect(screen.getByRole("listbox")).toHaveAttribute(
      "aria-multiselectable",
      "true",
    );
  });

  it("shows placeholder when no selections", () => {
    render(
      <Combobox
        label="Languages"
        options={LANGS}
        multiple
        placeholder="Pick languages"
      />,
    );
    expect(screen.getByText("Pick languages")).toBeInTheDocument();
  });

  it("renders Chips for each selected value", () => {
    render(
      <Combobox
        label="Languages"
        options={LANGS}
        multiple
        value={["ts", "js"]}
      />,
    );
    expect(screen.getByText("TypeScript")).toBeInTheDocument();
    expect(screen.getByText("JavaScript")).toBeInTheDocument();
  });

  it("does not show placeholder when selections present", () => {
    render(
      <Combobox
        label="Languages"
        options={LANGS}
        multiple
        value={["ts"]}
        placeholder="Pick languages"
      />,
    );
    expect(screen.queryByText("Pick languages")).not.toBeInTheDocument();
  });

  it("each option has explicit aria-selected (true or false) in multi mode", async () => {
    const user = userEvent.setup();
    render(
      <Combobox label="Languages" options={LANGS} multiple value={["ts"]} />,
    );
    await user.click(screen.getByRole("combobox"));
    const opts = screen.getAllByRole("option");
    for (const opt of opts) {
      expect(
        opt.getAttribute("aria-selected") === "true" ||
          opt.getAttribute("aria-selected") === "false",
      ).toBe(true);
    }
  });

  it("trigger announces selection count via aria-label", () => {
    render(
      <Combobox
        label="Languages"
        options={LANGS}
        multiple
        value={["ts", "js"]}
      />,
    );
    expect(screen.getByRole("combobox")).toHaveAttribute(
      "aria-label",
      "Languages, 2 items selected",
    );
  });

  it("trigger aria-label uses singular 'item' for 1 selection", () => {
    render(
      <Combobox label="Languages" options={LANGS} multiple value={["ts"]} />,
    );
    expect(screen.getByRole("combobox")).toHaveAttribute(
      "aria-label",
      "Languages, 1 item selected",
    );
  });

  it("sets displayName on the Combobox (multi smoke)", () => {
    expect(Combobox.displayName).toBe("Combobox");
  });
});

// ─── Multi-select — interactions ─────────────────────────────────────────────

describe("Combobox – multi-select – interactions", () => {
  it("toggles option on click — adds then removes", async () => {
    const onChange = vi.fn<ComboboxMultiProps["onChange"]>();
    const user = userEvent.setup();
    render(
      <Combobox
        label="Languages"
        options={LANGS}
        multiple
        onChange={onChange}
      />,
    );
    await user.click(screen.getByRole("combobox"));
    await user.click(screen.getByRole("option", { name: /TypeScript/i }));
    expect(onChange).toHaveBeenLastCalledWith(["ts"]);

    // Dropdown stays open in multi mode — deselect directly
    await user.click(screen.getByRole("option", { name: /TypeScript/i }));
    expect(onChange).toHaveBeenLastCalledWith([]);
  });

  it("dropdown stays open after selecting in multi mode", async () => {
    const user = userEvent.setup();
    render(<Combobox label="Languages" options={LANGS} multiple />);
    await user.click(screen.getByRole("combobox"));
    await user.click(screen.getByRole("option", { name: /TypeScript/i }));
    expect(screen.getByRole("listbox")).toBeInTheDocument();
  });

  it("dismissing a Chip removes that value", async () => {
    const onChange = vi.fn<ComboboxMultiProps["onChange"]>();
    const user = userEvent.setup();
    render(
      <Combobox
        label="Languages"
        options={LANGS}
        multiple
        value={["ts", "js"]}
        onChange={onChange}
      />,
    );
    const dismissBtn = screen.getByRole("button", {
      name: /Remove TypeScript/i,
    });
    await user.click(dismissBtn);
    expect(onChange).toHaveBeenCalledWith(["js"]);
  });

  it("clear-all removes all selected values", async () => {
    const onChange = vi.fn<ComboboxMultiProps["onChange"]>();
    const user = userEvent.setup();
    render(
      <Combobox
        label="Languages"
        options={LANGS}
        multiple
        value={["ts", "js"]}
        onChange={onChange}
      />,
    );
    await user.click(screen.getByRole("button", { name: /Clear all/i }));
    expect(onChange).toHaveBeenCalledWith([]);
  });

  it("does not select disabled options in multi mode", async () => {
    const onChange = vi.fn<ComboboxMultiProps["onChange"]>();
    const user = userEvent.setup();
    render(
      <Combobox
        label="Languages"
        options={LANGS}
        multiple
        onChange={onChange}
      />,
    );
    await user.click(screen.getByRole("combobox"));
    await user.click(screen.getByRole("option", { name: /Go/i }));
    expect(onChange).not.toHaveBeenCalled();
  });

  it("uncontrolled multi: manages internal state", async () => {
    const user = userEvent.setup();
    render(
      <Combobox
        label="Languages"
        options={LANGS}
        multiple
        defaultValue={["py"]}
      />,
    );
    expect(screen.getByText("Python")).toBeInTheDocument();
    await user.click(screen.getByRole("combobox"));
    await user.click(screen.getByRole("option", { name: /TypeScript/i }));
    // Close dropdown so chip text is unambiguous
    await user.keyboard("{Escape}");
    expect(screen.getByText("TypeScript")).toBeInTheDocument();
    expect(screen.getByText("Python")).toBeInTheDocument();
  });
});

// ─── Multi-select — maxSelections ────────────────────────────────────────────

describe("Combobox – multi-select – maxSelections", () => {
  it("marks unselected options aria-disabled when max reached", async () => {
    const user = userEvent.setup();
    render(
      <Combobox
        label="Languages"
        options={LANGS}
        multiple
        value={["ts", "js"]}
        maxSelections={2}
      />,
    );
    await user.click(screen.getByRole("combobox"));
    const pythonOpt = screen.getByRole("option", { name: /Python/i });
    expect(pythonOpt).toHaveAttribute("aria-disabled", "true");
  });

  it("does not add options beyond maxSelections", async () => {
    const onChange = vi.fn<ComboboxMultiProps["onChange"]>();
    const user = userEvent.setup();
    render(
      <Combobox
        label="Languages"
        options={LANGS}
        multiple
        value={["ts", "js"]}
        maxSelections={2}
        onChange={onChange}
      />,
    );
    await user.click(screen.getByRole("combobox"));
    await user.click(screen.getByRole("option", { name: /Python/i }));
    expect(onChange).not.toHaveBeenCalled();
  });

  it("allows deselecting when max reached", async () => {
    const onChange = vi.fn<ComboboxMultiProps["onChange"]>();
    const user = userEvent.setup();
    render(
      <Combobox
        label="Languages"
        options={LANGS}
        multiple
        value={["ts", "js"]}
        maxSelections={2}
        onChange={onChange}
      />,
    );
    await user.click(screen.getByRole("combobox"));
    await user.click(screen.getByRole("option", { name: /TypeScript/i }));
    expect(onChange).toHaveBeenCalledWith(["js"]);
  });
});

// ─── Multi-select — keyboard ──────────────────────────────────────────────────

describe("Combobox – multi-select – keyboard", () => {
  it("Backspace on empty search removes last selected Chip", async () => {
    const onChange = vi.fn<ComboboxMultiProps["onChange"]>();
    const user = userEvent.setup();
    render(
      <Combobox
        label="Languages"
        options={LANGS}
        multiple
        value={["ts", "js"]}
        onChange={onChange}
      />,
    );
    await user.click(screen.getByRole("combobox"));
    // Click searchbox explicitly — requestAnimationFrame doesn't run in tests
    await user.click(screen.getByRole("searchbox"));
    await user.keyboard("{Backspace}");
    expect(onChange).toHaveBeenCalledWith(["ts"]);
  });
});

// ─── Groups ───────────────────────────────────────────────────────────────────

const GROUPED: ComboboxOption[] = [
  { value: "ts", label: "TypeScript", group: "Frontend" },
  { value: "react", label: "React", group: "Frontend" },
  { value: "go", label: "Go", group: "Backend" },
  { value: "rust", label: "Rust", group: "Backend" },
  { value: "sql", label: "SQL" }, // ungrouped — should appear first
];

describe("Combobox – groups", () => {
  it("renders group headers for grouped options", async () => {
    const user = userEvent.setup();
    render(<Combobox label="Tech" options={GROUPED} />);
    await user.click(screen.getByRole("combobox"));
    expect(screen.getByText("Frontend")).toBeInTheDocument();
    expect(screen.getByText("Backend")).toBeInTheDocument();
  });

  it("ungrouped options appear before grouped sections", async () => {
    const user = userEvent.setup();
    render(<Combobox label="Tech" options={GROUPED} />);
    await user.click(screen.getByRole("combobox"));
    const opts = screen.getAllByRole("option");
    expect(opts[0]).toHaveTextContent("SQL");
  });

  it("group headers are not role=option (not selectable)", async () => {
    const user = userEvent.setup();
    render(<Combobox label="Tech" options={GROUPED} />);
    await user.click(screen.getByRole("combobox"));
    const opts = screen.getAllByRole("option");
    const labels = opts.map((o) => o.textContent);
    expect(labels).not.toContain("Frontend");
    expect(labels).not.toContain("Backend");
  });

  it("can select an option from a group", async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();
    render(<Combobox label="Tech" options={GROUPED} onChange={onChange} />);
    await user.click(screen.getByRole("combobox"));
    await user.click(screen.getByRole("option", { name: /^Go$/i }));
    expect(onChange).toHaveBeenCalledWith("go");
  });
});

// ─── Creatable ────────────────────────────────────────────────────────────────

describe("Combobox – creatable", () => {
  it("shows Create option when search has no matches", async () => {
    const user = userEvent.setup();
    render(<Combobox label="Fruit" options={FRUITS} creatable />);
    await user.click(screen.getByRole("combobox"));
    await user.type(screen.getByRole("searchbox"), "mango");
    expect(screen.getByText(/Create/i)).toBeInTheDocument();
    expect(screen.getByText(/mango/i)).toBeInTheDocument();
  });

  it("shows Create option in addition to partial results", async () => {
    const user = userEvent.setup();
    render(<Combobox label="Fruit" options={FRUITS} creatable />);
    await user.click(screen.getByRole("combobox"));
    await user.type(screen.getByRole("searchbox"), "an");
    // "Banana" matches; Create "an" also appears
    expect(screen.getByRole("option", { name: /Banana/i })).toBeInTheDocument();
    expect(screen.getByText(/Create/i)).toBeInTheDocument();
  });

  it("does not show Create option when query is empty", async () => {
    const user = userEvent.setup();
    render(<Combobox label="Fruit" options={FRUITS} creatable />);
    await user.click(screen.getByRole("combobox"));
    expect(screen.queryByText(/Create/i)).not.toBeInTheDocument();
  });

  it("calls onCreateOption with the trimmed query", async () => {
    const onCreateOption = vi.fn();
    const user = userEvent.setup();
    render(
      <Combobox
        label="Fruit"
        options={FRUITS}
        creatable
        onCreateOption={onCreateOption}
      />,
    );
    await user.click(screen.getByRole("combobox"));
    await user.type(screen.getByRole("searchbox"), "mango");
    await user.click(screen.getByText(/Create/i));
    expect(onCreateOption).toHaveBeenCalledWith("mango");
  });

  it("closes dropdown after creating", async () => {
    const user = userEvent.setup();
    render(
      <Combobox
        label="Fruit"
        options={FRUITS}
        creatable
        onCreateOption={() => {}}
      />,
    );
    await user.click(screen.getByRole("combobox"));
    await user.type(screen.getByRole("searchbox"), "kiwi");
    await user.click(screen.getByText(/Create/i));
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
  });

  it("does not show Create option when creatable is false (default)", async () => {
    const user = userEvent.setup();
    render(<Combobox label="Fruit" options={FRUITS} />);
    await user.click(screen.getByRole("combobox"));
    await user.type(screen.getByRole("searchbox"), "zzz");
    expect(screen.queryByText(/Create/i)).not.toBeInTheDocument();
  });
});

// ─── Multi + Accessibility (axe) ─────────────────────────────────────────────

describe("Combobox – multi-select – a11y", () => {
  it("has no axe violations when closed (multi)", async () => {
    const { container } = render(
      <Combobox label="Languages" options={LANGS} multiple />,
    );
    const results = await axe.run(container);
    expect(results.violations).toHaveLength(0);
  });

  it("has no axe violations when open with selections (multi)", async () => {
    const user = userEvent.setup();
    const { container } = render(
      <Combobox
        label="Languages"
        options={LANGS}
        multiple
        value={["ts", "js"]}
      />,
    );
    await user.click(screen.getByRole("combobox"));
    const results = await axe.run(container);
    expect(results.violations).toHaveLength(0);
  });

  it("has no axe violations with grouped options", async () => {
    const user = userEvent.setup();
    const { container } = render(<Combobox label="Tech" options={GROUPED} />);
    await user.click(screen.getByRole("combobox"));
    const results = await axe.run(container);
    expect(results.violations).toHaveLength(0);
  });

  it("has no axe violations with creatable open and query", async () => {
    const user = userEvent.setup();
    const { container } = render(
      <Combobox label="Fruit" options={FRUITS} creatable />,
    );
    await user.click(screen.getByRole("combobox"));
    await user.type(screen.getByRole("searchbox"), "mango");
    const results = await axe.run(container);
    expect(results.violations).toHaveLength(0);
  });
});
