import computeTotalAmount from './computeTotalAmount';
import { DateTime } from 'luxon';

it('should compute total amount for a given list of records', () => {
  const record1 = {
    'id': '0007182d-54cb-42b7-88fc-bbaba51db198',
    'amount': 150,
    'date': DateTime.fromISO('2017-03-19T05:29:02.700Z'),
    'note': 'Vancouver Wings'
  };

  const record2 = {
    'id': '000c0a96-01b4-477a-a9c5-fa3394460a90',
    'amount': 450,
    'date': DateTime.fromISO('2017-12-15T19:00:12.929Z'),
    'note': 'Libros'
  };

  const record3 = {
    'id': '00134521-54c5-4cd8-96f1-49b1b55bdfea',
    'amount': 131.75,
    'date': DateTime.fromISO('2017-04-22T02:26:04.488Z'),
    'note': 'Buffalo Hot Wings, Paseo Tec -> Casa'
  };

  const record4 = {
    'id': '00134521-54c5-4cd8-96f1-59b1b60bdfaa',
    'amount': 500,
    'date': DateTime.fromISO('2017-04-22T04:30:00.000Z'),
    'note': 'Doctor'
  };

  const records = [
    record1,
    record2,
    record3,
    record4
  ];

  const expected = 1231.75;

  const actual = computeTotalAmount(records);

  expect(actual).toEqual(expected);
});
