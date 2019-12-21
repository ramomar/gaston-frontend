import * as ExpenseActions from '../actions/ExpenseActions';
import * as R from 'ramda';

function makeExpensesState() {
  return {
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
}

function computeStateOnRequestExpenses(state, _) {
  return R.mergeAll([
    state,
    { fetch: R.mergeRight(state.fetch, { isFetching: true }) }
  ]);
}

function computeStateOnReceiveExpensesSuccess(state, { payload }) {
  return R.mergeAll([
    state,
    {
      expenses: new Set([...state.expenses, ...payload.expenses])
    },
    {
      fetch: {
        paginationStart: payload.paginationStart,
        paginationEnd: payload.paginationEnd,
        isFetching: false,
        hasMore: payload.hasMore,
        hasError: false,
        error: null
      }
    }
  ]);
}

function computeStateOnReceiveExpensesFailure(state, { payload }) {
  return R.mergeAll([
    state,
    {
      fetch: R.mergeRight(state.fetch, {
        isFetching: false,
        hasError: true,
        error: payload.errorMessage
      })
    }
  ]);
}

function computeStateOnReviewExpenseSuccess(state, { payload }) {
  const expenses = [...state.expenses];

  const expenseToDelete = expenses.filter(e => e.id === payload.expense.id)[0];

  state.expenses.delete(expenseToDelete);

  return R.mergeAll([
    state,
    { expenses: new Set([...state.expenses]) }
  ]);
}

function computeStateOnReviewExpenseFailure(state, { payload }) {
  return R.mergeAll([
    state,
    {
      review: R.mergeRight(state.review, {
        hasError: true,
        error: payload.errorMessage
      })
    }
  ]);
}

export function expensesReducer(state = makeExpensesState(), action) {
  switch (action.type) {
    case ExpenseActions.FETCH_EXPENSES_REQUEST:
      return computeStateOnRequestExpenses(state, action);
    case ExpenseActions.FETCH_EXPENSES_SUCCESS:
      return computeStateOnReceiveExpensesSuccess(state, action);
    case ExpenseActions.FETCH_EXPENSES_FAILURE:
      return computeStateOnReceiveExpensesFailure(state, action);
    case ExpenseActions.REVIEW_EXPENSE_REQUEST:
      return state;
    case ExpenseActions.REVIEW_EXPENSE_SUCCESS:
      return computeStateOnReviewExpenseSuccess(state, action);
    case ExpenseActions.REVIEW_EXPENSE_FAILURE:
      return computeStateOnReviewExpenseFailure(state, action);
    default:
      return state;
  }
}
