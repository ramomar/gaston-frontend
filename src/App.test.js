import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { rootReducer } from './foundation/redux/reducers';
import fetchMock from 'fetch-mock';

const store = createStore(
  rootReducer,
  applyMiddleware(
    thunkMiddleware
  )
);

beforeEach(() => {
  fetchMock.mock('*', 500);
});

it('renders without crashing', () => {
  const div = document.createElement('div');

  ReactDOM.render(<App store={store} />, div);

  ReactDOM.unmountComponentAtNode(div);
});
