import React from 'react';
import renderer from 'react-test-renderer';
import ExpenseListDaySeparator from './ExpenseListDaySeparator';
import { DateTime } from 'luxon';

it('renders correctly', () => {
  const component =
    <ExpenseListDaySeparator
      day={DateTime.fromISO('2019-12-30T02:58:24.948Z')}
      amountForDay={100.50} />;

  const tree = renderer.create(component).toJSON();

  expect(tree).toMatchSnapshot();
});
