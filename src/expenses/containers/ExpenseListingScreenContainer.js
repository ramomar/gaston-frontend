import { connect } from 'react-redux';
import ExpenseListingScreen from '../components/ExpenseListingScreen';
import { fetchExpenses } from '../../foundation/state/actions';
import { expensesByDay } from '../../foundation/state/reducers';

function mapStateToProps(state) {
  const { expenseListing: { expenses } } = state;

  return {
    expensesByDay: expensesByDay(expenses)
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchExpenses: (paginationStart, paginationEnd) =>
      dispatch(fetchExpenses(paginationStart, paginationEnd))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ExpenseListingScreen);
