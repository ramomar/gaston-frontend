import { combineReducers } from 'redux';
import { recordReducer } from './RecordReducer';
import { recordCategoryReducer } from './RecordCategoryReducer';
import { authReducer } from './AuthReducer';

const rootReducer = combineReducers({
  records: recordReducer,
  categories: recordCategoryReducer,
  auth: authReducer
});

export {
  rootReducer
};
