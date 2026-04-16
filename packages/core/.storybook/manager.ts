import { addons } from "storybook/manager-api";
import { create } from "storybook/theming";

// `create()` fills in ALL required ThemeVars from the base theme (including
// color values that polished's opacify() needs). Passing a partial object
// directly to addons.setConfig() causes a PolishedError because ensure()
// destructures fields like `appBorderColor` as undefined, then passes them
// to opacify() which throws "Couldn't parse the color string."
addons.setConfig({
  theme: create({
    base: "light",
    brandTitle: "FluxWind UI",
    brandImage: "/logo.svg",
    brandUrl: "https://github.com/mauriciodelrio/fluxwind-ui",
    brandTarget: "_blank",
  }),
});
