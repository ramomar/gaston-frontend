import React from 'react';
import PropTypes from 'prop-types';
import { Box } from 'grommet';

function ScreenBody(props) {
  return (
    <Box>
      {props.children}
    </Box>
  );
}

ScreenBody.propTypes = {
  children: PropTypes.node.isRequired
};

export default ScreenBody;
