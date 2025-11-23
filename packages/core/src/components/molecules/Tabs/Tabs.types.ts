/**
 * Tabs Types
 *
 * TypeScript type definitions for Tabs component.
 *
 * @module @fluxwind/core/components
 */

import type { ComponentConfig } from '../../../config/schema.types';

export interface TabsProps extends React.HTMLAttributes<HTMLElement> {
  /** Content of the tabs */
  children?: React.ReactNode;

  /** Additional CSS classes */
  className?: string;

  /** Size variant */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

  /** Visual variant */
  variant?: 'default' | 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info';

  /** Override sizing mode */
  sizeMode?: ComponentConfig['sizing']['mode'];
}
