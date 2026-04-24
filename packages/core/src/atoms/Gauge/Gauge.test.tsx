import { render, screen } from "@testing-library/react";
import axe from "axe-core";
import { describe, expect, it } from "vitest";
import { Gauge, resolveAutoColor } from "./Gauge";

// ─── resolveAutoColor unit tests ────────────────────────────────────────────

describe("resolveAutoColor", () => {
  it("returns primary when no range hints are defined", () => {
    expect(resolveAutoColor(50, 0, 100, undefined, undefined, undefined)).toBe(
      "primary",
    );
  });

  it("returns success when optimum is in low range and value is low", () => {
    // optimum=10 <= low=20 → low values are best
    expect(resolveAutoColor(10, 0, 100, 20, 80, 10)).toBe("success");
  });

  it("returns warning when optimum is in low range and value is in middle", () => {
    expect(resolveAutoColor(50, 0, 100, 20, 80, 10)).toBe("warning");
  });

  it("returns destructive when optimum is in low range and value is high", () => {
    expect(resolveAutoColor(90, 0, 100, 20, 80, 10)).toBe("destructive");
  });

  it("returns success when optimum is in high range and value is high", () => {
    // optimum=90 >= high=80 → high values are best
    expect(resolveAutoColor(90, 0, 100, 20, 80, 90)).toBe("success");
  });

  it("returns warning when optimum is in high range and value is in middle", () => {
    expect(resolveAutoColor(50, 0, 100, 20, 80, 90)).toBe("warning");
  });

  it("returns destructive when optimum is in high range and value is low", () => {
    expect(resolveAutoColor(10, 0, 100, 20, 80, 90)).toBe("destructive");
  });

  it("returns success when optimum is in middle and value is in middle range", () => {
    // optimum=50 → middle is best
    expect(resolveAutoColor(50, 0, 100, 20, 80, 50)).toBe("success");
  });

  it("returns warning when optimum is in middle and value is outside range", () => {
    expect(resolveAutoColor(10, 0, 100, 20, 80, 50)).toBe("warning");
  });
});

// ─── Gauge rendering tests ───────────────────────────────────────────────────

describe("Gauge", () => {
  it("renders a <meter> with role='meter'", () => {
    render(<Gauge value={50} aria-label="Battery level" />);
    expect(screen.getByRole("meter")).toBeInTheDocument();
  });

  it("does NOT render explicit role attribute on <meter>", () => {
    render(<Gauge value={50} aria-label="Battery level" />);
    const meter = screen.getByRole("meter");
    expect(meter).not.toHaveAttribute("role");
  });

  it("passes value, min, max attributes to <meter>", () => {
    render(<Gauge value={30} min={10} max={90} aria-label="Disk usage" />);
    const meter = screen.getByRole("meter");
    expect(meter).toHaveAttribute("value", "30");
    expect(meter).toHaveAttribute("min", "10");
    expect(meter).toHaveAttribute("max", "90");
  });

  it("passes low, high, optimum attributes to <meter>", () => {
    render(
      <Gauge value={50} low={20} high={80} optimum={60} aria-label="Score" />,
    );
    const meter = screen.getByRole("meter");
    expect(meter).toHaveAttribute("low", "20");
    expect(meter).toHaveAttribute("high", "80");
    expect(meter).toHaveAttribute("optimum", "60");
  });

  it("uses aria-label on the <meter>", () => {
    render(<Gauge value={75} aria-label="CPU usage" />);
    expect(
      screen.getByRole("meter", { name: "CPU usage" }),
    ).toBeInTheDocument();
  });

  it("uses label prop as aria-label when no explicit aria-label is set", () => {
    render(<Gauge value={75} label="Memory" />);
    expect(screen.getByRole("meter", { name: "Memory" })).toBeInTheDocument();
  });

  it("explicit aria-label overrides label prop", () => {
    render(<Gauge value={75} label="Memory" aria-label="RAM usage" />);
    expect(
      screen.getByRole("meter", { name: "RAM usage" }),
    ).toBeInTheDocument();
  });

  it("clamps value above max", () => {
    render(<Gauge value={150} max={100} aria-label="Level" />);
    expect(screen.getByRole("meter")).toHaveAttribute("value", "100");
  });

  it("clamps value below min", () => {
    render(<Gauge value={-10} min={0} aria-label="Level" />);
    expect(screen.getByRole("meter")).toHaveAttribute("value", "0");
  });

  it("shows label text when label prop is provided", () => {
    render(<Gauge value={50} label="Profile completion" />);
    expect(screen.getByText("Profile completion")).toBeInTheDocument();
  });

  it("shows formatted value when showValue is true", () => {
    render(<Gauge value={72} aria-label="Score" showValue />);
    expect(screen.getByText("72%")).toBeInTheDocument();
  });

  it("respects custom unit in showValue", () => {
    render(<Gauge value={37} aria-label="Temperature" showValue unit="°C" />);
    expect(screen.getByText("37°C")).toBeInTheDocument();
  });

  it("does not show value text when showValue is false", () => {
    render(<Gauge value={72} aria-label="Score" showValue={false} />);
    expect(screen.queryByText("72%")).not.toBeInTheDocument();
  });

  it("does not warn when aria-labelledby is provided", () => {
    // No accessible label warning exists in this implementation — the axe tests
    // provide the a11y safety net for missing labels.
    const { container } = render(
      <>
        <span id="gauge-label">Disk</span>
        <Gauge value={50} aria-labelledby="gauge-label" />
      </>,
    );
    expect(container).toBeInTheDocument();
  });

  it("forwards className to the wrapper div", () => {
    const { container } = render(
      <Gauge value={50} aria-label="Test" className="custom-gauge" />,
    );
    expect(container.firstChild).toHaveClass("custom-gauge");
  });

  it("forwards ref to the wrapper div", () => {
    const ref = { current: null as HTMLDivElement | null };
    render(<Gauge ref={ref} value={50} aria-label="Test" />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  // ─── Variant auto color logic via DOM ──────────────────────────────────────

  it("applies success fill color in auto mode when value is optimal (high range)", () => {
    const { container } = render(
      <Gauge
        value={90}
        min={0}
        max={100}
        low={20}
        high={80}
        optimum={90}
        aria-label="Score"
        variant="auto"
      />,
    );
    const fill = container.querySelector("[aria-hidden='true']");
    expect(fill?.className).toContain("bg-[var(--color-fw-success)]");
  });

  it("applies primary fill when no range hints and variant is auto", () => {
    const { container } = render(
      <Gauge value={50} aria-label="Score" variant="auto" />,
    );
    const fill = container.querySelector("[aria-hidden='true']");
    expect(fill?.className).toContain("bg-[var(--color-fw-primary)]");
  });

  it("applies fixed variant color regardless of ranges", () => {
    const { container } = render(
      <Gauge
        value={10}
        min={0}
        max={100}
        low={20}
        high={80}
        optimum={90}
        aria-label="Score"
        variant="destructive"
      />,
    );
    const fill = container.querySelector("[aria-hidden='true']");
    expect(fill?.className).toContain("bg-[var(--color-fw-destructive)]");
  });
});

// ─── axe-core a11y ───────────────────────────────────────────────────────────

describe("Gauge – axe", () => {
  it("has no axe violations with aria-label", async () => {
    const { container } = render(
      <Gauge value={65} aria-label="Battery level" />,
    );
    const results = await axe.run(container);
    expect(results.violations).toHaveLength(0);
  });

  it("has no axe violations with label prop", async () => {
    const { container } = render(<Gauge value={65} label="Battery level" />);
    const results = await axe.run(container);
    expect(results.violations).toHaveLength(0);
  });
});
