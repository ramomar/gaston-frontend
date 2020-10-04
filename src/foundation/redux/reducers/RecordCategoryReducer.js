import * as RecordCategoryActions from '../actions/RecordCategoryActions';
import * as R from 'ramda';

function makeRecordCategoriesState() {
  return {
    categories: new Set(),
    fetch: {
      isFetching: false,
      error: null
    }
  };
}

function computeStateOnRecordCategoriesRequest(state, _) {
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

function computeStateOnRecordCategoriesSuccess(state, { payload }) {
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

function computeStateOnRecordCategoriesFailure(state, { payload }) {
  return R.mergeDeepRight(
    state,
    {
      fetch: {
        isFetching: false,
        error: payload.error
      }
    }
  );
}

export function recordCategoryReducer(state = makeRecordCategoriesState(), action) {
  switch (action.type) {
    case RecordCategoryActions.FETCH_RECORD_CATEGORIES_REQUEST:
      return computeStateOnRecordCategoriesRequest(state, action);
    case RecordCategoryActions.FETCH_RECORD_CATEGORIES_SUCCESS:
      return computeStateOnRecordCategoriesSuccess(state, action);
    case RecordCategoryActions.FETCH_RECORD_CATEGORIES_FAILURE:
      return computeStateOnRecordCategoriesFailure(state, action);
    default:
      return state;
  }
}
