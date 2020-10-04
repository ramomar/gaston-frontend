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

export function loginSuccess({ user, token }) {
  return {
    type: LOGIN_SUCCESS,
    payload: {
      user,
      token
    }
  };
}

export function loginFailure({ error, invalidUserOrPassword }) {
  return {
    type: LOGIN_FAILURE,
    payload: {
      error,
      invalidUserOrPassword
    }
  };
}

export function login({ user, password, AuthClient, Storage }) {
  return dispatch => {
    dispatch(loginRequest({ user }));

    return AuthClient.logIn(user, password, Storage)
      .then(({ token }) => dispatch(loginSuccess({ user, token })))
      .catch(error => {
        const invalidUserOrPassword =
          error.code === 'UserNotFoundException' ||
          error.code === 'NotAuthorizedException';

        dispatch(loginFailure({
          error: new Error(error.code) || error,
          invalidUserOrPassword
        }));

        return Promise.resolve(error);
      });
  };
}
