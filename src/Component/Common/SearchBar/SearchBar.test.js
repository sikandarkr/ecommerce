import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useDispatch } from 'react-redux';
import SearchBar from './SearchBar'; // Adjust the path as necessary
import { OnSearch, OnClear } from '../../../redux/actions/universities';

// Mock useDispatch
jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
}));

// Mock debounce from lodash
jest.mock('lodash', () => ({
  debounce: (fn) => fn, // Mock debounce to call the function immediately
}));

describe('SearchBar Component', () => {
  const dispatch = jest.fn();
  beforeEach(() => {
    useDispatch.mockReturnValue(dispatch);
    jest.clearAllMocks();
  });

  test('renders input field correctly', () => {
    render(<SearchBar searchTerm="" />);
    const inputElement = screen.getByPlaceholderText('Search by name...');
    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toHaveValue('');
  });

  test('typing in input field triggers search handler', () => {
    render(<SearchBar searchTerm="" />);
    const inputElement = screen.getByPlaceholderText('Search by name...');

    fireEvent.change(inputElement, { target: { value: 'test' } });
    expect(dispatch).toHaveBeenCalledWith(OnSearch('test'));
  });

  test('clearing input field triggers clear handler', () => {
    render(<SearchBar searchTerm="test" />);
    const inputElement = screen.getByPlaceholderText('Search by name...');

    fireEvent.change(inputElement, { target: { value: '' } });
    expect(dispatch).toHaveBeenCalledWith(OnClear());
  });
});
