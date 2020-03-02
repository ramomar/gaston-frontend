import { expenseReducer } from './ExpenseReducer';
import * as Actions from '../actions';
import * as R from 'ramda';

describe('expenses', () => {
  it('should return the initial state', () => {
    const expected = {
      expenses: {
        byId: {}
      },
      fetch: {
        isFetching: false,
        hasMore: true,
        error: null,
        paginationStart: 0,
        paginationEnd: 0
      },
      singleFetch: {
        isFetching: false,
        error: null
      },
      review: {
        byId: {}
      }
    };

    const actual = expenseReducer(undefined, {});

    expect(actual).toStrictEqual(expected);
  });

  it(`should handle ${Actions.FETCH_EXPENSES_REQUEST}`, () => {
    const state = {
      expenses: {
        byId: {}
      },
      fetch: {
        isFetching: false,
        hasMore: true,
        error: null,
        paginationStart: 0,
        paginationEnd: 0
      },
      singleFetch: {
        isFetching: false,
        error: null
      },
      review: {
        byId: {}
      }
    };

    const expected = {
      expenses: {
        byId: {}
      },
      fetch: {
        isFetching: true,
        hasMore: true,
        error: null,
        paginationStart: 0,
        paginationEnd: 0
      },
      singleFetch: {
        isFetching: false,
        error: null
      },
      review: {
        byId: {}
      }
    };

    const action = Actions.fetchExpensesRequest({ paginationStart: 0, paginationEnd: 10 });

    const actual = expenseReducer(state, action);

    expect(actual).toStrictEqual(expected);
  });

  it(`should handle ${Actions.FETCH_EXPENSES_REQUEST} when there was an error previously`, () => {
    const state = {
      expenses: {
        byId: {}
      },
      fetch: {
        isFetching: false,
        hasMore: true,
        error: 'Some error',
        paginationStart: 0,
        paginationEnd: 0
      },
      singleFetch: {
        isFetching: false,
        error: null
      },
      review: {
        byId: {}
      }
    };

    const expected = {
      expenses: {
        byId: {}
      },
      fetch: {
        isFetching: true,
        hasMore: true,
        error: null,
        paginationStart: 0,
        paginationEnd: 0
      },
      singleFetch: {
        isFetching: false,
        error: null
      },
      review: {
        byId: {}
      }
    };

    const action = Actions.fetchExpensesRequest({ paginationStart: 0, paginationEnd: 10 });

    const actual = expenseReducer(state, action);

    expect(actual).toStrictEqual(expected);
  });

  it(`should handle ${Actions.FETCH_EXPENSES_SUCCESS}`, () => {
    const expense1 = {
      id: '0007182d-54cb-42b7-88fc-bbaba51db198',
      amount: 150,
      date: '2017-03-19T05:29:02.700Z',
      note: 'Cena'
    };

    const expense2 = {
      id: '017b7008-4d97-428b-8b6a-53f31e9cfc4c',
      amount: 60,
      date: '2017-03-24T19:42:25.608Z',
      note: 'Taco Norteño'
    };

    const expense3 = {
      id: '017b7008-4d97-428b-8b6a-54c20e9cbd5d',
      amount: 10,
      date: '2017-03-25T20:00:00.000Z',
      note: 'Cine'
    };

    const expenses = [
      expense1,
      expense2,
      expense3
    ];

    const state = {
      expenses: {
        byId: R.fromPairs(R.map(e => [e.id, e], [expense1, expense2]))
      },
      fetch: {
        isFetching: false,
        hasMore: true,
        error: null,
        paginationStart: 0,
        paginationEnd: 0
      },
      singleFetch: {
        isFetching: false,
        error: null
      },
      review: {
        byId: {}
      }
    };

    const hasMore = true;

    const paginationStart = 0;

    const paginationEnd = 10;

    const fetchedExpenses = [
      expense3
    ];

    const expected = {
      expenses: {
        byId: R.fromPairs(R.map(e => [e.id, e], expenses))
      },
      fetch: {
        isFetching: false,
        hasMore,
        error: null,
        paginationStart,
        paginationEnd
      },
      singleFetch: {
        isFetching: false,
        error: null
      },
      review: {
        byId: {}
      }
    };

    const action = Actions.fetchExpensesSuccess({
      expenses: fetchedExpenses,
      hasMore,
      paginationStart,
      paginationEnd
    });

    const actual = expenseReducer(state, action);

    expect(actual).toStrictEqual(expected);
  });

  it(`should handle ${Actions.FETCH_EXPENSES_SUCCESS} when some expenses already exist`, () => {
    const expense1 = {
      id: '0007182d-54cb-42b7-88fc-bbaba51db198',
      amount: 150,
      date: '2017-03-19T05:29:02.700Z',
      note: 'Cena'
    };

    const expense2 = {
      id: '017b7008-4d97-428b-8b6a-53f31e9cfc4c',
      amount: 60,
      date: '2017-03-24T19:42:25.608Z',
      note: 'Taco Norteño'
    };

    const expense3 = {
      id: '017b7008-4d97-428b-8b6a-54c20e9cbd5d',
      amount: 10,
      date: '2017-03-25T20:00:00.000Z',
      note: 'Cine'
    };

    const expenses = [
      expense1,
      expense2,
      expense3
    ];

    const state = {
      expenses: {
        byId: R.fromPairs(R.map(e => [e.id, e], [expense1, expense2]))
      },
      fetch: {
        isFetching: false,
        hasMore: true,
        error: null,
        paginationStart: 0,
        paginationEnd: 0
      },
      singleFetch: {
        isFetching: false,
        error: null
      },
      review: {
        byId: {}
      }
    };

    const hasMore = true;

    const paginationStart = 0;

    const paginationEnd = 10;

    const fetchedExpenses = [
      expense2,
      expense3
    ];

    const expected = {
      expenses: {
        byId: R.fromPairs(R.map(e => [e.id, e], expenses))
      },
      fetch: {
        isFetching: false,
        hasMore,
        error: null,
        paginationStart,
        paginationEnd
      },
      singleFetch: {
        isFetching: false,
        error: null
      },
      review: {
        byId: {}
      }
    };

    const action = Actions.fetchExpensesSuccess({
      expenses: fetchedExpenses,
      hasMore,
      paginationStart,
      paginationEnd
    });

    const actual = expenseReducer(state, action);

    expect(actual).toStrictEqual(expected);
  });

  it(`should handle ${Actions.FETCH_EXPENSES_FAILURE}`, () => {
    const state = {
      expenses: {
        byId: {}
      },
      fetch: {
        isFetching: true,
        hasMore: true,
        error: null,
        paginationStart: 0,
        paginationEnd: 0
      },
      singleFetch: {
        isFetching: false,
        error: null
      },
      review: {
        error: null
      }
    };

    const expected = {
      expenses: {
        byId: {}
      },
      fetch: {
        isFetching: false,
        hasMore: true,
        error: 'Some error',
        paginationStart: 0,
        paginationEnd: 0
      },
      singleFetch: {
        isFetching: false,
        error: null
      },
      review: {
        error: null
      }
    };

    const action = Actions.fetchExpensesFailure({
      errorMessage: 'Some error'
    });

    const actual = expenseReducer(state, action);

    expect(actual).toStrictEqual(expected);
  });

  it(`should handle ${Actions.FETCH_EXPENSE_REQUEST}`, () => {
    const expense1 = {
      id: '0007182d-54cb-42b7-88fc-bbaba51db198',
      amount: 150,
      date: '2017-03-19T05:29:02.700Z',
      note: 'Cena'
    };

    const expense2 = {
      id: '017b7008-4d97-428b-8b6a-53f31e9cfc4c',
      amount: 60,
      date: '2017-03-24T19:42:25.608Z',
      note: 'Taco Norteño'
    };

    const fetchedExpense = {
      id: '017b7008-4d97-428b-8b6a-54c20e9cbd5d',
      amount: 10,
      date: '2017-03-25T20:00:00.000Z',
      note: 'Cine'
    };

    const state = {
      expenses: {
        byId: R.fromPairs(R.map(e => [e.id, e], [expense1, expense2]))
      },
      fetch: {
        isFetching: false,
        hasMore: true,
        error: null,
        paginationStart: 0,
        paginationEnd: 0
      },
      singleFetch: {
        isFetching: false,
        error: null
      },
      review: {
        byId: {}
      }
    };

    const expected = {
      expenses: {
        byId: R.fromPairs(R.map(e => [e.id, e], [expense1, expense2]))
      },
      fetch: {
        isFetching: false,
        hasMore: true,
        error: null,
        paginationStart: 0,
        paginationEnd: 0
      },
      singleFetch: {
        isFetching: true,
        error: null
      },
      review: {
        byId: {}
      }
    };

    const action = Actions.fetchExpenseRequest({ id: fetchedExpense.id });

    const actual = expenseReducer(state, action);

    expect(actual).toStrictEqual(expected);
  });

  it(`should handle ${Actions.FETCH_EXPENSE_SUCCESS}`, () => {
    const expense1 = {
      id: '0007182d-54cb-42b7-88fc-bbaba51db198',
      amount: 150,
      date: '2017-03-19T05:29:02.700Z',
      note: 'Cena'
    };

    const expense2 = {
      id: '017b7008-4d97-428b-8b6a-53f31e9cfc4c',
      amount: 60,
      date: '2017-03-24T19:42:25.608Z',
      note: 'Taco Norteño'
    };

    const fetchedExpense = {
      id: '017b7008-4d97-428b-8b6a-54c20e9cbd5d',
      amount: 10,
      date: '2017-03-25T20:00:00.000Z',
      note: 'Cine'
    };

    const state = {
      expenses: {
        byId: R.fromPairs(R.map(e => [e.id, e], [expense1, expense2]))
      },
      fetch: {
        isFetching: false,
        hasMore: true,
        error: null,
        paginationStart: 0,
        paginationEnd: 0
      },
      singleFetch: {
        isFetching: true,
        error: null
      },
      review: {
        byId: {}
      }
    };

    const expected = {
      expenses: {
        byId: R.fromPairs(R.map(e => [e.id, e], [expense1, expense2, fetchedExpense]))
      },
      fetch: {
        isFetching: false,
        hasMore: true,
        error: null,
        paginationStart: 0,
        paginationEnd: 0
      },
      singleFetch: {
        isFetching: false,
        error: null
      },
      review: {
        byId: {}
      }
    };

    const action = Actions.fetchExpenseSuccess({ expense: fetchedExpense });

    const actual = expenseReducer(state, action);

    expect(actual).toStrictEqual(expected);
  });

  it(`should handle ${Actions.FETCH_EXPENSE_SUCCESS} with expense that already exists`, () => {
    const expense1 = {
      id: '0007182d-54cb-42b7-88fc-bbaba51db198',
      amount: 150,
      date: '2017-03-19T05:29:02.700Z',
      note: 'Cena'
    };

    const expense2 = {
      id: '017b7008-4d97-428b-8b6a-53f31e9cfc4c',
      amount: 60,
      date: '2017-03-24T19:42:25.608Z',
      note: 'Taco Norteño'
    };

    const fetchedExpense = {
      id: '017b7008-4d97-428b-8b6a-53f31e9cfc4c',
      amount: 60,
      date: '2017-03-24T19:42:25.608Z',
      note: 'Taco Norteño'
    };

    const state = {
      expenses: {
        byId: R.fromPairs(R.map(e => [e.id, e], [expense1, expense2]))
      },
      fetch: {
        isFetching: false,
        hasMore: true,
        error: null,
        paginationStart: 0,
        paginationEnd: 0
      },
      singleFetch: {
        isFetching: true,
        error: null
      },
      review: {
        byId: {}
      }
    };

    const expected = {
      expenses: {
        byId: R.fromPairs(R.map(e => [e.id, e], [expense1, expense2]))
      },
      fetch: {
        isFetching: false,
        hasMore: true,
        error: null,
        paginationStart: 0,
        paginationEnd: 0
      },
      singleFetch: {
        isFetching: false,
        error: null
      },
      review: {
        byId: {}
      }
    };

    const action = Actions.fetchExpenseSuccess({ expense: fetchedExpense });

    const actual = expenseReducer(state, action);

    expect(actual).toStrictEqual(expected);
  });

  it(`should handle ${Actions.FETCH_EXPENSE_FAILURE}`, () => {
    const expense1 = {
      id: '0007182d-54cb-42b7-88fc-bbaba51db198',
      amount: 150,
      date: '2017-03-19T05:29:02.700Z',
      note: 'Cena'
    };

    const expense2 = {
      id: '017b7008-4d97-428b-8b6a-53f31e9cfc4c',
      amount: 60,
      date: '2017-03-24T19:42:25.608Z',
      note: 'Taco Norteño'
    };

    const state = {
      expenses: {
        byId: R.fromPairs(R.map(e => [e.id, e], [expense1, expense2]))
      },
      fetch: {
        isFetching: false,
        hasMore: true,
        error: null,
        paginationStart: 0,
        paginationEnd: 0
      },
      singleFetch: {
        isFetching: true,
        error: null
      },
      review: {
        byId: {}
      }
    };

    const expected = {
      expenses: {
        byId: R.fromPairs(R.map(e => [e.id, e], [expense1, expense2]))
      },
      fetch: {
        isFetching: false,
        hasMore: true,
        error: null,
        paginationStart: 0,
        paginationEnd: 0
      },
      singleFetch: {
        isFetching: false,
        error: 'Some error'
      },
      review: {
        byId: {}
      }
    };

    const action = Actions.fetchExpenseFailure({ errorMessage: 'Some error' });

    const actual = expenseReducer(state, action);

    expect(actual).toStrictEqual(expected);
  });

  it(`should handle ${Actions.REVIEW_EXPENSE_REQUEST}`, () => {
    const expense1 = {
      id: '0007182d-54cb-42b7-88fc-bbaba51db198',
      amount: 150,
      date: '2017-03-19T05:29:02.700Z',
      note: 'Cena'
    };

    const expense2 = {
      id: '017b7008-4d97-428b-8b6a-53f31e9cfc4c',
      amount: 60,
      date: '2017-03-24T19:42:25.608Z',
      note: 'Taco Norteño'
    };

    const expense1Review = {
      amount: 50,
      date: '2017-03-24T19:42:25.608Z',
      note: 'Taco Norteño',
      category: 'Comida'
    };

    const state = {
      expenses: {
        byId: R.fromPairs(R.map(e => [e.id, e], [expense1, expense2]))
      },
      fetch: {
        isFetching: false,
        hasMore: true,
        error: null,
        paginationStart: 0,
        paginationEnd: 0
      },
      singleFetch: {
        isFetching: false,
        error: null
      },
      review: {
        byId: {}
      }
    };

    const expected = {
      expenses: {
        byId: R.fromPairs(R.map(e => [e.id, e], [expense1, expense2]))
      },
      fetch: {
        isFetching: false,
        hasMore: true,
        error: null,
        paginationStart: 0,
        paginationEnd: 0
      },
      singleFetch: {
        isFetching: false,
        error: null
      },
      review: {
        byId: {
          '0007182d-54cb-42b7-88fc-bbaba51db198': {
            isReviewing: true,
            error: null,
            review: {
              amount: 50,
              date: '2017-03-24T19:42:25.608Z',
              note: 'Taco Norteño',
              category: 'Comida'
            },
            isReviewed: false
          }
        }
      }
    };

    const action = Actions.reviewExpenseRequest({ expense: expense1, review: expense1Review });

    const actual = expenseReducer(state, action);

    expect(actual).toStrictEqual(expected);
  });

  it(`should handle ${Actions.REVIEW_EXPENSE_SUCCESS}`, () => {
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

    const expense1Review = {
      amount: 50,
      date: '2017-03-24T19:42:25.608Z',
      note: 'Taco Norteño',
      category: 'Comida'
    };

    const state = {
      expenses: {
        byId: R.fromPairs(R.map(e => [e.id, e], [expense1, expense2]))
      },
      fetch: {
        isFetching: true,
        hasMore: true,
        error: null,
        paginationStart: 0,
        paginationEnd: 0
      },
      singleFetch: {
        isFetching: false,
        error: null
      },
      review: {
        byId: {}
      }
    };

    const expected = {
      expenses: {
        byId: R.fromPairs(R.map(e => [e.id, e], [expense2]))
      },
      fetch: {
        isFetching: true,
        hasMore: true,
        error: null,
        paginationStart: 0,
        paginationEnd: 0
      },
      singleFetch: {
        isFetching: false,
        error: null
      },
      review: {
        byId: {
          '0007182d-54cb-42b7-88fc-bbaba51db198': {
            isReviewing: false,
            error: null,
            review: {
              amount: 50,
              date: '2017-03-24T19:42:25.608Z',
              note: 'Taco Norteño',
              category: 'Comida'
            },
            isReviewed: true
          }
        }
      }
    };

    const action = Actions.reviewExpenseSuccess({ expense: expense1, review: expense1Review });

    const actual = expenseReducer(state, action);

    expect(actual).toStrictEqual(expected);
  });

  it(`should handle ${Actions.REVIEW_EXPENSE_FAILURE}`, () => {
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

    const expense1Review = {
      amount: 50,
      date: '2017-03-24T19:42:25.608Z',
      note: 'Taco Norteño',
      category: 'Comida'
    };

    const state = {
      expenses: {
        byId: R.fromPairs(R.map(e => [e.id, e], [expense1, expense2]))
      },
      fetch: {
        isFetching: true,
        hasMore: true,
        error: null,
        paginationStart: 0,
        paginationEnd: 0
      },
      singleFetch: {
        isFetching: false,
        error: null
      },
      review: {
        byId: {}
      }
    };

    const expected = {
      expenses: {
        byId: R.fromPairs(R.map(e => [e.id, e], [expense1, expense2]))
      },
      fetch: {
        isFetching: true,
        hasMore: true,
        error: null,
        paginationStart: 0,
        paginationEnd: 0
      },
      singleFetch: {
        isFetching: false,
        error: null
      },
      review: {
        byId: {
          '0007182d-54cb-42b7-88fc-bbaba51db198': {
            isReviewing: false,
            error: 'Some error',
            review: {
              amount: 50,
              date: '2017-03-24T19:42:25.608Z',
              note: 'Taco Norteño',
              category: 'Comida'
            },
            isReviewed: false
          }
        }
      }
    };

    const action = Actions.reviewExpenseFailure({
      expense: expense1,
      review: expense1Review,
      errorMessage: 'Some error'
    });

    const actual = expenseReducer(state, action);

    expect(actual).toStrictEqual(expected);
  });
});
