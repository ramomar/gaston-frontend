import { combineReducers } from 'redux';
import * as ExpenseActions from '../actions/ExpenseActions';
import * as R from 'ramda';
import { DateTime } from 'luxon';

function makeExpensesState() {
  return {
    expenses: new Set(),
    fetch: {
      isFetching: false,
      hasMore: true,
      hasError: false,
      error: null,
      paginationStart: 0,
      paginationEnd: 0
    },
    review: {
      hasError: false,
      error: null
    }
  };
}

function computeStateOnRequestExpenses(state, _) {
  return R.mergeAll([
    state,
    { fetch: R.mergeRight(state.fetch, { isFetching: true }) }
  ]);
}

function computeStateOnReceiveExpensesSuccess(state, { payload }) {
  const hasError = !!payload.error;

  return R.mergeAll([
    state,
    {
      expenses: new Set([...state.expenses, ...payload.expenses])
    },
    {
      fetch: {
        paginationStart: payload.paginationStart,
        paginationEnd: payload.paginationEnd,
        isFetching: false,
        hasMore: payload.hasMore,
        hasError,
        error: hasError ? payload.error : null
      }
    }
  ]);
}

function computeStateOnReceiveExpensesFailure(state, { payload }) {
  return R.mergeAll([
    state,
    {
      fetch: R.mergeRight(state.fetch, {
        isFetching: false,
        hasError: true,
        error: payload.errorMessage
      })
    }
  ]);
}

function computeStateOnReviewExpenseSuccess(state, { payload }) {
  const expenses = [...state.expenses];

  const expenseToDelete = expenses.filter(e => e.id === payload.expense.id)[0];

  state.expenses.delete(expenseToDelete);

  return R.mergeAll([
    state,
    { expenses: new Set([...state.expenses]) }
  ]);
}

function computeStateOnReviewExpenseFailure(state, { payload }) {
  return
}

export function expensesReducer(state = makeExpensesState(), action) {
  switch (action.type) {
    case ExpenseActions.FETCH_EXPENSES_REQUEST:
      return computeStateOnRequestExpenses(state, action);
    case ExpenseActions.FETCH_EXPENSES_SUCCESS:
      return computeStateOnReceiveExpensesSuccess(state, action);
    case ExpenseActions.FETCH_EXPENSES_FAILURE:
      return computeStateOnReceiveExpensesFailure(state, action);
    case ExpenseActions.REVIEW_EXPENSE_REQUEST:
      return state;
    case ExpenseActions.REVIEW_EXPENSE_SUCCESS:
      return computeStateOnReviewExpenseSuccess(state, action);
    case ExpenseActions.REVIEW_EXPENSE_FAILURE:
      return computeStateOnReviewExpenseFailure(state, action);
    default:
      return state;
  }
}

function expensesByDay(expenses) {
  const compareDates = (d1, d2) => d2.toMillis() - d1.toMillis();
  const groupByDay = R.pipe(
    R.groupBy(expense => expense.date.toLocaleString()),
    R.toPairs,
    R.map(([day, expenses]) => ({
      day: DateTime.fromFormat(day, 'd/M/yyyy'),
      expenses: R.sort((e1, e2) => compareDates(e1.date, e2.date), expenses)
    })),
    R.sort((eg1, eg2) => compareDates(eg1.day, eg2.day))
  );

  return groupByDay(expenses);
}

const rootReducer = combineReducers({
  expenses: expensesReducer
});

export {
  rootReducer,
  expensesByDay
};
