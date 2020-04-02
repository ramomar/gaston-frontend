import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import { Grommet, Box } from 'grommet';
import { grommet } from 'grommet/themes/grommet';
import PrivateRoute from './foundation/routing/PrivateRoute';
import { LoginScreenContainer } from './auth';
import { ExpenseListScreenContainer, ExpenseReviewScreenContainer } from './expenses';
import store from './foundation/state/store';
import { Settings } from 'luxon';
import Amplify from 'aws-amplify';
import awsconfig from './aws-exports';
Amplify.configure(awsconfig);

Settings.defaultLocale = 'es';
Settings.defaultZoneName = 'America/Mexico_City';

function App(props) {
  return (
    <Grommet theme={grommet} full>
      <Box fill='vertical' overflow='hidden'>
        <Provider store={props.store || store}>
          <Router>
            <Switch>
              <PrivateRoute path='/expenses/:expenseId/review'>
                <ExpenseReviewScreenContainer />
              </PrivateRoute>
              <PrivateRoute path='/expenses'>
                <ExpenseListScreenContainer />
              </PrivateRoute>
              <Route path='/login'>
                <LoginScreenContainer />
              </Route>
              <Route path='/'>
                <Redirect to='/expenses' />
              </Route>
            </Switch>
          </Router>
        </Provider>
      </Box>
    </Grommet>
  );
}

export default App;
