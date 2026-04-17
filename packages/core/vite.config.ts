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
      // Externalize every package import (anything that is not a relative or
      // absolute path from this source tree). This prevents rolldown from
      // bundling CJS deps — which would cause it to emit a `require` polyfill
      // shim that Turbopack rejects with "dynamic usage of require is not
      // supported". Consumers get all deps installed via pnpm normally.
      external: (id) =>
        !id.startsWith(".") && !id.startsWith("/") && !id.startsWith("@/"),
      output: {
        assetFileNames: "styles/[name][extname]",
      },
    },
    cssCodeSplit: false,
  },
});
