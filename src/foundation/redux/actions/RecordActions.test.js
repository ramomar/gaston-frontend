import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';
import * as RecordActions from './RecordActions';
import { AuthClient } from '../../auth';

jest.mock('../../auth');

process.env.REACT_APP_API_KEY = 'API_KEY';

const mockStore = configureMockStore([thunk]);

describe('fetchRecords', () => {
  const token = 'token';

  AuthClient.getAuthData.mockReturnValue({ token });

  afterEach(() => {
    fetchMock.reset();
  });

  it('should use the correct headers', () => {
    const status = 'unreviewed';

    const nextPage = null;

    fetchMock.getOnce(`end:/records/${status}`, 200);

    const store = mockStore({});

    const expected = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'X-Api-Key': 'API_KEY'
      }
    };

    return store.dispatch(RecordActions.fetchRecords({ status, nextPage }))
      .then(() => {
        const [_, options] = fetchMock.lastCall();
        expect(options).toMatchObject(expected);
      });
  });

  it('should use the correct query params when page param is present', () => {
    const status = 'unreviewed';

    const nextPage = 'eyJyZWNvcmRfaWQiOiAiNWYwMThiM2QtZTUwZS00NGM5LWE1NDAtMTcxN2UwMGYwOWJhIiwgIm93bmVyX2lkIjogInJhbW9tYXIifQ==';

    fetchMock.getOnce(`end:/records/${status}?page=eyJyZWNvcmRfaWQiOiAiNWYwMThiM2QtZTUwZS00NGM5LWE1NDAtMTcxN2UwMGYwOWJhIiwgIm93bmVyX2lkIjogInJhbW9tYXIifQ%3D%3D`, 200);

    const store = mockStore({});

    const expected = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'X-Api-Key': 'API_KEY'
      }
    };

    return store.dispatch(RecordActions.fetchRecords({ status, nextPage }))
      .then(() => {
        const [_, options] = fetchMock.lastCall();
        expect(options).toMatchObject(expected);
      });
  });

  it('should dispatch the correct sequence of actions when the request is successful', () => {
    const records = [
      {
        record_id: '0007182d-54cb-42b7-88fc-bbaba51db198',
        amount: 150,
        date: '2021-02-17T12:38:51.700Z',
        note: 'Cena',
        raw: '{"source": "CHARGE_EMAIL", "type": "EXPENSE", "amount": "150.00", "operation_date": "17/Feb/2021 12:38:51 HORAS", "application_date": "17/Feb/2021", "receiver": null, "channel": {"type": "TPV(COMPRA COMERCIO)"}}'
      }
    ];

    const status = 'unreviewed';

    const nextPage = null;

    fetchMock.getOnce(`end:/records/${status}`, {
      headers: { 'Content-Type': 'application/json' },
      body: {
        records,
        nextPage
      }
    });

    const expectedRecords = [
      {
        id: '0007182d-54cb-42b7-88fc-bbaba51db198',
        amount: 150,
        date: '2021-02-17T12:38:51.700Z',
        note: 'Cena',
        raw: '{"source": "CHARGE_EMAIL", "type": "EXPENSE", "amount": "150.00", "operation_date": "17/Feb/2021 12:38:51 HORAS", "application_date": "17/Feb/2021", "receiver": null, "channel": {"type": "TPV(COMPRA COMERCIO)"}}'
      }
    ];

    const store = mockStore({});

    const expected = [
      { type: RecordActions.FETCH_RECORDS_REQUEST, payload: { status, nextPage } },
      { type: RecordActions.FETCH_RECORDS_SUCCESS, payload: { records: expectedRecords, status, nextPage } }
    ];

    return store.dispatch(RecordActions.fetchRecords({ status, nextPage }))
      .then(() => {
        expect(store.getActions()).toStrictEqual(expected);
      });
  });

  it('should dispatch the correct sequence of actions when the request is unsuccessful because of invalid json', () => {
    const status = 'unreviewed';

    const nextPage = null;

    const body = 'Not a json response';

    fetchMock.getOnce(`end:/records/${status}`, {
      body
    });

    const error = new Error(`invalid json response body at http://localhost:5000/records/${status} reason: Unexpected token N in JSON at position 0`);

    const expected = [
      { type: RecordActions.FETCH_RECORDS_REQUEST, payload: { status, nextPage } },
      { type: RecordActions.FETCH_RECORDS_FAILURE, payload: { error } }
    ];

    const store = mockStore({});

    return store.dispatch(RecordActions.fetchRecords({ status, nextPage })).then(() => {
      expect(store.getActions()).toEqual(expected);
    });
  });

  it('should dispatch the correct sequence of actions when the request is unsuccessful because of some HTTP error', () => {
    const status = 'unreviewed';

    const nextPage = null;

    fetchMock.getOnce(`end:/records/${status}`, {
      status: 403
    });

    const error = new Error('Forbidden');

    const expected = [
      { type: RecordActions.FETCH_RECORDS_REQUEST, payload: { status, nextPage } },
      { type: RecordActions.FETCH_RECORDS_FAILURE, payload: { error } }
    ];

    const store = mockStore({});

    return store.dispatch(RecordActions.fetchRecords({ status, nextPage })).then(() => {
      expect(store.getActions()).toEqual(expected);
    });
  });

  it('should dispatch the correct sequence of actions when the request is unsuccessful because any other error', () => {
    const status = 'unreviewed';

    const nextPage = null;

    const error = new Error('Some error');

    fetchMock.getOnce(`end:/records/${status}`, {
      throws: error
    });

    const expected = [
      { type: RecordActions.FETCH_RECORDS_REQUEST, payload: { status, nextPage } },
      { type: RecordActions.FETCH_RECORDS_FAILURE, payload: { error } }
    ];

    const store = mockStore({});

    return store.dispatch(RecordActions.fetchRecords({ status, nextPage })).then(() => {
      expect(store.getActions()).toEqual(expected);
    });
  });
});

describe('fetchRecord', () => {
  const token = 'token';

  AuthClient.getAuthData.mockReturnValue({ token });

  afterEach(() => {
    fetchMock.reset();
  });

  it('should use the correct headers', () => {
    const recordId = '0007182d-54cb-42b7-88fc-bbaba51db198';

    const record =       {
      record_id: recordId,
      amount: 150,
      date: '2021-02-17T12:38:51.700Z',
      note: 'Cena',
      raw: '{"source": "CHARGE_EMAIL", "type": "EXPENSE", "amount": "150.00", "operation_date": "17/Feb/2021 12:38:51 HORAS", "application_date": "17/Feb/2021", "receiver": null, "channel": {"type": "TPV(COMPRA COMERCIO)"}}'
    };

    fetchMock.getOnce(`end:/records/${recordId}`, {
      headers: { 'Content-Type': 'application/json' },
      body: {
        record
      }
    });

    const store = mockStore({});

    const expected = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'X-Api-Key': 'API_KEY'
      }
    };

    return store.dispatch(RecordActions.fetchRecord({ id: recordId }))
      .then(() => {
        const [_, options] = fetchMock.lastCall();
        expect(options).toMatchObject(expected);
      });
  });

  it('should dispatch the correct sequence of actions when the request is successful', () => {
    const recordId = '0007182d-54cb-42b7-88fc-bbaba51db198';

    const record =       {
      record_id: recordId,
      amount: 150,
      date: '2021-02-17T12:38:51.700Z',
      note: 'Cena',
      raw: '{"source": "CHARGE_EMAIL", "type": "EXPENSE", "amount": "150.00", "operation_date": "17/Feb/2021 12:38:51 HORAS", "application_date": "17/Feb/2021", "receiver": null, "channel": {"type": "TPV(COMPRA COMERCIO)"}}'
    };

    fetchMock.getOnce(`end:/records/${recordId}`, {
      headers: { 'Content-Type': 'application/json' },
      body: {
        record
      }
    });

    const expectedRecord = {
        id: '0007182d-54cb-42b7-88fc-bbaba51db198',
        amount: 150,
        date: '2021-02-17T12:38:51.700Z',
        note: 'Cena',
        raw: '{"source": "CHARGE_EMAIL", "type": "EXPENSE", "amount": "150.00", "operation_date": "17/Feb/2021 12:38:51 HORAS", "application_date": "17/Feb/2021", "receiver": null, "channel": {"type": "TPV(COMPRA COMERCIO)"}}'
    };

    const store = mockStore({});

    const expected = [
      { type: RecordActions.FETCH_RECORD_REQUEST, payload: { id: recordId } },
      { type: RecordActions.FETCH_RECORD_SUCCESS, payload: { record: expectedRecord } }
    ];

    return store.dispatch(RecordActions.fetchRecord({ id: recordId }))
      .then(() => {
        expect(store.getActions()).toStrictEqual(expected);
      });
  });

  it('should dispatch the correct sequence of actions when the request is unsuccessful because of invalid json', () => {
    const recordId = '0007182d-54cb-42b7-88fc-bbaba51db198';

    const body = 'Not a json response';

    fetchMock.getOnce(`end:/records/${recordId}`, {
      body
    });

    const error = new Error(`invalid json response body at http://localhost:5000/records/${recordId} reason: Unexpected token N in JSON at position 0`);

    const expected = [
      { type: RecordActions.FETCH_RECORD_REQUEST, payload: { id: recordId } },
      { type: RecordActions.FETCH_RECORD_FAILURE, payload: { error } }
    ];

    const store = mockStore({});

    return store.dispatch(RecordActions.fetchRecord({ id: recordId })).then(() => {
      expect(store.getActions()).toEqual(expected);
    });
  });

  it('should dispatch the correct sequence of actions when the request is unsuccessful because of some HTTP error', () => {
    const recordId = '0007182d-54cb-42b7-88fc-bbaba51db198';

    fetchMock.getOnce(`end:/records/${recordId}`, {
      status: 403
    });

    const error = new Error('Forbidden');

    const expected = [
      { type: RecordActions.FETCH_RECORD_REQUEST, payload: { id: recordId } },
      { type: RecordActions.FETCH_RECORD_FAILURE, payload: { error } }
    ];

    const store = mockStore({});

    return store.dispatch(RecordActions.fetchRecord({ id: recordId })).then(() => {
      expect(store.getActions()).toEqual(expected);
    });
  });

  it('should dispatch the correct sequence of actions when the request is unsuccessful because any other error', () => {
    const recordId = '0007182d-54cb-42b7-88fc-bbaba51db198';

    const error = new Error('Some error');

    fetchMock.getOnce(`end:/records/${recordId}`, {
      throws: error
    });

    const expected = [
      { type: RecordActions.FETCH_RECORD_REQUEST, payload: { id: recordId } },
      { type: RecordActions.FETCH_RECORD_FAILURE, payload: { error } }
    ];

    const store = mockStore({});

    return store.dispatch(RecordActions.fetchRecord({ id: recordId })).then(() => {
      expect(store.getActions()).toEqual(expected);
    });
  });
});

describe('reviewRecordRequest', () => {
  const token = 'token';

  AuthClient.getAuthData.mockReturnValue({ token });

  afterEach(() => {
    fetchMock.reset();
  });

  it('should use the correct headers', () => {
    const record = {
      id: '0007182d-54cb-42b7-88fc-bbaba51db198',
      amount: 150,
      date: '2017-03-19T05:29:02.700Z',
      note: 'Cena'
    };

    const review = {
      amount: 150,
      date: '2017-03-19T05:29:02.700Z',
      note: 'Cena',
      category: 'Comida'
    };

    const reviewSuccess = {
      id: '574b9903-03eb-46be-96a2-176d6b578da3',
      amount: 150,
      date: '2017-03-19T05:29:02.700Z',
      note: 'Cena',
      category: 'Comida'
    };

    fetchMock.putOnce(`end:/records/${record.id}/review`, {
      headers: { 'Content-Type': 'application/json' },
      body: {
        review: reviewSuccess
      }
    });

    const store = mockStore({});

    const expected = {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        'X-Api-Key': 'API_KEY'
      }
    };

    return store.dispatch(RecordActions.reviewRecord({ record, review }))
      .then(() => {
        const [_, options] = fetchMock.lastCall();
        expect(options).toMatchObject(expected);
      });
  });

  it('should use the correct body', () => {
    const record = {
      id: '0007182d-54cb-42b7-88fc-bbaba51db198',
      amount: 150,
      date: '2017-03-19T05:29:02.700Z',
      note: 'Cena'
    };

    const review = {
      amount: 150,
      date: '2017-03-19T05:29:02.700Z',
      note: 'Cena',
      category: 'Comida'
    };

    const reviewSuccess = {
      id: '574b9903-03eb-46be-96a2-176d6b578da3',
      amount: 150,
      date: '2017-03-19T05:29:02.700Z',
      note: 'Cena',
      category: 'Comida'
    };

    fetchMock.putOnce(`end:/records/${record.id}/review`, {
      headers: { 'Content-Type': 'application/json' },
      body: {
        review: reviewSuccess
      }
    });

    const store = mockStore({});

    const expected = {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        'X-Api-Key': 'API_KEY'
      },
      body: '{"review":{"amount":"150","date":"2017-03-19T05:29:02.700Z","note":"Cena","category":"Comida"}}'
    };

    return store.dispatch(RecordActions.reviewRecord({ record, review }))
      .then(() => {
        const [_, options] = fetchMock.lastCall();
        expect(options).toMatchObject(expected);
      });
  });

  it('should dispatch the correct sequence of actions when the request is successful', () => {
    const record = {
      id: '0007182d-54cb-42b7-88fc-bbaba51db198',
      amount: 150,
      date: '2017-03-19T05:29:02.700Z',
      note: 'Cena'
    };

    const review = {
      amount: 150,
      date: '2017-03-19T05:29:02.700Z',
      note: 'Cena',
      category: 'Comida'
    };

    const reviewSuccess = {
      id: '574b9903-03eb-46be-96a2-176d6b578da3',
      amount: 150,
      date: '2017-03-19T05:29:02.700Z',
      note: 'Cena',
      category: 'Comida'
    };

    fetchMock.putOnce(`end:/records/${record.id}/review`, {
      headers: { 'Content-Type': 'application/json' },
      body: {
        review: reviewSuccess
      }
    });

    const store = mockStore({});

    const expected = [
      { type: RecordActions.REVIEW_RECORD_REQUEST, payload: { record, review } },
      { type: RecordActions.REVIEW_RECORD_SUCCESS, payload: { record, review: reviewSuccess } }
    ];

    return store.dispatch(RecordActions.reviewRecord({ record, review })).then(() => {
      expect(store.getActions()).toStrictEqual(expected);
    });
  });

  it('should dispatch the correct sequence of actions when the request is unsuccessful because of sending invalid json', () => {
    const record = {
      id: '0007182d-54cb-42b7-88fc-bbaba51db198',
      amount: 150,
      date: '2017-03-19T05:29:02.700Z',
      note: 'Cena'
    };

    const review = {
      amount: 150,
      date: '2017-03-19T05:29:02.700Z',
      note: 'Cena',
      category: 'Comida'
    };

    fetchMock.putOnce(`end:/records/${record.id}/review`, {
      body: 'Bad Request',
      status: 400
    });

    const error = new Error('Bad Request');

    const expected = [
      { type: RecordActions.REVIEW_RECORD_REQUEST, payload: { record, review } },
      { type: RecordActions.REVIEW_RECORD_FAILURE, payload: { record, review, error } }
    ];

    const store = mockStore({});

    return store.dispatch(RecordActions.reviewRecord({ record, review })).then(() => {
      expect(store.getActions()).toEqual(expected);
    });
  });

  it('should dispatch the correct sequence of actions when the request is unsuccessful because of receiving invalid json', () => {
    const record = {
      id: '0007182d-54cb-42b7-88fc-bbaba51db198',
      amount: 150,
      date: '2017-03-19T05:29:02.700Z',
      note: 'Cena'
    };

    const review = {
      amount: 150,
      date: '2017-03-19T05:29:02.700Z',
      note: 'Cena',
      category: 'Comida'
    };

    fetchMock.putOnce(`end:/records/${record.id}/review`, {
      body: 'Hello',
      status: 200
    });

    const error = new Error('invalid json response body at http://localhost:5000/records/0007182d-54cb-42b7-88fc-bbaba51db198/review reason: Unexpected token H in JSON at position 0');

    const expected = [
      { type: RecordActions.REVIEW_RECORD_REQUEST, payload: { record, review } },
      { type: RecordActions.REVIEW_RECORD_FAILURE, payload: { record, review, error } }
    ];

    const store = mockStore({});

    return store.dispatch(RecordActions.reviewRecord({ record, review })).then(() => {
      expect(store.getActions()).toEqual(expected);
    });
  });

  it('should dispatch the correct sequence of actions when the request is unsuccessful because of some HTTP error', () => {
    const record = {
      id: '0007182d-54cb-42b7-88fc-bbaba51db198',
      amount: 150,
      date: '2017-03-19T05:29:02.700Z',
      note: 'Cena'
    };

    const review = {
      amount: 150,
      date: '2017-03-19T05:29:02.700Z',
      note: 'Cena',
      category: 'Comida'
    };

    fetchMock.putOnce(`end:/records/${record.id}/review`, {
      body: 'Forbidden',
      status: 403
    });

    const error = new Error('Forbidden');

    const expected = [
      { type: RecordActions.REVIEW_RECORD_REQUEST, payload: { record, review } },
      { type: RecordActions.REVIEW_RECORD_FAILURE, payload: { record, review, error } }
    ];

    const store = mockStore({});

    return store.dispatch(RecordActions.reviewRecord({ record, review })).then(() => {
      expect(store.getActions()).toEqual(expected);
    });
  });

  it('should dispatch the correct sequence of actions when the request is unsuccessful because any other error', () => {
    const record = {
      id: '0007182d-54cb-42b7-88fc-bbaba51db198',
      amount: 150,
      date: '2017-03-19T05:29:02.700Z',
      note: 'Cena'
    };

    const review = {
      amount: 150,
      date: '2017-03-19T05:29:02.700Z',
      note: 'Cena',
      category: 'Comida'
    };

    const error = new Error('Some error');

    fetchMock.putOnce(`end:/records/${record.id}/review`, {
      throws: error
    });

    const expected = [
      { type: RecordActions.REVIEW_RECORD_REQUEST, payload: { record, review } },
      { type: RecordActions.REVIEW_RECORD_FAILURE, payload: { record, review, error } }
    ];

    const store = mockStore({});

    return store.dispatch(RecordActions.reviewRecord({ record, review })).then(() => {
      expect(store.getActions()).toEqual(expected);
    });
  });
});
