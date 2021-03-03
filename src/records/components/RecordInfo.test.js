import React from 'react';
import renderer from 'react-test-renderer';
import RecordInfo from './RecordInfo';
import { DateTime } from 'luxon';

it('renders correctly', () => {
    const record = {
        id: '0007182d-54cb-42b7-88fc-bbaba51db198',
        amount: 2000.00,
        date: DateTime.fromISO('2021-01-17T12:38:51.700Z'),
        note: 'RETIRO DE EFECTIVO',
        raw: '{"source": "CASH_WITHDRAWAL_EMAIL", "type": "EXPENSE", "note": "RETIRO DE EFECTIVO", "amount": "2000.00", "operation_date": "17/Feb/2021 12:38:51 HORAS", "application_date": "17/Feb/2021", "receiver": null, "channel": {"type": "Cajero Banorte", "details": {"name": "ROMA SUR 4", "location": "CDMX"}}, "extra_amounts": []}'
    };

    const component = <RecordInfo record={record} />;

    const tree = renderer.create(component).toJSON();

    expect(tree).toMatchSnapshot();
});
