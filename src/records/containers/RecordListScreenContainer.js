import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { Text } from 'grommet';
import { SimpleLoadingScreen, SimpleErrorScreen } from '../../foundation/components/screen';
import recordsByDay from '../../foundation/recordsByDay';
import RecordListScreen from '../components/RecordListScreen';
import makeRecord from '../../foundation/makeRecord';
import * as Actions from '../../foundation/redux/actions';
import * as R from 'ramda';

function stateToPagination(state) {
  const { records: { fetch } } = state;

  return {
    nextPage: fetch.nextPage
  };
}

function stateToShouldFetchRecords(state) {
  const { records: { fetch: { isFetching, error, hasMore }, records: { byId } } } = state;

  return !isFetching && !error && hasMore && Object.keys(byId).length === 0;
}

function stateToRecordsFetchFailed(state) {
  const { records: { fetch: { error } } } = state;

  return !!error;
}

function stateToProps(state) {
  const { records } = state;

  const recordsById = records.records.byId;

  const makeRecordGroups = R.pipe(
    R.props(Object.keys(recordsById)),
    R.map(makeRecord),
    recordsByDay
  );

  return {
    recordGroups: makeRecordGroups(recordsById),
    isFetching: records.fetch.isFetching,
    hasMore: records.fetch.hasMore
  };
}

function fetchUnreviewedRecords(nextPage) {
  return Actions.fetchRecords({
    status: 'unreviewed',
    nextPage
  });
}

function dispatchToProps(dispatch, nextPage) {
  return {
    moreRecords: () => dispatch(fetchUnreviewedRecords(nextPage))
  };
}

export default function RecordListScreenContainer(props) {
  const { push } = useHistory();

  const toRecordReviewScreen = ({ id }) =>
    push(`/records/${id}/review`);

  const stateProps = useSelector(stateToProps);

  const { isFetching } = stateProps;

  const { nextPage } = useSelector(stateToPagination);

  const shouldFetchRecords = useSelector(stateToShouldFetchRecords);

  const recordsFetchFailed = useSelector(stateToRecordsFetchFailed);

  const dispatch = useDispatch();

  const dispatchProps = dispatchToProps(
    dispatch,
    nextPage
  );

  const retryFetch = () =>
    dispatch(fetchUnreviewedRecords(nextPage));

  useEffect(() => {
    if (shouldFetchRecords && !recordsFetchFailed) {
      dispatch(fetchUnreviewedRecords(nextPage));
    }
  }, [dispatch, shouldFetchRecords, recordsFetchFailed, nextPage]);

  const title = <Text weight='bold' size='large'>{`Revisión de gastos`}</Text>;

  if (isFetching) {
    return (
      <SimpleLoadingScreen
        center={title} />
    );
  }

  if (recordsFetchFailed) {
    return <SimpleErrorScreen
      center={title}
      retry={retryFetch} />;
  }

  return <RecordListScreen
    toRecordReviewScreen={toRecordReviewScreen}
    {...stateProps}
    {...dispatchProps} />;
}
