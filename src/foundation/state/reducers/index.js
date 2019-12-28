import { combineReducers } from 'redux';
import { expenseReducer } from './ExpenseReducer';

const rootReducer = combineReducers({
  expenses: expenseReducer
});

export {
  rootReducer
};
