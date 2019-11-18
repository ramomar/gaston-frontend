import React from 'react';
import { Text } from 'grommet';
import { Screen, ScreenHeader, ScreenBody } from '../components';
import ExpenseList from './components/ExpenseList';

function ExpenseListingScreen(props) {
  return (
    <Screen>
      <ScreenHeader
        center={<Text weight='bold' size='large'>Revisión de gastos</Text>}
      />
      <ScreenBody>
        <ExpenseList />
      </ScreenBody>
    </Screen>
  );
}

export default ExpenseListingScreen;
