/* eslint-env node */
module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat',
        'fix',
        'docs',
        'style',
        'refactor',
        'perf',
        'test',
        'build',
        'ci',
        'chore',
        'revert',
      ],
    ],
    // Enforce allowed scopes for better organization
    'scope-enum': [
      2,
      'always',
      [
        // Package scopes
        'core', // @fluxwind-ui/core - React components
        'themes', // @fluxwind-ui/themes - Design tokens and themes
        'utils', // @fluxwind-ui/utils - Utility functions

        // Component scopes (when needed for granularity)
        'button',
        'input',
        'select',
        'checkbox',
        'radio',
        'switch',
        'slider',
        'dropdown',
        'modal',
        'dialog',
        'tooltip',
        'popover',
        'toast',
        'alert',
        'badge',
        'avatar',
        'card',
        'table',
        'tabs',
        'accordion',
        'breadcrumb',
        'pagination',
        'menu',
        'sidebar',
        'navbar',
        'footer',
        'form',
        'datepicker',
        'timepicker',
        'calendar',
        'progress',
        'spinner',
        'skeleton',

        // Feature/Area scopes
        'a11y', // Accessibility improvements
        'i18n', // Internationalization
        'animation', // Animation system
        'tokens', // Design tokens
        'signals', // Signal system
        'hooks', // React hooks
        'types', // TypeScript types
        'icons', // Icon system
        'layout', // Layout components

        // Infrastructure scopes
        'deps', // Dependencies
        'dx', // Developer experience
        'config', // Configuration files
        'scripts', // Build/dev scripts
        'ci', // CI/CD
        'release', // Release process
        'security', // Security fixes/improvements

        // Documentation scopes
        'docs', // General documentation
        'storybook', // Storybook stories
        'examples', // Example applications
        'playground', // Playground app
        'contributing', // Contributing guide
        'readme', // README files
        'changelog', // CHANGELOG files

        // Monorepo scopes
        'monorepo', // Monorepo configuration
        'workspace', // Workspace configuration
      ],
    ],
    'scope-case': [2, 'always', 'lower-case'],
    'subject-case': [2, 'never', ['start-case', 'pascal-case', 'upper-case']],
    // Scope is optional but recommended
    'scope-empty': [1, 'never'],
  },
};
