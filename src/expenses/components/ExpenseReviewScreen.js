import React from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { Text, Button } from 'grommet';
import { LinkPrevious } from 'grommet-icons';
import { Screen, ScreenHeader, ScreenBody } from '../../foundation/components/screen';
import ExpenseReviewForm from './ExpenseReviewForm';
import { DateTime } from 'luxon';
import * as R from 'ramda';

function ExpenseReviewScreen(props) {
  const { state: { expense } } = useLocation();
  const { goBack } = useHistory();

  const date = DateTime.fromISO(expense.date);
  const expenseWithLuxonDate = R.assoc('date', date, expense);

  const formattedDay = date.toFormat(`d 'de' MMMM`);

  return (
    <Screen>
      <ScreenHeader
        start={<Button plain icon={<LinkPrevious />} onClick={goBack} />}
        center={<Text weight='bold' size='large'>{`Gasto del ${formattedDay}`}</Text>}
      />
      <ScreenBody>
        <ExpenseReviewForm expense={expenseWithLuxonDate} />
      </ScreenBody>
    </Screen>
  );
}

export default ExpenseReviewScreen;
