import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';
import { rootReducer } from './reducers';

import { Keys as StorageKeys, Storage } from '../storage';
import { makeAuthState } from './reducers/AuthReducer';
import { DateTime } from 'luxon';

function authIsExpired(storedData) {
  const AUTH_EXPIRATION_DAYS = 28;

  return DateTime.fromISO(storedData.authenticatedAt)
    .diff(DateTime.local(), 'days') > AUTH_EXPIRATION_DAYS;
}

const storedData = Storage.getItem(StorageKeys.AUTH);

const createStoreArguments = [rootReducer];

const isAuthExpired = !!storedData && authIsExpired(storedData);

if (!!storedData && !isAuthExpired) {
  const stateSlice = { auth: makeAuthState(true, storedData.user, storedData.authenticatedAt) };

  createStoreArguments.push(stateSlice);
} else if (isAuthExpired) {
  Storage.deleteItem(StorageKeys.AUTH);
}

createStoreArguments.push(
  composeWithDevTools(
    applyMiddleware(
      thunkMiddleware
    ))
);

const store = createStore.apply(null, createStoreArguments);

export default store;
