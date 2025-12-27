import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { OfferPage } from './index';
import { makeFakeStore } from '@/shared/lib/test-utils';
import { AuthorizationStatus } from '@/entities/user';
import { CITIES } from '@/shared/const/cities';
import { SortType } from '@/entities/offer';

const createFullStore = (overrides: Record<string, unknown> = {}) =>
  makeFakeStore({
    offer: {
      city: CITIES[0],
      offers: [],
      sortType: SortType.Popular,
      isLoading: false,
      error: null,
    },
    user: {
      authorizationStatus: AuthorizationStatus.NoAuth,
      userInfo: null,
    },
    review: {
      reviews: [],
      isLoading: false,
      isPosting: false,
      error: null,
    },
    favorites: {
      favorites: [],
      isLoading: false,
      error: null,
    },
    ...overrides,
  });

describe('OfferPage', () => {
  it('should show spinner while loading', () => {
    const store = createFullStore({
      offerDetails: {
        offer: null,
        nearbyOffers: [],
        isLoading: true,
        error: null,
      },
    });

    const { container } = render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/offer/test-id']}>
          <Routes>
            <Route path="/offer/:id" element={<OfferPage />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    expect(container.querySelector('[class*="spinner"]')).toBeInTheDocument();
  });

  it('should show spinner when offer is null', () => {
    const store = createFullStore({
      offerDetails: {
        offer: null,
        nearbyOffers: [],
        isLoading: false,
        error: null,
      },
    });

    const { container } = render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/offer/test-id']}>
          <Routes>
            <Route path="/offer/:id" element={<OfferPage />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    expect(container.querySelector('[class*="spinner"]')).toBeInTheDocument();
  });
});
