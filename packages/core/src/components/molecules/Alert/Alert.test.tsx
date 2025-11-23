/**
 * Alert Tests
 *
 * Unit tests using Vitest and Testing Library.
 *
 * @module @fluxwind/core/components
 */

import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Alert } from './Alert';

describe('Alert', () => {
  it('renders correctly', () => {
    render(<Alert>Test Content</Alert>);
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(<Alert className="custom-class">Content</Alert>);
    expect(container.firstChild).toHaveClass('custom-class');
  });

  it('renders different sizes', () => {
    const { rerender, container } = render(<Alert size="sm">Content</Alert>);
    expect(container.firstChild).toHaveClass('h-8');

    rerender(<Alert size="lg">Content</Alert>);
    expect(container.firstChild).toHaveClass('h-12');
  });

  it('renders different variants', () => {
    const { rerender, container } = render(<Alert variant="primary">Content</Alert>);
    expect(container.firstChild).toHaveClass('bg-primary-500');

    rerender(<Alert variant="error">Content</Alert>);
    expect(container.firstChild).toHaveClass('bg-error-500');
  });

  it('forwards ref correctly', () => {
    const ref = { current: null };
    render(<Alert ref={ref}>Content</Alert>);
    expect(ref.current).toBeInstanceOf(HTMLElement);
  });
});
