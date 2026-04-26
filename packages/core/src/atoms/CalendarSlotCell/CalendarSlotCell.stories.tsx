import type { Meta, StoryObj } from "@storybook/react";
import { CalendarSlotCell } from "./CalendarSlotCell";

const meta = {
  title: "Atoms/CalendarSlotCell",
  component: CalendarSlotCell,
  args: {
    label: "09:00 – 10:00",
  },
} satisfies Meta<typeof CalendarSlotCell>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Available: Story = {
  args: { status: "available" },
};

export const Booked: Story = {
  args: { status: "booked" },
};

export const Protected: Story = {
  args: { status: "protected" },
};

export const AllStatuses: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <CalendarSlotCell label="09:00 – 10:00" status="available" />
      <CalendarSlotCell label="10:00 – 11:00" status="booked" />
      <CalendarSlotCell label="11:00 – 12:00" status="protected" />
      <CalendarSlotCell label="14:00 – 15:00" status="available" />
      <CalendarSlotCell label="15:00 – 16:00" status="booked" />
    </div>
  ),
};
