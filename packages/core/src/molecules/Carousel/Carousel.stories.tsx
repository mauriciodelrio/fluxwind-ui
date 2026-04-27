import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Carousel } from "./Carousel";

// ─── Meta ─────────────────────────────────────────────────────────────────────

const meta: Meta<typeof Carousel.Root> = {
  title: "Molecules/Carousel",
  component: Carousel.Root,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          'Compound carousel molecule — `Carousel.Root` · `Carousel.Track` · `Carousel.Item` · `Carousel.Prev` · `Carousel.Next` · `Carousel.Dots`. Fully accessible (WCAG 2.2 AA): `role="region"` landmark, per-slide `role="group"` with `aria-roledescription="slide"`, live region, keyboard navigation.',
      },
    },
  },
  argTypes: {
    radius: {
      control: "select",
      options: ["none", "sm", "md", "lg", "xl", "2xl", "full"],
    },
    loop: { control: "boolean" },
    autoplay: { control: { type: "number", min: 0, step: 500 } },
  },
};

export default meta;
type Story = StoryObj<typeof Carousel.Root>;

// ─── Sample slide content ─────────────────────────────────────────────────────

const COLORS = ["bg-fw-surface", "bg-fw-muted", "bg-fw-background"];

const LABELS = ["First slide", "Second slide", "Third slide"];
const COUNT = LABELS.length;

function SlideContent({ index, color }: { index: number; color: string }) {
  return (
    <div
      className={`flex h-48 w-full items-center justify-center rounded-inherit text-2xl font-semibold text-fw-foreground ${color}`}
    >
      {LABELS[index]}
    </div>
  );
}

// ─── Stories ──────────────────────────────────────────────────────────────────

export const Default: Story = {
  args: {
    count: COUNT,
    label: "Product highlights",
    radius: "md",
    loop: false,
    autoplay: 0,
  },
  render: (args) => (
    <Carousel.Root {...args}>
      <Carousel.Track>
        {LABELS.map((l, i) => (
          <Carousel.Item
            key={l}
            index={i}
            slideLabel={`${l} of ${String(COUNT)}`}
          >
            <SlideContent index={i} color={COLORS[i] ?? "bg-fw-surface"} />
          </Carousel.Item>
        ))}
      </Carousel.Track>
      <Carousel.Prev />
      <Carousel.Next />
    </Carousel.Root>
  ),
};

export const WithDots: Story = {
  args: {
    count: COUNT,
    label: "Product highlights with dots",
    radius: "md",
  },
  render: (args) => (
    <Carousel.Root {...args}>
      <Carousel.Track>
        {LABELS.map((l, i) => (
          <Carousel.Item
            key={l}
            index={i}
            slideLabel={`${l} of ${String(COUNT)}`}
          >
            <SlideContent index={i} color={COLORS[i] ?? "bg-fw-surface"} />
          </Carousel.Item>
        ))}
      </Carousel.Track>
      <Carousel.Prev />
      <Carousel.Next />
      <Carousel.Dots />
    </Carousel.Root>
  ),
};

export const WithLoop: Story = {
  args: {
    count: COUNT,
    label: "Looping carousel",
    loop: true,
  },
  render: (args) => (
    <Carousel.Root {...args}>
      <Carousel.Track>
        {LABELS.map((l, i) => (
          <Carousel.Item
            key={l}
            index={i}
            slideLabel={`${l} of ${String(COUNT)}`}
          >
            <SlideContent index={i} color={COLORS[i] ?? "bg-fw-surface"} />
          </Carousel.Item>
        ))}
      </Carousel.Track>
      <Carousel.Prev />
      <Carousel.Next />
      <Carousel.Dots />
    </Carousel.Root>
  ),
};

export const WithAutoplay: Story = {
  args: {
    count: COUNT,
    label: "Auto-advancing carousel",
    autoplay: 2000,
    loop: true,
  },
  render: (args) => (
    <Carousel.Root {...args}>
      <Carousel.Track>
        {LABELS.map((l, i) => (
          <Carousel.Item
            key={l}
            index={i}
            slideLabel={`${l} of ${String(COUNT)}`}
          >
            <SlideContent index={i} color={COLORS[i] ?? "bg-fw-surface"} />
          </Carousel.Item>
        ))}
      </Carousel.Track>
      <Carousel.Prev />
      <Carousel.Next />
      <Carousel.Dots />
    </Carousel.Root>
  ),
};

export const CustomNavLabels: Story = {
  name: "Custom nav labels (i18n)",
  args: {
    count: COUNT,
    label: "Carrusel de productos",
  },
  render: (args) => (
    <Carousel.Root {...args}>
      <Carousel.Track>
        {LABELS.map((l, i) => (
          <Carousel.Item
            key={l}
            index={i}
            slideLabel={`${l} of ${String(COUNT)}`}
          >
            <SlideContent index={i} color={COLORS[i] ?? "bg-fw-surface"} />
          </Carousel.Item>
        ))}
      </Carousel.Track>
      <Carousel.Prev label="Anterior" />
      <Carousel.Next label="Siguiente" />
      <Carousel.Dots dotLabel={(n) => `Ir a diapositiva ${String(n)}`} />
    </Carousel.Root>
  ),
};

function ControlledRender() {
  const [index, setIndex] = useState(0);
  return (
    <div className="flex flex-col gap-4">
      <Carousel.Root
        count={COUNT}
        label="Controlled carousel"
        index={index}
        onChange={setIndex}
      >
        <Carousel.Track>
          {LABELS.map((l, i) => (
            <Carousel.Item
              key={l}
              index={i}
              slideLabel={`${l} of ${String(COUNT)}`}
            >
              <SlideContent index={i} color={COLORS[i] ?? "bg-fw-surface"} />
            </Carousel.Item>
          ))}
        </Carousel.Track>
        <Carousel.Prev />
        <Carousel.Next />
        <Carousel.Dots />
      </Carousel.Root>
      <p className="text-sm text-fw-muted">
        Active slide (controlled): <strong>{String(index + 1)}</strong>
      </p>
      <div className="flex gap-2">
        {LABELS.map((l, i) => (
          <button
            key={l}
            type="button"
            onClick={() => {
              setIndex(i);
            }}
            className="rounded border border-fw-border px-3 py-1 text-sm hover:bg-fw-surface"
          >
            {l}
          </button>
        ))}
      </div>
    </div>
  );
}

export const Controlled: Story = {
  render: () => <ControlledRender />,
  parameters: {
    docs: {
      description: {
        story:
          "Controlled mode — external state drives the active slide via `index` + `onChange`.",
      },
    },
  },
};

function AllRadiiRender() {
  const radii = ["none", "sm", "md", "lg", "xl", "2xl", "full"] as const;
  return (
    <div className="flex flex-col gap-6">
      {radii.map((r) => (
        <div key={r} className="flex flex-col gap-1">
          <p className="text-xs text-fw-muted">radius=&quot;{r}&quot;</p>
          <Carousel.Root
            count={COUNT}
            label={`Carousel radius ${r}`}
            radius={r}
          >
            <Carousel.Track>
              {LABELS.map((l, i) => (
                <Carousel.Item
                  key={l}
                  index={i}
                  slideLabel={`${l} of ${String(COUNT)}`}
                >
                  <SlideContent
                    index={i}
                    color={COLORS[i] ?? "bg-fw-surface"}
                  />
                </Carousel.Item>
              ))}
            </Carousel.Track>
            <Carousel.Prev />
            <Carousel.Next />
          </Carousel.Root>
        </div>
      ))}
    </div>
  );
}

export const AllRadii: Story = {
  render: () => <AllRadiiRender />,
  parameters: {
    docs: {
      description: {
        story: "All `radius` values applied to `Carousel.Root`.",
      },
    },
  },
};
