import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import axe from "axe-core";
import { Progress } from "./Progress";

describe("Progress", () => {
  // ─── Role & ARIA ────────────────────────────────────────────────────────────

  it("renders with role progressbar", () => {
    render(<Progress label="Upload progress" value={50} />);
    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });

  it("sets aria-label from label prop", () => {
    render(<Progress label="Upload progress" value={50} />);
    expect(screen.getByRole("progressbar")).toHaveAttribute(
      "aria-label",
      "Upload progress",
    );
  });

  it("sets aria-valuemin and aria-valuemax", () => {
    render(<Progress label="Upload" value={50} />);
    const bar = screen.getByRole("progressbar");
    expect(bar).toHaveAttribute("aria-valuemin", "0");
    expect(bar).toHaveAttribute("aria-valuemax", "100");
  });

  it("sets aria-valuenow when value is provided", () => {
    render(<Progress label="Upload" value={75} />);
    expect(screen.getByRole("progressbar")).toHaveAttribute(
      "aria-valuenow",
      "75",
    );
  });

  it("does not set aria-valuenow when indeterminate", () => {
    render(<Progress label="Loading" />);
    expect(screen.getByRole("progressbar")).not.toHaveAttribute(
      "aria-valuenow",
    );
  });

  // ─── Value clamping ─────────────────────────────────────────────────────────

  it("clamps value above 100 to 100", () => {
    render(<Progress label="Upload" value={150} />);
    expect(screen.getByRole("progressbar")).toHaveAttribute(
      "aria-valuenow",
      "100",
    );
  });

  it("clamps value below 0 to 0", () => {
    render(<Progress label="Upload" value={-10} />);
    expect(screen.getByRole("progressbar")).toHaveAttribute(
      "aria-valuenow",
      "0",
    );
  });

  // ─── Label & value display ──────────────────────────────────────────────────

  it("renders visible label text when showLabel is true", () => {
    render(<Progress label="Uploading files" value={40} showLabel />);
    expect(screen.getByText("Uploading files")).toBeInTheDocument();
  });

  it("does not render visible label by default", () => {
    render(<Progress label="Uploading files" value={40} />);
    // aria-label is set but text is not rendered visibly
    expect(screen.queryByText("Uploading files")).not.toBeInTheDocument();
  });

  it("renders percentage text when showValue is true and value is provided", () => {
    render(<Progress label="Upload" value={60} showValue />);
    expect(screen.getByText("60%")).toBeInTheDocument();
  });

  it("does not render percentage text when indeterminate even with showValue", () => {
    render(<Progress label="Loading" showValue />);
    expect(screen.queryByText(/%/)).not.toBeInTheDocument();
  });

  // ─── DOM output ─────────────────────────────────────────────────────────────

  it("applies custom className to the outer wrapper", () => {
    const { container } = render(
      <Progress label="Upload" value={50} className="my-custom" />,
    );
    expect(container.firstChild).toHaveClass("my-custom");
  });

  it("forwards additional html attributes to the outer wrapper", () => {
    render(<Progress label="Upload" value={50} data-testid="prog" />);
    expect(screen.getByTestId("prog")).toBeInTheDocument();
  });

  // ─── Accessibility ──────────────────────────────────────────────────────────

  it("has no WCAG violations — determined", async () => {
    const { container } = render(
      <Progress label="Upload progress" value={45} />,
    );
    const results = await axe.run(container);
    expect(results.violations).toHaveLength(0);
  });

  it("has no WCAG violations — with visible label and value", async () => {
    const { container } = render(
      <Progress label="Uploading files" value={70} showLabel showValue />,
    );
    const results = await axe.run(container);
    expect(results.violations).toHaveLength(0);
  });

  it("has no WCAG violations — indeterminate", async () => {
    const { container } = render(<Progress label="Loading, please wait" />);
    const results = await axe.run(container);
    expect(results.violations).toHaveLength(0);
  });
});
