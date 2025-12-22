import React from 'react';
import { Footer } from '../../widgets/footer';
import { Header } from '../../widgets/header';
import { FavoritesLocationItems } from './ui/favorites-locations';
import { useAppSelector } from '@/shared/lib/redux';

export const FavoritesPage: React.FC = () => {
  const offers = useAppSelector((state) => state.offer.offers);

  return (
    <div className="page">
      <Header />
      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>
            <ul className="favorites__list">
              <FavoritesLocationItems city="Amsterdam" offers={offers} />
              <FavoritesLocationItems city="Paris" offers={offers} />
            </ul>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};
