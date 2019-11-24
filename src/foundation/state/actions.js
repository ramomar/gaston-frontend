import { DateTime } from 'luxon';
import _expenses from '../../expenses.json';

function makeExpense(rawExpense) {
  return {
    id: rawExpense.id,
    note: rawExpense.note,
    amount: Math.abs(parseFloat(rawExpense.amount)),
    date: DateTime.fromISO(rawExpense.date)
  };
}

// Should it be pagination start and paginationEnd?
function expenses(paginationStart, paginationEnd) {
  return Promise.resolve(
    _expenses
      .map(makeExpense)
      .slice(paginationStart, paginationEnd)
  );
}

const REQUEST_EXPENSES = 'REQUEST_EXPENSES';
const RECEIVE_EXPENSES = 'RECEIVE_EXPENSES';
const REVIEW_EXPENSE = 'REVIEW_EXPENSE';

function requestExpenses({ paginationStart, paginationEnd }) {
  return {
    type: REQUEST_EXPENSES,
    paginationStart,
    paginationEnd
  };
}

function receiveExpenses({ paginationStart, paginationEnd, expenses, error }) {
  return {
    type: RECEIVE_EXPENSES,
    paginationStart,
    paginationEnd,
    expenses,
    error
  };
}

function reviewExpense({ expenseReview }) {
  return {
    type: REVIEW_EXPENSE,
    expenseReview
  };
}

function fetchExpenses(paginationStart, paginationEnd) {
  return dispatch => {
    dispatch(requestExpenses({ paginationStart, paginationEnd }));

    return expenses(paginationStart, paginationEnd)
      .then(expenses => ({ json: () => expenses }))
      .then(
        response => response.json(),
        error => receiveExpenses({ paginationStart, paginationEnd, expeness: [], error })
      )
      .then(
        expenses => dispatch(receiveExpenses({ paginationStart, paginationEnd, expenses })),
        error => receiveExpenses({ paginationStart, paginationEnd, expenses: [], error })
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
