export const FETCH_EXPENSE_CATEGORIES_REQUEST = 'FETCH_EXPENSE_CATEGORIES_REQUEST';
export const FETCH_EXPENSE_CATEGORIES_SUCCESS = 'FETCH_EXPENSE_CATEGORIES_SUCCESS';
export const FETCH_EXPENSE_CATEGORIES_FAILURE = 'FETCH_EXPENSE_CATEGORIES_FAILURE';

export function fetchExpenseCategoriesRequest() {
  return {
    type: FETCH_EXPENSE_CATEGORIES_REQUEST,
    payload: {}
  };
}

export function fetchExpenseCategoriesSuccess({ categories }) {
  return {
    type: FETCH_EXPENSE_CATEGORIES_SUCCESS,
    payload: {
      categories
    }
  };
}

export function fetchExpenseCategoriesFailure({ errorMessage }) {
  return {
    type: FETCH_EXPENSE_CATEGORIES_FAILURE,
    payload: {
      errorMessage
    }
  };
}

export function fetchExpenseCategories() {
  return dispatch => {
    dispatch(fetchExpenseCategoriesRequest());

    return fetch(`${process.env.REACT_APP_API_HOST}/api/expenses/categories`, {
      method: 'GET'
    })
      .then(response =>
        response.ok ? response.json() : Promise.reject(new Error(response.statusText)))
      .then(({ categories }) => dispatch(fetchExpenseCategoriesSuccess({ categories })))
      .catch(
        (error) => {
          dispatch(fetchExpenseCategoriesFailure({ errorMessage: error.message }));
          return Promise.reject(error);
        });
  }
}