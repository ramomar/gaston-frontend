import React from 'react';
import PropTypes from 'prop-types';
import Shapes from '../shapes';
import { Text, Button } from 'grommet';
import { LinkPrevious } from 'grommet-icons';
import { Screen, ScreenHeader, ScreenBody } from '../../foundation/components/screen';
import RecordReviewForm from './RecordReviewForm';
import RecordInfo from './RecordInfo';

function RecordReviewScreen(props) {
  const { record } = props;

  const formattedDay = record.date.toFormat(`d 'de' MMMM`);

  return (
    <Screen>
      <ScreenHeader
        start={<Button plain icon={<LinkPrevious />} onClick={props.goToRecords} />}
        center={<Text weight='bold' size='large'>{`Movimiento el ${formattedDay}`}</Text>} />
      <ScreenBody>
        <RecordReviewForm
          record={record}
          reviewRecord={props.reviewRecord}
          recordCategories={props.recordCategories}
          recordReviewStatus={props.recordReviewStatus} />
        <RecordInfo record={props.record} />
      </ScreenBody>
    </Screen>
  );
}

RecordReviewScreen.propTypes = {
  record: Shapes.record.isRequired,
  goToRecords: PropTypes.func.isRequired,
  reviewRecord: PropTypes.func.isRequired,
  recordCategories: PropTypes.arrayOf(Shapes.recordCategory).isRequired,
  recordReviewStatus: Shapes.recordReviewStatus
};

export default RecordReviewScreen;
