import { ReviewCard, type Review } from '@/entities/review';

interface IReviewList {
  reviews: Review[];
}
export default function ReviewList({ reviews }: IReviewList) {
  return (
    <ul className="reviews__list">
      {reviews.map((review) => (
        <ReviewCard key={review.id} review={review} />
      ))}
    </ul>
  );
}
