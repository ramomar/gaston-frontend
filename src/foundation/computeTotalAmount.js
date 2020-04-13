import * as R from 'ramda';

export default function computeTotalAmount(records) {
  return R.reduce((acc, next) => acc + next.amount, 0, records);
}
