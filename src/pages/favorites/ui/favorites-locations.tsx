import { OfferFavoriteCard } from '@/entities/offer-card';
import { Offer } from '@/shared/types/offer';
import React from 'react';

interface Props {
  city: string;
  offers: Offer[];
}

export const FavoritesLocationItems: React.FC<Props> = ({ city, offers }) => (
  <li className="favorites__locations-items">
    <div className="favorites__locations locations locations--current">
      <div className="locations__item">
        <a className="locations__item-link" href="#">
          <span>{city}</span>
        </a>
      </div>
    </div>
    <div className="favorites__places">
      {offers.map((offer) => (
        <OfferFavoriteCard key={offer.id} offer={offer} />
      ))}
    </div>
  </li>
);
