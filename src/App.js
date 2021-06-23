import React from 'react';
import * as Yup from 'yup';
import Wizard from './Components/Wizard'
import { Container, Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Header from './Components/Header';
import TextField from './Components/FormsUI/TextField';
import DateTimePicker from './Components/FormsUI/DateTimePicker';
import { Formik, Field, Form, ErrorMessage, FieldArray } from 'formik';




const useStyles = makeStyles((theme) => ({
  formWrapper: {
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(8)
  }
}));

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

const WizardStep = ({ children }) => children;


const App = () => {
  const classes = useStyles();
  return (
    <div>
      <Grid container>
        <Grid item xs={12}>
          <Header />
        </Grid>

        <Grid container item xs={12}>
          <Container maxWidth="md">
            <div className={classes.formWrapper}>
              <Typography>
                Formik Multistep Wizard
              </Typography>
              <Wizard
                initialValues={{
                  email: '',
                  firstName: '',
                  lastName: '',
                  arrivalDate: '',
                  phNumbers: [''],
                }}
                onSubmit={async values =>
                  sleep(300).then(() => console.log('Wizard submit', values))
                }
              >
                <WizardStep
                  label="Step 1"
                  onSubmit={() => console.log('Step1 onSubmit')}
                  validationSchema={Yup.object({
                    firstName: Yup.string().required('required'),
                    lastName: Yup.string().required('required'),
                    arrivalDate: Yup.date().required("required"),
                    //phNumbers: Yup.array(),
                  })}
                >
                  {/*Need to put Grid container within wizardstep */}
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <TextField
                        name="firstName"
                        label="First Name"
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        name="lastName"
                        label="Last Name"
                      />
                    </Grid>

                    <Grid item xs={6}>
                      <FieldArray name='phNumbers' label="Phone numbers">
                        {fieldArrayProps => {
                          const { push, remove, form } = fieldArrayProps
                          const { values } = form
                          const { phNumbers } = values
                          // console.log('fieldArrayProps', fieldArrayProps)
                          // console.log('Form errors', form.errors)
                          return (
                            <div>
                              {phNumbers.map((phNumber, index) => (
                                <div key={index}>
                                  <TextField name={`phNumbers[${index}]`} label="Phone Number" />
                                  {index > 0 && (
                                    <button type='button' onClick={() => remove(index)}>
                                      -
                                    </button>
                                  )}
                                </div>
                              ))}
                              <button type='button' onClick={() => push('')}>
                                +
                              </button>
                            </div>
                          )
                        }}
                      </FieldArray>
                    </Grid>
                    <Grid item xs={12}>
                      <DateTimePicker
                        name="arrivalDate"
                        label="Date of Birth" />
                    </Grid>
                  </Grid>
                </WizardStep>


                <WizardStep
                  label="Step 2"
                  onSubmit={() => console.log('Step2 onSubmit')}
                  validationSchema={Yup.object({
                    email: Yup.string()
                      .email('Invalid email address')
                      .required('required'),
                  })}
                >
                  <Grid item xs={12}>
                    <TextField
                      name="email"
                      label="Email address"
                    />
                  </Grid>
                </WizardStep>
              </Wizard>
            </div>
          </Container>
        </Grid>
      </Grid>
    </div>
  )
};

export default App;
