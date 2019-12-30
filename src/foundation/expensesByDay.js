import * as R from 'ramda';

export default function expensesByDay(expenses) {
  const compareDates = (d1, d2) => d2.toMillis() - d1.toMillis();

  const groupByDay = R.pipe(
    R.groupBy(expense => expense.date.toLocaleString()),
    R.toPairs,
    R.map(([_, expenses]) => ({
      day: expenses[0].date.startOf('day'),
      expenses: R.sort((e1, e2) => compareDates(e1.date, e2.date), expenses)
    })),
    R.sort((eg1, eg2) => compareDates(eg1.day, eg2.day))
  );

  return groupByDay(expenses);
}
