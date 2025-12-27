import React, { useEffect } from 'react';
import { Footer } from '../../widgets/footer';
import { Header } from '../../widgets/header';
import { FavoritesLocationItems } from './ui/favorites-locations';
import { FavoritesEmpty } from './ui/favorites-empty';
import { useAppSelector, useAppDispatch } from '@/shared/lib/redux';
import {
  fetchFavorites,
  selectFavorites,
  selectFavoritesByCity,
  selectFavoritesIsLoading,
} from '@/entities/favorites';
import { Spinner } from '@/shared/ui';

export const FavoritesPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const favorites = useAppSelector(selectFavorites);
  const favoritesByCity = useAppSelector(selectFavoritesByCity);
  const isLoading = useAppSelector(selectFavoritesIsLoading);

  useEffect(() => {
    dispatch(fetchFavorites());
  }, [dispatch]);

  const isEmpty = favorites.length === 0;
  const pageClass = `page${isEmpty ? ' page--favorites-empty' : ''}`;
  const mainClass = `page__main page__main--favorites${isEmpty ? ' page__main--favorites-empty' : ''}`;

  if (isLoading) {
    return (
      <div className="page">
        <Header />
        <Spinner />
        <Footer />
      </div>
    );
  }

  return (
    <div className={pageClass}>
      <Header />
      <main className={mainClass}>
        <div className="page__favorites-container container">
          {isEmpty ? (
            <FavoritesEmpty />
          ) : (
            <section className="favorites">
              <h1 className="favorites__title">Saved listing</h1>
              <ul className="favorites__list">
                {Object.entries(favoritesByCity).map(([cityName, cityOffers]) => (
                  <FavoritesLocationItems
                    key={cityName}
                    city={cityName}
                    offers={cityOffers}
                  />
                ))}
              </ul>
            </section>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};
