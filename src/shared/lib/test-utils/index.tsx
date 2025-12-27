import { render, RenderOptions } from '@testing-library/react';
import { configureStore, PreloadedState } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { ReactElement, PropsWithChildren } from 'react';
import { rootReducer } from '@/app/store/reducer';
import { RootState } from '@/app/store';
import { Offer, FullOffer, City } from '@/shared/types/offer';
import { Review } from '@/entities/review';
import { AuthInfo, AuthorizationStatus, User } from '@/entities/user';
import { SortType } from '@/entities/offer';
import { CITIES } from '@/shared/const/cities';
import faker from 'faker';

export const makeFakeCity = (): City => ({
  name: faker.address.city(),
  location: {
    latitude: Number(faker.address.latitude()),
    longitude: Number(faker.address.longitude()),
    zoom: 13,
  },
});

export const makeFakeOffer = (): Offer => ({
  id: faker.datatype.uuid(),
  title: faker.lorem.sentence(),
  type: faker.random.arrayElement(['apartment', 'room', 'house', 'hotel']),
  price: faker.datatype.number({ min: 50, max: 500 }),
  city: CITIES[0],
  location: {
    latitude: Number(faker.address.latitude()),
    longitude: Number(faker.address.longitude()),
    zoom: 13,
  },
  isFavorite: faker.datatype.boolean(),
  isPremium: faker.datatype.boolean(),
  rating: faker.datatype.float({ min: 1, max: 5, precision: 0.1 }),
  previewImage: faker.image.city(),
});

export const makeFakeFullOffer = (): FullOffer => ({
  ...makeFakeOffer(),
  description: faker.lorem.paragraph(),
  bedrooms: faker.datatype.number({ min: 1, max: 5 }),
  goods: [faker.lorem.word(), faker.lorem.word(), faker.lorem.word()],
  host: {
    name: faker.name.findName(),
    avatarUrl: faker.image.avatar(),
    isPro: faker.datatype.boolean(),
  },
  images: [faker.image.city(), faker.image.city(), faker.image.city()],
  maxAdults: faker.datatype.number({ min: 1, max: 10 }),
});

export const makeFakeUser = (): User => ({
  name: faker.name.findName(),
  avatarUrl: faker.image.avatar(),
  isPro: faker.datatype.boolean(),
});

export const makeFakeAuthInfo = (): AuthInfo => ({
  name: faker.name.findName(),
  avatarUrl: faker.image.avatar(),
  isPro: faker.datatype.boolean(),
  email: faker.internet.email(),
  token: faker.datatype.uuid(),
});

export const makeFakeReview = (): Review => ({
  id: faker.datatype.uuid(),
  date: faker.date.past().toISOString(),
  user: makeFakeUser(),
  comment: faker.lorem.paragraph(),
  rating: faker.datatype.number({ min: 1, max: 5 }),
});

export const makeFakeStore = (preloadedState?: PreloadedState<RootState>) => {
  const initialState: RootState = {
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
    user: {
      authorizationStatus: AuthorizationStatus.Unknown,
      userInfo: null,
    },
    favorites: {
      favorites: [],
      isLoading: false,
      error: null,
    },
  };

  return configureStore({
    reducer: rootReducer,
    preloadedState: preloadedState ?? initialState,
  });
};

interface ExtendedRenderOptions extends Omit<RenderOptions, 'wrapper'> {
  preloadedState?: PreloadedState<RootState>;
  store?: ReturnType<typeof makeFakeStore>;
  route?: string;
}

export function renderWithProviders(
  ui: ReactElement,
  {
    preloadedState,
    store = makeFakeStore(preloadedState),
    route = '/',
    ...renderOptions
  }: ExtendedRenderOptions = {}
) {
  function Wrapper({ children }: PropsWithChildren): ReactElement {
    return (
      <Provider store={store}>
        <MemoryRouter initialEntries={[route]}>
          {children}
        </MemoryRouter>
      </Provider>
    );
  }

  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}

export const extractActionsTypes = (actions: { type: string }[]) =>
  actions.map(({ type }) => type);
