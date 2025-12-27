import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '@/app/store';
import { Offer } from '@/shared/types/offer';
import { SortType } from './types';

export const selectCity = (state: RootState) => state.offer.city;
export const selectOffers = (state: RootState) => state.offer.offers;
export const selectSortType = (state: RootState) => state.offer.sortType;
export const selectIsLoading = (state: RootState) => state.offer.isLoading;

export const selectFilteredOffers = createSelector(
  [selectCity, selectOffers],
  (city, offers) => offers.filter((offer) => offer.city.name === city.name)
);

const getSortedOffers = (offers: Offer[], sortType: SortType): Offer[] => {
  switch (sortType) {
    case SortType.PriceLowToHigh:
      return [...offers].sort((a, b) => a.price - b.price);
    case SortType.PriceHighToLow:
      return [...offers].sort((a, b) => b.price - a.price);
    case SortType.TopRatedFirst:
      return [...offers].sort((a, b) => b.rating - a.rating);
    case SortType.Popular:
    default:
      return offers;
  }
};

export const selectSortedOffers = createSelector(
  [selectFilteredOffers, selectSortType],
  (offers, sortType) => getSortedOffers(offers, sortType)
);
