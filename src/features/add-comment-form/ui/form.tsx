import React from 'react';
import { Review } from '@/entities/review/model/types';

interface Props {
  handleSubmit: (data: Pick<Review, 'comment' | 'rating'>) => void;
}

export const CommentForm: React.FC<Props> = ({ handleSubmit }) => {
  const [rating, setRating] = React.useState<number>(0);
  const [comment, setComment] = React.useState<string>('');

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

  const handleFormSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    handleSubmit({ comment, rating });
  };

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
      />
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set{' '}
          <span className="reviews__star">rating</span> and describe your stay
          with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button
          className="reviews__submit form__submit button"
          type="submit"
          disabled={!rating || comment.trim().length < 50}
        >
          Submit
        </button>
      </div>
    </form>
  );
};
