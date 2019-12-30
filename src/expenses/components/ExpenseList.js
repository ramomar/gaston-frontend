import React from 'react';
import PropTypes from 'prop-types';
import Shapes from '../shapes';
import { Box, Anchor } from 'grommet';
import ExpenseListItem from './ExpenseListItem';
import ExpenseListDaySeparator from './ExpenseListDaySeparator';
import * as R from 'ramda';
import computeTotalAmount from '../../foundation/computeTotalAmount';

function makeExpenseListDateSeparator(day, amountForDay) {
  return (
    <ExpenseListDaySeparator
      key={day.toLocaleString()}
      day={day}
      amountForDay={amountForDay}
    />
  );
}

function makeExpenseListItem(toExpenseReviewScreen) {
  return (expense) => {
    return (
      <ExpenseListItem
        key={expense.id}
        expense={expense}
        toExpenseReviewScreen={() => toExpenseReviewScreen(expense)}
      />
    );
  };
}

function makeItemsFromExpenseGroups(expenseGroups, toExpenseReviewScreen) {
  const makeItems = ({ day, expenses }) => R.flatten([
    makeExpenseListDateSeparator(day, computeTotalAmount(expenses)),
    expenses.map(makeExpenseListItem(toExpenseReviewScreen))
  ]);

  return R.chain(makeItems, expenseGroups);
}

function ExpenseList(props) {
  return (
    <Box fill='vertical'>
      <Box overflow='scroll' pad={{ horizontal: 'medium' }}>
        {makeItemsFromExpenseGroups(props.expenseGroups, props.toExpenseReviewScreen)}
        {!props.isFetching && props.hasMore &&
          <Anchor
            primary
            alignSelf='center'
            margin={{ top: 'small', bottom: 'medium' }}
            style={{ textDecoration: 'underline' }}
            onClick={() => props.moreExpenses()}>
            Ver más gastos
          </Anchor>
        }
      </Box>
    </Box >
  );
}

ExpenseList.propTypes = {
  expenseGroups: PropTypes.arrayOf(Shapes.expenseGroup).isRequired,
  isFetching: PropTypes.bool.isRequired,
  hasMore: PropTypes.bool.isRequired,
  moreExpenses: PropTypes.func.isRequired,
  toExpenseReviewScreen: PropTypes.func.isRequired
};

export default ExpenseList;
