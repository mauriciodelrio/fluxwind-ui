import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { CalendarMonthPicker } from "./CalendarMonthPicker";

const AVAILABLE_DAYS = ["2026-05-05", "2026-05-12", "2026-05-19", "2026-05-26"];

describe("CalendarMonthPicker", () => {
  it("renders month heading", () => {
    render(
      <CalendarMonthPicker
        availableDays={AVAILABLE_DAYS}
        onDaySelect={vi.fn()}
        initialMonth="2026-05"
      />,
    );
    expect(screen.getByText(/Mayo 2026/i)).toBeInTheDocument();
  });

  it("renders 7 week-day headers", () => {
    render(
      <CalendarMonthPicker
        availableDays={[]}
        onDaySelect={vi.fn()}
        initialMonth="2026-05"
      />,
    );
    // default Spanish headers: Lu Ma Mi Ju Vi Sa Do
    expect(screen.getByText("Lu")).toBeInTheDocument();
    expect(screen.getByText("Do")).toBeInTheDocument();
  });

  it("renders prev/next navigation buttons", () => {
    render(
      <CalendarMonthPicker
        availableDays={[]}
        onDaySelect={vi.fn()}
        initialMonth="2026-05"
      />,
    );
    expect(screen.getByRole("button", { name: /mes anterior/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /mes siguiente/i })).toBeInTheDocument();
  });

  it("navigates to previous month on prev click", async () => {
    const user = userEvent.setup();
    render(
      <CalendarMonthPicker
        availableDays={[]}
        onDaySelect={vi.fn()}
        initialMonth="2026-05"
      />,
    );
    await user.click(screen.getByRole("button", { name: /mes anterior/i }));
    expect(screen.getByText(/Abril 2026/i)).toBeInTheDocument();
  });

  it("navigates to next month on next click", async () => {
    const user = userEvent.setup();
    render(
      <CalendarMonthPicker
        availableDays={[]}
        onDaySelect={vi.fn()}
        initialMonth="2026-05"
      />,
    );
    await user.click(screen.getByRole("button", { name: /mes siguiente/i }));
    expect(screen.getByText(/Junio 2026/i)).toBeInTheDocument();
  });

  it("calls onDaySelect when clicking an available day", async () => {
    const user = userEvent.setup();
    const onDaySelect = vi.fn();
    render(
      <CalendarMonthPicker
        availableDays={AVAILABLE_DAYS}
        onDaySelect={onDaySelect}
        initialMonth="2026-05"
        minDate="2026-05-01"
      />,
    );
    // Day 5 is in AVAILABLE_DAYS
    const dayBtn = screen.getByRole("button", { name: /^5 de mayo de 2026$/i });
    await user.click(dayBtn);
    expect(onDaySelect).toHaveBeenCalledWith("2026-05-05");
  });

  it("does not call onDaySelect when clicking a non-available day", async () => {
    const user = userEvent.setup();
    const onDaySelect = vi.fn();
    render(
      <CalendarMonthPicker
        availableDays={AVAILABLE_DAYS}
        onDaySelect={onDaySelect}
        initialMonth="2026-05"
        minDate="2026-05-01"
      />,
    );
    // Day 6 is NOT in AVAILABLE_DAYS
    const dayBtn = screen.getByRole("button", { name: /^6 de mayo de 2026$/i });
    await user.click(dayBtn);
    expect(onDaySelect).not.toHaveBeenCalled();
  });

  it("disables days before minDate", () => {
    render(
      <CalendarMonthPicker
        availableDays={AVAILABLE_DAYS}
        onDaySelect={vi.fn()}
        initialMonth="2026-05"
        minDate="2026-05-10"
      />,
    );
    const day5 = screen.getByRole("button", { name: /^5 de mayo de 2026$/i });
    expect(day5).toBeDisabled();
  });

  it("marks selectedDate day as selected", () => {
    render(
      <CalendarMonthPicker
        availableDays={AVAILABLE_DAYS}
        selectedDate="2026-05-12"
        onDaySelect={vi.fn()}
        initialMonth="2026-05"
        minDate="2026-05-01"
      />,
    );
    const day12 = screen.getByRole("button", { name: /12 de mayo de 2026/i });
    expect(day12).toHaveAttribute("aria-pressed", "true");
  });

  it("accepts custom labels for month names", () => {
    render(
      <CalendarMonthPicker
        availableDays={[]}
        onDaySelect={vi.fn()}
        initialMonth="2026-05"
        labels={{ monthNames: ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"] }}
      />,
    );
    expect(screen.getByText(/May 2026/i)).toBeInTheDocument();
  });
});
