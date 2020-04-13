import React from 'react';
import PropTypes from 'prop-types';
import { LinkPrevious } from 'grommet-icons';
import { Box, Text, Button } from 'grommet';
import { Screen, ScreenHeader, ScreenBody } from '../../foundation/components/screen';

function RecordNotFoundScreen(props) {
  return (
    <Screen>
      <ScreenHeader
        start={<Button plain icon={<LinkPrevious />} onClick={props.goToRecords} />}
        center={<Text weight='bold' size='large'>Gasto no encontrado</Text>} />
      <ScreenBody>
        <Box fill='vertical' justify='center'>
          <Text textAlign='center'>¡Ese gasto no se encontró!</Text>
        </Box>
      </ScreenBody>
    </Screen>
  );
}

RecordNotFoundScreen.propTypes = {
  goToRecords: PropTypes.func.isRequired
};

export default RecordNotFoundScreen;
