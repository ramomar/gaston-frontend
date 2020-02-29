import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import fetchMock from 'fetch-mock'
import * as ExpenseCategoryActions from './ExpenseCategoryActions';

const mockStore = configureMockStore([thunk]);

describe('fetchExpenseCategories', () => {
  afterEach(() => {
    fetchMock.reset();
  });

  const categories = [
    { name: 'Cena' },
    { name: 'Educación' }
  ];

  it('should dispatch the correct sequence of actions when the request is successful', () => {
    fetchMock.getOnce('end:/api/expenses/categories', {
      body: {
        categories
      }
    });

    const store = mockStore({});

    const expected = [
      { type: ExpenseCategoryActions.FETCH_EXPENSE_CATEGORIES_REQUEST, payload: {} },
      { type: ExpenseCategoryActions.FETCH_EXPENSE_CATEGORIES_SUCCESS, payload: { categories } }
    ];

    return store.dispatch(ExpenseCategoryActions.fetchExpenseCategories())
      .then(() => {
        expect(store.getActions()).toStrictEqual(expected);
      });
  });

  it('should dispatch the correct sequence of actions when the request is unsuccessful because of invalid json', () => {
    const body = 'Not a json response';

    fetchMock.getOnce('end:/api/expenses/categories', {
      body
    });

    const errorMessage = 'invalid json response body at http://localhost:5000/api/expenses/categories reason: Unexpected token N in JSON at position 0';

    const expected = [
      { type: ExpenseCategoryActions.FETCH_EXPENSE_CATEGORIES_REQUEST, payload: {} },
      { type: ExpenseCategoryActions.FETCH_EXPENSE_CATEGORIES_FAILURE, payload: { errorMessage } }
    ];

    const store = mockStore({});

    return store.dispatch(ExpenseCategoryActions.fetchExpenseCategories()).then(() => {
      expect(store.getActions()).toStrictEqual(expected);
    });
  });

  it('should dispatch the correct sequence of actions when the request is unsuccessful because of some HTTP error', () => {
    fetchMock.getOnce('end:/api/expenses/categories', {
      status: 403
    });

    const errorMessage = 'Forbidden';

    const expected = [
      { type: ExpenseCategoryActions.FETCH_EXPENSE_CATEGORIES_REQUEST, payload: {} },
      { type: ExpenseCategoryActions.FETCH_EXPENSE_CATEGORIES_FAILURE, payload: { errorMessage } }
    ];

    const store = mockStore({});

    return store.dispatch(ExpenseCategoryActions.fetchExpenseCategories()).then(() => {
      expect(store.getActions()).toStrictEqual(expected);
    });
  });

  it('should dispatch the correct sequence of actions when the request is unsuccessful because any other error', () => {
    const errorMessage = 'Some error';

    const error = new Error(errorMessage);

    fetchMock.getOnce('end:/api/expenses/categories', {
      throws: error
    });

    const expected = [
      { type: ExpenseCategoryActions.FETCH_EXPENSE_CATEGORIES_REQUEST, payload: {} },
      { type: ExpenseCategoryActions.FETCH_EXPENSE_CATEGORIES_FAILURE, payload: { errorMessage } }
    ];

    const store = mockStore({});

    return store.dispatch(ExpenseCategoryActions.fetchExpenseCategories()).then(() => {
      expect(store.getActions()).toStrictEqual(expected);
    });
  });
});
