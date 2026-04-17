import { resolve } from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import dts from "vite-plugin-dts";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    dts({
      include: ["src"],
      exclude: ["src/**/*.test.*", "src/**/*.stories.*", "src/test"],
      rollupTypes: true,
      insertTypesEntry: true,
    }),
  ],
  resolve: {
    alias: { "@": resolve(__dirname, "src") },
  },
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      formats: ["es"],
      fileName: "index",
    },
    rollupOptions: {
      // React, react-dom, and other peer deps — never bundle them.
      // @radix-ui/react-slot must be external so bundlers (e.g. Turbopack)
      // can resolve its ESM entry directly instead of a bundled CJS shim.
      external: [
        "react",
        "react-dom",
        "react/jsx-runtime",
        "@radix-ui/react-slot",
      ],
      output: {
        // CSS output path — consumers import '@fluxwind-ui/core/styles'
        assetFileNames: "styles/[name][extname]",
      },
    },
    cssCodeSplit: false,
  },
});
