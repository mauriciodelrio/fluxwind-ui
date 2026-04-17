---
"@fluxwind/core": patch
---

fix(core): include dist/styles/index.css in build output

The `copy:themes` script only copied theme override files but never copied
`src/styles/index.css` to `dist/styles/index.css`. The package.json exports
map already declared `"./styles"` pointing to that file, so importing
`@fluxwind/core/styles` resolved to a non-existent file.

Renamed script to `copy:styles` and added the missing copy step so base
design tokens (`--color-fw-background`, `--color-fw-foreground`, etc.)
are available to consumers.
