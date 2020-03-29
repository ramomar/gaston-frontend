import React from 'react';
import renderer from 'react-test-renderer';
import { Grommet } from 'grommet';
import LoginForm from './LoginForm';


it('renders correctly', () => {
  const component =
    <Grommet>
      <LoginForm />
    </Grommet>;

  const tree = renderer.create(component);

  expect(tree).toMatchSnapshot();
});
