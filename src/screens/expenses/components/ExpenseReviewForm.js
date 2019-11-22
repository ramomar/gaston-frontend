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
    regexp: /^\d{4}$/
  }
];

const hourMask = [
  {
    length: [1, 2],
    regexp: /^2[0-3]$|^1[0-9]$^[0-9]$/,
  },
  { fixed: ':' },
  {
    length: 2,
    regexp: /^[0-5][0-9]$|^[0-9]$/,
    placeholder: 'mm'
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
    regexp: /^\d{2}$/
  }
];

function ExpenseReviewForm({ expense }) {
  const {
    id,
    note,
    amount,
    date
  } = expense;

  return (
    <Box>
      <Form>
        <FormField label='Nota'>
          <TextArea
            autoFocus
            name='note'
            defaultValue={note}
            placeholder='Cena del viernes en la noche' />
        </FormField>
        <FormField label='Categoría'>
          <Select
            name='category'
            options={['Comida']}
            placeholder='Alimentación' />
        </FormField>
        <FormField label='Fecha'>
          <MaskedInput
            mask={dateMask}
            name='date'
            defaultValue={date.toLocaleString()}
            placeholder={DateTime.local().toLocaleString()}
          />
        </FormField>
        <FormField label='Hora'>
          <MaskedInput
            mask={hourMask}
            name='hour'
            defaultValue={date.toLocaleString(DateTime.TIME_24_SIMPLE)}
            placeholder={DateTime.local().toLocaleString(DateTime.TIME_24_SIMPLE)} />
        </FormField>
        <FormField label='Cantidad'>
          <MaskedInput
            mask={amountMask}
            name='amount'
            defaultValue={amount.toFixed(2)}
            placeholder='250.00' />
        </FormField>
      </Form>
      <Button
        label='Terminar'
        primary
        type='submit'
        margin='medium'
        alignSelf='center' />
    </Box >
  );
}

export default ExpenseReviewForm;
