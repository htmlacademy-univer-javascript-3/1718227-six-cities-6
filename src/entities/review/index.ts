import { type Review, type CommentData } from './model/types';
import { ReviewCard } from './ui/review-card';

export { type Review, type CommentData, ReviewCard };
export {
  reviewReducer,
  fetchReviews,
  postReview,
  clearReviews,
} from './model/slice';
