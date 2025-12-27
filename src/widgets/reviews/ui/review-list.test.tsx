import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import ReviewList from './review-list';
import { makeFakeReview } from '@/shared/lib/test-utils';

describe('ReviewList', () => {
  it('should render list of reviews', () => {
    const reviews = [
      makeFakeReview(),
      makeFakeReview(),
      makeFakeReview(),
    ];

    render(<ReviewList reviews={reviews} />);

    const reviewItems = screen.getAllByRole('listitem');
    expect(reviewItems).toHaveLength(3);
  });

  it('should render empty list when no reviews', () => {
    render(<ReviewList reviews={[]} />);

    const list = screen.getByRole('list');
    expect(list).toBeInTheDocument();
    expect(list.children).toHaveLength(0);
  });

  it('should render review content', () => {
    const review = makeFakeReview();
    const reviews = [review];

    render(<ReviewList reviews={reviews} />);

    expect(screen.getByText(review.comment)).toBeInTheDocument();
    expect(screen.getByText(review.user.name)).toBeInTheDocument();
  });

  it('should render user avatar for each review', () => {
    const review = makeFakeReview();
    const reviews = [review];

    render(<ReviewList reviews={reviews} />);

    const avatar = screen.getByAltText('Reviews avatar');
    expect(avatar).toHaveAttribute('src', review.user.avatarUrl);
  });

  it('should have correct class on list element', () => {
    const reviews = [makeFakeReview()];

    render(<ReviewList reviews={reviews} />);

    const list = screen.getByRole('list');
    expect(list).toHaveClass('reviews__list');
  });
});
