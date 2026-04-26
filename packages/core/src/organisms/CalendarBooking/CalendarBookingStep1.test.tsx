import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { CalendarBookingStep1 } from "./CalendarBookingStep1";

const AVAILABLE_DAYS = ["2026-05-12", "2026-05-19", "2026-05-26"];

describe("CalendarBookingStep1", () => {
  it("renders title", () => {
    render(
      <CalendarBookingStep1
        availableDays={AVAILABLE_DAYS}
        onDaySelect={vi.fn()}
      />,
    );
    expect(screen.getByText(/selecciona un día/i)).toBeInTheDocument();
  });

  it("renders subtitle", () => {
    render(
      <CalendarBookingStep1
        availableDays={AVAILABLE_DAYS}
        onDaySelect={vi.fn()}
      />,
    );
    expect(screen.getByText(/días con disponibilidad/i)).toBeInTheDocument();
  });

  it("renders custom title via labels", () => {
    render(
      <CalendarBookingStep1
        availableDays={AVAILABLE_DAYS}
        onDaySelect={vi.fn()}
        labels={{ title: "Elige tu día" }}
      />,
    );
    expect(screen.getByText("Elige tu día")).toBeInTheDocument();
  });

  it("renders the month picker grid", () => {
    render(
      <CalendarBookingStep1
        availableDays={AVAILABLE_DAYS}
        onDaySelect={vi.fn()}
      />,
    );
    expect(screen.getByRole("grid")).toBeInTheDocument();
  });

  it("renders month navigation buttons", () => {
    render(
      <CalendarBookingStep1
        availableDays={["2026-05-12"]}
        onDaySelect={vi.fn()}
        minDate="2026-05-01"
      />,
    );
    expect(screen.getByRole("button", { name: /mes anterior/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /mes siguiente/i })).toBeInTheDocument();
  });
});
