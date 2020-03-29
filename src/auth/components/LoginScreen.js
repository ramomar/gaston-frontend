import React from 'react';
import { Box, Heading, Text } from 'grommet';
import LoginForm from './LoginForm';

function LoginScreen(props) {
  return (
    <Box fill='vertical' justify='center'>
      <Text alignSelf='center'><span role='img' aria-label='gaston logo'>💵</span></Text>
      <Heading level='2' alignSelf='center'>Gaston</Heading>
      <Box pad='large'>
        <LoginForm />
      </Box >
    </Box >
  );
}

export default LoginScreen;
