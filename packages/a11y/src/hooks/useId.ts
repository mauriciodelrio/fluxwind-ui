import { useId as useReactId } from 'react';

/**
 * Generate a unique ID for accessibility
 * Uses React 18's useId hook when available
 */
export const useId = (prefix?: string): string => {
  const id = useReactId();
  return prefix ? `${prefix}-${id}` : id;
};
