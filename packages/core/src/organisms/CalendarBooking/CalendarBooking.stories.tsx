import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { CalendarBooking } from "./CalendarBooking";
import { mockTimeSlots, mockAvailableDays } from "@/__fixtures__/calendar";
import type { TimeSlot } from "@/__fixtures__/calendar";

const meta = {
  title: "Organisms/CalendarBooking",
  component: CalendarBooking,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof CalendarBooking>;

export default meta;
type Story = StoryObj<typeof meta>;

// ─── Info content helpers ─────────────────────────────────────────────────────

const AddressInfo = (
  <div className="flex flex-col gap-1 text-sm text-[var(--color-fw-muted)]">
    <p className="font-medium text-[var(--color-fw-foreground)]">
      Consulta presencial
    </p>
    <p>Providencia 1234, oficina 502</p>
    <p>Santiago, Región Metropolitana</p>
  </div>
);

const MeetingInfo = (
  <div className="flex flex-col gap-1 text-sm text-[var(--color-fw-muted)]">
    <p className="font-medium text-[var(--color-fw-foreground)]">
      Reunión por videollamada
    </p>
    <p>
      Recibirás el enlace en tu correo electrónico una vez confirmada la cita.
    </p>
  </div>
);

// ─── Wrapper to keep modal always open ───────────────────────────────────────

function BookingWrapper(
  props: Partial<React.ComponentProps<typeof CalendarBooking>>,
) {
  const [open, setOpen] = useState(true);

  return (
    <div>
      {!open && (
        <button
          onClick={() => {
            setOpen(true);
          }}
          className="px-4 py-2 rounded-md bg-[var(--color-fw-primary)] text-white text-sm"
        >
          Abrir modal de reserva
        </button>
      )}
      <CalendarBooking
        open={open}
        lawyerId="lawyer-123"
        availableDays={mockAvailableDays}
        infoContent={AddressInfo}
        onDaySelect={(): Promise<TimeSlot[]> => Promise.resolve(mockTimeSlots)}
        onConfirm={(): Promise<void> => Promise.resolve()}
        onClose={() => {
          setOpen(false);
        }}
        minDate="2026-05-01"
        {...props}
      />
    </div>
  );
}

// ─── Stories ─────────────────────────────────────────────────────────────────

/** Step 1 — day selection with address info in step 3 */
export const WithAddressInfo: Story = {
  render: () => <BookingWrapper />,
};

/** Step 1 — day selection with meeting/video link info in step 3 */
export const WithMeetingInfo: Story = {
  render: () => <BookingWrapper infoContent={MeetingInfo} />,
};

/** Step 2 with loading skeleton — simulates slow slot fetch */
export const WithLoadingSlots: Story = {
  render: () => (
    <BookingWrapper
      onDaySelect={async (): Promise<TimeSlot[]> => {
        await new Promise((resolve) => {
          setTimeout(resolve, 999_999);
        });
        return [];
      }}
    />
  ),
};

/** Step 2 error state — simulates a failed slot fetch */
export const WithSlotsFetchError: Story = {
  render: () => (
    <BookingWrapper
      onDaySelect={(): Promise<TimeSlot[]> =>
        Promise.reject(
          new Error("No fue posible obtener los horarios. Intenta nuevamente."),
        )
      }
    />
  ),
};

/** Full flow — confirms booking successfully */
export const BookingConfirmed: Story = {
  render: () => (
    <BookingWrapper
      onConfirm={async () => {
        await new Promise((resolve) => {
          setTimeout(resolve, 500);
        });
      }}
    />
  ),
};
