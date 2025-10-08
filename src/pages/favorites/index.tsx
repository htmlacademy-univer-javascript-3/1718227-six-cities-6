import React from 'react';
import { Footer } from '../../widgets/footer';
import { Header } from '../../widgets/header';
import { FavoritesLocationItems } from './ui/favorites-locations';
import { OFFERS } from '@/shared/mocks/offers';

export const FavoritesPage: React.FC = () => (
  <div className="page">
    <Header />
    <main className="page__main page__main--favorites">
      <div className="page__favorites-container container">
        <section className="favorites">
          <h1 className="favorites__title">Saved listing</h1>
          <ul className="favorites__list">
            <FavoritesLocationItems city="Amsterdam" offers={OFFERS} />
            <FavoritesLocationItems city="Paris" offers={OFFERS} />
          </ul>
        </section>
      </div>
    </main>
    <Footer />
  </div>
);
