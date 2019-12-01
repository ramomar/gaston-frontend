import React from 'react';
import { connect } from 'react-redux';
import { fetchExpenses } from '../../foundation/state/actions';
import { expensesByDay } from '../../foundation/state/reducers';
import { Text } from 'grommet';
import { Screen, ScreenHeader, ScreenBody } from '../../foundation/components/screen';
import ExpenseList from '../components/ExpenseList';

function ExpenseListScreen(props) {
  const moreExpenses = () =>
    props.dispatchFetchExpenses(props.paginationEnd, props.paginationEnd + 10);

  return (
    <Screen>
      <ScreenHeader
        center={<Text weight='bold' size='large'>Revisión de gastos</Text>}
      />
      <ScreenBody>
        <ExpenseList
          expenseGroups={props.expenseGroups}
          isFetching={props.isFetching}
          hasMore={props.hasMore}
          error={props.error}
          moreExpenses={moreExpenses}
        />
      </ScreenBody>
    </Screen>
  );
}

function mapStateToProps(state) {
  const {
    expenseListScreen: {
      expenses,
      isFetching,
      hasMore,
      hasError,
      error,
      paginationEnd
    }
  } = state;

  return {
    expenseGroups: expensesByDay(expenses),
    isFetching,
    hasMore,
    hasError,
    error,
    paginationEnd
  };
}

function mapDispatchToProps(dispatch) {
  return {
    dispatchFetchExpenses: (paginationStart, paginationEnd) =>
      dispatch(fetchExpenses({ paginationStart, paginationEnd }))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ExpenseListScreen);
