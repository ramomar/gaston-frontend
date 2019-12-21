import * as ExpenseReducers from './ExpenseReducers';
import * as ExpenseActions from '../actions/ExpenseActions';

describe('expenses', () => {
  it('should return the initial state', () => {
    const expected = {
      expenses: {
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
      }
    };

    const actual = ExpenseReducers.rootReducer(undefined, {});

    expect(actual).toEqual(expected);
  });

  it(`should handle ${ExpenseActions.FETCH_EXPENSES_REQUEST}`, () => {
    const expected = {
      expenses: {
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
      }
    };

    const action = ExpenseActions.fetchExpensesRequest({ paginationStart: 0, paginationEnd: 10 });

    const actual = ExpenseReducers.rootReducer(undefined, action);

    expect(actual).toEqual(expected);
  });

  it(`should handle ${ExpenseActions.FETCH_EXPENSES_SUCCESS}`, () => {
    const state = {
      expenses: {
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
      expenses: {
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
      }
    };

    const action = ExpenseActions.fetchExpensesSuccess({
      expenses,
      hasMore,
      paginationStart,
      paginationEnd
    });

    const actual = ExpenseReducers.rootReducer(state, action);

    expect(actual).toEqual(expected);
  });

  it(`should handle ${ExpenseActions.FETCH_EXPENSES_FAILURE}`, () => {
    const state = {
      expenses: {
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
      }
    };

    const expected = {
      expenses: {
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
      }
    };

    const action = ExpenseActions.fetchExpensesFailure({
      errorMessage: 'Some error'
    });

    const actual = ExpenseReducers.rootReducer(state, action);

    expect(actual).toEqual(expected);
  });

  it(`should handle ${ExpenseActions.REVIEW_EXPENSE_REQUEST}`, () => {
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
      expenses: {
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
      }
    };

    const expected = {
      expenses: {
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
      }
    };

    const action = ExpenseActions.reviewExpense({ expense: expense1 });

    const actual = ExpenseReducers.rootReducer(state, action);

    expect(actual).toEqual(expected);
  });

  it.only(`should handle ${ExpenseActions.REVIEW_EXPENSE_SUCCESS}`, () => {
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
      expenses: {
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
      }
    };

    const expected = {
      expenses: {
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
      }
    };

    const action = ExpenseActions.reviewExpenseSuccess({ expense: expense1 });

    const actual = ExpenseReducers.rootReducer(state, action);

    expect(actual).toEqual(expected);
  });

  it(`should handle ${ExpenseActions.REVIEW_EXPENSE_FAILURE}`, () => {
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
      expenses: {
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
      }
    };

    const expected = {
      expenses: {
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
          hasError: true,
          error: 'Some error'
        }
      }
    };

    const action = ExpenseActions.reviewExpenseFailure({ errorMessage: 'Some error' });

    const actual = ExpenseReducers.rootReducer(state, action);

    expect(actual).toEqual(expected);
  });
});
