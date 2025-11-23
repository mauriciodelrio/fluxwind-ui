/**
 * Text Types
 *
 * TypeScript type definitions for Text component.
 *
 * @module @fluxwind/core/components
 */

import type { ComponentConfig } from '../../../config/schema.types';

export interface TextProps extends React.HTMLAttributes<HTMLElement> {
  /** Content of the text */
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
