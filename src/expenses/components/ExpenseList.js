import React from 'react';
import { Box, Anchor } from 'grommet';
import ExpenseListItem from './ExpenseListItem';
import ExpenseListDaySeparator from './ExpenseListDaySeparator';
import * as R from 'ramda';

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
  const computeTotalAmount = R.reduce((acc, next) => acc + next.amount, 0);

  const makeItems = ({ day, expenses }) => R.flatten([
    makeExpenseListDateSeparator(day, computeTotalAmount(expenses)),
    expenses.map(makeExpenseListItem(toExpenseReviewScreen))
  ]);

  return R.chain(makeItems, expenseGroups);
}

function ExpenseList({ expenseGroups, isFetching, hasMore, moreExpenses, toExpenseReviewScreen }) {
  return (
    <Box fill='vertical'>
      <Box overflow='scroll' pad={{ horizontal: 'medium' }}>
        {makeItemsFromExpenseGroups(expenseGroups, toExpenseReviewScreen)}
        {!isFetching && hasMore &&
          <Anchor
            primary
            alignSelf='center'
            margin={{ top: 'small', bottom: 'medium' }}
            style={{ textDecoration: 'underline' }}
            onClick={() => moreExpenses()}>
            Ver más gastos
          </Anchor>
        }
      </Box>
    </Box >
  );
}

export default ExpenseList;
