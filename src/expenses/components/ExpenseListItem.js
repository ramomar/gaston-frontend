import React from 'react';
import { Text, Box } from 'grommet';
import { DateTime } from 'luxon';

function ExpenseListItem({ expense, toExpenseReviewScreen }) {
  const {
    note,
    amount,
    date
  } = expense;

  return (
    <Box
      height='xxsmall'
      margin={{ bottom: 'medium' }}
      pad={{ vertical: 'large' }}
      direction='row'
      align='center'
      justify='between'
      onClick={() => toExpenseReviewScreen()}>
      <Box basis='2/4'>
        <Text truncate>{note}</Text>
      </Box>
      <Box align='end' basis='2/4'>
        <Text size='small' weight='bold'>-${amount.toFixed(2)}</Text>
        <Text size='small'>{date.toLocaleString(DateTime.TIME_24_SIMPLE)}</Text>
      </Box>
    </Box>
  );
}

export default ExpenseListItem;
