import React from 'react';
import renderer from 'react-test-renderer';
import RecordListItem from './RecordListItem';
import { DateTime } from 'luxon';

it('renders correctly', () => {
  const record = {
    'id': '0007182d-54cb-42b7-88fc-bbaba51db198',
    'amount': 150,
    'date': DateTime.fromISO('2017-03-19T05:29:02.700Z'),
    'note': 'Cena'
  };

  const component =
    <RecordListItem
      record={record}
      toRecordReviewScreen={() => null} />;

  const tree = renderer.create(component).toJSON();

  expect(tree).toMatchSnapshot();
});