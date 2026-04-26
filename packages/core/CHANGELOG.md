# Changelog

## [0.7.0](https://github.com/mauriciodelrio/fluxwind-ui/compare/v0.6.1...v0.7.0) (2026-04-26)

In version 0.7.0, the library expands its component inventory to a total of 49, introducing new atoms, molecules, and organisms, including the CalendarBooking and CalendarManager features for enhanced scheduling capabilities. Notable additions include the CalendarDayCell and CalendarMonthPicker, which provide users with a more robust calendar interface. Additionally, the README has been updated to reflect these changes, ensuring users have the latest information on available components.

### Pull Requests

- [#18](https://github.com/mauriciodelrio/fluxwind-ui/pull/18) feat(core): add CalendarManager organism
- [#19](https://github.com/mauriciodelrio/fluxwind-ui/pull/19) feat(core): add CalendarBooking organism with 3-step modal flow
- [#20](https://github.com/mauriciodelrio/fluxwind-ui/pull/20) docs(readme): update component inventory to 49 components

## [0.6.1](https://github.com/mauriciodelrio/fluxwind-ui/compare/v0.6.0...v0.6.1) (2026-04-25)

In version 0.6.1, the `Combobox` component has been enhanced to support multi-select functionality, allowing users to select multiple options, create new entries, and group selections, all while maintaining backward compatibility with single-select use. This update introduces a more versatile user experience with dismissable `Chip` atoms for selected values, ensuring a seamless interface for managing selections.

### Pull Requests

- [#17](https://github.com/mauriciodelrio/fluxwind-ui/pull/17) feat(combobox): add multi-select, groups, creatable and maxSelections

## [0.6.0](https://github.com/mauriciodelrio/fluxwind-ui/compare/v0.5.1...v0.6.0) (2026-04-25)

In version 0.6.0, new components enhance the design system's functionality and accessibility. The addition of the `FieldGroup` molecule provides a semantic wrapper for related form controls, while the `Accordion` atom introduces a collapsible disclosure feature using native elements. Users can now utilize the `Gauge` atom for semantic measurement and the `StatusText` atom for live region announcements, improving user experience for screen reader users. Additionally, the deployment process for Storybook has been streamlined with manual deployment capabilities to Vercel.

### Pull Requests

- [#12](https://github.com/mauriciodelrio/fluxwind-ui/pull/12) ci(storybook): manual deploy to Vercel via workflow_dispatch
- [#13](https://github.com/mauriciodelrio/fluxwind-ui/pull/13) feat(status-text): add StatusText atom
- [#14](https://github.com/mauriciodelrio/fluxwind-ui/pull/14) feat(gauge): add Gauge atom wrapping native meter element
- [#15](https://github.com/mauriciodelrio/fluxwind-ui/pull/15) feat(accordion): add Accordion atom with compound details/summary pattern
- [#16](https://github.com/mauriciodelrio/fluxwind-ui/pull/16) feat(field-group): add FieldGroup molecule

## [0.5.1](https://github.com/mauriciodelrio/fluxwind-ui/compare/v0.5.0...v0.5.1) (2026-04-18)

In version 0.5.1, the tab component has been enhanced for improved mobile usability, now allowing horizontal scrolling when there are six or more tabs. This update ensures that users can easily navigate through tabs without content overflow, providing a smoother experience on mobile devices.

### Pull Requests

- [#11](https://github.com/mauriciodelrio/fluxwind-ui/pull/11) fix(tabs): make tablist horizontally scrollable on mobile

## [0.5.0](https://github.com/mauriciodelrio/fluxwind-ui/compare/v0.4.4...v0.5.0) (2026-04-18)

In version 0.5.0, two new components have been introduced: the List atom and the Modal organism, enhancing the design system's atomic structure. The List component allows for flexible rendering of ordered and unordered lists, complete with customizable item variants and size options. Additionally, the Modal organism provides a robust solution for creating accessible dialog windows, further improving user experience and interaction.

### Pull Requests

- [#10](https://github.com/mauriciodelrio/fluxwind-ui/pull/10) feat(core): add List atom and Modal organism

## [0.4.4](https://github.com/mauriciodelrio/fluxwind-ui/compare/v0.4.2...v0.4.4) (2026-04-17)

In version 0.4.4, we improved the handling of industry themes by fixing the CSS cascade, ensuring that theme tokens are correctly scoped via attribute selectors. This enhancement prevents conflicts when multiple themes are imported, allowing for a more predictable and consistent styling experience. Additionally, we have shipped pre-compiled CSS to streamline the integration process for users.

### Pull Requests

- [#9](https://github.com/mauriciodelrio/fluxwind-ui/pull/9) fix(core): scope industry themes via attribute selector and ship pre-compiled CSS

## [0.4.2](https://github.com/mauriciodelrio/fluxwind-ui/compare/v0.4.0...v0.4.2) (2026-04-17)

In version 0.4.2, we improved the developer experience by refining the industry theme CSS files to eliminate the use of `:root` selectors, ensuring that styles are now scoped exclusively via `[data-fw-theme]`. This change resolves CSS cascade conflicts that previously required users to manage import order, allowing for a more seamless integration of multiple themes without unexpected overrides.

### Pull Requests

- [#8](https://github.com/mauriciodelrio/fluxwind-ui/pull/8) fix(core): remove :root from industry theme files — scope via [data-fw-theme] only

## [0.4.0](https://github.com/mauriciodelrio/fluxwind-ui/compare/v0.3.5...v0.4.0) (2026-04-17)

In version 0.4.0, a new `ThemeScope` component has been introduced, allowing users to apply scoped brand theming to specific sections of their applications without altering the global theme. This feature enhances design flexibility by supporting six distinct industry themes, ensuring a more tailored user experience. Additionally, updates to the CSS selectors improve theme application consistency across different contexts.

### Pull Requests

- [#7](https://github.com/mauriciodelrio/fluxwind-ui/pull/7) feat(core): add ThemeScope component for scoped brand theming

## [0.3.5](https://github.com/mauriciodelrio/fluxwind-ui/compare/v0.3.4...v0.3.5) (2026-04-17)

In version 0.3.5, we addressed a console warning related to theme switching in the CodeBlock component by ensuring consistent use of the `backgroundColor` property instead of mixing it with shorthand CSS. This improvement enhances the overall stability and user experience when toggling between light and dark modes.

### Pull Requests

- [#6](https://github.com/mauriciodelrio/fluxwind-ui/pull/6) fix(core): use backgroundColor longhand in CodeBlock to fix theme-switch warning

## [0.3.4](https://github.com/mauriciodelrio/fluxwind-ui/compare/v0.3.3...v0.3.4) (2026-04-17)

In version 0.3.4, the build output now correctly includes the essential `dist/styles/index.css` file, ensuring that all base design tokens are available for use. This fix addresses a previous oversight where the file was missing despite being declared in the package configuration, enhancing the overall usability and accessibility of the components.

### Pull Requests

- [#5](https://github.com/mauriciodelrio/fluxwind-ui/pull/5) fix(core): include dist/styles/index.css in build output

## [0.3.3](https://github.com/mauriciodelrio/fluxwind-ui/compare/v0.3.2...v0.3.3) (2026-04-17)

In version 0.3.3, we have improved the build process by externalizing all dependencies, effectively eliminating the need for a CommonJS require shim that caused issues with certain bundlers. This enhancement ensures smoother integration and compatibility, particularly with tools like Turbopack, while maintaining the integrity of your projects. Users can expect a more streamlined experience without the complications of transitive dependencies affecting their builds.

### Pull Requests

- [#4](https://github.com/mauriciodelrio/fluxwind-ui/pull/4) fix(core): externalize all deps to eliminate rolldown CJS require shim

## [0.3.2](https://github.com/mauriciodelrio/fluxwind-ui/compare/v0.3.1...v0.3.2) (2026-04-17)

_No pull requests found for this release._

## [0.3.1](https://github.com/mauriciodelrio/fluxwind-ui/compare/v0.3.0...v0.3.1) (2026-04-17)

_No pull requests found for this release._

## [0.3.0](https://github.com/mauriciodelrio/fluxwind-ui/compare/v0.2.2...v0.3.0) (2026-04-17)

In version 0.3.0, new components have been introduced, including the Logo and Link atoms, enhancing the design system's versatility. The Button component now features an `asChild` prop that allows for seamless integration with other elements while maintaining valid HTML structure. Additionally, accessibility improvements have been made, ensuring that all new components meet WCAG 2.2 AA standards.

### Pull Requests

- [#3](https://github.com/mauriciodelrio/fluxwind-ui/pull/3) feat(core): add Button.asChild, Logo atom, and Link atom

## [0.2.2](https://github.com/mauriciodelrio/fluxwind-ui/compare/v0.2.1...v0.2.2) (2026-04-16)

In version 0.2.2, users will benefit from a crucial bug fix that ensures the proper export of package styles, enhancing the overall stability and usability of the components. This update reinforces our commitment to providing a seamless experience while maintaining strict TypeScript standards and accessibility compliance.

### Pull Requests

- [#2](https://github.com/mauriciodelrio/fluxwind-ui/pull/2) Fix/package styles export

## [0.2.1](https://github.com/mauriciodelrio/fluxwind-ui/compare/v0.2.0...v0.2.1) (2026-04-16)

_No pull requests found for this release._

## [0.2.0](https://github.com/mauriciodelrio/fluxwind-ui/compare/v0.1.4...v0.2.0) (2026-04-16)

### Pull Requests

- [#1](https://github.com/mauriciodelrio/fluxwind-ui/pull/1) feat(organisms): add ComponentShowcase compound component

## [0.1.4](https://github.com/mauriciodelrio/fluxwind-ui/compare/v0.1.3...v0.1.4) (2026-04-16)

_No pull requests found for this release._

## [0.1.3](https://github.com/mauriciodelrio/fluxwind-ui/compare/v0.1.2...v0.1.3) (2026-04-16)

_No pull requests found for this release._

## [0.1.2](https://github.com/mauriciodelrio/fluxwind-ui/compare/v0.1.1...v0.1.2) (2026-04-16)

_No pull requests found for this release._

## [0.1.1](https://github.com/mauriciodelrio/fluxwind-ui/releases/tag/v0.1.1) (2026-04-16)

_No pull requests found for this release._
