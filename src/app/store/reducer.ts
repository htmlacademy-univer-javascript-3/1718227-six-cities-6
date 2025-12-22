import { combineReducers } from '@reduxjs/toolkit';
import { offerReducer } from '@/entities/offer';
import { userReducer } from '@/entities/user';

export const rootReducer = combineReducers({
  offer: offerReducer,
  user: userReducer,
});
