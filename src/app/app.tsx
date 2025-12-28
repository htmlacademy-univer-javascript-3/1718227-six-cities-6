import React, { useEffect } from 'react';
import { Providers } from './providers';
import { AppRouter } from './routers';
import { useAppDispatch, useAppSelector } from '@/shared/lib/redux';
import { fetchOffers } from '@/entities/offer';
import { checkAuth, AuthorizationStatus } from '@/entities/user';
import { fetchFavorites } from '@/entities/favorites';

const AppContent: React.FC = () => {
  const dispatch = useAppDispatch();
  const authorizationStatus = useAppSelector(
    (state) => state.user.authorizationStatus
  );

  useEffect(() => {
    dispatch(checkAuth());
    dispatch(fetchOffers());
  }, [dispatch]);

  useEffect(() => {
    if (authorizationStatus === AuthorizationStatus.Auth) {
      dispatch(fetchFavorites());
    }
  }, [dispatch, authorizationStatus]);

  return <AppRouter />;
};

export const App: React.FC = () => (
  <Providers>
    <AppContent />
  </Providers>
);
