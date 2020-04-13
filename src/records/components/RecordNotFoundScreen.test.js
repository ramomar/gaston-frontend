import React from 'react';
import renderer from 'react-test-renderer';
import { Grommet } from 'grommet';
import RecordNotFoundScreen from './RecordNotFoundScreen';

it('renders correctly', () => {
  const component =
    <Grommet>
      <RecordNotFoundScreen
        goToRecords={() => null}>
      </RecordNotFoundScreen>
    </Grommet>;

  const tree = renderer.create(component);

  expect(tree).toMatchSnapshot();
});
