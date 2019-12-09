import React from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import ExpenseReviewScreen from '../components/ExpenseReviewScreen';

function ExpenseReviewScreenContainer(props) {
  const { state: { expense } } = useLocation();
  const { goBack } = useHistory();

  return (
    <ExpenseReviewScreen expense={expense} goBack={goBack} />
  );
}

export default ExpenseReviewScreenContainer;
