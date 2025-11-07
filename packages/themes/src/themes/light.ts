/**
 * Light theme for Fluxwind UI
 * Default theme with bright, clean aesthetics
 */

import { colorTokens } from '../tokens/colors';

export const lightTheme = {
  name: 'light',

  colors: {
    // ===== BACKGROUNDS =====
    background: {
      base: colorTokens.white,
      elevated: colorTokens.gray[50],
      sunken: colorTokens.gray[100],
      overlay: 'rgba(0, 0, 0, 0.5)',
    },

    // ===== SURFACES =====
    surface: {
      base: colorTokens.white,
      raised: colorTokens.gray[50],
      overlay: colorTokens.white,
    },

    // ===== TEXT =====
    text: {
      primary: colorTokens.gray[900],
      secondary: colorTokens.gray[600],
      tertiary: colorTokens.gray[500],
      disabled: colorTokens.gray[400],
      inverted: colorTokens.white,
      link: colorTokens.blue[600],
      linkHover: colorTokens.blue[700],
    },

    // ===== BORDERS =====
    border: {
      default: colorTokens.gray[200],
      hover: colorTokens.gray[300],
      focus: colorTokens.blue[500],
      disabled: colorTokens.gray[200],
      error: colorTokens.red[500],
      success: colorTokens.green[500],
      warning: colorTokens.yellow[500],
    },

    // ===== PRIMARY (Brand) =====
    primary: {
      50: colorTokens.blue[50],
      100: colorTokens.blue[100],
      200: colorTokens.blue[200],
      300: colorTokens.blue[300],
      400: colorTokens.blue[400],
      500: colorTokens.blue[500],
      600: colorTokens.blue[600],
      700: colorTokens.blue[700],
      800: colorTokens.blue[800],
      900: colorTokens.blue[900],
      950: colorTokens.blue[950],

      // Semantic
      main: colorTokens.blue[600],
      hover: colorTokens.blue[700],
      active: colorTokens.blue[800],
      text: colorTokens.white,
      subtle: colorTokens.blue[50],
    },

    // ===== SECONDARY =====
    secondary: {
      50: colorTokens.gray[50],
      100: colorTokens.gray[100],
      200: colorTokens.gray[200],
      300: colorTokens.gray[300],
      400: colorTokens.gray[400],
      500: colorTokens.gray[500],
      600: colorTokens.gray[600],
      700: colorTokens.gray[700],
      800: colorTokens.gray[800],
      900: colorTokens.gray[900],
      950: colorTokens.gray[950],

      // Semantic
      main: colorTokens.gray[600],
      hover: colorTokens.gray[700],
      active: colorTokens.gray[800],
      text: colorTokens.white,
      subtle: colorTokens.gray[100],
    },

    // ===== SUCCESS =====
    success: {
      50: colorTokens.green[50],
      100: colorTokens.green[100],
      200: colorTokens.green[200],
      300: colorTokens.green[300],
      400: colorTokens.green[400],
      500: colorTokens.green[500],
      600: colorTokens.green[600],
      700: colorTokens.green[700],
      800: colorTokens.green[800],
      900: colorTokens.green[900],
      950: colorTokens.green[950],

      // Semantic
      main: colorTokens.green[600],
      hover: colorTokens.green[700],
      active: colorTokens.green[800],
      text: colorTokens.white,
      subtle: colorTokens.green[50],
    },

    // ===== ERROR =====
    error: {
      50: colorTokens.red[50],
      100: colorTokens.red[100],
      200: colorTokens.red[200],
      300: colorTokens.red[300],
      400: colorTokens.red[400],
      500: colorTokens.red[500],
      600: colorTokens.red[600],
      700: colorTokens.red[700],
      800: colorTokens.red[800],
      900: colorTokens.red[900],
      950: colorTokens.red[950],

      // Semantic
      main: colorTokens.red[600],
      hover: colorTokens.red[700],
      active: colorTokens.red[800],
      text: colorTokens.white,
      subtle: colorTokens.red[50],
    },

    // ===== WARNING =====
    warning: {
      50: colorTokens.yellow[50],
      100: colorTokens.yellow[100],
      200: colorTokens.yellow[200],
      300: colorTokens.yellow[300],
      400: colorTokens.yellow[400],
      500: colorTokens.yellow[500],
      600: colorTokens.yellow[600],
      700: colorTokens.yellow[700],
      800: colorTokens.yellow[800],
      900: colorTokens.yellow[900],
      950: colorTokens.yellow[950],

      // Semantic
      main: colorTokens.yellow[500],
      hover: colorTokens.yellow[600],
      active: colorTokens.yellow[700],
      text: colorTokens.gray[900],
      subtle: colorTokens.yellow[50],
    },

    // ===== INFO =====
    info: {
      50: colorTokens.cyan[50],
      100: colorTokens.cyan[100],
      200: colorTokens.cyan[200],
      300: colorTokens.cyan[300],
      400: colorTokens.cyan[400],
      500: colorTokens.cyan[500],
      600: colorTokens.cyan[600],
      700: colorTokens.cyan[700],
      800: colorTokens.cyan[800],
      900: colorTokens.cyan[900],
      950: colorTokens.cyan[950],

      // Semantic
      main: colorTokens.cyan[600],
      hover: colorTokens.cyan[700],
      active: colorTokens.cyan[800],
      text: colorTokens.white,
      subtle: colorTokens.cyan[50],
    },

    // ===== STATES =====
    state: {
      hover: 'rgba(0, 0, 0, 0.04)',
      active: 'rgba(0, 0, 0, 0.08)',
      selected: 'rgba(59, 130, 246, 0.08)', // primary with opacity
      focus: 'rgba(59, 130, 246, 0.12)',
      disabled: 'rgba(0, 0, 0, 0.12)',
    },

    // ===== INTERACTIVE =====
    interactive: {
      default: colorTokens.gray[100],
      hover: colorTokens.gray[200],
      active: colorTokens.gray[300],
    },
  },
} as const;

export type LightTheme = typeof lightTheme;
