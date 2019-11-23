import React, { useState, useEffect } from 'react';
import { Box, Anchor } from 'grommet';
import ExpenseListItem from './ExpenseListItem';
import ExpenseListDaySeparator from './ExpenseListDaySeparator';
import { chain, flatten } from 'ramda';
import EXPENSES from '../EXPENSES';

function makeExpenseListDateSeparator(day, amountForDay) {
  // TODO: remove random
  return (
    <ExpenseListDaySeparator
      key={Math.floor(Math.random() * 20000000)}
      day={day}
      amountForDay={amountForDay}
    />
  );
}

function makeExpenseListItem(expense) {
  // TODO: remove random
  return (
    <ExpenseListItem
      key={Math.floor(Math.random() * 234234234200)}
      expense={expense} />
  );
}

function makeItemsFromExpenseGroups(expenseGroups) {
  const makeItems = (expenseGroup) => flatten([
    makeExpenseListDateSeparator(expenseGroup.day, Math.floor(Math.random() * 200)),
    expenseGroup.expenses.map(makeExpenseListItem)
  ]);

  return chain(makeItems, expenseGroups);
}

function ExpenseList(props) {
  const [state, setState] = useState({
    isLoading: false,
    items: [],
    paginationStart: 0,
    paginationEnd: 10
  });

  const { isLoading, items, paginationStart, paginationEnd } = state;

  useEffect(() => {
    EXPENSES(paginationStart, paginationEnd)
      .then((expenseGroups) => {
        setState({
          isLoading: false,
          items: expenseGroups,
          paginationStart: paginationStart,
          paginationEnd: paginationEnd
        });
      });
  }, [paginationStart, paginationEnd]);

  const moreItems = () => {
    setState({
      isLoading: true,
      items,
      paginationStart,
      paginationEnd: paginationEnd + 5
    });
  };

  const listItems = makeItemsFromExpenseGroups(items);

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
            onClick={moreItems}>
            Ver más gastos
          </Anchor>
        }
      </Box>
    </Box >
  );
}

export default ExpenseList;
