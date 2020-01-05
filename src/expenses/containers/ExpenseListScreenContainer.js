import React from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router';
import { fetchExpenses } from '../../foundation/state/actions';
import expensesByDay from '../../foundation/expensesByDay';
import ExpenseListScreen from '../components/ExpenseListScreen';
import * as R from 'ramda';

function stateToPagination(state) {
  const { expenses: { fetch } } = state;

  return {
    paginationStart: fetch.paginationStart,
    paginationEnd: fetch.paginationEnd
  }
}

function stateToProps(state) {
  const { expenses } = state;

  const expensesById = expenses.expenses.byId;

  return {
    expenseGroups: expensesByDay(R.props(Object.keys(expensesById), expensesById)),
    isFetching: expenses.fetch.isFetching,
    hasMore: expenses.fetch.hasMore
  };
}

function dispatchToProps(dispatch, paginationStart, paginationEnd) {
  return {
    moreExpenses: () =>
      dispatch(fetchExpenses({
        paginationStart: paginationStart,
        paginationEnd: paginationEnd + 10
      }))
  };
}

export default function ExpenseListScreenContainer(props) {
  const stateProps = useSelector(stateToProps);

  const { paginationStart, paginationEnd } = useSelector(stateToPagination);

  const dispatchProps = dispatchToProps(
    useDispatch(),
    paginationStart,
    paginationEnd
  );

  const { push } = useHistory();

  const toExpenseReviewScreen = ({ id }) =>
    push(`/expenses/${id}/review`);

  return (
    <ExpenseListScreen
      toExpenseReviewScreen={toExpenseReviewScreen}
      {...stateProps}
      {...dispatchProps} />
  );
}
