import React, { useState } from 'react';
import { OfferCards } from './offer-cards';
import { CityMap } from '@/widgets/city-map';
import { useAppSelector } from '@/shared/lib/redux';

export const OfferList: React.FC = () => {
  const [activeOfferId, setActiveOfferId] = useState<string>('');
  const city = useAppSelector((state) => state.offer.city);
  const allOffers = useAppSelector((state) => state.offer.offers);
  const filteredOffers = allOffers.filter(
    (offer) => offer.city.name === city.name
  );

  const handleOfferMouseEnter = (offerId: string) => {
    setActiveOfferId(offerId);
  };

  return (
    <div className="cities">
      <div className="cities__places-container container">
        <section className="cities__places places">
          <h2 className="visually-hidden">Places</h2>
          <b className="places__found">
            {filteredOffers.length} places to stay in {city.name}
          </b>
          <form className="places__sorting" action="#" method="get">
            <span className="places__sorting-caption">Sort by</span>
            <span className="places__sorting-type" tabIndex={0}>
              Popular
              <svg className="places__sorting-arrow" width={7} height={4}>
                <use xlinkHref="#icon-arrow-select" />
              </svg>
            </span>
            <ul className="places__options places__options--custom places__options--opened">
              <li
                className="places__option places__option--active"
                tabIndex={0}
              >
                Popular
              </li>
              <li className="places__option" tabIndex={0}>
                Price: low to high
              </li>
              <li className="places__option" tabIndex={0}>
                Price: high to low
              </li>
              <li className="places__option" tabIndex={0}>
                Top rated first
              </li>
            </ul>
          </form>
          <OfferCards
            offers={filteredOffers}
            onOfferMouseEnter={handleOfferMouseEnter}
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
