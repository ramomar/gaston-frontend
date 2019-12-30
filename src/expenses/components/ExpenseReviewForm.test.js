import React from 'react';
import renderer from 'react-test-renderer';
import { Grommet } from 'grommet';
import ExpenseReviewForm from './ExpenseReviewForm';
import { DateTime } from 'luxon';

it('renders correctly', () => {
  const now = DateTime.fromISO('2019-12-29T00:00:00.000Z');

  const dateTimeLocalMock = jest.fn();

  dateTimeLocalMock.mockReturnValue(now);

  DateTime.local = dateTimeLocalMock;

  const expense = {
    'id': '0007182d-54cb-42b7-88fc-bbaba51db198',
    'amount': 150,
    'date': DateTime.fromISO('2017-03-19T05:29:02.700Z'),
    'note': 'Cena'
  };

  const expenseCategories = [
    { name: 'Educación' },
    { name: 'Cena' }
  ];

  const component =
    <Grommet>
      <ExpenseReviewForm
        expense={expense}
        reviewExpense={() => null}
        expenseCategories={expenseCategories}>
      </ExpenseReviewForm>
    </Grommet>;

  const tree = renderer.create(component)

  expect(tree).toMatchSnapshot();
});
