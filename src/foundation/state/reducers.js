import { combineReducers } from 'redux';
import { REQUEST_EXPENSES, RECEIVE_EXPENSES } from './actions';
import * as R from 'ramda';
import { DateTime } from 'luxon';

function makeExpenseListScreenState() {
  return {
    expenses: [],
    isFetching: false,
    hasMore: true,
    hasError: false,
    error: null,
    paginationStart: 0,
    paginationEnd: 0
  };
}

function computeStateOnRequestExpenses(state, _) {
  return R.mergeRight(state,
    { isFetching: true }
  );
}

function computeStateOnReceiveExpenses(state, action) {
  const hasError = !!action.error;

  return R.mergeAll([
    state,
    {
      isFetching: false,
    },
    hasError ? { error: action.error } : {
      paginationStart: action.paginationEnd,
      paginationEnd: action.paginationEnd,
      hasMore: action.hasMore,
      expenses: [...state.expenses, ...action.expenses]
    }
  ]);
}

function expenseListScreen(state = makeExpenseListScreenState(), action) {
  switch (action.type) {
    case REQUEST_EXPENSES:
      return computeStateOnRequestExpenses(state, action);
    case RECEIVE_EXPENSES:
      return computeStateOnReceiveExpenses(state, action);
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
  expenseListScreen
});

export {
  rootReducer,
  expensesByDay
};
