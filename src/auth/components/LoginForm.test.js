import React from 'react';
import renderer from 'react-test-renderer';
import { Grommet } from 'grommet';
import LoginForm from './LoginForm';


it('renders correctly', () => {
  const logIn = () => null;

  const loginStatus = {
    isLogginIn: false,
    error: null,
    invalidUserOrPassword: false
  };

  const component =
    <Grommet>
      <LoginForm logIn={logIn} loginStatus={loginStatus} />
    </Grommet>;

  const tree = renderer.create(component);

  expect(tree).toMatchSnapshot();
});
