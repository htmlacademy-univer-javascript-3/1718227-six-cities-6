import { combineReducers } from '@reduxjs/toolkit';
import { offerReducer } from '@/entities/offer';

export const rootReducer = combineReducers({
  offer: offerReducer,
});
