import React from 'react';
import ReviewList from './review-list';
import { CommentForm } from '@/features/add-comment-form';
import { Review, CommentData } from '@/entities/review';
import { useAppSelector, useAppDispatch } from '@/shared/lib/redux';
import { AuthorizationStatus } from '@/entities/user';
import { postReview } from '@/entities/review';

interface ReviewSectionProps {
  reviews: Review[];
  offerId: string;
}

export const ReviewSection: React.FC<ReviewSectionProps> = ({
  reviews,
  offerId,
}) => {
  const dispatch = useAppDispatch();
  const authorizationStatus = useAppSelector(
    (state) => state.user.authorizationStatus
  );

  const isAuth = authorizationStatus === AuthorizationStatus.Auth;

  const handleSubmit = async (commentData: CommentData) => {
    await dispatch(postReview({ offerId, commentData })).unwrap();
  };

  return (
    <section className="offer__reviews reviews">
      <h2 className="reviews__title">
        Reviews &middot; <span className="reviews__amount">{reviews.length}</span>
      </h2>
      <ReviewList reviews={reviews} />
      {isAuth && <CommentForm handleSubmit={handleSubmit} />}
    </section>
  );
};
