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

function ExpenseReviewForm({ expense }) {
  const {
    id,
    note,
    amount,
    date
  } = expense;

  // TODO: should we have a datetime instead of two separated fields?
  // TODO: add placeholders
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
            name='date'
            defaultValue={date.toLocaleString()}
            placeholder={DateTime.local().toLocaleString()}
          />
        </FormField>
        <FormField label='Hora'>
          <MaskedInput
            name='hour'
            defaultValue={date.toLocaleString()}
            placeholder={DateTime.local().toLocaleString(DateTime.TIME_24_SIMPLE)} />
        </FormField>
        <FormField label='Cantidad'>
          <MaskedInput
            name='amount'
            defaultValue={amount.toFixed(2)}
            placeholder='$ 200.00' />
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
