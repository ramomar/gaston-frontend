import React from 'react';
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
        <Box>
          <Spinner />
        </Box>
      </ScreenBody>
    </Screen>
  );
}

export default SimpleLoadingScreen;
