import * as AuthActions from '../actions/AuthActions';
import * as R from 'ramda';

export function makeAuthState({
  isAuthenticated = false,
  user = null,
  token = null,
  authenticatedAt = null
} = {}) {
  return {
    isAuthenticated,
    user,
    token,
    authenticatedAt,
    login: {
      isLogginIn: false,
      error: null,
      invalidUserOrPassword: false
    }
  };
}

function computeStateOnLoginRequest(state, _) {
  return R.mergeDeepRight(
    state,
    {
      isAuthenticated: false,
      user: null,
      token: null,
      authenticatedAt: null,
      login: {
        isLogginIn: true,
        error: null,
        invalidUserOrPassword: false
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
      token: payload.token,
      login: {
        isLogginIn: false,
        invalidUserOrPassword: false
      }
    }
  );
}

function computeStateOnLoginFailure(state, { payload }) {
  return R.mergeDeepRight(
    state,
    {
      login: {
        isLogginIn: false,
        error: payload.errorMessage,
        invalidUserOrPassword: payload.invalidUserOrPassword
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
