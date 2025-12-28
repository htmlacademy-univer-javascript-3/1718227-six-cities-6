import { CityMap } from '@/widgets/city-map';
import { Header } from '@/widgets/header';
import { OfferCards } from '@/widgets/offer-list/ui/offer-cards';
import { ReviewSection } from '@/widgets/reviews/ui/review-section';
import { useAppSelector, useAppDispatch } from '@/shared/lib/redux';
import { Spinner } from '@/shared/ui';
import React, { useEffect, useCallback, useMemo } from 'react';
import { useParams, Navigate, useNavigate } from 'react-router-dom';
import {
  fetchOfferDetails,
  fetchNearbyOffers,
  clearOfferDetails,
} from '@/entities/offer';
import { fetchReviews, clearReviews } from '@/entities/review';
import { getRouteNotFound, getRouteLogin } from '@/shared/const/router';
import { toggleFavorite } from '@/entities/favorites';
import { AuthorizationStatus } from '@/entities/user';
import { RATING_PERCENT_PER_STAR } from '@/shared/const/rating';

const MAX_NEARBY_OFFERS = 3;

export const OfferPage: React.FC = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { offer, nearbyOffers, isLoading, error } = useAppSelector(
    (state) => state.offerDetails
  );
  const reviews = useAppSelector((state) => state.review.reviews);
  const authorizationStatus = useAppSelector(
    (state) => state.user.authorizationStatus
  );

  const limitedNearbyOffers = useMemo(
    () => nearbyOffers.slice(0, MAX_NEARBY_OFFERS),
    [nearbyOffers]
  );

  const mapOffers = useMemo(
    () => (offer ? [offer, ...limitedNearbyOffers] : limitedNearbyOffers),
    [offer, limitedNearbyOffers]
  );

  const handleFavoriteClick = useCallback(() => {
    if (!offer) {
      return;
    }
    if (authorizationStatus !== AuthorizationStatus.Auth) {
      navigate(getRouteLogin());
      return;
    }
    dispatch(toggleFavorite({ offerId: offer.id, status: offer.isFavorite ? 0 : 1 }));
  }, [authorizationStatus, dispatch, navigate, offer]);

  useEffect(() => {
    if (id) {
      dispatch(fetchOfferDetails(id));
      dispatch(fetchNearbyOffers(id));
      dispatch(fetchReviews(id));
    }

    return () => {
      dispatch(clearOfferDetails());
      dispatch(clearReviews());
    };
  }, [dispatch, id]);

  if (error) {
    return <Navigate to={getRouteNotFound()} replace />;
  }

  if (isLoading || !offer) {
    return (
      <div className="page">
        <Header />
        <Spinner />
      </div>
    );
  }

  const ratingWidth = `${Math.round(offer.rating) * RATING_PERCENT_PER_STAR}%`;

  return (
    <div className="page">
      <Header />
      <main className="page__main page__main--offer">
        <section className="offer">
          <div className="offer__gallery-container container">
            <div className="offer__gallery">
              {offer.images.slice(0, 6).map((image) => (
                <div key={image} className="offer__image-wrapper">
                  <img
                    className="offer__image"
                    src={image}
                    alt="Photo studio"
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="offer__container container">
            <div className="offer__wrapper">
              {offer.isPremium && (
                <div className="offer__mark">
                  <span>Premium</span>
                </div>
              )}
              <div className="offer__name-wrapper">
                <h1 className="offer__name">{offer.title}</h1>
                <button
                  className={`offer__bookmark-button button${
                    offer.isFavorite ? ' offer__bookmark-button--active' : ''
                  }`}
                  type="button"
                  onClick={handleFavoriteClick}
                >
                  <svg className="offer__bookmark-icon" width={31} height={33}>
                    <use xlinkHref="#icon-bookmark" />
                  </svg>
                  <span className="visually-hidden">
                    {offer.isFavorite ? 'In bookmarks' : 'To bookmarks'}
                  </span>
                </button>
              </div>
              <div className="offer__rating rating">
                <div className="offer__stars rating__stars">
                  <span style={{ width: ratingWidth }} />
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="offer__rating-value rating__value">
                  {offer.rating}
                </span>
              </div>
              <ul className="offer__features">
                <li className="offer__feature offer__feature--entire">
                  {offer.type}
                </li>
                <li className="offer__feature offer__feature--bedrooms">
                  {offer.bedrooms} Bedroom{offer.bedrooms !== 1 && 's'}
                </li>
                <li className="offer__feature offer__feature--adults">
                  Max {offer.maxAdults} adult{offer.maxAdults !== 1 && 's'}
                </li>
              </ul>
              <div className="offer__price">
                <b className="offer__price-value">&euro;{offer.price}</b>
                <span className="offer__price-text">&nbsp;night</span>
              </div>
              <div className="offer__inside">
                <h2 className="offer__inside-title">What&apos;s inside</h2>
                <ul className="offer__inside-list">
                  {offer.goods.map((good) => (
                    <li key={good} className="offer__inside-item">
                      {good}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="offer__host">
                <h2 className="offer__host-title">Meet the host</h2>
                <div className="offer__host-user user">
                  <div
                    className={`offer__avatar-wrapper user__avatar-wrapper ${
                      offer.host.isPro ? 'offer__avatar-wrapper--pro' : ''
                    }`}
                  >
                    <img
                      className="offer__avatar user__avatar"
                      src={offer.host.avatarUrl}
                      width={74}
                      height={74}
                      alt="Host avatar"
                    />
                  </div>
                  <span className="offer__user-name">{offer.host.name}</span>
                  {offer.host.isPro && (
                    <span className="offer__user-status">Pro</span>
                  )}
                </div>
                <div className="offer__description">
                  <p className="offer__text">{offer.description}</p>
                </div>
              </div>
              <ReviewSection reviews={reviews} offerId={id!} />
            </div>
          </div>
          <section className="offer__map map">
            <CityMap
              offers={mapOffers}
              selectedOfferId={id}
              city={offer.city}
            />
          </section>
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">
              Other places in the neighbourhood
            </h2>
            <OfferCards
              offers={limitedNearbyOffers}
              className="near-places__list places__list"
            />
          </section>
        </div>
      </main>
    </div>
  );
};
