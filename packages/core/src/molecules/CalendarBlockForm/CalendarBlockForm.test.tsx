import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { CalendarBlockForm } from "./CalendarBlockForm";

describe("CalendarBlockForm", () => {
  it("renders all base fields", () => {
    render(<CalendarBlockForm onSubmit={vi.fn()} attendanceMode="in-person" />);
    expect(screen.getByLabelText(/tipo de bloque/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/periodicidad/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/inicio/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/término/i)).toBeInTheDocument();
  });

  it("shows slotDuration when type is available", () => {
    render(<CalendarBlockForm onSubmit={vi.fn()} attendanceMode="in-person" />);
    expect(screen.getByLabelText(/duración/i)).toBeInTheDocument();
  });

  it("hides slotDuration when type is protected", async () => {
    render(<CalendarBlockForm onSubmit={vi.fn()} attendanceMode="in-person" />);
    await userEvent.selectOptions(
      screen.getByLabelText(/tipo de bloque/i),
      "protected",
    );
    expect(screen.queryByLabelText(/duración/i)).not.toBeInTheDocument();
  });

  it("shows date field when periodicity is once", async () => {
    render(<CalendarBlockForm onSubmit={vi.fn()} attendanceMode="in-person" />);
    await userEvent.selectOptions(
      screen.getByLabelText(/periodicidad/i),
      "once",
    );
    expect(screen.getByLabelText(/fecha/i)).toBeInTheDocument();
    expect(
      screen.queryByLabelText(/día de la semana/i),
    ).not.toBeInTheDocument();
  });

  it("shows dayOfWeek when periodicity is weekly", () => {
    render(<CalendarBlockForm onSubmit={vi.fn()} attendanceMode="in-person" />);
    expect(screen.getByLabelText(/día de la semana/i)).toBeInTheDocument();
  });

  it("shows error when endTime is before startTime", async () => {
    render(<CalendarBlockForm onSubmit={vi.fn()} attendanceMode="in-person" />);
    await userEvent.clear(screen.getByLabelText(/inicio/i));
    await userEvent.type(screen.getByLabelText(/inicio/i), "14:00");
    await userEvent.clear(screen.getByLabelText(/término/i));
    await userEvent.type(screen.getByLabelText(/término/i), "09:00");
    await userEvent.click(
      screen.getByRole("button", { name: /agregar bloque/i }),
    );
    expect(screen.getByText(/posterior al inicio/i)).toBeInTheDocument();
  });

  it("calls onSubmit with correct data when form is valid", async () => {
    const onSubmit = vi.fn();
    render(
      <CalendarBlockForm onSubmit={onSubmit} attendanceMode="in-person" />,
    );
    await userEvent.click(
      screen.getByRole("button", { name: /agregar bloque/i }),
    );
    expect(onSubmit).toHaveBeenCalledOnce();
    expect(onSubmit).toHaveBeenCalledWith(
      expect.objectContaining({
        type: "available",
        attendanceMode: "in-person",
      }),
    );
  });

  it("shows overlap warning when blocks overlap", async () => {
    const existing = [
      {
        dayOfWeek: 1 as const,
        date: undefined,
        startTime: "09:00",
        endTime: "13:00",
      },
    ];
    render(
      <CalendarBlockForm
        onSubmit={vi.fn()}
        attendanceMode="in-person"
        existingBlocks={existing}
      />,
    );
    await userEvent.click(
      screen.getByRole("button", { name: /agregar bloque/i }),
    );
    expect(screen.getByRole("alert")).toBeInTheDocument();
  });

  it("calls onCancel when cancel button is clicked", async () => {
    const onCancel = vi.fn();
    render(
      <CalendarBlockForm
        onSubmit={vi.fn()}
        onCancel={onCancel}
        attendanceMode="in-person"
      />,
    );
    await userEvent.click(screen.getByRole("button", { name: /cancelar/i }));
    expect(onCancel).toHaveBeenCalledOnce();
  });

  it("shows missing date error when periodicity is once and date is empty", async () => {
    render(<CalendarBlockForm onSubmit={vi.fn()} attendanceMode="in-person" />);
    await userEvent.selectOptions(
      screen.getByLabelText(/periodicidad/i),
      "once",
    );
    await userEvent.click(
      screen.getByRole("button", { name: /agregar bloque/i }),
    );
    expect(screen.getByText(/ingresa una fecha/i)).toBeInTheDocument();
  });

  it("detects overlap by date for once blocks", async () => {
    const existing = [
      {
        dayOfWeek: undefined,
        date: "2026-05-28",
        startTime: "09:00",
        endTime: "13:00",
      },
    ];
    render(
      <CalendarBlockForm
        onSubmit={vi.fn()}
        attendanceMode="in-person"
        existingBlocks={existing}
      />,
    );
    await userEvent.selectOptions(
      screen.getByLabelText(/periodicidad/i),
      "once",
    );
    await userEvent.type(screen.getByLabelText(/fecha/i), "2026-05-28");
    await userEvent.click(
      screen.getByRole("button", { name: /agregar bloque/i }),
    );
    expect(screen.getByRole("alert")).toBeInTheDocument();
  });

  it("does not show overlap warning for non-overlapping same-day blocks", async () => {
    const existing = [
      {
        dayOfWeek: 1 as const,
        date: undefined,
        startTime: "14:00",
        endTime: "18:00",
      },
    ];
    render(
      <CalendarBlockForm
        onSubmit={vi.fn()}
        attendanceMode="in-person"
        existingBlocks={existing}
      />,
    );
    // Default times are 09:00–13:00, no overlap with 14:00–18:00
    await userEvent.click(
      screen.getByRole("button", { name: /agregar bloque/i }),
    );
    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
  });
});
