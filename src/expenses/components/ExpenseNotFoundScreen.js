import React from 'react';
import PropTypes from 'prop-types';
import { LinkPrevious } from 'grommet-icons';
import { Box, Text, Button } from 'grommet';
import { Screen, ScreenHeader, ScreenBody } from '../../foundation/components/screen';

function ExpenseNotFoundScreen(props) {
  return (
    <Screen>
      <ScreenHeader
        start={<Button plain icon={<LinkPrevious />} onClick={props.goToExpenses} />}
        center={<Text weight='bold' size='large'>Gasto no encontrado</Text>} />
      <ScreenBody>
        <Box fill='vertical' justify='center'>
          <Text textAlign='center'>¡Ese gasto no se encontró!</Text>
        </Box>
      </ScreenBody>
    </Screen>
  );
}

ExpenseNotFoundScreen.propTypes = {
  goToExpenses: PropTypes.func.isRequired
};

export default ExpenseNotFoundScreen;
