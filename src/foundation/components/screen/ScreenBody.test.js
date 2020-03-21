import React from 'react';
import renderer from 'react-test-renderer';
import ScreenBody from './ScreenBody';

it('renders correctly', () => {
  const component =
    <ScreenBody>
      {<div>¡Hola!</div>}
    </ScreenBody>;

  const tree = renderer.create(component);

  expect(tree).toMatchSnapshot();
});
