import { useEffect, useState } from 'react';
import {
  preferences,
  shouldReduceMotion,
  isHighContrast,
  isFocusVisible,
  prefersDarkMode,
  shouldReduceTransparency,
  isRTL,
  setPreferences,
  setCustomPreference,
  getCustomPreference,
  type A11yPreferences,
} from '../store';

/**
 * Hook to access and update accessibility preferences
 */
export const useA11yPreferences = () => {
  const [currentPrefs, setCurrentPrefs] = useState(preferences.value);
  const [reducedMotion, setReducedMotion] = useState(shouldReduceMotion.value);
  const [highContrast, setHighContrast] = useState(isHighContrast.value);
  const [focusVisible, setFocusVisible] = useState(isFocusVisible.value);
  const [darkMode, setDarkMode] = useState(prefersDarkMode.value);
  const [reducedTransparency, setReducedTransparency] = useState(shouldReduceTransparency.value);
  const [rtl, setRTL] = useState(isRTL.value);

  useEffect(() => {
    // Subscribe to signal changes
    const unsubscribePrefs = preferences.subscribe((value) => {
      setCurrentPrefs(value);
    });
    const unsubscribeMotion = shouldReduceMotion.subscribe((value) => {
      setReducedMotion(value);
    });
    const unsubscribeContrast = isHighContrast.subscribe((value) => {
      setHighContrast(value);
    });
    const unsubscribeFocus = isFocusVisible.subscribe((value) => {
      setFocusVisible(value);
    });
    const unsubscribeDark = prefersDarkMode.subscribe((value) => {
      setDarkMode(value);
    });
    const unsubscribeTransparency = shouldReduceTransparency.subscribe((value) => {
      setReducedTransparency(value);
    });
    const unsubscribeRTL = isRTL.subscribe((value) => {
      setRTL(value);
    });

    return () => {
      unsubscribePrefs();
      unsubscribeMotion();
      unsubscribeContrast();
      unsubscribeFocus();
      unsubscribeDark();
      unsubscribeTransparency();
      unsubscribeRTL();
    };
  }, []);

  return {
    preferences: currentPrefs,
    shouldReduceMotion: reducedMotion,
    isHighContrast: highContrast,
    isFocusVisible: focusVisible,
    prefersDarkMode: darkMode,
    shouldReduceTransparency: reducedTransparency,
    isRTL: rtl,
    setPreferences: (newPreferences: Partial<A11yPreferences>) => {
      setPreferences(newPreferences);
    },
    setCustomPreference: (key: string, value: boolean | string | number) => {
      setCustomPreference(key, value);
    },
    getCustomPreference: (key: string) => {
      return getCustomPreference(key);
    },
  };
};
