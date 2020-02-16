import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Grommet, Box } from 'grommet';
import { grommet } from 'grommet/themes/grommet'
import { ExpenseListScreenContainer, ExpenseReviewScreenContainer } from './expenses';
import store from './foundation/state/store';
import { Settings } from 'luxon';

Settings.defaultLocale = 'es';
Settings.defaultZoneName = 'America/Mexico_City';

function App() {
  return (
    <Grommet theme={grommet} full>
      <Box fill='vertical' overflow='hidden'>
        <Provider store={store}>
          <Router>
            <Switch>
              <Route path='/expenses/:id/review'>
                <ExpenseReviewScreenContainer />
              </Route>
              <Route path='/expenses'>
                <ExpenseListScreenContainer />
              </Route>
            </Switch>
          </Router>
        </Provider>
      </Box>
    </Grommet>
  );
}

export default App;
