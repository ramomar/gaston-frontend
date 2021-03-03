import { Storage as STORAGE } from '../../storage';
import { AuthClient } from '../../auth';
import * as R from 'ramda';

function adaptRecord(record) {
  return {
    id: record.record_id,
    amount: record.amount,
    date: record.date,
    note: record.note,
    raw: record.raw
  };
}

export const FETCH_RECORDS_REQUEST = 'FETCH_RECORDS_REQUEST';
export const FETCH_RECORDS_SUCCESS = 'FETCH_RECORDS_SUCCESS';
export const FETCH_RECORDS_FAILURE = 'FETCH_RECORDS_FAILURE';

export function fetchRecordsRequest({ status, nextPage = null }) {
  return {
    type: FETCH_RECORDS_REQUEST,
    payload: {
      status,
      nextPage
    }
  };
}

export function fetchRecordsSuccess({ records, status, nextPage }) {
  return {
    type: FETCH_RECORDS_SUCCESS,
    payload: {
      records,
      status,
      nextPage
    }
  };
}

export function fetchRecordsFailure({ error }) {
  return {
    type: FETCH_RECORDS_FAILURE,
    payload: {
      error
    }
  };
}

export function fetchRecords({ status, nextPage = null }) {
  return dispatch => {
    dispatch(fetchRecordsRequest({ status, nextPage }));

    const successAction = ({ records, nextPage }) => {
      dispatch(fetchRecordsSuccess({
        records: records.map(adaptRecord),
        status,
        nextPage
      }));
    };

    const params = {
      ...(nextPage && { page: nextPage })
    };

    const queryParams = new URLSearchParams(params);

    return fetch(`${process.env.REACT_APP_API_HOST}/records/${status}` + (Object.keys(params).length > 0 ? `?${queryParams}` : ''), {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${AuthClient.getAuthData(STORAGE).token}`,
        'X-Api-Key': process.env.REACT_APP_API_KEY
      }
    })
      .then(response =>
        response.ok ? response.json() : Promise.reject(new Error(response.statusText)))
      .then(successAction)
      .catch(
        (error) => {
          dispatch(fetchRecordsFailure({ error }));
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

export function fetchRecordFailure({ error }) {
  return {
    type: FETCH_RECORD_FAILURE,
    payload: {
      error
    }
  };
}

export function fetchRecord({ id }) {
  return dispatch => {
    dispatch(fetchRecordRequest({ id }));

    const successAction = ({ record }) =>
      dispatch(fetchRecordSuccess({
        record: adaptRecord(record)
      }));

    return fetch(`${process.env.REACT_APP_API_HOST}/records/${id}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${AuthClient.getAuthData(STORAGE).token}`,
        'X-Api-Key': process.env.REACT_APP_API_KEY
      }
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
          dispatch(fetchRecordFailure({ error: error }));
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

export function reviewRecordFailure({ record, review, error }) {
  return {
    type: REVIEW_RECORD_FAILURE,
    payload: {
      record,
      review,
      error
    }
  };
}

export function reviewRecord({ record, review }) {
  return dispatch => {
    dispatch(reviewRecordRequest({ record, review }));

    return fetch(`${process.env.REACT_APP_API_HOST}/records/${record.id}/review`, {
      method: 'PUT',
      body: JSON.stringify({ review: R.map((v) => v.toString(), review) }),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${AuthClient.getAuthData(STORAGE).token}`,
        'X-Api-Key': process.env.REACT_APP_API_KEY
      }
    })
      .then(response =>
        response.ok ? response.json() : Promise.reject(new Error(response.statusText)))
      .then(({ review }) => dispatch(reviewRecordSuccess({ record, review })))
      .catch(
        (error) => {
          dispatch(reviewRecordFailure({ record, review, error: error }));
          return Promise.resolve(error);
        });
  };
}
