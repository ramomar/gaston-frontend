import * as R from 'ramda';

export default function recordsByDay(records) {
  const compareDates = (d1, d2) => d2.toMillis() - d1.toMillis();

  const groupByDay = R.pipe(
    R.groupBy(record => record.date.toLocaleString()),
    R.toPairs,
    R.map(([_, records]) => ({
      day: records[0].date.startOf('day'),
      records: R.sort((e1, e2) => compareDates(e1.date, e2.date), records)
    })),
    R.sort((eg1, eg2) => compareDates(eg1.day, eg2.day))
  );

  return groupByDay(records);
}
