import { describe, it, expect, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { CalendarBookingStep3 } from "./CalendarBookingStep3";
import type { TimeSlot } from "@/__fixtures__/calendar";

const SLOT: TimeSlot = {
  date: "2026-05-28",
  startTime: "09:00",
  endTime: "10:00",
  status: "available",
  attendanceMode: "in-person",
};

const INFO = <p>Providencia 1234</p>;

describe("CalendarBookingStep3", () => {
  it("renders title", () => {
    render(
      <CalendarBookingStep3
        selectedDate="2026-05-28"
        selectedSlot={SLOT}
        infoContent={INFO}
        onConfirm={vi.fn(async () => {})}
        onBack={vi.fn()}
      />,
    );
    expect(screen.getByText(/confirma tu cita/i)).toBeInTheDocument();
  });

  it("renders booking summary with formatted date", () => {
    render(
      <CalendarBookingStep3
        selectedDate="2026-05-28"
        selectedSlot={SLOT}
        infoContent={INFO}
        onConfirm={vi.fn(async () => {})}
        onBack={vi.fn()}
      />,
    );
    expect(screen.getByText(/jueves/i)).toBeInTheDocument();
    expect(screen.getByText("09:00 – 10:00")).toBeInTheDocument();
  });

  it("renders infoContent", () => {
    render(
      <CalendarBookingStep3
        selectedDate="2026-05-28"
        selectedSlot={SLOT}
        infoContent={INFO}
        onConfirm={vi.fn(async () => {})}
        onBack={vi.fn()}
      />,
    );
    expect(screen.getByText("Providencia 1234")).toBeInTheDocument();
  });

  it("shows validation errors on empty submit", async () => {
    const user = userEvent.setup();
    render(
      <CalendarBookingStep3
        selectedDate="2026-05-28"
        selectedSlot={SLOT}
        infoContent={INFO}
        onConfirm={vi.fn(async () => {})}
        onBack={vi.fn()}
      />,
    );
    await user.click(screen.getByRole("button", { name: /confirmar cita/i }));
    expect(screen.getByText(/nombre es requerido/i)).toBeInTheDocument();
    expect(screen.getByText(/email es requerido/i)).toBeInTheDocument();
  });

  it("shows invalid email error when format is wrong", async () => {
    const user = userEvent.setup();
    render(
      <CalendarBookingStep3
        selectedDate="2026-05-28"
        selectedSlot={SLOT}
        infoContent={INFO}
        onConfirm={vi.fn(async () => {})}
        onBack={vi.fn()}
      />,
    );
    await user.type(screen.getByLabelText(/nombre/i), "Juan");
    await user.type(screen.getByLabelText(/email/i), "no-es-email");
    await user.click(screen.getByRole("button", { name: /confirmar cita/i }));
    expect(screen.getByText(/email no es válido/i)).toBeInTheDocument();
  });

  it("calls onConfirm with clientName and clientEmail on valid submit", async () => {
    const user = userEvent.setup();
    const onConfirm = vi.fn(async () => {});
    render(
      <CalendarBookingStep3
        selectedDate="2026-05-28"
        selectedSlot={SLOT}
        infoContent={INFO}
        onConfirm={onConfirm}
        onBack={vi.fn()}
      />,
    );
    await user.type(screen.getByLabelText(/nombre/i), "Juan Pérez");
    await user.type(screen.getByLabelText(/email/i), "juan@ejemplo.cl");
    await user.click(screen.getByRole("button", { name: /confirmar cita/i }));
    await waitFor(() => {
      expect(onConfirm).toHaveBeenCalledWith("Juan Pérez", "juan@ejemplo.cl");
    });
  });

  it("shows success state after successful onConfirm", async () => {
    const user = userEvent.setup();
    render(
      <CalendarBookingStep3
        selectedDate="2026-05-28"
        selectedSlot={SLOT}
        infoContent={INFO}
        onConfirm={vi.fn(async () => {})}
        onBack={vi.fn()}
      />,
    );
    await user.type(screen.getByLabelText(/nombre/i), "Juan Pérez");
    await user.type(screen.getByLabelText(/email/i), "juan@ejemplo.cl");
    await user.click(screen.getByRole("button", { name: /confirmar cita/i }));
    await waitFor(() => {
      expect(screen.getByText(/cita confirmada/i)).toBeInTheDocument();
    });
  });

  it("shows error alert when onConfirm rejects", async () => {
    const user = userEvent.setup();
    render(
      <CalendarBookingStep3
        selectedDate="2026-05-28"
        selectedSlot={SLOT}
        infoContent={INFO}
        onConfirm={vi.fn(
          (): Promise<void> => Promise.reject(new Error("Fallo del servidor")),
        )}
        onBack={vi.fn()}
      />,
    );
    await user.type(screen.getByLabelText(/nombre/i), "Juan Pérez");
    await user.type(screen.getByLabelText(/email/i), "juan@ejemplo.cl");
    await user.click(screen.getByRole("button", { name: /confirmar cita/i }));
    await waitFor(() => {
      expect(screen.getByRole("alert")).toBeInTheDocument();
      expect(screen.getByText(/fallo del servidor/i)).toBeInTheDocument();
    });
  });

  it("back button calls onBack", async () => {
    const user = userEvent.setup();
    const onBack = vi.fn();
    render(
      <CalendarBookingStep3
        selectedDate="2026-05-28"
        selectedSlot={SLOT}
        infoContent={INFO}
        onConfirm={vi.fn(async () => {})}
        onBack={onBack}
      />,
    );
    await user.click(screen.getByRole("button", { name: /volver/i }));
    expect(onBack).toHaveBeenCalledOnce();
  });
});
