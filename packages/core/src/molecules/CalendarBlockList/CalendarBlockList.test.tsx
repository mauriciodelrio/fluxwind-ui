import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { CalendarBlockList } from "./CalendarBlockList";
import { mockBlocks, mockBlocksSingleDay } from "@/__fixtures__/calendar";

describe("CalendarBlockList", () => {
  it("renders empty state when no blocks", () => {
    render(<CalendarBlockList blocks={[]} onRemove={vi.fn()} />);
    expect(screen.getByText(/no hay bloques/i)).toBeInTheDocument();
  });

  it("renders custom empty state", () => {
    render(
      <CalendarBlockList
        blocks={[]}
        onRemove={vi.fn()}
        emptyState={<p>Sin bloques aún</p>}
      />,
    );
    expect(screen.getByText("Sin bloques aún")).toBeInTheDocument();
  });

  it("renders blocks grouped by day label", () => {
    render(<CalendarBlockList blocks={mockBlocks} onRemove={vi.fn()} />);
    expect(screen.getByText("Lunes")).toBeInTheDocument();
    expect(screen.getByText("Miércoles")).toBeInTheDocument();
    expect(screen.getByText("Viernes")).toBeInTheDocument();
  });

  it("shows time range for each block", () => {
    render(<CalendarBlockList blocks={mockBlocks} onRemove={vi.fn()} />);
    expect(screen.getByText("09:00 – 13:00")).toBeInTheDocument();
  });

  it("shows Available badge for available blocks", () => {
    render(<CalendarBlockList blocks={mockBlocks} onRemove={vi.fn()} />);
    expect(screen.getAllByText("Disponible").length).toBeGreaterThan(0);
  });

  it("shows Protected badge for protected blocks", () => {
    render(<CalendarBlockList blocks={mockBlocks} onRemove={vi.fn()} />);
    expect(screen.getByText("Protegido")).toBeInTheDocument();
  });

  it("calls onRemove with block id when delete button is clicked", async () => {
    const onRemove = vi.fn();
    render(
      <CalendarBlockList blocks={mockBlocksSingleDay} onRemove={onRemove} />,
    );
    const deleteButtons = screen.getAllByRole("button", { name: /eliminar/i });
    await userEvent.click(deleteButtons[0]);
    expect(onRemove).toHaveBeenCalledWith(mockBlocksSingleDay[0].id);
  });

  it("delete buttons have descriptive aria-label", () => {
    render(<CalendarBlockList blocks={mockBlocks} onRemove={vi.fn()} />);
    const deleteButtons = screen.getAllByRole("button", {
      name: /eliminar bloque/i,
    });
    expect(deleteButtons.length).toBeGreaterThan(0);
  });
});
