import React from 'react';
import ReviewList from './review-list';
import { REVIEWS } from '@/shared/mocks/reviews';
import { CommentForm } from '@/features/add-comment-form';

export const ReviewSection: React.FC = () => (
  <section className="offer__reviews reviews">
    <h2 className="reviews__title">
      Reviews · <span className="reviews__amount">{REVIEWS.length}</span>
    </h2>
    <ReviewList reviews={REVIEWS} />
    <CommentForm handleSubmit={() => {}} />
  </section>
);
