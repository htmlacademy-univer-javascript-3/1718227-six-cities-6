import { Header } from '@/widgets/header';
import { OfferList } from '@/widgets/offer-list';
import { CityList } from '@/widgets/city-list';
import React from 'react';

export const MainPage: React.FC = () => (
  <div className="page page--gray page--main">
    <Header />
    <main className="page__main page__main--index">
      <h1 className="visually-hidden">Cities</h1>
      <div className="tabs">
        <CityList />
      </div>
      <OfferList />
    </main>
  </div>
);
