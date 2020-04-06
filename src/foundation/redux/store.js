import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';
import { rootReducer } from './reducers';
import { AuthClient } from '../auth';
import { Storage } from '../storage';
import { makeAuthState } from './reducers/AuthReducer';

const createStoreArguments = [rootReducer];

const auth = AuthClient.getAuthData(Storage);

if (auth) {
  const authParams = {
    isAuthenticated: true,
    user: auth.user,
    accessToken: auth.accessToken,
    authenticatedAt: auth.authenticatedAt
  };

  const stateSlice = { auth: makeAuthState(authParams) };

  createStoreArguments.push(stateSlice);
}

createStoreArguments.push(
  composeWithDevTools(
    applyMiddleware(
      thunkMiddleware
    ))
);

const store = createStore.apply(null, createStoreArguments);

export default store;
