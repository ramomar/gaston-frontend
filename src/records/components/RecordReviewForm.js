import React from 'react';
import PropTypes from 'prop-types';
import Shapes from '../shapes';
import {
  Form,
  FormField,
  TextArea,
  Select,
  Button,
  Box,
  MaskedInput,
  Text
} from 'grommet';
import Spinner from '../../foundation/components/grommet/Spinner';
import { DateTime } from 'luxon';
import * as R from 'ramda';

const dateMask = [
  {
    length: [1, 2],
    regexp: /^3[0-1]$|^2[0-9]$|^1[0-9]$|^[0-9]$/
  },
  { fixed: '/' },
  {
    length: [1, 2],
    regexp: /^1[0-2]$|^[0-9]$/
  },
  { fixed: '/' },
  {
    length: 4,
    regexp: /^20\d*$|^20?$/
  }
];

const hourMask = [
  {
    length: [1, 2],
    regexp: /^2[0-3]$|^1[0-9]$|^[0-9]$/
  },
  { fixed: ':' },
  {
    length: 2,
    regexp: /^[0-5][0-9]?$/
  }
];

const amountMask = [
  { fixed: '$ ' },
  {
    regexp: /^\d+$/
  },
  { fixed: '.' },
  {
    length: 2,
    regexp: /^\d*$/
  }
];

const dayValidate = (date) => {
  if (DateTime.fromFormat(date, 'd/L/yyyy').isValid) {
    return null;
  }

  return 'Fecha invalida.';
};

const hourValidate = {
  regexp: /^2[0-3]:[0-5][0-9]$|^1[0-9]:[0-5][0-9]$|^[0-9]:[0-5][0-9]$/,
  message: 'Hora invalida.',
  status: 'error'
};

function extractAmount(string) {
  const r = /\d+\.\d+|\d+/;

  return parseFloat(r.exec(string)[0]);
}

function createLuxonDate(day, hour) {
  return DateTime.fromFormat(`${day} ${hour}`, 'd/L/yyyy HH:mm');
}

function onSubmit(reviewRecord, record) {
  return ({ value }) => {
    const { note, category, day, hour, amount } = value;

    const recordReview = {
      note,
      category,
      date: createLuxonDate(day, hour).toISO(),
      amount: extractAmount(amount)
    };

    reviewRecord(record, recordReview);
  };
}

function makeInitialValue(rawInitialValue) {
  const initialValue = {
    note: rawInitialValue.note,
    day: rawInitialValue.date.toLocaleString(),
    hour: rawInitialValue.date.toLocaleString(DateTime.TIME_24_SIMPLE),
    amount: `$ ${rawInitialValue.amount.toFixed(2)}`
  };

  return rawInitialValue.category ?
    R.assoc('category', rawInitialValue.category, initialValue) :
    initialValue;
}

function RecordReviewForm(props) {
  const initialValue = props.recordReviewStatus ?
    makeInitialValue(props.recordReviewStatus.review) :
    makeInitialValue(props.record);


  const hasError = props.recordReviewStatus ? props.recordReviewStatus.error : false;

  const now = DateTime.local();

  return (
    <Form
      messages={{
        invalid: ':(',
        required: 'Requerido'
      }}
      value={initialValue}
      onSubmit={onSubmit(props.reviewRecord, props.record)}>
      <FormField
        required
        autoFocus
        label='Nota'
        name='note'
        component={TextArea}
        placeholder='Cena del viernes en la noche' />
      <FormField
        required
        label='Categoría'
        name='category'
        component={Select}
        options={props.recordCategories.map(c => c.name)}
        emptySearchMessage='Sin categorías'
        placeholder='Educación' />
      <FormField
        required
        label='Fecha'
        name='day'
        component={MaskedInput}
        mask={dateMask}
        validate={dayValidate}
        placeholder={now.toLocaleString()} />
      <FormField
        required
        label='Hora'
        name='hour'
        component={MaskedInput}
        mask={hourMask}
        validate={hourValidate}
        placeholder={now.toLocaleString(DateTime.TIME_24_SIMPLE)} />
      <FormField
        required
        label='Cantidad'
        name='amount'
        component={MaskedInput}
        mask={amountMask}
        placeholder='$ 250.00' />
      <Box margin={{ top: 'large' }}>
        {hasError &&
          <Text textAlign='center' color='status-error'>
            ¡Ocurrió un error!
          </Text>}
      </Box>
      <Box>
        {(props.recordReviewStatus ? props.recordReviewStatus.isReviewing : false) ?
          <Box margin='small' pad='medium'>
            <Spinner />
          </Box> :
          <Button
            label='Terminar'
            primary
            type='submit'
            margin='medium'
            alignSelf='center' />
        }
      </Box>
    </Form>
  );
}

RecordReviewForm.propTypes = {
  record: Shapes.record.isRequired,
  reviewRecord: PropTypes.func.isRequired,
  recordCategories: PropTypes.arrayOf(Shapes.recordCategory).isRequired,
  recordReviewStatus: Shapes.recordReviewStatus
};

export default RecordReviewForm;
