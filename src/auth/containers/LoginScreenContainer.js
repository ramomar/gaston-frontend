import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  useHistory,
  useLocation
} from 'react-router-dom';
import LoginScreen from '../components/LoginScreen';
import * as Actions from '../../foundation/redux/actions';
import { DateTime } from 'luxon';
import { Storage } from '../../foundation/storage';
import { AuthClient } from '../../foundation/auth';

function logIn(dispatch) {
  return (user, password) => {
    const now = DateTime.utc();

    dispatch(Actions.login({ user, password, now, AuthClient, Storage }));
  };
}

function LoginScreenContainer(props) {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

  const loginStatus = useSelector(state => state.auth.login);

  const history = useHistory();

  const location = useLocation();

  useEffect(() => {
    if (isAuthenticated && location.state && location.state.from) {
      history.replace(location.state.from);
    } else if (isAuthenticated) {
      history.replace('/');
    }
  }, [location, history, isAuthenticated]);

  return (
    <LoginScreen logIn={logIn(useDispatch())} loginStatus={loginStatus} />
  );
}

export default LoginScreenContainer;
