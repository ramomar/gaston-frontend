import { recordReducer } from './RecordReducer';
import * as Actions from '../actions';
import * as R from 'ramda';

describe('records', () => {
  it('should return the initial state', () => {
    const expected = {
      records: {
        byId: {}
      },
      fetch: {
        isFetching: false,
        hasMore: true,
        error: null,
        paginationStart: 0,
        paginationEnd: 0
      },
      singleFetch: {
        isFetching: false,
        error: null,
        found: true
      },
      review: {
        byId: {}
      }
    };

    const actual = recordReducer(undefined, {});

    expect(actual).toStrictEqual(expected);
  });

  it(`should handle ${Actions.FETCH_RECORDS_REQUEST}`, () => {
    const state = {
      records: {
        byId: {}
      },
      fetch: {
        isFetching: false,
        hasMore: true,
        error: null,
        paginationStart: 0,
        paginationEnd: 0
      },
      singleFetch: {
        isFetching: false,
        error: null,
        found: true
      },
      review: {
        byId: {}
      }
    };

    const expected = {
      records: {
        byId: {}
      },
      fetch: {
        isFetching: true,
        hasMore: true,
        error: null,
        paginationStart: 0,
        paginationEnd: 0
      },
      singleFetch: {
        isFetching: false,
        error: null,
        found: true
      },
      review: {
        byId: {}
      }
    };

    const action = Actions.fetchRecordsRequest({ paginationStart: 0, paginationEnd: 10 });

    const actual = recordReducer(state, action);

    expect(actual).toStrictEqual(expected);
  });

  it(`should handle ${Actions.FETCH_RECORDS_REQUEST} when there was an error previously`, () => {
    const state = {
      records: {
        byId: {}
      },
      fetch: {
        isFetching: false,
        hasMore: true,
        error: 'Some error',
        paginationStart: 0,
        paginationEnd: 0
      },
      singleFetch: {
        isFetching: false,
        error: null,
        found: true
      },
      review: {
        byId: {}
      }
    };

    const expected = {
      records: {
        byId: {}
      },
      fetch: {
        isFetching: true,
        hasMore: true,
        error: null,
        paginationStart: 0,
        paginationEnd: 0
      },
      singleFetch: {
        isFetching: false,
        error: null,
        found: true
      },
      review: {
        byId: {}
      }
    };

    const action = Actions.fetchRecordsRequest({ paginationStart: 0, paginationEnd: 10 });

    const actual = recordReducer(state, action);

    expect(actual).toStrictEqual(expected);
  });

  it(`should handle ${Actions.FETCH_RECORDS_SUCCESS}`, () => {
    const record1 = {
      id: '0007182d-54cb-42b7-88fc-bbaba51db198',
      amount: 150,
      date: '2017-03-19T05:29:02.700Z',
      note: 'Cena'
    };

    const record2 = {
      id: '017b7008-4d97-428b-8b6a-53f31e9cfc4c',
      amount: 60,
      date: '2017-03-24T19:42:25.608Z',
      note: 'Taco Norteño'
    };

    const record3 = {
      id: '017b7008-4d97-428b-8b6a-54c20e9cbd5d',
      amount: 10,
      date: '2017-03-25T20:00:00.000Z',
      note: 'Cine'
    };

    const records = [
      record1,
      record2,
      record3
    ];

    const state = {
      records: {
        byId: R.fromPairs(R.map(e => [e.id, e], [record1, record2]))
      },
      fetch: {
        isFetching: false,
        hasMore: true,
        error: null,
        paginationStart: 0,
        paginationEnd: 0
      },
      singleFetch: {
        isFetching: false,
        error: null,
        found: true
      },
      review: {
        byId: {}
      }
    };

    const hasMore = true;

    const paginationStart = 0;

    const paginationEnd = 10;

    const fetchedRecords = [
      record3
    ];

    const expected = {
      records: {
        byId: R.fromPairs(R.map(e => [e.id, e], records))
      },
      fetch: {
        isFetching: false,
        hasMore,
        error: null,
        paginationStart,
        paginationEnd
      },
      singleFetch: {
        isFetching: false,
        error: null,
        found: true
      },
      review: {
        byId: {}
      }
    };

    const action = Actions.fetchRecordsSuccess({
      records: fetchedRecords,
      hasMore,
      paginationStart,
      paginationEnd
    });

    const actual = recordReducer(state, action);

    expect(actual).toStrictEqual(expected);
  });

  it(`should handle ${Actions.FETCH_RECORDS_SUCCESS} when some records already exist`, () => {
    const record1 = {
      id: '0007182d-54cb-42b7-88fc-bbaba51db198',
      amount: 150,
      date: '2017-03-19T05:29:02.700Z',
      note: 'Cena'
    };

    const record2 = {
      id: '017b7008-4d97-428b-8b6a-53f31e9cfc4c',
      amount: 60,
      date: '2017-03-24T19:42:25.608Z',
      note: 'Taco Norteño'
    };

    const record3 = {
      id: '017b7008-4d97-428b-8b6a-54c20e9cbd5d',
      amount: 10,
      date: '2017-03-25T20:00:00.000Z',
      note: 'Cine'
    };

    const records = [
      record1,
      record2,
      record3
    ];

    const state = {
      records: {
        byId: R.fromPairs(R.map(e => [e.id, e], [record1, record2]))
      },
      fetch: {
        isFetching: false,
        hasMore: true,
        error: null,
        paginationStart: 0,
        paginationEnd: 0
      },
      singleFetch: {
        isFetching: false,
        error: null,
        found: true
      },
      review: {
        byId: {}
      }
    };

    const hasMore = true;

    const paginationStart = 0;

    const paginationEnd = 10;

    const fetchedRecords = [
      record2,
      record3
    ];

    const expected = {
      records: {
        byId: R.fromPairs(R.map(e => [e.id, e], records))
      },
      fetch: {
        isFetching: false,
        hasMore,
        error: null,
        paginationStart,
        paginationEnd
      },
      singleFetch: {
        isFetching: false,
        error: null,
        found: true
      },
      review: {
        byId: {}
      }
    };

    const action = Actions.fetchRecordsSuccess({
      records: fetchedRecords,
      hasMore,
      paginationStart,
      paginationEnd
    });

    const actual = recordReducer(state, action);

    expect(actual).toStrictEqual(expected);
  });

  it(`should handle ${Actions.FETCH_RECORDS_FAILURE}`, () => {
    const state = {
      records: {
        byId: {}
      },
      fetch: {
        isFetching: true,
        hasMore: true,
        error: null,
        paginationStart: 0,
        paginationEnd: 0
      },
      singleFetch: {
        isFetching: false,
        error: null,
        found: true
      },
      review: {
        error: null
      }
    };

    const expected = {
      records: {
        byId: {}
      },
      fetch: {
        isFetching: false,
        hasMore: true,
        error: 'Some error',
        paginationStart: 0,
        paginationEnd: 0
      },
      singleFetch: {
        isFetching: false,
        error: null,
        found: true
      },
      review: {
        error: null
      }
    };

    const action = Actions.fetchRecordsFailure({
      errorMessage: 'Some error'
    });

    const actual = recordReducer(state, action);

    expect(actual).toStrictEqual(expected);
  });

  it(`should handle ${Actions.FETCH_RECORD_REQUEST}`, () => {
    const record1 = {
      id: '0007182d-54cb-42b7-88fc-bbaba51db198',
      amount: 150,
      date: '2017-03-19T05:29:02.700Z',
      note: 'Cena'
    };

    const record2 = {
      id: '017b7008-4d97-428b-8b6a-53f31e9cfc4c',
      amount: 60,
      date: '2017-03-24T19:42:25.608Z',
      note: 'Taco Norteño'
    };

    const fetchedRecord = {
      id: '017b7008-4d97-428b-8b6a-54c20e9cbd5d',
      amount: 10,
      date: '2017-03-25T20:00:00.000Z',
      note: 'Cine'
    };

    const state = {
      records: {
        byId: R.fromPairs(R.map(e => [e.id, e], [record1, record2]))
      },
      fetch: {
        isFetching: false,
        hasMore: true,
        error: null,
        paginationStart: 0,
        paginationEnd: 0
      },
      singleFetch: {
        isFetching: false,
        error: null,
        found: true
      },
      review: {
        byId: {}
      }
    };

    const expected = {
      records: {
        byId: R.fromPairs(R.map(e => [e.id, e], [record1, record2]))
      },
      fetch: {
        isFetching: false,
        hasMore: true,
        error: null,
        paginationStart: 0,
        paginationEnd: 0
      },
      singleFetch: {
        isFetching: true,
        error: null,
        found: true
      },
      review: {
        byId: {}
      }
    };

    const action = Actions.fetchRecordRequest({ id: fetchedRecord.id });

    const actual = recordReducer(state, action);

    expect(actual).toStrictEqual(expected);
  });

  it(`should handle ${Actions.FETCH_RECORD_SUCCESS}`, () => {
    const record1 = {
      id: '0007182d-54cb-42b7-88fc-bbaba51db198',
      amount: 150,
      date: '2017-03-19T05:29:02.700Z',
      note: 'Cena'
    };

    const record2 = {
      id: '017b7008-4d97-428b-8b6a-53f31e9cfc4c',
      amount: 60,
      date: '2017-03-24T19:42:25.608Z',
      note: 'Taco Norteño'
    };

    const fetchedRecord = {
      id: '017b7008-4d97-428b-8b6a-54c20e9cbd5d',
      amount: 10,
      date: '2017-03-25T20:00:00.000Z',
      note: 'Cine'
    };

    const state = {
      records: {
        byId: R.fromPairs(R.map(e => [e.id, e], [record1, record2]))
      },
      fetch: {
        isFetching: false,
        hasMore: true,
        error: null,
        paginationStart: 0,
        paginationEnd: 0
      },
      singleFetch: {
        isFetching: true,
        error: null,
        found: true
      },
      review: {
        byId: {}
      }
    };

    const expected = {
      records: {
        byId: R.fromPairs(R.map(e => [e.id, e], [record1, record2, fetchedRecord]))
      },
      fetch: {
        isFetching: false,
        hasMore: true,
        error: null,
        paginationStart: 0,
        paginationEnd: 0
      },
      singleFetch: {
        isFetching: false,
        error: null,
        found: true
      },
      review: {
        byId: {}
      }
    };

    const action = Actions.fetchRecordSuccess({ record: fetchedRecord });

    const actual = recordReducer(state, action);

    expect(actual).toStrictEqual(expected);
  });

  it(`should handle ${Actions.FETCH_RECORD_SUCCESS} with record that already exists`, () => {
    const record1 = {
      id: '0007182d-54cb-42b7-88fc-bbaba51db198',
      amount: 150,
      date: '2017-03-19T05:29:02.700Z',
      note: 'Cena'
    };

    const record2 = {
      id: '017b7008-4d97-428b-8b6a-53f31e9cfc4c',
      amount: 60,
      date: '2017-03-24T19:42:25.608Z',
      note: 'Taco Norteño'
    };

    const fetchedRecord = {
      id: '017b7008-4d97-428b-8b6a-53f31e9cfc4c',
      amount: 60,
      date: '2017-03-24T19:42:25.608Z',
      note: 'Taco Norteño'
    };

    const state = {
      records: {
        byId: R.fromPairs(R.map(e => [e.id, e], [record1, record2]))
      },
      fetch: {
        isFetching: false,
        hasMore: true,
        error: null,
        paginationStart: 0,
        paginationEnd: 0
      },
      singleFetch: {
        isFetching: true,
        error: null,
        found: true
      },
      review: {
        byId: {}
      }
    };

    const expected = {
      records: {
        byId: R.fromPairs(R.map(e => [e.id, e], [record1, record2]))
      },
      fetch: {
        isFetching: false,
        hasMore: true,
        error: null,
        paginationStart: 0,
        paginationEnd: 0
      },
      singleFetch: {
        isFetching: false,
        error: null,
        found: true
      },
      review: {
        byId: {}
      }
    };

    const action = Actions.fetchRecordSuccess({ record: fetchedRecord });

    const actual = recordReducer(state, action);

    expect(actual).toStrictEqual(expected);
  });

  it(`should handle ${Actions.FETCH_RECORD_SUCCESS} when record was not found`, () => {
    const record1 = {
      id: '0007182d-54cb-42b7-88fc-bbaba51db198',
      amount: 150,
      date: '2017-03-19T05:29:02.700Z',
      note: 'Cena'
    };

    const record2 = {
      id: '017b7008-4d97-428b-8b6a-53f31e9cfc4c',
      amount: 60,
      date: '2017-03-24T19:42:25.608Z',
      note: 'Taco Norteño'
    };

    const state = {
      records: {
        byId: R.fromPairs(R.map(e => [e.id, e], [record1, record2]))
      },
      fetch: {
        isFetching: false,
        hasMore: true,
        error: null,
        paginationStart: 0,
        paginationEnd: 0
      },
      singleFetch: {
        isFetching: true,
        error: null,
        found: true
      },
      review: {
        byId: {}
      }
    };

    const expected = {
      records: {
        byId: R.fromPairs(R.map(e => [e.id, e], [record1, record2]))
      },
      fetch: {
        isFetching: false,
        hasMore: true,
        error: null,
        paginationStart: 0,
        paginationEnd: 0
      },
      singleFetch: {
        isFetching: false,
        error: null,
        found: false
      },
      review: {
        byId: {}
      }
    };

    const action = Actions.fetchRecordSuccess({ record: null });

    const actual = recordReducer(state, action);

    expect(actual).toStrictEqual(expected);
  });

  it(`should handle ${Actions.FETCH_RECORD_FAILURE}`, () => {
    const record1 = {
      id: '0007182d-54cb-42b7-88fc-bbaba51db198',
      amount: 150,
      date: '2017-03-19T05:29:02.700Z',
      note: 'Cena'
    };

    const record2 = {
      id: '017b7008-4d97-428b-8b6a-53f31e9cfc4c',
      amount: 60,
      date: '2017-03-24T19:42:25.608Z',
      note: 'Taco Norteño'
    };

    const state = {
      records: {
        byId: R.fromPairs(R.map(e => [e.id, e], [record1, record2]))
      },
      fetch: {
        isFetching: false,
        hasMore: true,
        error: null,
        paginationStart: 0,
        paginationEnd: 0
      },
      singleFetch: {
        isFetching: true,
        error: null,
        found: true
      },
      review: {
        byId: {}
      }
    };

    const expected = {
      records: {
        byId: R.fromPairs(R.map(e => [e.id, e], [record1, record2]))
      },
      fetch: {
        isFetching: false,
        hasMore: true,
        error: null,
        paginationStart: 0,
        paginationEnd: 0
      },
      singleFetch: {
        isFetching: false,
        error: 'Some error',
        found: true
      },
      review: {
        byId: {}
      }
    };

    const action = Actions.fetchRecordFailure({ errorMessage: 'Some error' });

    const actual = recordReducer(state, action);

    expect(actual).toStrictEqual(expected);
  });

  it(`should handle ${Actions.REVIEW_RECORD_REQUEST}`, () => {
    const record1 = {
      id: '0007182d-54cb-42b7-88fc-bbaba51db198',
      amount: 150,
      date: '2017-03-19T05:29:02.700Z',
      note: 'Cena'
    };

    const record2 = {
      id: '017b7008-4d97-428b-8b6a-53f31e9cfc4c',
      amount: 60,
      date: '2017-03-24T19:42:25.608Z',
      note: 'Taco Norteño'
    };

    const record1Review = {
      amount: 50,
      date: '2017-03-24T19:42:25.608Z',
      note: 'Taco Norteño',
      category: 'Comida'
    };

    const state = {
      records: {
        byId: R.fromPairs(R.map(e => [e.id, e], [record1, record2]))
      },
      fetch: {
        isFetching: false,
        hasMore: true,
        error: null,
        paginationStart: 0,
        paginationEnd: 0
      },
      singleFetch: {
        isFetching: false,
        error: null,
        found: true
      },
      review: {
        byId: {}
      }
    };

    const expected = {
      records: {
        byId: R.fromPairs(R.map(e => [e.id, e], [record1, record2]))
      },
      fetch: {
        isFetching: false,
        hasMore: true,
        error: null,
        paginationStart: 0,
        paginationEnd: 0
      },
      singleFetch: {
        isFetching: false,
        error: null,
        found: true
      },
      review: {
        byId: {
          '0007182d-54cb-42b7-88fc-bbaba51db198': {
            isReviewing: true,
            error: null,
            review: {
              amount: 50,
              date: '2017-03-24T19:42:25.608Z',
              note: 'Taco Norteño',
              category: 'Comida'
            },
            isReviewed: false
          }
        }
      }
    };

    const action = Actions.reviewRecordRequest({ record: record1, review: record1Review });

    const actual = recordReducer(state, action);

    expect(actual).toStrictEqual(expected);
  });

  it(`should handle ${Actions.REVIEW_RECORD_SUCCESS}`, () => {
    const record1 = {
      'id': '0007182d-54cb-42b7-88fc-bbaba51db198',
      'amount': 150,
      'date': '2017-03-19T05:29:02.700Z',
      'note': 'Cena'
    };

    const record2 = {
      'id': '017b7008-4d97-428b-8b6a-53f31e9cfc4c',
      'amount': 60,
      'date': '2017-03-24T19:42:25.608Z',
      'note': 'Taco Norteño'
    };

    const record1Review = {
      amount: 50,
      date: '2017-03-24T19:42:25.608Z',
      note: 'Taco Norteño',
      category: 'Comida'
    };

    const state = {
      records: {
        byId: R.fromPairs(R.map(e => [e.id, e], [record1, record2]))
      },
      fetch: {
        isFetching: true,
        hasMore: true,
        error: null,
        paginationStart: 0,
        paginationEnd: 0
      },
      singleFetch: {
        isFetching: false,
        error: null,
        found: true
      },
      review: {
        byId: {}
      }
    };

    const expected = {
      records: {
        byId: R.fromPairs(R.map(e => [e.id, e], [record2]))
      },
      fetch: {
        isFetching: true,
        hasMore: true,
        error: null,
        paginationStart: 0,
        paginationEnd: 0
      },
      singleFetch: {
        isFetching: false,
        error: null,
        found: true
      },
      review: {
        byId: {
          '0007182d-54cb-42b7-88fc-bbaba51db198': {
            isReviewing: false,
            error: null,
            review: {
              amount: 50,
              date: '2017-03-24T19:42:25.608Z',
              note: 'Taco Norteño',
              category: 'Comida'
            },
            isReviewed: true
          }
        }
      }
    };

    const action = Actions.reviewRecordSuccess({ record: record1, review: record1Review });

    const actual = recordReducer(state, action);

    expect(actual).toStrictEqual(expected);
  });

  it(`should handle ${Actions.REVIEW_RECORD_FAILURE}`, () => {
    const record1 = {
      'id': '0007182d-54cb-42b7-88fc-bbaba51db198',
      'amount': 150,
      'date': '2017-03-19T05:29:02.700Z',
      'note': 'Cena'
    };

    const record2 = {
      'id': '017b7008-4d97-428b-8b6a-53f31e9cfc4c',
      'amount': 60,
      'date': '2017-03-24T19:42:25.608Z',
      'note': 'Taco Norteño'
    };

    const record1Review = {
      amount: 50,
      date: '2017-03-24T19:42:25.608Z',
      note: 'Taco Norteño',
      category: 'Comida'
    };

    const state = {
      records: {
        byId: R.fromPairs(R.map(e => [e.id, e], [record1, record2]))
      },
      fetch: {
        isFetching: true,
        hasMore: true,
        error: null,
        paginationStart: 0,
        paginationEnd: 0
      },
      singleFetch: {
        isFetching: false,
        error: null,
        found: true
      },
      review: {
        byId: {}
      }
    };

    const expected = {
      records: {
        byId: R.fromPairs(R.map(e => [e.id, e], [record1, record2]))
      },
      fetch: {
        isFetching: true,
        hasMore: true,
        error: null,
        paginationStart: 0,
        paginationEnd: 0
      },
      singleFetch: {
        isFetching: false,
        error: null,
        found: true
      },
      review: {
        byId: {
          '0007182d-54cb-42b7-88fc-bbaba51db198': {
            isReviewing: false,
            error: 'Some error',
            review: {
              amount: 50,
              date: '2017-03-24T19:42:25.608Z',
              note: 'Taco Norteño',
              category: 'Comida'
            },
            isReviewed: false
          }
        }
      }
    };

    const action = Actions.reviewRecordFailure({
      record: record1,
      review: record1Review,
      errorMessage: 'Some error'
    });

    const actual = recordReducer(state, action);

    expect(actual).toStrictEqual(expected);
  });
});
