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
    <Form>
      <Box>
        <FormField label='Categoría'>
          <Select name='category' options={['Comida']} />
        </FormField>
        <FormField label='Nota'>
          <TextArea name='note' defaultValue={note} />
        </FormField>
        <FormField label='Fecha'>
          <MaskedInput name='date' defaultValue={date.toLocaleString()} />
        </FormField>
        <FormField label='Hora'>
          <MaskedInput name='hour'></MaskedInput>
        </FormField>
        <FormField label='Cantidad'>
          <MaskedInput name='amount' defaultValue={amount} />
        </FormField>
        <Button
          primary
          type='submit'
          label='Enviar'
          margin='medium'
          alignSelf='center' />
      </Box>
    </Form>
  );
}

export default ExpenseReviewForm;
