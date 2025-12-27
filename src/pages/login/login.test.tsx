import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { LoginPage } from './index';
import { AuthorizationStatus } from '@/entities/user';
import { makeFakeStore } from '@/shared/lib/test-utils';

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
});
