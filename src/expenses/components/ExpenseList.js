import React from 'react';
import { Box, Anchor } from 'grommet';
import ExpenseListItem from './ExpenseListItem';
import ExpenseListDaySeparator from './ExpenseListDaySeparator';
import { chain, flatten, reduce } from 'ramda';

function makeExpenseListDateSeparator(day, amountForDay) {
  return (
    <ExpenseListDaySeparator
      key={day.toLocaleString()}
      day={day}
      amountForDay={amountForDay}
    />
  );
}

function makeExpenseListItem(expense) {
  return (
    <ExpenseListItem
      key={expense.id}
      expense={expense} />
  );
}

function makeItemsFromExpenseGroups(expenseGroups) {
  const computeTotalAmount = reduce((acc, next) => acc + next.amount, 0);

  const makeItems = ({ day, expenses }) => flatten([
    makeExpenseListDateSeparator(day, computeTotalAmount(expenses)),
    expenses.map(makeExpenseListItem)
  ]);

  return chain(makeItems, expenseGroups);
}

function ExpenseList({ expenseGroups, moreExpenses, isFetching, hasMore }) {
  return (
    <Box fill='vertical'>
      <Box overflow='scroll' pad={{ horizontal: 'medium' }}>
        {makeItemsFromExpenseGroups(expenseGroups)}
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
