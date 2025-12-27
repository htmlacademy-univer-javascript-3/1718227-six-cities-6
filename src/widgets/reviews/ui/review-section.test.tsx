import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { ReviewSection } from './review-section';
import { makeFakeStore, makeFakeReview } from '@/shared/lib/test-utils';
import { AuthorizationStatus } from '@/entities/user';

describe('ReviewSection', () => {
  it('should display total reviews count in header', () => {
    const reviews = [makeFakeReview(), makeFakeReview(), makeFakeReview()];
    const store = makeFakeStore({
      user: {
        authorizationStatus: AuthorizationStatus.NoAuth,
        userInfo: null,
      },
    });

    render(
      <Provider store={store}>
        <ReviewSection reviews={reviews} offerId="test-id" />
      </Provider>
    );

    expect(screen.getByText('3')).toBeInTheDocument();
  });

  it('should display max 10 reviews even if more are provided', () => {
    const reviews = Array.from({ length: 15 }, () => makeFakeReview());
    const store = makeFakeStore({
      user: {
        authorizationStatus: AuthorizationStatus.NoAuth,
        userInfo: null,
      },
    });

    render(
      <Provider store={store}>
        <ReviewSection reviews={reviews} offerId="test-id" />
      </Provider>
    );

    const reviewItems = screen.getAllByRole('listitem');
    expect(reviewItems).toHaveLength(10);
  });

  it('should still show total count of 15 in header when only 10 are displayed', () => {
    const reviews = Array.from({ length: 15 }, () => makeFakeReview());
    const store = makeFakeStore({
      user: {
        authorizationStatus: AuthorizationStatus.NoAuth,
        userInfo: null,
      },
    });

    render(
      <Provider store={store}>
        <ReviewSection reviews={reviews} offerId="test-id" />
      </Provider>
    );

    expect(screen.getByText('15')).toBeInTheDocument();
  });

  it('should sort reviews by date with newest first', () => {
    const oldReview = {
      ...makeFakeReview(),
      date: '2020-01-01T00:00:00.000Z',
      comment: 'Old review comment',
    };
    const newReview = {
      ...makeFakeReview(),
      date: '2023-12-15T00:00:00.000Z',
      comment: 'New review comment',
    };
    const reviews = [oldReview, newReview];
    const store = makeFakeStore({
      user: {
        authorizationStatus: AuthorizationStatus.NoAuth,
        userInfo: null,
      },
    });

    render(
      <Provider store={store}>
        <ReviewSection reviews={reviews} offerId="test-id" />
      </Provider>
    );

    const reviewTexts = screen.getAllByRole('listitem');
    expect(reviewTexts[0]).toHaveTextContent('New review comment');
    expect(reviewTexts[1]).toHaveTextContent('Old review comment');
  });

  it('should show comment form for authenticated users', () => {
    const reviews = [makeFakeReview()];
    const store = makeFakeStore({
      user: {
        authorizationStatus: AuthorizationStatus.Auth,
        userInfo: null,
      },
    });

    render(
      <Provider store={store}>
        <ReviewSection reviews={reviews} offerId="test-id" />
      </Provider>
    );

    expect(screen.getByText('Your review')).toBeInTheDocument();
  });

  it('should not show comment form for non-authenticated users', () => {
    const reviews = [makeFakeReview()];
    const store = makeFakeStore({
      user: {
        authorizationStatus: AuthorizationStatus.NoAuth,
        userInfo: null,
      },
    });

    render(
      <Provider store={store}>
        <ReviewSection reviews={reviews} offerId="test-id" />
      </Provider>
    );

    expect(screen.queryByText('Your review')).not.toBeInTheDocument();
  });
});
