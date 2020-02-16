import React from 'react';
import PropTypes from 'prop-types';
import { Box } from 'grommet';

function Screen(props) {
  return (
    <Box fill='vertical'>
      {props.children}
    </Box>
  );
}

Screen.propTypes = {
  children: PropTypes.node.isRequired
};

export default Screen;
