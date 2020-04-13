import { DateTime } from 'luxon';
import makeRecord from './makeRecord';

import { Settings } from 'luxon';

Settings.defaultZoneName = 'UTC';

it('should make a record', () => {
  const now = DateTime.utc();

  const expected = {
    id: '6978688b-3426-4f3c-b533-3601b261372e',
    note: 'Food',
    amount: 100.20,
    date: now
  };

  const actual = makeRecord({
    id: '6978688b-3426-4f3c-b533-3601b261372e',
    note: 'Food',
    amount: '100.20',
    date: now.toISO()
  });

  expect(actual).toStrictEqual(expected);
});

it('should provide defaults for the note field', () => {
  const now = DateTime.utc();

  const expected = {
    id: '6978688b-3426-4f3c-b533-3601b261372e',
    note: 'Sin nota',
    amount: 100.20,
    date: now
  };

  const actual = makeRecord({
    id: '6978688b-3426-4f3c-b533-3601b261372e',
    amount: '100.20',
    date: now.toISO()
  });

  expect(actual).toStrictEqual(expected);
});
