import React from 'react';
import { useSelector } from 'react-redux';
import {
  Route,
  Redirect
} from 'react-router-dom';

function PrivateRoute({ auth, children, ...rest }) {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

  return (
    <Route
      {...rest}
      render={({ location }) =>
        isAuthenticated ? (
          children
        ) : (
            <Redirect
              to={{
                pathname: '/login',
                state: { from: location }
              }}
            />
          )
      }
    />
  );
}

export default PrivateRoute;
