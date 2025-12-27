import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { FavoritesEmpty } from './favorites-empty';

describe('FavoritesEmpty', () => {
  it('should render correctly', () => {
    render(<FavoritesEmpty />);

    expect(screen.getByText('Nothing yet saved.')).toBeInTheDocument();
    expect(
      screen.getByText('Save properties to narrow down search or plan your future trips.')
    ).toBeInTheDocument();
  });

  it('should have visually hidden heading', () => {
    render(<FavoritesEmpty />);

    const heading = screen.getByText('Favorites (empty)');
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveClass('visually-hidden');
  });

  it('should have empty favorites section class', () => {
    const { container } = render(<FavoritesEmpty />);

    expect(container.querySelector('.favorites--empty')).toBeInTheDocument();
  });
});
