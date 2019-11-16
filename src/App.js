import React from 'react';
import { Grommet, Box } from 'grommet';
import { grommet } from 'grommet/themes/grommet'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import { ExpenseListingScreen, ExpenseReviewScreen } from './screens/expenses';
import { Settings } from 'luxon';

Settings.defaultLocale = 'es';
Settings.defaultZoneName = 'America/Mexico_City';

function App() {
  return (
    <Grommet theme={grommet} full>
      <Box fill='vertical' overflow='hidden'>
        <Router>
          <Switch>
            <Route path='/expenses/:id/review'>
              <ExpenseReviewScreen />
            </Route>
            <Route path='/expenses'>
              <ExpenseListingScreen />
            </Route>
          </Switch>
        </Router>
      </Box>
    </Grommet >
  );
}

export default App;
