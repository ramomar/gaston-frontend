import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Grommet, Box } from 'grommet';
import { grommet } from 'grommet/themes/grommet';
import { PrivateRoute, LoginScreenContainer } from './auth';
import { ExpenseListScreenContainer, ExpenseReviewScreenContainer } from './expenses';
import store from './foundation/state/store';
import { Settings } from 'luxon';

import Amplify from 'aws-amplify';
import awsconfig from './aws-exports';
Amplify.configure(awsconfig);

Settings.defaultLocale = 'es';
Settings.defaultZoneName = 'America/Mexico_City';

function App() {
  return (
    <Grommet theme={grommet} full>
      <Box fill='vertical' overflow='hidden'>
        <Provider store={store}>
          <Router>
            <Switch>
              <Route path='/login'>
                <LoginScreenContainer />
              </Route>
            </Switch>
            <Switch>
              <PrivateRoute path='/expenses/:expenseId/review'>
                <ExpenseReviewScreenContainer />
              </PrivateRoute>
              <PrivateRoute path='/expenses'>
                <ExpenseListScreenContainer />
              </PrivateRoute>
            </Switch>
          </Router>
        </Provider>
      </Box>
    </Grommet>
  );
}

export default App;
