import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { CityList } from './city-list';
import { makeFakeStore } from '@/shared/lib/test-utils';
import { CITIES } from '@/shared/const/cities';
import { SortType } from '@/entities/offer';

describe('CityList', () => {
  it('should render all cities', () => {
    const store = makeFakeStore();

    render(
      <Provider store={store}>
        <CityList />
      </Provider>
    );

    CITIES.forEach((city) => {
      expect(screen.getByText(city.name)).toBeInTheDocument();
    });
  });

  it('should highlight selected city', () => {
    const store = makeFakeStore({
      offer: {
        city: CITIES[0],
        offers: [],
        isLoading: false,
        error: null,
        sortType: SortType.Popular,
      },
    });

    render(
      <Provider store={store}>
        <CityList />
      </Provider>
    );

    const activeLink = screen.getByText(CITIES[0].name).closest('a');
    expect(activeLink).toHaveClass('tabs__item--active');
  });

  it('should dispatch setCity when city is clicked', async () => {
    const user = userEvent.setup();
    const store = makeFakeStore({
      offer: {
        city: CITIES[0],
        offers: [],
        isLoading: false,
        error: null,
        sortType: SortType.Popular,
      },
    });

    render(
      <Provider store={store}>
        <CityList />
      </Provider>
    );

    const amsterdamLink = screen.getByText('Amsterdam');
    await user.click(amsterdamLink);

    const state = store.getState();
    expect(state.offer.city.name).toBe('Amsterdam');
  });

  it('should not have active class on non-selected cities', () => {
    const store = makeFakeStore({
      offer: {
        city: CITIES[0],
        offers: [],
        isLoading: false,
        error: null,
        sortType: SortType.Popular,
      },
    });

    render(
      <Provider store={store}>
        <CityList />
      </Provider>
    );

    const nonActiveCity = screen.getByText(CITIES[1].name).closest('a');
    expect(nonActiveCity).not.toHaveClass('tabs__item--active');
  });
});
