import * as AuthActions from '../actions/AuthActions';
import * as R from 'ramda';

export function makeAuthState(isAuthenticated = false, user = null, authenticatedAt = null) {
  return {
    isAuthenticated,
    user,
    authenticatedAt,
    login: {
      isLoggingIn: false,
      error: null
    }
  };
}

function computeStateOnLoginRequest(state, _) {
  return R.mergeDeepRight(
    state,
    {
      login: {
        isLoggingIn: true
      }
    }
  );
}

function computeStateOnLoginSuccess(state, { payload }) {
  return R.mergeDeepRight(
    state,
    {
      isAuthenticated: true,
      user: payload.user,
      login: {
        isLoggingIn: false
      }
    }
  );
}

function computeStateOnLoginFailure(state, { payload }) {
  return R.mergeDeepRight(
    state,
    {
      login: {
        isLoggingIn: false,
        error: payload.errorMessage
      }
    }
  );
}

export function authReducer(state = makeAuthState(), action) {
  switch (action.type) {
    case AuthActions.LOGIN_REQUEST:
      return computeStateOnLoginRequest(state, action);
    case AuthActions.LOGIN_SUCCESS:
      return computeStateOnLoginSuccess(state, action);
    case AuthActions.LOGIN_FAILURE:
      return computeStateOnLoginFailure(state, action);
    default:
      return state;
  }
}
