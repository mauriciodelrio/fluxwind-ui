import type { Meta, StoryObj } from "@storybook/react";
import { useState, type ComponentProps } from "react";
import { CalendarManager } from "./CalendarManager";
import {
  mockBlocks,
  mockBlocksSingleDay,
  type CalendarBlock,
} from "@/__fixtures__/calendar";

const meta = {
  title: "Organisms/CalendarManager",
  component: CalendarManager,
  parameters: {
    layout: "padded",
  },
} satisfies Meta<typeof CalendarManager>;

export default meta;
type Story = StoryObj<typeof meta>;

// ─── Interactive wrapper ──────────────────────────────────────────────────────

function InteractiveCalendarManager(
  props: Omit<
    ComponentProps<typeof CalendarManager>,
    "blocks" | "onAddBlock" | "onRemoveBlock"
  > & {
    initialBlocks?: CalendarBlock[];
  },
) {
  const { initialBlocks = [], ...rest } = props;
  const [blocks, setBlocks] = useState<CalendarBlock[]>(initialBlocks);

  return (
    <CalendarManager
      {...rest}
      blocks={blocks}
      onAddBlock={(data: Omit<CalendarBlock, "id" | "timezone">) => {
        const newBlock: CalendarBlock = {
          ...data,
          id: `block-${String(Date.now())}`,
          timezone: "America/Santiago",
        };
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        setBlocks((prev) => [...prev, newBlock]);
      }}
      onRemoveBlock={(id) => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        setBlocks((prev) => prev.filter((b) => b.id !== id));
      }}
    />
  );
}

// ─── Stories ─────────────────────────────────────────────────────────────────

export const Empty: Story = {
  render: () => <InteractiveCalendarManager attendanceMode="in-person" />,
};

export const WithBlocks: Story = {
  render: () => (
    <InteractiveCalendarManager
      attendanceMode="in-person"
      initialBlocks={mockBlocks}
    />
  ),
};

export const WithMixedTypes: Story = {
  name: "Mixed types (same day)",
  render: () => (
    <InteractiveCalendarManager
      attendanceMode="in-person"
      initialBlocks={mockBlocksSingleDay}
    />
  ),
};

export const InPersonMode: Story = {
  render: () => (
    <InteractiveCalendarManager
      attendanceMode="in-person"
      initialBlocks={mockBlocks}
    />
  ),
};

export const RemoteMode: Story = {
  render: () => (
    <InteractiveCalendarManager
      attendanceMode="remote"
      initialBlocks={mockBlocks}
    />
  ),
};
