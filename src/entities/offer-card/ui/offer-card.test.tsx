import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { OfferCard } from './offer-card';
import { AuthorizationStatus } from '@/entities/user';
import { makeFakeStore, makeFakeOffer } from '@/shared/lib/test-utils';

describe('OfferCard', () => {
  const mockOffer = makeFakeOffer();

  it('should render offer info correctly', () => {
    const store = makeFakeStore({
      user: {
        authorizationStatus: AuthorizationStatus.NoAuth,
        userInfo: null,
      },
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <OfferCard offer={mockOffer} />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(mockOffer.title)).toBeInTheDocument();
    expect(screen.getByText(mockOffer.type)).toBeInTheDocument();
    expect(screen.getByText(`€${mockOffer.price}`)).toBeInTheDocument();
  });

  it('should show premium badge when offer is premium', () => {
    const premiumOffer = { ...mockOffer, isPremium: true };
    const store = makeFakeStore({
      user: {
        authorizationStatus: AuthorizationStatus.NoAuth,
        userInfo: null,
      },
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <OfferCard offer={premiumOffer} />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText('Premium')).toBeInTheDocument();
  });

  it('should not show premium badge when offer is not premium', () => {
    const regularOffer = { ...mockOffer, isPremium: false };
    const store = makeFakeStore({
      user: {
        authorizationStatus: AuthorizationStatus.NoAuth,
        userInfo: null,
      },
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <OfferCard offer={regularOffer} />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.queryByText('Premium')).not.toBeInTheDocument();
  });

  it('should navigate to login when unauthenticated user clicks favorite', async () => {
    const user = userEvent.setup();
    const store = makeFakeStore({
      user: {
        authorizationStatus: AuthorizationStatus.NoAuth,
        userInfo: null,
      },
    });

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/']}>
          <Routes>
            <Route path="/" element={<OfferCard offer={mockOffer} />} />
            <Route path="/login" element={<div>Login Page</div>} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    const bookmarkButton = screen.getByRole('button');
    await user.click(bookmarkButton);

    expect(screen.getByText('Login Page')).toBeInTheDocument();
  });

  it('should have active bookmark class when offer is favorite', () => {
    const favoriteOffer = { ...mockOffer, isFavorite: true };
    const store = makeFakeStore({
      user: {
        authorizationStatus: AuthorizationStatus.Auth,
        userInfo: null,
      },
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <OfferCard offer={favoriteOffer} />
        </MemoryRouter>
      </Provider>
    );

    const bookmarkButton = screen.getByRole('button');
    expect(bookmarkButton).toHaveClass('place-card__bookmark-button--active');
  });

  it('should not have active bookmark class when offer is not favorite', () => {
    const notFavoriteOffer = { ...mockOffer, isFavorite: false };
    const store = makeFakeStore({
      user: {
        authorizationStatus: AuthorizationStatus.Auth,
        userInfo: null,
      },
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <OfferCard offer={notFavoriteOffer} />
        </MemoryRouter>
      </Provider>
    );

    const bookmarkButton = screen.getByRole('button');
    expect(bookmarkButton).not.toHaveClass('place-card__bookmark-button--active');
  });

  it('should show "In bookmarks" text when favorite', () => {
    const favoriteOffer = { ...mockOffer, isFavorite: true };
    const store = makeFakeStore({
      user: {
        authorizationStatus: AuthorizationStatus.Auth,
        userInfo: null,
      },
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <OfferCard offer={favoriteOffer} />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText('In bookmarks')).toBeInTheDocument();
  });

  it('should show "To bookmarks" text when not favorite', () => {
    const notFavoriteOffer = { ...mockOffer, isFavorite: false };
    const store = makeFakeStore({
      user: {
        authorizationStatus: AuthorizationStatus.Auth,
        userInfo: null,
      },
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <OfferCard offer={notFavoriteOffer} />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText('To bookmarks')).toBeInTheDocument();
  });
});
