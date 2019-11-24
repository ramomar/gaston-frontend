import React from 'react';
import { Text } from 'grommet';
import { Screen, ScreenHeader, ScreenBody } from '../../foundation/components/screens';
import ExpenseList from './ExpenseList';

function ExpenseListingScreen({ expensesByDay, fetchExpenses }) {
  return (
    <Screen>
      <ScreenHeader
        center={<Text weight='bold' size='large'>Revisión de gastos</Text>}
      />
      <ScreenBody>
        <ExpenseList expenseGroups={expensesByDay} fetchExpenses={fetchExpenses} />
      </ScreenBody>
    </Screen>
  );
}

export default ExpenseListingScreen;
