export const FETCH_RECORDS_REQUEST = 'FETCH_RECORDS_REQUEST';
export const FETCH_RECORDS_SUCCESS = 'FETCH_RECORDS_SUCCESS';
export const FETCH_RECORDS_FAILURE = 'FETCH_RECORDS_FAILURE';

export function fetchRecordsRequest({ paginationStart, paginationEnd }) {
  return {
    type: FETCH_RECORDS_REQUEST,
    payload: {
      paginationStart,
      paginationEnd
    }
  };
}

export function fetchRecordsSuccess({ records, hasMore, paginationStart, paginationEnd }) {
  return {
    type: FETCH_RECORDS_SUCCESS,
    payload: {
      records,
      hasMore,
      paginationStart,
      paginationEnd
    }
  };
}

export function fetchRecordsFailure({ errorMessage }) {
  return {
    type: FETCH_RECORDS_FAILURE,
    payload: {
      errorMessage
    }
  };
}

export function fetchRecords({ paginationStart, paginationEnd }) {
  return dispatch => {
    dispatch(fetchRecordsRequest({ paginationStart, paginationEnd }));

    const successAction = ({ records, hasMore }) => {
      if (records.length === 0 && hasMore) {
        throw Error('Invalid response: no records and response says there are more records.');
      }

      dispatch(fetchRecordsSuccess({
        records,
        hasMore,
        paginationStart,
        paginationEnd
      }));
    };

    return fetch(`${process.env.REACT_APP_API_HOST}/records`, {
      method: 'GET'
    })
      .then(response =>
        response.ok ? response.json() : Promise.reject(new Error(response.statusText)))
      .then(successAction)
      .catch(
        (error) => {
          dispatch(fetchRecordsFailure({ errorMessage: error.message }));
          return Promise.resolve(error);
        });
  };
}

export const FETCH_RECORD_REQUEST = 'FETCH_RECORD_REQUEST';
export const FETCH_RECORD_SUCCESS = 'FETCH_RECORD_SUCCESS';
export const FETCH_RECORD_FAILURE = 'FETCH_RECORD_FAILURE';

export function fetchRecordRequest({ id }) {
  return {
    type: FETCH_RECORD_REQUEST,
    payload: {
      id
    }
  };
}

export function fetchRecordSuccess({ record }) {
  return {
    type: FETCH_RECORD_SUCCESS,
    payload: {
      record
    }
  };
}

export function fetchRecordFailure({ errorMessage }) {
  return {
    type: FETCH_RECORD_FAILURE,
    payload: {
      errorMessage
    }
  };
}

export function fetchRecord({ id }) {
  return dispatch => {
    dispatch(fetchRecordRequest({ id }));

    const successAction = ({ record }) =>
      dispatch(fetchRecordSuccess({
        record
      }));

    return fetch(`${process.env.REACT_APP_API_HOST}/records/${id}`, {
      method: 'GET'
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        } else if (response.status === 404) {
          dispatch(fetchRecordSuccess({ record: null }));
          return;
        }

        return Promise.reject(new Error(response.statusText));
      })
      .then(successAction)
      .catch(
        (error) => {
          dispatch(fetchRecordFailure({ errorMessage: error.message }));
          return Promise.resolve(error);
        });
  };
}

export const REVIEW_RECORD_REQUEST = 'REVIEW_RECORD_REQUEST';
export const REVIEW_RECORD_SUCCESS = 'REVIEW_RECORD_SUCCESS';
export const REVIEW_RECORD_FAILURE = 'REVIEW_RECORD_FAILURE';

export function reviewRecordRequest({ record, review }) {
  return {
    type: REVIEW_RECORD_REQUEST,
    payload: {
      record,
      review
    }
  };
}

export function reviewRecordSuccess({ record, review }) {
  return {
    type: REVIEW_RECORD_SUCCESS,
    payload: {
      record,
      review
    }
  };
}

export function reviewRecordFailure({ record, review, errorMessage }) {
  return {
    type: REVIEW_RECORD_FAILURE,
    payload: {
      record,
      review,
      errorMessage
    }
  };
}

export function reviewRecord({ record, review }) {
  return dispatch => {
    dispatch(reviewRecordRequest({ record, review }));

    return fetch(`${process.env.REACT_APP_API_HOST}/records/${record.id}/review`, {
      method: 'PUT',
      body: JSON.stringify(review),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response =>
        response.ok ? response.json() : Promise.reject(new Error(response.statusText)))
      .then(({ review }) => dispatch(reviewRecordSuccess({ record, review })))
      .catch(
        (error) => {
          dispatch(reviewRecordFailure({ record, review, errorMessage: error.message }));
          return Promise.resolve(error);
        });
  };
}
