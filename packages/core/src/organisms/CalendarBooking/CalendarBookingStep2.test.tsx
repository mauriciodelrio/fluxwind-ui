import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { CalendarBookingStep2 } from "./CalendarBookingStep2";
import { mockTimeSlots } from "@/__fixtures__/calendar";

describe("CalendarBookingStep2", () => {
  it("renders formatted date", () => {
    render(
      <CalendarBookingStep2
        selectedDate="2026-05-28"
        slots={mockTimeSlots}
        onSlotSelect={vi.fn()}
        onBack={vi.fn()}
      />,
    );
    expect(screen.getByText(/jueves/i)).toBeInTheDocument();
    expect(screen.getByText(/mayo/i)).toBeInTheDocument();
  });

  it("renders title", () => {
    render(
      <CalendarBookingStep2
        selectedDate="2026-05-28"
        slots={mockTimeSlots}
        onSlotSelect={vi.fn()}
        onBack={vi.fn()}
      />,
    );
    expect(screen.getByText(/selecciona un horario/i)).toBeInTheDocument();
  });

  it("renders loading skeleton when loading=true", () => {
    const { container } = render(
      <CalendarBookingStep2
        selectedDate="2026-05-28"
        slots={[]}
        loading
        onSlotSelect={vi.fn()}
        onBack={vi.fn()}
      />,
    );
    const busy = container.querySelector("[aria-busy='true']");
    expect(busy).toBeInTheDocument();
  });

  it("renders error message when error is provided", () => {
    render(
      <CalendarBookingStep2
        selectedDate="2026-05-28"
        slots={[]}
        error="No hay conexión"
        onSlotSelect={vi.fn()}
        onBack={vi.fn()}
      />,
    );
    expect(screen.getByRole("alert")).toBeInTheDocument();
    expect(screen.getByText("No hay conexión")).toBeInTheDocument();
  });

  it("renders retry button when onRetry is provided", () => {
    const onRetry = vi.fn();
    render(
      <CalendarBookingStep2
        selectedDate="2026-05-28"
        slots={[]}
        error="Fallo la carga"
        onSlotSelect={vi.fn()}
        onBack={vi.fn()}
        onRetry={onRetry}
      />,
    );
    expect(screen.getByRole("button", { name: /reintentar/i })).toBeInTheDocument();
  });

  it("calls onRetry when retry button is clicked", async () => {
    const user = userEvent.setup();
    const onRetry = vi.fn();
    render(
      <CalendarBookingStep2
        selectedDate="2026-05-28"
        slots={[]}
        error="Error"
        onSlotSelect={vi.fn()}
        onBack={vi.fn()}
        onRetry={onRetry}
      />,
    );
    await user.click(screen.getByRole("button", { name: /reintentar/i }));
    expect(onRetry).toHaveBeenCalledOnce();
  });

  it("calls onSlotSelect when an available slot is clicked", async () => {
    const user = userEvent.setup();
    const onSlotSelect = vi.fn();
    render(
      <CalendarBookingStep2
        selectedDate="2026-05-28"
        slots={mockTimeSlots}
        onSlotSelect={onSlotSelect}
        onBack={vi.fn()}
      />,
    );
    await user.click(screen.getByText("09:00 – 10:00"));
    expect(onSlotSelect).toHaveBeenCalledWith(mockTimeSlots[0]);
  });

  it("renders back button and calls onBack", async () => {
    const user = userEvent.setup();
    const onBack = vi.fn();
    render(
      <CalendarBookingStep2
        selectedDate="2026-05-28"
        slots={mockTimeSlots}
        onSlotSelect={vi.fn()}
        onBack={onBack}
      />,
    );
    await user.click(screen.getByRole("button", { name: /volver/i }));
    expect(onBack).toHaveBeenCalledOnce();
  });

  it("renders custom back label", () => {
    render(
      <CalendarBookingStep2
        selectedDate="2026-05-28"
        slots={mockTimeSlots}
        onSlotSelect={vi.fn()}
        onBack={vi.fn()}
        labels={{ back: "Regresar" }}
      />,
    );
    expect(screen.getByRole("button", { name: /regresar/i })).toBeInTheDocument();
  });
});
