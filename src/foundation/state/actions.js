import { DateTime } from 'luxon';
import _expenses from './expenses.json';

function makeExpense(rawExpense) {
  return {
    id: rawExpense.id,
    note: rawExpense.note,
    amount: Math.abs(parseFloat(rawExpense.amount)),
    date: DateTime.fromISO(rawExpense.date)
  };
}

function expenses(paginationStart, paginationEnd) {
  return Promise.resolve({
    json: () => ({
      expenses: _expenses
        .map(makeExpense)
        .sort((e1, e2) => e2.date.toMillis() - e1.date.toMillis())
        .slice(paginationStart, paginationEnd),
      hasMore: true
    })
  });
}

const REQUEST_EXPENSES = 'REQUEST_EXPENSES';
const RECEIVE_EXPENSES = 'RECEIVE_EXPENSES';
const REVIEW_EXPENSE = 'REVIEW_EXPENSE';

function requestExpenses() {
  return {
    type: REQUEST_EXPENSES,
  };
}

function receiveExpenses({ expenses, hasMore, error, paginationStart, paginationEnd }) {
  return {
    type: RECEIVE_EXPENSES,
    expenses,
    hasMore,
    error,
    paginationStart,
    paginationEnd
  };
}

function reviewExpense({ expenseReview }) {
  return {
    type: REVIEW_EXPENSE,
    expenseReview
  };
}

function fetchExpenses({ paginationStart, paginationEnd }) {
  return dispatch => {
    dispatch(requestExpenses());

    return expenses(paginationStart, paginationEnd)
      .then(
        response => response.json(),
        error => receiveExpenses({ expenses: [], error })
      )
      .then(
        ({ expenses, hasMore }) =>
          dispatch(receiveExpenses({
            expenses,
            hasMore,
            paginationStart,
            paginationEnd,
            error: null
          })),
        error => receiveExpenses({ expenses: [], error })
      );
  };
}

export {
  REQUEST_EXPENSES,
  RECEIVE_EXPENSES,
  REVIEW_EXPENSE,
  fetchExpenses,
  reviewExpense
};
