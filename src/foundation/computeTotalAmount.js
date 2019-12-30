import * as R from 'ramda';

export default function computeTotalAmount(expenses) {
  return R.reduce((acc, next) => acc + next.amount, 0, expenses);
}
