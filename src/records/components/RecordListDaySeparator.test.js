import React from 'react';
import renderer from 'react-test-renderer';
import RecordListDaySeparator from './RecordListDaySeparator';
import { DateTime } from 'luxon';

it('renders correctly', () => {
  const component =
    <RecordListDaySeparator
      day={DateTime.fromISO('2019-12-30T02:58:24.948Z')}
      amountForDay={100.50} />;

  const tree = renderer.create(component).toJSON();

  expect(tree).toMatchSnapshot();
});
