import React from 'react';
import renderer from 'react-test-renderer';
import ExpenseListItem from './ExpenseListItem';
import { DateTime } from 'luxon';

it('renders correctly', () => {
  const expense = {
    'id': '0007182d-54cb-42b7-88fc-bbaba51db198',
    'amount': 150,
    'date': DateTime.fromISO('2017-03-19T05:29:02.700Z'),
    'note': 'Cena'
  };

  const component =
    <ExpenseListItem
      expense={expense}
      toExpenseReviewScreen={() => null} />;

  const tree = renderer.create(component).toJSON();

  expect(tree).toMatchSnapshot();
});
