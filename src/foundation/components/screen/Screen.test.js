import React from 'react';
import renderer from 'react-test-renderer';
import Screen from './Screen';

it('renders correctly', () => {

  const component =
    <Screen>
      {<div>¡Hola!</div>}
    </Screen>;

  const tree = renderer.create(component)

  expect(tree).toMatchSnapshot();
});
