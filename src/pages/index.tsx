import { Card, CardContent, Typography } from '@material-ui/core';
import { Field, Form, Formik } from 'formik'
import { CheckboxWithLabel, TextField } from 'formik-material-ui'
import { mixed, number, object } from 'yup';

export default function Home() {
  return (
    <Card>
      <CardContent>
        <Formik
          initialValues={{
            firstName: '',
            lastName: '',
            millionaire: false,
            money: 0,
            desription: ''
          }} onSubmit={() => {}}
        >
          <Form autoComplete='off'>
            <Field name='firstName' component={TextField} label='First Name' />
            <Field name='lastName' component={TextField} label='Last Name' />
            <Field name='millionaire' type='checkbox' component={CheckboxWithLabel} Label={{label: 'I am a millionaire'}} />
            <Field name='money' type='number' component={TextField} label='All the money I have' />
            <Field name='description' component={TextField} label='Description' />
          </Form>
        </Formik>
      </CardContent>
    </Card>
  );
}
