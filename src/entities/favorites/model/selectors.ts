import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '@/app/store';

export const selectFavorites = (state: RootState) => state.favorites.favorites;
export const selectFavoritesIsLoading = (state: RootState) => state.favorites.isLoading;
export const selectFavoritesError = (state: RootState) => state.favorites.error;

export const selectFavoritesCount = createSelector(
  [selectFavorites],
  (favorites) => favorites.length
);

export const selectFavoritesByCity = createSelector(
  [selectFavorites],
  (favorites) => {
    const grouped: Record<string, typeof favorites> = {};
    favorites.forEach((offer) => {
      const cityName = offer.city.name;
      if (!grouped[cityName]) {
        grouped[cityName] = [];
      }
      grouped[cityName].push(offer);
    });
    return grouped;
  }
);
