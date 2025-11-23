/**
 * Tabs Tests
 *
 * Unit tests using Vitest and Testing Library.
 *
 * @module @fluxwind/core/components
 */

import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Tabs } from './Tabs';

describe('Tabs', () => {
  it('renders correctly', () => {
    render(<Tabs>Test Content</Tabs>);
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(<Tabs className="custom-class">Content</Tabs>);
    expect(container.firstChild).toHaveClass('custom-class');
  });

  it('renders different sizes', () => {
    const { rerender, container } = render(<Tabs size="sm">Content</Tabs>);
    expect(container.firstChild).toHaveClass('h-8');

    rerender(<Tabs size="lg">Content</Tabs>);
    expect(container.firstChild).toHaveClass('h-12');
  });

  it('renders different variants', () => {
    const { rerender, container } = render(<Tabs variant="primary">Content</Tabs>);
    expect(container.firstChild).toHaveClass('bg-primary-500');

    rerender(<Tabs variant="error">Content</Tabs>);
    expect(container.firstChild).toHaveClass('bg-error-500');
  });

  it('forwards ref correctly', () => {
    const ref = { current: null };
    render(<Tabs ref={ref}>Content</Tabs>);
    expect(ref.current).toBeInstanceOf(HTMLElement);
  });
});
