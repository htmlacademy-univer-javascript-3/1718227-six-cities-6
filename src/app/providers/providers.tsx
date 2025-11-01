import { FC } from 'react';
import { Provider } from 'react-redux';
import { store } from '../store';

interface Providers {
  children: JSX.Element;
}

export const Providers: FC<Providers> = ({ children }) => (
  <Provider store={store}>{children}</Provider>
);
