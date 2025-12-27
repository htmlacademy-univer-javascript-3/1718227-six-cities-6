import { memo, useMemo } from 'react';
import ReviewList from './review-list';
import { CommentForm } from '@/features/add-comment-form';
import { Review, CommentData } from '@/entities/review';
import { useAppSelector, useAppDispatch } from '@/shared/lib/redux';
import { AuthorizationStatus } from '@/entities/user';
import { postReview } from '@/entities/review';

const MAX_REVIEWS_COUNT = 10;

interface ReviewSectionProps {
  reviews: Review[];
  offerId: string;
}

function ReviewSectionComponent({ reviews, offerId }: ReviewSectionProps) {
  const dispatch = useAppDispatch();
  const authorizationStatus = useAppSelector(
    (state) => state.user.authorizationStatus
  );

  const isAuth = authorizationStatus === AuthorizationStatus.Auth;

  const sortedAndLimitedReviews = useMemo(() =>
    [...reviews]
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, MAX_REVIEWS_COUNT),
  [reviews]);

  const handleSubmit = async (commentData: CommentData) => {
    await dispatch(postReview({ offerId, commentData })).unwrap();
  };

  return (
    <section className="offer__reviews reviews">
      <h2 className="reviews__title">
        Reviews &middot; <span className="reviews__amount">{reviews.length}</span>
      </h2>
      <ReviewList reviews={sortedAndLimitedReviews} />
      {isAuth && <CommentForm handleSubmit={handleSubmit} />}
    </section>
  );
}

export const ReviewSection = memo(ReviewSectionComponent);
