/**
 * Z-Index tokens for Fluxwind UI
 * Consistent stacking order for UI layers
 */

export const zIndexTokens = {
  // Negative (behind content)
  hide: -1,
  behind: -1,

  // Base layer
  base: 0,
  auto: 'auto',

  // Above base content
  docked: 10,
  raised: 20,

  // Dropdowns and popovers
  dropdown: 1000,
  select: 1000,

  // Sticky elements
  sticky: 1100,
  banner: 1100,

  // Fixed elements
  fixed: 1200,
  header: 1200,
  footer: 1200,

  // Overlays
  overlay: 1300,
  backdrop: 1300,

  // Modals and dialogs
  modal: 1400,
  dialog: 1400,
  drawer: 1400,

  // Popovers (above modals)
  popover: 1500,
  menu: 1500,

  // Tooltips
  tooltip: 1600,

  // Toast notifications
  toast: 1700,
  notification: 1700,
  snackbar: 1700,

  // Maximum (always on top)
  max: 9999,
  debug: 10000, // For debugging overlays
} as const;

/**
 * Semantic z-index tokens for specific components
 */
export const semanticZIndex = {
  // Navigation
  navbar: zIndexTokens.header,
  sidebar: zIndexTokens.fixed,

  // Overlays
  modalBackdrop: zIndexTokens.backdrop,
  modalContent: zIndexTokens.modal,

  // Floating UI
  dropdown: zIndexTokens.dropdown,
  tooltip: zIndexTokens.tooltip,
  popover: zIndexTokens.popover,

  // Notifications
  toast: zIndexTokens.toast,
  alert: zIndexTokens.notification,

  // Sticky elements
  stickyHeader: zIndexTokens.sticky,
  floatingActionButton: zIndexTokens.raised,
} as const;

export type ZIndex = keyof typeof zIndexTokens;
