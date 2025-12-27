import { memo } from 'react';
import { ReviewCard, type Review } from '@/entities/review';

interface IReviewList {
  reviews: Review[];
}

function ReviewListComponent({ reviews }: IReviewList) {
  return (
    <ul className="reviews__list">
      {reviews.map((review) => (
        <ReviewCard key={review.id} review={review} />
      ))}
    </ul>
  );
}

const ReviewList = memo(ReviewListComponent);
export default ReviewList;
