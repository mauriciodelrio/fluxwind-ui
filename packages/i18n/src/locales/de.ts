import type { Translations } from '../types';

/**
 * German translations
 */
export const de: Translations = {
  common: {
    loading: 'Laden...',
    error: 'Fehler',
    success: 'Erfolg',
    save: 'Speichern',
    cancel: 'Abbrechen',
    delete: 'Löschen',
    edit: 'Bearbeiten',
    close: 'Schließen',
    confirm: 'Bestätigen',
    search: 'Suchen',
    filter: 'Filtern',
    reset: 'Zurücksetzen',
    apply: 'Anwenden',
  },
  button: {
    submit: 'Absenden',
    cancel: 'Abbrechen',
    loading: 'Laden...',
    disabled: 'Deaktiviert',
  },
  form: {
    required: 'Dieses Feld ist erforderlich',
    invalid: 'Ungültiger Wert',
    email: 'Ungültige E-Mail-Adresse',
    minLength: 'Mindestens {{min}} Zeichen',
    maxLength: 'Maximal {{max}} Zeichen',
  },
  validation: {
    required: '{{field}} ist erforderlich',
    email: 'Bitte geben Sie eine gültige E-Mail ein',
    min: 'Mindestwert ist {{min}}',
    max: 'Maximalwert ist {{max}}',
  },
  items: {
    count: {
      zero: 'Keine Elemente',
      one: '1 Element',
      other: '{{count}} Elemente',
    },
  },
  aria: {
    close: 'Schließen',
    menu: 'Menü',
    search: 'Suchen',
    loading: 'Laden',
    navigation: 'Navigation',
  },
};
