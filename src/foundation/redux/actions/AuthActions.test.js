import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as AuthActions from './AuthActions';

const mockStore = configureMockStore([thunk]);

function makeAuthClient({ withSuccessfulResponse, token, errorCode }) {
  return {
    logIn: ({ user, password }) => withSuccessfulResponse ?
      Promise.resolve({ token }) :
      Promise.reject({ code: errorCode })
  };
}

function makeStorage() {
  return {
    setItem: jest.fn(),
    removeItem: jest.fn()
  };
}

describe('login', () => {
  it('should dispatch the correct sequence of actions when login success', () => {
    const user = 'user';

    const password = 'password';

    const store = mockStore({});

    const token = 'token';

    const AuthClient = makeAuthClient({ withSuccessfulResponse: true, token });

    const Storage = makeStorage();

    const expected = [
      { type: AuthActions.LOGIN_REQUEST, payload: { user } },
      { type: AuthActions.LOGIN_SUCCESS, payload: { user, token } }
    ];

    return store.dispatch(AuthActions.login({ user, password, AuthClient, Storage }))
      .then(() => {
        expect(store.getActions()).toStrictEqual(expected);
      });
  });


  it('should dispatch the correct sequence of actions when login fails', () => {
    const user = 'user';

    const password = 'password';

    const errorMessage = 'An error';

    const error = new Error(errorMessage);

    const store = mockStore({});

    const AuthClient = makeAuthClient({ withSuccessfulResponse: false, errorCode: errorMessage });

    const Storage = makeStorage();

    const expected = [
      { type: AuthActions.LOGIN_REQUEST, payload: { user } },
      { type: AuthActions.LOGIN_FAILURE, payload: { error, invalidUserOrPassword: false } }
    ];

    return store.dispatch(AuthActions.login({ user, password, AuthClient, Storage }))
      .then(() => {
        expect(store.getActions()).toStrictEqual(expected);
      });
  });

  it('should dispatch the correct sequence of actions when login fails because of invalid user', () => {
    const user = 'user';

    const password = 'password';

    const errorMessage = 'UserNotFoundException';

    const error = new Error(errorMessage);

    const store = mockStore({});

    const AuthClient = makeAuthClient({ withSuccessfulResponse: false, errorCode: errorMessage });

    const Storage = makeStorage();

    const expected = [
      { type: AuthActions.LOGIN_REQUEST, payload: { user } },
      { type: AuthActions.LOGIN_FAILURE, payload: { error, invalidUserOrPassword: true } }
    ];

    return store.dispatch(AuthActions.login({ user, password, AuthClient, Storage }))
      .then(() => {
        expect(store.getActions()).toStrictEqual(expected);
      });
  });

  it('should dispatch the correct sequence of actions when login fails because of invalid password', () => {
    const user = 'user';

    const password = 'password';

    const errorMessage = 'NotAuthorizedException';

    const error = new Error(errorMessage);

    const store = mockStore({});

    const AuthClient = makeAuthClient({ withSuccessfulResponse: false, errorCode: errorMessage });

    const Storage = makeStorage();

    const expected = [
      { type: AuthActions.LOGIN_REQUEST, payload: { user } },
      { type: AuthActions.LOGIN_FAILURE, payload: { error, invalidUserOrPassword: true } }
    ];

    return store.dispatch(AuthActions.login({ user, password, AuthClient, Storage }))
      .then(() => {
        expect(store.getActions()).toStrictEqual(expected);
      });
  });
});
