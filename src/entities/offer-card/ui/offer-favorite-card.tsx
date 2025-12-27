import { Offer } from '@/shared/types/offer';
import React, { useCallback } from 'react';
import { Link } from 'react-router-dom';
import { getRouteOffer } from '@/shared/const/router';
import { useAppDispatch } from '@/shared/lib/redux';
import { toggleFavorite } from '@/entities/favorites';

interface Props {
  offer: Offer;
}

export const OfferFavoriteCard: React.FC<Props> = ({ offer }) => {
  const { id, isPremium, isFavorite, previewImage, price, rating, title, type } = offer;
  const dispatch = useAppDispatch();

  const handleFavoriteClick = useCallback(() => {
    dispatch(toggleFavorite({ offerId: id, status: isFavorite ? 0 : 1 }));
  }, [dispatch, id, isFavorite]);

  const bookmarkButtonClass = `place-card__bookmark-button button${
    isFavorite ? ' place-card__bookmark-button--active' : ''
  }`;

  return (
    <article className="favorites__card place-card">
      {isPremium && (
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
      )}
      <div className="favorites__image-wrapper place-card__image-wrapper">
        <Link to={getRouteOffer(id)}>
          <img
            className="place-card__image"
            src={previewImage}
            width={150}
            height={110}
            alt="Place image"
          />
        </Link>
      </div>
      <div className="favorites__card-info place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text">/&nbsp;night</span>
          </div>
          <button
            className={bookmarkButtonClass}
            type="button"
            onClick={handleFavoriteClick}
          >
            <svg className="place-card__bookmark-icon" width={18} height={19}>
              <use xlinkHref="#icon-bookmark" />
            </svg>
            <span className="visually-hidden">
              {isFavorite ? 'In bookmarks' : 'To bookmarks'}
            </span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{ width: `${rating}%` }} />
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={getRouteOffer(id)}>{title}</Link>
        </h2>
        <p className="place-card__type">{type}</p>
      </div>
    </article>
  );
};
