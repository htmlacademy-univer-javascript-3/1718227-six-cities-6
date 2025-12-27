import { memo, useCallback } from 'react';
import { Offer } from '@/shared/types/offer';
import { Link, useNavigate } from 'react-router-dom';
import { getRouteOffer, getRouteLogin } from '@/shared/const/router';
import { useAppDispatch, useAppSelector } from '@/shared/lib/redux';
import { toggleFavorite } from '@/entities/favorites';
import { AuthorizationStatus } from '@/entities/user';

interface Props {
  offer: Offer;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  className?: string;
}

function OfferCardComponent({
  offer,
  onMouseEnter,
  onMouseLeave,
  className = 'cities__card',
}: Props) {
  const {
    id,
    isPremium,
    isFavorite,
    previewImage,
    price,
    rating,
    title,
    type,
  } = offer;
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const authorizationStatus = useAppSelector(
    (state) => state.user.authorizationStatus
  );
  const handleFavoriteClick = useCallback(() => {
    if (authorizationStatus !== AuthorizationStatus.Auth) {
      navigate(getRouteLogin());
      return;
    }
    dispatch(toggleFavorite({ offerId: id, status: isFavorite ? 0 : 1 }));
  }, [authorizationStatus, dispatch, id, isFavorite, navigate]);

  const bookmarkButtonClass = `place-card__bookmark-button button${
    isFavorite ? ' place-card__bookmark-button--active' : ''
  }`;
  const ratingWidth = `${Math.round(rating) * 20}%`;
  return (
    <article
      className={`${className} place-card`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {isPremium && (
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
      )}
      <div
        className={`${
          className.split('__')[0]
        }__image-wrapper place-card__image-wrapper`}
      >
        <Link to={getRouteOffer(id)}>
          <img
            className="place-card__image"
            src={previewImage}
            width={260}
            height={200}
            alt="Place image"
          />
        </Link>
      </div>
      <div className="place-card__info">
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
            <span style={{ width: ratingWidth }} />
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
}

export const OfferCard = memo(OfferCardComponent);
