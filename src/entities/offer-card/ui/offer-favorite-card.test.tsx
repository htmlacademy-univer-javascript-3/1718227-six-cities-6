import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { OfferFavoriteCard } from './offer-favorite-card';
import { makeFakeStore, makeFakeOffer } from '@/shared/lib/test-utils';

describe('OfferFavoriteCard', () => {
  const mockOffer = makeFakeOffer();

  it('should render offer info correctly', () => {
    const store = makeFakeStore();

    render(
      <Provider store={store}>
        <MemoryRouter>
          <OfferFavoriteCard offer={mockOffer} />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(mockOffer.title)).toBeInTheDocument();
    expect(screen.getByText(mockOffer.type)).toBeInTheDocument();
    expect(screen.getByText(`€${mockOffer.price}`)).toBeInTheDocument();
  });

  it('should show premium badge when offer is premium', () => {
    const premiumOffer = { ...mockOffer, isPremium: true };
    const store = makeFakeStore();

    render(
      <Provider store={store}>
        <MemoryRouter>
          <OfferFavoriteCard offer={premiumOffer} />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText('Premium')).toBeInTheDocument();
  });

  it('should not show premium badge when offer is not premium', () => {
    const regularOffer = { ...mockOffer, isPremium: false };
    const store = makeFakeStore();

    render(
      <Provider store={store}>
        <MemoryRouter>
          <OfferFavoriteCard offer={regularOffer} />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.queryByText('Premium')).not.toBeInTheDocument();
  });

  it('should have active bookmark class when offer is favorite', () => {
    const favoriteOffer = { ...mockOffer, isFavorite: true };
    const store = makeFakeStore();

    render(
      <Provider store={store}>
        <MemoryRouter>
          <OfferFavoriteCard offer={favoriteOffer} />
        </MemoryRouter>
      </Provider>
    );

    const bookmarkButton = screen.getByRole('button');
    expect(bookmarkButton).toHaveClass('place-card__bookmark-button--active');
  });

  it('should render with favorites class names', () => {
    const store = makeFakeStore();

    render(
      <Provider store={store}>
        <MemoryRouter>
          <OfferFavoriteCard offer={mockOffer} />
        </MemoryRouter>
      </Provider>
    );

    const article = screen.getByRole('article');
    expect(article).toHaveClass('favorites__card');
    expect(article).toHaveClass('place-card');
  });

  it('should render image with correct dimensions', () => {
    const store = makeFakeStore();

    render(
      <Provider store={store}>
        <MemoryRouter>
          <OfferFavoriteCard offer={mockOffer} />
        </MemoryRouter>
      </Provider>
    );

    const image = screen.getByAltText('Place image');
    expect(image).toHaveAttribute('width', '150');
    expect(image).toHaveAttribute('height', '110');
  });
});
