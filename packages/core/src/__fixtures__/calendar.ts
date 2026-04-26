// ─── Calendar Fixtures ───────────────────────────────────────────────────────
// Shared mock data for CalendarManager and CalendarBooking stories and tests.
// Single source of truth — import from here, never duplicate inline.

export type SlotDuration = 30 | 45 | 60;
export type AttendanceMode = "in-person" | "remote";
export type BlockType = "available" | "protected";
export type Periodicity = "once" | "weekly" | "biweekly" | "monthly";
export type DayOfWeek = 0 | 1 | 2 | 3 | 4 | 5 | 6;
export type SlotStatus = "available" | "booked" | "protected";

export interface CalendarBlock {
  id: string;
  type: BlockType;
  periodicity: Periodicity;
  dayOfWeek?: DayOfWeek;
  date?: string; // "YYYY-MM-DD" — required when periodicity === "once"
  startTime: string; // "HH:mm"
  endTime: string; // "HH:mm"
  slotDuration: SlotDuration;
  attendanceMode: AttendanceMode;
  timezone: string;
}

export interface TimeSlot {
  date: string;
  startTime: string;
  endTime: string;
  status: SlotStatus;
  attendanceMode: AttendanceMode;
}

export interface Booking {
  id: string;
  lawyerId: string;
  date: string;
  startTime: string;
  endTime: string;
  attendanceMode: AttendanceMode;
  location?: string;
  meetingUrl?: string;
  clientName: string;
  clientEmail: string;
  status: "confirmed" | "pending" | "cancelled";
}

// ─── CalendarBlock fixtures ──────────────────────────────────────────────────

export const mockBlocks: CalendarBlock[] = [
  {
    id: "block-1",
    type: "available",
    periodicity: "weekly",
    dayOfWeek: 1, // lunes
    startTime: "09:00",
    endTime: "13:00",
    slotDuration: 60,
    attendanceMode: "in-person",
    timezone: "America/Santiago",
  },
  {
    id: "block-2",
    type: "available",
    periodicity: "weekly",
    dayOfWeek: 3, // miércoles
    startTime: "14:00",
    endTime: "18:00",
    slotDuration: 45,
    attendanceMode: "in-person",
    timezone: "America/Santiago",
  },
  {
    id: "block-3",
    type: "protected",
    periodicity: "weekly",
    dayOfWeek: 5, // viernes
    startTime: "12:00",
    endTime: "13:00",
    slotDuration: 60,
    attendanceMode: "in-person",
    timezone: "America/Santiago",
  },
  {
    id: "block-4",
    type: "available",
    periodicity: "once",
    date: "2026-05-28",
    startTime: "10:00",
    endTime: "12:00",
    slotDuration: 30,
    attendanceMode: "remote",
    timezone: "America/Santiago",
  },
];

export const mockBlocksSingleDay: CalendarBlock[] = [
  {
    id: "block-mon-1",
    type: "available",
    periodicity: "weekly",
    dayOfWeek: 1,
    startTime: "09:00",
    endTime: "12:00",
    slotDuration: 60,
    attendanceMode: "in-person",
    timezone: "America/Santiago",
  },
  {
    id: "block-mon-2",
    type: "protected",
    periodicity: "weekly",
    dayOfWeek: 1,
    startTime: "13:00",
    endTime: "14:00",
    slotDuration: 60,
    attendanceMode: "in-person",
    timezone: "America/Santiago",
  },
];

// ─── TimeSlot fixtures ───────────────────────────────────────────────────────

export const mockTimeSlots: TimeSlot[] = [
  {
    date: "2026-05-28",
    startTime: "09:00",
    endTime: "10:00",
    status: "available",
    attendanceMode: "in-person",
  },
  {
    date: "2026-05-28",
    startTime: "10:00",
    endTime: "11:00",
    status: "booked",
    attendanceMode: "in-person",
  },
  {
    date: "2026-05-28",
    startTime: "11:00",
    endTime: "12:00",
    status: "available",
    attendanceMode: "in-person",
  },
  {
    date: "2026-05-28",
    startTime: "12:00",
    endTime: "13:00",
    status: "protected",
    attendanceMode: "in-person",
  },
  {
    date: "2026-05-28",
    startTime: "14:00",
    endTime: "15:00",
    status: "available",
    attendanceMode: "in-person",
  },
  {
    date: "2026-05-28",
    startTime: "15:00",
    endTime: "16:00",
    status: "booked",
    attendanceMode: "in-person",
  },
];

export const mockAvailableDays: string[] = [
  "2026-05-05",
  "2026-05-12",
  "2026-05-19",
  "2026-05-26",
  "2026-05-28",
];

// ─── Labels (helpers) ────────────────────────────────────────────────────────

export const DAY_NAMES: Record<DayOfWeek, string> = {
  0: "Domingo",
  1: "Lunes",
  2: "Martes",
  3: "Miércoles",
  4: "Jueves",
  5: "Viernes",
  6: "Sábado",
};
