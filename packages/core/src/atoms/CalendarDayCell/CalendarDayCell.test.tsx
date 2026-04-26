import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { CalendarDayCell } from "./CalendarDayCell";

describe("CalendarDayCell", () => {
  it("renders the day number", () => {
    render(<CalendarDayCell day={14} />);
    expect(screen.getByText("14")).toBeInTheDocument();
  });

  it("renders availability dot when hasAvailability=true", () => {
    const { container } = render(
      <CalendarDayCell day={5} state="available" hasAvailability />,
    );
    // dot is aria-hidden span
    const dot = container.querySelector("[aria-hidden='true']");
    expect(dot).toBeInTheDocument();
  });

  it("does not render dot when hasAvailability=false", () => {
    const { container } = render(<CalendarDayCell day={5} state="default" />);
    const dot = container.querySelector("[aria-hidden='true']");
    expect(dot).not.toBeInTheDocument();
  });

  it("dot is white when state=selected", () => {
    const { container } = render(
      <CalendarDayCell day={5} state="selected" hasAvailability />,
    );
    const dot = container.querySelector("[aria-hidden='true']");
    expect(dot?.className).toContain("bg-white");
  });

  it("does not render dot when state=disabled", () => {
    const { container } = render(
      <CalendarDayCell day={5} state="disabled" hasAvailability />,
    );
    const dot = container.querySelector("[aria-hidden='true']");
    expect(dot).not.toBeInTheDocument();
  });

  it("is disabled when state=disabled", () => {
    render(<CalendarDayCell day={3} state="disabled" />);
    expect(screen.getByRole("button")).toBeDisabled();
  });

  it("is disabled when disabled=true regardless of state", () => {
    render(<CalendarDayCell day={3} state="available" disabled />);
    expect(screen.getByRole("button")).toBeDisabled();
  });

  it("calls onClick when clicked and not disabled", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(<CalendarDayCell day={7} state="available" onClick={onClick} />);
    await user.click(screen.getByRole("button"));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("does not call onClick when disabled", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(<CalendarDayCell day={7} state="disabled" onClick={onClick} />);
    await user.click(screen.getByRole("button"));
    expect(onClick).not.toHaveBeenCalled();
  });

  it("sets aria-pressed=true when selected", () => {
    render(<CalendarDayCell day={14} state="selected" />);
    expect(screen.getByRole("button")).toHaveAttribute("aria-pressed", "true");
  });

  it("sets aria-current=date when today", () => {
    render(<CalendarDayCell day={26} state="today" />);
    expect(screen.getByRole("button")).toHaveAttribute("aria-current", "date");
  });

  it("forwards ref", () => {
    const ref = { current: null as HTMLButtonElement | null };
    render(<CalendarDayCell day={1} ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });
});
