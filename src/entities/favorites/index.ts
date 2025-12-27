export {
  favoritesReducer,
  fetchFavorites,
  toggleFavorite,
  clearFavorites,
} from './model/slice';

export {
  selectFavorites,
  selectFavoritesIsLoading,
  selectFavoritesError,
  selectFavoritesCount,
  selectFavoritesByCity,
} from './model/selectors';
