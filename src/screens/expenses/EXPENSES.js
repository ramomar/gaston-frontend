import { DateTime } from 'luxon';

const EXPENSES = '[{"day":"2019-05-28","expenses":[{"id":7,"note":"Ride to home","account":"2054","amount":"50.6400","date":"2019-05-28T23:24:35.829000","category":"uber"}]},{"day":"2019-05-27","expenses":[{"id":6,"note":"Pizza","account":"2054","amount":"10.2000","date":"2019-05-27T20:26:35.829000","category":"comida","done":false},{"id":5,"note":"Ride to work","account":"2054","amount":"76.6400","date":"2019-05-25T20:29:35.829000","category":"uber"}]},{"day":"2019-05-24","expenses":[{"id":3,"note":"Enchiladas","account":"2054","amount":"20.2000","date":"2019-05-24T20:29:35.829000","category":"comida"}]},{"day":"2019-05-23","expenses":[{"id":2,"note":"Enchiladas","account":"2054","amount":"20.2000","date":"2019-05-23T20:29:35.829000","category":"comida"},{"id":1,"note":"Enchiladas","account":"2054","amount":"20.2000","date":"2019-05-23T20:29:35.829000","category":"comida"}]}]';

function getExpenseGroups(expensesJson) {
  const expenses = JSON.parse(expensesJson);

  function makeExpense(rawExpense) {
    return {
      id: rawExpense.id,
      note: rawExpense.note,
      amount: parseFloat(rawExpense.amount), // TODO: review this
      date: DateTime.fromISO(rawExpense.date)
    };
  }

  function makeExpenseGroup(rawExpenseGroup) {
    return {
      day: DateTime.fromISO(rawExpenseGroup.day),
      expenses: rawExpenseGroup.expenses.map(makeExpense)
    };
  };

  return expenses.map(makeExpenseGroup);
}

const expenses2 = [].concat(
  getExpenseGroups(EXPENSES),
  getExpenseGroups(EXPENSES),
  getExpenseGroups(EXPENSES),
  getExpenseGroups(EXPENSES),
  getExpenseGroups(EXPENSES),
  getExpenseGroups(EXPENSES),
  getExpenseGroups(EXPENSES),
  getExpenseGroups(EXPENSES),
  getExpenseGroups(EXPENSES),
  getExpenseGroups(EXPENSES),
  getExpenseGroups(EXPENSES),
  getExpenseGroups(EXPENSES),
  getExpenseGroups(EXPENSES),
  getExpenseGroups(EXPENSES),
  getExpenseGroups(EXPENSES),
  getExpenseGroups(EXPENSES),
  getExpenseGroups(EXPENSES),
  getExpenseGroups(EXPENSES)
);

export default function expenses(paginationStart, paginationEnd) {
  return Promise.resolve(expenses2.slice(paginationStart, paginationEnd));
}
