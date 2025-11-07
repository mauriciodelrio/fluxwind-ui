/**
 * Dark theme for Fluxwind UI
 * Modern dark mode with OLED-friendly deep blacks
 */

import { colorTokens } from '../tokens/colors';

export const darkTheme = {
  name: 'dark',

  colors: {
    // ===== BACKGROUNDS =====
    background: {
      base: colorTokens.gray[950],
      elevated: colorTokens.gray[900],
      sunken: colorTokens.black,
      overlay: 'rgba(0, 0, 0, 0.75)',
    },

    // ===== SURFACES =====
    surface: {
      base: colorTokens.gray[900],
      raised: colorTokens.gray[800],
      overlay: colorTokens.gray[900],
    },

    // ===== TEXT =====
    text: {
      primary: colorTokens.gray[50],
      secondary: colorTokens.gray[400],
      tertiary: colorTokens.gray[500],
      disabled: colorTokens.gray[600],
      inverted: colorTokens.gray[900],
      link: colorTokens.blue[400],
      linkHover: colorTokens.blue[300],
    },

    // ===== BORDERS =====
    border: {
      default: colorTokens.gray[800],
      hover: colorTokens.gray[700],
      focus: colorTokens.blue[500],
      disabled: colorTokens.gray[800],
      error: colorTokens.red[500],
      success: colorTokens.green[500],
      warning: colorTokens.yellow[500],
    },

    // ===== PRIMARY (Brand) =====
    primary: {
      50: colorTokens.blue[950],
      100: colorTokens.blue[900],
      200: colorTokens.blue[800],
      300: colorTokens.blue[700],
      400: colorTokens.blue[600],
      500: colorTokens.blue[500],
      600: colorTokens.blue[400],
      700: colorTokens.blue[300],
      800: colorTokens.blue[200],
      900: colorTokens.blue[100],
      950: colorTokens.blue[50],

      // Semantic (lighter in dark mode for contrast)
      main: colorTokens.blue[500],
      hover: colorTokens.blue[400],
      active: colorTokens.blue[300],
      text: colorTokens.gray[900],
      subtle: colorTokens.blue[950],
    },

    // ===== SECONDARY =====
    secondary: {
      50: colorTokens.gray[950],
      100: colorTokens.gray[900],
      200: colorTokens.gray[800],
      300: colorTokens.gray[700],
      400: colorTokens.gray[600],
      500: colorTokens.gray[500],
      600: colorTokens.gray[400],
      700: colorTokens.gray[300],
      800: colorTokens.gray[200],
      900: colorTokens.gray[100],
      950: colorTokens.gray[50],

      // Semantic
      main: colorTokens.gray[500],
      hover: colorTokens.gray[400],
      active: colorTokens.gray[300],
      text: colorTokens.gray[900],
      subtle: colorTokens.gray[900],
    },

    // ===== SUCCESS =====
    success: {
      50: colorTokens.green[950],
      100: colorTokens.green[900],
      200: colorTokens.green[800],
      300: colorTokens.green[700],
      400: colorTokens.green[600],
      500: colorTokens.green[500],
      600: colorTokens.green[400],
      700: colorTokens.green[300],
      800: colorTokens.green[200],
      900: colorTokens.green[100],
      950: colorTokens.green[50],

      // Semantic
      main: colorTokens.green[500],
      hover: colorTokens.green[400],
      active: colorTokens.green[300],
      text: colorTokens.gray[900],
      subtle: colorTokens.green[950],
    },

    // ===== ERROR =====
    error: {
      50: colorTokens.red[950],
      100: colorTokens.red[900],
      200: colorTokens.red[800],
      300: colorTokens.red[700],
      400: colorTokens.red[600],
      500: colorTokens.red[500],
      600: colorTokens.red[400],
      700: colorTokens.red[300],
      800: colorTokens.red[200],
      900: colorTokens.red[100],
      950: colorTokens.red[50],

      // Semantic
      main: colorTokens.red[500],
      hover: colorTokens.red[400],
      active: colorTokens.red[300],
      text: colorTokens.gray[900],
      subtle: colorTokens.red[950],
    },

    // ===== WARNING =====
    warning: {
      50: colorTokens.yellow[950],
      100: colorTokens.yellow[900],
      200: colorTokens.yellow[800],
      300: colorTokens.yellow[700],
      400: colorTokens.yellow[600],
      500: colorTokens.yellow[500],
      600: colorTokens.yellow[400],
      700: colorTokens.yellow[300],
      800: colorTokens.yellow[200],
      900: colorTokens.yellow[100],
      950: colorTokens.yellow[50],

      // Semantic
      main: colorTokens.yellow[500],
      hover: colorTokens.yellow[400],
      active: colorTokens.yellow[300],
      text: colorTokens.gray[900],
      subtle: colorTokens.yellow[950],
    },

    // ===== INFO =====
    info: {
      50: colorTokens.cyan[950],
      100: colorTokens.cyan[900],
      200: colorTokens.cyan[800],
      300: colorTokens.cyan[700],
      400: colorTokens.cyan[600],
      500: colorTokens.cyan[500],
      600: colorTokens.cyan[400],
      700: colorTokens.cyan[300],
      800: colorTokens.cyan[200],
      900: colorTokens.cyan[100],
      950: colorTokens.cyan[50],

      // Semantic
      main: colorTokens.cyan[500],
      hover: colorTokens.cyan[400],
      active: colorTokens.cyan[300],
      text: colorTokens.gray[900],
      subtle: colorTokens.cyan[950],
    },

    // ===== STATES =====
    state: {
      hover: 'rgba(255, 255, 255, 0.04)',
      active: 'rgba(255, 255, 255, 0.08)',
      selected: 'rgba(59, 130, 246, 0.12)', // primary with opacity
      focus: 'rgba(59, 130, 246, 0.16)',
      disabled: 'rgba(255, 255, 255, 0.12)',
    },

    // ===== INTERACTIVE =====
    interactive: {
      default: colorTokens.gray[800],
      hover: colorTokens.gray[700],
      active: colorTokens.gray[600],
    },
  },
} as const;

export type DarkTheme = typeof darkTheme;
