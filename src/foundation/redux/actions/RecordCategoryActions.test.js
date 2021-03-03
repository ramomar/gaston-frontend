import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';
import * as RecordCategoryActions from './RecordCategoryActions';
import { AuthClient } from '../../auth';

jest.mock('../../auth');

process.env.REACT_APP_API_KEY = 'API_KEY';

const mockStore = configureMockStore([thunk]);

describe('fetchRecordCategories', () => {
  const token = 'token';

  AuthClient.getAuthData.mockReturnValue({ token });

  afterEach(() => {
    fetchMock.reset();
  });

  const categories = [
    { name: 'Cena' },
    { name: 'Educación' }
  ];

  it('should dispatch the correct sequence of actions when the request is successful', () => {
    fetchMock.getOnce('end:/categories', {
      body: {
        categories
      }
    });

    const store = mockStore({});

    const expected = [
      { type: RecordCategoryActions.FETCH_RECORD_CATEGORIES_REQUEST, payload: {} },
      { type: RecordCategoryActions.FETCH_RECORD_CATEGORIES_SUCCESS, payload: { categories } }
    ];

    return store.dispatch(RecordCategoryActions.fetchRecordCategories())
      .then(() => {
        expect(store.getActions()).toStrictEqual(expected);
      });
  });

  it('should use the correct headers', () => {
    fetchMock.getOnce('end:/categories', 200);

    const store = mockStore({});

    const expected = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'X-Api-Key': 'API_KEY'
      }
    };

    return store.dispatch(RecordCategoryActions.fetchRecordCategories())
      .then(() => {
        const [, options] = fetchMock.lastCall();
        expect(options).toMatchObject(expected);
      });
  });

  it('should dispatch the correct sequence of actions when the request is unsuccessful because of invalid json', () => {
    const body = 'Not a json response';

    fetchMock.getOnce('end:/categories', {
      body
    });

    const error = new Error('invalid json response body at http://localhost:5000/categories reason: Unexpected token N in JSON at position 0');

    const expected = [
      { type: RecordCategoryActions.FETCH_RECORD_CATEGORIES_REQUEST, payload: {} },
      { type: RecordCategoryActions.FETCH_RECORD_CATEGORIES_FAILURE, payload: { error } }
    ];

    const store = mockStore({});

    return store.dispatch(RecordCategoryActions.fetchRecordCategories()).then(() => {
      expect(store.getActions()).toEqual(expected);
    });
  });

  it('should dispatch the correct sequence of actions when the request is unsuccessful because of some HTTP error', () => {
    fetchMock.getOnce('end:/categories', {
      status: 403
    });

    const error = new Error('Forbidden');

    const expected = [
      { type: RecordCategoryActions.FETCH_RECORD_CATEGORIES_REQUEST, payload: {} },
      { type: RecordCategoryActions.FETCH_RECORD_CATEGORIES_FAILURE, payload: { error } }
    ];

    const store = mockStore({});

    return store.dispatch(RecordCategoryActions.fetchRecordCategories()).then(() => {
      expect(store.getActions()).toEqual(expected);
    });
  });

  it('should dispatch the correct sequence of actions when the request is unsuccessful because any other error', () => {
    const error = new Error('Some error');

    fetchMock.getOnce('end:/categories', {
      throws: error
    });

    const expected = [
      { type: RecordCategoryActions.FETCH_RECORD_CATEGORIES_REQUEST, payload: {} },
      { type: RecordCategoryActions.FETCH_RECORD_CATEGORIES_FAILURE, payload: { error } }
    ];

    const store = mockStore({});

    return store.dispatch(RecordCategoryActions.fetchRecordCategories()).then(() => {
      expect(store.getActions()).toEqual(expected);
    });
  });
});
