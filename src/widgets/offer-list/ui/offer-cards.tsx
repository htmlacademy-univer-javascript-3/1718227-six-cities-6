import { memo, useCallback } from 'react';
import { Offer } from '@/shared/types/offer';
import { OfferCard } from '@/entities/offer-card';

interface Props {
  offers: Offer[];
  onOfferMouseEnter?: (offerId: string) => void;
  onOfferMouseLeave?: () => void;
  className?: string;
}

function OfferCardsComponent({ offers, onOfferMouseEnter, onOfferMouseLeave, className }: Props) {
  const handleMouseEnter = useCallback(
    (offerId: string) => () => onOfferMouseEnter?.(offerId),
    [onOfferMouseEnter]
  );

  return (
    <div className={className}>
      {offers.map((offer) => (
        <OfferCard
          key={offer.id}
          offer={offer}
          onMouseEnter={handleMouseEnter(offer.id)}
          onMouseLeave={onOfferMouseLeave}
        />
      ))}
    </div>
  );
}

export const OfferCards = memo(OfferCardsComponent);
