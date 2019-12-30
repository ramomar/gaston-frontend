import React from 'react';
import renderer from 'react-test-renderer';
import ExpenseList from './ExpenseList';
import { DateTime } from 'luxon';

it('renders correctly', () => {
  const expense = {
    'id': '0007182d-54cb-42b7-88fc-bbaba51db198',
    'amount': 150,
    'date': DateTime.fromISO('2017-03-19T05:29:02.700Z'),
    'note': 'Cena'
  };

  const expenseGroups = [
    {
      day: DateTime.fromISO('2017-03-19T05:29:02.700Z').startOf('day'),
      expenses: [expense]
    }
  ];

  const component =
    <ExpenseList
      expenseGroups={expenseGroups}
      isFetching={false}
      hasMore={true}
      moreExpenses={() => null}
      toExpenseReviewScreen={() => null} />

  const tree = renderer.create(component).toJSON();

  expect(tree).toMatchSnapshot();
});
