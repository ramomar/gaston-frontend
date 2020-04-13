import recordsByDay from './recordsByDay';
import { DateTime } from 'luxon';

it('should group a list of records by day and return gropus as well as records in descending order', () => {
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

  const expected = [
    {
      day: record2.date.startOf('day'),
      records: [record2]
    },
    {
      day: record4.date.startOf('day'),
      records: [record4, record3]
    },
    {
      day: record1.date.startOf('day'),
      records: [record1]
    }
  ];

  const actual = recordsByDay(records);

  expect(actual).toStrictEqual(expected);
});
