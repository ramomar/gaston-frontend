import React from 'react';
import { Box, Text } from 'grommet';

function ScreenHeader({ start, center, end }) {
  return (
    <Box
      direction='row'
      height='xsmall'
      align='center'
      justify='between'
      pad={{ horizontal: 'medium' }}>
      <Box>
        {start}
      </Box>
      <Box>
        {center}
      </Box>
      <Box>
      </Box>
    </Box >
  );
}

export default ScreenHeader;
