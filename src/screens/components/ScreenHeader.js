import React from 'react';
import { Box, Text } from 'grommet';

function ScreenHeader({ start, center, end }) {
  return (
    <Box
      flex={false}
      direction='row'
      align='center'
      justify='between'
      margin={{ vertical: 'large' }}
      pad={{ horizontal: 'medium' }}>
      <Box>
        {start}
      </Box>
      <Box>
        {center}
      </Box>
      <Box>
        {end}
      </Box>
    </Box>
  );
}

export default ScreenHeader;
