import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ReviewCard } from './review-card';
import { makeFakeReview } from '@/shared/lib/test-utils';

describe('ReviewCard', () => {
  it('should render correctly', () => {
    const review = makeFakeReview();

    render(<ReviewCard review={review} />);

    expect(screen.getByText(review.user.name)).toBeInTheDocument();
    expect(screen.getByText(review.comment)).toBeInTheDocument();
  });

  it('should display user avatar', () => {
    const review = makeFakeReview();

    render(<ReviewCard review={review} />);

    const avatar = screen.getByAltText('Reviews avatar');
    expect(avatar).toBeInTheDocument();
    expect(avatar).toHaveAttribute('src', review.user.avatarUrl);
  });

  it('should display rating as stars', () => {
    const review = makeFakeReview();

    const { container } = render(<ReviewCard review={review} />);

    const ratingStars = container.querySelector('.reviews__stars span');
    expect(ratingStars).toHaveStyle({ width: `${review.rating * 20}%` });
  });

  it('should display review date in Month Year format', () => {
    const review = {
      ...makeFakeReview(),
      date: '2023-04-15T12:00:00.000Z',
    };

    render(<ReviewCard review={review} />);

    const dateElement = screen.getByText('April 2023');
    expect(dateElement).toBeInTheDocument();
    expect(dateElement).toHaveAttribute('dateTime', review.date);
  });

  it('should format different dates correctly', () => {
    const review = {
      ...makeFakeReview(),
      date: '2019-12-25T00:00:00.000Z',
    };

    render(<ReviewCard review={review} />);

    expect(screen.getByText('December 2019')).toBeInTheDocument();
  });
});
