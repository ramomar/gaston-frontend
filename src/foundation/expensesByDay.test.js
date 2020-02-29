import expensesByDay from './expensesByDay';
import { DateTime } from 'luxon';

it('should group a list of expenses by day and return gropus as well as expenses in descending order', () => {
  const expense1 = {
    'id': '0007182d-54cb-42b7-88fc-bbaba51db198',
    'amount': 150,
    'date': DateTime.fromISO('2017-03-19T05:29:02.700Z'),
    'note': 'Vancouver Wings'
  };

  const expense2 = {
    'id': '000c0a96-01b4-477a-a9c5-fa3394460a90',
    'amount': 450,
    'date': DateTime.fromISO('2017-12-15T19:00:12.929Z'),
    'note': 'Libros'
  };

  const expense3 = {
    'id': '00134521-54c5-4cd8-96f1-49b1b55bdfea',
    'amount': 131.75,
    'date': DateTime.fromISO('2017-04-22T02:26:04.488Z'),
    'note': 'Buffalo Hot Wings, Paseo Tec -> Casa'
  };

  const expense4 = {
    'id': '00134521-54c5-4cd8-96f1-59b1b60bdfaa',
    'amount': 500,
    'date': DateTime.fromISO('2017-04-22T04:30:00.000Z'),
    'note': 'Doctor'
  };

  const expenses = [
    expense1,
    expense2,
    expense3,
    expense4
  ];

  const expected = [
    {
      day: expense2.date.startOf('day'),
      expenses: [expense2]
    },
    {
      day: expense4.date.startOf('day'),
      expenses: [expense4, expense3]
    },
    {
      day: expense1.date.startOf('day'),
      expenses: [expense1]
    }
  ];

  const actual = expensesByDay(expenses);

  expect(actual).toStrictEqual(expected);
});
