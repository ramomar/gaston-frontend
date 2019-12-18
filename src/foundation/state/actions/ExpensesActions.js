export const FETCH_EXPENSES_REQUEST = 'FETCH_EXPENSES_REQUEST';
export const FETCH_EXPENSES_SUCCESS = 'FETCH_EXPENSES_SUCCESS';
export const FETCH_EXPENSES_FAILURE = 'FETCH_EXPENESES_FAILURE';

export function fetchExpensesRequest({ paginationStart, paginationEnd }) {
  return {
    type: FETCH_EXPENSES_REQUEST,
    payload: {
      paginationStart,
      paginationEnd
    }
  };
}

export function fetchExpensesSuccess({ expenses, hasMore }) {
  return {
    type: FETCH_EXPENSES_SUCCESS,
    payload: {
      expenses,
      hasMore
    }
  };
}

export function fetchExpensesFailure({ errorMessage }) {
  return {
    type: FETCH_EXPENSES_FAILURE,
    payload: {
      errorMessage
    }
  };
}

export function fetchExpenses({ paginationStart, paginationEnd }) {
  return dispatch => {
    dispatch(fetchExpensesRequest({ paginationStart, paginationEnd }));

    return fetch('/api/expenses', {
      method: 'GET'
    })
      .then(response =>
        response.ok ? response.json() : Promise.reject(new Error(response.statusText)))
      .then(({ expenses, hasMore }) => dispatch(fetchExpensesSuccess({ expenses, hasMore })))
      .catch(
        (error) => {
          dispatch(fetchExpensesFailure({ errorMessage: error.message }));
          return Promise.reject(error);
        });
  };
}

export const REVIEW_EXPENSE_REQUEST = 'REVIEW_EXPENSE_REQUEST';
export const REVIEW_EXPENSE_SUCCESS = 'REVIEW_EXPENSE_SUCCESS';
export const REVIEW_EXPENSE_FAILURE = 'REVIEW_EXPENSE_FAILURE';

export function reviewExpenseRequest({ expense }) {
  return {
    type: REVIEW_EXPENSE_REQUEST,
    payload: {
      expense
    }
  };
}

export function reviewExpenseSuccess({ reviewedExpense }) {
  return {
    type: REVIEW_EXPENSE_SUCCESS,
    payload: {
      reviewedExpense
    }
  };
}

export function reviewExpenseFailure({ errorMessage }) {
  return {
    type: REVIEW_EXPENSE_FAILURE,
    payload: {
      errorMessage
    }
  };
}

export function reviewExpense({ expense }) {
  return dispatch => {
    dispatch(reviewExpenseRequest({ expense }));

    return fetch(`/api/expenses/${expense.id}/review`, {
      method: 'POST',
      body: JSON.stringify(expense),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response =>
        response.ok ? response.json() : Promise.reject(new Error(response.statusText)))
      .then(({ reviewedExpense }) => dispatch(reviewExpenseSuccess({ reviewedExpense })))
      .catch(
        (error) => {
          dispatch(reviewExpenseFailure({ errorMessage: error.message }));
          return Promise.reject(error);
        });
  }
}