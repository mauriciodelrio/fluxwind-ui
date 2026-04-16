import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import axe from "axe-core";
import { CodeBlock } from "./CodeBlock";

// ─── Mock clipboard ───────────────────────────────────────────────────────────

const writeTextMock = vi.fn().mockResolvedValue(undefined);
Object.defineProperty(navigator, "clipboard", {
  value: { writeText: writeTextMock },
  writable: true,
  configurable: true,
});

// ─── Sample snippets ──────────────────────────────────────────────────────────

const SHORT_CODE = `const x = 1;`;
const MULTILINE_CODE = `function greet(name: string) {\n  return \`Hello, \${name}!\`;\n}`;

// ─── Structure ────────────────────────────────────────────────────────────────

describe("CodeBlock – structure", () => {
  it("renders without crashing", () => {
    render(<CodeBlock code={SHORT_CODE} />);
    expect(
      screen.getByRole("region", { name: "Code block" }),
    ).toBeInTheDocument();
  });

  it("renders the code content", () => {
    render(<CodeBlock code={SHORT_CODE} />);
    expect(
      screen.getByRole("region", { name: "Code block" }),
    ).toBeInTheDocument();
  });

  it("does not render header when filename is undefined and showCopyButton=false", () => {
    render(<CodeBlock code={SHORT_CODE} showCopyButton={false} />);
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });

  it("renders filename when provided", () => {
    render(<CodeBlock code={SHORT_CODE} filename="index.ts" />);
    expect(screen.getByText("index.ts")).toBeInTheDocument();
  });

  it("renders copy button by default", () => {
    render(<CodeBlock code={SHORT_CODE} />);
    expect(
      screen.getByRole("button", { name: "Copy code" }),
    ).toBeInTheDocument();
  });

  it("hides copy button when showCopyButton=false", () => {
    render(
      <CodeBlock code={SHORT_CODE} showCopyButton={false} filename="f.ts" />,
    );
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });

  it("forwards ref to root div", () => {
    const ref = { current: null };
    render(<CodeBlock ref={ref} code={SHORT_CODE} />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it("applies custom className to root", () => {
    const { container } = render(
      <CodeBlock code={SHORT_CODE} className="custom" />,
    );
    expect(container.firstChild).toHaveClass("custom");
  });
});

// ─── Line numbers ─────────────────────────────────────────────────────────────

describe("CodeBlock – line numbers", () => {
  it("does not render line numbers by default", () => {
    render(<CodeBlock code={MULTILINE_CODE} />);
    expect(screen.queryByText("1")).not.toBeInTheDocument();
  });

  it("renders line numbers when showLineNumbers=true", () => {
    render(<CodeBlock code={MULTILINE_CODE} showLineNumbers />);
    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();
    expect(screen.getByText("3")).toBeInTheDocument();
  });
});

// ─── Copy button ──────────────────────────────────────────────────────────────

describe("CodeBlock – copy button", () => {
  beforeEach(() => {
    writeTextMock.mockResolvedValue(undefined);
  });
  afterEach(() => {
    vi.clearAllMocks();
  });

  it("calls clipboard.writeText with the code on click", () => {
    render(<CodeBlock code={SHORT_CODE} />);
    fireEvent.click(screen.getByRole("button", { name: "Copy code" }));
    expect(writeTextMock).toHaveBeenCalledWith(SHORT_CODE);
  });

  it("shows 'Copied!' feedback after clicking", async () => {
    render(<CodeBlock code={SHORT_CODE} />);
    fireEvent.click(screen.getByRole("button", { name: "Copy code" }));
    await waitFor(() => {
      expect(
        screen.getByRole("button", { name: "Copied!" }),
      ).toBeInTheDocument();
    });
  });
});

// ─── Highlight lines ──────────────────────────────────────────────────────────

describe("CodeBlock – highlight lines", () => {
  it("applies highlight class to specified lines", () => {
    const { container } = render(
      <CodeBlock code={MULTILINE_CODE} showLineNumbers highlightLines={[2]} />,
    );
    // Line 2 should have the highlight background class
    const lines = container.querySelectorAll("pre > div");
    expect(lines[1]).toHaveClass("bg-[var(--color-fw-primary)]/10");
  });

  it("does not highlight lines not in the list", () => {
    const { container } = render(
      <CodeBlock code={MULTILINE_CODE} showLineNumbers highlightLines={[2]} />,
    );
    const lines = container.querySelectorAll("pre > div");
    expect(lines[0]).not.toHaveClass("bg-[var(--color-fw-primary)]/10");
  });
});

// ─── Accessibility ────────────────────────────────────────────────────────────

describe("CodeBlock – accessibility", () => {
  it("has no axe violations (default)", async () => {
    const { container } = render(<CodeBlock code={SHORT_CODE} />);
    const results = await axe.run(container);
    expect(results.violations).toHaveLength(0);
  });

  it("has no axe violations with filename and line numbers", async () => {
    const { container } = render(
      <CodeBlock code={MULTILINE_CODE} filename="greet.ts" showLineNumbers />,
    );
    const results = await axe.run(container);
    expect(results.violations).toHaveLength(0);
  });

  it("scroll region is focusable", () => {
    render(<CodeBlock code={SHORT_CODE} />);
    const region = screen.getByRole("region", { name: "Code block" });
    expect(region).toHaveAttribute("tabindex", "0");
  });

  it("uses filename in aria-label when provided", () => {
    render(<CodeBlock code={SHORT_CODE} filename="app.ts" />);
    expect(
      screen.getByRole("region", { name: "Code: app.ts" }),
    ).toBeInTheDocument();
  });
});
