import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { LoginPage } from './index';
import { AuthorizationStatus } from '@/entities/user';
import { makeFakeStore } from '@/shared/lib/test-utils';
import { CITIES } from '@/shared/const/cities';

describe('LoginPage', () => {
  it('should render login form when not authenticated', () => {
    const store = makeFakeStore({
      user: {
        authorizationStatus: AuthorizationStatus.NoAuth,
        userInfo: null,
      },
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <LoginPage />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByRole('heading', { name: /Sign in/i })).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Sign in/i })).toBeInTheDocument();
  });

  it('should redirect to main page when already authenticated', () => {
    const store = makeFakeStore({
      user: {
        authorizationStatus: AuthorizationStatus.Auth,
        userInfo: null,
      },
    });

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/login']}>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/" element={<div>Main Page</div>} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText('Main Page')).toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: /Sign in/i })).not.toBeInTheDocument();
  });

  it('should allow user to type in email and password fields', async () => {
    const user = userEvent.setup();
    const store = makeFakeStore({
      user: {
        authorizationStatus: AuthorizationStatus.NoAuth,
        userInfo: null,
      },
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <LoginPage />
        </MemoryRouter>
      </Provider>
    );

    const emailInput = screen.getByPlaceholderText('Email');
    const passwordInput = screen.getByPlaceholderText('Password');

    await user.type(emailInput, 'test@example.com');
    await user.type(passwordInput, 'password123');

    expect(emailInput).toHaveValue('test@example.com');
    expect(passwordInput).toHaveValue('password123');
  });

  it('should have submit button', () => {
    const store = makeFakeStore({
      user: {
        authorizationStatus: AuthorizationStatus.NoAuth,
        userInfo: null,
      },
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <LoginPage />
        </MemoryRouter>
      </Provider>
    );

    const submitButton = screen.getByRole('button', { name: /Sign in/i });
    expect(submitButton).toBeInTheDocument();
    expect(submitButton).toHaveAttribute('type', 'submit');
  });

  it('should have submit button disabled when password has only letters', async () => {
    const user = userEvent.setup();
    const store = makeFakeStore({
      user: {
        authorizationStatus: AuthorizationStatus.NoAuth,
        userInfo: null,
      },
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <LoginPage />
        </MemoryRouter>
      </Provider>
    );

    const passwordInput = screen.getByPlaceholderText('Password');
    await user.type(passwordInput, 'onlyletters');

    const submitButton = screen.getByRole('button', { name: /Sign in/i });
    expect(submitButton).toBeDisabled();
  });

  it('should have submit button disabled when password has only digits', async () => {
    const user = userEvent.setup();
    const store = makeFakeStore({
      user: {
        authorizationStatus: AuthorizationStatus.NoAuth,
        userInfo: null,
      },
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <LoginPage />
        </MemoryRouter>
      </Provider>
    );

    const passwordInput = screen.getByPlaceholderText('Password');
    await user.type(passwordInput, '123456');

    const submitButton = screen.getByRole('button', { name: /Sign in/i });
    expect(submitButton).toBeDisabled();
  });

  it('should have submit button enabled when password has letters and digits', async () => {
    const user = userEvent.setup();
    const store = makeFakeStore({
      user: {
        authorizationStatus: AuthorizationStatus.NoAuth,
        userInfo: null,
      },
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <LoginPage />
        </MemoryRouter>
      </Provider>
    );

    const passwordInput = screen.getByPlaceholderText('Password');
    await user.type(passwordInput, 'password123');

    const submitButton = screen.getByRole('button', { name: /Sign in/i });
    expect(submitButton).not.toBeDisabled();
  });

  it('should display a random city link', () => {
    const store = makeFakeStore({
      user: {
        authorizationStatus: AuthorizationStatus.NoAuth,
        userInfo: null,
      },
    });

    const { container } = render(
      <Provider store={store}>
        <MemoryRouter>
          <LoginPage />
        </MemoryRouter>
      </Provider>
    );

    const cityLink = container.querySelector('.locations__item-link');
    const cityNames = CITIES.map((city) => city.name);
    expect(cityNames).toContain(cityLink?.textContent);
  });

  it('should navigate to main page when random city link is clicked', async () => {
    const user = userEvent.setup();
    const store = makeFakeStore({
      user: {
        authorizationStatus: AuthorizationStatus.NoAuth,
        userInfo: null,
      },
    });

    const { container } = render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/login']}>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/" element={<div>Main Page</div>} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    const cityLink = container.querySelector('.locations__item-link');
    if (cityLink) {
      await user.click(cityLink);
    }

    expect(screen.getByText('Main Page')).toBeInTheDocument();
  });
});
