import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { NotFoundPage } from './index';
import { makeFakeStore } from '@/shared/lib/test-utils';

describe('NotFoundPage', () => {
  it('should render 404 heading', () => {
    const store = makeFakeStore();

    render(
      <Provider store={store}>
        <MemoryRouter>
          <NotFoundPage />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText('404 Not Found')).toBeInTheDocument();
  });

  it('should render error message in Russian', () => {
    const store = makeFakeStore();

    render(
      <Provider store={store}>
        <MemoryRouter>
          <NotFoundPage />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText('Извините, страница, которую вы ищите, не существует.')).toBeInTheDocument();
  });

  it('should render link to main page', () => {
    const store = makeFakeStore();

    render(
      <Provider store={store}>
        <MemoryRouter>
          <NotFoundPage />
        </MemoryRouter>
      </Provider>
    );

    const link = screen.getByText('Перейти на главную');
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/');
  });

  it('should render header component', () => {
    const store = makeFakeStore();

    render(
      <Provider store={store}>
        <MemoryRouter>
          <NotFoundPage />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByAltText('6 cities logo')).toBeInTheDocument();
  });
});
