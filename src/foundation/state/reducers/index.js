import { combineReducers } from 'redux';
import { expenseReducer } from './ExpenseReducer';
import { expenseCategoryReducer } from './ExpenseCategoryReducer';

const rootReducer = combineReducers({
  expenses: expenseReducer,
  categories: expenseCategoryReducer
});

export {
  rootReducer
};
