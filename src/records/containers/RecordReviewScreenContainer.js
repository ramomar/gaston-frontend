import React, { useEffect, useCallback, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { Text, Button } from 'grommet';
import { LinkPrevious } from 'grommet-icons';
import { SimpleLoadingScreen, SimpleErrorScreen } from '../../foundation/components/screen';
import RecordReviewScreen from '../components/RecordReviewScreen';
import RecordNotFoundScreen from '../components/RecordNotFoundScreen';
import * as Actions from '../../foundation/redux/actions';
import makeRecord from '../../foundation/makeRecord';
import * as R from 'ramda';
import { DateTime } from 'luxon';

function stateToRecord(recordId, state) {
  const { records } = state;

  const recordsById = records.records.byId;

  const record = recordsById[recordId];

  if (record) {
    return makeRecord(record);
  }

  return null;
}

function stateToRecordReviewStatus(recordId, state) {
  const reviewStatus = state.records.review.byId[recordId];

  if (reviewStatus) {
    return R.assocPath(
      ['review', 'date'],
      DateTime.fromISO(reviewStatus.review.date),
      reviewStatus
    );
  }

  return null;
}

function stateToShouldFetchRecord(recordId) {
  return (state) => {
    const { records } = state;
    const { singleFetch: { isFetching, error }, review } = records;
    const alreadyReviewed = review.byId[recordId] ?
      review.byId[recordId].isReviewed :
      false;

    return !isFetching && !error && !alreadyReviewed && !stateToRecord(recordId, state);
  };
}

function stateToFound(state) {
  const { records: { singleFetch: { found } } } = state;

  return found;
}

function stateToRecordFetchFailed(state) {
  const { records: { singleFetch: { error } } } = state;

  return !!error;
}

function stateToCategoriesFetchFailed(state) {
  const { categories: { fetch: { error } } } = state;

  return !!error;
}

function stateToShouldFetchCategories(state) {
  const { categories } = state;
  const { fetch: { isFetching, error } } = categories;

  return !isFetching && !error && categories.categories.size === 0;
}

function stateToProps(recordId) {
  return (state) => {
    const { categories } = state;

    return {
      recordCategories: [...categories.categories],
      record: stateToRecord(recordId, state),
      recordReviewStatus: stateToRecordReviewStatus(recordId, state)
    };
  };
}

function dispatchToProps(dispatch) {
  return {
    reviewRecord: (record, review) => {
      dispatch(Actions.reviewRecord({
        record,
        review
      }));
    }
  };
}

function RecordReviewScreenContainer(props) {
  const { recordId } = useParams();

  const { push } = useHistory();

  const stateProps = useSelector(stateToProps(recordId));

  const { record, recordCategories, recordReviewStatus } = stateProps;

  const found = useSelector(stateToFound);

  const shouldFetchRecord = useSelector(stateToShouldFetchRecord(recordId));

  const recordFetchFailed = useSelector(stateToRecordFetchFailed);

  const shouldFetchCategories = useSelector(stateToShouldFetchCategories);

  const categoriesFetchFailed = useSelector(stateToCategoriesFetchFailed);

  const dispatch = useDispatch();

  const dispatchProps = dispatchToProps(dispatch);

  const retryFetch = () => {
    if (recordFetchFailed) {
      dispatch(Actions.fetchRecord({ id: recordId }));
    }

    if (categoriesFetchFailed) {
      dispatch(Actions.fetchRecordCategories());
    }
  };

  const [firstDispatch, setFirstDispatch] = useState(true);

  const goToRecords = useCallback(() => {
    push('/records');
  }, [push]);

  useEffect(() => {
    if (!!recordReviewStatus && recordReviewStatus.isReviewed) {
      goToRecords();
    }
  }, [goToRecords, recordReviewStatus]);

  useEffect(() => {
    if (shouldFetchRecord && firstDispatch) {
      dispatch(Actions.fetchRecord({ id: recordId }));
    }

    if (shouldFetchCategories && firstDispatch) {
      dispatch(Actions.fetchRecordCategories());
    }
    if (firstDispatch) {
      setFirstDispatch(false);
    }
  }, [dispatch,
    setFirstDispatch,
    firstDispatch,
    shouldFetchRecord,
    shouldFetchCategories,
    recordId
  ]);

  const start = <Button plain icon={<LinkPrevious />} onClick={goToRecords} />;
  const title = <Text weight='bold' size='large'>{`Revisión de gasto`}</Text>;

  if (record && recordCategories.length > 0) {
    return (
      <RecordReviewScreen
        record={record}
        goToRecords={goToRecords}
        {...stateProps}
        {...dispatchProps} />
    );
  }

  if (!found && !firstDispatch) {
    return (<RecordNotFoundScreen goToRecords={goToRecords} />);
  }

  if (recordFetchFailed || categoriesFetchFailed) {
    return (
      <SimpleErrorScreen
        start={start}
        center={title}
        retry={retryFetch} />
    );
  }

  return (
    <SimpleLoadingScreen
      start={start}
      center={title} />
  );
}

export default RecordReviewScreenContainer;
