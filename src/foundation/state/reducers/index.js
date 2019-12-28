import { combineReducers } from 'redux';
import { expenseReducer } from './ExpenseReducer';
import { expenseCategoryReducer } from './ExpenseCategoriesReducer';

const rootReducer = combineReducers({
  expenses: expenseReducer,
  categories: expenseCategoryReducer
});

export {
  rootReducer
};
