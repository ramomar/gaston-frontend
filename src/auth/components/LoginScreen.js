import React from 'react';
import PropTypes from 'prop-types';
import Shapes from '../shapes';
import { Box, Heading, Text } from 'grommet';
import { Screen, ScreenBody } from '../../foundation/components/screen';
import LoginForm from './LoginForm';

function LoginScreen(props) {
  return (
    <Screen>
      <ScreenBody>
        <Box fill='vertical' justify='center'>
          <Text alignSelf='center'><span role='img' aria-label='gaston logo'>💵</span></Text>
          <Heading level='2' alignSelf='center'>Gaston</Heading>
          <Box pad='large'>
            <LoginForm logIn={props.logIn} loginStatus={props.loginStatus} />
          </Box>
        </Box>
      </ScreenBody>
    </Screen>
  );
}

LoginScreen.propTypes = {
  logIn: PropTypes.func.isRequired,
  loginStatus: Shapes.loginStatus
};

export default LoginScreen;
