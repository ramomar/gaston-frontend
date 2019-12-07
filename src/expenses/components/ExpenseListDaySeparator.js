import React from 'react';
import PropTypes from 'prop-types';
import { Text, Box } from 'grommet';
import { DateTime } from 'luxon';

function ExpenseListDaySeparator(props) {
  const formattedDay = props.day.toFormat(`d 'de' MMMM`);

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
        <Text color='red' weight='bold' size='small'>-${props.amountForDay.toFixed(2)}</Text>
      </Box>
    </Box>
  );
}

ExpenseListDaySeparator.propTypes = {
  day: PropTypes.instanceOf(DateTime).isRequired,
  amountForDay: PropTypes.number.isRequired
};

export default ExpenseListDaySeparator;
