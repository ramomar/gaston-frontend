import { combineReducers } from 'redux';
import { REQUEST_EXPENSES, RECEIVE_EXPENSES } from './actions';
import { pipe, groupBy, toPairs, sort, map } from 'ramda';
import { DateTime } from 'luxon';

function expenseListing(state = { expenses: [] }, action) {
  switch (action.type) {
    case REQUEST_EXPENSES:
      // isFetching = true
      return state;
    case RECEIVE_EXPENSES:
      return {
        ...state,
        expenses: [...state.expenses, ...action.expenses]
      };
    default:
      return state;
  }
}

function expensesByDay(expenses) {
  const compareDates = (d1, d2) => d2.toMillis() - d1.toMillis();
  const byDay = pipe(
    groupBy(expense => expense.date.toLocaleString()),
    toPairs,
    map(([day, expenses]) => ({
      day: DateTime.fromFormat(day, 'd/M/yyyy'),
      expenses: sort((e1, e2) => compareDates(e1.date, e2.date), expenses)
    })),
    sort((g1, g2) => compareDates(g1.day, g2.day))
  );

  return byDay(expenses);
}

const rootReducer = combineReducers({
  expenseListing
});

export {
  rootReducer,
  expensesByDay
};
