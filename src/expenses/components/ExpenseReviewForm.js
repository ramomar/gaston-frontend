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
    regexp: /^3[0-1]$|^2[0-9]$|^1[0-9]$|^[0-9]$/,
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
    regexp: /^2[0-3]$|^1[0-9]$|^[0-9]$/,
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

function extractAmount(string) {
  const r = /\d+\.\d{2}/;

  return parseFloat(r.exec(string));
}

function createLuxonDate(day, hour) {
  return DateTime.fromFormat(`${day} ${hour}`, 'd/L/yyyy HH:mm');
}

function onSubmit(reviewExpense, expense) {
  return ({ value }) => {
    const { note, category, day, hour, amount } = value;

    const expenseReview = {
      note,
      category,
      date: createLuxonDate(day, hour).toISO(),
      amount: extractAmount(amount)
    };

    reviewExpense(expense, expenseReview);
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

function ExpenseReviewForm(props) {
  const initialValue = props.expenseReviewStatus ?
    makeInitialValue(props.expenseReviewStatus.review) :
    makeInitialValue(props.expense);


  const hasError = props.expenseReviewStatus ? props.expenseReviewStatus.error : false;

  const now = DateTime.local();

  return (
    <Form
      messages={{
        invalid: ':(',
        required: 'Requerido'
      }}
      value={initialValue}
      onSubmit={onSubmit(props.reviewExpense, props.expense)}>
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
        options={props.expenseCategories.map(c => c.name)}
        emptySearchMessage='Sin categorías'
        placeholder='Educación' />
      <FormField
        required
        label='Fecha'
        name='day'
        component={MaskedInput}
        mask={dateMask}
        placeholder={now.toLocaleString()} />
      <FormField
        required
        label='Hora'
        name='hour'
        component={MaskedInput}
        mask={hourMask}
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
        {(props.expenseReviewStatus ? props.expenseReviewStatus.isReviewing : false) ?
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

ExpenseReviewForm.propTypes = {
  expense: Shapes.expense.isRequired,
  reviewExpense: PropTypes.func.isRequired,
  expenseCategories: PropTypes.arrayOf(Shapes.expenseCategory).isRequired,
  expenseReviewStatus: Shapes.expenseReviewStatus
};

export default ExpenseReviewForm;
