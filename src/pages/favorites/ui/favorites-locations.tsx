import { OfferFavoriteCard } from '@/entities/offer-card';
import { Offer } from '@/shared/types/offer';
import React, { useCallback } from 'react';
import { Link } from 'react-router-dom';
import { getRouteMain } from '@/shared/const/router';
import { useAppDispatch } from '@/shared/lib/redux';
import { setCity } from '@/entities/offer';
import { CITIES } from '@/shared/const/cities';

interface Props {
  city: string;
  offers: Offer[];
}

export const FavoritesLocationItems: React.FC<Props> = ({ city, offers }) => {
  const dispatch = useAppDispatch();

  const handleCityClick = useCallback(() => {
    const cityData = CITIES.find((c) => c.name === city);
    if (cityData) {
      dispatch(setCity(cityData));
    }
  }, [city, dispatch]);

  return (
    <li className="favorites__locations-items">
      <div className="favorites__locations locations locations--current">
        <div className="locations__item">
          <Link
            className="locations__item-link"
            to={getRouteMain()}
            onClick={handleCityClick}
          >
            <span>{city}</span>
          </Link>
        </div>
      </div>
      <div className="favorites__places">
        {offers.map((offer) => (
          <OfferFavoriteCard key={offer.id} offer={offer} />
        ))}
      </div>
    </li>
  );
};
