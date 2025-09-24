import React from 'react';
import { Offer } from '../../types/offer';
import { OfferCard } from '../offer-card';

interface Props {
  offers: Offer[];
}

export const OfferList: React.FC<Props> = ({ offers }) => (
  <div className="cities__places-list places__list tabs__content">
    {offers.map((offer) => (
      <OfferCard key={offer.id} offer={offer} />
    ))}
  </div>
);
