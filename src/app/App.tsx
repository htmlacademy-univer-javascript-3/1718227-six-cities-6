import React from 'react';
import { Providers } from './providers';
import { AppRouter } from './routers';

export const App: React.FC = () => (
  <Providers>
    <AppRouter />
  </Providers>
);
