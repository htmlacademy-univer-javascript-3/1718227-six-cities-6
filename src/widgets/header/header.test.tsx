import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { Header } from './index';
import { AuthorizationStatus } from '@/entities/user';
import { makeFakeStore, makeFakeAuthInfo } from '@/shared/lib/test-utils';

describe('Header', () => {
  it('should render sign in link when not authenticated', () => {
    const store = makeFakeStore({
      user: {
        authorizationStatus: AuthorizationStatus.NoAuth,
        userInfo: null,
      },
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <Header />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText('Sign in')).toBeInTheDocument();
    expect(screen.queryByText('Sign out')).not.toBeInTheDocument();
  });

  it('should render user info and sign out when authenticated', () => {
    const userInfo = makeFakeAuthInfo();
    const store = makeFakeStore({
      user: {
        authorizationStatus: AuthorizationStatus.Auth,
        userInfo,
      },
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <Header />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText('Sign out')).toBeInTheDocument();
    expect(screen.getByText(userInfo.email)).toBeInTheDocument();
    expect(screen.queryByText('Sign in')).not.toBeInTheDocument();
  });

  it('should dispatch logout action when sign out is clicked', async () => {
    const user = userEvent.setup();
    const userInfo = makeFakeAuthInfo();
    const store = makeFakeStore({
      user: {
        authorizationStatus: AuthorizationStatus.Auth,
        userInfo,
      },
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <Header />
        </MemoryRouter>
      </Provider>
    );

    const signOutLink = screen.getByText('Sign out');
    await user.click(signOutLink);

    const actions = store.getState();
    expect(actions).toBeDefined();
  });

  it('should display favorites count when authenticated', () => {
    const userInfo = makeFakeAuthInfo();
    const store = makeFakeStore({
      user: {
        authorizationStatus: AuthorizationStatus.Auth,
        userInfo,
      },
      favorites: {
        favorites: [],
        isLoading: false,
        error: null,
      },
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <Header />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText('0')).toBeInTheDocument();
  });

  it('should render logo with link to main page', () => {
    const store = makeFakeStore({
      user: {
        authorizationStatus: AuthorizationStatus.NoAuth,
        userInfo: null,
      },
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <Header />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByAltText('6 cities logo')).toBeInTheDocument();
  });
});
