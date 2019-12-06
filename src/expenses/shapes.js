import PropTypes from 'prop-types';
import { DateTime } from 'luxon';

const expense = PropTypes.shape({
  id: PropTypes.string.isRequired,
  note: PropTypes.string.isRequired,
  amount: PropTypes.number.isRequired,
  date: PropTypes.instanceOf(DateTime).isRequired
});

const expenseGroup = PropTypes.shape({
  day: PropTypes.instanceOf(DateTime).isRequired,
  expenses: PropTypes.arrayOf(expense).isRequired
});

export default {
  expense,
  expenseGroup
};