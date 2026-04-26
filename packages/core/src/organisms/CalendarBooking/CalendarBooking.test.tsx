import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { CalendarBooking } from "./CalendarBooking";
import { mockTimeSlots, mockAvailableDays } from "@/__fixtures__/calendar";
import type { TimeSlot } from "@/__fixtures__/calendar";

// ─── jsdom dialog mock ────────────────────────────────────────────────────────

function defineDialogMethods() {
  if (
    !Object.getOwnPropertyDescriptor(HTMLDialogElement.prototype, "showModal")
  ) {
    Object.defineProperty(HTMLDialogElement.prototype, "showModal", {
      writable: true,
      configurable: true,
      value(this: HTMLDialogElement) {
        this.setAttribute("open", "");
      },
    });
  }
  if (!Object.getOwnPropertyDescriptor(HTMLDialogElement.prototype, "close")) {
    Object.defineProperty(HTMLDialogElement.prototype, "close", {
      writable: true,
      configurable: true,
      value(this: HTMLDialogElement) {
        this.removeAttribute("open");
        this.dispatchEvent(new Event("close"));
      },
    });
  }
}

beforeEach(() => {
  defineDialogMethods();
  vi.spyOn(HTMLDialogElement.prototype, "showModal").mockImplementation(
    function (this: HTMLDialogElement) {
      this.setAttribute("open", "");
    },
  );
  vi.spyOn(HTMLDialogElement.prototype, "close").mockImplementation(function (
    this: HTMLDialogElement,
  ) {
    this.removeAttribute("open");
    this.dispatchEvent(new Event("close"));
  });
});

afterEach(() => {
  vi.restoreAllMocks();
});

// ─── Helpers ──────────────────────────────────────────────────────────────────

function renderBooking(
  overrides: Partial<React.ComponentProps<typeof CalendarBooking>> = {},
) {
  const onClose = vi.fn();
  const onDaySelect = vi.fn(
    (): Promise<TimeSlot[]> => Promise.resolve(mockTimeSlots),
  );
  const onConfirm = vi.fn((): Promise<void> => Promise.resolve());

  const result = render(
    <CalendarBooking
      open={true}
      lawyerId="lawyer-123"
      availableDays={mockAvailableDays}
      infoContent={<p>Providencia 1234</p>}
      onDaySelect={onDaySelect}
      onConfirm={onConfirm}
      onClose={onClose}
      minDate="2026-05-01"
      initialMonth="2026-05"
      {...overrides}
    />,
  );
  return { ...result, onClose, onDaySelect, onConfirm };
}

// ─── Tests ────────────────────────────────────────────────────────────────────

describe("CalendarBooking – initial render (step 1)", () => {
  it("renders modal dialog", () => {
    renderBooking();
    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });

  it("renders step 1 of 3 indicator", () => {
    renderBooking();
    // Text appears in both an sr-only span and a visible Text element
    expect(screen.getAllByText(/paso 1 de 3/i).length).toBeGreaterThanOrEqual(
      1,
    );
  });

  it("renders month picker grid in step 1", () => {
    renderBooking();
    expect(screen.getByRole("grid")).toBeInTheDocument();
  });

  it("renders 'Reservar hora' heading", () => {
    renderBooking();
    expect(screen.getByText(/reservar hora/i)).toBeInTheDocument();
  });

  it("calls onClose when modal header × button is clicked", async () => {
    const user = userEvent.setup();
    const { onClose } = renderBooking();
    await user.click(screen.getByRole("button", { name: /cerrar/i }));
    expect(onClose).toHaveBeenCalledOnce();
  });
});

describe("CalendarBooking – step navigation", () => {
  it("moves to step 2 when a day is selected", async () => {
    const user = userEvent.setup();
    const { onDaySelect } = renderBooking();

    await user.click(
      screen.getByRole("button", { name: /^26 de mayo de 2026$/i }),
    );

    await waitFor(() => {
      expect(onDaySelect).toHaveBeenCalled();
      expect(screen.getAllByText(/paso 2 de 3/i).length).toBeGreaterThanOrEqual(
        1,
      );
    });
  });

  it("moves to step 3 when a slot is selected", async () => {
    const user = userEvent.setup();
    renderBooking();

    await user.click(
      screen.getByRole("button", { name: /^26 de mayo de 2026$/i }),
    );

    // Wait for slots to load
    await waitFor(() => {
      expect(screen.getByText("09:00 – 10:00")).toBeInTheDocument();
    });

    await user.click(screen.getByText("09:00 – 10:00"));

    await waitFor(() => {
      expect(screen.getAllByText(/paso 3 de 3/i).length).toBeGreaterThanOrEqual(
        1,
      );
    });
  });

  it("goes back to step 1 from step 2", async () => {
    const user = userEvent.setup();
    renderBooking();

    await user.click(
      screen.getByRole("button", { name: /^26 de mayo de 2026$/i }),
    );

    await waitFor(() => {
      expect(screen.getAllByText(/paso 2 de 3/i).length).toBeGreaterThanOrEqual(
        1,
      );
    });

    await user.click(screen.getByRole("button", { name: /volver/i }));
    expect(screen.getAllByText(/paso 1 de 3/i).length).toBeGreaterThanOrEqual(
      1,
    );
  });
});

describe("CalendarBooking – step 3 confirmation", () => {
  async function reachStep3(user: ReturnType<typeof userEvent.setup>) {
    // Step 1 → click day 26 (available in mockAvailableDays)
    await user.click(
      screen.getByRole("button", { name: /^26 de mayo de 2026$/i }),
    );
    // Wait for slots
    await waitFor(() => {
      expect(screen.getByText("09:00 – 10:00")).toBeInTheDocument();
    });
    await user.click(screen.getByText("09:00 – 10:00"));
    await waitFor(() => {
      expect(screen.getByText(/confirma tu cita/i)).toBeInTheDocument();
    });
  }

  it("renders infoContent in step 3", async () => {
    const user = userEvent.setup();
    renderBooking();
    await reachStep3(user);
    expect(screen.getByText("Providencia 1234")).toBeInTheDocument();
  });

  it("calls onConfirm with booking data on valid form submit", async () => {
    const user = userEvent.setup();
    const { onConfirm } = renderBooking();
    await reachStep3(user);

    await user.type(screen.getByLabelText(/nombre/i), "Ana García");
    await user.type(screen.getByLabelText(/email/i), "ana@test.cl");
    await user.click(screen.getByRole("button", { name: /confirmar cita/i }));

    await waitFor(() => {
      expect(onConfirm).toHaveBeenCalledWith(
        expect.objectContaining({
          lawyerId: "lawyer-123",
          date: expect.stringContaining("2026-05-"),
          clientName: "Ana García",
          clientEmail: "ana@test.cl",
        }),
      );
    });
  });
});

describe("CalendarBooking – error handling", () => {
  it("shows error when onDaySelect rejects", async () => {
    const user = userEvent.setup();
    renderBooking({
      onDaySelect: vi.fn(
        (): Promise<TimeSlot[]> => Promise.reject(new Error("Sin red")),
      ),
    });

    await user.click(
      screen.getByRole("button", { name: /^26 de mayo de 2026$/i }),
    );

    await waitFor(() => {
      expect(screen.getByRole("alert")).toBeInTheDocument();
    });
  });
});
