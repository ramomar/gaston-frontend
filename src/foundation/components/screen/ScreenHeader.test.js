import React from 'react';
import renderer from 'react-test-renderer';
import ScreenHeader from './ScreenHeader';

it('renders correctly', () => {
  const component =
    <ScreenHeader
      start={<div>Start</div>}
      center={<div>Center</div>}
      end={<div>End</div>}>
    </ScreenHeader>;

  const tree = renderer.create(component);

  expect(tree).toMatchSnapshot();
});
