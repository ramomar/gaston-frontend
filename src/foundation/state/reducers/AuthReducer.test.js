import { authReducer } from './AuthReducer';
import * as Actions from '../actions';

describe('auth', () => {
  it('should return the initial state', () => {
    const expected = {
      isAuthenticated: false,
      user: null,
      authenticatedAt: null,
      login: {
        isLoggingIn: false,
        error: null
      }
    };

    const actual = authReducer(undefined, {});

    expect(actual).toStrictEqual(expected);
  });

  it(`should handle ${Actions.LOGIN_REQUEST} `, () => {
    const state = {
      isAuthenticated: false,
      user: null,
      authenticatedAt: null,
      login: {
        isLoggingIn: false,
        error: null
      }
    };

    const expected = {
      isAuthenticated: false,
      user: null,
      authenticatedAt: null,
      login: {
        isLoggingIn: true,
        error: null
      }
    };

    const user = 'user';

    const password = 'password';

    const action = Actions.loginRequest({ user, password });

    const actual = authReducer(state, action);

    expect(actual).toStrictEqual(expected);
  });

  it(`should handle ${Actions.LOGIN_SUCCESS}`, () => {
    const state = {
      isAuthenticated: false,
      user: null,
      authenticatedAt: null,
      login: {
        isLoggingIn: true,
        error: null
      }
    };

    const user = 'user';

    const expected = {
      isAuthenticated: true,
      user,
      authenticatedAt: null,
      login: {
        isLoggingIn: false,
        error: null
      }
    };

    const action = Actions.loginSuccess({ user });

    const actual = authReducer(state, action);

    expect(actual).toStrictEqual(expected);
  });

  it(`should handle ${Actions.LOGIN_FAILURE}`, () => {
    const state = {
      isAuthenticated: false,
      user: null,
      authenticatedAt: null,
      login: {
        isLoggingIn: true,
        error: null
      }
    };

    const errorMessage = 'User not found';

    const expected = {
      isAuthenticated: false,
      user: null,
      authenticatedAt: null,
      login: {
        isLoggingIn: false,
        error: errorMessage
      }
    };

    const action = Actions.loginFailure({ errorMessage });

    const actual = authReducer(state, action);

    expect(actual).toStrictEqual(expected);
  });
});
