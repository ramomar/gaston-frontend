import React from 'react';
import PropTypes from 'prop-types';
import { Text, Button } from 'grommet';
import { LinkPrevious } from 'grommet-icons';
import { Screen, ScreenHeader, ScreenBody } from '../../foundation/components/screen';
import ExpenseReviewForm from './ExpenseReviewForm';
import { DateTime } from 'luxon';
import * as R from 'ramda';

function ExpenseReviewScreen(props) {
  const date = DateTime.fromISO(props.expense.date);

  const expenseWithLuxonDate = R.assoc('date', date, props.expense);

  const formattedDay = date.toFormat(`d 'de' MMMM`);

  return (
    <Screen>
      <ScreenHeader
        start={<Button plain icon={<LinkPrevious />} onClick={props.goBack} />}
        center={<Text weight='bold' size='large'>{`Gasto del ${formattedDay}`}</Text>}
      />
      <ScreenBody>
        <ExpenseReviewForm
          expense={expenseWithLuxonDate}
          reviewExpense={props.reviewExpense}
        />
      </ScreenBody>
    </Screen>
  );
}

ExpenseReviewScreen.propTypes = {
  expense: PropTypes.shape({
    id: PropTypes.string.isRequired,
    note: PropTypes.string.isRequired,
    amount: PropTypes.number.isRequired,
    date: PropTypes.string.isRequired
  }),
  goBack: PropTypes.func.isRequired,
  reviewExpense: PropTypes.func.isRequired
};

export default ExpenseReviewScreen;
