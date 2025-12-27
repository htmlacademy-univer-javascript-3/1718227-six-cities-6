import { combineReducers } from '@reduxjs/toolkit';
import { offerReducer, offerDetailsReducer } from '@/entities/offer';
import { reviewReducer } from '@/entities/review';
import { userReducer } from '@/entities/user';
import { favoritesReducer } from '@/entities/favorites';

export const rootReducer = combineReducers({
  offer: offerReducer,
  offerDetails: offerDetailsReducer,
  review: reviewReducer,
  user: userReducer,
  favorites: favoritesReducer,
});
