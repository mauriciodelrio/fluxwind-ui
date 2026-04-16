import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import axe from "axe-core";
import { HeroSection } from "./HeroSection";

// ─── Fixtures ─────────────────────────────────────────────────────────────────

function BasicHero() {
  return (
    <HeroSection.Root>
      <HeroSection.Text>
        <HeroSection.Eyebrow>New · Version 2.0</HeroSection.Eyebrow>
        <HeroSection.Heading>Build faster UIs</HeroSection.Heading>
        <HeroSection.Subheading>
          A design system for modern web apps.
        </HeroSection.Subheading>
        <HeroSection.Actions>
          <a href="/get-started">Get started</a>
          <a href="/docs">Documentation</a>
        </HeroSection.Actions>
      </HeroSection.Text>
    </HeroSection.Root>
  );
}

function HeroWithImage() {
  return (
    <HeroSection.Root layout="split-left">
      <HeroSection.Text>
        <HeroSection.Heading>Ship production-ready</HeroSection.Heading>
        <HeroSection.Actions>
          <a href="/start">Start now</a>
        </HeroSection.Actions>
      </HeroSection.Text>
      <HeroSection.Media>
        <HeroSection.Image src="/hero.png" alt="Hero illustration" />
      </HeroSection.Media>
    </HeroSection.Root>
  );
}

function HeroWithVideo() {
  return (
    <HeroSection.Root>
      <HeroSection.Text>
        <HeroSection.Heading>See it in action</HeroSection.Heading>
      </HeroSection.Text>
      <HeroSection.Media>
        <HeroSection.Video
          src="/demo.mp4"
          poster="/poster.jpg"
          captionsSrc="data:text/vtt,WEBVTT"
          playLabel="Play demo"
          pauseLabel="Pause demo"
        />
      </HeroSection.Media>
    </HeroSection.Root>
  );
}

// ─── Structure ────────────────────────────────────────────────────────────────

describe("HeroSection – structure", () => {
  it("renders a section landmark", () => {
    render(<BasicHero />);
    // <section> is exposed as a region when it has a label; without label check by element
    const section = document.querySelector("section");
    expect(section).toBeInTheDocument();
  });

  it("renders eyebrow text", () => {
    render(<BasicHero />);
    expect(screen.getByText("New · Version 2.0")).toBeInTheDocument();
  });

  it("renders heading as h1 by default", () => {
    render(<BasicHero />);
    expect(
      screen.getByRole("heading", { level: 1, name: "Build faster UIs" }),
    ).toBeInTheDocument();
  });

  it("renders heading as h2 when as='h2'", () => {
    render(
      <HeroSection.Root>
        <HeroSection.Text>
          <HeroSection.Heading as="h2">Secondary hero</HeroSection.Heading>
        </HeroSection.Text>
      </HeroSection.Root>,
    );
    expect(
      screen.getByRole("heading", { level: 2, name: "Secondary hero" }),
    ).toBeInTheDocument();
  });

  it("renders subheading text", () => {
    render(<BasicHero />);
    expect(
      screen.getByText("A design system for modern web apps."),
    ).toBeInTheDocument();
  });

  it("renders action links", () => {
    render(<BasicHero />);
    expect(
      screen.getByRole("link", { name: "Get started" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "Documentation" }),
    ).toBeInTheDocument();
  });

  it("renders image with correct alt text", () => {
    render(<HeroWithImage />);
    expect(screen.getByAltText("Hero illustration")).toBeInTheDocument();
  });

  it("renders video play button", () => {
    render(<HeroWithVideo />);
    expect(
      screen.getByRole("button", { name: "Play demo" }),
    ).toBeInTheDocument();
  });
});

// ─── ARIA ─────────────────────────────────────────────────────────────────────

describe("HeroSection – ARIA", () => {
  it("play button has aria-pressed=false when paused", () => {
    render(<HeroWithVideo />);
    expect(screen.getByRole("button", { name: "Play demo" })).toHaveAttribute(
      "aria-pressed",
      "false",
    );
  });

  it("passes axe audit (centered layout)", async () => {
    const { container } = render(
      <main>
        <BasicHero />
      </main>,
    );
    const results = await axe.run(container);
    expect(results.violations).toHaveLength(0);
  });

  it("passes axe audit (split-left with image)", async () => {
    const { container } = render(
      <main>
        <HeroWithImage />
      </main>,
    );
    const results = await axe.run(container);
    expect(results.violations).toHaveLength(0);
  });

  it("passes axe audit (with video)", async () => {
    const { container } = render(
      <main>
        <HeroWithVideo />
      </main>,
    );
    const results = await axe.run(container);
    expect(results.violations).toHaveLength(0);
  });
});

// ─── Interaction ──────────────────────────────────────────────────────────────

describe("HeroSection – video interaction", () => {
  function setupVideoMock() {
    const play = vi.fn().mockResolvedValue(undefined);
    const pause = vi.fn();
    Object.defineProperty(HTMLVideoElement.prototype, "play", {
      configurable: true,
      writable: true,
      value: play,
    });
    Object.defineProperty(HTMLVideoElement.prototype, "pause", {
      configurable: true,
      writable: true,
      value: pause,
    });
    return { play, pause };
  }

  it("clicking play button calls video.play()", async () => {
    const { play } = setupVideoMock();
    const user = userEvent.setup();
    render(<HeroWithVideo />);

    await user.click(screen.getByRole("button", { name: "Play demo" }));
    expect(play).toHaveBeenCalled();
  });

  it("button label changes to pause label when playing", async () => {
    setupVideoMock();
    const user = userEvent.setup();
    render(<HeroWithVideo />);

    await user.click(screen.getByRole("button", { name: "Play demo" }));
    // Simulate video play event
    const video = document.querySelector("video")!;
    video.dispatchEvent(new Event("play"));

    expect(
      screen.getByRole("button", { name: "Pause demo" }),
    ).toBeInTheDocument();
  });

  it("clicking pause button calls video.pause()", async () => {
    const { pause } = setupVideoMock();
    const user = userEvent.setup();
    render(<HeroWithVideo />);

    // First play
    await user.click(screen.getByRole("button", { name: "Play demo" }));
    const video = document.querySelector("video")!;
    video.dispatchEvent(new Event("play"));

    // Then pause
    await user.click(screen.getByRole("button", { name: "Pause demo" }));
    expect(pause).toHaveBeenCalled();
  });

  it("Space key toggles play/pause", async () => {
    const { play } = setupVideoMock();
    const user = userEvent.setup();
    render(<HeroWithVideo />);

    screen.getByRole("button", { name: "Play demo" }).focus();
    await user.keyboard(" ");
    expect(play).toHaveBeenCalled();
  });
});

// ─── Props passthrough ────────────────────────────────────────────────────────

describe("HeroSection – props passthrough", () => {
  it("Root forwards className to the section element", () => {
    render(
      <HeroSection.Root className="custom-hero">
        <HeroSection.Text>
          <HeroSection.Heading>Test</HeroSection.Heading>
        </HeroSection.Text>
      </HeroSection.Root>,
    );
    expect(document.querySelector("section")).toHaveClass("custom-hero");
  });

  it("throws when sub-component used outside HeroSection.Root", () => {
    const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    expect(() =>
      render(<HeroSection.Heading>Orphan</HeroSection.Heading>),
    ).toThrow(
      "<HeroSection.Heading> must be rendered inside <HeroSection.Root>.",
    );
    consoleSpy.mockRestore();
  });
});
