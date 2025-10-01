import { FC } from 'react';

interface Providers {
  children: JSX.Element;
}

export const Providers: FC<Providers> = ({ children }) => children;
