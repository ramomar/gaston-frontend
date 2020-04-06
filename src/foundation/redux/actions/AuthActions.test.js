import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as AuthActions from './AuthActions';
import * as StorageKeys from '../../storage/keys';
import { DateTime } from 'luxon';

const mockStore = configureMockStore([thunk]);

function makeAuthClient({ withSuccessfulResponse, accessToken, errorCode }) {
  return {
    logIn: ({ user, password }) => withSuccessfulResponse ?
      Promise.resolve({ accessToken }) :
      Promise.reject({ code: errorCode })
  };
}

function makeStorage({ setFnMock, removeFnMock }) {
  return {
    setItem: setFnMock,
    removeItem: removeFnMock
  };
}

describe('login', () => {
  it('should dispatch the correct sequence of actions when login success', () => {
    const user = 'user';

    const password = 'password';

    const store = mockStore({});

    const now = DateTime.fromISO('2020-03-03T05:29:02.700Z');

    const accessToken = 'token';

    const setFnMock = jest.fn();

    const removeFnMock = jest.fn();

    const AuthClient = makeAuthClient({ withSuccessfulResponse: true, accessToken });

    const Storage = makeStorage({ setFnMock, removeFnMock });

    const expected = [
      { type: AuthActions.LOGIN_REQUEST, payload: { user } },
      { type: AuthActions.LOGIN_SUCCESS, payload: { user, accessToken } }
    ];

    return store.dispatch(AuthActions.login({ user, password, now, AuthClient, Storage }))
      .then(() => {
        expect(store.getActions()).toStrictEqual(expected);
        expect(removeFnMock).toHaveBeenCalledWith(StorageKeys.AUTH);
        expect(setFnMock).toHaveBeenCalledWith(StorageKeys.AUTH, { user, authenticatedAt: now.toISO(), accessToken });
      });
  });


  it('should dispatch the correct sequence of actions when login fails', () => {
    const user = 'user';

    const password = 'password';

    const errorMessage = 'An error';

    const store = mockStore({});

    const now = DateTime.fromISO('2020-03-03T05:29:02.700Z');

    const AuthClient = makeAuthClient({ withSuccessfulResponse: false, errorCode: errorMessage });

    const Storage = makeStorage({ setFnMock: () => null, removeFnMock: () => null });

    const expected = [
      { type: AuthActions.LOGIN_REQUEST, payload: { user } },
      { type: AuthActions.LOGIN_FAILURE, payload: { errorMessage, invalidUserOrPassword: false } }
    ];

    return store.dispatch(AuthActions.login({ user, password, now, AuthClient, Storage }))
      .then(() => {
        expect(store.getActions()).toStrictEqual(expected);
      });
  });

  it('should dispatch the correct sequence of actions when login fails because of invalid user', () => {
    const user = 'user';

    const password = 'password';

    const errorMessage = 'UserNotFoundException';

    const store = mockStore({});

    const now = DateTime.fromISO('2020-03-03T05:29:02.700Z');

    const AuthClient = makeAuthClient({ withSuccessfulResponse: false, errorCode: errorMessage });

    const Storage = makeStorage({ setFnMock: () => null, removeFnMock: () => null });

    const expected = [
      { type: AuthActions.LOGIN_REQUEST, payload: { user } },
      { type: AuthActions.LOGIN_FAILURE, payload: { errorMessage, invalidUserOrPassword: true } }
    ];

    return store.dispatch(AuthActions.login({ user, password, now, AuthClient, Storage }))
      .then(() => {
        expect(store.getActions()).toStrictEqual(expected);
      });
  });

  it('should dispatch the correct sequence of actions when login fails because of invalid password', () => {
    const user = 'user';

    const password = 'password';

    const errorMessage = 'NotAuthorizedException';

    const store = mockStore({});

    const now = DateTime.fromISO('2020-03-03T05:29:02.700Z');

    const AuthClient = makeAuthClient({ withSuccessfulResponse: false, errorCode: errorMessage });

    const Storage = makeStorage({ setFnMock: () => null, removeFnMock: () => null });

    const expected = [
      { type: AuthActions.LOGIN_REQUEST, payload: { user } },
      { type: AuthActions.LOGIN_FAILURE, payload: { errorMessage, invalidUserOrPassword: true } }
    ];

    return store.dispatch(AuthActions.login({ user, password, now, AuthClient, Storage }))
      .then(() => {
        expect(store.getActions()).toStrictEqual(expected);
      });
  });
});
