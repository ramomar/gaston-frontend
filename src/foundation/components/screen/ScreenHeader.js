import React from 'react';
import PropTypes from 'prop-types';
import { Box } from 'grommet';

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

ScreenHeader.propTypes = {
  start: PropTypes.element,
  center: PropTypes.element,
  end: PropTypes.element
};

export default ScreenHeader;
