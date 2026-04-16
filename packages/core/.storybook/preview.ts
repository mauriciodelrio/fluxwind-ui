import type { Preview, Decorator } from "@storybook/react-vite";
import { withThemeByDataAttribute } from "@storybook/addon-themes";
import { useEffect as storybookEffect } from "storybook/preview-api";
import "../src/styles/index.css";
import "./preview.css";

/**
 * Applies the selected FluxWind brand theme by setting data-fw-theme on <html>.
 * Uses Storybook's useEffect (storybook/preview-api) — NOT React's useEffect —
 * so the decorator properly re-runs when the toolbar global changes.
 * Production consumers import the theme CSS directly (no decorator needed).
 */
const withFluxWindTheme: Decorator = (StoryFn, context) => {
  const fwTheme =
    (context.globals.fwTheme as string | undefined) ?? "default";

  storybookEffect(() => {
    const html = document.documentElement;
    if (!fwTheme || fwTheme === "default") {
      html.removeAttribute("data-fw-theme");
    } else {
      html.setAttribute("data-fw-theme", fwTheme);
    }
    return () => {
      html.removeAttribute("data-fw-theme");
    };
  }, [fwTheme]);

  return StoryFn(context);
};

const preview: Preview = {
  globalTypes: {
    fwTheme: {
      description: "FluxWind brand theme",
      toolbar: {
        title: "Brand Theme",
        icon: "paintbrush",
        items: [
          {
            value: "default",
            title: "Default (tech/SaaS)",
            icon: "circlehollow",
          },
          { value: "health", title: "Health", icon: "circlehollow" },
          { value: "legal", title: "Legal", icon: "circlehollow" },
          { value: "commerce", title: "Commerce", icon: "circlehollow" },
          { value: "finance", title: "Finance", icon: "circlehollow" },
          { value: "creative", title: "Creative", icon: "circlehollow" },
          { value: "education", title: "Education", icon: "circlehollow" },
          {
            value: "high-contrast",
            title: "High Contrast ♿",
            icon: "accessibility",
          },
        ],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: {
    fwTheme: "default",
  },
  parameters: {
    a11y: {
      config: {
        rules: [{ id: "color-contrast", enabled: true }],
      },
    },
    backgrounds: { disable: true },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    layout: "centered",
  },
  decorators: [
    withFluxWindTheme,
    withThemeByDataAttribute({
      themes: {
        light: "light",
        dark: "dark",
      },
      defaultTheme: "light",
      attributeName: "data-theme",
      parentSelector: "html",
    }),
  ],
};

export default preview;
