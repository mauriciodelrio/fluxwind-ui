import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import axe from "axe-core";
import { SearchBar } from "./SearchBar";

// ─── Structure ────────────────────────────────────────────────────────────────

describe("SearchBar – structure", () => {
  it("renders an input of type='search'", () => {
    render(<SearchBar label="Search products" />);
    expect(screen.getByRole("searchbox")).toBeInTheDocument();
  });

  it("renders a visually-hidden label", () => {
    render(<SearchBar label="Find users" />);
    expect(screen.getByText("Find users")).toBeInTheDocument();
    expect(screen.getByText("Find users")).toHaveClass("sr-only");
  });

  it("label.htmlFor matches input id (auto-generated)", () => {
    render(<SearchBar label="Search" />);
    const input = screen.getByRole("searchbox");
    const label = screen.getByText("Search").closest("label");
    expect(label?.getAttribute("for")).toBe(input.id);
  });

  it("uses the provided id", () => {
    render(<SearchBar label="Search" id="my-search" />);
    expect(screen.getByRole("searchbox")).toHaveAttribute("id", "my-search");
  });

  it("renders the leading search icon (aria-hidden wrapper)", () => {
    const { container } = render(<SearchBar label="Search" />);
    const iconWrapper = container.querySelector('[aria-hidden="true"]');
    expect(iconWrapper).toBeInTheDocument();
  });

  it("does not render clear button by default", () => {
    render(<SearchBar label="Search" />);
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });

  it("does not render clear button when onClear is provided but value is empty", () => {
    render(
      <SearchBar
        label="Search"
        value=""
        onClear={vi.fn()}
        onChange={vi.fn()}
      />,
    );
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });

  it("renders clear button when onClear is provided and value is non-empty", () => {
    render(
      <SearchBar
        label="Search"
        value="hello"
        onClear={vi.fn()}
        onChange={vi.fn()}
      />,
    );
    expect(
      screen.getByRole("button", { name: "Clear search" }),
    ).toBeInTheDocument();
  });

  it("uses a custom clearLabel for the clear button", () => {
    render(
      <SearchBar
        label="Search"
        value="hello"
        onClear={vi.fn()}
        clearLabel="Reset query"
        onChange={vi.fn()}
      />,
    );
    expect(
      screen.getByRole("button", { name: "Reset query" }),
    ).toBeInTheDocument();
  });

  it("clear button has type='button'", () => {
    render(
      <SearchBar
        label="Search"
        value="x"
        onClear={vi.fn()}
        onChange={vi.fn()}
      />,
    );
    expect(
      screen.getByRole("button", { name: "Clear search" }),
    ).toHaveAttribute("type", "button");
  });

  it("has displayName 'SearchBar'", () => {
    expect(SearchBar.displayName).toBe("SearchBar");
  });
});

// ─── ARIA ─────────────────────────────────────────────────────────────────────

describe("SearchBar – ARIA", () => {
  it("input has role='searchbox'", () => {
    render(<SearchBar label="Search" />);
    expect(screen.getByRole("searchbox")).toBeInTheDocument();
  });

  it("input has aria-labelledby pointing to the label id", () => {
    render(<SearchBar label="Search docs" />);
    const input = screen.getByRole("searchbox");
    const labelEl = screen.getByText("Search docs");
    expect(input.getAttribute("aria-labelledby")).toBe(labelEl.id);
  });

  it("disabled input is unreachable by keyboard", () => {
    render(<SearchBar label="Search" disabled />);
    expect(screen.getByRole("searchbox")).toBeDisabled();
  });
});

// ─── Interactions ─────────────────────────────────────────────────────────────

describe("SearchBar – interactions", () => {
  it("calls onChange when typing", async () => {
    const onChange = vi.fn();
    render(<SearchBar label="Search" onChange={onChange} />);
    await userEvent.type(screen.getByRole("searchbox"), "hello");
    expect(onChange).toHaveBeenCalled();
  });

  it("calls onSearch with the current value when Enter is pressed", async () => {
    const onSearch = vi.fn();
    render(
      <SearchBar label="Search" defaultValue="books" onSearch={onSearch} />,
    );
    await userEvent.type(screen.getByRole("searchbox"), "{Enter}");
    expect(onSearch).toHaveBeenCalledWith("books");
  });

  it("does not call onSearch when a non-Enter key is pressed", async () => {
    const onSearch = vi.fn();
    render(<SearchBar label="Search" onSearch={onSearch} />);
    await userEvent.type(screen.getByRole("searchbox"), "a");
    expect(onSearch).not.toHaveBeenCalled();
  });

  it("calls onClear when the clear button is clicked", async () => {
    const onClear = vi.fn();
    render(
      <SearchBar
        label="Search"
        value="something"
        onClear={onClear}
        onChange={vi.fn()}
      />,
    );
    await userEvent.click(screen.getByRole("button", { name: "Clear search" }));
    expect(onClear).toHaveBeenCalledTimes(1);
  });

  it("forwards the onKeyDown handler", async () => {
    const onKeyDown = vi.fn();
    render(<SearchBar label="Search" onKeyDown={onKeyDown} />);
    await userEvent.type(screen.getByRole("searchbox"), "a");
    expect(onKeyDown).toHaveBeenCalled();
  });
});

// ─── Accessibility (axe) ──────────────────────────────────────────────────────

describe("SearchBar – a11y (axe)", () => {
  async function checkA11y(element: Element) {
    const results = await axe.run(element);
    expect(results.violations).toHaveLength(0);
  }

  it("default — no violations", async () => {
    const { container } = render(<SearchBar label="Search products" />);
    await checkA11y(container);
  });

  it("with placeholder — no violations", async () => {
    const { container } = render(
      <SearchBar label="Search" placeholder="Type to search…" />,
    );
    await checkA11y(container);
  });

  it("with clear button — no violations", async () => {
    const { container } = render(
      <SearchBar
        label="Search"
        value="query"
        onClear={vi.fn()}
        onChange={vi.fn()}
      />,
    );
    await checkA11y(container);
  });

  it("disabled — no violations", async () => {
    const { container } = render(<SearchBar label="Search" disabled />);
    await checkA11y(container);
  });

  it("size sm — no violations", async () => {
    const { container } = render(<SearchBar label="Search" size="sm" />);
    await checkA11y(container);
  });

  it("size lg — no violations", async () => {
    const { container } = render(<SearchBar label="Search" size="lg" />);
    await checkA11y(container);
  });

  it("radius full — no violations", async () => {
    const { container } = render(<SearchBar label="Search" radius="full" />);
    await checkA11y(container);
  });
});
