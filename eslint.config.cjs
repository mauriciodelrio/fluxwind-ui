const { FlatCompat } = require('@eslint/eslintrc');
const js = require('@eslint/js');
const typescriptEslint = require('typescript-eslint');
const react = require('eslint-plugin-react');
const reactHooks = require('eslint-plugin-react-hooks');
const jsxA11y = require('eslint-plugin-jsx-a11y');
const prettier = require('eslint-config-prettier');

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
});

module.exports = [
  {
    ignores: ['dist', 'node_modules', '.turbo', 'storybook-static', 'build', '.next', 'out', '**/*.config.cjs', '**/*.config.js'],
  },
  js.configs.recommended,
  ...typescriptEslint.configs.recommended,
  ...compat.extends('plugin:react/recommended', 'plugin:react-hooks/recommended'),
  prettier,
  {
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      parser: typescriptEslint.parser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        console: 'readonly',
        process: 'readonly',
        __dirname: 'readonly',
        __filename: 'readonly',
        module: 'readonly',
        require: 'readonly',
        exports: 'readonly',
        Buffer: 'readonly',
        setTimeout: 'readonly',
        clearTimeout: 'readonly',
        setInterval: 'readonly',
        clearInterval: 'readonly',
        document: 'readonly',
        window: 'readonly',
        navigator: 'readonly',
      },
    },
    plugins: {
      '@typescript-eslint': typescriptEslint.plugin,
      react,
      'react-hooks': reactHooks,
      'jsx-a11y': jsxA11y,
    },
    rules: {
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
        },
      ],
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/consistent-type-imports': [
        'warn',
        {
          prefer: 'type-imports',
        },
      ],
    },
  },
  // Special rules for signals bridge file - signals are meant to be mutated
  {
    files: ['**/internal/signals.ts'],
    rules: {
      // Disable React hooks rules that conflict with signals API
      // Signals are designed to be mutated, which is their core feature
      'react-hooks/rules-of-hooks': 'off',
      'react-hooks/exhaustive-deps': 'off',
    },
  },
];
