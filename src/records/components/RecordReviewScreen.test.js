import React from 'react';
import renderer from 'react-test-renderer';
import { Grommet } from 'grommet';
import RecordReviewScreen from './RecordReviewScreen';
import { DateTime } from 'luxon';

it('renders correctly', () => {
  const now = DateTime.fromISO('2019-12-29T00:00:00.000Z');

  const dateTimeLocalMock = jest.fn();

  dateTimeLocalMock.mockReturnValue(now);

  DateTime.local = dateTimeLocalMock;

  const record = {
    id: '0007182d-54cb-42b7-88fc-bbaba51db198',
    amount: 2000.00,
    date: DateTime.fromISO('2021-01-17T12:38:51.700Z'),
    note: 'RETIRO DE EFECTIVO',
    raw: '{"source": "CASH_WITHDRAWAL_EMAIL", "type": "EXPENSE", "note": "RETIRO DE EFECTIVO", "amount": "2000.00", "operation_date": "17/Feb/2021 12:38:51 HORAS", "application_date": "17/Feb/2021", "receiver": null, "channel": {"type": "Cajero Banorte", "details": {"name": "ROMA SUR 4", "location": "CDMX"}}, "extra_amounts": []}'
  };

  const recordCategories = [
    { name: 'Educación' },
    { name: 'Cena' }
  ];

  const component =
    <Grommet>
      <RecordReviewScreen
        record={record}
        goToRecords={() => null}
        reviewRecord={() => null}
        recordCategories={recordCategories}>
      </RecordReviewScreen>
    </Grommet>;

  const tree = renderer.create(component);

  expect(tree).toMatchSnapshot();
});
