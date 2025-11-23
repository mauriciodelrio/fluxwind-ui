/**
 * Tooltip Tests
 *
 * Unit tests using Vitest and Testing Library.
 *
 * @module @fluxwind/core/components
 */

import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Tooltip } from './Tooltip';

describe('Tooltip', () => {
  it('renders correctly', () => {
    render(<Tooltip>Test Content</Tooltip>);
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(<Tooltip className="custom-class">Content</Tooltip>);
    expect(container.firstChild).toHaveClass('custom-class');
  });

  it('renders different sizes', () => {
    const { rerender, container } = render(<Tooltip size="sm">Content</Tooltip>);
    expect(container.firstChild).toHaveClass('h-8');

    rerender(<Tooltip size="lg">Content</Tooltip>);
    expect(container.firstChild).toHaveClass('h-12');
  });

  it('renders different variants', () => {
    const { rerender, container } = render(<Tooltip variant="primary">Content</Tooltip>);
    expect(container.firstChild).toHaveClass('bg-primary-500');

    rerender(<Tooltip variant="error">Content</Tooltip>);
    expect(container.firstChild).toHaveClass('bg-error-500');
  });

  it('forwards ref correctly', () => {
    const ref = { current: null };
    render(<Tooltip ref={ref}>Content</Tooltip>);
    expect(ref.current).toBeInstanceOf(HTMLElement);
  });
});
