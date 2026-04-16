import { addons } from "storybook/manager-api";

addons.setConfig({
  theme: {
    base: "light" as const,
    brandTitle: "FluxWind UI",
    brandImage: "/logo.svg",
    brandUrl: "https://github.com/mauriciodelrio/fluxwind-ui",
    brandTarget: "_blank",
  },
});
