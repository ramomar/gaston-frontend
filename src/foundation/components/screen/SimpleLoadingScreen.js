import React from 'react';
import PropTypes from 'prop-types';
import { Box } from 'grommet';
import { Screen, ScreenHeader, ScreenBody } from '.';
import Spinner from '../grommet/Spinner';

function SimpleLoadingScreen(props) {
  return (
    <Screen>
      <ScreenHeader
        start={props.start}
        center={props.center} />
      <ScreenBody>
        <Box fill='vertical' justify='center'>
          <Spinner />
        </Box>
      </ScreenBody>
    </Screen>
  );
}

ScreenHeader.propTypes = {
  start: PropTypes.element,
  center: PropTypes.element
};

export default SimpleLoadingScreen;
