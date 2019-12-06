import React from 'react';
import PropTypes from 'prop-types';
import { Box } from 'grommet';

function ScreenBody({ children }) {
  return (
    <Box>
      {children}
    </Box>
  );
}

ScreenBody.propTypes = {
  children: PropTypes.node.isRequired
};

export default ScreenBody;
