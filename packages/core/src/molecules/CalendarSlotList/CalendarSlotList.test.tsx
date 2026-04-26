import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { CalendarSlotList } from "./CalendarSlotList";
import { mockTimeSlots } from "@/__fixtures__/calendar";
import type { TimeSlot } from "@/__fixtures__/calendar";

describe("CalendarSlotList", () => {
  it("renders skeleton when loading=true", () => {
    const { container } = render(
      <CalendarSlotList slots={[]} loading onSlotSelect={vi.fn()} />,
    );
    expect(
      container.querySelectorAll(
        ".animate-pulse, [class*='skeleton'], .rounded-md",
      ).length,
    ).toBeGreaterThan(0);
  });

  it("has aria-busy=true when loading", () => {
    const { container } = render(
      <CalendarSlotList slots={[]} loading onSlotSelect={vi.fn()} />,
    );
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper).toHaveAttribute("aria-busy", "true");
  });

  it("renders empty state when no slots and not loading", () => {
    render(<CalendarSlotList slots={[]} onSlotSelect={vi.fn()} />);
    expect(
      screen.getByText(/no hay horarios disponibles/i),
    ).toBeInTheDocument();
  });

  it("renders all slots", () => {
    render(<CalendarSlotList slots={mockTimeSlots} onSlotSelect={vi.fn()} />);
    expect(screen.getByText("09:00 – 10:00")).toBeInTheDocument();
    expect(screen.getByText("10:00 – 11:00")).toBeInTheDocument();
  });

  it("calls onSlotSelect when available slot is clicked", async () => {
    const user = userEvent.setup();
    const onSlotSelect = vi.fn();
    render(
      <CalendarSlotList slots={mockTimeSlots} onSlotSelect={onSlotSelect} />,
    );
    // 09:00 slot is "available"
    await user.click(screen.getByText("09:00 – 10:00"));
    expect(onSlotSelect).toHaveBeenCalledWith(mockTimeSlots[0]);
  });

  it("does not call onSlotSelect when booked slot is clicked", async () => {
    const user = userEvent.setup();
    const onSlotSelect = vi.fn();
    render(
      <CalendarSlotList slots={mockTimeSlots} onSlotSelect={onSlotSelect} />,
    );
    // 10:00 slot is "booked"
    await user.click(screen.getByText("10:00 – 11:00"));
    expect(onSlotSelect).not.toHaveBeenCalled();
  });

  it("does not call onSlotSelect when protected slot is clicked", async () => {
    const user = userEvent.setup();
    const onSlotSelect = vi.fn();
    const protectedSlot: TimeSlot = {
      date: "2026-05-28",
      startTime: "12:00",
      endTime: "13:00",
      status: "protected",
      attendanceMode: "in-person",
    };
    render(
      <CalendarSlotList slots={[protectedSlot]} onSlotSelect={onSlotSelect} />,
    );
    await user.click(screen.getByText("12:00 – 13:00"));
    expect(onSlotSelect).not.toHaveBeenCalled();
  });

  it("accepts custom empty state label", () => {
    render(
      <CalendarSlotList
        slots={[]}
        onSlotSelect={vi.fn()}
        labels={{ noSlots: "Sin horarios" }}
      />,
    );
    expect(screen.getByText("Sin horarios")).toBeInTheDocument();
  });
});
