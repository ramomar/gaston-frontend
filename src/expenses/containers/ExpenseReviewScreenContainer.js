import React from 'react';
import { useDispatch } from 'react-redux'
import { useLocation, useHistory } from 'react-router-dom';
import { reviewExpense } from '../../foundation/state/actions';
import ExpenseReviewScreen from '../components/ExpenseReviewScreen';

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

  const dispatchProps = dispatchToProps(
    useDispatch(),
    goBack,
    expense
  );

  return (
    <ExpenseReviewScreen
      expense={expense}
      goBack={goBack}
      {...dispatchProps}
    />
  );
}

export default ExpenseReviewScreenContainer;
