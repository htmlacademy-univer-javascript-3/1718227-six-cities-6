import React from 'react';
import { Main } from '../pages/main/main';

interface Props {
  numberOffers: number;
}

export const App: React.FC<Props> = ({ numberOffers }) => (
  <Main numberOffers={numberOffers} />
);
