/**
 * Input Tests
 *
 * Unit tests using Vitest and Testing Library.
 *
 * @module @fluxwind/core/components
 */

import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Input } from './Input';

describe('Input', () => {
  it('renders correctly', () => {
    render(<Input>Test Content</Input>);
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(<Input className="custom-class">Content</Input>);
    expect(container.firstChild).toHaveClass('custom-class');
  });

  it('renders different sizes', () => {
    const { rerender, container } = render(<Input size="sm">Content</Input>);
    expect(container.firstChild).toHaveClass('h-8');

    rerender(<Input size="lg">Content</Input>);
    expect(container.firstChild).toHaveClass('h-12');
  });

  it('renders different variants', () => {
    const { rerender, container } = render(<Input variant="primary">Content</Input>);
    expect(container.firstChild).toHaveClass('bg-primary-500');

    rerender(<Input variant="error">Content</Input>);
    expect(container.firstChild).toHaveClass('bg-error-500');
  });

  it('forwards ref correctly', () => {
    const ref = { current: null };
    render(<Input ref={ref}>Content</Input>);
    expect(ref.current).toBeInstanceOf(HTMLElement);
  });
});
