import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SortingOptions } from './sorting-options';
import { SortType } from '@/entities/offer';

describe('SortingOptions', () => {
  const getSortingTypeSpan = () =>
    screen.getByText(SortType.Popular, { selector: '.places__sorting-type' });

  it('should render current sort type', () => {
    const onSortChange = vi.fn();

    render(
      <SortingOptions
        currentSort={SortType.Popular}
        onSortChange={onSortChange}
      />
    );

    expect(screen.getByText('Sort by')).toBeInTheDocument();
    expect(getSortingTypeSpan()).toBeInTheDocument();
  });

  it('should open dropdown when clicked', async () => {
    const user = userEvent.setup();
    const onSortChange = vi.fn();

    render(
      <SortingOptions
        currentSort={SortType.Popular}
        onSortChange={onSortChange}
      />
    );

    const sortingType = getSortingTypeSpan();
    await user.click(sortingType);

    const dropdown = screen.getByRole('list');
    expect(dropdown).toHaveClass('places__options--opened');
  });

  it('should close dropdown and call onSortChange when option is selected', async () => {
    const user = userEvent.setup();
    const onSortChange = vi.fn();

    render(
      <SortingOptions
        currentSort={SortType.Popular}
        onSortChange={onSortChange}
      />
    );

    const sortingType = getSortingTypeSpan();
    await user.click(sortingType);

    const priceOption = screen.getByText(SortType.PriceLowToHigh);
    await user.click(priceOption);

    expect(onSortChange).toHaveBeenCalledWith(SortType.PriceLowToHigh);

    const dropdown = screen.getByRole('list');
    expect(dropdown).not.toHaveClass('places__options--opened');
  });

  it('should render all sort options', async () => {
    const user = userEvent.setup();
    const onSortChange = vi.fn();

    render(
      <SortingOptions
        currentSort={SortType.Popular}
        onSortChange={onSortChange}
      />
    );

    const sortingType = getSortingTypeSpan();
    await user.click(sortingType);

    const options = screen.getAllByRole('listitem');
    expect(options).toHaveLength(4);
    expect(screen.getByText(SortType.PriceLowToHigh)).toBeInTheDocument();
    expect(screen.getByText(SortType.PriceHighToLow)).toBeInTheDocument();
    expect(screen.getByText(SortType.TopRatedFirst)).toBeInTheDocument();
  });

  it('should highlight active sort option', async () => {
    const user = userEvent.setup();
    const onSortChange = vi.fn();

    render(
      <SortingOptions
        currentSort={SortType.Popular}
        onSortChange={onSortChange}
      />
    );

    const sortingType = getSortingTypeSpan();
    await user.click(sortingType);

    const options = screen.getAllByRole('listitem');
    const activeOption = options.find((option) =>
      option.classList.contains('places__option--active')
    );

    expect(activeOption).toHaveTextContent(SortType.Popular);
  });

  it('should toggle dropdown when clicked multiple times', async () => {
    const user = userEvent.setup();
    const onSortChange = vi.fn();

    render(
      <SortingOptions
        currentSort={SortType.Popular}
        onSortChange={onSortChange}
      />
    );

    const sortingType = getSortingTypeSpan();
    const dropdown = screen.getByRole('list');

    await user.click(sortingType);
    expect(dropdown).toHaveClass('places__options--opened');

    await user.click(sortingType);
    expect(dropdown).not.toHaveClass('places__options--opened');
  });
});
