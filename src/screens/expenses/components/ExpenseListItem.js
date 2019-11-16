import React from 'react';
import { Text, Box } from 'grommet';
import { useHistory } from 'react-router-dom';
import { DateTime } from 'luxon';

function ExpenseListItem({ expense }) {
  const { push } = useHistory();

  const {
    id,
    note,
    amount,
    date
  } = expense;

  const toReviewScreen = () => push(`/expenses/${id}/review`, {
    expense: {
      id,
      note,
      amount,
      date: date.toISO() // Passing it as Luxon object won't work when trying to use it as intended later.
    },
    fromList: true
  });

  return (
    <Box
      height='xxsmall'
      margin={{ bottom: 'large' }}
      pad='large'
      direction='row'
      align='center'
      justify='between'
      onClick={toReviewScreen}>
      <Text>{note}</Text>
      <Box align='end'>
        <Text size='small' weight='bold'>-${amount.toFixed(2)}</Text>
        <Text size='small'>{date.toLocaleString(DateTime.TIME_24_SIMPLE)}</Text>
      </Box>
    </Box>
  );
}

export default ExpenseListItem;
