import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import axe from 'axe-core';
import { Badge } from './Badge';

describe('Badge', () => {
  it('renders label text', () => {
    render(<Badge>New</Badge>);
    expect(screen.getByText('New')).toBeInTheDocument();
  });

  it('renders dot indicator when dot prop is set', () => {
    const { container } = render(<Badge dot>Online</Badge>);
    // The dot span is aria-hidden, select by DOM structure
    const dot = container.querySelector('span[aria-hidden="true"]');
    expect(dot).toBeInTheDocument();
  });

  it('does not render dot when dot is not set', () => {
    const { container } = render(<Badge>Status</Badge>);
    const dot = container.querySelector('span[aria-hidden="true"]');
    expect(dot).not.toBeInTheDocument();
  });

  it('renders icon when icon prop is provided', () => {
    const icon = <svg data-testid="icon" />;
    render(<Badge icon={icon}>Tagged</Badge>);
    expect(screen.getByTestId('icon')).toBeInTheDocument();
  });

  it('does not render icon when dot overrides it', () => {
    const icon = <svg data-testid="icon" />;
    render(<Badge icon={icon} dot>Status</Badge>);
    expect(screen.queryByTestId('icon')).not.toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(<Badge className="custom-class">Label</Badge>);
    expect(container.firstChild).toHaveClass('custom-class');
  });

  it('forwards additional html attributes', () => {
    render(<Badge data-testid="badge-el">Label</Badge>);
    expect(screen.getByTestId('badge-el')).toBeInTheDocument();
  });

  it('has no WCAG violations', async () => {
    const { container } = render(<Badge>Status</Badge>);
    const results = await axe.run(container);
    expect(results.violations).toHaveLength(0);
  });

  it('has no WCAG violations with dot', async () => {
    const { container } = render(<Badge dot>Online</Badge>);
    const results = await axe.run(container);
    expect(results.violations).toHaveLength(0);
  });
});
