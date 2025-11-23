/**
 * Spinner Tests
 *
 * Unit tests using Vitest and Testing Library.
 *
 * @module @fluxwind/core/components
 */

import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Spinner } from './Spinner';

describe('Spinner', () => {
  it('renders correctly', () => {
    render(<Spinner>Test Content</Spinner>);
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(<Spinner className="custom-class">Content</Spinner>);
    expect(container.firstChild).toHaveClass('custom-class');
  });

  it('renders different sizes', () => {
    const { rerender, container } = render(<Spinner size="sm">Content</Spinner>);
    expect(container.firstChild).toHaveClass('h-8');

    rerender(<Spinner size="lg">Content</Spinner>);
    expect(container.firstChild).toHaveClass('h-12');
  });

  it('renders different variants', () => {
    const { rerender, container } = render(<Spinner variant="primary">Content</Spinner>);
    expect(container.firstChild).toHaveClass('bg-primary-500');

    rerender(<Spinner variant="error">Content</Spinner>);
    expect(container.firstChild).toHaveClass('bg-error-500');
  });

  it('forwards ref correctly', () => {
    const ref = { current: null };
    render(<Spinner ref={ref}>Content</Spinner>);
    expect(ref.current).toBeInstanceOf(HTMLElement);
  });
});
