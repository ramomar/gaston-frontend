// TODO: move this
import { DateTime } from 'luxon';
function makeExpense(rawExpense) {
  return {
    id: rawExpense.id,
    note: rawExpense.note || 'Sin nota',
    amount: Math.abs(parseFloat(rawExpense.amount)),
    date: DateTime.fromISO(rawExpense.date)
  };
}

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

export function fetchExpensesSuccess({ expenses, hasMore, paginationStart, paginationEnd }) {
  return {
    type: FETCH_EXPENSES_SUCCESS,
    payload: {
      expenses,
      hasMore,
      paginationStart,
      paginationEnd
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

    const successAction = ({ expenses, hasMore }) =>
      dispatch(fetchExpensesSuccess({
        expenses: expenses.map(makeExpense),
        hasMore,
        paginationStart,
        paginationEnd
      }));

    return fetch(`${process.env.REACT_APP_API_HOST}/api/expenses`, {
      method: 'GET'
    })
      .then(response =>
        response.ok ? response.json() : Promise.reject(new Error(response.statusText)))
      .then(successAction)
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

export function reviewExpenseSuccess({ expense }) {
  return {
    type: REVIEW_EXPENSE_SUCCESS,
    payload: {
      expense
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

    return fetch(`${process.env.REACT_APP_API_HOST}/api/expenses/${expense.id}/review`, {
      method: 'POST',
      body: JSON.stringify(expense),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response =>
        response.ok ? response.json() : Promise.reject(new Error(response.statusText)))
      .then(({ expense }) => dispatch(reviewExpenseSuccess({ expense })))
      .catch(
        (error) => {
          dispatch(reviewExpenseFailure({ errorMessage: error.message }));
          return Promise.reject(error);
        });
  }
}

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