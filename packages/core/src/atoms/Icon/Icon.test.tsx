import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import axe from 'axe-core';
import { Icon } from './Icon';

const StarPath = () => (
  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
);

describe('Icon', () => {
  it('renders an svg element', () => {
    const { container } = render(
      <Icon>
        <StarPath />
      </Icon>,
    );
    expect(container.querySelector('svg')).toBeInTheDocument();
  });

  it('is aria-hidden when no label is provided (decorative)', () => {
    const { container } = render(
      <Icon>
        <StarPath />
      </Icon>,
    );
    expect(container.querySelector('svg')).toHaveAttribute('aria-hidden', 'true');
  });

  it('has role="img" and aria-label when label is provided', () => {
    render(
      <Icon label="Star">
        <StarPath />
      </Icon>,
    );
    const svg = screen.getByRole('img', { name: 'Star' });
    expect(svg).toBeInTheDocument();
    expect(svg).toHaveAttribute('aria-label', 'Star');
  });

  it('uses the default viewBox "0 0 24 24"', () => {
    const { container } = render(
      <Icon>
        <StarPath />
      </Icon>,
    );
    expect(container.querySelector('svg')).toHaveAttribute('viewBox', '0 0 24 24');
  });

  it('accepts a custom viewBox', () => {
    const { container } = render(
      <Icon viewBox="0 0 16 16">
        <StarPath />
      </Icon>,
    );
    expect(container.querySelector('svg')).toHaveAttribute('viewBox', '0 0 16 16');
  });

  it('applies custom className', () => {
    const { container } = render(
      <Icon className="text-red-500">
        <StarPath />
      </Icon>,
    );
    expect(container.querySelector('svg')).toHaveClass('text-red-500');
  });

  it('has no WCAG violations — decorative', async () => {
    const { container } = render(
      <Icon>
        <StarPath />
      </Icon>,
    );
    const results = await axe.run(container);
    expect(results.violations).toHaveLength(0);
  });

  it('has no WCAG violations — with label', async () => {
    const { container } = render(
      <Icon label="Star icon">
        <StarPath />
      </Icon>,
    );
    const results = await axe.run(container);
    expect(results.violations).toHaveLength(0);
  });
});
