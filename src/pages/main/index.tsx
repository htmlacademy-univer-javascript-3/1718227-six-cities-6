import { Header } from '@/widgets/header';
import { OfferList } from '@/widgets/offer-list';
import { CityList } from '@/widgets/city-list';
import React, { useState, useCallback } from 'react';

export const MainPage: React.FC = () => {
  const [isEmpty, setIsEmpty] = useState(false);

  const handleEmptyChange = useCallback((empty: boolean) => {
    setIsEmpty(empty);
  }, []);

  const mainClassName = `page__main page__main--index${isEmpty ? ' page__main--index-empty' : ''}`;

  return (
    <div className="page page--gray page--main">
      <Header />
      <main className={mainClassName}>
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <CityList />
        </div>
        <OfferList onEmptyChange={handleEmptyChange} />
      </main>
    </div>
  );
};
