import type { Translations } from '../types';

/**
 * English translations (default)
 */
export const en: Translations = {
  common: {
    loading: 'Loading...',
    error: 'Error',
    success: 'Success',
    save: 'Save',
    cancel: 'Cancel',
    delete: 'Delete',
    edit: 'Edit',
    close: 'Close',
    confirm: 'Confirm',
    search: 'Search',
    filter: 'Filter',
    reset: 'Reset',
    apply: 'Apply',
  },
  button: {
    submit: 'Submit',
    cancel: 'Cancel',
    loading: 'Loading...',
    disabled: 'Disabled',
  },
  form: {
    required: 'This field is required',
    invalid: 'Invalid value',
    email: 'Invalid email address',
    minLength: 'Minimum {{min}} characters',
    maxLength: 'Maximum {{max}} characters',
  },
  validation: {
    required: '{{field}} is required',
    email: 'Please enter a valid email',
    min: 'Minimum value is {{min}}',
    max: 'Maximum value is {{max}}',
  },
  items: {
    count: {
      zero: 'No items',
      one: '1 item',
      other: '{{count}} items',
    },
  },
  aria: {
    close: 'Close',
    menu: 'Menu',
    search: 'Search',
    loading: 'Loading',
    navigation: 'Navigation',
  },
};
