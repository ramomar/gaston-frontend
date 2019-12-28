import { expenseReducer } from './ExpenseReducer';
import * as actions from '../actions';

describe('expenses', () => {
  it('should return the initial state', () => {
    const expected = {
      expenses: new Set(),
      fetch: {
        isFetching: false,
        hasMore: true,
        hasError: false,
        error: null,
        paginationStart: 0,
        paginationEnd: 0
      },
      review: {
        hasError: false,
        error: null
      }
    };

    const actual = expenseReducer(undefined, {});

    expect(actual).toEqual(expected);
  });

  it(`should handle ${actions.FETCH_EXPENSES_REQUEST}`, () => {
    const expected = {
      expenses: new Set(),
      fetch: {
        isFetching: true,
        hasMore: true,
        hasError: false,
        error: null,
        paginationStart: 0,
        paginationEnd: 0
      },
      review: {
        hasError: false,
        error: null
      }
    };

    const action = actions.fetchExpensesRequest({ paginationStart: 0, paginationEnd: 10 });

    const actual = expenseReducer(undefined, action);

    expect(actual).toEqual(expected);
  });

  it(`should handle ${actions.FETCH_EXPENSES_SUCCESS}`, () => {
    const state = {
      expenses: new Set(),
      fetch: {
        isFetching: false,
        hasMore: true,
        hasError: false,
        error: null,
        paginationStart: 0,
        paginationEnd: 0
      },
      review: {
        hasError: false,
        error: null
      }
    };

    const expenses = new Set([
      {
        'id': '0007182d-54cb-42b7-88fc-bbaba51db198',
        'amount': 150,
        'date': '2017-03-19T05:29:02.700Z',
        'note': 'Cena'
      }
    ]);

    const hasMore = true;

    const paginationStart = 0;

    const paginationEnd = 10;

    const expected = {
      expenses,
      fetch: {
        isFetching: false,
        hasMore,
        hasError: false,
        error: null,
        paginationStart,
        paginationEnd
      },
      review: {
        hasError: false,
        error: null
      }
    };

    const action = actions.fetchExpensesSuccess({
      expenses,
      hasMore,
      paginationStart,
      paginationEnd
    });

    const actual = expenseReducer(state, action);

    expect(actual).toEqual(expected);
  });

  it(`should handle ${actions.FETCH_EXPENSES_FAILURE}`, () => {
    const state = {
      expenses: new Set(),
      fetch: {
        isFetching: true,
        hasMore: true,
        hasError: false,
        error: null,
        paginationStart: 0,
        paginationEnd: 0
      },
      review: {
        hasError: false,
        error: null
      }
    };

    const expected = {
      expenses: new Set([]),
      fetch: {
        isFetching: false,
        hasMore: true,
        hasError: true,
        error: 'Some error',
        paginationStart: 0,
        paginationEnd: 0
      },
      review: {
        hasError: false,
        error: null
      }
    };

    const action = actions.fetchExpensesFailure({
      errorMessage: 'Some error'
    });

    const actual = expenseReducer(state, action);

    expect(actual).toEqual(expected);
  });

  it(`should handle ${actions.REVIEW_EXPENSE_REQUEST}`, () => {
    const expense1 = {
      'id': '0007182d-54cb-42b7-88fc-bbaba51db198',
      'amount': 150,
      'date': '2017-03-19T05:29:02.700Z',
      'note': 'Cena'
    };

    const expense2 = {
      'id': '017b7008-4d97-428b-8b6a-53f31e9cfc4c',
      'amount': 60,
      'date': '2017-03-24T19:42:25.608Z',
      'note': 'Taco Norteño'
    };

    const state = {
      expenses: new Set([expense1, expense2]),
      fetch: {
        isFetching: false,
        hasMore: true,
        hasError: false,
        error: null,
        paginationStart: 0,
        paginationEnd: 0
      },
      review: {
        hasError: false,
        error: null
      }
    };

    const expected = {
      expenses: new Set([expense1, expense2]),
      fetch: {
        isFetching: false,
        hasMore: true,
        hasError: false,
        error: null,
        paginationStart: 0,
        paginationEnd: 0
      },
      review: {
        hasError: false,
        error: null
      }
    };

    const action = actions.reviewExpense({ expense: expense1 });

    const actual = expenseReducer(state, action);

    expect(actual).toEqual(expected);
  });

  it(`should handle ${actions.REVIEW_EXPENSE_SUCCESS}`, () => {
    const expense1 = {
      'id': '0007182d-54cb-42b7-88fc-bbaba51db198',
      'amount': 150,
      'date': '2017-03-19T05:29:02.700Z',
      'note': 'Cena'
    };

    const expense2 = {
      'id': '017b7008-4d97-428b-8b6a-53f31e9cfc4c',
      'amount': 60,
      'date': '2017-03-24T19:42:25.608Z',
      'note': 'Taco Norteño'
    };

    const state = {
      expenses: new Set([expense1, expense2]),
      fetch: {
        isFetching: true,
        hasMore: true,
        hasError: false,
        error: null,
        paginationStart: 0,
        paginationEnd: 0
      },
      review: {
        hasError: false,
        error: null
      }
    };

    const expected = {
      expenses: new Set([expense2]),
      fetch: {
        isFetching: true,
        hasMore: true,
        hasError: false,
        error: null,
        paginationStart: 0,
        paginationEnd: 0
      },
      review: {
        hasError: false,
        error: null
      }
    };

    const action = actions.reviewExpenseSuccess({ expense: expense1 });

    const actual = expenseReducer(state, action);

    expect(actual).toEqual(expected);
  });

  it(`should handle ${actions.REVIEW_EXPENSE_FAILURE}`, () => {
    const expense1 = {
      'id': '0007182d-54cb-42b7-88fc-bbaba51db198',
      'amount': 150,
      'date': '2017-03-19T05:29:02.700Z',
      'note': 'Cena'
    };

    const expense2 = {
      'id': '017b7008-4d97-428b-8b6a-53f31e9cfc4c',
      'amount': 60,
      'date': '2017-03-24T19:42:25.608Z',
      'note': 'Taco Norteño'
    };

    const state = {
      expenses: new Set([expense1, expense2]),
      fetch: {
        isFetching: true,
        hasMore: true,
        hasError: false,
        error: null,
        paginationStart: 0,
        paginationEnd: 0
      },
      review: {
        hasError: false,
        error: null
      }
    };

    const expected = {
      expenses: new Set([expense1, expense2]),
      fetch: {
        isFetching: true,
        hasMore: true,
        hasError: false,
        error: null,
        paginationStart: 0,
        paginationEnd: 0
      },
      review: {
        hasError: true,
        error: 'Some error'
      }
    };

    const action = actions.reviewExpenseFailure({ errorMessage: 'Some error' });

    const actual = expenseReducer(state, action);

    expect(actual).toEqual(expected);
  });
});
