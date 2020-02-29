import { expenseCategoryReducer } from './ExpenseCategoryReducer';
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

    const actual = expenseCategoryReducer(undefined, {});

    expect(actual).toStrictEqual(expected);
  });

  it(`should handle ${actions.FETCH_EXPENSE_CATEGORIES_REQUEST}`, () => {
    const expected = {
      categories: new Set(),
      fetch: {
        isFetching: true,
        error: null
      }
    };

    const action = actions.fetchExpenseCategoriesRequest();

    const actual = expenseCategoryReducer(undefined, action);

    expect(actual).toStrictEqual(expected);
  });

  it(`should handle ${actions.FETCH_EXPENSE_CATEGORIES_SUCCESS}`, () => {
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

    const action = actions.fetchExpenseCategoriesSuccess({
      categories
    });

    const actual = expenseCategoryReducer(state, action);

    expect(actual).toStrictEqual(expected);
  });

  it(`should handle ${actions.FETCH_EXPENSE_CATEGORIES_FAILURE}`, () => {
    const state = {
      categories: new Set(),
      fetch: {
        isFetching: true,
        error: null
      }
    };

    const expected = {
      categories: new Set([]),
      fetch: {
        isFetching: false,
        error: 'Some error'
      }
    };

    const action = actions.fetchExpenseCategoriesFailure({
      errorMessage: 'Some error'
    });

    const actual = expenseCategoryReducer(state, action);

    expect(actual).toStrictEqual(expected);
  });
});
