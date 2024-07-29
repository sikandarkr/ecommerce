import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useLocation, useNavigate } from 'react-router-dom';
import ListDetails from './ListDetails'; // Adjust the path as necessary

// Mock useLocation and useNavigate
jest.mock('react-router-dom', () => ({
  useLocation: jest.fn(),
  useNavigate: jest.fn(),
}));

describe('ListDetails Component', () => {
  const mockNavigate = jest.fn();
  const mockState = {
    name: 'Test University',
    'state-province': 'Test Province',
    country: 'Test Country',
    alpha_two_code: 'TC'
  };

  beforeEach(() => {
    useLocation.mockReturnValue({ state: mockState });
    useNavigate.mockReturnValue(mockNavigate);
    jest.clearAllMocks();
  });

  test('renders ListDetails component with correct state', () => {
    render(<ListDetails />);
    expect(screen.getByText('Universities details Page')).toBeInTheDocument();
    expect(screen.getByText('Test University')).toBeInTheDocument();
    expect(screen.getByText('Test Province')).toBeInTheDocument();
    expect(screen.getByText('Test Country')).toBeInTheDocument();
    expect(screen.getByText('TC')).toBeInTheDocument();
  });

  test('navigates back on "Go Back" click', () => {
    render(<ListDetails />);
    fireEvent.click(screen.getByText('Go Back'));
    expect(mockNavigate).toHaveBeenCalledWith('/', {});
  });
});
