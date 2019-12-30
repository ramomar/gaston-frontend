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
  return R.mergeAll([
    state,
    { fetch: R.mergeRight(state.fetch, { isFetching: true }) }
  ]);
}

function computeStateOnExpenseCategoriesSuccess(state, { payload }) {
  return R.mergeAll([
    state,
    {
      categories: new Set([...state.categories, ...payload.categories])
    },
    { fetch: R.mergeRight(state.fetch, { isFetching: false }) }
  ]);
}

function computeStateOnExpenseCategoriesFailure(state, { payload }) {
  return R.mergeAll([
    state,
    {
      fetch: R.mergeRight(state.fetch, { isFetching: false, error: payload.errorMessage })
    }
  ]);
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
