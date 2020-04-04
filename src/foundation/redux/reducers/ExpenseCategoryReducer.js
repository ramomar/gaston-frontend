import * as ExpenseCategoryActions from '../actions/ExpenseCategoryActions';
import * as R from 'ramda';

function makeExpenseCategoriesState() {
  return {
    categories: new Set(),
    fetch: {
      isFetching: false,
      error: null
    }
  };
}

function computeStateOnExpenseCategoriesRequest(state, _) {
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

function computeStateOnExpenseCategoriesSuccess(state, { payload }) {
  return R.mergeDeepRight(
    state,
    {
      categories: new Set([...state.categories, ...payload.categories]),
      fetch: {
        isFetching: false
      }
    }
  );
}

function computeStateOnExpenseCategoriesFailure(state, { payload }) {
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

export function expenseCategoryReducer(state = makeExpenseCategoriesState(), action) {
  switch (action.type) {
    case ExpenseCategoryActions.FETCH_EXPENSE_CATEGORIES_REQUEST:
      return computeStateOnExpenseCategoriesRequest(state, action);
    case ExpenseCategoryActions.FETCH_EXPENSE_CATEGORIES_SUCCESS:
      return computeStateOnExpenseCategoriesSuccess(state, action);
    case ExpenseCategoryActions.FETCH_EXPENSE_CATEGORIES_FAILURE:
      return computeStateOnExpenseCategoriesFailure(state, action);
    default:
      return state;
  }
}
