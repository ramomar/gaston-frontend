import React from 'react';
import PropTypes from 'prop-types';
import Shapes from '../shapes'
import { Text } from 'grommet';
import { Screen, ScreenHeader, ScreenBody } from '../../foundation/components/screen';
import ExpenseList from './ExpenseList';

function ExpenseListScreen(props) {
  return (
    <Screen>
      <ScreenHeader
        center={<Text weight='bold' size='large'>Revisión de gastos</Text>} />
      <ScreenBody>
        <ExpenseList
          expenseGroups={props.expenseGroups}
          isFetching={props.isFetching}
          hasMore={props.hasMore}
          error={props.error}
          moreExpenses={props.moreExpenses}
          toExpenseReviewScreen={props.toExpenseReviewScreen} />
      </ScreenBody>
    </Screen>
  );
}

ExpenseListScreen.propTypes = {
  expenseGroups: PropTypes.arrayOf(Shapes.expenseGroup).isRequired,
  isFetching: PropTypes.bool.isRequired,
  hasMore: PropTypes.bool.isRequired,
  error: PropTypes.string,
  moreExpenses: PropTypes.func.isRequired,
  toExpenseReviewScreen: PropTypes.func.isRequired
};

export default ExpenseListScreen;
