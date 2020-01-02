import * as ExpenseActions from '../actions/ExpenseActions';
import * as R from 'ramda';

function makeExpensesState() {
  return {
    expenses: new Set(),
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
      error: null
    }
  };
}

function computeStateOnRequestExpenses(state, _) {
  return R.mergeDeepRight(
    state,
    { fetch: { isFetching: true } }
  );
}

function computeStateOnExpensesSuccess(state, { payload }) {
  return R.mergeDeepRight(
    state,
    {
      expenses: new Set([...state.expenses, ...payload.expenses]),
      fetch: {
        paginationStart: payload.paginationStart,
        paginationEnd: payload.paginationEnd,
        isFetching: false,
        hasMore: payload.hasMore,
        error: null
      }
    }
  );
}

function computeStateOnExpensesFailure(state, { payload }) {
  return R.mergeDeepRight(
    state,
    {
      fetch: {
        isFetching: false,
        error: payload.errorMessage
      }
    }
  );
}

function computeStateOnFetchExpenseRequest(state, _) {
  return R.mergeDeepRight(
    state,
    {
      singleFetch: {
        isFetching: true
      }
    }
  );
}

function computeStateOnFetchExpenseSuccess(state, { payload }) {
  const expenseAlreadyExists = [...state.expenses].filter(e => e.id === payload.expense.id)[0];

  return R.mergeDeepRight(
    state,
    {
      expenses:
        expenseAlreadyExists ? state.expenses : new Set([...state.expenses, payload.expense]),
      singleFetch: {
        isFetching: false,
        error: null
      }
    }
  );
}

function computeStateOnFetchExpenseFailure(state, { payload }) {
  return R.mergeDeepRight(
    state,
    {
      singleFetch: {
        isFetching: false,
        error: payload.errorMessage
      }
    }
  );
}

function computeStateOnReviewExpenseRequest(state, _) {
  return state;
}

function computeStateOnReviewExpenseSuccess(state, { payload }) {
  const expenses = [...state.expenses];

  const expensesToKeep = expenses.filter(e => e.id !== payload.expense.id);

  return R.mergeDeepRight(
    state,
    { expenses: new Set([...expensesToKeep]) }
  );
}

function computeStateOnReviewExpenseFailure(state, { payload }) {
  return R.mergeDeepRight(
    state,
    {
      review: {
        error: payload.errorMessage
      }
    }
  );
}

export function expenseReducer(state = makeExpensesState(), action) {
  switch (action.type) {
    case ExpenseActions.FETCH_EXPENSES_REQUEST:
      return computeStateOnRequestExpenses(state, action);
    case ExpenseActions.FETCH_EXPENSES_SUCCESS:
      return computeStateOnExpensesSuccess(state, action);
    case ExpenseActions.FETCH_EXPENSES_FAILURE:
      return computeStateOnExpensesFailure(state, action);
    case ExpenseActions.FETCH_EXPENSE_REQUEST:
      return computeStateOnFetchExpenseRequest(state, action);
    case ExpenseActions.FETCH_EXPENSE_SUCCESS:
      return computeStateOnFetchExpenseSuccess(state, action);
    case ExpenseActions.FETCH_EXPENSE_FAILURE:
      return computeStateOnFetchExpenseFailure(state, action);
    case ExpenseActions.REVIEW_EXPENSE_REQUEST:
      return computeStateOnReviewExpenseRequest(state, action);
    case ExpenseActions.REVIEW_EXPENSE_SUCCESS:
      return computeStateOnReviewExpenseSuccess(state, action);
    case ExpenseActions.REVIEW_EXPENSE_FAILURE:
      return computeStateOnReviewExpenseFailure(state, action);
    default:
      return state;
  }
}
