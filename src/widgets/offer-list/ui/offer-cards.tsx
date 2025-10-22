import React from 'react';
import { Offer } from '@/shared/types/offer';
import { OfferCard } from '@/entities/offer-card';

interface Props {
  offers: Offer[];
  onOfferMouseEnter: (offerId: string) => void;
}

export const OfferCards: React.FC<Props> = ({ offers, onOfferMouseEnter }) => (
  <div className="cities__places-list places__list tabs__content">
    {offers.map((offer) => (
      <OfferCard
        key={offer.id}
        offer={offer}
        onMouseEnter={() => onOfferMouseEnter(offer.id)}
      />
    ))}
  </div>
);
