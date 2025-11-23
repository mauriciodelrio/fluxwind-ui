/**
 * Input Types
 *
 * TypeScript type definitions for Input component.
 *
 * @module @fluxwind/core/components
 */

import type { ComponentConfig } from '../../../config/schema.types';

export interface InputProps extends React.HTMLAttributes<HTMLElement> {
  /** Content of the input */
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
