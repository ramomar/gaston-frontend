import React from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router';
import { Text } from 'grommet';
import { SimpleLoadingScreen } from '../../foundation/components/screen';
import expensesByDay from '../../foundation/expensesByDay';
import ExpenseListScreen from '../components/ExpenseListScreen';
import makeExpense from '../../foundation/makeExpense';
import * as Actions from '../../foundation/state/actions';
import * as R from 'ramda';

function stateToPagination(state) {
  const { expenses: { fetch } } = state;

  return {
    paginationStart: fetch.paginationStart,
    paginationEnd: fetch.paginationEnd
  }
}

function stateToShouldFetchExpenses(state) {
  const { expenses: { fetch: { isFetching, error } } } = state;

  return !isFetching && !error;
}

function stateToProps(state) {
  const { expenses } = state;

  const expensesById = expenses.expenses.byId;

  const makeExpenseGroups = R.pipe(
    R.props(Object.keys(expensesById)),
    R.map(makeExpense),
    expensesByDay
  );

  return {
    expenseGroups: makeExpenseGroups(expensesById),
    isFetching: expenses.fetch.isFetching,
    hasMore: expenses.fetch.hasMore
  };
}

function dispatchToProps(dispatch, paginationStart, paginationEnd) {
  return {
    moreExpenses: () =>
      dispatch(Actions.fetchExpenses({
        paginationStart: paginationStart,
        paginationEnd: paginationEnd + 10
      }))
  };
}

export default function ExpenseListScreenContainer(props) {
  const { push } = useHistory();

  const toExpenseReviewScreen = ({ id }) =>
    push(`/expenses/${id}/review`);

  const stateProps = useSelector(stateToProps);

  const { expenseGroups } = stateProps;

  const { paginationStart, paginationEnd } = useSelector(stateToPagination);

  const shouldFetchExpenses = useSelector(stateToShouldFetchExpenses);

  const dispatch = useDispatch();

  const dispatchProps = dispatchToProps(
    dispatch,
    paginationStart,
    paginationEnd
  );

  if (expenseGroups.length > 0) {
    return (
      <ExpenseListScreen
        toExpenseReviewScreen={toExpenseReviewScreen}
        {...stateProps}
        {...dispatchProps} />
    );
  } else {
    if (shouldFetchExpenses) {
      dispatch(Actions.fetchExpenses({ paginationStart: 0, paginationEnd: 10 }));
    }

    return (
      <SimpleLoadingScreen
        center={<Text weight='bold' size='large'>{`Revisión de gastos`}</Text>} />
    );
  }
}
