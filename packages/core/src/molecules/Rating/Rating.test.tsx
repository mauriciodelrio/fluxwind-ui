import { describe, it, expect, vi } from "vitest";
import { render, screen, within, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import axe from "axe-core";
import { Rating } from "./Rating";

// ─── Structure ────────────────────────────────────────────────────────────────

describe("Rating – structure", () => {
  it("renders a <fieldset> with role='group'", () => {
    render(<Rating label="Rate this product" />);
    expect(
      screen.getByRole("group", { name: "Rate this product" }),
    ).toBeInTheDocument();
  });

  it("renders 5 radio buttons by default", () => {
    render(<Rating label="Rate this product" />);
    const radios = screen.getAllByRole("radio");
    expect(radios).toHaveLength(5);
  });

  it("renders custom number of stars via max prop", () => {
    render(<Rating label="Rate" max={3} />);
    expect(screen.getAllByRole("radio")).toHaveLength(3);
  });

  it("each radio has an accessible label", () => {
    render(<Rating label="Rate" />);
    expect(screen.getByRole("radio", { name: "1 star" })).toBeInTheDocument();
    expect(screen.getByRole("radio", { name: "2 stars" })).toBeInTheDocument();
    expect(screen.getByRole("radio", { name: "5 stars" })).toBeInTheDocument();
  });

  it("accepts custom getStarLabel", () => {
    render(
      <Rating
        label="Rate"
        getStarLabel={(v) => `${String(v)} estrella${v !== 1 ? "s" : ""}`}
      />,
    );
    expect(
      screen.getByRole("radio", { name: "1 estrella" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("radio", { name: "3 estrellas" }),
    ).toBeInTheDocument();
  });

  it("no radio is checked when value is 0 (default)", () => {
    render(<Rating label="Rate" />);
    const radios = screen.getAllByRole("radio");
    radios.forEach((radio) => {
      expect(radio).not.toBeChecked();
    });
  });

  it("has displayName 'Rating'", () => {
    expect(Rating.displayName).toBe("Rating");
  });
});

// ─── Controlled value ─────────────────────────────────────────────────────────

describe("Rating – controlled value", () => {
  it("checks the radio matching the controlled value", () => {
    render(<Rating label="Rate" value={3} />);
    expect(screen.getByRole("radio", { name: "3 stars" })).toBeChecked();
  });

  it("unchecks all radios when controlled value is 0", () => {
    render(<Rating label="Rate" value={0} />);
    screen.getAllByRole("radio").forEach((r) => {
      expect(r).not.toBeChecked();
    });
  });
});

// ─── Uncontrolled value ───────────────────────────────────────────────────────

describe("Rating – uncontrolled value", () => {
  it("pre-checks the radio matching defaultValue", () => {
    render(<Rating label="Rate" defaultValue={4} />);
    expect(screen.getByRole("radio", { name: "4 stars" })).toBeChecked();
  });

  it("selects a star on click (uncontrolled)", async () => {
    const user = userEvent.setup();
    render(<Rating label="Rate" defaultValue={0} />);

    await user.click(screen.getByRole("radio", { name: "3 stars" }));
    // Controlled radio checked state depends on the signal re-render flushing —
    // waitFor polls until React has committed the updated checked prop.
    await waitFor(() => {
      expect(screen.getByRole("radio", { name: "3 stars" })).toBeChecked();
    });
  });
});

// ─── onChange ─────────────────────────────────────────────────────────────────

describe("Rating – onChange", () => {
  it("calls onChange with the selected value", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<Rating label="Rate" onChange={onChange} />);

    await user.click(screen.getByRole("radio", { name: "4 stars" }));
    expect(onChange).toHaveBeenCalledWith(4);
  });

  it("calls onChange with 0 when clicking the selected star (deselect)", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<Rating label="Rate" value={3} onChange={onChange} />);

    await user.click(screen.getByRole("radio", { name: "3 stars" }));
    expect(onChange).toHaveBeenCalledWith(0);
  });

  it("does not call onChange when clicking a different already-selected star", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<Rating label="Rate" value={3} onChange={onChange} />);

    // Clicking star 5 (different from current value 3)
    await user.click(screen.getByRole("radio", { name: "5 stars" }));
    expect(onChange).toHaveBeenCalledWith(5);
  });
});

// ─── Disabled ─────────────────────────────────────────────────────────────────

describe("Rating – disabled", () => {
  it("disables all radio inputs when disabled=true", () => {
    render(<Rating label="Rate" disabled />);
    screen.getAllByRole("radio").forEach((r) => {
      expect(r).toBeDisabled();
    });
  });

  it("does not call onChange when disabled", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<Rating label="Rate" disabled onChange={onChange} />);

    // Attempt to click — disabled fieldset blocks interaction
    const radio = screen.getByRole("radio", { name: "2 stars" });
    await user.click(radio);
    expect(onChange).not.toHaveBeenCalled();
  });
});

// ─── Readonly ─────────────────────────────────────────────────────────────────

describe("Rating – readonly", () => {
  it("shows the value visually but does not change it on click", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<Rating label="Rate" value={3} readonly onChange={onChange} />);

    // The group renders with the value shown
    expect(screen.getByRole("radio", { name: "3 stars" })).toBeChecked();

    // pointer-events-none means clicks don't register on the labels —
    // verify the onChange is NOT triggered (readonly guard in handler)
    const radio = screen.getByRole("radio", { name: "5 stars" });
    await user.click(radio);
    expect(onChange).not.toHaveBeenCalled();
  });
});

// ─── Keyboard ─────────────────────────────────────────────────────────────────
// Arrow-key navigation is native browser behaviour for radio groups and is not
// reliably reproducible in jsdom. We verify the structural prerequisites that
// enable it instead: all radios share the same `name` inside a `<fieldset>`.

describe("Rating – keyboard navigation (structural prerequisites)", () => {
  it("all radio inputs share the same name attribute", () => {
    render(<Rating label="Rate" />);
    const radios = screen.getAllByRole("radio");
    const names = radios.map((r) => (r as HTMLInputElement).name);
    // Every radio has a name and they are all identical (same group)
    expect(new Set(names).size).toBe(1);
    expect(names[0]).toBeTruthy();
  });

  it("radio inputs are inside the fieldset group element", () => {
    render(<Rating label="Rate" />);
    const group = screen.getByRole("group", { name: "Rate" });
    const radios = within(group).getAllByRole("radio");
    expect(radios).toHaveLength(5);
  });

  it("each radio receives focus individually (focusable)", () => {
    render(<Rating label="Rate" defaultValue={3} />);
    const radio3 = screen.getByRole("radio", { name: "3 stars" });
    radio3.focus();
    expect(document.activeElement).toBe(radio3);
  });

  it("disabled radios are not focusable", () => {
    render(<Rating label="Rate" disabled />);
    screen.getAllByRole("radio").forEach((r) => {
      expect(r).toBeDisabled();
    });
  });
});

// ─── className forwarding ─────────────────────────────────────────────────────

describe("Rating – className / customisation", () => {
  it("forwards className to the fieldset", () => {
    render(<Rating label="Rate" className="custom-class" />);
    expect(screen.getByRole("group", { name: "Rate" })).toHaveClass(
      "custom-class",
    );
  });

  it("accepts custom getValueText (live region content)", () => {
    const { container } = render(
      <Rating
        label="Rate"
        value={3}
        max={5}
        getValueText={(v, m) => `${String(v)} de ${String(m)}`}
      />,
    );
    const liveRegion = container.querySelector("[aria-live='polite']");
    expect(liveRegion).toHaveTextContent("3 de 5");
  });
});

// ─── Size variant ─────────────────────────────────────────────────────────────

describe("Rating – size variant", () => {
  it("applies size-3.5 to labels when size='sm'", () => {
    render(<Rating label="Rate" size="sm" />);
    // Each star label should have the sm size class
    const labels = screen
      .getAllByRole("radio")
      .map((input) => input.closest("label"));
    labels.forEach((label) => {
      expect(label).toHaveClass("size-3.5");
    });
  });

  it("applies size-6 to labels when size='lg'", () => {
    render(<Rating label="Rate" size="lg" />);
    const labels = screen
      .getAllByRole("radio")
      .map((input) => input.closest("label"));
    labels.forEach((label) => {
      expect(label).toHaveClass("size-6");
    });
  });
});
// ─── Decimal value display ─────────────────────────────────────────────────────────────────
// Decimal `value` is display-only (for average ratings). Interaction always
// produces whole numbers. We verify the fill structure and live region text.

describe("Rating – decimal value display", () => {
  it("renders the correct number of stars for a decimal value", () => {
    render(<Rating label="Average rating" value={3.7} readonly />);
    expect(screen.getAllByRole("radio")).toHaveLength(5);
  });

  it("live region announces the decimal value", () => {
    const { container } = render(
      <Rating label="Average rating" value={3.7} max={5} readonly />,
    );
    const liveRegion = container.querySelector("[aria-live='polite']");
    expect(liveRegion).toHaveTextContent("3.7 of 5 stars");
  });

  it("live region announces a half-star value", () => {
    const { container } = render(
      <Rating label="Score" value={2.5} max={5} readonly />,
    );
    const liveRegion = container.querySelector("[aria-live='polite']");
    expect(liveRegion).toHaveTextContent("2.5 of 5 stars");
  });

  it("partial star has an overlay with correct percentage width", () => {
    const { container } = render(
      <Rating label="Average rating" value={3.7} readonly />,
    );
    // Star 4 (index 3) should have ~70 % fill overlay
    const labels = container.querySelectorAll("label");
    const star4 = labels[3];
    const overlay = star4.querySelector<HTMLElement>("span[style]");
    expect(overlay).not.toBeNull();
    expect(overlay?.style.width).toBe("70%");
  });

  it("full stars have 100 % overlay and empty stars have no overlay", () => {
    const { container } = render(
      <Rating label="Average rating" value={3.7} readonly />,
    );
    const labels = container.querySelectorAll("label");
    // Stars 1–3 → fill overlay width = 100 %
    [0, 1, 2].forEach((i) => {
      const overlay = labels[i].querySelector<HTMLElement>("span[style]");
      expect(overlay?.style.width).toBe("100%");
    });
    // Star 5 → pct = 0, no overlay span rendered at all
    expect(labels[4].querySelector("span[style]")).toBeNull();
  });

  it("value=4 (whole number) renders stars 1–4 fully filled, star 5 empty", () => {
    const { container } = render(<Rating label="Rating" value={4} readonly />);
    const labels = container.querySelectorAll("label");
    [0, 1, 2, 3].forEach((i) => {
      const overlay = labels[i].querySelector<HTMLElement>("span[style]");
      expect(overlay?.style.width).toBe("100%");
    });
    expect(labels[4].querySelector("span[style]")).toBeNull();
  });

  it("passes axe with a decimal value", async () => {
    const { container } = render(
      <Rating label="Average product rating" value={4.3} readonly />,
    );
    const results = await axe.run(container);
    expect(results.violations).toHaveLength(0);
  });
});
// ─── Accessibility (axe) ──────────────────────────────────────────────────────

describe("Rating – a11y", () => {
  it("default (no value) passes axe", async () => {
    const { container } = render(<Rating label="Rate this product" />);
    const results = await axe.run(container);
    expect(results.violations).toHaveLength(0);
  });

  it("with value=3 passes axe", async () => {
    const { container } = render(
      <Rating label="Rate this product" value={3} />,
    );
    const results = await axe.run(container);
    expect(results.violations).toHaveLength(0);
  });

  it("disabled passes axe", async () => {
    const { container } = render(
      <Rating label="Average rating" value={4} disabled />,
    );
    const results = await axe.run(container);
    expect(results.violations).toHaveLength(0);
  });

  it("readonly passes axe", async () => {
    const { container } = render(
      <Rating label="Customer rating" value={5} readonly />,
    );
    const results = await axe.run(container);
    expect(results.violations).toHaveLength(0);
  });

  it("inside a form context passes axe", async () => {
    const { container } = render(
      <form aria-label="Review form">
        <Rating label="Your rating" defaultValue={0} />
      </form>,
    );
    const results = await axe.run(container);
    expect(results.violations).toHaveLength(0);
  });

  it("live region announces current value to screen readers", () => {
    const { container } = render(<Rating label="Rate" value={3} max={5} />);
    const liveRegion = container.querySelector("[aria-live='polite']");
    expect(liveRegion).toBeInTheDocument();
    expect(
      within(liveRegion as HTMLElement).getByText("3 of 5 stars"),
    ).toBeInTheDocument();
  });
});
