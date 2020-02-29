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

const expenseCategory = PropTypes.shape({
  name: PropTypes.string.isRequired
});

const expenseReview = PropTypes.shape({
  note: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  date: PropTypes.instanceOf(DateTime).isRequired,
  amount: PropTypes.number.isRequired
});

const expenseReviewStatus = PropTypes.shape({
  isReviewing: PropTypes.bool.isRequired,
  error: PropTypes.string,
  review: expenseReview.isRequired,
  reviewed: PropTypes.bool.isRequired
});

export default {
  expense,
  expenseGroup,
  expenseCategory,
  expenseReviewStatus
};
