import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import axe from "axe-core";
import { StatusDot } from "./StatusDot";

// ─── Structure ────────────────────────────────────────────────────────────────

describe("StatusDot – structure", () => {
  it("renders a <span> element", () => {
    render(<StatusDot status="online" />);
    const dot = screen.getByRole("status");
    expect(dot.tagName).toBe("SPAN");
  });

  it("has role='status'", () => {
    render(<StatusDot status="online" />);
    expect(screen.getByRole("status")).toBeInTheDocument();
  });

  it("has default aria-label based on status prop", () => {
    render(<StatusDot status="away" />);
    expect(screen.getByRole("status")).toHaveAttribute("aria-label", "Away");
  });

  it("uses custom label when provided", () => {
    render(<StatusDot status="online" label="Alice is online" />);
    expect(screen.getByRole("status")).toHaveAttribute(
      "aria-label",
      "Alice is online",
    );
  });

  it("defaults to 'offline' aria-label when no status provided", () => {
    render(<StatusDot />);
    expect(screen.getByRole("status")).toHaveAttribute("aria-label", "Offline");
  });

  it("forwards className", () => {
    render(<StatusDot status="online" className="custom-class" />);
    expect(screen.getByRole("status")).toHaveClass("custom-class");
  });

  it("forwards arbitrary HTML attributes", () => {
    render(<StatusDot status="busy" data-testid="my-dot" />);
    expect(screen.getByTestId("my-dot")).toBeInTheDocument();
  });
});

// ─── Status classes ───────────────────────────────────────────────────────────

describe("StatusDot – status classes", () => {
  const cases: [
    NonNullable<Parameters<typeof StatusDot>[0]["status"]>,
    string,
  ][] = [
    ["online", "bg-[var(--color-fw-success)]"],
    ["away", "bg-[var(--color-fw-warning)]"],
    ["busy", "bg-[var(--color-fw-destructive)]"],
    ["offline", "bg-[var(--color-fw-muted)]"],
    ["info", "bg-[var(--color-fw-info)]"],
  ];

  it.each(cases)("status='%s' applies class '%s'", (status, expected) => {
    render(<StatusDot status={status} />);
    expect(screen.getByRole("status")).toHaveClass(expected);
  });

  it("aria-label for 'online' is 'Online'", () => {
    render(<StatusDot status="online" />);
    expect(screen.getByRole("status")).toHaveAttribute("aria-label", "Online");
  });

  it("aria-label for 'busy' is 'Busy'", () => {
    render(<StatusDot status="busy" />);
    expect(screen.getByRole("status")).toHaveAttribute("aria-label", "Busy");
  });

  it("aria-label for 'info' is 'Info'", () => {
    render(<StatusDot status="info" />);
    expect(screen.getByRole("status")).toHaveAttribute("aria-label", "Info");
  });

  it("aria-label for 'offline' is 'Offline'", () => {
    render(<StatusDot status="offline" />);
    expect(screen.getByRole("status")).toHaveAttribute("aria-label", "Offline");
  });
});

// ─── Size classes ─────────────────────────────────────────────────────────────

describe("StatusDot – size classes", () => {
  it("size='xs' applies size-1.5", () => {
    render(<StatusDot size="xs" />);
    expect(screen.getByRole("status")).toHaveClass("size-1.5");
  });

  it("size='sm' applies size-2 (default)", () => {
    render(<StatusDot size="sm" />);
    expect(screen.getByRole("status")).toHaveClass("size-2");
  });

  it("size='md' applies size-2.5", () => {
    render(<StatusDot size="md" />);
    expect(screen.getByRole("status")).toHaveClass("size-2.5");
  });

  it("size='lg' applies size-3", () => {
    render(<StatusDot size="lg" />);
    expect(screen.getByRole("status")).toHaveClass("size-3");
  });
});

// ─── Pulse ────────────────────────────────────────────────────────────────────

describe("StatusDot – pulse", () => {
  it("pulse=true adds animate-pulse class", () => {
    render(<StatusDot status="online" pulse />);
    expect(screen.getByRole("status")).toHaveClass("motion-safe:animate-pulse");
  });

  it("pulse=false (default) does not add animate-pulse", () => {
    render(<StatusDot status="online" />);
    expect(screen.getByRole("status")).not.toHaveClass(
      "motion-safe:animate-pulse",
    );
  });
});

// ─── DisplayName ──────────────────────────────────────────────────────────────

describe("StatusDot – displayName", () => {
  it("has displayName 'StatusDot'", () => {
    expect(StatusDot.displayName).toBe("StatusDot");
  });
});

// ─── Accessibility ────────────────────────────────────────────────────────────

describe("StatusDot – a11y", () => {
  it("online dot has no WCAG violations", async () => {
    const { container } = render(<StatusDot status="online" />);
    const results = await axe.run(container);
    expect(results.violations).toHaveLength(0);
  });

  it("away dot has no WCAG violations", async () => {
    const { container } = render(<StatusDot status="away" />);
    const results = await axe.run(container);
    expect(results.violations).toHaveLength(0);
  });

  it("offline dot with custom label has no WCAG violations", async () => {
    const { container } = render(
      <StatusDot status="offline" label="User offline" />,
    );
    const results = await axe.run(container);
    expect(results.violations).toHaveLength(0);
  });

  it("pulsing online dot has no WCAG violations", async () => {
    const { container } = render(<StatusDot status="online" pulse />);
    const results = await axe.run(container);
    expect(results.violations).toHaveLength(0);
  });
});
