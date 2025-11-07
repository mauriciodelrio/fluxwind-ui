import React from 'react';

export interface VisuallyHiddenProps {
  /**
   * Content to be hidden visually but accessible to screen readers
   */
  children: React.ReactNode;
  /**
   * HTML element to render
   * @default 'span'
   */
  as?: keyof JSX.IntrinsicElements;
  /**
   * Additional class names
   */
  className?: string;
}

/**
 * Component that hides content visually but keeps it accessible to screen readers
 */
export const VisuallyHidden: React.FC<VisuallyHiddenProps> = ({
  children,
  as: Component = 'span',
  className = '',
}) => {
  const style: React.CSSProperties = {
    position: 'absolute',
    width: '1px',
    height: '1px',
    padding: '0',
    margin: '-1px',
    overflow: 'hidden',
    clip: 'rect(0, 0, 0, 0)',
    whiteSpace: 'nowrap',
    border: '0',
  };

  return (
    <Component className={className} style={style}>
      {children}
    </Component>
  );
};

VisuallyHidden.displayName = 'VisuallyHidden';
