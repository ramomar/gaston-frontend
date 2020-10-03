import { authReducer } from './AuthReducer';
import * as Actions from '../actions';

describe('auth', () => {
  it('should return the initial state', () => {
    const expected = {
      isAuthenticated: false,
      user: null,
      token: null,
      authenticatedAt: null,
      login: {
        isLogginIn: false,
        invalidUserOrPassword: false,
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
      token: null,
      login: {
        isLogginIn: false,
        error: null,
        invalidUserOrPassword: false
      }
    };

    const expected = {
      isAuthenticated: false,
      user: null,
      token: null,
      authenticatedAt: null,
      login: {
        isLogginIn: true,
        error: null,
        invalidUserOrPassword: false
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
      token: null,
      login: {
        isLogginIn: true,
        error: null,
        invalidUserOrPassword: false
      }
    };

    const user = 'user';

    const token = 'token';

    const expected = {
      isAuthenticated: true,
      user,
      token,
      authenticatedAt: null,
      login: {
        isLogginIn: false,
        error: null,
        invalidUserOrPassword: false
      }
    };

    const action = Actions.loginSuccess({ user, token });

    const actual = authReducer(state, action);

    expect(actual).toStrictEqual(expected);
  });

  it(`should handle ${Actions.LOGIN_FAILURE}`, () => {
    const state = {
      isAuthenticated: false,
      user: null,
      token: null,
      authenticatedAt: null,
      login: {
        isLogginIn: true,
        error: null,
        invalidUserOrPassword: false
      }
    };

    const errorMessage = 'An error';

    const invalidUserOrPassword = true;

    const expected = {
      isAuthenticated: false,
      user: null,
      token: null,
      authenticatedAt: null,
      login: {
        isLogginIn: false,
        error: errorMessage,
        invalidUserOrPassword: true
      }
    };

    const action = Actions.loginFailure({ errorMessage, invalidUserOrPassword });

    const actual = authReducer(state, action);

    expect(actual).toStrictEqual(expected);
  });
});
