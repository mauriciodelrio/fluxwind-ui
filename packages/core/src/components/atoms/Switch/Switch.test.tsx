/**
 * Switch Tests
 *
 * Unit tests using Vitest and Testing Library.
 *
 * @module @fluxwind/core/components
 */

import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Switch } from './Switch';

describe('Switch', () => {
  it('renders correctly', () => {
    render(<Switch>Test Content</Switch>);
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(<Switch className="custom-class">Content</Switch>);
    expect(container.firstChild).toHaveClass('custom-class');
  });

  it('renders different sizes', () => {
    const { rerender, container } = render(<Switch size="sm">Content</Switch>);
    expect(container.firstChild).toHaveClass('h-8');

    rerender(<Switch size="lg">Content</Switch>);
    expect(container.firstChild).toHaveClass('h-12');
  });

  it('renders different variants', () => {
    const { rerender, container } = render(<Switch variant="primary">Content</Switch>);
    expect(container.firstChild).toHaveClass('bg-primary-500');

    rerender(<Switch variant="error">Content</Switch>);
    expect(container.firstChild).toHaveClass('bg-error-500');
  });

  it('forwards ref correctly', () => {
    const ref = { current: null };
    render(<Switch ref={ref}>Content</Switch>);
    expect(ref.current).toBeInstanceOf(HTMLElement);
  });
});
