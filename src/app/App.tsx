import React, { useEffect } from 'react';
import { Providers } from './providers';
import { AppRouter } from './routers';
import { useAppDispatch } from '@/shared/lib/redux';
import { setOffers } from '@/entities/offer';
import { OFFERS } from '@/shared/mocks/offers';

const AppContent: React.FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setOffers(OFFERS));
  }, [dispatch]);

  return <AppRouter />;
};

export const App: React.FC = () => (
  <Providers>
    <AppContent />
  </Providers>
);
