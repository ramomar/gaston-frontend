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

export function loginSuccess({ user, accessToken }) {
  return {
    type: LOGIN_SUCCESS,
    payload: {
      user,
      accessToken
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

export function login({ user, password, AuthClient, Storage }) {
  return dispatch => {
    dispatch(loginRequest({ user }));

    return AuthClient.logIn(user, password, Storage)
      .then(({ accessToken }) => dispatch(loginSuccess({ user, accessToken })))
      .catch(error => {
        const invalidUserOrPassword =
          error.code === 'UserNotFoundException' ||
          error.code === 'NotAuthorizedException';

        dispatch(loginFailure({
          errorMessage: error.code || error.message,
          invalidUserOrPassword
        }));

        return Promise.resolve(error);
      });
  };
}
