import { Card, CardContent, Typography } from '@material-ui/core';
import { Field, Form, Formik } from 'formik'
import { CheckboxWithLabel, TextField } from 'formik-material-ui'

export default function Home() {
  return (
    <Card>
      <CardContent>
        <Formik>
          <Form>
            <Field name='firstName' component={TextField} label='First Name' />
          </Form>
        </Formik>
      </CardContent>
    </Card>
  );
}
