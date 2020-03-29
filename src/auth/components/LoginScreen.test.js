import React from 'react';
import renderer from 'react-test-renderer';
import { Grommet } from 'grommet';
import LoginScreen from './LoginScreen';

it('renders correctly', () => {
  const component =
    <Grommet>
      <LoginScreen />
    </Grommet>;

  const tree = renderer.create(component);

  expect(tree).toMatchSnapshot();
});
