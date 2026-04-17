import type {
  Preview,
  Decorator,
  StoryFn,
  StoryContext,
} from "@storybook/react-vite";
import { useEffect } from "react";
import { withThemeByDataAttribute } from "@storybook/addon-themes";
import "../src/styles/index.css";
import "../src/styles/themes/creative.css";
import "../src/styles/themes/commerce.css";
import "../src/styles/themes/education.css";
import "../src/styles/themes/finance.css";
import "../src/styles/themes/health.css";
import "../src/styles/themes/legal.css";
import "../src/styles/themes/high-contrast.css";
import "./preview.css";

function BrandThemeWrapper({
  fwTheme,
  Story,
}: {
  fwTheme: string;
  Story: StoryFn;
}) {
  useEffect(() => {
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

  return <Story />;
}

const withFluxWindTheme: Decorator = (
  Story: StoryFn,
  context: StoryContext,
) => {
  const fwTheme = (context.globals.fwTheme as string | undefined) ?? "default";
  return <BrandThemeWrapper fwTheme={fwTheme} Story={Story} />;
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
