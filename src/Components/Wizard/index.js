import React, { useState } from 'react';
import { Form, Formik } from 'formik';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import { Button } from '@material-ui/core';
import { Container, Grid, Typography } from '@material-ui/core';
import { ButtonGroup } from '@material-ui/core';



const Wizard = ({ children, initialValues, onSubmit }) => {
  const [stepNumber, setStepNumber] = useState(0);
  const steps = React.Children.toArray(children);
  const [snapshot, setSnapshot] = useState(initialValues);
  const [completed, setCompleted] = useState(false);

  const step = steps[stepNumber];
  const totalSteps = steps.length;
  const isLastStep = stepNumber === totalSteps - 1;

  const next = values => {
    setSnapshot(values);
    setStepNumber(Math.min(stepNumber + 1, totalSteps - 1));
  };

  const previous = values => {
    setSnapshot(values);
    setStepNumber(Math.max(stepNumber - 1, 0));
  };

  const handleSubmit = async (values, bag) => {
    if (step.props.onSubmit) {
      await step.props.onSubmit(values, bag);
    }
    if (isLastStep) {
      setCompleted(true);
      return onSubmit(values, bag);
    } else {
      bag.setTouched({});
      next(values);
    }
  };

  return (
    <Formik
      initialValues={snapshot}
      onSubmit={handleSubmit}
      validationSchema={step.props.validationSchema}
    >

      {formik => (
        <Form>
          {/** 
          <p>
            Step {stepNumber + 1} of {totalSteps}
          </p>*/}
          <Stepper activeStep={stepNumber} alternativeLabel>
            {steps.map((child, index) => (
              <Step key={child.props.label} completed={stepNumber > index || completed}>
                <StepLabel>{child.props.label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {step}
          <ButtonGroup variant="contained">
            <div style={{ display: 'flex', paddingTop: 10}}>
              {stepNumber > 0 && (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => previous(formik.values)}
                  type="button">
                  Back
                </Button>
              )}
              <div>
                <Button
                  variant="contained"
                  color="primary"
                  disabled={formik.isSubmitting}
                  type="submit">
                  {isLastStep ? 'Submit' : 'Next'}
                </Button>
              </div>
              
            </div>
            </ButtonGroup>
        </Form>
      )}
    </Formik>
  );
};

export default Wizard;
