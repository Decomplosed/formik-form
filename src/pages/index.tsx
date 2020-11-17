import React, { useState } from 'react';
import { Card, CardContent, Stepper, Button, Box } from '@material-ui/core';
import { Field, Form, Formik, FormikConfig, FormikValues } from 'formik';
import { CheckboxWithLabel, TextField } from 'formik-material-ui';
import { mixed, number, object } from 'yup';

export default function Home() {
  return (
    <Card>
      <CardContent>
        <FormikStepper
          initialValues={{
            firstName: '',
            lastName: '',
            millionaire: false,
            money: 0,
            description: '',
          }}
          onSubmit={() => {}}
        >
          <FormikStep>
            <Box paddingBottom={2}>
              <Field
                fullWidth
                name='firstName'
                component={TextField}
                label='First Name'
              />
            </Box>
            <Box paddingBottom={2}>
              <Field
                fullWidth
                name='lastName'
                component={TextField}
                label='Last Name'
              />
            </Box>
            <Box paddingBottom={2}>
              <Field
                name='millionaire'
                type='checkbox'
                component={CheckboxWithLabel}
                Label={{ label: 'I am a millionaire' }}
              />
            </Box>
          </FormikStep>
          <FormikStep
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
          >
            <Box paddingBottom={2}>
              <Field
                fullWidth
                name='money'
                type='number'
                component={TextField}
                label='All the money I have'
              />
            </Box>
          </FormikStep>
          <FormikStep>
            <Box paddingBottom={2}>
              <Field
                fullWidth
                name='description'
                component={TextField}
                label='Description'
              />
            </Box>
          </FormikStep>
        </FormikStepper>
      </CardContent>
    </Card>
  );
}

export interface FormikStepProps
  extends Pick<FormikConfig<FormikValues>, 'children' | 'validationSchema'> {}

export function FormikStep({ children, ...props }: FormikStepProps) {
  return <>{children}</>;
}

export function FormikStepper({
  children,
  ...props
}: FormikConfig<FormikValues>) {
  const childrenArray = React.Children.toArray(children) as React.ReactElement<
    FormikStepProps
  >[];
  const [step, setStep] = useState(0);
  const currentChild = childrenArray[step];

  function isLastStep() {
    return step === childrenArray.length - 1;
  }

  return (
    <Formik
      {...props}
      validationSchema={currentChild.props.validationSchema}
      onSubmit={async (values, helpers) => {
        if (step === childrenArray.length - 1) {
          await props.onSubmit(values, helpers);
        } else {
          setStep((s) => s + 1);
        }
      }}
    >
      <Form autoComplete='off'>
        <Stepper alternativeLabel activeStep={step}>
          {childrenArray.map(label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          )}
        </Stepper>
        {currentChild}
        {step > 0 ? (
          <Button
            variant='contained'
            color='primary'
            onClick={() => setStep((s) => s - 1)}
          >
            Back
          </Button>
        ) : null}
        <Button variant='contained' color='primary' type='submit'>
          {isLastStep() ? 'Submit' : 'Next'}
        </Button>
      </Form>
    </Formik>
  );
}
