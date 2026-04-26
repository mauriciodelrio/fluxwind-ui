import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { CalendarSlotCell } from "./CalendarSlotCell";

describe("CalendarSlotCell", () => {
  it("renders the label", () => {
    render(<CalendarSlotCell label="09:00 – 10:00" status="available" />);
    expect(screen.getByText("09:00 – 10:00")).toBeInTheDocument();
  });

  it("is clickable when status is available", async () => {
    const onClickMock = vi.fn();
    render(
      <CalendarSlotCell
        label="09:00 – 10:00"
        status="available"
        onClick={onClickMock}
      />,
    );
    await userEvent.click(
      screen.getByRole("button", { name: "09:00 – 10:00" }),
    );
    expect(onClickMock).toHaveBeenCalledOnce();
  });

  it("is not clickable when status is booked", async () => {
    const onClickMock = vi.fn();
    render(
      <CalendarSlotCell
        label="10:00 – 11:00"
        status="booked"
        onClick={onClickMock}
      />,
    );
    const btn = screen.getByRole("button", { name: "10:00 – 11:00" });
    expect(btn).toBeDisabled();
    await userEvent.click(btn);
    expect(onClickMock).not.toHaveBeenCalled();
  });

  it("is not clickable when status is protected", async () => {
    const onClickMock = vi.fn();
    render(
      <CalendarSlotCell
        label="12:00 – 13:00"
        status="protected"
        onClick={onClickMock}
      />,
    );
    const btn = screen.getByRole("button", { name: "12:00 – 13:00" });
    expect(btn).toBeDisabled();
    await userEvent.click(btn);
    expect(onClickMock).not.toHaveBeenCalled();
  });

  it("applies available status class", () => {
    render(<CalendarSlotCell label="09:00 – 10:00" status="available" />);
    const btn = screen.getByRole("button");
    expect(btn.className).toMatch(/fw-primary/);
  });
});
