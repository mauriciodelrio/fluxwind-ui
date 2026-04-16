import type { Meta, StoryObj } from "@storybook/react-vite";
import { siGithub, siX, siYoutube, siDiscord } from "simple-icons";
import { Icon } from "@/atoms/Icon";
import { Footer } from "./Footer";

// ─── Meta ─────────────────────────────────────────────────────────────────────

const meta: Meta<typeof Footer.Root> = {
  title: "Organisms/Footer",
  component: Footer.Root,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Footer is a page-level organism for site-wide navigation, branding and legal copy. " +
          "Supports 2/3/4-column nav grids, social icon links and three background styles " +
          "(default, muted, dark).\n\n" +
          "## Usage\n\n" +
          "```tsx\n" +
          '<Footer.Root background="dark">\n' +
          "  <Footer.Top>\n" +
          "    <Footer.Brand>\n" +
          '      <Footer.BrandName background="dark">FluxWind</Footer.BrandName>\n' +
          "    </Footer.Brand>\n" +
          "    <Footer.NavGrid columns={3}>...</Footer.NavGrid>\n" +
          "  </Footer.Top>\n" +
          '  <Footer.Bottom background="dark">\n' +
          '    <Footer.Copyright background="dark">© 2026 FluxWind.</Footer.Copyright>\n' +
          "  </Footer.Bottom>\n" +
          "</Footer.Root>\n" +
          "```",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Footer.Root>;

// ─── Shared data ──────────────────────────────────────────────────────────────

const NAV_COLS = [
  {
    heading: "Product",
    links: [
      { label: "Features", href: "/features" },
      { label: "Pricing", href: "/pricing" },
      { label: "Changelog", href: "/changelog" },
      { label: "Roadmap", href: "/roadmap" },
    ],
  },
  {
    heading: "Developers",
    links: [
      { label: "Documentation", href: "/docs" },
      { label: "Components", href: "/components" },
      { label: "GitHub", href: "https://github.com" },
      { label: "Releases", href: "/releases" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Blog", href: "/blog" },
      { label: "Careers", href: "/careers" },
      { label: "Contact", href: "/contact" },
    ],
  },
];

// ─── Stories ──────────────────────────────────────────────────────────────────

/** Full-featured footer on a default (light) background — 3 nav columns. */
export const DefaultBackground: Story = {
  name: "Default — 3 Columns",
  render: () => (
    <Footer.Root background="default">
      <Footer.Top>
        <Footer.Brand>
          <Footer.BrandName>FluxWind</Footer.BrandName>
          <Footer.Tagline>
            Accessible, themeable React components for modern web apps.
          </Footer.Tagline>
          <Footer.SocialRow>
            <Footer.SocialLink href="https://github.com" label="GitHub">
              <Icon simpleIcon={siGithub} size="sm" />
            </Footer.SocialLink>
            <Footer.SocialLink href="https://twitter.com" label="Twitter / X">
              <Icon simpleIcon={siX} size="sm" />
            </Footer.SocialLink>
            <Footer.SocialLink href="https://discord.com" label="Discord">
              <Icon simpleIcon={siDiscord} size="sm" />
            </Footer.SocialLink>
          </Footer.SocialRow>
        </Footer.Brand>
        <Footer.NavGrid columns={3}>
          {NAV_COLS.map((col) => (
            <Footer.NavColumn key={col.heading}>
              <Footer.NavHeading>{col.heading}</Footer.NavHeading>
              <Footer.NavList>
                {col.links.map((l) => (
                  <Footer.NavLink key={l.label} href={l.href}>
                    {l.label}
                  </Footer.NavLink>
                ))}
              </Footer.NavList>
            </Footer.NavColumn>
          ))}
        </Footer.NavGrid>
      </Footer.Top>
      <Footer.Bottom>
        <Footer.Copyright>
          © {new Date().getFullYear()} FluxWind, Inc. All rights reserved.
        </Footer.Copyright>
        <Footer.LegalList>
          <Footer.LegalLink href="/privacy">Privacy Policy</Footer.LegalLink>
          <Footer.LegalLink href="/terms">Terms of Service</Footer.LegalLink>
          <Footer.LegalLink href="/cookies">Cookie Policy</Footer.LegalLink>
        </Footer.LegalList>
      </Footer.Bottom>
    </Footer.Root>
  ),
};

/** Muted background — blends into page sections. */
export const MutedBackground: Story = {
  name: "Muted — 3 Columns",
  render: () => (
    <Footer.Root background="muted">
      <Footer.Top>
        <Footer.Brand>
          <Footer.BrandName background="muted">FluxWind</Footer.BrandName>
          <Footer.Tagline background="muted">
            Accessible, themeable React components for modern web apps.
          </Footer.Tagline>
        </Footer.Brand>
        <Footer.NavGrid columns={3}>
          {NAV_COLS.map((col) => (
            <Footer.NavColumn key={col.heading}>
              <Footer.NavHeading background="muted">
                {col.heading}
              </Footer.NavHeading>
              <Footer.NavList>
                {col.links.map((l) => (
                  <Footer.NavLink
                    key={l.label}
                    background="muted"
                    href={l.href}
                  >
                    {l.label}
                  </Footer.NavLink>
                ))}
              </Footer.NavList>
            </Footer.NavColumn>
          ))}
        </Footer.NavGrid>
      </Footer.Top>
      <Footer.Bottom background="muted">
        <Footer.Copyright background="muted">
          © {new Date().getFullYear()} FluxWind, Inc. All rights reserved.
        </Footer.Copyright>
        <Footer.LegalList>
          <Footer.LegalLink background="muted" href="/privacy">
            Privacy Policy
          </Footer.LegalLink>
          <Footer.LegalLink background="muted" href="/terms">
            Terms of Service
          </Footer.LegalLink>
        </Footer.LegalList>
      </Footer.Bottom>
    </Footer.Root>
  ),
};

/** Dark background — pairs with CTASection dark or as a standalone footer. */
export const DarkBackground: Story = {
  name: "Dark — 3 Columns",
  render: () => (
    <Footer.Root background="dark">
      <Footer.Top>
        <Footer.Brand>
          <Footer.BrandName background="dark">FluxWind</Footer.BrandName>
          <Footer.Tagline background="dark">
            Accessible, themeable React components for modern web apps.
          </Footer.Tagline>
          <Footer.SocialRow>
            <Footer.SocialLink
              background="dark"
              href="https://github.com"
              label="GitHub"
            >
              <Icon simpleIcon={siGithub} size="sm" />
            </Footer.SocialLink>
            <Footer.SocialLink
              background="dark"
              href="https://twitter.com"
              label="Twitter / X"
            >
              <Icon simpleIcon={siX} size="sm" />
            </Footer.SocialLink>
            <Footer.SocialLink
              background="dark"
              href="https://youtube.com"
              label="YouTube"
            >
              <Icon simpleIcon={siYoutube} size="sm" />
            </Footer.SocialLink>
          </Footer.SocialRow>
        </Footer.Brand>
        <Footer.NavGrid columns={3}>
          {NAV_COLS.map((col) => (
            <Footer.NavColumn key={col.heading}>
              <Footer.NavHeading background="dark">
                {col.heading}
              </Footer.NavHeading>
              <Footer.NavList>
                {col.links.map((l) => (
                  <Footer.NavLink key={l.label} background="dark" href={l.href}>
                    {l.label}
                  </Footer.NavLink>
                ))}
              </Footer.NavList>
            </Footer.NavColumn>
          ))}
        </Footer.NavGrid>
      </Footer.Top>
      <Footer.Bottom background="dark">
        <Footer.Copyright background="dark">
          © {new Date().getFullYear()} FluxWind, Inc. All rights reserved.
        </Footer.Copyright>
        <Footer.LegalList>
          <Footer.LegalLink background="dark" href="/privacy">
            Privacy Policy
          </Footer.LegalLink>
          <Footer.LegalLink background="dark" href="/terms">
            Terms of Service
          </Footer.LegalLink>
          <Footer.LegalLink background="dark" href="/cookies">
            Cookie Policy
          </Footer.LegalLink>
        </Footer.LegalList>
      </Footer.Bottom>
    </Footer.Root>
  ),
};

/** 2-column compact layout — ideal for smaller apps or landing pages. */
export const TwoColumns: Story = {
  name: "Default — 2 Columns",
  render: () => (
    <Footer.Root background="default">
      <Footer.Top>
        <Footer.Brand>
          <Footer.BrandName>FluxWind</Footer.BrandName>
          <Footer.Tagline>Open source design system in React.</Footer.Tagline>
          <Footer.SocialRow>
            <Footer.SocialLink href="https://github.com" label="GitHub">
              <Icon simpleIcon={siGithub} size="sm" />
            </Footer.SocialLink>
            <Footer.SocialLink href="https://discord.com" label="Discord">
              <Icon simpleIcon={siDiscord} size="sm" />
            </Footer.SocialLink>
          </Footer.SocialRow>
        </Footer.Brand>
        <Footer.NavGrid columns={2}>
          {NAV_COLS.slice(0, 2).map((col) => (
            <Footer.NavColumn key={col.heading}>
              <Footer.NavHeading>{col.heading}</Footer.NavHeading>
              <Footer.NavList>
                {col.links.map((l) => (
                  <Footer.NavLink key={l.label} href={l.href}>
                    {l.label}
                  </Footer.NavLink>
                ))}
              </Footer.NavList>
            </Footer.NavColumn>
          ))}
        </Footer.NavGrid>
      </Footer.Top>
      <Footer.Bottom>
        <Footer.Copyright>
          © {new Date().getFullYear()} FluxWind, Inc.
        </Footer.Copyright>
      </Footer.Bottom>
    </Footer.Root>
  ),
};

/** 4-column wide layout — for large SaaS products with many nav sections. */
export const FourColumns: Story = {
  name: "Default — 4 Columns",
  render: () => (
    <Footer.Root background="default">
      <Footer.Top>
        <Footer.Brand>
          <Footer.BrandName>FluxWind</Footer.BrandName>
          <Footer.Tagline>
            Production-grade components, zero configuration.
          </Footer.Tagline>
          <Footer.SocialRow>
            <Footer.SocialLink href="https://github.com" label="GitHub">
              <Icon simpleIcon={siGithub} size="sm" />
            </Footer.SocialLink>
            <Footer.SocialLink href="https://twitter.com" label="Twitter / X">
              <Icon simpleIcon={siX} size="sm" />
            </Footer.SocialLink>
            <Footer.SocialLink href="https://discord.com" label="Discord">
              <Icon simpleIcon={siDiscord} size="sm" />
            </Footer.SocialLink>
            <Footer.SocialLink href="https://youtube.com" label="YouTube">
              <Icon simpleIcon={siYoutube} size="sm" />
            </Footer.SocialLink>
          </Footer.SocialRow>
        </Footer.Brand>
        <Footer.NavGrid columns={4}>
          {[
            ...NAV_COLS,
            {
              heading: "Legal",
              links: [
                { label: "Privacy", href: "/privacy" },
                { label: "Terms", href: "/terms" },
                { label: "Cookies", href: "/cookies" },
                { label: "Security", href: "/security" },
              ],
            },
          ].map((col) => (
            <Footer.NavColumn key={col.heading}>
              <Footer.NavHeading>{col.heading}</Footer.NavHeading>
              <Footer.NavList>
                {col.links.map((l) => (
                  <Footer.NavLink key={l.label} href={l.href}>
                    {l.label}
                  </Footer.NavLink>
                ))}
              </Footer.NavList>
            </Footer.NavColumn>
          ))}
        </Footer.NavGrid>
      </Footer.Top>
      <Footer.Bottom>
        <Footer.Copyright>
          © {new Date().getFullYear()} FluxWind, Inc. All rights reserved.
        </Footer.Copyright>
        <Footer.LegalList>
          <Footer.LegalLink href="/privacy">Privacy</Footer.LegalLink>
          <Footer.LegalLink href="/terms">Terms</Footer.LegalLink>
          <Footer.LegalLink href="/cookies">Cookies</Footer.LegalLink>
          <Footer.LegalLink href="/security">Security</Footer.LegalLink>
        </Footer.LegalList>
      </Footer.Bottom>
    </Footer.Root>
  ),
};
