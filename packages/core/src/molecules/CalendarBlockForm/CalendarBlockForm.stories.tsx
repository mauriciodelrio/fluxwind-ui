import type { Meta, StoryObj } from "@storybook/react";
import { CalendarBlockForm } from "./CalendarBlockForm";
import { mockBlocks } from "@/__fixtures__/calendar";

const meta = {
  title: "Molecules/CalendarBlockForm",
  component: CalendarBlockForm,
  args: {
    attendanceMode: "in-person",
    onSubmit: (data) => {
      console.log("onSubmit", data);
    },
  },
} satisfies Meta<typeof CalendarBlockForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const AvailableType: Story = {
  args: { attendanceMode: "in-person" },
};

export const ProtectedType: Story = {
  render: (args) => (
    <div className="max-w-sm">
      <CalendarBlockForm {...args} />
    </div>
  ),
  args: { attendanceMode: "in-person" },
};

export const OnceDate: Story = {
  args: { attendanceMode: "remote" },
};

export const WithOverlapWarning: Story = {
  args: {
    attendanceMode: "in-person",
    existingBlocks: mockBlocks,
  },
};

export const RemoteMode: Story = {
  args: { attendanceMode: "remote" },
};
