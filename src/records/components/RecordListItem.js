import React from 'react';
import PropTypes from 'prop-types';
import Shapes from '../shapes';
import { Text, Box } from 'grommet';
import { DateTime } from 'luxon';

function RecordListItem(props) {
  const {
    note,
    amount,
    date
  } = props.record;

  return (
    <Box
      height='xxsmall'
      margin={{ bottom: 'medium' }}
      pad={{ vertical: 'large' }}
      direction='row'
      align='center'
      justify='between'
      onClick={() => props.toRecordReviewScreen()}>
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

RecordListItem.propTypes = {
  record: Shapes.record.isRequired,
  toRecordReviewScreen: PropTypes.func.isRequired
};

export default RecordListItem;
