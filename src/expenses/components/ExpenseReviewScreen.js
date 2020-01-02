import React from 'react';
import PropTypes from 'prop-types';
import Shapes from '../shapes';
import { Text, Button } from 'grommet';
import { LinkPrevious } from 'grommet-icons';
import { Screen, ScreenHeader, ScreenBody } from '../../foundation/components/screen';
import ExpenseReviewForm from './ExpenseReviewForm';

function ExpenseReviewScreen(props) {
  const { expense } = props;

  const formattedDay = expense.date.toFormat(`d 'de' MMMM`);

  return (
    <Screen>
      <ScreenHeader
        start={<Button plain icon={<LinkPrevious />} onClick={props.goToExpenses} />}
        center={<Text weight='bold' size='large'>{`Gasto del ${formattedDay}`}</Text>} />
      <ScreenBody>
        <ExpenseReviewForm
          expense={expense}
          reviewExpense={props.reviewExpense}
          expenseCategories={props.expenseCategories} />
      </ScreenBody>
    </Screen>
  );
}

ExpenseReviewScreen.propTypes = {
  expense: Shapes.expense.isRequired,
  goToExpenses: PropTypes.func.isRequired,
  reviewExpense: PropTypes.func.isRequired,
  expenseCategories: PropTypes.arrayOf(Shapes.expenseCategory).isRequired
};

export default ExpenseReviewScreen;
