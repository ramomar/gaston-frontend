import * as ExpenseActions from '../actions/ExpenseActions';
import * as R from 'ramda';

function makeExpensesState() {
  return {
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
      error: null,
      found: true
    },
    review: {
      byId: {}
    }
  };
}

function computeStateOnRequestExpenses(state, _) {
  return R.mergeDeepRight(
    state,
    {
      fetch: {
        isFetching: true,
        error: null
      }
    }
  );
}

function computeStateOnExpensesSuccess(state, { payload }) {
  return R.mergeDeepRight(
    state,
    {
      expenses: {
        byId: R.fromPairs(R.map(e => [e.id, e], payload.expenses))
      },
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
        isFetching: true,
        error: null,
        found: true
      }
    }
  );
}

function computeStateOnFetchExpenseSuccess(state, { payload }) {
  const { expense } = payload;

  return R.mergeDeepRight(
    state,
    {
      expenses: {
        byId: payload.expense ? R.fromPairs([[expense.id, expense]]) : {}
      },
      singleFetch: {
        isFetching: false,
        error: null,
        found: !!payload.expense
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

function computeStateOnReviewExpenseRequest(state, { payload }) {
  const { expense, review } = payload;

  return R.mergeDeepRight(
    state,
    {
      review: {
        byId: R.fromPairs([[expense.id, {
          isReviewing: true,
          error: null,
          review: review,
          isReviewed: false
        }]])
      }
    }
  );
}

function computeStateOnReviewExpenseSuccess(state, { payload }) {
  const { expense, review } = payload;

  return R.mergeDeepRight(
    R.dissocPath(['expenses', 'byId', payload.expense.id], state),
    {
      review: {
        byId: R.fromPairs([[expense.id, {
          isReviewing: false,
          error: null,
          review: review,
          isReviewed: true
        }]])
      }
    }
  );
}

function computeStateOnReviewExpenseFailure(state, { payload }) {
  const { expense, review, errorMessage } = payload;

  return R.mergeDeepRight(
    state,
    {
      review: {
        byId: R.fromPairs([[expense.id, {
          isReviewing: false,
          error: errorMessage,
          review: review,
          isReviewed: false
        }]])
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
