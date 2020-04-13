import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import { Grommet, Box } from 'grommet';
import { grommet } from 'grommet/themes/grommet';
import { PrivateRoute } from './foundation/routing';
import { LoginScreenContainer } from './auth';
import { RecordListScreenContainer, RecordReviewScreenContainer } from './records';
import store from './foundation/redux/store';
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
              <PrivateRoute path='/records/:recordId/review'>
                <RecordReviewScreenContainer />
              </PrivateRoute>
              <PrivateRoute path='/records'>
                <RecordListScreenContainer />
              </PrivateRoute>
              <Route path='/login'>
                <LoginScreenContainer />
              </Route>
              <Route path='/'>
                <Redirect to='/records' />
              </Route>
            </Switch>
          </Router>
        </Provider>
      </Box>
    </Grommet>
  );
}

export default App;
