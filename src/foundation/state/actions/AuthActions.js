import { Keys as StorageKeys } from '../../storage';

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

export function loginRequest({ user }) {
  return {
    type: LOGIN_REQUEST,
    payload: {
      user
    }
  };
}

export function loginSuccess({ user }) {
  return {
    type: LOGIN_SUCCESS,
    payload: {
      user
    }
  };
}

export function loginFailure({ errorMessage, invalidUserOrPassword }) {
  return {
    type: LOGIN_FAILURE,
    payload: {
      errorMessage,
      invalidUserOrPassword
    }
  };
}

export function login({ user, password, now, AuthClient, Storage }) {
  return dispatch => {
    dispatch(loginRequest({ user }));

    Storage.removeItem(StorageKeys.AUTH);

    return AuthClient.logIn(user, password)
      .then(_ => {
        Storage.setItem(StorageKeys.AUTH, { user, authenticatedAt: now.toISO() });
        return dispatch(loginSuccess({ user }));
      })
      .catch(error => {
        const invalidUserOrPassword =
          error.code === 'UserNotFoundException' ||
          error.code === 'NotAuthorizedException';

        dispatch(loginFailure({
          errorMessage: error.code,
          invalidUserOrPassword
        }));

        return Promise.resolve(error);
      });
  };
}
