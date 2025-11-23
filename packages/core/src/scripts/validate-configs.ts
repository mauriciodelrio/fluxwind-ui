#!/usr/bin/env node
/**
 * Component Configuration Validator
 *
 * CLI tool to validate all component JSON configurations.
 * Ensures schema compliance and theme token usage.
 *
 * Usage:
 *   pnpm validate:configs
 *   pnpm validate:configs --verbose
 *   pnpm validate:configs --component Button
 *
 * @module @fluxwind/core/scripts
 */

import { readFileSync, readdirSync, statSync } from 'fs';
import { join, basename } from 'path';
import { validateComponentConfig, formatValidationErrors } from '../config/schema.validation';
import { validateThemeCompliance } from '../config/config-loader';

interface ValidationOptions {
  verbose?: boolean;
  component?: string;
  exitOnError?: boolean;
}

interface ValidationResult {
  component: string;
  path: string;
  valid: boolean;
  errors: string[];
  themeViolations: string[];
}

/**
 * Find all .config.json files in components directory
 */
function findConfigFiles(baseDir: string): string[] {
  const configFiles: string[] = [];
  const componentsDir = join(baseDir, 'components');

  function traverse(dir: string) {
    const entries = readdirSync(dir);

    for (const entry of entries) {
      const fullPath = join(dir, entry);
      const stat = statSync(fullPath);

      if (stat.isDirectory()) {
        traverse(fullPath);
      } else if (entry.endsWith('.config.json')) {
        configFiles.push(fullPath);
      }
    }
  }

  traverse(componentsDir);
  return configFiles;
}

/**
 * Validate a single config file
 */
function validateConfigFile(filePath: string): ValidationResult {
  const componentName = basename(filePath, '.config.json');

  try {
    const content = readFileSync(filePath, 'utf-8');
    const config = JSON.parse(content);

    // Zod schema validation
    const schemaResult = validateComponentConfig(config);
    const errors: string[] = [];

    if (!schemaResult.success) {
      errors.push(...formatValidationErrors(schemaResult.error));
    }

    // Theme compliance validation
    const themeViolations = validateThemeCompliance(config);

    return {
      component: componentName,
      path: filePath,
      valid: schemaResult.success && themeViolations.length === 0,
      errors,
      themeViolations,
    };
  } catch (error) {
    return {
      component: componentName,
      path: filePath,
      valid: false,
      errors: [`Failed to parse JSON: ${error instanceof Error ? error.message : String(error)}`],
      themeViolations: [],
    };
  }
}

/**
 * Print validation results
 */
function printResults(results: ValidationResult[], options: ValidationOptions): void {
  const valid = results.filter((r) => r.valid);
  const invalid = results.filter((r) => !r.valid);

  console.log('\n🔍 Component Configuration Validation\n');
  console.log('═'.repeat(50));

  if (valid.length > 0) {
    console.log(`\n✅ Valid (${valid.length}):`);
    if (options.verbose) {
      valid.forEach((r) => {
        console.log(`   ${r.component} (${r.path})`);
      });
    } else {
      console.log(`   ${valid.map((r) => r.component).join(', ')}`);
    }
  }

  if (invalid.length > 0) {
    console.log(`\n❌ Invalid (${invalid.length}):\n`);

    invalid.forEach((r) => {
      console.log(`   ${r.component}:`);
      console.log(`   Path: ${r.path}`);

      if (r.errors.length > 0) {
        console.log('   Schema Errors:');
        r.errors.forEach((err) => console.log(`      • ${err}`));
      }

      if (r.themeViolations.length > 0) {
        console.log('   Theme Violations:');
        r.themeViolations.forEach((v) => console.log(`      • ${v}`));
      }

      console.log('');
    });
  }

  console.log('═'.repeat(50));
  console.log(`\n📊 Summary: ${valid.length}/${results.length} configs valid\n`);

  if (invalid.length === 0) {
    console.log('🎉 All component configurations are valid!\n');
  } else {
    console.log(`⚠️  ${invalid.length} configuration(s) need attention.\n`);
  }
}

/**
 * Main validation function
 */
function main() {
  const args = process.argv.slice(2);
  const componentArg = args.find((arg) => arg.startsWith('--component='))?.split('=')[1];

  const options: ValidationOptions = {
    verbose: args.includes('--verbose') || args.includes('-v'),
    ...(componentArg && { component: componentArg }),
    exitOnError: !args.includes('--no-exit'),
  };

  const srcDir = join(__dirname, '..');
  const configFiles = findConfigFiles(srcDir);

  if (configFiles.length === 0) {
    console.error('❌ No configuration files found!');
    process.exit(1);
  }

  // Filter by component if specified
  let filesToValidate = configFiles;
  if (options.component) {
    filesToValidate = configFiles.filter((f) => f.includes(`/${options.component}/`));

    if (filesToValidate.length === 0) {
      console.error(`❌ Component "${options.component}" not found!`);
      process.exit(1);
    }
  }

  console.log(`\n🔎 Validating ${filesToValidate.length} configuration file(s)...`);

  const results = filesToValidate.map(validateConfigFile);
  printResults(results, options);

  const hasErrors = results.some((r) => !r.valid);

  if (hasErrors && options.exitOnError) {
    process.exit(1);
  }

  process.exit(0);
}

// Run if executed directly
if (require.main === module) {
  main();
}

export { main, validateConfigFile, findConfigFiles };
