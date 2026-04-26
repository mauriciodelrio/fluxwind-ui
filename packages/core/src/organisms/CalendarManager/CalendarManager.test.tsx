import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { CalendarManager } from "./CalendarManager";
import { mockBlocks } from "@/__fixtures__/calendar";

const defaultProps = {
  attendanceMode: "in-person" as const,
  blocks: [],
  onAddBlock: vi.fn(),
  onRemoveBlock: vi.fn(),
};

describe("CalendarManager", () => {
  it("renders the section heading", () => {
    render(<CalendarManager {...defaultProps} />);
    expect(
      screen.getByRole("region", { name: /configuración de agenda/i }),
    ).toBeInTheDocument();
  });

  it("shows empty state when blocks list is empty", () => {
    render(<CalendarManager {...defaultProps} />);
    expect(screen.getByText(/sin bloques configurados/i)).toBeInTheDocument();
  });

  it("shows block count in header", () => {
    render(<CalendarManager {...defaultProps} blocks={mockBlocks} />);
    expect(
      screen.getByText(`${String(mockBlocks.length)} bloques`),
    ).toBeInTheDocument();
  });

  it("renders the block list when blocks exist", () => {
    render(<CalendarManager {...defaultProps} blocks={mockBlocks} />);
    expect(screen.getAllByText("Lunes").length).toBeGreaterThan(0);
  });

  it("shows the form panel", () => {
    render(<CalendarManager {...defaultProps} />);
    expect(
      screen.getByRole("button", { name: /agregar bloque/i }),
    ).toBeInTheDocument();
  });

  it("shows attendanceMode label in form panel header", () => {
    render(<CalendarManager {...defaultProps} attendanceMode="remote" />);
    expect(screen.getByText(/remoto/i)).toBeInTheDocument();
  });

  it("calls onAddBlock when form is submitted", async () => {
    const onAddBlock = vi.fn();
    render(<CalendarManager {...defaultProps} onAddBlock={onAddBlock} />);
    await userEvent.click(
      screen.getByRole("button", { name: /agregar bloque/i }),
    );
    expect(onAddBlock).toHaveBeenCalledOnce();
  });

  it("calls onRemoveBlock when delete button is clicked", async () => {
    const onRemoveBlock = vi.fn();
    render(
      <CalendarManager
        {...defaultProps}
        blocks={mockBlocks}
        onRemoveBlock={onRemoveBlock}
      />,
    );
    const deleteButtons = screen.getAllByRole("button", { name: /eliminar/i });
    await userEvent.click(deleteButtons[0]);
    expect(onRemoveBlock).toHaveBeenCalledWith(mockBlocks[0].id);
  });

  it("renders custom emptyStateSlot when provided and blocks is empty", () => {
    render(
      <CalendarManager
        {...defaultProps}
        emptyStateSlot={<span>Custom empty</span>}
      />,
    );
    expect(screen.getByText("Custom empty")).toBeInTheDocument();
  });
});
