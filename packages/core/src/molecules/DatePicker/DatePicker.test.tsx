import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import axe from "axe-core";
import { DatePicker } from "./DatePicker";

// ─── Helpers ──────────────────────────────────────────────────────────────────

function renderDatePicker(
  props: Partial<React.ComponentProps<typeof DatePicker>> = {},
) {
  return render(<DatePicker label="Birth date" {...props} />);
}

// ─── Tests ────────────────────────────────────────────────────────────────────

describe("DatePicker", () => {
  describe("Rendering", () => {
    it("renders the label", () => {
      renderDatePicker();
      expect(screen.getByText("Birth date")).toBeInTheDocument();
    });

    it("shows placeholder when no value selected", () => {
      renderDatePicker({ placeholder: "Pick a date" });
      expect(screen.getByRole("combobox")).toHaveTextContent("Pick a date");
    });

    it("shows formatted date when value is set", () => {
      const date = new Date(2025, 3, 26); // April 26, 2025
      renderDatePicker({ value: date });
      expect(screen.getByRole("combobox")).toHaveTextContent("April 26, 2025");
    });

    it("renders hint text", () => {
      renderDatePicker({ hint: "Choose your birthday" });
      expect(screen.getByText("Choose your birthday")).toBeInTheDocument();
    });

    it("renders error message", () => {
      renderDatePicker({ error: "Required field" });
      expect(screen.getByText("Required field")).toBeInTheDocument();
    });

    it("trigger has aria-invalid when error prop is set", () => {
      renderDatePicker({ error: "Required field" });
      expect(screen.getByRole("combobox")).toHaveAttribute(
        "aria-invalid",
        "true",
      );
    });
  });

  describe("Popover open / close", () => {
    it("popover is closed by default", () => {
      renderDatePicker();
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    });

    it("opens popover on trigger click", async () => {
      renderDatePicker();
      await userEvent.click(screen.getByRole("combobox"));
      expect(screen.getByRole("dialog")).toBeInTheDocument();
    });

    it("closes popover on second trigger click", async () => {
      renderDatePicker();
      const trigger = screen.getByRole("combobox");
      await userEvent.click(trigger);
      expect(screen.getByRole("dialog")).toBeInTheDocument();
      await userEvent.click(trigger);
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    });

    it("closes popover on Escape key", async () => {
      renderDatePicker();
      await userEvent.click(screen.getByRole("combobox"));
      expect(screen.getByRole("dialog")).toBeInTheDocument();
      await userEvent.keyboard("{Escape}");
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    });

    it("closes popover on outside click", async () => {
      renderDatePicker();
      await userEvent.click(screen.getByRole("combobox"));
      expect(screen.getByRole("dialog")).toBeInTheDocument();
      fireEvent.mouseDown(document.body);
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    });
  });

  describe("Calendar navigation", () => {
    it("shows month label in header", async () => {
      const date = new Date(2025, 3, 1); // April 2025
      renderDatePicker({ value: date });
      await userEvent.click(screen.getByRole("combobox"));
      expect(screen.getByText("April 2025")).toBeInTheDocument();
    });

    it("navigates to previous month", async () => {
      const date = new Date(2025, 3, 1); // April 2025
      renderDatePicker({ value: date });
      await userEvent.click(screen.getByRole("combobox"));
      await userEvent.click(
        screen.getByRole("button", { name: "Previous month" }),
      );
      expect(screen.getByText("March 2025")).toBeInTheDocument();
    });

    it("navigates to next month", async () => {
      const date = new Date(2025, 3, 1); // April 2025
      renderDatePicker({ value: date });
      await userEvent.click(screen.getByRole("combobox"));
      await userEvent.click(screen.getByRole("button", { name: "Next month" }));
      expect(screen.getByText("May 2025")).toBeInTheDocument();
    });

    it("wraps from December to January (next)", async () => {
      const date = new Date(2025, 11, 1); // December 2025
      renderDatePicker({ value: date });
      await userEvent.click(screen.getByRole("combobox"));
      await userEvent.click(screen.getByRole("button", { name: "Next month" }));
      expect(screen.getByText("January 2026")).toBeInTheDocument();
    });

    it("wraps from January to December (prev)", async () => {
      const date = new Date(2025, 0, 1); // January 2025
      renderDatePicker({ value: date });
      await userEvent.click(screen.getByRole("combobox"));
      await userEvent.click(
        screen.getByRole("button", { name: "Previous month" }),
      );
      expect(screen.getByText("December 2024")).toBeInTheDocument();
    });
  });

  describe("Date selection", () => {
    it("calls onChange with Date when formatOutput=date", async () => {
      const onChange = vi.fn();
      const date = new Date(2025, 3, 1); // April 2025
      renderDatePicker({ value: date, onChange, formatOutput: "date" });
      await userEvent.click(screen.getByRole("combobox"));

      const day26 = screen.getByRole("button", {
        name: /April 26, 2025/i,
      });
      await userEvent.click(day26);

      expect(onChange).toHaveBeenCalledOnce();
      const received = onChange.mock.calls[0][0] as Date;
      expect(received).toBeInstanceOf(Date);
      expect(received.getFullYear()).toBe(2025);
      expect(received.getMonth()).toBe(3); // April = 3
      expect(received.getDate()).toBe(26);
    });

    it("calls onChange with ISO string when formatOutput=iso", async () => {
      const onChange = vi.fn();
      const date = new Date(2025, 3, 1); // April 2025
      renderDatePicker({ value: date, onChange, formatOutput: "iso" });
      await userEvent.click(screen.getByRole("combobox"));

      const day26 = screen.getByRole("button", {
        name: /April 26, 2025/i,
      });
      await userEvent.click(day26);

      expect(onChange).toHaveBeenCalledOnce();
      expect(onChange.mock.calls[0][0]).toBe("2025-04-26");
    });

    it("closes popover after selecting a date", async () => {
      const date = new Date(2025, 3, 1);
      renderDatePicker({ value: date });
      await userEvent.click(screen.getByRole("combobox"));
      const day26 = screen.getByRole("button", { name: /April 26, 2025/i });
      await userEvent.click(day26);
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    });
  });

  describe("Disabled state", () => {
    it("does not open popover when disabled", async () => {
      renderDatePicker({ disabled: true });
      await userEvent.click(screen.getByRole("combobox"));
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    });

    it("disables days before minDate", async () => {
      const date = new Date(2025, 3, 1);
      const minDate = new Date(2025, 3, 15);
      renderDatePicker({ value: date, minDate });
      await userEvent.click(screen.getByRole("combobox"));

      const day5 = screen.getByRole("button", { name: /April 5, 2025/i });
      expect(day5).toBeDisabled();
    });

    it("disables days after maxDate", async () => {
      const date = new Date(2025, 3, 1);
      const maxDate = new Date(2025, 3, 20);
      renderDatePicker({ value: date, maxDate });
      await userEvent.click(screen.getByRole("combobox"));

      const day25 = screen.getByRole("button", { name: /April 25, 2025/i });
      expect(day25).toBeDisabled();
    });
  });

  describe("Grid structure", () => {
    it("renders 7 column headers", async () => {
      renderDatePicker();
      await userEvent.click(screen.getByRole("combobox"));
      const grid = screen.getByRole("grid");
      const columnHeaders = within(grid).getAllByRole("columnheader");
      expect(columnHeaders).toHaveLength(7);
    });

    it("renders 6 rows in the grid", async () => {
      renderDatePicker();
      await userEvent.click(screen.getByRole("combobox"));
      const grid = screen.getByRole("grid");
      const rows = within(grid).getAllByRole("row");
      // 1 header row + 6 day rows
      expect(rows).toHaveLength(7);
    });

    it("each day cell button has an aria-label", async () => {
      const date = new Date(2025, 3, 1);
      renderDatePicker({ value: date });
      await userEvent.click(screen.getByRole("combobox"));

      const day1 = screen.getByRole("button", {
        name: /Saturday, April 5, 2025/i,
      });
      expect(day1).toBeInTheDocument();
    });
  });

  describe("Accessibility", () => {
    it("trigger has aria-expanded=false when closed", () => {
      renderDatePicker();
      expect(screen.getByRole("combobox")).toHaveAttribute(
        "aria-expanded",
        "false",
      );
    });

    it("trigger has aria-expanded=true when open", async () => {
      renderDatePicker();
      await userEvent.click(screen.getByRole("combobox"));
      expect(screen.getByRole("combobox")).toHaveAttribute(
        "aria-expanded",
        "true",
      );
    });

    it("trigger has aria-haspopup=true", () => {
      renderDatePicker();
      expect(screen.getByRole("combobox")).toHaveAttribute(
        "aria-haspopup",
        "true",
      );
    });

    it("passes axe a11y check when closed", async () => {
      const { container } = renderDatePicker();
      const results = await axe.run(container);
      expect(results.violations).toHaveLength(0);
    });

    it("passes axe a11y check when open", async () => {
      const { container } = renderDatePicker();
      await userEvent.click(screen.getByRole("combobox"));
      const results = await axe.run(container);
      expect(results.violations).toHaveLength(0);
    });
  });

  describe("Trigger keyboard interaction", () => {
    it("opens popover with Enter key", async () => {
      renderDatePicker();
      const trigger = screen.getByRole("combobox");
      trigger.focus();
      await userEvent.keyboard("{Enter}");
      expect(screen.getByRole("dialog")).toBeInTheDocument();
    });

    it("opens popover with Space key", async () => {
      renderDatePicker();
      const trigger = screen.getByRole("combobox");
      trigger.focus();
      await userEvent.keyboard(" ");
      expect(screen.getByRole("dialog")).toBeInTheDocument();
    });

    it("closes popover with Escape on trigger", async () => {
      renderDatePicker();
      await userEvent.click(screen.getByRole("combobox"));
      expect(screen.getByRole("dialog")).toBeInTheDocument();
      const trigger = screen.getByRole("combobox");
      trigger.focus();
      fireEvent.keyDown(trigger, { key: "Escape" });
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    });
  });

  describe("Popover keyboard interaction", () => {
    it("closes popover with Escape inside the dialog", async () => {
      const date = new Date(2025, 3, 1);
      renderDatePicker({ value: date });
      await userEvent.click(screen.getByRole("combobox"));
      expect(screen.getByRole("dialog")).toBeInTheDocument();
      const dialog = screen.getByRole("dialog");
      fireEvent.keyDown(dialog, { key: "Escape" });
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    });

    it("closes popover with Tab inside the dialog", async () => {
      const date = new Date(2025, 3, 1);
      renderDatePicker({ value: date });
      await userEvent.click(screen.getByRole("combobox"));
      expect(screen.getByRole("dialog")).toBeInTheDocument();
      const dialog = screen.getByRole("dialog");
      fireEvent.keyDown(dialog, { key: "Tab" });
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    });
  });

  describe("Calendar grid keyboard navigation", () => {
    it("navigates to next cell with ArrowRight", async () => {
      const date = new Date(2025, 3, 1); // April 2025
      renderDatePicker({ value: date });
      await userEvent.click(screen.getByRole("combobox"));

      const grid = screen.getByRole("grid");
      const buttons = grid.querySelectorAll<HTMLButtonElement>(
        "button[data-date]:not([disabled])",
      );
      const first = buttons[0];
      first.focus();
      expect(document.activeElement).toBe(first);

      fireEvent.keyDown(grid, { key: "ArrowRight" });
      expect(document.activeElement).toBe(buttons[1]);
    });

    it("navigates to previous cell with ArrowLeft", async () => {
      const date = new Date(2025, 3, 1);
      renderDatePicker({ value: date });
      await userEvent.click(screen.getByRole("combobox"));

      const grid = screen.getByRole("grid");
      const buttons = grid.querySelectorAll<HTMLButtonElement>(
        "button[data-date]:not([disabled])",
      );
      buttons[1].focus();
      fireEvent.keyDown(grid, { key: "ArrowLeft" });
      expect(document.activeElement).toBe(buttons[0]);
    });

    it("navigates one week down with ArrowDown", async () => {
      const date = new Date(2025, 3, 1);
      renderDatePicker({ value: date });
      await userEvent.click(screen.getByRole("combobox"));

      const grid = screen.getByRole("grid");
      const buttons = grid.querySelectorAll<HTMLButtonElement>(
        "button[data-date]:not([disabled])",
      );
      buttons[0].focus();
      fireEvent.keyDown(grid, { key: "ArrowDown" });
      expect(document.activeElement).toBe(buttons[7]);
    });

    it("navigates one week up with ArrowUp", async () => {
      const date = new Date(2025, 3, 1);
      renderDatePicker({ value: date });
      await userEvent.click(screen.getByRole("combobox"));

      const grid = screen.getByRole("grid");
      const buttons = grid.querySelectorAll<HTMLButtonElement>(
        "button[data-date]:not([disabled])",
      );
      buttons[7].focus();
      fireEvent.keyDown(grid, { key: "ArrowUp" });
      expect(document.activeElement).toBe(buttons[0]);
    });

    it("navigates to first cell with Home", async () => {
      const date = new Date(2025, 3, 1);
      renderDatePicker({ value: date });
      await userEvent.click(screen.getByRole("combobox"));

      const grid = screen.getByRole("grid");
      const buttons = grid.querySelectorAll<HTMLButtonElement>(
        "button[data-date]:not([disabled])",
      );
      buttons[5].focus();
      fireEvent.keyDown(grid, { key: "Home" });
      expect(document.activeElement).toBe(buttons[0]);
    });

    it("navigates to last cell with End", async () => {
      const date = new Date(2025, 3, 1);
      renderDatePicker({ value: date });
      await userEvent.click(screen.getByRole("combobox"));

      const grid = screen.getByRole("grid");
      const buttons = grid.querySelectorAll<HTMLButtonElement>(
        "button[data-date]:not([disabled])",
      );
      buttons[0].focus();
      fireEvent.keyDown(grid, { key: "End" });
      expect(document.activeElement).toBe(buttons[buttons.length - 1]);
    });

    it("does nothing for unhandled keys", async () => {
      const date = new Date(2025, 3, 1);
      renderDatePicker({ value: date });
      await userEvent.click(screen.getByRole("combobox"));

      const grid = screen.getByRole("grid");
      const buttons = grid.querySelectorAll<HTMLButtonElement>(
        "button[data-date]:not([disabled])",
      );
      buttons[0].focus();
      fireEvent.keyDown(grid, { key: "a" });
      // Focus should not change
      expect(document.activeElement).toBe(buttons[0]);
    });

    it("does nothing when focused element is outside grid", async () => {
      const date = new Date(2025, 3, 1);
      renderDatePicker({ value: date });
      await userEvent.click(screen.getByRole("combobox"));

      const grid = screen.getByRole("grid");
      // Don't focus any button inside the grid — active element stays on trigger
      const trigger = screen.getByRole("combobox");
      trigger.focus();
      // Should not throw or move focus into the grid
      fireEvent.keyDown(grid, { key: "ArrowRight" });
      expect(document.activeElement).toBe(trigger);
    });
  });
});
