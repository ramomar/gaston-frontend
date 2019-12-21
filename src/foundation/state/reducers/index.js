import { combineReducers } from 'redux';
import * as ExpenseReducers from './ExpenseReducers';

const rootReducer = combineReducers({
  expenses: ExpenseReducers.expensesReducer
});

export {
  rootReducer
};
