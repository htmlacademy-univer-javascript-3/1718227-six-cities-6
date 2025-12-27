import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Footer } from './index';

describe('Footer', () => {
  it('should render correctly', () => {
    render(<Footer />);

    expect(screen.getByAltText('6 cities logo')).toBeInTheDocument();
  });

  it('should contain logo link', () => {
    const { container } = render(<Footer />);

    expect(container.querySelector('.footer__logo-link')).toBeInTheDocument();
  });

  it('should render logo image with correct dimensions', () => {
    render(<Footer />);

    const logo = screen.getByAltText('6 cities logo');
    expect(logo).toHaveAttribute('width', '64');
    expect(logo).toHaveAttribute('height', '33');
  });
});
