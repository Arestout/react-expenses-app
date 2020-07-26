import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { SubmitForm } from './FormElements/SubmitForm';
import { DatePicker } from './FormElements/DatePicker';
import { CurrencyPicker } from './FormElements/CurrencyPicker';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';

import { transformDate } from '../utils';
import { Expense } from '../redux/types';
import { addNewExpense } from '../redux/actions';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    margin: {
      margin: theme.spacing(2),
    },
    messages: {
      margin: theme.spacing(4),
    },
  })
);

const materialDateInput = transformDate();

const initialValues: Expense = {
  date: materialDateInput,
  amount: '',
  currency: '',
  name: '',
};

type errors = {
  messages: Array<string>;
};

const validateInput = (values: Expense) => {
  const errors: errors = { messages: [] };

  if (values.date === '') {
    errors.messages.push('Please enter the date');
  }
  if (values.amount === '') {
    errors.messages.push('Please add the amount of your transaction');
  }
  if (values.currency === '') {
    errors.messages.push('Please enter the currency');
  }
  if (values.name === '') {
    errors.messages.push('Please enter the product name');
  }

  return errors;
};

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export const AddExpense = () => {
  const [values, setValues] = React.useState<Expense>(initialValues);
  const [onErrorMessage, setOnErrorMessage] = useState<string[]>([]);
  const [onSuccessMessage, setOnSuccessMessage] = useState<string>('');
  const [inputData, setInputData] = useState('');

  const classes = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    setInputData(
      `add ${values.date} ${values.amount} ${values.currency} ${values.name}`
    );
  }, [values]);

  const handleDateChange = (newDate: string) => {
    setValues({ ...values, date: transformDate(newDate) });
    setOnSuccessMessage('');
    setOnErrorMessage([]);
  };

  const handleChange = (prop: keyof Expense) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setValues({ ...values, [prop]: event.target.value });
    setOnSuccessMessage('');
    setOnErrorMessage([]);
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const errors: errors = validateInput(values);

    if (errors.messages.length) {
      setOnErrorMessage(errors.messages);
    } else {
      dispatch(addNewExpense(values));
      setInputData('');
      setValues(initialValues);
      setOnSuccessMessage('Expense successfully added');
    }
  };

  return (
    <>
      <form onSubmit={onSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={3}>
            <DatePicker value={values.date} onChange={handleDateChange} />
          </Grid>
          <Grid item xs={3}>
            <FormControl fullWidth className={classes.margin}>
              <InputLabel htmlFor="standard-adornment-amount">
                Amount
              </InputLabel>
              <Input
                id="standard-adornment-amount"
                type="number"
                value={values.amount}
                onChange={handleChange('amount')}
                startAdornment={
                  <InputAdornment position="start">$</InputAdornment>
                }
              />
            </FormControl>
          </Grid>
          <Grid item xs={3}>
            <CurrencyPicker onChange={handleChange} value={values.currency} />
          </Grid>
          <Grid item xs={3}>
            <TextField
              className={classes.margin}
              id="standard-multiline-flexible"
              label="Name"
              multiline
              rowsMax={4}
              value={values.name}
              onChange={handleChange('name')}
            />
          </Grid>
        </Grid>
        <SubmitForm
          inputData={inputData}
          setInputData={setInputData}
          buttonText="Add"
        />
      </form>
      <div className={classes.messages}>
        {onSuccessMessage && (
          <Alert severity="success">{onSuccessMessage}</Alert>
        )}
        {onErrorMessage.map((message) => (
          <Alert className={classes.margin} severity="error">
            {message}
          </Alert>
        ))}
      </div>
    </>
  );
};
