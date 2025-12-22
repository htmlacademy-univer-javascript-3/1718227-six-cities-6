import React, { useState, useMemo } from 'react';
import { OfferCards } from './offer-cards';
import { CityMap } from '@/widgets/city-map';
import { useAppDispatch, useAppSelector } from '@/shared/lib/redux';
import { SortingOptions, SortType } from '@/features/sorting-options';
import { Offer } from '@/shared/types/offer';
import { setSortType } from '@/entities/offer';
import { Spinner } from '@/shared/ui';

const getSortedOffers = (offers: Offer[], sortType: SortType): Offer[] => {
  switch (sortType) {
    case SortType.PriceLowToHigh:
      return [...offers].sort((a, b) => a.price - b.price);
    case SortType.PriceHighToLow:
      return [...offers].sort((a, b) => b.price - a.price);
    case SortType.TopRatedFirst:
      return [...offers].sort((a, b) => b.rating - a.rating);
    case SortType.Popular:
    default:
      return offers;
  }
};

export const OfferList: React.FC = () => {
  const [activeOfferId, setActiveOfferId] = useState<string>('');
  const dispatch = useAppDispatch();
  const city = useAppSelector((state) => state.offer.city);
  const allOffers = useAppSelector((state) => state.offer.offers);
  const sortType = useAppSelector((state) => state.offer.sortType);
  const isLoading = useAppSelector((state) => state.offer.isLoading);
  const filteredOffers = allOffers.filter(
    (offer) => offer.city.name === city.name
  );
  const sortedOffers = useMemo(
    () => getSortedOffers(filteredOffers, sortType),
    [filteredOffers, sortType]
  );

  const handleOfferMouseEnter = (offerId: string) => {
    setActiveOfferId(offerId);
  };

  const handleOfferMouseLeave = () => {
    setActiveOfferId('');
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="cities">
      <div className="cities__places-container container">
        <section className="cities__places places">
          <h2 className="visually-hidden">Places</h2>
          <b className="places__found">
            {filteredOffers.length} places to stay in {city.name}
          </b>
          <SortingOptions currentSort={sortType} onSortChange={(sort) => dispatch(setSortType(sort))} />
          <OfferCards
            offers={sortedOffers}
            onOfferMouseEnter={handleOfferMouseEnter}
            onOfferMouseLeave={handleOfferMouseLeave}
            className="cities__places-list places__list tabs__content"
          />
        </section>
        <div className="cities__right-section">
          <section className="cities__map map">
            <CityMap
              offers={filteredOffers}
              selectedOfferId={activeOfferId}
              city={city}
            />
          </section>
        </div>
      </div>
    </div>
  );
};
