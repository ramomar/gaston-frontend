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
    fetchMock.getOnce('end:/records', 200);

    const store = mockStore({});

    const paginationStart = 0;

    const paginationEnd = 10;

    const expected = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'X-Api-Key': 'API_KEY'
      }
    };

    return store.dispatch(RecordActions.fetchRecords({ paginationStart, paginationEnd }))
      .then(() => {
        const [_, options] = fetchMock.lastCall();
        expect(options).toMatchObject(expected);
      });
  });

  it('should dispatch the correct sequence of actions when the request is successful', () => {
    const records = [
      {
        id: '0007182d-54cb-42b7-88fc-bbaba51db198',
        amount: 150,
        date: '2017-03-19T05:29:02.700Z',
        note: 'Cena'
      }
    ];

    const hasMore = true;

    const paginationStart = 0;

    const paginationEnd = 10;

    fetchMock.getOnce('end:/records', {
      headers: { 'Content-Type': 'application/json' },
      body: {
        records,
        hasMore
      }
    });

    const store = mockStore({});

    const expected = [
      { type: RecordActions.FETCH_RECORDS_REQUEST, payload: { paginationStart, paginationEnd } },
      { type: RecordActions.FETCH_RECORDS_SUCCESS, payload: { records, hasMore, paginationStart, paginationEnd } }
    ];

    return store.dispatch(RecordActions.fetchRecords({ paginationStart, paginationEnd }))
      .then(() => {
        expect(store.getActions()).toStrictEqual(expected);
      });
  });

  it('should dispatch the correct sequence of actions when the request is unsuccessful because of invalid json', () => {
    const paginationStart = 0;

    const paginationEnd = 10;

    const body = 'Not a json response';

    fetchMock.getOnce('end:/records', {
      body
    });

    const error = new Error('invalid json response body at http://localhost:5000/records reason: Unexpected token N in JSON at position 0');

    const expected = [
      { type: RecordActions.FETCH_RECORDS_REQUEST, payload: { paginationStart, paginationEnd } },
      { type: RecordActions.FETCH_RECORDS_FAILURE, payload: { error } }
    ];

    const store = mockStore({});

    return store.dispatch(RecordActions.fetchRecords({ paginationStart, paginationEnd })).then(() => {
      expect(store.getActions()).toEqual(expected);
    });
  });

  it('should dispatch the correct sequence of actions when the request is unsuccessful because of some HTTP error', () => {
    const paginationStart = 0;

    const paginationEnd = 10;

    fetchMock.getOnce('end:/records', {
      status: 403
    });

    const error = new Error('Forbidden');

    const expected = [
      { type: RecordActions.FETCH_RECORDS_REQUEST, payload: { paginationStart, paginationEnd } },
      { type: RecordActions.FETCH_RECORDS_FAILURE, payload: { error } }
    ];

    const store = mockStore({});

    return store.dispatch(RecordActions.fetchRecords({ paginationStart, paginationEnd })).then(() => {
      expect(store.getActions()).toEqual(expected);
    });
  });

  it('should dispatch the correct sequence of actions when the request is unsuccessful because any other error', () => {
    const paginationStart = 0;

    const paginationEnd = 10;

    const error = new Error('Some error');

    fetchMock.getOnce('end:/records', {
      throws: error
    });

    const expected = [
      { type: RecordActions.FETCH_RECORDS_REQUEST, payload: { paginationStart, paginationEnd } },
      { type: RecordActions.FETCH_RECORDS_FAILURE, payload: { error } }
    ];

    const store = mockStore({});

    return store.dispatch(RecordActions.fetchRecords({ paginationStart, paginationEnd })).then(() => {
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

    const record = {
      id: recordId,
      amount: 150,
      date: '2017-03-19T05:29:02.700Z',
      note: 'Cena'
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

    const record = {
      id: recordId,
      amount: 150,
      date: '2017-03-19T05:29:02.700Z',
      note: 'Cena'
    };

    fetchMock.getOnce(`end:/records/${recordId}`, {
      headers: { 'Content-Type': 'application/json' },
      body: {
        record
      }
    });

    const store = mockStore({});

    const expected = [
      { type: RecordActions.FETCH_RECORD_REQUEST, payload: { id: recordId } },
      { type: RecordActions.FETCH_RECORD_SUCCESS, payload: { record } }
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
