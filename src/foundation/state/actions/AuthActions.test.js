import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as AuthActions from './AuthActions';

const mockStore = configureMockStore([thunk]);

function makeAuthClient({ withSuccessfulResponse, errorCode }) {
  return {
    signIn: ({ user, password }) => withSuccessfulResponse ?
      Promise.resolve({ success: true }) :
      Promise.reject({ success: false, code: errorCode })
  };
}

describe('login', () => {
  it('should dispatch the correct sequence of actions when login success', () => {
    const user = 'user';

    const password = 'password';

    const store = mockStore({});

    const AuthClient = makeAuthClient({ withSuccessfulResponse: true });

    const expected = [
      { type: AuthActions.LOGIN_REQUEST, payload: { user, password } },
      { type: AuthActions.LOGIN_SUCCESS, payload: { user } }
    ];

    return store.dispatch(AuthActions.login({ user, password, AuthClient })).then(() => {
      expect(store.getActions()).toStrictEqual(expected);
    });
  });


  it('should dispatch the correct sequence of actions when login fails', () => {
    const user = 'user';

    const password = 'password';

    const errorMessage = 'User not found';

    const store = mockStore({});

    const AuthClient = makeAuthClient({ withSuccessfulResponse: false, errorCode: errorMessage });

    const expected = [
      { type: AuthActions.LOGIN_REQUEST, payload: { user, password } },
      { type: AuthActions.LOGIN_FAILURE, payload: { errorMessage } }
    ];

    return store.dispatch(AuthActions.login({ user, password, AuthClient })).then(() => {
      expect(store.getActions()).toStrictEqual(expected);
    });
  });
});
