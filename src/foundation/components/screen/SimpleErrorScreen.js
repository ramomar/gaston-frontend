import React from 'react';
import PropTypes from 'prop-types';
import { Box, Text, Anchor } from 'grommet';
import { Screen, ScreenHeader, ScreenBody } from '.';

function SimpleErrorScreen(props) {
  return (
    <Screen>
      <ScreenHeader
        start={props.start}
        center={props.center} />
      <ScreenBody>
        <Box fill='vertical' justify='center'>
          <Text textAlign='center'>¡Ocurrio un error!</Text>
          <Anchor
            primary
            alignSelf='center'
            margin={{ top: 'small', bottom: 'medium' }}
            style={{ textDecoration: 'underline' }}
            onClick={() => props.retry()}>
            Reintentar
          </Anchor>
        </Box>
      </ScreenBody>
    </Screen>
  );
}


ScreenHeader.propTypes = {
  start: PropTypes.element,
  center: PropTypes.element,
  retry: PropTypes.func
};

export default SimpleErrorScreen;
