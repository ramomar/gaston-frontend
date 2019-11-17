import React from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { Text, Button } from 'grommet';
import { LinkPrevious } from 'grommet-icons';
import { Screen, ScreenHeader } from '../components';
import ExpenseReviewForm from './components/ExpenseReviewForm';
import { DateTime } from 'luxon';
import { assoc } from 'ramda';

function ExpenseReviewScreen(props) {
  const { state: { expense } } = useLocation();
  const { goBack } = useHistory();

  // See ExpenseListItem
  const date = DateTime.fromISO(expense.date);
  const expenseWithLuxonDate = assoc('date', date, expense);

  const formattedDay = date.toFormat(`d 'de' MMMM`);

  return (
    <Screen>
      <ScreenHeader
        start={<Button plain icon={<LinkPrevious />} onClick={goBack} />}
        center={<Text weight='bold' size='large'>{`Gasto el ${formattedDay}`}</Text>}
      />
      <ExpenseReviewForm expense={expenseWithLuxonDate} />
    </Screen>
  );
}

export default ExpenseReviewScreen;
