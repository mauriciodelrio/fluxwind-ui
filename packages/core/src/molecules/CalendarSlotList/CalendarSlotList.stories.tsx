import type { Meta, StoryObj } from "@storybook/react";
import { CalendarSlotList } from "./CalendarSlotList";
import { mockTimeSlots } from "@/__fixtures__/calendar";
import type { TimeSlot } from "@/__fixtures__/calendar";

const meta: Meta<typeof CalendarSlotList> = {
  title: "Molecules/CalendarSlotList",
  component: CalendarSlotList,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof CalendarSlotList>;

export const MixedStatuses: Story = {
  args: {
    slots: mockTimeSlots,
    onSlotSelect: (slot) => {
      console.log("Selected slot:", slot);
    },
  },
};

export const AllAvailable: Story = {
  args: {
    slots: mockTimeSlots.filter((s) => s.status === "available"),
    onSlotSelect: (slot) => {
      console.log("Selected slot:", slot);
    },
  },
};

export const AllBooked: Story = {
  args: {
    slots: mockTimeSlots.map(
      (s): TimeSlot => ({
        date: s.date,
        startTime: s.startTime,
        endTime: s.endTime,
        attendanceMode: s.attendanceMode,
        status: "booked",
      }),
    ),
    onSlotSelect: (slot) => {
      console.log("Selected slot:", slot);
    },
  },
};

export const Loading: Story = {
  args: {
    slots: [],
    loading: true,
    onSlotSelect: (slot) => {
      console.log("Selected slot:", slot);
    },
  },
};

export const Empty: Story = {
  args: {
    slots: [],
    onSlotSelect: (slot) => {
      console.log("Selected slot:", slot);
    },
  },
};
