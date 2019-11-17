import React from 'react';
import { Box, Text } from 'grommet';
import { Screen, ScreenHeader } from '../components';
import ExpenseList from './components/ExpenseList';

function ExpenseListingScreen(props) {
  return (
    <Screen>
      <ScreenHeader
        center={<Text weight='bold' size='large'>Gastos</Text>}
      />
      <ExpenseList />
    </Screen>
  );
}

export default ExpenseListingScreen;
