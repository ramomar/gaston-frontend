import React from 'react';
import {
  Form,
  FormField,
  TextArea,
  Select,
  Button,
  Box,
  MaskedInput
} from 'grommet';
import { DateTime } from 'luxon';

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

function onSubmit(expenseId) {
  return ({ value }) => {
    const { note, category, day, hour, amount } = value;

    const expenseReview = {
      id: expenseId,
      note,
      category,
      date: createLuxonDate(day, hour).toISO(),
      amount: extractAmount(amount)
    };

    console.log(expenseReview);
  };
}

function ExpenseReviewForm({ expense }) {
  const {
    id,
    note,
    amount,
    date
  } = expense;

  const initialValue = {
    note,
    day: date.toLocaleString(),
    hour: date.toLocaleString(DateTime.TIME_24_SIMPLE),
    amount: `$ ${amount.toFixed(2)}`
  };

  return (
    <Form
      messages={{
        invalid: ':(',
        required: 'Requerido'
      }}
      value={initialValue}
      onSubmit={onSubmit(id)}
    >
      <FormField
        required
        autoFocus
        label='Nota'
        name='note'
        component={TextArea}
        placeholder='Cena del viernes en la noche'
      />
      <FormField
        required
        label='Categoría'
        name='category'
        component={Select}
        options={['Comida']}
        placeholder='Alimentación'
      />
      <FormField
        required
        label='Fecha'
        name='day'
        component={MaskedInput}
        mask={dateMask}
        placeholder={DateTime.local().toLocaleString()}
      />
      <FormField
        required
        label='Hora'
        name='hour'
        component={MaskedInput}
        mask={hourMask}
        placeholder={DateTime.local().toLocaleString(DateTime.TIME_24_SIMPLE)}
      />
      <FormField
        required
        label='Cantidad'
        name='amount'
        component={MaskedInput}
        mask={amountMask}
        placeholder='$ 250.00'
      />
      <Box>
        <Button
          label='Terminar'
          primary
          type='submit'
          margin='medium'
          alignSelf='center'
        />
      </Box>
    </Form>
  );
}

export default ExpenseReviewForm;
