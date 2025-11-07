/**
 * ARIA role types
 */
export type AriaRole =
  | 'alert'
  | 'alertdialog'
  | 'button'
  | 'checkbox'
  | 'dialog'
  | 'link'
  | 'menu'
  | 'menuitem'
  | 'menuitemcheckbox'
  | 'menuitemradio'
  | 'option'
  | 'radio'
  | 'region'
  | 'status'
  | 'tab'
  | 'tabpanel'
  | 'textbox'
  | 'tooltip';

/**
 * Generate ARIA attributes for a button-like element
 */
export const getButtonAriaProps = (props: {
  pressed?: boolean;
  expanded?: boolean;
  disabled?: boolean;
  label?: string;
  describedBy?: string;
}) => {
  return {
    role: 'button' as const,
    'aria-pressed': props.pressed !== undefined ? props.pressed : undefined,
    'aria-expanded': props.expanded !== undefined ? props.expanded : undefined,
    'aria-disabled': props.disabled || undefined,
    'aria-label': props.label || undefined,
    'aria-describedby': props.describedBy || undefined,
  };
};

/**
 * Generate ARIA attributes for a dialog
 */
export const getDialogAriaProps = (props: {
  label?: string;
  labelledBy?: string;
  describedBy?: string;
  modal?: boolean;
}) => {
  return {
    role: 'dialog' as const,
    'aria-modal': props.modal !== undefined ? props.modal : true,
    'aria-label': props.label || undefined,
    'aria-labelledby': props.labelledBy || undefined,
    'aria-describedby': props.describedBy || undefined,
  };
};

/**
 * Generate ARIA attributes for a menu
 */
export const getMenuAriaProps = (props: {
  label?: string;
  labelledBy?: string;
  orientation?: 'horizontal' | 'vertical';
}) => {
  return {
    role: 'menu' as const,
    'aria-label': props.label || undefined,
    'aria-labelledby': props.labelledBy || undefined,
    'aria-orientation': props.orientation || 'vertical',
  };
};

/**
 * Generate ARIA attributes for a menu item
 */
export const getMenuItemAriaProps = (props: { disabled?: boolean; checked?: boolean }) => {
  return {
    role: 'menuitem' as const,
    'aria-disabled': props.disabled || undefined,
    'aria-checked': props.checked !== undefined ? props.checked : undefined,
  };
};

/**
 * Generate ARIA attributes for live regions
 */
export const getLiveRegionAriaProps = (props: {
  politeness?: 'polite' | 'assertive' | 'off';
  atomic?: boolean;
  relevant?: 'additions' | 'removals' | 'text' | 'all';
}) => {
  return {
    role: 'status' as const,
    'aria-live': props.politeness || 'polite',
    'aria-atomic': props.atomic !== undefined ? props.atomic : true,
    'aria-relevant': props.relevant || 'additions text',
  };
};

/**
 * Build aria-labelledby string from multiple IDs
 */
export const buildAriaLabelledBy = (...ids: (string | undefined)[]): string | undefined => {
  const validIds = ids.filter((id): id is string => Boolean(id));
  return validIds.length > 0 ? validIds.join(' ') : undefined;
};

/**
 * Build aria-describedby string from multiple IDs
 */
export const buildAriaDescribedBy = (...ids: (string | undefined)[]): string | undefined => {
  const validIds = ids.filter((id): id is string => Boolean(id));
  return validIds.length > 0 ? validIds.join(' ') : undefined;
};
