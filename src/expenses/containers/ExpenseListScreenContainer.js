import React from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router';
import { fetchExpenses } from '../../foundation/state/actions';
import { expensesByDay } from '../../foundation/state/reducers';
import ExpenseListScreen from '../components/ExpenseListScreen';


function stateToProps(state) {
  const { expenseListScreen } = state;

  return {
    expenseGroups: expensesByDay(expenseListScreen.expenses),
    isFetching: expenseListScreen.isFetching,
    hasMore: expenseListScreen.hasMore,
    hasError: expenseListScreen.hasError,
    error: expenseListScreen.error
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

  const { paginationStart, paginationEnd } =
    useSelector(({ expenseListScreen }) => expenseListScreen);

  const dispatchProps = dispatchToProps(
    useDispatch(),
    paginationStart,
    paginationEnd
  );

  const { push } = useHistory();

  const toExpenseReviewScreen = ({ id, note, amount, date }) =>
    push(`/expenses/${id}/review`, {
      expense: {
        id,
        note,
        amount,
        date: date.toISO()
      },
      fromList: true
    });

  return (
    <ExpenseListScreen
      toExpenseReviewScreen={toExpenseReviewScreen}
      {...stateProps}
      {...dispatchProps}
    />
  );
}
