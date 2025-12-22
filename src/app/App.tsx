import React, { useEffect } from 'react';
import { Providers } from './providers';
import { AppRouter } from './routers';
import { useAppDispatch } from '@/shared/lib/redux';
import { fetchOffers } from '@/entities/offer';
import { checkAuth } from '@/entities/user';

const AppContent: React.FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(checkAuth());
    dispatch(fetchOffers());
  }, [dispatch]);

  return <AppRouter />;
};

export const App: React.FC = () => (
  <Providers>
    <AppContent />
  </Providers>
);
