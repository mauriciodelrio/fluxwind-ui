/**
 * Grid Tests
 *
 * Unit tests using Vitest and Testing Library.
 *
 * @module @fluxwind/core/components
 */

import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Grid } from './Grid';

describe('Grid', () => {
  it('renders correctly', () => {
    render(<Grid>Test Content</Grid>);
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(<Grid className="custom-class">Content</Grid>);
    expect(container.firstChild).toHaveClass('custom-class');
  });

  it('renders different sizes', () => {
    const { rerender, container } = render(<Grid size="sm">Content</Grid>);
    expect(container.firstChild).toHaveClass('h-8');

    rerender(<Grid size="lg">Content</Grid>);
    expect(container.firstChild).toHaveClass('h-12');
  });

  it('renders different variants', () => {
    const { rerender, container } = render(<Grid variant="primary">Content</Grid>);
    expect(container.firstChild).toHaveClass('bg-primary-500');

    rerender(<Grid variant="error">Content</Grid>);
    expect(container.firstChild).toHaveClass('bg-error-500');
  });

  it('forwards ref correctly', () => {
    const ref = { current: null };
    render(<Grid ref={ref}>Content</Grid>);
    expect(ref.current).toBeInstanceOf(HTMLElement);
  });
});
