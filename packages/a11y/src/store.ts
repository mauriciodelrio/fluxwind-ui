import { signal, computed } from '@preact/signals-core';

/**
 * Standard accessibility preferences that can be detected from user's system
 * or set programmatically
 */
export interface A11yPreferences {
  /** Prefers reduced motion animations */
  reducedMotion: boolean;
  /** Prefers high contrast mode */
  highContrast: boolean;
  /** Screen reader is active */
  screenReaderActive: boolean;
  /** Show focus indicators */
  focusVisible: boolean;
  /** Prefers dark color scheme */
  prefersDark: boolean;
  /** Prefers reduced transparency */
  reducedTransparency: boolean;
  /** Text direction (for RTL languages) */
  direction: 'ltr' | 'rtl';
  /** Custom preferences (extensible) */
  custom: Record<string, boolean | string | number>;
}

/**
 * Live region announcement for screen readers
 */
export interface Announcement {
  id: string;
  message: string;
  politeness: 'polite' | 'assertive';
  timestamp: number;
}

// Default preferences
const defaultPreferences: A11yPreferences = {
  reducedMotion: false,
  highContrast: false,
  screenReaderActive: false,
  focusVisible: true,
  prefersDark: false,
  reducedTransparency: false,
  direction: 'ltr',
  custom: {},
};

// Detect system preferences
const detectSystemPreferences = (): Partial<A11yPreferences> => {
  if (typeof window === 'undefined') return {};

  return {
    reducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    highContrast: window.matchMedia('(prefers-contrast: high)').matches,
    prefersDark: window.matchMedia('(prefers-color-scheme: dark)').matches,
    reducedTransparency: window.matchMedia('(prefers-reduced-transparency: reduce)').matches,
  };
};

// Signals
export const preferences = signal<A11yPreferences>({
  ...defaultPreferences,
  ...detectSystemPreferences(),
});

export const announcements = signal<Announcement[]>([]);

// Computed values
export const shouldReduceMotion = computed(() => preferences.value.reducedMotion);
export const isHighContrast = computed(() => preferences.value.highContrast);
export const isFocusVisible = computed(() => preferences.value.focusVisible);
export const prefersDarkMode = computed(() => preferences.value.prefersDark);
export const shouldReduceTransparency = computed(() => preferences.value.reducedTransparency);
export const isRTL = computed(() => preferences.value.direction === 'rtl');

/**
 * Update accessibility preferences
 */
export const setPreferences = (newPreferences: Partial<A11yPreferences>): void => {
  preferences.value = {
    ...preferences.value,
    ...newPreferences,
    // Merge custom properties
    custom: {
      ...preferences.value.custom,
      ...(newPreferences.custom || {}),
    },
  };
};

/**
 * Set a custom preference value
 */
export const setCustomPreference = (key: string, value: boolean | string | number): void => {
  preferences.value = {
    ...preferences.value,
    custom: {
      ...preferences.value.custom,
      [key]: value,
    },
  };
};

/**
 * Get a custom preference value
 */
export const getCustomPreference = (key: string): boolean | string | number | undefined => {
  return preferences.value.custom[key];
};

/**
 * Add an announcement for screen readers
 */
export const announce = (message: string, politeness: 'polite' | 'assertive' = 'polite'): void => {
  const announcement: Announcement = {
    id: `announcement-${Date.now()}-${Math.random()}`,
    message,
    politeness,
    timestamp: Date.now(),
  };

  announcements.value = [...announcements.value, announcement];

  // Auto-remove announcement after 5 seconds
  setTimeout(() => {
    announcements.value = announcements.value.filter((a) => a.id !== announcement.id);
  }, 5000);
};

/**
 * Clear all announcements
 */
export const clearAnnouncements = (): void => {
  announcements.value = [];
};

// Listen for system preference changes
if (typeof window !== 'undefined') {
  const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  const highContrastQuery = window.matchMedia('(prefers-contrast: high)');
  const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)');
  const reducedTransparencyQuery = window.matchMedia('(prefers-reduced-transparency: reduce)');

  /* v8 ignore next -- @preserve */
  reducedMotionQuery.addEventListener('change', (e) => {
    setPreferences({ reducedMotion: e.matches });
  });

  /* v8 ignore next -- @preserve */
  highContrastQuery.addEventListener('change', (e) => {
    setPreferences({ highContrast: e.matches });
  });

  /* v8 ignore next -- @preserve */
  darkModeQuery.addEventListener('change', (e) => {
    setPreferences({ prefersDark: e.matches });
  });

  /* v8 ignore next -- @preserve */
  reducedTransparencyQuery.addEventListener('change', (e) => {
    setPreferences({ reducedTransparency: e.matches });
  });
}
