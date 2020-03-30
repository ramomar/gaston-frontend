import { combineReducers } from 'redux';
import { expenseReducer } from './ExpenseReducer';
import { expenseCategoryReducer } from './ExpenseCategoryReducer';
import { authReducer } from './AuthReducer';

const rootReducer = combineReducers({
  expenses: expenseReducer,
  categories: expenseCategoryReducer,
  auth: authReducer
});

export {
  rootReducer
};
