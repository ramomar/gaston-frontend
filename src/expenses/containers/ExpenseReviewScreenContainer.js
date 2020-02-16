import React from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom';
import { Text, Button } from 'grommet';
import { LinkPrevious } from 'grommet-icons';
import { SimpleLoadingScreen } from '../../foundation/components/screen';
import ExpenseReviewScreen from '../components/ExpenseReviewScreen';
import * as Actions from '../../foundation/state/actions';
import makeExpense from '../../foundation/makeExpense';

function stateToExpense(expenseId, state) {
  const { expenses } = state;

  const expensesById = expenses.expenses.byId;

  const expense = expensesById[expenseId];

  if (expense) {
    return makeExpense(expense);
  }

  return null;
}

function stateToShouldFetchExpense(state) {
  const { expenses: { singleFetch: { isFetching, error } } } = state;

  return !isFetching && !error;
}

function stateToShouldFetchCategories(state) {
  const { categories: { fetch: { isFetching, error } } } = state;

  return !isFetching && !error;
}

function stateToProps(expenseId) {
  return (state) => {
    const { categories } = state;

    return {
      expenseCategories: [...categories.categories],
      expense: stateToExpense(expenseId, state)
    };
  };
}

function dispatchToProps(dispatch, goToExpenses) {
  return {
    reviewExpense: (expense) => {
      dispatch(Actions.reviewExpense({
        expense
      }));

      goToExpenses();
    }
  };
}

function ExpenseReviewScreenContainer(props) {
  const { id } = useParams();

  const { push } = useHistory();

  const goToExpenses = () => push('/expenses');

  const stateProps = useSelector(stateToProps(id));

  const { expense, expenseCategories } = stateProps;

  const shouldFetchExpense = useSelector(stateToShouldFetchExpense);

  const shouldFetchCategories = useSelector(stateToShouldFetchCategories);

  const dispatch = useDispatch();

  const dispatchProps = dispatchToProps(
    dispatch,
    goToExpenses
  );

  if (expense && expenseCategories.length > 0) {
    return (
      <ExpenseReviewScreen
        expense={expense}
        goToExpenses={goToExpenses}
        {...stateProps}
        {...dispatchProps} />
    );
  } else {
    if (shouldFetchExpense) {
      dispatch(Actions.fetchExpense({ id }));
    }

    if (shouldFetchCategories) {
      dispatch(Actions.fetchExpenseCategories());
    }

    return (
      <SimpleLoadingScreen
        start={<Button plain icon={<LinkPrevious />} onClick={goToExpenses} />}
        center={<Text weight='bold' size='large'>{`Revisión de gasto`}</Text>} />
    );
  }
}

export default ExpenseReviewScreenContainer;
