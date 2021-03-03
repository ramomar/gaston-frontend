import React from 'react';
import Shapes from '../shapes';
import { Text, Box } from 'grommet';
import * as R from 'ramda';

function RecordInfoItem(props) {
  const { fieldName, fieldValue } = props;

  return (
    <Box direction='column' margin={{ bottom: 'large'}} style={{ fontFamily: 'Courier New, monospace' }}>
      <Box margin={{ bottom: 'small' }}>
          <Text weight='bold'>{fieldName}</Text>
      </Box>
      <Box>
          <Text>{fieldValue}</Text>
      </Box>
    </Box>
  );
}

function RecordInfo(props) {
  const { record } = props;
  const items = R.toPairs(JSON.parse(record.raw));

  return (
    <Box direction='column' fill='horizontal' flex='grow' pad='small'>
      <Box margin={{ vertical: 'xlarge' }}>
        <Text weight='bold' size='large' alignSelf='center'>
          Detalles
        </Text>
      </Box>
      {items.map(([key, value]) => <RecordInfoItem key={key} fieldName={key} fieldValue={JSON.stringify(value)} />)}
    </Box>
  );
}

RecordInfo.propTypes = {
  record: Shapes.record.isRequired
};

export default RecordInfo;
