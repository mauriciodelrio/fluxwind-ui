import { act, fireEvent, render, screen } from "@testing-library/react";
import axe from "axe-core";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { Carousel } from "./Carousel";

// ─── Helpers ──────────────────────────────────────────────────────────────────

const SLIDES = ["Slide A", "Slide B", "Slide C"];
const COUNT = SLIDES.length;

interface RenderCarouselOptions {
  loop?: boolean;
  autoplay?: number;
  defaultIndex?: number;
  disableAnimation?: boolean;
  onChangeMock?: ReturnType<typeof vi.fn>;
}

function renderCarousel({
  loop = false,
  autoplay = 0,
  defaultIndex = 0,
  disableAnimation = true,
  onChangeMock,
}: RenderCarouselOptions = {}) {
  return render(
    <Carousel.Root
      count={COUNT}
      label="Test carousel"
      loop={loop}
      autoplay={autoplay}
      defaultIndex={defaultIndex}
      onChange={onChangeMock}
      disableAnimation={disableAnimation}
    >
      <Carousel.Track>
        {SLIDES.map((s, i) => (
          <Carousel.Item
            key={s}
            index={i}
            slideLabel={`Slide ${String(i + 1)} of ${String(COUNT)}`}
          >
            {s}
          </Carousel.Item>
        ))}
      </Carousel.Track>
      <Carousel.Prev />
      <Carousel.Next />
      <Carousel.Dots />
    </Carousel.Root>,
  );
}

// ─── Rendering ────────────────────────────────────────────────────────────────

describe("Carousel — rendering", () => {
  it("renders the region with the provided label", () => {
    renderCarousel();
    expect(
      screen.getByRole("region", { name: "Test carousel" }),
    ).toBeInTheDocument();
  });

  it("renders all slide groups", () => {
    renderCarousel();
    // hidden:true needed because aria-hidden slides are excluded from the accessible tree
    const slides = screen.getAllByRole("group", { hidden: true });
    expect(slides).toHaveLength(COUNT);
  });

  it("first slide is visible (aria-hidden false)", () => {
    renderCarousel();
    const first = screen.getByRole("group", {
      name: "Slide 1 of 3",
      hidden: true,
    });
    expect(first).not.toHaveAttribute("aria-hidden", "true");
  });

  it("non-active slides are aria-hidden", () => {
    renderCarousel();
    const slides = screen.getAllByRole("group", { hidden: true });
    expect(slides[1]).toHaveAttribute("aria-hidden", "true");
    expect(slides[2]).toHaveAttribute("aria-hidden", "true");
  });

  it("renders prev/next buttons with default labels", () => {
    renderCarousel();
    expect(
      screen.getByRole("button", { name: "Previous slide" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Next slide" }),
    ).toBeInTheDocument();
  });

  it("renders dots with aria-label for each slide", () => {
    renderCarousel();
    expect(
      screen.getByRole("tab", { name: "Go to slide 1" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("tab", { name: "Go to slide 2" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("tab", { name: "Go to slide 3" }),
    ).toBeInTheDocument();
  });

  it("first dot has aria-selected true", () => {
    renderCarousel();
    const firstDot = screen.getByRole("tab", { name: "Go to slide 1" });
    expect(firstDot).toHaveAttribute("aria-selected", "true");
    expect(firstDot).toHaveAttribute("aria-current", "true");
  });

  it("non-active dots have aria-selected false and no aria-current", () => {
    renderCarousel();
    const secondDot = screen.getByRole("tab", { name: "Go to slide 2" });
    expect(secondDot).toHaveAttribute("aria-selected", "false");
    expect(secondDot).not.toHaveAttribute("aria-current");
  });

  it("prev button is disabled on first slide without loop", () => {
    renderCarousel({ loop: false });
    expect(
      screen.getByRole("button", { name: "Previous slide" }),
    ).toBeDisabled();
  });

  it("next button is disabled on last slide without loop", () => {
    renderCarousel({ defaultIndex: COUNT - 1, loop: false });
    expect(screen.getByRole("button", { name: "Next slide" })).toBeDisabled();
  });

  it("both nav buttons are enabled when loop is true", () => {
    renderCarousel({ loop: true });
    expect(
      screen.getByRole("button", { name: "Previous slide" }),
    ).not.toBeDisabled();
    expect(
      screen.getByRole("button", { name: "Next slide" }),
    ).not.toBeDisabled();
  });

  it("renders track with aria-live polite", () => {
    renderCarousel();
    const live = document.querySelector("[aria-live='polite']");
    expect(live).toBeInTheDocument();
  });
});

// ─── Navigation (manual) ─────────────────────────────────────────────────────

describe("Carousel — manual navigation", () => {
  it("next button advances to slide 2", () => {
    renderCarousel();
    fireEvent.click(screen.getByRole("button", { name: "Next slide" }));
    const slides = screen.getAllByRole("group", { hidden: true });
    expect(slides[1]).not.toHaveAttribute("aria-hidden", "true");
    expect(slides[0]).toHaveAttribute("aria-hidden", "true");
  });

  it("prev button goes back after advancing", () => {
    renderCarousel();
    fireEvent.click(screen.getByRole("button", { name: "Next slide" }));
    fireEvent.click(screen.getByRole("button", { name: "Previous slide" }));
    expect(
      screen.getByRole("group", { name: "Slide 1 of 3", hidden: true }),
    ).not.toHaveAttribute("aria-hidden", "true");
  });

  it("dot navigation jumps to the correct slide", () => {
    renderCarousel();
    fireEvent.click(screen.getByRole("tab", { name: "Go to slide 3" }));
    expect(
      screen.getByRole("group", { name: "Slide 3 of 3", hidden: true }),
    ).not.toHaveAttribute("aria-hidden", "true");
  });

  it("dot for active slide gains aria-current", () => {
    renderCarousel();
    fireEvent.click(screen.getByRole("tab", { name: "Go to slide 2" }));
    expect(screen.getByRole("tab", { name: "Go to slide 2" })).toHaveAttribute(
      "aria-current",
      "true",
    );
    expect(
      screen.getByRole("tab", { name: "Go to slide 1" }),
    ).not.toHaveAttribute("aria-current");
  });

  it("does not advance past last slide without loop", () => {
    renderCarousel({ defaultIndex: COUNT - 1 });
    fireEvent.click(screen.getByRole("button", { name: "Next slide" }));
    expect(
      screen.getByRole("group", { name: "Slide 3 of 3", hidden: true }),
    ).not.toHaveAttribute("aria-hidden", "true");
  });

  it("does not go back before first slide without loop", () => {
    renderCarousel();
    fireEvent.click(screen.getByRole("button", { name: "Previous slide" }));
    expect(
      screen.getByRole("group", { name: "Slide 1 of 3", hidden: true }),
    ).not.toHaveAttribute("aria-hidden", "true");
  });

  it("wraps to first slide when loop is enabled and on last slide", () => {
    renderCarousel({ defaultIndex: COUNT - 1, loop: true });
    fireEvent.click(screen.getByRole("button", { name: "Next slide" }));
    expect(
      screen.getByRole("group", { name: "Slide 1 of 3", hidden: true }),
    ).not.toHaveAttribute("aria-hidden", "true");
  });

  it("wraps to last slide when loop is enabled and on first slide", () => {
    renderCarousel({ loop: true });
    fireEvent.click(screen.getByRole("button", { name: "Previous slide" }));
    expect(
      screen.getByRole("group", { name: "Slide 3 of 3", hidden: true }),
    ).not.toHaveAttribute("aria-hidden", "true");
  });

  it("fires onChange when advancing", () => {
    const onChangeMock = vi.fn();
    renderCarousel({ onChangeMock });
    fireEvent.click(screen.getByRole("button", { name: "Next slide" }));
    expect(onChangeMock).toHaveBeenCalledWith(1);
  });

  it("fires onChange when using dot navigation", () => {
    const onChangeMock = vi.fn();
    renderCarousel({ onChangeMock });
    fireEvent.click(screen.getByRole("tab", { name: "Go to slide 3" }));
    expect(onChangeMock).toHaveBeenCalledWith(2);
  });
});

// ─── Keyboard navigation ──────────────────────────────────────────────────────

describe("Carousel — keyboard navigation", () => {
  it("ArrowRight on root advances slide", () => {
    renderCarousel();
    const region = screen.getByRole("region", { name: "Test carousel" });
    fireEvent.keyDown(region, { key: "ArrowRight" });
    expect(
      screen.getByRole("group", { name: "Slide 2 of 3", hidden: true }),
    ).not.toHaveAttribute("aria-hidden", "true");
  });

  it("ArrowLeft on root goes back", () => {
    renderCarousel({ defaultIndex: 1 });
    const region = screen.getByRole("region", { name: "Test carousel" });
    fireEvent.keyDown(region, { key: "ArrowLeft" });
    expect(
      screen.getByRole("group", { name: "Slide 1 of 3", hidden: true }),
    ).not.toHaveAttribute("aria-hidden", "true");
  });

  it("unhandled key does not change slide", () => {
    renderCarousel();
    const region = screen.getByRole("region", { name: "Test carousel" });
    fireEvent.keyDown(region, { key: "Enter" });
    expect(
      screen.getByRole("group", { name: "Slide 1 of 3", hidden: true }),
    ).not.toHaveAttribute("aria-hidden", "true");
  });
});

// ─── Controlled mode ──────────────────────────────────────────────────────────

describe("Carousel — controlled mode", () => {
  it("renders at the controlled index", () => {
    render(
      <Carousel.Root
        count={COUNT}
        label="Controlled"
        index={1}
        disableAnimation
      >
        <Carousel.Track>
          {SLIDES.map((s, i) => (
            <Carousel.Item
              key={s}
              index={i}
              slideLabel={`Slide ${String(i + 1)} of ${String(COUNT)}`}
            >
              {s}
            </Carousel.Item>
          ))}
        </Carousel.Track>
        <Carousel.Prev />
        <Carousel.Next />
      </Carousel.Root>,
    );
    expect(
      screen.getByRole("group", { name: "Slide 2 of 3", hidden: true }),
    ).not.toHaveAttribute("aria-hidden", "true");
  });
});

// ─── defaultIndex ─────────────────────────────────────────────────────────────

describe("Carousel — defaultIndex", () => {
  it("renders starting at the given defaultIndex", () => {
    renderCarousel({ defaultIndex: 2 });
    expect(
      screen.getByRole("group", { name: "Slide 3 of 3", hidden: true }),
    ).not.toHaveAttribute("aria-hidden", "true");
  });
});

// ─── Autoplay ────────────────────────────────────────────────────────────────

describe("Carousel — autoplay", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("auto-advances slides after the interval", () => {
    renderCarousel({ autoplay: 300, disableAnimation: true });
    act(() => {
      vi.advanceTimersByTime(300);
    });
    const slides = screen.getAllByRole("group", { hidden: true });
    expect(slides[1]).not.toHaveAttribute("aria-hidden", "true");
  });

  it("pauses on mouse enter and resumes on mouse leave", () => {
    renderCarousel({ autoplay: 300, disableAnimation: true });
    const region = screen.getByRole("region", { name: "Test carousel" });

    // Pause on enter
    act(() => {
      fireEvent.mouseEnter(region);
    });
    act(() => {
      vi.advanceTimersByTime(600);
    });
    // Should still be on slide 1 (paused)
    expect(
      screen.getAllByRole("group", { hidden: true })[0],
    ).not.toHaveAttribute("aria-hidden", "true");

    // Resume on leave
    act(() => {
      fireEvent.mouseLeave(region);
    });
    act(() => {
      vi.advanceTimersByTime(300);
    });
    expect(
      screen.getAllByRole("group", { hidden: true })[1],
    ).not.toHaveAttribute("aria-hidden", "true");
  });

  it("pauses on focus and resumes on blur", () => {
    renderCarousel({ autoplay: 300, disableAnimation: true });
    const region = screen.getByRole("region", { name: "Test carousel" });

    act(() => {
      fireEvent.focus(region);
    });
    act(() => {
      vi.advanceTimersByTime(600);
    });
    expect(
      screen.getAllByRole("group", { hidden: true })[0],
    ).not.toHaveAttribute("aria-hidden", "true");

    act(() => {
      fireEvent.blur(region);
    });
    act(() => {
      vi.advanceTimersByTime(300);
    });
    expect(
      screen.getAllByRole("group", { hidden: true })[1],
    ).not.toHaveAttribute("aria-hidden", "true");
  });
});

// ─── Custom labels ───────────────────────────────────────────────────────────

describe("Carousel — custom labels", () => {
  it("prev/next buttons accept custom labels", () => {
    render(
      <Carousel.Root count={COUNT} label="Custom" disableAnimation>
        <Carousel.Track>
          {SLIDES.map((s, i) => (
            <Carousel.Item
              key={s}
              index={i}
              slideLabel={`Slide ${String(i + 1)} of ${String(COUNT)}`}
            >
              {s}
            </Carousel.Item>
          ))}
        </Carousel.Track>
        <Carousel.Prev label="Anterior" />
        <Carousel.Next label="Siguiente" />
      </Carousel.Root>,
    );
    expect(
      screen.getByRole("button", { name: "Anterior" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Siguiente" }),
    ).toBeInTheDocument();
  });

  it("dots accept custom dotLabel function", () => {
    render(
      <Carousel.Root count={COUNT} label="Custom dots" disableAnimation>
        <Carousel.Track>
          {SLIDES.map((s, i) => (
            <Carousel.Item
              key={s}
              index={i}
              slideLabel={`Slide ${String(i + 1)} of ${String(COUNT)}`}
            >
              {s}
            </Carousel.Item>
          ))}
        </Carousel.Track>
        <Carousel.Dots dotLabel={(n) => `Ir a diapositiva ${String(n)}`} />
      </Carousel.Root>,
    );
    expect(
      screen.getByRole("tab", { name: "Ir a diapositiva 1" }),
    ).toBeInTheDocument();
  });
});

// ─── Error boundary (context) ────────────────────────────────────────────────

describe("Carousel — context guard", () => {
  it("throws when Carousel.Track is rendered outside Root", () => {
    const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    expect(() =>
      render(
        <Carousel.Track>
          <div />
        </Carousel.Track>,
      ),
    ).toThrow();
    consoleSpy.mockRestore();
  });
});

// ─── Accessibility (axe) ─────────────────────────────────────────────────────

describe("Carousel — accessibility", () => {
  async function checkA11y(element: Element) {
    const results = await axe.run(element);
    expect(results.violations).toHaveLength(0);
  }

  it("has no axe violations", async () => {
    const { container } = renderCarousel();
    await checkA11y(container);
  });

  it("has no axe violations on non-first slide", async () => {
    const { container } = renderCarousel({ defaultIndex: 1 });
    await checkA11y(container);
  });

  it("has no axe violations with loop enabled", async () => {
    const { container } = renderCarousel({ loop: true });
    await checkA11y(container);
  });
});
