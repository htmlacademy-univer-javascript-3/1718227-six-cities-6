import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './app';

const NUMBER_OF_OFFERS = 10;

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App numberOffers={NUMBER_OF_OFFERS} />
  </React.StrictMode>
);
