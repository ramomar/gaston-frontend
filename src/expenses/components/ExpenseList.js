import React, { useState, useEffect } from 'react';
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

function ExpenseList({ expenseGroups, fetchExpenses }) {
  const [state, setState] = useState({
    paginationStart: 0,
    paginationEnd: 10
  });

  const listItems = makeItemsFromExpenseGroups(expenseGroups);
  const isLoading = false;

  // TODO: include button only when there are more items and handle errors.
  return (
    <Box fill='vertical'>
      <Box overflow='scroll' pad={{ horizontal: 'medium' }}>
        {listItems}
        {!isLoading &&
          <Anchor
            primary
            alignSelf='center'
            margin={{ top: 'small', bottom: 'medium' }}
            style={{ textDecoration: 'underline' }}
            onClick={() => fetchExpenses(0, 10)}>
            Ver más gastos
          </Anchor>
        }
      </Box>
    </Box >
  );
}

export default ExpenseList;
