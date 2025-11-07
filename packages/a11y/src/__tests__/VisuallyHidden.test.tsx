import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { VisuallyHidden } from '../components/VisuallyHidden';

describe('@fluxwind/a11y - VisuallyHidden', () => {
  it('should render children', () => {
    const { getByText } = render(<VisuallyHidden>Hidden text</VisuallyHidden>);

    expect(getByText('Hidden text')).toBeInTheDocument();
  });

  it('should render as span by default', () => {
    const { container } = render(<VisuallyHidden>Hidden text</VisuallyHidden>);

    const element = container.querySelector('span');
    expect(element).toBeInTheDocument();
  });

  it('should render as custom element', () => {
    const { container } = render(<VisuallyHidden as="div">Hidden text</VisuallyHidden>);

    const element = container.querySelector('div');
    expect(element).toBeInTheDocument();
    expect(element).toHaveTextContent('Hidden text');
  });

  it('should apply visually hidden styles', () => {
    const { container } = render(<VisuallyHidden>Hidden text</VisuallyHidden>);

    const element = container.firstChild as HTMLElement;
    expect(element.style.position).toBe('absolute');
    expect(element.style.width).toBe('1px');
    expect(element.style.height).toBe('1px');
    expect(element.style.overflow).toBe('hidden');
  });

  it('should accept custom className', () => {
    const { container } = render(
      <VisuallyHidden className="custom-class">Hidden text</VisuallyHidden>
    );

    const element = container.firstChild as HTMLElement;
    expect(element).toHaveClass('custom-class');
  });

  it('should have correct displayName', () => {
    expect(VisuallyHidden.displayName).toBe('VisuallyHidden');
  });
});
