import { DateTime } from 'luxon';

export default function makeRecord(rawRecord) {
  return {
    id: rawRecord.id,
    note: rawRecord.note || 'Sin nota',
    amount: Math.abs(parseFloat(rawRecord.amount)),
    date: DateTime.fromISO(rawRecord.date)
  };
}
