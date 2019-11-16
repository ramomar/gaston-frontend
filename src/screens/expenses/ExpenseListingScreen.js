import React from 'react';
import ReviewSummary from './components/ReviewSummary';
import ExpenseList from './components/ExpenseList';

function ExpenseListingScreen(props) {
  return (
    <>
      <ReviewSummary />
      <ExpenseList />
    </>
  );
}

export default ExpenseListingScreen;
