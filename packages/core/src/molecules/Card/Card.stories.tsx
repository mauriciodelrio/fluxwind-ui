import type { Meta, StoryObj } from "@storybook/react-vite";
import { Avatar } from "@/atoms/Avatar/Avatar";
import { Badge } from "@/atoms/Badge/Badge";
import { Button } from "@/atoms/Button/Button";
import { Rating } from "@/molecules/Rating/Rating";
import { Card } from "./Card";

// ─── Meta ─────────────────────────────────────────────────────────────────────

const meta: Meta<typeof Card> = {
  title: "Molecules/Card",
  component: Card,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Card is a flexible surface container with four variants and optional interactive behaviour.\n\n" +
          "## Sub-components\n\n" +
          "| Component | Description |\n" +
          "|---|---|\n" +
          "| `<Card.Header>` | Top section — titles, avatars, metadata |\n" +
          "| `<Card.Body>` | Main content area |\n" +
          "| `<Card.Footer>` | Bottom section — actions, links |\n\n" +
          "## Design decisions\n\n" +
          "| Decision | Rationale |\n" +
          "|---|---|\n" +
          "| No hardcoded text | i18n-compatible; all content via slots |\n" +
          "| `isInteractive` adds `tabIndex=0` | Semantic focus without wrapping in `<button>` or `<a>` |\n" +
          "| Sub-components via `Object.assign` | Compound pattern — tree-shakeable, discoverable |\n" +
          "| `forwardRef` on all parts | Allows ref access for consumers and animation libraries |",
      },
    },
  },
  argTypes: {
    variant: {
      description: "Visual style of the card.",
      control: "select",
      options: ["outlined", "elevated", "ghost", "filled"],
    },
    isInteractive: {
      description:
        "Adds hover/focus styles and makes the card keyboard-focusable.",
      control: "boolean",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Card>;

// ─── Default (Outlined) ───────────────────────────────────────────────────────

export const Default: Story = {
  args: { variant: "outlined" },
  render: (args) => (
    <Card {...args} style={{ maxWidth: 360 }}>
      <Card.Header>
        <h3 style={{ margin: 0, fontSize: "1rem", fontWeight: 600 }}>
          Card title
        </h3>
        <p style={{ margin: 0, fontSize: "0.875rem", opacity: 0.6 }}>
          Subtitle or metadata
        </p>
      </Card.Header>
      <Card.Body>
        <p style={{ margin: 0, fontSize: "0.875rem" }}>
          This is the main content area. Place any content here — text, images,
          lists, or other components.
        </p>
      </Card.Body>
      <Card.Footer style={{ gap: "0.5rem" }}>
        <button type="button">Primary action</button>
        <button type="button">Cancel</button>
      </Card.Footer>
    </Card>
  ),
};

// ─── Elevated ─────────────────────────────────────────────────────────────────

export const Elevated: Story = {
  args: { variant: "elevated" },
  render: (args) => (
    <Card {...args} style={{ maxWidth: 360 }}>
      <Card.Header>
        <h3 style={{ margin: 0, fontSize: "1rem", fontWeight: 600 }}>
          Elevated card
        </h3>
      </Card.Header>
      <Card.Body>
        <p style={{ margin: 0, fontSize: "0.875rem" }}>
          Uses a drop shadow instead of a border to create depth.
        </p>
      </Card.Body>
    </Card>
  ),
};

// ─── Ghost ────────────────────────────────────────────────────────────────────

export const Ghost: Story = {
  args: { variant: "ghost" },
  render: (args) => (
    <Card {...args} style={{ maxWidth: 360 }}>
      <Card.Header>
        <h3 style={{ margin: 0, fontSize: "1rem", fontWeight: 600 }}>
          Ghost card
        </h3>
      </Card.Header>
      <Card.Body>
        <p style={{ margin: 0, fontSize: "0.875rem" }}>
          Transparent background — useful inside coloured surfaces.
        </p>
      </Card.Body>
    </Card>
  ),
};

// ─── Filled ───────────────────────────────────────────────────────────────────

export const Filled: Story = {
  args: { variant: "filled" },
  render: (args) => (
    <Card {...args} style={{ maxWidth: 360 }}>
      <Card.Header>
        <h3 style={{ margin: 0, fontSize: "1rem", fontWeight: 600 }}>
          Filled card
        </h3>
      </Card.Header>
      <Card.Body>
        <p style={{ margin: 0, fontSize: "0.875rem" }}>
          Uses the surface token as background, no border or shadow.
        </p>
      </Card.Body>
    </Card>
  ),
};

// ─── Interactive ──────────────────────────────────────────────────────────────

export const Interactive: Story = {
  args: { variant: "outlined", isInteractive: true },
  render: (args) => (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "1rem",
        maxWidth: 720,
      }}
    >
      {["Product Alpha", "Product Beta", "Product Gamma", "Product Delta"].map(
        (name) => (
          <Card
            key={name}
            {...args}
            aria-label={`View details for ${name}`}
            onClick={() => {
              alert(`Clicked: ${name}`);
            }}
          >
            <Card.Body>
              <h3
                style={{
                  margin: "0 0 0.25rem",
                  fontSize: "0.9rem",
                  fontWeight: 600,
                }}
              >
                {name}
              </h3>
              <p style={{ margin: 0, fontSize: "0.8rem", opacity: 0.7 }}>
                Click to view details
              </p>
            </Card.Body>
          </Card>
        ),
      )}
    </div>
  ),
};

// ─── All Variants ─────────────────────────────────────────────────────────────

export const AllVariants: Story = {
  render: () => (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "1rem",
        maxWidth: 720,
      }}
    >
      {(["outlined", "elevated", "ghost", "filled"] as const).map((variant) => (
        <Card key={variant} variant={variant}>
          <Card.Header>
            <h3
              style={{
                margin: 0,
                fontSize: "0.9rem",
                fontWeight: 600,
                textTransform: "capitalize",
              }}
            >
              {variant}
            </h3>
          </Card.Header>
          <Card.Body>
            <p style={{ margin: 0, fontSize: "0.8rem", opacity: 0.7 }}>
              variant=&quot;{variant}&quot;
            </p>
          </Card.Body>
        </Card>
      ))}
    </div>
  ),
};

// ─── Product Card ─────────────────────────────────────────────────────────────

export const ProductCard: Story = {
  render: () => (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: "1.25rem",
        maxWidth: 860,
        alignItems: "stretch",
      }}
    >
      {[
        {
          name: "Wireless Headphones",
          price: "$129.00",
          rating: 4.5,
          reviews: 284,
          badge: "Best seller",
          badgeVariant: "primary" as const,
          src: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=200&fit=crop",
        },
        {
          name: "Mechanical Keyboard",
          price: "$89.00",
          rating: 4,
          reviews: 97,
          badge: "New",
          badgeVariant: "success" as const,
          src: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=300&h=200&fit=crop",
        },
        {
          name: "USB-C Hub",
          price: "$49.00",
          rating: 3.5,
          reviews: 41,
          badge: "Sale",
          badgeVariant: "warning" as const,
          src: "https://images.unsplash.com/photo-1625895197185-efcec01cffe0?w=300&h=200&fit=crop",
        },
      ].map((product) => (
        <Card
          key={product.name}
          variant="outlined"
          isInteractive
          aria-label={`View ${product.name}`}
          style={{ height: "100%" }}
        >
          {/* Product image */}
          <div
            style={{
              height: 160,
              overflow: "hidden",
              borderRadius: "0.5rem 0.5rem 0 0",
            }}
          >
            <img
              src={product.src}
              alt={product.name}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>

          <Card.Header>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                gap: "0.5rem",
              }}
            >
              <h3
                style={{
                  margin: 0,
                  fontSize: "0.9rem",
                  fontWeight: 600,
                  minWidth: 0,
                }}
              >
                {product.name}
              </h3>
              <Badge
                variant={product.badgeVariant}
                radius="full"
                style={{ flexShrink: 0 }}
              >
                {product.badge}
              </Badge>
            </div>
          </Card.Header>

          <Card.Body>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                marginBottom: "0.75rem",
              }}
            >
              <Rating value={product.rating} max={5} readOnly size="sm" />
              <span style={{ fontSize: "0.75rem", opacity: 0.6 }}>
                ({product.reviews})
              </span>
            </div>
            <p style={{ margin: 0, fontSize: "1rem", fontWeight: 700 }}>
              {product.price}
            </p>
          </Card.Body>

          <Card.Footer style={{ gap: "0.5rem" }}>
            <Button variant="primary" size="sm" style={{ flex: 1 }}>
              Add to cart
            </Button>
            <Button variant="secondary" size="sm" aria-label="Save for later">
              <svg
                aria-hidden="true"
                focusable="false"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
            </Button>
          </Card.Footer>
        </Card>
      ))}
    </div>
  ),
};

// ─── Profile Card ─────────────────────────────────────────────────────────────

export const ProfileCard: Story = {
  render: () => (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: "1.25rem",
        maxWidth: 860,
      }}
    >
      {[
        {
          name: "Sofia Martínez",
          role: "Senior Designer",
          department: "Product",
          initials: "SM",
          rating: 5,
          tags: ["Figma", "React", "a11y"],
          status: "Available",
          statusVariant: "success" as const,
        },
        {
          name: "Lucas Ferreira",
          role: "Backend Engineer",
          department: "Platform",
          initials: "LF",
          rating: 4,
          tags: ["Node.js", "Postgres", "Redis"],
          status: "In a meeting",
          statusVariant: "warning" as const,
        },
        {
          name: "Camille Dubois",
          role: "Product Manager",
          department: "Growth",
          initials: "CD",
          rating: 4.5,
          tags: ["Strategy", "Analytics", "OKRs"],
          status: "Away",
          statusVariant: "error" as const,
        },
      ].map((person) => (
        <Card key={person.name} variant="elevated">
          <Card.Header>
            <div
              style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}
            >
              <Avatar initials={person.initials} size="lg" radius="full" />
              <div style={{ minWidth: 0 }}>
                <p
                  style={{
                    margin: 0,
                    fontWeight: 600,
                    fontSize: "0.9rem",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {person.name}
                </p>
                <p style={{ margin: 0, fontSize: "0.75rem", opacity: 0.6 }}>
                  {person.role}
                </p>
              </div>
              <Badge
                variant={person.statusVariant}
                radius="full"
                dot
                style={{ marginLeft: "auto", flexShrink: 0 }}
              >
                {person.status}
              </Badge>
            </div>
          </Card.Header>

          <Card.Body>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                marginBottom: "0.75rem",
              }}
            >
              <Rating value={person.rating} max={5} readOnly size="sm" />
              <span style={{ fontSize: "0.75rem", opacity: 0.6 }}>
                performance
              </span>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.375rem" }}>
              {person.tags.map((tag) => (
                <Badge key={tag} variant="default" radius="md">
                  {tag}
                </Badge>
              ))}
            </div>
          </Card.Body>

          <Card.Footer style={{ justifyContent: "space-between" }}>
            <span style={{ fontSize: "0.75rem", opacity: 0.5 }}>
              {person.department}
            </span>
            <Button variant="secondary" size="sm">
              View profile
            </Button>
          </Card.Footer>
        </Card>
      ))}
    </div>
  ),
};
