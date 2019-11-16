import React from 'react';
import { Text, Box } from 'grommet';

function ExpenseListDaySeparator({ day, amountForDay }) {
  const formattedDay = day.toFormat(`d 'de' MMMM`);

  return (
    <Box
      height='xxsmall'
      margin={{ bottom: 'large' }}
      pad='medium'
      direction='row'
      align='center'
      justify='between'>
      <Text weight='bold'>{formattedDay}</Text>
      <Text color='red' weight='bold' size='small'>-${amountForDay.toFixed(2)}</Text>
    </Box>
  );
}

export default ExpenseListDaySeparator;
