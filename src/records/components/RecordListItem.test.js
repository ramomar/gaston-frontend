import React from 'react';
import renderer from 'react-test-renderer';
import RecordListItem from './RecordListItem';
import { DateTime } from 'luxon';

it('renders correctly', () => {
  const record = {
    id: '0007182d-54cb-42b7-88fc-bbaba51db198',
    amount: 150,
    date: DateTime.fromISO('2021-02-17T12:38:51.700Z'),
    note: 'Cena',
    raw: '{\"source\": \"CHARGE_EMAIL\", \"type\": \"EXPENSE\", \"amount\": \"150.00\", \"operation_date\": \"17/Feb/2021 12:38:51 HORAS\", \"application_date\": \"17/Feb/2021\", \"receiver\": null, \"channel\": {\"type\": \"TPV(COMPRA COMERCIO)\"}}'
  };

  const component =
    <RecordListItem
      record={record}
      toRecordReviewScreen={() => null} />;

  const tree = renderer.create(component).toJSON();

  expect(tree).toMatchSnapshot();
});
