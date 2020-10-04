import { recordCategoryReducer } from './RecordCategoryReducer';
import * as actions from '../actions';

describe('categories', () => {
  it('should return the initial state', () => {
    const expected = {
      categories: new Set(),
      fetch: {
        isFetching: false,
        error: null
      }
    };

    const actual = recordCategoryReducer(undefined, {});

    expect(actual).toStrictEqual(expected);
  });

  it(`should handle ${actions.FETCH_RECORD_CATEGORIES_REQUEST}`, () => {
    const expected = {
      categories: new Set(),
      fetch: {
        isFetching: true,
        error: null
      }
    };

    const action = actions.fetchRecordCategoriesRequest();

    const actual = recordCategoryReducer(undefined, action);

    expect(actual).toStrictEqual(expected);
  });

  it(`should handle ${actions.FETCH_RECORD_CATEGORIES_REQUEST} when there was an error previously`, () => {
    const state = {
      categories: new Set(),
      fetch: {
        isFetching: true,
        error: 'Some error'
      }
    };

    const expected = {
      categories: new Set(),
      fetch: {
        isFetching: true,
        error: null
      }
    };

    const action = actions.fetchRecordCategoriesRequest();

    const actual = recordCategoryReducer(state, action);

    expect(actual).toStrictEqual(expected);
  });

  it(`should handle ${actions.FETCH_RECORD_CATEGORIES_SUCCESS}`, () => {
    const state = {
      categories: new Set(),
      fetch: {
        isFetching: true,
        error: null
      }
    };

    const categories = new Set([
      { name: 'Cena' },
      { name: 'Educación' }
    ]);

    const expected = {
      categories,
      fetch: {
        isFetching: false,
        error: null
      }
    };

    const action = actions.fetchRecordCategoriesSuccess({
      categories
    });

    const actual = recordCategoryReducer(state, action);

    expect(actual).toStrictEqual(expected);
  });

  it(`should handle ${actions.FETCH_RECORD_CATEGORIES_FAILURE}`, () => {
    const state = {
      categories: new Set(),
      fetch: {
        isFetching: true,
        error: null
      }
    };

    const error = new Error('Some error');

    const expected = {
      categories: new Set([]),
      fetch: {
        isFetching: false,
        error: error
      }
    };

    const action = actions.fetchRecordCategoriesFailure({
      error
    });

    const actual = recordCategoryReducer(state, action);

    expect(actual).toStrictEqual(expected);
  });
});
