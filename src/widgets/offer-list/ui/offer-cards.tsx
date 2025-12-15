import React from 'react';
import { Offer } from '@/shared/types/offer';
import { OfferCard } from '@/entities/offer-card';

interface Props {
  offers: Offer[];
  onOfferMouseEnter?: (offerId: string) => void;
  className?: string;
}

export const OfferCards: React.FC<Props> = ({
  offers,
  onOfferMouseEnter,
  className,
}) => (
  <div className={className}>
    {offers.map((offer) => (
      <OfferCard
        key={offer.id}
        offer={offer}
        onMouseEnter={() => onOfferMouseEnter?.(offer.id)}
      />
    ))}
  </div>
);
