import { describe, it, expect } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from '@/app/store/reducer';
import AppRouter from './ui/app-router';
import { AuthorizationStatus } from '@/entities/user';
import { CITIES } from '@/shared/const/cities';
import { SortType } from '@/entities/offer';

const createMockStore = (authStatus: AuthorizationStatus) =>
  configureStore({
    reducer: rootReducer,
    preloadedState: {
      user: {
        authorizationStatus: authStatus,
        userInfo: null,
      },
      offer: {
        city: CITIES[0],
        offers: [],
        sortType: SortType.Popular,
        isLoading: false,
        error: null,
      },
      offerDetails: {
        offer: null,
        nearbyOffers: [],
        isLoading: false,
        error: null,
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
    },
  });

describe('AppRouter', () => {
  describe('public routes', () => {
    it('should render main page for "/" route', () => {
      const store = createMockStore(AuthorizationStatus.NoAuth);

      render(
        <Provider store={store}>
          <MemoryRouter initialEntries={['/']}>
            <AppRouter />
          </MemoryRouter>
        </Provider>
      );

      expect(screen.getByText(/Cities/i)).toBeInTheDocument();
    });

    it('should render login page for "/login" route', () => {
      const store = createMockStore(AuthorizationStatus.NoAuth);

      render(
        <Provider store={store}>
          <MemoryRouter initialEntries={['/login']}>
            <AppRouter />
          </MemoryRouter>
        </Provider>
      );

      expect(screen.getByRole('heading', { name: /Sign in/i })).toBeInTheDocument();
    });

    it('should render 404 page for "/404" route', () => {
      const store = createMockStore(AuthorizationStatus.NoAuth);

      render(
        <Provider store={store}>
          <MemoryRouter initialEntries={['/404']}>
            <AppRouter />
          </MemoryRouter>
        </Provider>
      );

      expect(screen.getByText('404 Not Found')).toBeInTheDocument();
    });

    it('should redirect to 404 for unknown route', () => {
      const store = createMockStore(AuthorizationStatus.NoAuth);

      render(
        <Provider store={store}>
          <MemoryRouter initialEntries={['/unknown-route']}>
            <AppRouter />
          </MemoryRouter>
        </Provider>
      );

      expect(screen.getByText('404 Not Found')).toBeInTheDocument();
    });
  });

  describe('protected routes', () => {
    it('should redirect to login when accessing /favorites without auth', () => {
      const store = createMockStore(AuthorizationStatus.NoAuth);

      render(
        <Provider store={store}>
          <MemoryRouter initialEntries={['/favorites']}>
            <AppRouter />
          </MemoryRouter>
        </Provider>
      );

      expect(screen.getByRole('heading', { name: /Sign in/i })).toBeInTheDocument();
    });

    it('should show spinner when auth status is unknown', () => {
      const store = createMockStore(AuthorizationStatus.Unknown);

      const { container } = render(
        <Provider store={store}>
          <MemoryRouter initialEntries={['/favorites']}>
            <AppRouter />
          </MemoryRouter>
        </Provider>
      );

      const spinnerElement = container.querySelector('[class*="spinner"]');
      expect(spinnerElement).toBeInTheDocument();
    });

    it('should render favorites page when authenticated', async () => {
      const store = createMockStore(AuthorizationStatus.Auth);

      render(
        <Provider store={store}>
          <MemoryRouter initialEntries={['/favorites']}>
            <AppRouter />
          </MemoryRouter>
        </Provider>
      );

      await waitFor(() => {
        expect(screen.getByText('Sign out')).toBeInTheDocument();
      });
    });
  });
});
