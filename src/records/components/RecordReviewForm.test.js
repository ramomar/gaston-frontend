import React from 'react';
import renderer from 'react-test-renderer';
import { Grommet } from 'grommet';
import RecordReviewForm from './RecordReviewForm';
import { DateTime } from 'luxon';

it('renders correctly', () => {
  const now = DateTime.fromISO('2019-12-29T00:00:00.000Z');

  const dateTimeLocalMock = jest.fn();

  dateTimeLocalMock.mockReturnValue(now);

  DateTime.local = dateTimeLocalMock;

  const record = {
    id: '0007182d-54cb-42b7-88fc-bbaba51db198',
    amount: 150,
    date: DateTime.fromISO('2021-02-17T12:38:51.700Z'),
    note: 'Cena',
    raw: '{\"source\": \"CHARGE_EMAIL\", \"type\": \"EXPENSE\", \"amount\": \"150.00\", \"operation_date\": \"17/Feb/2021 12:38:51 HORAS\", \"application_date\": \"17/Feb/2021\", \"receiver\": null, \"channel\": {\"type\": \"TPV(COMPRA COMERCIO)\"}}'
  };

  const recordCategories = [
    { name: 'Educación' },
    { name: 'Cena' }
  ];

  const component =
    <Grommet>
      <RecordReviewForm
        record={record}
        reviewRecord={() => null}
        recordCategories={recordCategories}>
      </RecordReviewForm>
    </Grommet>;

  const tree = renderer.create(component);

  expect(tree).toMatchSnapshot();
});
