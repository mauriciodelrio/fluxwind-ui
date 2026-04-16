import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import axe from "axe-core";
import { Zap } from "lucide-react";
import { Alert } from "./Alert";

// ─── Structure ────────────────────────────────────────────────────────────────

describe("Alert – structure", () => {
  it("renders children", () => {
    render(<Alert intent="info">Something happened</Alert>);
    expect(screen.getByText("Something happened")).toBeInTheDocument();
  });

  it("renders the title when provided", () => {
    render(
      <Alert intent="success" title="Well done!">
        Your changes were saved.
      </Alert>,
    );
    expect(screen.getByText("Well done!")).toBeInTheDocument();
  });

  it("does not render a title element when title is omitted", () => {
    render(<Alert intent="info">Body only</Alert>);
    // The content wrapper should only have the body, no <p> for title
    expect(screen.queryByText("Body only")?.closest("p")).toBeNull();
  });

  it("renders without children (title-only)", () => {
    render(<Alert intent="warning" title="Heads up" />);
    expect(screen.getByText("Heads up")).toBeInTheDocument();
  });

  it("renders the dismiss button when onDismiss is provided", () => {
    render(
      <Alert intent="error" onDismiss={vi.fn()}>
        Oops
      </Alert>,
    );
    expect(screen.getByRole("button", { name: "Dismiss" })).toBeInTheDocument();
  });

  it("does not render dismiss button when onDismiss is omitted", () => {
    render(<Alert intent="info">No dismiss</Alert>);
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });

  it("uses a custom dismissLabel for the dismiss button", () => {
    render(
      <Alert intent="warning" onDismiss={vi.fn()} dismissLabel="Close alert">
        Watch out
      </Alert>,
    );
    expect(
      screen.getByRole("button", { name: "Close alert" }),
    ).toBeInTheDocument();
  });

  it("hides the icon when icon=null", () => {
    const { container } = render(
      <Alert intent="info" icon={null}>
        No icon
      </Alert>,
    );
    // No SVG besides the potential dismiss button (there is none here)
    expect(container.querySelectorAll("svg")).toHaveLength(0);
  });

  it("renders a custom Lucide icon override", () => {
    render(
      <Alert intent="info" icon={Zap}>
        Custom icon
      </Alert>,
    );
    // The custom SVG should be present
    const { container } = render(
      <Alert intent="info" icon={Zap}>
        x
      </Alert>,
    );
    expect(container.querySelector("svg")).toBeInTheDocument();
  });

  it("has displayName 'Alert'", () => {
    expect(Alert.displayName).toBe("Alert");
  });
});

// ─── ARIA roles ───────────────────────────────────────────────────────────────

describe("Alert – ARIA roles", () => {
  it("uses role='alert' for intent='error'", () => {
    render(<Alert intent="error">Error</Alert>);
    expect(screen.getByRole("alert")).toBeInTheDocument();
  });

  it("uses role='alert' for intent='warning'", () => {
    render(<Alert intent="warning">Warning</Alert>);
    expect(screen.getByRole("alert")).toBeInTheDocument();
  });

  it("uses role='status' for intent='info'", () => {
    render(<Alert intent="info">Info</Alert>);
    expect(screen.getByRole("status")).toBeInTheDocument();
  });

  it("uses role='status' for intent='success'", () => {
    render(<Alert intent="success">Success</Alert>);
    expect(screen.getByRole("status")).toBeInTheDocument();
  });

  it("dismiss button has type='button' to avoid accidental form submit", () => {
    render(
      <Alert intent="info" onDismiss={vi.fn()}>
        Info
      </Alert>,
    );
    const btn = screen.getByRole("button", { name: "Dismiss" });
    expect(btn).toHaveAttribute("type", "button");
  });
});

// ─── Interactions ─────────────────────────────────────────────────────────────

describe("Alert – interactions", () => {
  it("calls onDismiss when the dismiss button is clicked", async () => {
    const onDismiss = vi.fn();
    render(
      <Alert intent="error" onDismiss={onDismiss}>
        Delete failed
      </Alert>,
    );
    await userEvent.click(screen.getByRole("button", { name: "Dismiss" }));
    expect(onDismiss).toHaveBeenCalledTimes(1);
  });

  it("does not call onDismiss on body click", async () => {
    const onDismiss = vi.fn();
    render(
      <Alert intent="info" onDismiss={onDismiss}>
        Click me
      </Alert>,
    );
    await userEvent.click(screen.getByText("Click me"));
    expect(onDismiss).not.toHaveBeenCalled();
  });
});

// ─── Accessibility (axe) ──────────────────────────────────────────────────────

describe("Alert – a11y (axe)", () => {
  async function checkA11y(element: Element) {
    const results = await axe.run(element);
    expect(results.violations).toHaveLength(0);
  }

  it("info — no violations", async () => {
    const { container } = render(
      <Alert intent="info" title="Did you know?">
        You can customise your profile settings.
      </Alert>,
    );
    await checkA11y(container);
  });

  it("success — no violations", async () => {
    const { container } = render(
      <Alert intent="success" title="Saved">
        Your changes have been saved successfully.
      </Alert>,
    );
    await checkA11y(container);
  });

  it("warning — no violations", async () => {
    const { container } = render(
      <Alert intent="warning" title="Expiring soon">
        Your subscription expires in 3 days.
      </Alert>,
    );
    await checkA11y(container);
  });

  it("error — no violations", async () => {
    const { container } = render(
      <Alert intent="error" title="Upload failed">
        The file exceeds the 10 MB limit.
      </Alert>,
    );
    await checkA11y(container);
  });

  it("with dismiss button — no violations", async () => {
    const { container } = render(
      <Alert intent="info" onDismiss={vi.fn()}>
        This is a dismissible alert.
      </Alert>,
    );
    await checkA11y(container);
  });

  it("custom dismissLabel — no violations", async () => {
    const { container } = render(
      <Alert intent="warning" onDismiss={vi.fn()} dismissLabel="Close warning">
        Check your input.
      </Alert>,
    );
    await checkA11y(container);
  });

  it("icon=null — no violations", async () => {
    const { container } = render(
      <Alert intent="error" icon={null}>
        No icon alert.
      </Alert>,
    );
    await checkA11y(container);
  });
});
