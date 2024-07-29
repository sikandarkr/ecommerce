import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'; // Correctly import jest-dom matchers
import Loader from './Loader'; // Adjust the path as necessary

describe('Loader Component', () => {
  test('renders Loader component with correct class and ARIA attributes', () => {
    render(<Loader />);
    const loaderElement = screen.getByRole('alert', { name: 'loading' });
    expect(loaderElement).toBeInTheDocument();
    expect(loaderElement).toHaveClass('loader');
    expect(loaderElement).toHaveAttribute('aria-label', 'loading');
  });
});
