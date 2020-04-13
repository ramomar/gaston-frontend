import React from 'react';
import renderer from 'react-test-renderer';
import RecordListScreen from './RecordListScreen';
import { DateTime } from 'luxon';

it('renders correctly', () => {
  const record = {
    'id': '0007182d-54cb-42b7-88fc-bbaba51db198',
    'amount': 150,
    'date': DateTime.fromISO('2017-03-19T05:29:02.700Z'),
    'note': 'Cena'
  };

  const recordGroups = [
    {
      day: DateTime.fromISO('2017-03-19T05:29:02.700Z').startOf('day'),
      records: [record]
    }
  ];

  const component =
    <RecordListScreen
      recordGroups={recordGroups}
      isFetching={true}
      hasMore={false}
      moreRecords={() => null}
      toRecordReviewScreen={() => null} />;

  const tree = renderer.create(component);

  expect(tree).toMatchSnapshot();
});
