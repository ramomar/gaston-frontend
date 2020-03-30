export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

export function loginRequest({ user, password }) {
  return {
    type: LOGIN_REQUEST,
    payload: {
      user,
      password
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

export function loginFailure({ errorMessage }) {
  return {
    type: LOGIN_FAILURE,
    payload: { errorMessage }
  };
}

export function login({ user, password, AuthClient }) {
  return dispatch => {
    dispatch(loginRequest({ user, password }));

    return AuthClient.signIn({ user, password })
      .then(result => dispatch(loginSuccess({ user })))
      .catch(error => {
        dispatch(loginFailure({ errorMessage: error.code }));
        return Promise.resolve(error);
      });
  };
}
