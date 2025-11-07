import { useEffect } from 'react';
import { announce } from '../store';

/**
 * Hook to announce messages to screen readers
 */
export const useAriaLive = () => {
  return {
    /**
     * Announce a polite message
     */
    announcePolite: (message: string) => {
      announce(message, 'polite');
    },
    /**
     * Announce an assertive message
     */
    announceAssertive: (message: string) => {
      announce(message, 'assertive');
    },
  };
};

/**
 * Hook to announce a message on mount or when dependencies change
 */
export const useAnnouncement = (
  message: string | undefined,
  politeness: 'polite' | 'assertive' = 'polite',
  deps: React.DependencyList = []
): void => {
  useEffect(() => {
    if (message) {
      announce(message, politeness);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
};
