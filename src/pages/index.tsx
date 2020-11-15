import { Card, CardContent, Typography } from '@material-ui/core';
import { Field, Form, Formik } from 'formik'
import { CheckboxWithLabel, TextField } from 'formik-material-ui'

export default function Home() {
  return (
    <Card>
      <CardContent>
        <Formik initialValues={{
          firstName: '',
          lastName: '',
          millionaire: false,
          money: 0,
          desription: ''
        }} onSubmit={() => {}}>
          <Form>
            <Field name='firstName' component={TextField} label='First Name' />
            <Field name='lastName' component={TextField} label='Last Name' />
            <Field name='millionaire' component={CheckboxWithLabel} label='I am a millionaire' />
          </Form>
        </Formik>
      </CardContent>
    </Card>
  );
}
