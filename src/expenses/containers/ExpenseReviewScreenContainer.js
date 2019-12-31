import React from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { useLocation, useHistory } from 'react-router-dom';
import { reviewExpense } from '../../foundation/state/actions';
import { Text, Button } from 'grommet';
import { LinkPrevious } from 'grommet-icons';
import { SimpleLoadingScreen } from '../../foundation/components/screen';
import ExpenseReviewScreen from '../components/ExpenseReviewScreen';

function stateToProps(state) {
  const { categories } = state;

  return {
    expenseCategories: [...categories.categories]
  };
}

function dispatchToProps(dispatch, goToExpenses) {
  return {
    reviewExpense: (expense) => {
      dispatch(reviewExpense({
        expense
      }));

      goToExpenses();
    }
  };
}

function ExpenseReviewScreenContainer(props) {
  const { state: { expense } = {} } = useLocation();

  const { push } = useHistory();

  const goToExpenses = () => push('/expenses');

  const stateProps = useSelector(stateToProps);

  const dispatchProps = dispatchToProps(
    useDispatch(),
    goToExpenses
  );

  if (expense) {
    return (
      <ExpenseReviewScreen
        expense={expense}
        goToExpenses={goToExpenses}
        {...stateProps}
        {...dispatchProps}
      />
    );
  } else {
    return (
      <SimpleLoadingScreen
        start={<Button plain icon={<LinkPrevious />} onClick={goToExpenses} />}
        center={<Text weight='bold' size='large'>{`Revisión de gasto`}</Text>} />
    );
  }
}

export default ExpenseReviewScreenContainer;
