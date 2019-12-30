import { DateTime } from 'luxon';

export default function makeExpense(rawExpense) {
  return {
    id: rawExpense.id,
    note: rawExpense.note || 'Sin nota',
    amount: Math.abs(parseFloat(rawExpense.amount)),
    date: DateTime.fromISO(rawExpense.date)
  };
}
