export const FETCH_RECORD_CATEGORIES_REQUEST = 'FETCH_RECORD_CATEGORIES_REQUEST';
export const FETCH_RECORD_CATEGORIES_SUCCESS = 'FETCH_RECORD_CATEGORIES_SUCCESS';
export const FETCH_RECORD_CATEGORIES_FAILURE = 'FETCH_RECORD_CATEGORIES_FAILURE';

export function fetchRecordCategoriesRequest() {
  return {
    type: FETCH_RECORD_CATEGORIES_REQUEST,
    payload: {}
  };
}

export function fetchRecordCategoriesSuccess({ categories }) {
  return {
    type: FETCH_RECORD_CATEGORIES_SUCCESS,
    payload: {
      categories
    }
  };
}

export function fetchRecordCategoriesFailure({ errorMessage }) {
  return {
    type: FETCH_RECORD_CATEGORIES_FAILURE,
    payload: {
      errorMessage
    }
  };
}

export function fetchRecordCategories() {
  return dispatch => {
    dispatch(fetchRecordCategoriesRequest());

    const successAction = (categories) => {
      if (categories.length === 0) {
        throw Error('Invalid response: no categories.');
      }

      dispatch(fetchRecordCategoriesSuccess({ categories }));
    };

    return fetch(`${process.env.REACT_APP_API_HOST}/records/categories`, {
      method: 'GET'
    })
      .then(response =>
        response.ok ? response.json() : Promise.reject(new Error(response.statusText)))
      .then(({ categories }) => successAction(categories))
      .catch(
        (error) => {
          dispatch(fetchRecordCategoriesFailure({ errorMessage: error.message }));
          return Promise.resolve(error);
        });
  };
}
