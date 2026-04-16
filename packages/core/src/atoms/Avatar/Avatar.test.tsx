import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import axe from "axe-core";
import { Avatar } from "./Avatar";

describe("Avatar", () => {
  it("renders image when src is provided", () => {
    render(<Avatar src="https://example.com/avatar.jpg" alt="Jane Doe" />);
    const img = screen.getByRole("img", { name: "Jane Doe" });
    expect(img).toBeInTheDocument();
    expect(img.tagName).toBe("IMG");
  });

  it("renders initials when no src is provided", () => {
    render(<Avatar initials="JD" alt="Jane Doe" />);
    expect(screen.getByText("JD")).toBeInTheDocument();
  });

  it("truncates initials to 2 characters", () => {
    render(<Avatar initials="ABC" />);
    expect(screen.getByText("AB")).toBeInTheDocument();
  });

  it("uppercases initials", () => {
    render(<Avatar initials="jd" />);
    expect(screen.getByText("JD")).toBeInTheDocument();
  });

  it("falls back to initials when image fails to load", () => {
    render(<Avatar src="broken.jpg" alt="Jane Doe" initials="JD" />);
    const img = screen.getByRole("img", { name: "Jane Doe" });
    fireEvent.error(img);
    expect(screen.getByText("JD")).toBeInTheDocument();
  });

  it("falls back to silhouette svg when no src or initials", () => {
    const { container } = render(<Avatar alt="Unknown user" />);
    const svg = container.querySelector('svg[aria-hidden="true"]');
    expect(svg).toBeInTheDocument();
  });

  it('has role="img" with aria-label when showing initials', () => {
    render(<Avatar initials="JD" alt="Jane Doe" />);
    expect(screen.getByRole("img", { name: "Jane Doe" })).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(<Avatar className="custom-class" />);
    expect(container.firstChild).toHaveClass("custom-class");
  });

  it("forwards additional html attributes", () => {
    render(<Avatar data-testid="avatar-el" />);
    expect(screen.getByTestId("avatar-el")).toBeInTheDocument();
  });

  it("has no WCAG violations with initials", async () => {
    const { container } = render(<Avatar initials="JD" alt="Jane Doe" />);
    const results = await axe.run(container);
    expect(results.violations).toHaveLength(0);
  });

  it("has no WCAG violations with silhouette fallback", async () => {
    const { container } = render(<Avatar alt="Unknown user" />);
    const results = await axe.run(container);
    expect(results.violations).toHaveLength(0);
  });
});
