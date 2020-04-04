import React, { useEffect, useCallback, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { Text, Button } from 'grommet';
import { LinkPrevious } from 'grommet-icons';
import { SimpleLoadingScreen, SimpleErrorScreen } from '../../foundation/components/screen';
import ExpenseReviewScreen from '../components/ExpenseReviewScreen';
import ExpenseNotFoundScreen from '../components/ExpenseNotFoundScreen';
import * as Actions from '../../foundation/redux/actions';
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
      review.byId[expenseId].isReviewed :
      false;

    return !isFetching && !error && !alreadyReviewed && !stateToExpense(expenseId, state);
  };
}

function stateToFound(state) {
  const { expenses: { singleFetch: { found } } } = state;

  return found;
}

function stateToExpenseFetchFailed(state) {
  const { expenses: { singleFetch: { error } } } = state;

  return !!error;
}

function stateToCategoriesFetchFailed(state) {
  const { categories: { fetch: { error } } } = state;

  return !!error;
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

  const stateProps = useSelector(stateToProps(expenseId));

  const { expense, expenseCategories, expenseReviewStatus } = stateProps;

  const found = useSelector(stateToFound);

  const shouldFetchExpense = useSelector(stateToShouldFetchExpense(expenseId));

  const expenseFetchFailed = useSelector(stateToExpenseFetchFailed);

  const shouldFetchCategories = useSelector(stateToShouldFetchCategories);

  const categoriesFetchFailed = useSelector(stateToCategoriesFetchFailed);

  const dispatch = useDispatch();

  const dispatchProps = dispatchToProps(dispatch);

  const retryFetch = () => {
    if (expenseFetchFailed) {
      dispatch(Actions.fetchExpense({ id: expenseId }));
    }

    if (categoriesFetchFailed) {
      dispatch(Actions.fetchExpenseCategories());
    }
  };

  const [firstDispatch, setFirstDispatch] = useState(true);

  const goToExpenses = useCallback(() => {
    push('/expenses');
  }, [push]);

  useEffect(() => {
    if (!!expenseReviewStatus && expenseReviewStatus.isReviewed) {
      goToExpenses();
    }
  }, [goToExpenses, expenseReviewStatus]);

  useEffect(() => {
    if (shouldFetchExpense && firstDispatch) {
      dispatch(Actions.fetchExpense({ id: expenseId }));
    }

    if (shouldFetchCategories && firstDispatch) {
      dispatch(Actions.fetchExpenseCategories());
    }
    if (firstDispatch) {
      setFirstDispatch(false);
    }
  }, [dispatch,
    setFirstDispatch,
    firstDispatch,
    shouldFetchExpense,
    shouldFetchCategories,
    expenseId
  ]);

  const start = <Button plain icon={<LinkPrevious />} onClick={goToExpenses} />;
  const title = <Text weight='bold' size='large'>{`Revisión de gasto`}</Text>;

  if (expense && expenseCategories.length > 0) {
    return (
      <ExpenseReviewScreen
        expense={expense}
        goToExpenses={goToExpenses}
        {...stateProps}
        {...dispatchProps} />
    );
  }

  if (!found && !firstDispatch) {
    return (<ExpenseNotFoundScreen goToExpenses={goToExpenses} />);
  }

  if (expenseFetchFailed || categoriesFetchFailed) {
    return (
      <SimpleErrorScreen
        start={start}
        center={title}
        retry={retryFetch} />
    );
  }

  return (
    <SimpleLoadingScreen
      start={start}
      center={title} />
  );
}

export default ExpenseReviewScreenContainer;
