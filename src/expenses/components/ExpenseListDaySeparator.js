import React from 'react';
import { Text, Box } from 'grommet';

function ExpenseListDaySeparator({ day, amountForDay }) {
  const formattedDay = day.toFormat(`d 'de' MMMM`);

  return (
    <Box
      height='xxsmall'
      margin={{ bottom: 'medium' }}
      pad={{ vertical: 'large' }}
      direction='row'
      align='center'
      justify='between'
      background='white'
      style={{ position: 'sticky', top: 0 }}>
      <Text weight='bold'>{formattedDay}</Text>
      <Box align='end'>
        <Text color='red' weight='bold' size='small'>-${amountForDay.toFixed(2)}</Text>
      </Box>
    </Box>
  );
}

export default ExpenseListDaySeparator;