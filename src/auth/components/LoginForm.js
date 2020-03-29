import React from 'react';
import {
  Form,
  FormField,
  Button,
  Box,
  TextInput,
  Text
} from 'grommet';
import Spinner from '../../foundation/components/grommet/Spinner';

function logIn() {
  console.log('Loggin in...');
}

function LoginForm(props) {
  const initialValue = {};
  const hasError = false;

  return (
    <Form
      messages={{
        invalid: ':(',
        required: 'Requerido'
      }}
      value={initialValue}
      onSubmit={logIn}>
      <FormField
        required
        label='Usuario'
        name='user'
        component={TextInput}
        placeholder='yo@ramomar.dev' />
      <FormField
        required
        label='Contraseña'
        name='password'
        type='password'
        component={TextInput}
        placeholder='********' />
      <Box margin={{ top: 'large' }}>
        {hasError &&
          <Text textAlign='center' color='status-error'>
            ¡Ocurrió un error!
    </Text>}
      </Box>
      <Box>
        {(props.logInStatus ? props.loginStatus.isLoggingIn : false) ?
          <Box margin='small' pad='medium'>
            <Spinner />
          </Box> :
          <Button
            label={hasError ? 'Reintentar' : 'Continuar'}
            primary
            type='submit'
            margin='medium'
            alignSelf='center' />
        }
      </Box>
    </Form>
  );
}

// TODO: add props validations

export default LoginForm;
