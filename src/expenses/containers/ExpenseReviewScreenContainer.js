import React from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom';
import { Text, Button } from 'grommet';
import { LinkPrevious } from 'grommet-icons';
import { SimpleLoadingScreen } from '../../foundation/components/screen';
import ExpenseReviewScreen from '../components/ExpenseReviewScreen';
import * as Actions from '../../foundation/state/actions';
import makeExpense from '../../foundation/makeExpense';
import * as R from 'ramda';
import { DateTime } from 'luxon';

function stateToExpense(expenseId, state) {
  const { expenses } = state;

  const expensesById = expenses.expenses.byId;

  const expense = expensesById[expenseId];

  if (expense) {
    return makeExpense(expense);
  }

  return null;
}

function stateToExpenseReviewStatus(expenseId, state) {
  const reviewStatus = state.expenses.review.byId[expenseId];

  if (reviewStatus) {
    return R.assocPath(
      ['review', 'date'],
      DateTime.fromISO(reviewStatus.review.date),
      reviewStatus
    );
  }

  return null;
}

function stateToShouldFetchExpense(expenseId) {
  return (state) => {
    const { expenses } = state;
    const { singleFetch: { isFetching, error }, review } = expenses;
    const alreadyReviewed = review.byId[expenseId] ?
      !review.byId[expenseId].isReviewed :
      false;

    return !isFetching && !error && !alreadyReviewed;
  };
}

function stateToShouldFetchCategories(state) {
  const { categories } = state;
  const { fetch: { isFetching, error } } = categories;

  return !isFetching && !error && categories.categories.size === 0;
}

function stateToProps(expenseId) {
  return (state) => {
    const { categories } = state;

    return {
      expenseCategories: [...categories.categories],
      expense: stateToExpense(expenseId, state),
      expenseReviewStatus: stateToExpenseReviewStatus(expenseId, state)
    };
  };
}

function dispatchToProps(dispatch) {
  return {
    reviewExpense: (expense, review) => {
      dispatch(Actions.reviewExpense({
        expense,
        review
      }));
    }
  };
}

function ExpenseReviewScreenContainer(props) {
  const { expenseId } = useParams();

  const { push } = useHistory();

  const goToExpenses = () => push('/expenses');

  const stateProps = useSelector(stateToProps(expenseId));

  const { expense, expenseCategories } = stateProps;

  const shouldFetchExpense = useSelector(stateToShouldFetchExpense(expenseId));

  const shouldFetchCategories = useSelector(stateToShouldFetchCategories);

  const dispatch = useDispatch();

  const dispatchProps = dispatchToProps(dispatch);

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
      dispatch(Actions.fetchExpense({ id: expenseId }));
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
