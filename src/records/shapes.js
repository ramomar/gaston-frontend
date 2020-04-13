import PropTypes from 'prop-types';
import { DateTime } from 'luxon';

const record = PropTypes.shape({
  id: PropTypes.string.isRequired,
  note: PropTypes.string.isRequired,
  amount: PropTypes.number.isRequired,
  date: PropTypes.instanceOf(DateTime).isRequired
});

const recordGroup = PropTypes.shape({
  day: PropTypes.instanceOf(DateTime).isRequired,
  records: PropTypes.arrayOf(record).isRequired
});

const recordCategory = PropTypes.shape({
  name: PropTypes.string.isRequired
});

const recordReview = PropTypes.shape({
  note: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  date: PropTypes.instanceOf(DateTime).isRequired,
  amount: PropTypes.number.isRequired
});

const recordReviewStatus = PropTypes.shape({
  isReviewing: PropTypes.bool.isRequired,
  error: PropTypes.string,
  review: recordReview.isRequired,
  isReviewed: PropTypes.bool.isRequired
});

export default {
  record,
  recordGroup,
  recordCategory,
  recordReviewStatus
};
