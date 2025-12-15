import React, { useState } from 'react';
import { SortType } from '@/entities/offer';

interface Props {
  currentSort: SortType;
  onSortChange: (sort: SortType) => void;
}

const sortOptions: SortType[] = Object.values(SortType);

export const SortingOptions: React.FC<Props> = ({
  currentSort,
  onSortChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSortClick = (sort: SortType) => {
    onSortChange(sort);
    setIsOpen(false);
  };

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by </span>
      <span
        className="places__sorting-type"
        tabIndex={0}
        onClick={() => setIsOpen(!isOpen)}
      >
        {currentSort}
        <svg className="places__sorting-arrow" width={7} height={4}>
          <use xlinkHref="#icon-arrow-select" />
        </svg>
      </span>
      <ul
        className={`places__options places__options--custom ${
          isOpen ? 'places__options--opened' : ''
        }`}
      >
        {sortOptions.map((option) => (
          <li
            key={option}
            className={`places__option ${
              option === currentSort ? 'places__option--active' : ''
            }`}
            tabIndex={0}
            onClick={() => handleSortClick(option)}
          >
            {option}
          </li>
        ))}
      </ul>
    </form>
  );
};
