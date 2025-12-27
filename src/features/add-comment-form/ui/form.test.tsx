import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CommentForm } from './form';

describe('CommentForm', () => {
  it('should render form with rating and textarea', () => {
    const handleSubmit = vi.fn();

    render(<CommentForm handleSubmit={handleSubmit} />);

    expect(screen.getByText('Your review')).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Tell how was your stay/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Submit/i })).toBeInTheDocument();
  });

  it('should have submit button disabled initially', () => {
    const handleSubmit = vi.fn();

    render(<CommentForm handleSubmit={handleSubmit} />);

    const submitButton = screen.getByRole('button', { name: /Submit/i });
    expect(submitButton).toBeDisabled();
  });

  it('should enable submit button when rating is selected and comment has 50+ characters', async () => {
    const user = userEvent.setup();
    const handleSubmit = vi.fn();

    render(<CommentForm handleSubmit={handleSubmit} />);

    const ratingInput = screen.getByTitle('perfect');
    await user.click(ratingInput);

    const textarea = screen.getByPlaceholderText(/Tell how was your stay/i);
    const longComment = 'This is a test comment that is definitely longer than fifty characters to pass validation.';
    await user.type(textarea, longComment);

    const submitButton = screen.getByRole('button', { name: /Submit/i });
    expect(submitButton).not.toBeDisabled();
  });

  it('should keep submit button disabled with short comment', async () => {
    const user = userEvent.setup();
    const handleSubmit = vi.fn();

    render(<CommentForm handleSubmit={handleSubmit} />);

    const ratingInput = screen.getByTitle('perfect');
    await user.click(ratingInput);

    const textarea = screen.getByPlaceholderText(/Tell how was your stay/i);
    await user.type(textarea, 'Short comment');

    const submitButton = screen.getByRole('button', { name: /Submit/i });
    expect(submitButton).toBeDisabled();
  });

  it('should keep submit button disabled without rating', async () => {
    const user = userEvent.setup();
    const handleSubmit = vi.fn();

    render(<CommentForm handleSubmit={handleSubmit} />);

    const textarea = screen.getByPlaceholderText(/Tell how was your stay/i);
    const longComment = 'This is a test comment that is definitely longer than fifty characters to pass validation.';
    await user.type(textarea, longComment);

    const submitButton = screen.getByRole('button', { name: /Submit/i });
    expect(submitButton).toBeDisabled();
  });

  it('should call handleSubmit with form data on submit', async () => {
    const user = userEvent.setup();
    const handleSubmit = vi.fn().mockResolvedValue(undefined);

    render(<CommentForm handleSubmit={handleSubmit} />);

    const ratingInput = screen.getByTitle('perfect');
    await user.click(ratingInput);

    const textarea = screen.getByPlaceholderText(/Tell how was your stay/i);
    const comment = 'This is a test comment that is definitely longer than fifty characters to pass validation.';
    await user.type(textarea, comment);

    const submitButton = screen.getByRole('button', { name: /Submit/i });
    await user.click(submitButton);

    expect(handleSubmit).toHaveBeenCalledWith({
      comment,
      rating: 5,
    });
  });

  it('should render all rating options', () => {
    const handleSubmit = vi.fn();

    render(<CommentForm handleSubmit={handleSubmit} />);

    expect(screen.getByTitle('perfect')).toBeInTheDocument();
    expect(screen.getByTitle('good')).toBeInTheDocument();
    expect(screen.getByTitle('not bad')).toBeInTheDocument();
    expect(screen.getByTitle('badly')).toBeInTheDocument();
    expect(screen.getByTitle('terribly')).toBeInTheDocument();
  });

  it('should clear form after successful submit', async () => {
    const user = userEvent.setup();
    const handleSubmit = vi.fn().mockResolvedValue(undefined);

    render(<CommentForm handleSubmit={handleSubmit} />);

    const ratingInput = screen.getByTitle('perfect');
    await user.click(ratingInput);

    const textarea = screen.getByPlaceholderText(/Tell how was your stay/i);
    const comment = 'This is a test comment that is definitely longer than fifty characters to pass validation.';
    await user.type(textarea, comment);

    const submitButton = screen.getByRole('button', { name: /Submit/i });
    await user.click(submitButton);

    expect(textarea).toHaveValue('');
  });
});
