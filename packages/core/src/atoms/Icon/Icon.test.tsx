import { describe, it, expect, vi, afterEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { Star } from "lucide-react";
import { siGithub } from "simple-icons";
import axe from "axe-core";
import { Icon } from "./Icon";

// Mock Tabler icon — avoids importing @tabler/icons-react in tests
// (Vite 8 injects a stub for optional peer deps that would throw at runtime)
const MockTablerIcon = ({
  className,
  strokeWidth,
  "aria-hidden": ariaHidden,
  "aria-label": ariaLabel,
  role,
}: {
  className?: string;
  strokeWidth?: number;
  "aria-hidden"?: boolean;
  "aria-label"?: string;
  role?: string;
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    className={className}
    aria-hidden={ariaHidden}
    aria-label={ariaLabel}
    role={role}
  >
    <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
  </svg>
);

const StarPath = () => (
  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
);

// ─── Mode 3: Custom children (backward compat) ────────────────────────────────

describe("Icon — custom children mode", () => {
  it("renders an svg element", () => {
    const { container } = render(
      <Icon>
        <StarPath />
      </Icon>,
    );
    expect(container.querySelector("svg")).toBeInTheDocument();
  });

  it("is aria-hidden when no label is provided (decorative)", () => {
    const { container } = render(
      <Icon>
        <StarPath />
      </Icon>,
    );
    expect(container.querySelector("svg")).toHaveAttribute(
      "aria-hidden",
      "true",
    );
  });

  it('has role="img" and aria-label when label is provided', () => {
    render(
      <Icon label="Star">
        <StarPath />
      </Icon>,
    );
    const svg = screen.getByRole("img", { name: "Star" });
    expect(svg).toBeInTheDocument();
    expect(svg).toHaveAttribute("aria-label", "Star");
  });

  it('uses the default viewBox "0 0 24 24"', () => {
    const { container } = render(
      <Icon>
        <StarPath />
      </Icon>,
    );
    expect(container.querySelector("svg")).toHaveAttribute(
      "viewBox",
      "0 0 24 24",
    );
  });

  it("accepts a custom viewBox", () => {
    const { container } = render(
      <Icon viewBox="0 0 16 16">
        <StarPath />
      </Icon>,
    );
    expect(container.querySelector("svg")).toHaveAttribute(
      "viewBox",
      "0 0 16 16",
    );
  });

  it("applies custom className", () => {
    const { container } = render(
      <Icon className="text-red-500">
        <StarPath />
      </Icon>,
    );
    expect(container.querySelector("svg")).toHaveClass("text-red-500");
  });

  it("has no WCAG violations — decorative", async () => {
    const { container } = render(
      <Icon>
        <StarPath />
      </Icon>,
    );
    const results = await axe.run(container);
    expect(results.violations).toHaveLength(0);
  });

  it("has no WCAG violations — with label", async () => {
    const { container } = render(
      <Icon label="Star icon">
        <StarPath />
      </Icon>,
    );
    const results = await axe.run(container);
    expect(results.violations).toHaveLength(0);
  });
});

// ─── Mode 1: Lucide icon ──────────────────────────────────────────────────────

describe("Icon — Lucide mode", () => {
  it("renders an svg element", () => {
    const { container } = render(<Icon icon={Star} />);
    expect(container.querySelector("svg")).toBeInTheDocument();
  });

  it("is aria-hidden when no label is provided (decorative)", () => {
    const { container } = render(<Icon icon={Star} />);
    expect(container.querySelector("svg")).toHaveAttribute(
      "aria-hidden",
      "true",
    );
  });

  it('has role="img" and aria-label when label is provided', () => {
    render(<Icon icon={Star} label="Favourite" />);
    expect(screen.getByRole("img", { name: "Favourite" })).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(
      <Icon icon={Star} className="text-yellow-500" />,
    );
    expect(container.querySelector("svg")).toHaveClass("text-yellow-500");
  });

  it("has no WCAG violations — decorative", async () => {
    const { container } = render(<Icon icon={Star} />);
    const results = await axe.run(container);
    expect(results.violations).toHaveLength(0);
  });

  it("has no WCAG violations — with label", async () => {
    const { container } = render(<Icon icon={Star} label="Star icon" />);
    const results = await axe.run(container);
    expect(results.violations).toHaveLength(0);
  });
});

// ─── Mode 2: Simple Icons brand ───────────────────────────────────────────────

describe("Icon — Simple Icons mode", () => {
  it("renders an svg element", () => {
    const { container } = render(<Icon simpleIcon={siGithub} label="GitHub" />);
    expect(container.querySelector("svg")).toBeInTheDocument();
  });

  it("renders the brand icon path", () => {
    const { container } = render(<Icon simpleIcon={siGithub} label="GitHub" />);
    const path = container.querySelector("path");
    expect(path).toHaveAttribute("d", siGithub.path);
  });

  it("uses viewBox 0 0 24 24", () => {
    const { container } = render(<Icon simpleIcon={siGithub} label="GitHub" />);
    expect(container.querySelector("svg")).toHaveAttribute(
      "viewBox",
      "0 0 24 24",
    );
  });

  it("is aria-hidden when no label is provided (decorative)", () => {
    const { container } = render(<Icon simpleIcon={siGithub} />);
    expect(container.querySelector("svg")).toHaveAttribute(
      "aria-hidden",
      "true",
    );
  });

  it('has role="img" and aria-label when label is provided', () => {
    render(<Icon simpleIcon={siGithub} label="GitHub" />);
    expect(screen.getByRole("img", { name: "GitHub" })).toBeInTheDocument();
  });

  it("has no WCAG violations — with label", async () => {
    const { container } = render(<Icon simpleIcon={siGithub} label="GitHub" />);
    const results = await axe.run(container);
    expect(results.violations).toHaveLength(0);
  });
});

// ─── Mode 4: Tabler icon ──────────────────────────────────────────────────────

describe("Icon — Tabler mode", () => {
  afterEach(() => vi.restoreAllMocks());

  it("renders an svg element", () => {
    const { container } = render(
      <Icon icon={MockTablerIcon} library="tabler" />,
    );
    expect(container.querySelector("svg")).toBeInTheDocument();
  });

  it("is aria-hidden when no label is provided (decorative)", () => {
    const { container } = render(
      <Icon icon={MockTablerIcon} library="tabler" />,
    );
    expect(container.querySelector("svg")).toHaveAttribute(
      "aria-hidden",
      "true",
    );
  });

  it('has role="img" and aria-label when label is provided', () => {
    render(<Icon icon={MockTablerIcon} library="tabler" label="Location" />);
    expect(screen.getByRole("img", { name: "Location" })).toBeInTheDocument();
  });

  it("applies the correct size class", () => {
    const { container } = render(
      <Icon icon={MockTablerIcon} library="tabler" size="lg" label="icon" />,
    );
    const svg = container.querySelector("svg");
    expect(svg?.getAttribute("class")).toMatch(/size-/);
  });

  it("applies custom className", () => {
    const { container } = render(
      <Icon icon={MockTablerIcon} library="tabler" className="text-blue-500" />,
    );
    expect(container.querySelector("svg")).toHaveClass("text-blue-500");
  });

  it("passes strokeWidth prop to the Tabler component", () => {
    const { container } = render(
      <Icon
        icon={MockTablerIcon}
        library="tabler"
        strokeWidth={1.5}
        label="icon"
      />,
    );
    const svg = container.querySelector("svg");
    expect(svg).toHaveAttribute("stroke-width", "1.5");
  });

  it("renders null and logs error in dev when icon prop is missing", () => {
    const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    const { container } = render(<Icon library="tabler" />);
    expect(container.firstChild).toBeNull();
    expect(consoleSpy).toHaveBeenCalledWith(
      expect.stringContaining("library='tabler' requires @tabler/icons-react"),
    );
  });

  it("has no WCAG violations — decorative", async () => {
    const { container } = render(
      <Icon icon={MockTablerIcon} library="tabler" />,
    );
    const results = await axe.run(container);
    expect(results.violations).toHaveLength(0);
  });

  it("has no WCAG violations — with label", async () => {
    const { container } = render(
      <Icon icon={MockTablerIcon} library="tabler" label="Location pin" />,
    );
    const results = await axe.run(container);
    expect(results.violations).toHaveLength(0);
  });
});

// ─── Backward compatibility ───────────────────────────────────────────────────

describe("Icon — backward compatibility", () => {
  it("existing Lucide usage without library prop still renders correctly", () => {
    const { container } = render(<Icon icon={Star} />);
    expect(container.querySelector("svg")).toBeInTheDocument();
  });

  it("strokeWidth prop works on Lucide icons", () => {
    const { container } = render(
      <Icon icon={Star} strokeWidth={1} label="star" />,
    );
    expect(container.querySelector("svg")).toBeInTheDocument();
  });
});
