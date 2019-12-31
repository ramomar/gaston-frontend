import { DateTime } from 'luxon';
import makeExpense from './makeExpense';

import { Settings } from 'luxon';

Settings.defaultZoneName = 'UTC';

it('should make a expense', () => {
  const now = DateTime.utc();

  const expected = {
    id: '6978688b-3426-4f3c-b533-3601b261372e',
    note: 'Food',
    amount: 100.20,
    date: now
  };

  const actual = makeExpense({
    id: '6978688b-3426-4f3c-b533-3601b261372e',
    note: 'Food',
    amount: '100.20',
    date: now.toISO()
  });

  expect(actual).toEqual(expected);
});

it('should provide defaults for the note field', () => {
  const now = DateTime.utc();

  const expected = {
    id: '6978688b-3426-4f3c-b533-3601b261372e',
    note: 'Sin nota',
    amount: 100.20,
    date: now
  };

  const actual = makeExpense({
    id: '6978688b-3426-4f3c-b533-3601b261372e',
    amount: '100.20',
    date: now.toISO()
  });

  expect(actual).toEqual(expected);
});