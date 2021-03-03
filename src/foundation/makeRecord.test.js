import { DateTime } from 'luxon';
import makeRecord from './makeRecord';

import { Settings } from 'luxon';

Settings.defaultZoneName = 'UTC';

it('should make a record', () => {
  const now = DateTime.fromISO('2021-02-17T12:38:51.613Z');

  const expected = {
    id: '6978688b-3426-4f3c-b533-3601b261372e',
    note: 'RETIRO DE EFECTIVO',
    amount: 2000.00,
    date: now,
    raw: '{"source": "CASH_WITHDRAWAL_EMAIL", "type": "EXPENSE", "note": "RETIRO DE EFECTIVO", "amount": "2000.00", "operation_date": "17/Feb/2021 12:38:51 HORAS", "application_date": "17/Feb/2021", "receiver": null, "channel": {"type": "Cajero Banorte", "details": {"name": "ROMA SUR 4", "location": "CDMX"}}, "extra_amounts": []}'
  };

  const actual = makeRecord({
    id: '6978688b-3426-4f3c-b533-3601b261372e',
    note: 'RETIRO DE EFECTIVO',
    amount: '2000.00',
    date: now.toISO(),
    raw: '{"source": "CASH_WITHDRAWAL_EMAIL", "type": "EXPENSE", "note": "RETIRO DE EFECTIVO", "amount": "2000.00", "operation_date": "17/Feb/2021 12:38:51 HORAS", "application_date": "17/Feb/2021", "receiver": null, "channel": {"type": "Cajero Banorte", "details": {"name": "ROMA SUR 4", "location": "CDMX"}}, "extra_amounts": []}'
  });

  expect(actual).toStrictEqual(expected);
});

it('should provide defaults for the note field', () => {
  const now = DateTime.utc();

  const expected = {
    id: '6978688b-3426-4f3c-b533-3601b261372e',
    note: 'Sin nota',
    amount: 2000.00,
    date: now,
    raw: '{"source": "CASH_WITHDRAWAL_EMAIL", "type": "EXPENSE", "amount": "2000.00", "operation_date": "17/Feb/2021 12:38:51 HORAS", "application_date": "17/Feb/2021", "receiver": null, "channel": {"type": "Cajero Banorte", "details": {"name": "ROMA SUR 4", "location": "CDMX"}}, "extra_amounts": []}'
  };

  const actual = makeRecord({
    id: '6978688b-3426-4f3c-b533-3601b261372e',
    amount: '2000.00',
    date: now.toISO(),
    raw: '{"source": "CASH_WITHDRAWAL_EMAIL", "type": "EXPENSE", "amount": "2000.00", "operation_date": "17/Feb/2021 12:38:51 HORAS", "application_date": "17/Feb/2021", "receiver": null, "channel": {"type": "Cajero Banorte", "details": {"name": "ROMA SUR 4", "location": "CDMX"}}, "extra_amounts": []}'
  });

  expect(actual).toStrictEqual(expected);
});
