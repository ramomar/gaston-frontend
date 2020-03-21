import React from 'react';
import renderer from 'react-test-renderer';
import { Grommet } from 'grommet';
import ExpenseNotFoundScreen from './ExpenseNotFoundScreen';

it('renders correctly', () => {
  const component =
    <Grommet>
      <ExpenseNotFoundScreen
        goToExpenses={() => null}>
      </ExpenseNotFoundScreen>
    </Grommet>;

  const tree = renderer.create(component);

  expect(tree).toMatchSnapshot();
});
