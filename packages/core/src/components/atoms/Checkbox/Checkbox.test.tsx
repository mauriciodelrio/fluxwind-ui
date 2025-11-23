/**
 * Checkbox Tests
 *
 * Unit tests using Vitest and Testing Library.
 *
 * @module @fluxwind/core/components
 */

import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Checkbox } from './Checkbox';

describe('Checkbox', () => {
  it('renders correctly', () => {
    render(<Checkbox>Test Content</Checkbox>);
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(<Checkbox className="custom-class">Content</Checkbox>);
    expect(container.firstChild).toHaveClass('custom-class');
  });

  it('renders different sizes', () => {
    const { rerender, container } = render(<Checkbox size="sm">Content</Checkbox>);
    expect(container.firstChild).toHaveClass('h-8');

    rerender(<Checkbox size="lg">Content</Checkbox>);
    expect(container.firstChild).toHaveClass('h-12');
  });

  it('renders different variants', () => {
    const { rerender, container } = render(<Checkbox variant="primary">Content</Checkbox>);
    expect(container.firstChild).toHaveClass('bg-primary-500');

    rerender(<Checkbox variant="error">Content</Checkbox>);
    expect(container.firstChild).toHaveClass('bg-error-500');
  });

  it('forwards ref correctly', () => {
    const ref = { current: null };
    render(<Checkbox ref={ref}>Content</Checkbox>);
    expect(ref.current).toBeInstanceOf(HTMLElement);
  });
});
