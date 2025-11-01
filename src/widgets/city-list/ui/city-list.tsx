import { setCity } from '@/entities/offer';
import { useAppDispatch, useAppSelector } from '@/shared/lib/redux';
import { CITIES } from '@/shared/mocks/cities';
import { City } from '@/shared/types/offer';
import React from 'react';

export const CityList: React.FC = () => {
  const dispatch = useAppDispatch();
  const selectedCity = useAppSelector((state) => state.offer.city);

  const handleCityClick = (city: City) => {
    dispatch(setCity(city));
  };

  return (
    <section className="locations container">
      <ul className="locations__list tabs__list">
        {CITIES.map((city) => (
          <li key={city.name} className="locations__item">
            <a
              className={`locations__item-link tabs__item ${
                selectedCity.name === city.name ? 'tabs__item--active' : ''
              }`}
              href="#"
              onClick={(e) => {
                e.preventDefault();
                handleCityClick(city);
              }}
              tabIndex={0}
              aria-label={`Select city ${city.name}`}
            >
              <span>{city.name}</span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
};
