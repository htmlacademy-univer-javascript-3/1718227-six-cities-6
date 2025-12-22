import React from 'react';
import ReviewList from './review-list';
import { CommentForm } from '@/features/add-comment-form';
import { Review } from '@/entities/review';

const reviews: Review[] = [];

export const ReviewSection: React.FC = () => (
  <section className="offer__reviews reviews">
    <h2 className="reviews__title">
      Reviews · <span className="reviews__amount">{reviews.length}</span>
    </h2>
    <ReviewList reviews={reviews} />
    <CommentForm handleSubmit={() => {}} />
  </section>
);
