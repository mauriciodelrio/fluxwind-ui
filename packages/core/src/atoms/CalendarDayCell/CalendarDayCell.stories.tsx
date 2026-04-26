import type { Meta, StoryObj } from "@storybook/react";
import { CalendarDayCell } from "./CalendarDayCell";

const meta: Meta<typeof CalendarDayCell> = {
  title: "Atoms/CalendarDayCell",
  component: CalendarDayCell,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    state: {
      control: "select",
      options: ["default", "available", "selected", "disabled", "today"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof CalendarDayCell>;

export const Default: Story = {
  args: { day: 14, state: "default" },
};

export const Available: Story = {
  args: { day: 14, state: "available", hasAvailability: true },
};

export const Selected: Story = {
  args: { day: 14, state: "selected", hasAvailability: true },
};

export const Disabled: Story = {
  args: { day: 3, state: "disabled" },
};

export const Today: Story = {
  args: { day: 26, state: "today" },
};

export const TodayWithAvailability: Story = {
  args: { day: 26, state: "today", hasAvailability: true },
};
