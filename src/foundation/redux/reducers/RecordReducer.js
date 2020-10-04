import * as RecordActions from '../actions/RecordActions';
import * as R from 'ramda';

function makeRecordsState() {
  return {
    records: {
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

function computeStateOnRequestRecords(state, _) {
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

function computeStateOnRecordsSuccess(state, { payload }) {
  return R.mergeDeepRight(
    state,
    {
      records: {
        byId: R.fromPairs(R.map(e => [e.id, e], payload.records))
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

function computeStateOnRecordsFailure(state, { payload }) {
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

function computeStateOnFetchRecordRequest(state, _) {
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

function computeStateOnFetchRecordSuccess(state, { payload }) {
  const { record } = payload;

  return R.mergeDeepRight(
    state,
    {
      records: {
        byId: payload.record ? R.fromPairs([[record.id, record]]) : {}
      },
      singleFetch: {
        isFetching: false,
        error: null,
        found: !!payload.record
      }
    }
  );
}

function computeStateOnFetchRecordFailure(state, { payload }) {
  return R.mergeDeepRight(
    state,
    {
      singleFetch: {
        isFetching: false,
        error: payload.error
      }
    }
  );
}

function computeStateOnReviewRecordRequest(state, { payload }) {
  const { record, review } = payload;

  return R.mergeDeepRight(
    state,
    {
      review: {
        byId: R.fromPairs([[record.id, {
          isReviewing: true,
          error: null,
          review: review,
          isReviewed: false
        }]])
      }
    }
  );
}

function computeStateOnReviewRecordSuccess(state, { payload }) {
  const { record, review } = payload;

  return R.mergeDeepRight(
    R.dissocPath(['records', 'byId', payload.record.id], state),
    {
      review: {
        byId: R.fromPairs([[record.id, {
          isReviewing: false,
          error: null,
          review: review,
          isReviewed: true
        }]])
      }
    }
  );
}

function computeStateOnReviewRecordFailure(state, { payload }) {
  const { record, review, error } = payload;

  return R.mergeDeepRight(
    state,
    {
      review: {
        byId: R.fromPairs([[record.id, {
          isReviewing: false,
          error: error,
          review: review,
          isReviewed: false
        }]])
      }
    }
  );
}

export function recordReducer(state = makeRecordsState(), action) {
  switch (action.type) {
    case RecordActions.FETCH_RECORDS_REQUEST:
      return computeStateOnRequestRecords(state, action);
    case RecordActions.FETCH_RECORDS_SUCCESS:
      return computeStateOnRecordsSuccess(state, action);
    case RecordActions.FETCH_RECORDS_FAILURE:
      return computeStateOnRecordsFailure(state, action);
    case RecordActions.FETCH_RECORD_REQUEST:
      return computeStateOnFetchRecordRequest(state, action);
    case RecordActions.FETCH_RECORD_SUCCESS:
      return computeStateOnFetchRecordSuccess(state, action);
    case RecordActions.FETCH_RECORD_FAILURE:
      return computeStateOnFetchRecordFailure(state, action);
    case RecordActions.REVIEW_RECORD_REQUEST:
      return computeStateOnReviewRecordRequest(state, action);
    case RecordActions.REVIEW_RECORD_SUCCESS:
      return computeStateOnReviewRecordSuccess(state, action);
    case RecordActions.REVIEW_RECORD_FAILURE:
      return computeStateOnReviewRecordFailure(state, action);
    default:
      return state;
  }
}
