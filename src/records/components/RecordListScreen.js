import React from 'react';
import PropTypes from 'prop-types';
import Shapes from '../shapes';
import { Text } from 'grommet';
import { Screen, ScreenHeader, ScreenBody } from '../../foundation/components/screen';
import RecordList from './RecordList';

function RecordListScreen(props) {
  return (
    <Screen>
      <ScreenHeader
        center={<Text weight='bold' size='large'>Revisión de movimientos</Text>} />
      <ScreenBody>
        <RecordList
          recordGroups={props.recordGroups}
          isFetching={props.isFetching}
          hasMore={props.hasMore}
          error={props.error}
          moreRecords={props.moreRecords}
          toRecordReviewScreen={props.toRecordReviewScreen} />
      </ScreenBody>
    </Screen>
  );
}

RecordListScreen.propTypes = {
  recordGroups: PropTypes.arrayOf(Shapes.recordGroup).isRequired,
  isFetching: PropTypes.bool.isRequired,
  hasMore: PropTypes.bool.isRequired,
  error: PropTypes.string,
  moreRecords: PropTypes.func.isRequired,
  toRecordReviewScreen: PropTypes.func.isRequired
};

export default RecordListScreen;
