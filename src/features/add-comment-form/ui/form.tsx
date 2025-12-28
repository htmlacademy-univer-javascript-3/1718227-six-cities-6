import React, { useState } from 'react';
import { CommentData } from '@/entities/review';

const MIN_COMMENT_LENGTH = 50;
const MAX_COMMENT_LENGTH = 300;
const MIN_RATING = 0;

interface Props {
  onSubmit: (data: CommentData) => Promise<void> | void;
}

export const CommentForm: React.FC<Props> = ({ onSubmit }) => {
  const [rating, setRating] = useState<number>(0);
  const [comment, setComment] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleRatingChange: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    const nextRating = Number(event.target.value);
    if (Number.isNaN(nextRating)) {
      return;
    }
    setRating(nextRating);
  };

  const handleCommentChange: React.ChangeEventHandler<HTMLTextAreaElement> = (
    event
  ) => {
    setComment(event.target.value);
  };

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);

    Promise.resolve(onSubmit({ comment, rating }))
      .then(() => {
        setRating(0);
        setComment('');
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  const commentLength = comment.trim().length;
  const isValid = rating > MIN_RATING && commentLength >= MIN_COMMENT_LENGTH && commentLength <= MAX_COMMENT_LENGTH;

  return (
    <form
      className="reviews__form form"
      action="#"
      method="post"
      onSubmit={handleFormSubmit}
    >
      <label className="reviews__label form__label" htmlFor="review">
        Your review
      </label>
      <div className="reviews__rating-form form__rating">
        {([5, 4, 3, 2, 1] as const).map((value) => {
          const id = value === 1 ? '1-star' : `${value}-stars`;
          const titleByValue: Record<typeof value, string> = {
            5: 'perfect',
            4: 'good',
            3: 'not bad',
            2: 'badly',
            1: 'terribly',
          } as const;
          const title = titleByValue[value];
          return (
            <React.Fragment key={value}>
              <input
                className="form__rating-input visually-hidden"
                name="rating"
                value={value}
                id={id}
                type="radio"
                checked={rating === value}
                onChange={handleRatingChange}
                disabled={isSubmitting}
              />
              <label
                htmlFor={id}
                className="reviews__rating-label form__rating-label"
                title={title}
              >
                <svg className="form__star-image" width={37} height={33}>
                  <use xlinkHref="#icon-star" />
                </svg>
              </label>
            </React.Fragment>
          );
        })}
      </div>
      <textarea
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        value={comment}
        onChange={handleCommentChange}
        disabled={isSubmitting}
        maxLength={MAX_COMMENT_LENGTH}
      />
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set{' '}
          <span className="reviews__star">rating</span> and describe your stay
          with <b className="reviews__text-amount">50 to 300 characters</b>.
        </p>
        <button
          className="reviews__submit form__submit button"
          type="submit"
          disabled={!isValid || isSubmitting}
        >
          Submit
        </button>
      </div>
    </form>
  );
};
