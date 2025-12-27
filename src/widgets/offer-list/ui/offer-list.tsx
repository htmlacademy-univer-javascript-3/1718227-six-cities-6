import React, { useState, useCallback } from 'react';
import { OfferCards } from './offer-cards';
import { MainEmpty } from './main-empty';
import { CityMap } from '@/widgets/city-map';
import { useAppDispatch, useAppSelector } from '@/shared/lib/redux';
import { SortingOptions, SortType } from '@/features/sorting-options';
import {
  setSortType,
  selectCity,
  selectIsLoading,
  selectFilteredOffers,
  selectSortedOffers,
  selectSortType,
} from '@/entities/offer';
import { Spinner } from '@/shared/ui';

interface OfferListProps {
  onEmptyChange?: (isEmpty: boolean) => void;
}

export const OfferList: React.FC<OfferListProps> = ({ onEmptyChange }) => {
  const [activeOfferId, setActiveOfferId] = useState<string>('');
  const dispatch = useAppDispatch();
  const city = useAppSelector(selectCity);
  const isLoading = useAppSelector(selectIsLoading);
  const sortType = useAppSelector(selectSortType);
  const filteredOffers = useAppSelector(selectFilteredOffers);
  const sortedOffers = useAppSelector(selectSortedOffers);

  const isEmpty = filteredOffers.length === 0;

  React.useEffect(() => {
    onEmptyChange?.(isEmpty);
  }, [isEmpty, onEmptyChange]);

  const handleOfferMouseEnter = useCallback((offerId: string) => {
    setActiveOfferId(offerId);
  }, []);

  const handleOfferMouseLeave = useCallback(() => {
    setActiveOfferId('');
  }, []);

  const handleSortChange = useCallback(
    (sort: SortType) => {
      dispatch(setSortType(sort));
    },
    [dispatch]
  );

  if (isLoading) {
    return <Spinner />;
  }

  if (isEmpty) {
    return <MainEmpty cityName={city.name} />;
  }

  return (
    <div className="cities">
      <div className="cities__places-container container">
        <section className="cities__places places">
          <h2 className="visually-hidden">Places</h2>
          <b className="places__found">
            {filteredOffers.length} places to stay in {city.name}
          </b>
          <SortingOptions
            currentSort={sortType}
            onSortChange={handleSortChange}
          />
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
