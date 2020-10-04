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
    paginationStart: fetch.paginationStart,
    paginationEnd: fetch.paginationEnd
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

function dispatchToProps(dispatch, paginationStart, paginationEnd) {
  return {
    moreRecords: () =>
      dispatch(Actions.fetchRecords({
        paginationStart: paginationStart,
        paginationEnd: paginationEnd + 10
      }))
  };
}

export default function RecordListScreenContainer(props) {
  const { push } = useHistory();

  const toRecordReviewScreen = ({ id }) =>
    push(`/records/${id}/review`);

  const stateProps = useSelector(stateToProps);

  const { isFetching } = stateProps;

  const { paginationStart, paginationEnd } = useSelector(stateToPagination);

  const shouldFetchRecords = useSelector(stateToShouldFetchRecords);

  const recordsFetchFailed = useSelector(stateToRecordsFetchFailed);

  const dispatch = useDispatch();

  const dispatchProps = dispatchToProps(
    dispatch,
    paginationStart,
    paginationEnd
  );

  const retryFetch = () =>
    dispatch(Actions.fetchRecords({ paginationStart: 0, paginationEnd: 10 }));

  useEffect(() => {
    if (shouldFetchRecords && !recordsFetchFailed) {
      dispatch(Actions.fetchRecords({ paginationStart: 0, paginationEnd: 10 }));
    }
  }, [dispatch, shouldFetchRecords]);

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
