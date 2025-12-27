import React, { memo, useCallback } from 'react';
import { setCity, selectCity } from '@/entities/offer';
import { useAppDispatch, useAppSelector } from '@/shared/lib/redux';
import { CITIES } from '@/shared/const/cities';
import { City } from '@/shared/types/offer';

function CityListComponent() {
  const dispatch = useAppDispatch();
  const selectedCity = useAppSelector(selectCity);

  const handleCityClick = useCallback((city: City) => (e: React.MouseEvent) => {
    e.preventDefault();
    dispatch(setCity(city));
  }, [dispatch]);

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
              onClick={handleCityClick(city)}
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
}

export const CityList = memo(CityListComponent);
