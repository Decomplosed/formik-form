import React, { useState } from 'react';
import { Card, CardContent, Typography, Button } from '@material-ui/core';
import { Field, Form, Formik, FormikConfig, FormikValues } from 'formik';
import { CheckboxWithLabel, TextField } from 'formik-material-ui';
import { mixed, number, object } from 'yup';

export default function Home() {
  return (
    <Card>
      <CardContent>
        <FormikStepper
          validationSchema={object({
            money: mixed().when('millionaire', {
              is: true,
              then: number()
                .required()
                .min(
                  1_000_000,
                  'Because you said you are a millionaire, you need to have at least 1 million',
                ),
              otherwise: number().required(),
            }),
          })}
          initialValues={{
            firstName: '',
            lastName: '',
            millionaire: false,
            money: 0,
            desription: '',
          }}
          onSubmit={() => {}}
        >
          <div>
            <Field name='firstName' component={TextField} label='First Name' />
            <Field name='lastName' component={TextField} label='Last Name' />
            <Field
              name='millionaire'
              type='checkbox'
              component={CheckboxWithLabel}
              Label={{ label: 'I am a millionaire' }}
            />
          </div>
          <div>
            <Field
              name='money'
              type='number'
              component={TextField}
              label='All the money I have'
            />
          </div>
          <div>
            <Field
              name='description'
              component={TextField}
              label='Description'
            />
          </div>
        </FormikStepper>
      </CardContent>
    </Card>
  );
}

export function FormikStepper({
  children,
  ...props
}: FormikConfig<FormikValues>) {
  const childrenArray = React.Children.toArray(children);
  const [step, setStep] = useState(0);
  const currentChild = childrenArray[step];

  function isLastStep() {
    return step === childrenArray.length - 1;
  }

  return (
    <Formik
      {...props}
      onSubmit={async (values, helpers) => {
        if (step === childrenArray.length - 1) {
          await props.onSubmit(values, helpers);
        } else {
          setStep((s) => s + 1);
        }
      }}
    >
      <Form autoComplete='off'>
        {currentChild}
        {step > 0 ? (
          <Button onClick={() => setStep((s) => s - 1)}>Back</Button>
        ) : null}
        <Button type='submit'>{isLastStep() ? 'Submit' : 'Next'}</Button>
      </Form>
    </Formik>
  );
}
