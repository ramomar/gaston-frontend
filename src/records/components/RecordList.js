import React from 'react';
import PropTypes from 'prop-types';
import Shapes from '../shapes';
import { Box, Anchor, Text } from 'grommet';
import RecordListItem from './RecordListItem';
import RecordListDaySeparator from './RecordListDaySeparator';
import * as R from 'ramda';
import computeTotalAmount from '../../foundation/computeTotalAmount';

function makeRecordListDateSeparator(day, amountForDay) {
  return (
    <RecordListDaySeparator
      key={day.toLocaleString()}
      day={day}
      amountForDay={amountForDay} />
  );
}

function makeRecordListItem(toRecordReviewScreen) {
  return (record) => {
    return (
      <RecordListItem
        key={record.id}
        record={record}
        toRecordReviewScreen={() => toRecordReviewScreen(record)} />
    );
  };
}

function makeItemsFromRecordGroups(recordGroups, toRecordReviewScreen) {
  const makeItems = ({ day, records }) => R.flatten([
    makeRecordListDateSeparator(day, computeTotalAmount(records)),
    records.map(makeRecordListItem(toRecordReviewScreen))
  ]);

  return R.chain(makeItems, recordGroups);
}

function RecordList(props) {
  return (
    <Box fill='vertical'>
      {props.recordGroups.length === 0 &&
        <Box fill='vertical' justify='center'>
          <Text textAlign='center'>
            Aqui apareceran tus gastos.
          </Text>
        </Box>
      }
      <Box overflow='scroll' pad={{ horizontal: 'medium' }}>
        {makeItemsFromRecordGroups(props.recordGroups, props.toRecordReviewScreen)}
        {!props.isFetching && props.hasMore &&
          <Anchor
            primary
            alignSelf='center'
            margin={{ top: 'small', bottom: 'medium' }}
            style={{ textDecoration: 'underline' }}
            onClick={() => props.moreRecords()}>
            Ver más gastos
          </Anchor>
        }
      </Box>
    </Box>
  );
}

RecordList.propTypes = {
  recordGroups: PropTypes.arrayOf(Shapes.recordGroup).isRequired,
  isFetching: PropTypes.bool.isRequired,
  hasMore: PropTypes.bool.isRequired,
  moreRecords: PropTypes.func.isRequired,
  toRecordReviewScreen: PropTypes.func.isRequired
};

export default RecordList;
