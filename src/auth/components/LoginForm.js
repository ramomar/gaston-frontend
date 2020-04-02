import React from 'react';
import PropTypes from 'prop-types';
import Shapes from '../shapes';
import {
  Form,
  FormField,
  Button,
  Box,
  TextInput,
  Text
} from 'grommet';
import Spinner from '../../foundation/components/grommet/Spinner';

const usernameRegex = /^.+@\w+\.\w+$/; // dumb regex

const passwordRegex = /^.{8,}$/;

function onSubmit(logIn) {
  return ({ value }) => {
    const { user, password } = value;

    logIn(user, password);
  };
}

function LoginForm(props) {
  const buttonLabel = props.loginStatus.error &&
    !props.loginStatus.invalidUserOrPassword ?
    'Reintentar' : 'Continuar';

  return (
    <Form
      messages={{
        invalid: ':(',
        required: 'Requerido'
      }}
      onSubmit={onSubmit(props.logIn)}>
      <FormField
        required
        label='Usuario'
        name='user'
        component={TextInput}
        placeholder='yo@ramomar.dev'
        validate={{ regexp: usernameRegex, message: 'Correo invalido' }} />
      <FormField
        required
        label='Contraseña'
        name='password'
        type='password'
        component={TextInput}
        validate={{ regexp: passwordRegex, message: 'Contraseña invalida' }}
        placeholder='********' />
      <Box margin={{ top: 'large' }}>
        {props.loginStatus.error && !props.loginStatus.invalidUserOrPassword &&
          <Text textAlign='center' color='status-error'>
            ¡Ocurrió un error!
          </Text>}
        {props.loginStatus.invalidUserOrPassword &&
          <Text textAlign='center' color='status-error'>
            Credenciales invalidas.
          </Text>}
      </Box>
      <Box>
        {props.loginStatus.isLogginIn ?
          <Box margin='small' pad='medium'>
            <Spinner />
          </Box> :
          <Button
            label={buttonLabel}
            primary
            type='submit'
            margin='medium'
            alignSelf='center' />
        }
      </Box>
    </Form>
  );
}

LoginForm.propTypes = {
  logIn: PropTypes.func.isRequired,
  loginStatus: Shapes.loginStatus.isRequired
};

export default LoginForm;
