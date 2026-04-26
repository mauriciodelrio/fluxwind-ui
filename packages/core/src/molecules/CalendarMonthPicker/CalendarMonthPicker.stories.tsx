import type { Meta, StoryObj } from "@storybook/react";
import { CalendarMonthPicker } from "./CalendarMonthPicker";
import { mockAvailableDays } from "@/__fixtures__/calendar";

const meta: Meta<typeof CalendarMonthPicker> = {
  title: "Molecules/CalendarMonthPicker",
  component: CalendarMonthPicker,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof CalendarMonthPicker>;

export const WithAvailableDays: Story = {
  args: {
    availableDays: mockAvailableDays,
    onDaySelect: (date: string) => { console.log("Selected:", date); },
    initialMonth: "2026-05",
    minDate: "2026-05-01",
  },
};

export const AllBooked: Story = {
  args: {
    availableDays: [],
    onDaySelect: (date: string) => { console.log("Selected:", date); },
    initialMonth: "2026-05",
    minDate: "2026-05-01",
  },
};

export const EmptyMonth: Story = {
  args: {
    availableDays: [],
    onDaySelect: (date: string) => { console.log("Selected:", date); },
    initialMonth: "2026-06",
    minDate: "2026-06-01",
  },
};

export const WithSelectedDay: Story = {
  args: {
    availableDays: mockAvailableDays,
    selectedDate: "2026-05-12",
    onDaySelect: (date: string) => { console.log("Selected:", date); },
    initialMonth: "2026-05",
    minDate: "2026-05-01",
  },
};
