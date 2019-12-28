import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import fetchMock from 'fetch-mock'
import * as ExpenseActions from './ExpenseActions';
import { DateTime } from 'luxon';

const mockStore = configureMockStore([thunk]);

describe('fetchExpenses', () => {
  afterEach(() => {
    fetchMock.reset();
  });

  it.only('should dispatch the correct sequence of actions when the request is successful', () => {
    const expenses = [
      {
        'id': '0007182d-54cb-42b7-88fc-bbaba51db198',
        'amount': 150,
        'date': new DateTime('2017-03-19T05:29:02.700Z'),
        'note': 'Cena'
      }
    ];

    const hasMore = true;

    const paginationStart = 0;

    const paginationEnd = 10;

    fetchMock.getOnce('end:/api/expenses', {
      headers: { 'Content-Type': 'application/json' },
      body: {
        expenses,
        hasMore
      }
    });

    const store = mockStore({});

    const expected = [
      { type: ExpenseActions.FETCH_EXPENSES_REQUEST, payload: { paginationStart, paginationEnd } },
      { type: ExpenseActions.FETCH_EXPENSES_SUCCESS, payload: { expenses, hasMore, paginationStart, paginationEnd } }
    ];

    return store.dispatch(ExpenseActions.fetchExpenses({ paginationStart, paginationEnd }))
      .then(() => {
        expect(store.getActions()).toEqual(expected);
      });
  });

  it('should dispatch the correct sequence of actions when the request is unsuccessful because of invalid json', () => {
    const paginationStart = 0;

    const paginationEnd = 10

    const body = 'Not a json response';

    fetchMock.getOnce('end:/api/expenses', {
      body
    });

    const errorMessage = 'invalid json response body at http://localhost:5000/api/expenses reason: Unexpected token N in JSON at position 0';

    const expected = [
      { type: ExpenseActions.FETCH_EXPENSES_REQUEST, payload: { paginationStart, paginationEnd } },
      { type: ExpenseActions.FETCH_EXPENSES_FAILURE, payload: { errorMessage } }
    ];

    const store = mockStore({});

    return store.dispatch(ExpenseActions.fetchExpenses({ paginationStart, paginationEnd }))
      .catch(() => {
        expect(store.getActions()).toEqual(expected);
      });
  });

  it('should dispatch the correct sequence of actions when the request is unsuccessful because of some HTTP error', () => {
    const paginationStart = 0;

    const paginationEnd = 10

    fetchMock.getOnce('end:/api/expenses', {
      status: 403
    });

    const errorMessage = 'Forbidden';

    const expected = [
      { type: ExpenseActions.FETCH_EXPENSES_REQUEST, payload: { paginationStart, paginationEnd } },
      { type: ExpenseActions.FETCH_EXPENSES_FAILURE, payload: { errorMessage } }
    ];

    const store = mockStore({});

    return store.dispatch(ExpenseActions.fetchExpenses({ paginationStart, paginationEnd }))
      .catch(() => {
        expect(store.getActions()).toEqual(expected);
      });
  });

  it('should dispatch the correct sequence of actions when the request is unsuccessful because any other error', () => {
    const paginationStart = 0;

    const paginationEnd = 10

    const errorMessage = 'Some error';

    const error = new Error(errorMessage);

    fetchMock.getOnce('end:/api/expenses', {
      throws: error
    });

    const expected = [
      { type: ExpenseActions.FETCH_EXPENSES_REQUEST, payload: { paginationStart, paginationEnd } },
      { type: ExpenseActions.FETCH_EXPENSES_FAILURE, payload: { errorMessage } }
    ];

    const store = mockStore({});

    return store.dispatch(ExpenseActions.fetchExpenses({ paginationStart, paginationEnd }))
      .catch(() => {
        expect(store.getActions()).toEqual(expected);
      });
  });
});

describe('reviewExpenseRequest', () => {
  afterEach(() => {
    fetchMock.reset();
  });

  it('should dispatch the correct sequence of actions when the request is successful', () => {
    const expense = {
      'id': '0007182d-54cb-42b7-88fc-bbaba51db198',
      'amount': 150,
      'date': new DateTime('2017-03-19T05:29:02.700Z'),
      'note': 'Cena'
    };

    const reviewedExpense = {
      'id': '0007182d-54cb-42b7-88fc-bbaba51db198',
      'amount': 150,
      'date': '2017-03-19T05:29:02.700Z',
      'note': 'Cena'
    };

    fetchMock.postOnce(`end:/api/expenses/${expense.id}/review`, {
      headers: { 'Content-Type': 'application/json' },
      body: {
        expense: reviewedExpense
      }
    });

    const store = mockStore({});

    const expected = [
      { type: ExpenseActions.REVIEW_EXPENSE_REQUEST, payload: { expense } },
      { type: ExpenseActions.REVIEW_EXPENSE_SUCCESS, payload: { expense: reviewedExpense } }
    ];

    return store.dispatch(ExpenseActions.reviewExpense({ expense }))
      .then(() => {
        expect(store.getActions()).toEqual(expected);
      });
  });

  it('should dispatch the correct sequence of actions when the request is unsuccessful because of sending invalid json', () => {
    const expense = {
      'id': '0007182d-54cb-42b7-88fc-bbaba51db198',
      'amount': 150,
      'date': new DateTime('2017-03-19T05:29:02.700Z'),
      'note': 'Cena'
    };

    fetchMock.postOnce(`end:/api/expenses/${expense.id}/review`, {
      body: 'Bad Request',
      status: 400
    });

    const errorMessage = 'Bad Request';

    const expected = [
      { type: ExpenseActions.REVIEW_EXPENSE_REQUEST, payload: { expense } },
      { type: ExpenseActions.REVIEW_EXPENSE_FAILURE, payload: { errorMessage } }
    ];

    const store = mockStore({});

    return store.dispatch(ExpenseActions.reviewExpense({ expense }))
      .catch(() => {
        expect(store.getActions()).toEqual(expected);
      });
  });

  it('should dispatch the correct sequence of actions when the request is unsuccessful because of receiving invalid json', () => {
    const expense = {
      'id': '0007182d-54cb-42b7-88fc-bbaba51db198',
      'amount': 150,
      'date': new DateTime('2017-03-19T05:29:02.700Z'),
      'note': 'Cena'
    };

    fetchMock.postOnce(`end:/api/expenses/${expense.id}/review`, {
      body: 'Hello',
      status: 200
    });

    const errorMessage = 'invalid json response body at http://localhost:5000/api/expenses/0007182d-54cb-42b7-88fc-bbaba51db198/review reason: Unexpected token H in JSON at position 0';

    const expected = [
      { type: ExpenseActions.REVIEW_EXPENSE_REQUEST, payload: { expense } },
      { type: ExpenseActions.REVIEW_EXPENSE_FAILURE, payload: { errorMessage } }
    ];

    const store = mockStore({});

    return store.dispatch(ExpenseActions.reviewExpense({ expense }))
      .catch(() => {
        expect(store.getActions()).toEqual(expected);
      });
  });

  it('should dispatch the correct sequence of actions when the request is unsuccessful because of some HTTP error', () => {
    const expense = {
      'id': '0007182d-54cb-42b7-88fc-bbaba51db198',
      'amount': 150,
      'date': new DateTime('2017-03-19T05:29:02.700Z'),
      'note': 'Cena'
    };

    fetchMock.postOnce(`end:/api/expenses/${expense.id}/review`, {
      body: 'Forbidden',
      status: 403
    });

    const errorMessage = 'Forbidden';

    const expected = [
      { type: ExpenseActions.REVIEW_EXPENSE_REQUEST, payload: { expense } },
      { type: ExpenseActions.REVIEW_EXPENSE_FAILURE, payload: { errorMessage } }
    ];

    const store = mockStore({});

    return store.dispatch(ExpenseActions.reviewExpense({ expense }))
      .catch(() => {
        expect(store.getActions()).toEqual(expected);
      });
  });

  it('should dispatch the correct sequence of actions when the request is unsuccessful because any other error', () => {
    const expense = {
      'id': '0007182d-54cb-42b7-88fc-bbaba51db198',
      'amount': 150,
      'date': new DateTime('2017-03-19T05:29:02.700Z'),
      'note': 'Cena'
    };

    const errorMessage = 'Some error';

    const error = new Error(errorMessage)

    fetchMock.postOnce(`end:/api/expenses/${expense.id}/review`, {
      throws: error
    });

    const expected = [
      { type: ExpenseActions.REVIEW_EXPENSE_REQUEST, payload: { expense } },
      { type: ExpenseActions.REVIEW_EXPENSE_FAILURE, payload: { errorMessage } }
    ];

    const store = mockStore({});

    return store.dispatch(ExpenseActions.reviewExpense({ expense }))
      .catch(() => {
        expect(store.getActions()).toEqual(expected);
      });
  });
});
