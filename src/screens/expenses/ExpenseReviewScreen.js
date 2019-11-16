import React from 'react';
import { useLocation } from 'react-router-dom';
import ExpenseReviewForm from './components/ExpenseReviewForm';
import { DateTime } from 'luxon';
import { assoc } from 'ramda';

function ExpenseReviewScreen(props) {
  const { state: { expense } } = useLocation();

  // See ExpenseListItem
  const expenseWithLuxonDate = assoc('date', DateTime.fromISO(expense.date), expense);

  return (
    <ExpenseReviewForm expense={expenseWithLuxonDate} />
  );
}

export default ExpenseReviewScreen;
