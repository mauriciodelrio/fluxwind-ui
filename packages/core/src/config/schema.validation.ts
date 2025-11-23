/**
 * Zod Validation Schemas
 *
 * Runtime validation schemas for component configurations.
 * Ensures type safety and catches configuration errors early.
 *
 * @module @fluxwind/core/config
 */

import { z } from 'zod';

// ===== BASE VALIDATORS =====

const sizeVariantSchema = z.enum(['xs', 'sm', 'md', 'lg', 'xl', '2xl']);
const sizingModeSchema = z.enum(['classic', 'intelligent']);
const componentTypeSchema = z.enum(['atom', 'molecule', 'organism', 'layout']);
const focusStrategySchema = z.enum(['auto', 'manual', 'trap']);

// CSS variable pattern
const cssVariableSchema = z
  .string()
  .regex(/^var\(--[\w-]+\)$/, 'Must be a valid CSS variable: var(--name)');

// ===== SIZE VALUES =====

const sizeValueSchema = z.object({
  height: z.string(),
  minWidth: z.string().optional(),
  maxWidth: z.string().optional(),
  width: z.string().optional(),
});

const responsiveSizeValueSchema = z.object({
  mobile: z.string(),
  tablet: z.string(),
  desktop: z.string(),
});

// ===== SIZING CONFIG =====

const sizingConfigSchema = z.object({
  mode: sizingModeSchema,
  classic: z.object({
    default: sizeVariantSchema,
    values: z.record(sizeVariantSchema, sizeValueSchema),
  }),
  intelligent: z.object({
    mobile: sizeVariantSchema,
    tablet: sizeVariantSchema,
    desktop: sizeVariantSchema,
    values: z.record(sizeVariantSchema, responsiveSizeValueSchema),
  }),
});

// ===== SPACING CONFIG =====

const spacingConfigSchema = z.object({
  padding: z.object({
    x: z.record(sizeVariantSchema, cssVariableSchema),
    y: z.record(sizeVariantSchema, cssVariableSchema),
  }),
  gap: z.record(sizeVariantSchema, cssVariableSchema).optional(),
  margin: z.record(z.string(), z.string()).optional(),
});

// ===== COLORS CONFIG =====

const colorMappingSchema = z.object({
  bg: cssVariableSchema,
  text: cssVariableSchema,
  border: cssVariableSchema,
});

const stateColorModifierSchema = z.object({
  bgOpacity: z.string().optional(),
  textOpacity: z.string().optional(),
  borderOpacity: z.string().optional(),
  scale: z.string().optional(),
  opacity: z.string().optional(),
  cursor: z.string().optional(),
  ringWidth: z.string().optional(),
  ringOffset: z.string().optional(),
  ringColor: cssVariableSchema.optional(),
});

const colorsConfigSchema = z.object({
  variants: z.object({
    primary: colorMappingSchema,
    secondary: colorMappingSchema,
    success: colorMappingSchema,
    error: colorMappingSchema,
    warning: colorMappingSchema,
    info: colorMappingSchema,
    neutral: colorMappingSchema,
  }),
  states: z.object({
    hover: stateColorModifierSchema,
    active: stateColorModifierSchema,
    disabled: stateColorModifierSchema,
    focus: stateColorModifierSchema,
  }),
});

// ===== TYPOGRAPHY CONFIG =====

const typographyConfigSchema = z.object({
  fontFamily: cssVariableSchema,
  fontSize: z.record(sizeVariantSchema, cssVariableSchema),
  fontWeight: z.record(z.string(), z.number()),
  lineHeight: z.record(sizeVariantSchema, z.string()),
  letterSpacing: z.record(z.string(), z.string()).optional(),
});

// ===== BORDERS CONFIG =====

const bordersConfigSchema = z.object({
  width: z.record(z.string(), z.string()),
  radius: z.record(sizeVariantSchema, cssVariableSchema),
  color: z.string(),
});

// ===== SHADOWS CONFIG =====

const shadowsConfigSchema = z.object({
  default: z.union([cssVariableSchema, z.null()]),
  hover: z.union([cssVariableSchema, z.null()]).optional(),
  focus: z.union([cssVariableSchema, z.null()]).optional(),
  active: z.union([cssVariableSchema, z.null()]).optional(),
});

// ===== ANIMATIONS CONFIG =====

const animationConfigSchema = z.object({
  duration: cssVariableSchema,
  easing: cssVariableSchema,
  properties: z.array(z.string()).optional(),
});

const animationsConfigSchema = z.object({
  transition: z.object({
    default: animationConfigSchema,
    hover: animationConfigSchema.optional(),
    active: animationConfigSchema.optional(),
    focus: animationConfigSchema.optional(),
  }),
  keyframes: z
    .object({
      enter: z.string().optional(),
      exit: z.string().optional(),
      loading: z.string().optional(),
    })
    .optional(),
  respectReducedMotion: z.boolean(),
});

// ===== ACCESSIBILITY CONFIG =====

const a11yConfigSchema = z.object({
  role: z.string().optional(),
  ariaLabels: z.record(z.string(), z.string()),
  ariaDescriptions: z.record(z.string(), z.string()).optional(),
  keyboardShortcuts: z.array(z.string()).optional(),
  focusStrategy: focusStrategySchema,
  minimumTouchTarget: z.string(),
});

// ===== INTERNATIONALIZATION CONFIG =====

const i18nConfigSchema = z.object({
  namespace: z.string(),
  defaultTexts: z.record(z.string(), z.string()),
  textProps: z.array(z.string()),
});

// ===== STATES CONFIG =====

const stateConfigSchema = z.object({
  disabled: z.boolean().optional(),
  opacity: z.number().optional(),
  cursor: z.string().optional(),
  pointerEvents: z.string().optional(),
  showSpinner: z.boolean().optional(),
  spinnerPosition: z.enum(['left', 'right']).optional(),
});

const statesConfigSchema = z.object({
  loading: stateConfigSchema.optional(),
  disabled: stateConfigSchema.optional(),
  error: stateConfigSchema.optional(),
  success: stateConfigSchema.optional(),
});

// ===== VARIANTS CONFIG =====

const variantsConfigSchema = z.object({
  appearance: z.array(z.string()),
  size: z.array(z.string()),
  colorScheme: z.array(z.string()).optional(),
  custom: z.record(z.string(), z.array(z.string())).optional(),
});

// ===== METADATA =====

const componentMetadataSchema = z.object({
  name: z.string(),
  type: componentTypeSchema,
  version: z.string(),
  description: z.string(),
  tags: z.array(z.string()).optional(),
});

// ===== MAIN COMPONENT CONFIG =====

export const componentConfigSchema = z.object({
  metadata: componentMetadataSchema,
  sizing: sizingConfigSchema,
  spacing: spacingConfigSchema,
  colors: colorsConfigSchema,
  typography: typographyConfigSchema,
  borders: bordersConfigSchema,
  shadows: shadowsConfigSchema,
  animations: animationsConfigSchema,
  a11y: a11yConfigSchema,
  i18n: i18nConfigSchema,
  states: statesConfigSchema,
  variants: variantsConfigSchema,
});

// ===== VALIDATION FUNCTIONS =====

/**
 * Validate a component configuration
 *
 * @param config - Configuration object to validate
 * @returns Validation result with parsed data or errors
 *
 * @example
 * ```typescript
 * const result = validateComponentConfig(buttonConfig);
 * if (result.success) {
 *   console.log('Valid config:', result.data);
 * } else {
 *   console.error('Validation errors:', result.error.errors);
 * }
 * ```
 */
export function validateComponentConfig(config: unknown) {
  return componentConfigSchema.safeParse(config);
}

/**
 * Validate and throw on error
 *
 * @param config - Configuration object to validate
 * @returns Parsed and validated configuration
 * @throws {z.ZodError} If validation fails
 *
 * @example
 * ```typescript
 * try {
 *   const validConfig = validateComponentConfigStrict(buttonConfig);
 * } catch (error) {
 *   console.error('Invalid config:', error.errors);
 * }
 * ```
 */
export function validateComponentConfigStrict(config: unknown) {
  return componentConfigSchema.parse(config);
}

/**
 * Get human-readable validation errors
 *
 * @param error - Zod validation error
 * @returns Array of formatted error messages
 *
 * @example
 * ```typescript
 * const result = validateComponentConfig(config);
 * if (!result.success) {
 *   const errors = formatValidationErrors(result.error);
 *   errors.forEach(err => console.error(err));
 * }
 * ```
 */
export function formatValidationErrors(error: z.ZodError): string[] {
  return error.issues.map((err) => {
    const path = err.path.join('.');
    return `${path}: ${err.message}`;
  });
}

/**
 * Validate multiple configs and return summary
 *
 * @param configs - Map of component names to configs
 * @returns Validation summary
 *
 * @example
 * ```typescript
 * const summary = validateMultipleConfigs({
 *   Button: buttonConfig,
 *   Input: inputConfig,
 * });
 *
 * console.log(`Valid: ${summary.valid.length}`);
 * console.log(`Invalid: ${summary.invalid.length}`);
 * ```
 */
export function validateMultipleConfigs(configs: Record<string, unknown>) {
  const valid: string[] = [];
  const invalid: Array<{ name: string; errors: string[] }> = [];

  for (const [name, config] of Object.entries(configs)) {
    const result = validateComponentConfig(config);

    if (result.success) {
      valid.push(name);
    } else {
      invalid.push({
        name,
        errors: formatValidationErrors(result.error),
      });
    }
  }

  return { valid, invalid, total: Object.keys(configs).length };
}

// ===== TYPE EXPORTS =====

export type ComponentConfigSchema = z.infer<typeof componentConfigSchema>;
export type SizingConfigSchema = z.infer<typeof sizingConfigSchema>;
export type ColorsConfigSchema = z.infer<typeof colorsConfigSchema>;
