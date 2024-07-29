import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import SortingDropdown from './SortDropDown';
import { SortUniversities } from '../../../redux/actions/universities'; // Import your action creator

jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
  useDispatch: () => jest.fn(),
}));

jest.mock('../../../redux/actions/universities', () => ({
  SortUniversities: jest.fn(),
}));

describe('SortingDropdown component', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders with initial options', () => {
    const { getByText } = render(<SortingDropdown />);
    expect(getByText('Select Sorting Option')).toBeInTheDocument();
    expect(getByText('A to Z')).toBeInTheDocument();
    expect(getByText('Z to A')).toBeInTheDocument();
  });

  it('calls dispatch with correct action on selecting "A to Z"', () => {
    const { getByRole } = render(<SortingDropdown />);
    fireEvent.change(getByRole('combobox'), { target: { value: 'asc' } });
    expect(SortUniversities).toHaveBeenCalledWith('asc');
  });

  it('calls dispatch with correct action on selecting "Z to A"', () => {
    const { getByRole } = render(<SortingDropdown />);
    fireEvent.change(getByRole('combobox'), { target: { value: 'desc' } });
    expect(SortUniversities).toHaveBeenCalledWith('desc');
  });
});
