import { combineReducers } from '@reduxjs/toolkit';
import { offerReducer, offerDetailsReducer } from '@/entities/offer';
import { reviewReducer } from '@/entities/review';
import { userReducer } from '@/entities/user';

export const rootReducer = combineReducers({
  offer: offerReducer,
  offerDetails: offerDetailsReducer,
  review: reviewReducer,
  user: userReducer,
});
