import React from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { useLocation, useHistory } from 'react-router-dom';
import { reviewExpense } from '../../foundation/state/actions';
import ExpenseReviewScreen from '../components/ExpenseReviewScreen';

function stateToProps(state) {
  const { categories } = state;

  return {
    expenseCategories: [...categories.categories]
  };
}

function dispatchToProps(dispatch, goBack, expense) {
  return {
    reviewExpense: () => {
      dispatch(reviewExpense({
        expense
      }));

      goBack();
    }
  };
}

function ExpenseReviewScreenContainer(props) {
  const { state: { expense } } = useLocation();

  const { goBack } = useHistory();

  const stateProps = useSelector(stateToProps);

  const dispatchProps = dispatchToProps(
    useDispatch(),
    goBack,
    expense
  );

  return (
    <ExpenseReviewScreen
      expense={expense}
      goBack={goBack}
      {...stateProps}
      {...dispatchProps}
    />
  );
}

export default ExpenseReviewScreenContainer;
