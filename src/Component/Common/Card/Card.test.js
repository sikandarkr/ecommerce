import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import Card from './Card';
import { onRemoveData } from '../../../redux/actions/universities';

jest.mock('react-redux', () => {
  const actualReactRedux = jest.requireActual('react-redux');
  return {
    ...actualReactRedux,
    useDispatch: () => jest.fn(),
  };
});

jest.mock('react-router-dom', () => {
  const actualReactRouterDOM = jest.requireActual('react-router-dom');
  return {
    ...actualReactRouterDOM,
    useNavigate: jest.fn(),
  };
});

jest.mock('../../../redux/actions/universities', () => ({
  onRemoveData: jest.fn(),
}));

const mockStore = configureStore([]);

describe('Card component', () => {
  let store;
  let dispatchMock;
  let navigateMock;

  beforeEach(() => {
    store = mockStore({});
    dispatchMock = jest.fn();
    navigateMock = jest.fn();

    jest.spyOn(require('react-redux'), 'useDispatch').mockReturnValue(dispatchMock);
    jest.spyOn(require('react-router-dom'), 'useNavigate').mockReturnValue(navigateMock);
  });

  it('renders Card component properly', () => {
    const { getByText } = render(
      <Provider store={store}>
        <Card name="University A" country="Country A" item={{ name: "University A" }} />
      </Provider>
    );

    expect(getByText('University A')).toBeInTheDocument();
    expect(getByText('Country: Country A')).toBeInTheDocument();
    expect(getByText('View Details')).toBeInTheDocument();
  });

  it('handles removeHandler correctly', () => {
    jest.useFakeTimers();

    const { getByText } = render(
      <Provider store={store}>
        <Card name="University A" country="Country A" item={{ name: "University A" }} />
      </Provider>
    );

    fireEvent.click(getByText('X'));
    jest.advanceTimersByTime(400);

    expect(dispatchMock).toHaveBeenCalledWith(onRemoveData("University A"));
  });

  it('handles Redirecthandler correctly', () => {
    const { getByText } = render(
      <Provider store={store}>
        <Card name="University A" country="Country A" item={{ name: "University A" }} />
      </Provider>
    );

    fireEvent.click(getByText('View Details'));

    expect(navigateMock).toHaveBeenCalledWith('/details', { state: { name: "University A" }, replace: true });
  });
});
